<template>
  <div class="product-card">
    <div class="image-preview">
      <img v-if="product.image" :src="product.image" alt="Изображение товара" />
    </div>
    <div class="product-details">
      <div><strong>Название:</strong> {{ product.name }}</div>
      <div><strong>Продавец:</strong> {{ product.seller }}</div>
      <div><strong>Тип интеграции:</strong> {{ product.integrationType }}</div>
      <div><strong>Количество:</strong> {{ product.quantity }}</div>
    </div>
    <div class="button-group">
      <button @click="openEditModal">Редактировать</button>
      <button @click="removeProduct">Удалить</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';

const props = defineProps({
  product: Object,
  index: Number,
});

const emit = defineEmits(['edit', 'remove']);

const openEditModal = () => {
  emit('edit', props.product, props.index);
};

const removeProduct = () => {
  emit('remove', props.index);
};
</script>

<style scoped>
.product-card {
  background: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.image-preview {
  width: 100%;
  height: 150px;
  background-color: #f0f0f0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.product-details {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.button-group {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

button {
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
}

button:hover {
  opacity: 0.8;
}
</style>
