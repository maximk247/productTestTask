<template>
  <div class="filter-sort">
    <Filter
      :selected-filter="selectedFilter"
      @update:selected-filter="updateSelectedFilter"
      @filter="filter"
    />
    <Sort
      :selected-sort="selectedSort"
      @update:selected-sort="updateSelectedSort"
      @sort="sort"
    />
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';
import Filter from './Filter.vue';
import Sort from './Sort.vue';

const props = defineProps({
  selectedFilter: String,
  selectedSort: String,
});

const emit = defineEmits([
  'update:selectedFilter',
  'update:selectedSort',
  'filter',
  'sort',
]);

const updateSelectedFilter = (newValue: string) => {
  emit('update:selectedFilter', newValue);
};

const updateSelectedSort = (newValue: string) => {
  emit('update:selectedSort', newValue);
};

const filter = () => {
  emit('filter');
};

const sort = () => {
  emit('sort');
};
</script>

<style scoped>
.filter-sort {
  display: flex;
  gap: 15px;
  align-items: center;
}
</style>
