<template>
  <div class="pagination">
    <button
      class="pagination__button"
      :disabled="currentPage === 1"
      @click="goToFirstPage"
    >
      Первая
    </button>
    <button
      class="pagination__button"
      :disabled="currentPage === 1"
      @click="prevPage"
    >
      Предыдущая
    </button>
    <button class="pagination__button" :disabled="!hasMore" @click="nextPage">
      Следующая
    </button>
    <button
      class="pagination__button"
      :disabled="!hasMore"
      @click="goToLastPage"
    >
      Последняя
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';

defineProps({
  currentPage: {
    type: Number,
    default: 1,
  },
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

<style scoped lang="scss">
$pagination-button-bg: #007bff;
$pagination-button-disabled-bg: #ccc;
$pagination-button-color: #fff;
$border-radius: 5px;

.pagination {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  flex-wrap: wrap;

  &__button {
    padding: 8px 12px;
    border: none;
    border-radius: $border-radius;
    cursor: pointer;
    background-color: $pagination-button-bg;
    color: $pagination-button-color;
    transition: opacity 0.3s;

    &:disabled {
      background-color: $pagination-button-disabled-bg;
      cursor: not-allowed;
    }

    &:not(:disabled):hover {
      opacity: 0.8;
    }
  }
}
</style>
