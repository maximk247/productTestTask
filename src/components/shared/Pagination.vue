<template>
  <div class="pagination-buttons">
    <button :disabled="currentPage === 1" @click="goToFirstPage">Первая</button>
    <button :disabled="currentPage === 1" @click="prevPage">Предыдущая</button>
    <button :disabled="!hasMore" @click="nextPage">Следующая</button>
    <button :disabled="!hasMore" @click="goToLastPage">Последняя</button>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';

const props = defineProps({
  currentPage: Number,
  hasMore: Boolean,
});

const emits = defineEmits(['firstPage', 'prevPage', 'nextPage', 'lastPage']);

const goToFirstPage = () => {
  emits('firstPage');
};

const prevPage = () => {
  emits('prevPage');
};

const nextPage = () => {
  emits('nextPage');
};

const goToLastPage = () => {
  emits('lastPage');
};
</script>

<style scoped>
.pagination-buttons {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  gap: 10px;
}

.pagination-buttons > button {
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.pagination-buttons > button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination-buttons > button:not(:disabled) {
  background-color: #007bff;
  color: white;
}

.pagination-buttons > button:not(:disabled):hover {
  opacity: 0.8;
}
</style>
