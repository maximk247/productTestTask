<template>
  <div class="filter-sort">
    <Filter
      :selected-filter="localSelectedFilter"
      @update:selected-filter="updateSelectedFilter"
    />
    <Sort
      :selected-sort="localSelectedSort"
      @update:selected-sort="updateSelectedSort"
    />
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, ref, watch } from 'vue';
import Filter from './Filter.vue';
import Sort from './Sort.vue';

const props = defineProps({
  selectedFilter: {
    type: String,
    default: 'all',
  },
  selectedSort: {
    type: String,
    default: 'none',
  },
});

const emit = defineEmits(['filter', 'sort']);

// Создаем локальные копии пропсов
const localSelectedFilter = ref(props.selectedFilter);
const localSelectedSort = ref(props.selectedSort);

// Следим за изменениями пропсов и синхронизируем с локальными копиями
watch(
  () => props.selectedFilter,
  newVal => {
    localSelectedFilter.value = newVal;
  }
);

watch(
  () => props.selectedSort,
  newVal => {
    localSelectedSort.value = newVal;
  }
);

const updateSelectedFilter = (newValue: string) => {
  localSelectedFilter.value = newValue;
  emit('filter', newValue);
};

const updateSelectedSort = (newValue: string) => {
  localSelectedSort.value = newValue;
  emit('sort', newValue);
};
</script>

<style scoped>
.filter-sort {
  display: flex;
  gap: 15px;
  align-items: center;
}
</style>
