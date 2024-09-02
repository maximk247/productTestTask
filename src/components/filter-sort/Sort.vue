<template>
  <div class="sort">
    <label class="sort__label" for="sort">Сортировка:</label>
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

<style scoped lang="scss">
.sort {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;

  &__label {
    min-width: 75px;
    font-size: 14px;
  }

  select {
    font-size: 14px;
  }

  @media (width <= 576px) {
    &__label,
    select {
      font-size: 12px;
    }
  }
}

@media (width <= 576px) {
  .sort {
    gap: 0;
  }
}
</style>
