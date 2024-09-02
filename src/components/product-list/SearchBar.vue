<template>
  <div class="search-bar">
    <div class="search-bar__select-wrapper">
      <select
        v-model="searchBy"
        class="search-bar__select select"
        @change="onSearch"
      >
        <option value="name">Поиск по имени</option>
        <option value="seller">Поиск по селлеру</option>
      </select>
    </div>
    <div class="search-bar__input-wrapper">
      <input
        v-model="query"
        class="search-bar__input"
        type="text"
        placeholder="Введите запрос"
        @input="handleInput"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, ref } from 'vue';
import { sanitizeInput } from '../../utils/sanitazeInput';

const props = defineProps({
  initialQuery: {
    type: String,
    default: '',
  },
  initialSearchBy: {
    type: String,
    default: 'name',
  },
});

const emit = defineEmits(['search']);

const query = ref(props.initialQuery || '');
const searchBy = ref(props.initialSearchBy || 'name');

const handleInput = (event: Event) => {
  const inputElement = event.target as HTMLInputElement;
  query.value = sanitizeInput(inputElement.value);
  onSearch();
};

const onSearch = () => {
  emit('search', { query: query.value, searchBy: searchBy.value });
};
</script>

<style scoped lang="scss">
$input-padding: 8px 12px;
$border-color: #ccc;
$border-radius: 5px;
$gap: 10px;

.search-bar {
  display: flex;
  gap: $gap;
  padding-bottom: 20px;

  &__select-wrapper {
    flex: 0 0 200px;
  }

  &__input-wrapper {
    flex: 1;
  }

  &__select,
  &__input {
    padding: $input-padding;
    border: 1px solid $border-color;
    border-radius: $border-radius;
    box-sizing: border-box;
    width: 100%;
  }
}

@media (width <= 576px) {
  .search-bar {
    &__select-wrapper {
      flex: 0 0 160px;
    }
  }
}
</style>
