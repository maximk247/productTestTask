<template>
  <div class="filter">
    <label for="filter" class="filter__label">Фильтр по интеграции:</label>
    <select
      id="filter"
      :value="selectedFilter"
      class="filter__select select"
      @change="updateFilter($event)"
    >
      <option value="all">Все</option>
      <option value="reels">Reels</option>
      <option value="stories">Stories</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';

defineProps({
  selectedFilter: {
    type: String,
    default: 'all',
  },
});

const emit = defineEmits(['update:selectedFilter']);

const updateFilter = (event: Event) => {
  const newValue = (event.target as HTMLSelectElement).value;
  emit('update:selectedFilter', newValue);
};
</script>

<style scoped lang="scss">
.filter {
  display: flex;
  gap: 10px;
  align-items: center;

  &__label {
    text-align: right;
  }

  &__select {
    flex: 1;
  }
}
</style>
