<template>
  <div class="filter">
    <label for="filter">Фильтр по интеграции:</label>
    <select id="filter" :value="selectedFilter" @change="updateFilter($event)">
      <option value="all">Все</option>
      <option value="reels">Reels</option>
      <option value="stories">Stories</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';

const props = defineProps({
  selectedFilter: String,
});

const emit = defineEmits(['update:selectedFilter', 'filter']);

const updateFilter = (event: Event) => {
  const newValue = (event.target as HTMLSelectElement).value;
  emit('update:selectedFilter', newValue);
  emit('filter');
};
</script>

<style scoped>
.filter {
  display: flex;
  gap: 10px;
  align-items: center;
}
</style>
