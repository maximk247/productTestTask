<template>
  <div class="add-product-block" @click="handleClick">
    <span>+</span>
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue';

const emit = defineEmits(['add-product']);

const handleClick = (event: MouseEvent) => {
  emit('add-product', event);
};
</script>

<style scoped>
.add-product-block {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgba(128, 128, 128, 0.2);
  color: rgba(128, 128, 128, 0.8);
  font-size: 48px;
  cursor: pointer;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  min-height: 523px;
}

.add-product-block:hover {
  background-color: rgba(128, 128, 128, 0.3);
  color: rgba(128, 128, 128, 1);
}
</style>
