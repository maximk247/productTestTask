<template>
  <div class="cart-container">
    <h2>Корзина товаров</h2>
    <div class="cart-items">
      <div v-if="cartItems.length > 0">
        <ul>
          <CartItem
            v-for="(product, index) in cartItems"
            :key="index"
            :product="product"
            :index="index"
            :update-quantity="updateQuantity"
            :increase-quantity="increaseQuantity"
            :decrease-quantity="decreaseQuantity"
            :remove-product="removeProduct"
          />
        </ul>
      </div>
      <div v-else>
        <p>Корзина пуста</p>
      </div>
    </div>
    <CartButtons
      :submit-products="submitProducts"
      :remove-all-products="removeAllProducts"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import CartButtons from './CartButtons.vue';
import CartItem from './CartItem.vue';

const props = defineProps({
  cartItems: Array,
  updateQuantity: Function,
  increaseQuantity: Function,
  decreaseQuantity: Function,
  removeProduct: Function,
  submitProducts: Function,
  removeAllProducts: Function,
});
</script>

<style scoped>
.cart-container {
  width: 300px;
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  max-height: calc(100vh - 250px);
}

.cart-items {
  flex-grow: 1;
  overflow-y: auto;
  margin-bottom: 15px;
  padding-right: 10px;
}

.cart-items ul {
  padding: 0;
  margin: 0;
  list-style: none;
}
</style>
