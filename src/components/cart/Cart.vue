<template>
  <div class="cart">
    <h2 class="cart__title">Корзина товаров</h2>
    <div class="cart__items">
      <div v-if="cartItems.length > 0">
        <ul class="cart__list">
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
      <div v-else class="cart__empty-message">
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
import { CartProps } from '../../interfaces/props/CartPropsInterfaces';
import CartButtons from './CartButtons.vue';
import CartItem from './CartItem.vue';

defineProps<CartProps>();
</script>

<style scoped lang="scss">
$background-color: #f8f9fa;
$box-shadow: 0 2px 4px rgb(0 0 0 / 10%);
$border-radius: 8px;
$padding: 15px;
$margin-bottom: 15px;

.cart {
  background-color: $background-color;
  border-radius: $border-radius;
  box-shadow: $box-shadow;
  padding: 10px;
  max-height: 580px;
  box-sizing: border-box;

  &__title {
    font-size: 1.5rem;
    padding-bottom: $margin-bottom;
    text-align: center;
    border-bottom: 1px solid #dee2e6;
  }

  &__items {
    flex-grow: 1;
    overflow-y: auto;
    margin-bottom: $margin-bottom;
    padding: $padding;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    max-height: calc(100vh - 330px);
  }

  &__list {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  &__empty-message {
    text-align: center;
    font-size: 1.2rem;
    color: #6c757d;
  }
}
</style>
