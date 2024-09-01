<template>
  <li class="cart-item">
    <div class="cart-item-content">
      <div v-if="product.image" class="image-preview">
        <img :src="product.image" alt="Изображение товара" />
      </div>
      <div class="product-info">
        <div>{{ product.name || 'Без названия' }}</div>
        <div>{{ product.seller || 'Без селлера' }}</div>
        <div>{{ product.integrationType }}</div>
      </div>
    </div>
    <div class="quantity-container">
      <input
        v-model="product.quantity"
        type="text"
        @input="updateQuantity(index, product.quantity)"
      />
      <div class="quantity-buttons">
        <button type="button" @click="increaseQuantity(index)">+</button>
        <button
          type="button"
          :disabled="product.quantity <= 1"
          @click="decreaseQuantity(index)"
        >
          -
        </button>
      </div>
    </div>
    <button class="remove-btn-cart" @click="removeProduct($event, index)">
      Удалить
    </button>
  </li>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  product: Object,
  index: Number,
  updateQuantity: Function,
  increaseQuantity: Function,
  decreaseQuantity: Function,
  removeProduct: Function,
});
</script>

<style scoped>
.cart-item {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 15px;
  padding: 10px;
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.cart-item-content {
  display: flex;
  align-items: center;
  gap: 10px;
}

.image-preview {
  width: 60px;
  height: 60px;
  overflow: hidden;
  border-radius: 4px;
}

.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.quantity-container {
  display: flex;
  gap: 5px;
}

.quantity-buttons button {
  padding: 5px;
  cursor: pointer;
}

.remove-btn-cart {
  align-self: flex-start;
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 14px;
  border-radius: 4px;
  display: block;
  opacity: 1;
  max-width: 100%;
  width: 100%;
}
</style>
