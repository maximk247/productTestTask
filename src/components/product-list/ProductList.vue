<template>
  <div>
    <h2>Список товаров</h2>

    <SearchBar :initial-query="searchQuery" @search="applySearch" />

    <FilterSort
      :selected-filter="selectedFilter"
      :selected-sort="selectedSort"
      @filter="applyFilter"
      @sort="applySort"
    />

    <div class="product-grid">
      <ProductListCard
        v-for="(product, index) in paginatedProducts"
        :key="index"
        :product="product"
        :index="index"
        @edit="openEditModal"
        @remove="deleteProduct"
      />
    </div>

    <Pagination
      :current-page="currentPage"
      :has-more="hasMore"
      @first-page="goToFirstPage"
      @prev-page="prevPage"
      @next-page="nextPage"
      @last-page="goToLastPage"
    />

    <EditProductModal
      v-if="isEditModalOpen"
      :product="selectedProduct"
      :index="selectedIndex"
      @close="closeEditModal"
      @save="saveProductChanges"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import FilterSort from '../filter-sort/FilterSort.vue';
import Pagination from '../shared/Pagination.vue';
import EditProductModal from './EditProductModal.vue';
import ProductListCard from './ProductListCard.vue';
import SearchBar from './SearchBar.vue';

const store = useStore();

const searchQuery = ref('');
const selectedFilter = ref('all');
const selectedSort = ref('name_asc');

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
    .filter(
      product =>
        product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        product.seller.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
    .slice(
      (currentPage.value - 1) * itemsPerPage.value,
      currentPage.value * itemsPerPage.value
    );
});

const isEditModalOpen = ref(false);
const selectedProduct = ref(null);
const selectedIndex = ref(null);

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

const deleteProduct = (index: number) => {
  store.dispatch('removeProduct', index);
};

const openEditModal = (product: any, index: number) => {
  selectedProduct.value = { ...product };
  selectedIndex.value = index;
  isEditModalOpen.value = true;
};

const closeEditModal = () => {
  isEditModalOpen.value = false;
};

const saveProductChanges = ({
  product,
  index,
}: {
  product: any;
  index: number;
}) => {
  store.dispatch('updateProduct', { product, index });
  closeEditModal();
};

const applyFilter = () => {
  store.dispatch('setFilterType', selectedFilter.value);
};

const applySort = () => {
  store.dispatch('setSortOrder', selectedSort.value);
};

const applySearch = (query: string) => {
  searchQuery.value = query;
};
</script>

<style scoped>
h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  margin-top: 20px;
  min-height: 625px;
  align-content: start;
  overflow-x: hidden;
  max-width: 100%;
  box-sizing: border-box;
}

.search-bar {
  margin-bottom: 20px;
}

.search-bar input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}
</style>
