<template>
  <div class="product-list">
    <h2 class="product-list__title">Список товаров</h2>

    <SearchBar
      :initial-query="searchQuery"
      :initial-search-by="searchBy"
      @search="applySearch"
    />

    <FilterSort
      :selected-filter="selectedFilter"
      :selected-sort="selectedSort"
      @filter="applyFilter"
      @sort="applySort"
    />

    <div class="product-list__grid">
      <ProductListCard
        v-for="product in paginatedProducts"
        :key="product.id"
        :product="product"
        @edit="openEditModal"
        @remove="deleteProduct"
      />
    </div>

    <div class="product-list__controls">
      <button
        class="product-list__delete-all-btn remove-button"
        :disabled="paginatedProducts.length === 0"
        @click="removeAllProducts"
      >
        Удалить все товары
      </button>

      <Pagination
        :current-page="currentPage"
        :has-more="hasMore"
        @first-page="goToFirstPage"
        @prev-page="prevPage"
        @next-page="nextPage"
        @last-page="goToLastPage"
      />
    </div>

    <EditProductModal
      v-if="isEditModalOpen"
      :id="selectedProductId"
      :product="selectedProduct"
      @close="closeEditModal"
      @save="saveProductChanges"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { Product } from '../../interfaces/ProductInterfaces';
import FilterSort from '../filter-sort/FilterSort.vue';
import Pagination from '../shared/Pagination.vue';
import EditProductModal from './EditProductModal.vue';
import ProductListCard from './ProductListCard.vue';
import SearchBar from './SearchBar.vue';

const store = useStore();

const searchQuery = ref<string>('');
const searchBy = ref<string>('name');
const selectedFilter = computed(() => store.state.filterType);
const selectedSort = computed(() => store.state.sortOrder);

const currentPage = computed(() => store.state.currentPage);
const itemsPerPage = computed(() => store.state.itemsPerPage);
const hasMore = computed(() => store.getters.hasMore);
const totalProducts = computed(
  () => store.getters.filteredAndSortedProducts.length
);
const totalPages = computed(() =>
  Math.ceil(totalProducts.value / itemsPerPage.value)
);

const paginatedProducts = computed(() => {
  return store.getters.filteredAndSortedProducts
    .filter((product: Product) => {
      if (searchBy.value === 'name') {
        return product.name
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase());
      } else if (searchBy.value === 'seller') {
        return product.seller
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase());
      }
      return false;
    })
    .slice(
      (currentPage.value - 1) * itemsPerPage.value,
      currentPage.value * itemsPerPage.value
    );
});

const isEditModalOpen = ref(false);
const selectedProduct = ref<Record<string, any> | null | undefined>(null);
const selectedProductId = ref<string | undefined>('');

const goToFirstPage = () => {
  store.dispatch('setPage', 1);
};

const prevPage = () => {
  if (currentPage.value > 1) {
    store.dispatch('setPage', currentPage.value - 1);
  }
};

const nextPage = () => {
  if (hasMore.value) {
    store.dispatch('setPage', currentPage.value + 1);
  }
};

const goToLastPage = () => {
  store.dispatch('setPage', totalPages.value);
};

const deleteProduct = (id: string) => {
  store.dispatch('removeProduct', id);
};

const removeAllProducts = () => {
  store.dispatch('removeAllProducts');
};

const openEditModal = (product: Record<string, any>, id: string) => {
  selectedProduct.value = { ...product };
  selectedProductId.value = id;
  isEditModalOpen.value = true;
};

const closeEditModal = () => {
  isEditModalOpen.value = false;
};

const saveProductChanges = ({
  product,
  id,
}: {
  product: Record<string, any>;
  id: string;
}) => {
  store.dispatch('updateProduct', { product, id });
  closeEditModal();
};

const applyFilter = (newFilter: string) => {
  store.dispatch('setFilterType', newFilter);
};

const applySort = (newSort: string) => {
  store.dispatch('setSortOrder', newSort);
};

const applySearch = ({
  query,
  searchBy: newSearchBy,
}: {
  query: string;
  searchBy: string;
}) => {
  searchQuery.value = query;
  searchBy.value = newSearchBy;
};
</script>

<style scoped lang="scss">
$product-list-title-font-size: 24px;
$product-list-grid-gap: 20px;
$product-list-grid-min-height: 450px;
$product-list-grid-max-height: calc(100vh - 700px);
$product-list-grid-columns: repeat(5, 1fr);
$product-list-grid-padding: 10px;
$border-color: #ccc;
$input-padding: 8px 12px;
$border-radius: 5px;

.product-list {
  padding: 0 15px;
  box-sizing: border-box;
  &__title {
    font-size: $product-list-title-font-size;
  }

  &__grid {
    display: grid;
    grid-template-columns: $product-list-grid-columns;
    gap: $product-list-grid-gap;
    margin-top: 5px;
    min-height: $product-list-grid-min-height;
    max-height: $product-list-grid-max-height;
    overflow-y: auto;
    align-content: start;
    overflow-x: hidden;
    max-width: 100%;
    box-sizing: border-box;
    padding: $product-list-grid-padding;
  }
  &__controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px;
  }

  &__delete-all-btn:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
}
</style>
