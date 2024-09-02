<template>
  <div class="sort">
    <label for="sort">Сортировка:</label>
    <select
      id="sort"
      :value="selectedSort"
      class="select"
      @change="updateSort($event)"
    >
      <option value="none">Без сортировки</option>
      <option value="name_asc">По имени (возрастанию)</option>
      <option value="name_desc">По имени (убыванию)</option>
      <option value="seller_asc">По продавцу (возрастанию)</option>
      <option value="seller_desc">По продавцу (убыванию)</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';

defineProps({
  selectedSort: {
    type: String,
    default: 'none',
  },
});

const emit = defineEmits(['update:selectedSort']);

const updateSort = (event: Event) => {
  const newValue = (event.target as HTMLSelectElement).value;
  emit('update:selectedSort', newValue);
};
</script>

<style scoped>
.sort {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
}
</style>
