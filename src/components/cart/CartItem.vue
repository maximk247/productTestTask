<template>
  <li class="cart-item">
    <div class="cart-item__content">
      <div v-if="localProduct.image" class="cart-item__image-preview">
        <img :src="localProduct.image" alt="Изображение товара" />
      </div>
      <div class="cart-item__info">
        <div class="cart-item__name">
          {{ localProduct.name || 'Без названия' }}
        </div>
        <div class="cart-item__seller">
          {{ localProduct.seller || 'Без селлера' }}
        </div>
        <div class="cart-item__integration">
          {{ localProduct.integrationType }}
        </div>
      </div>
    </div>
    <div class="cart-item__quantity">
      <input
        v-model.number="localProduct.quantity"
        type="text"
        class="cart-item__quantity-input input"
        @input="handleQuantityInput"
      />
      <div class="cart-item__quantity-buttons">
        <button
          type="button"
          class="cart-item__quantity-button"
          @click="increaseQuantity && increaseQuantity(index)"
        >
          +
        </button>
        <button
          type="button"
          class="cart-item__quantity-button"
          :disabled="localProduct.quantity <= 1"
          @click="decreaseQuantity && decreaseQuantity(index)"
        >
          -
        </button>
      </div>
    </div>
    <button
      class="cart-item__remove-btn remove-button"
      @click="removeProduct && removeProduct($event, index)"
    >
      Удалить
    </button>
  </li>
</template>

<script setup lang="ts">
import { defineProps, reactive, watchEffect } from 'vue';
import { CartItemProps } from '../../interfaces/props/CartPropsInterfaces';
import { sanitizeInput } from '../../utils/sanitazeInput';

const props = defineProps<CartItemProps>();

const localProduct = reactive({ ...props.product });

const handleQuantityInput = (event: Event) => {
  const inputElement = event.target as HTMLInputElement;
  inputElement.value = sanitizeInput(inputElement.value.replace(/[^0-9]/g, ''));
  if (props.updateQuantity) {
    props.updateQuantity(props.index, localProduct.quantity);
  }
};

// Слежение за изменениями в props и обновление локального состояния
watchEffect(() => {
  Object.assign(localProduct, props.product);
});
</script>

<style scoped lang="scss">
$background-color: #fff;
$box-shadow: 0 1px 2px rgb(0 0 0 / 10%);
$remove-btn-color: #dc3545;
$border-radius: 4px;
$input-padding: 5px;

.cart-item {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 15px;
  padding: 10px;

  &__content {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__image-preview {
    width: 60px;
    height: 60px;
    overflow: hidden;
    border-radius: $border-radius;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: 2px;

    &__name,
    &__seller,
    &__integration {
      margin: 0;
    }
  }

  &__quantity {
    display: flex;
    gap: 5px;
    justify-content: center;
    align-items: center;

    &-buttons {
      display: flex;
      gap: 5px;
    }

    &-button {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: $input-padding;
      cursor: pointer;
      min-width: 25px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: $border-radius;

      &:hover {
        opacity: 0.8;
      }

      &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }
    }
  }

  &__remove-btn {
    align-self: flex-start;
    padding: $input-padding 10px;
    font-size: 14px;
    max-width: 100%;
    width: 100%;
  }
}
</style>
