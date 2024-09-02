<template>
  <div class="cart-buttons">
    <button type="button" class="save-btn" @click="handleSubmit">
      Сохранить все товары
    </button>
    <button type="button" class="delete-all-btn" @click="handleRemoveAll">
      Удалить все товары
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';

const props = defineProps<{
  submitProducts?: (event: MouseEvent) => void;
  removeAllProducts?: (event: MouseEvent) => void;
}>();

// Используем computed для задания функций по умолчанию, если они не переданы в пропсах
const handleSubmit = computed(() => props.submitProducts || (() => {}));
const handleRemoveAll = computed(() => props.removeAllProducts || (() => {}));
</script>

<style scoped lang="scss">
.cart-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.save-btn {
  display: block;
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
  text-align: center;
}

.delete-all-btn {
  display: block;
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
  text-align: center;
}

.save-btn:hover:not(:disabled),
.delete-all-btn:hover:not(:disabled) {
  opacity: 0.8;
}
</style>
