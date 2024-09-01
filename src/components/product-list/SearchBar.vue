<template>
  <div class="search-bar">
    <input
      v-model="query"
      type="text"
      placeholder="Поиск по имени или селлеру"
      @input="onSearch"
    />
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, ref } from 'vue';

const props = defineProps({
  initialQuery: String,
});

const emit = defineEmits(['search']);

const query = ref(props.initialQuery || '');

const onSearch = () => {
  emit('search', query.value);
};
</script>

<style scoped>
.search-bar {
  margin-bottom: 20px;
}

.search-bar input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
