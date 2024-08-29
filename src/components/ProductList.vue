<template>
  <div>
    <h2>Список товаров</h2>
    <ul>
      <li v-for="(product, index) in paginatedProducts" :key="index">
        <div v-for="(value, key) in product" :key="key">
          <strong>{{ key }}:</strong> {{ value }}
        </div>
        <button @click="editProduct(product)">Редактировать</button>
        <button @click="deleteProduct(index)">Удалить</button>
      </li>
    </ul>
    <button :disabled="currentPage === 1" @click="prevPage">Предыдущая</button>
    <button :disabled="!hasMore" @click="nextPage">Следующая</button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const currentPage = computed(() => store.state.currentPage);
const paginatedProducts = computed(() => store.getters.paginatedProducts);
const hasMore = computed(() => store.getters.hasMore);

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

const deleteProduct = (index: number) => {
  store.dispatch('removeProduct', index);
};

const editProduct = (product: any) => {
  // Логика редактирования
};
</script>

<style scoped>
h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  background: #f9f9f9;
  margin-bottom: 15px;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

button {
  margin-top: 10px;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  opacity: 0.8;
}

button + button {
  margin-left: 10px;
}
</style>
