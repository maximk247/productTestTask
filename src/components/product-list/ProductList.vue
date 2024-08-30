<template>
  <div>
    <h2>Список товаров</h2>

    <!-- Компонент фильтрации и сортировки -->
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

    <!-- Компонент пагинации -->
    <Pagination
      :current-page="currentPage"
      :has-more="hasMore"
      @go-to-first-page="goToFirstPage"
      @prev-page="prevPage"
      @next-page="nextPage"
      @go-to-last-page="goToLastPage"
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
import EditProductModal from './EditProductModal.vue';
import FilterSort from './FilterSort.vue';
import Pagination from './Pagination.vue';
import ProductListCard from './ProductListCard.vue';

const store = useStore();

const selectedFilter = ref('all');
const selectedSort = ref('name_asc');

const currentPage = computed(() => store.state.currentPage);
const itemsPerPage = computed(() => store.state.itemsPerPage);
const paginatedProducts = computed(() => store.getters.paginatedProducts);
const hasMore = computed(() => store.getters.hasMore);
const totalProducts = computed(
  () => store.getters.filteredAndSortedProducts.length
);
const totalPages = computed(() =>
  Math.ceil(totalProducts.value / itemsPerPage.value)
);

const isEditModalOpen = ref(false);
const selectedProduct = ref(null);
const selectedIndex = ref(null);

const nextPage = () => {
  if (hasMore.value) {
    store.dispatch('setPage', currentPage.value + 1);
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    store.dispatch('setPage', currentPage.value - 1);
  }
};

const goToFirstPage = () => {
  if (currentPage.value !== 1) {
    store.dispatch('setPage', 1);
  }
};

const goToLastPage = () => {
  if (currentPage.value !== totalPages.value) {
    store.dispatch('setPage', totalPages.value);
  }
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
}
</style>
