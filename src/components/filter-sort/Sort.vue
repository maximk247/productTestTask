<template>
  <div class="sort">
    <label for="sort">Сортировка:</label>
    <select id="sort" :value="selectedSort" @change="updateSort($event)">
      <option value="name_asc">По имени (возрастанию)</option>
      <option value="name_desc">По имени (убыванию)</option>
      <option value="seller_asc">По продавцу (возрастанию)</option>
      <option value="seller_desc">По продавцу (убыванию)</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';

const props = defineProps({
  selectedSort: String,
});

const emit = defineEmits(['update:selectedSort', 'sort']);

const updateSort = (event: Event) => {
  const newValue = (event.target as HTMLSelectElement).value;
  emit('update:selectedSort', newValue);
  emit('sort');
};
</script>

<style scoped>
.sort {
  display: flex;
  gap: 10px;
  align-items: center;
}
</style>
