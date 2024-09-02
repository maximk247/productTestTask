<template>
  <div class="product-card">
    <h3 class="product-card__title">Товар {{ index + 1 }}</h3>
    <ImageUpload
      :initial-image="localProduct.image"
      @image-change="updateImage"
    />
    <div class="product-card__fields">
      <input
        v-model="localProduct.name"
        class="product-card__input"
        placeholder="Название товара"
        required
        @input="sanitizeInput(localProduct, 'name')"
      />
      <input
        v-model="localProduct.seller"
        class="product-card__input"
        placeholder="Селлер"
        required
        @input="sanitizeInput(localProduct, 'seller')"
      />
      <select
        v-model="localProduct.integrationType"
        class="product-card__select select"
        required
      >
        <option value="reels">Reels</option>
        <option value="stories">Stories</option>
      </select>
      <div class="product-card__quantity">
        <input
          v-model.number="localProduct.quantity"
          type="text"
          class="product-card__quantity-input input"
          placeholder="Количество"
          @input="updateQuantity(index, localProduct.quantity)"
        />
        <div class="product-card__quantity-buttons">
          <button
            type="button"
            class="product-card__quantity-button"
            @click="increaseQuantity(index)"
          >
            +
          </button>
          <button
            type="button"
            class="product-card__quantity-button"
            @click="decreaseQuantity(index)"
          >
            -
          </button>
        </div>
      </div>
    </div>
    <div class="product-card__actions">
      <button
        type="button"
        class="product-card__remove-button remove-button"
        :disabled="cartItems.length <= 1"
        @click="removeProduct($event, index)"
      >
        Удалить
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';
import { Product } from '../../interfaces/ProductInterfaces';
import ImageUpload from '../shared/ImageUpload.vue';

const props = defineProps({
  product: {
    type: Object,
    default: (): Product => ({
      name: '',
      seller: '',
      integrationType: 'reels',
      quantity: 1,
      image: '',
      id: '',
    }),
  },
  index: {
    type: Number,
    default: 0,
  },
  cartItems: {
    type: Array,
    default: () => [],
  },
  updateQuantity: {
    type: Function,
    default: () => {},
  },
  increaseQuantity: {
    type: Function,
    default: () => {},
  },
  decreaseQuantity: {
    type: Function,
    default: () => {},
  },
  removeProduct: {
    type: Function,
    default: () => {},
  },
  sanitizeInput: {
    type: Function,
    default: () => {},
  },
});

const localProduct = computed({
  get: () => props.product,
  set: value => {
    Object.assign(props.product, value);
  },
});

const updateImage = (image: string) => {
  if (localProduct.value) {
    localProduct.value.image = image;
  }
};
</script>

<style scoped lang="scss">
$product-card-bg: #fff;
$product-card-border: #e0e0e0;
$product-card-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
$product-card-radius: 8px;
$primary-color: #007bff;
$remove-button-bg: #dc3545;

.product-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  background-color: $product-card-bg;
  border-radius: $product-card-radius;
  box-shadow: $product-card-shadow;
  border: 1px solid $product-card-border;
  min-height: 320px;

  &__title {
    margin-bottom: 10px;
  }

  &__fields {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 10px;
  }

  &__input {
    padding: 10px;
    border: 1px solid $product-card-border;
    border-radius: $product-card-radius;
    box-sizing: border-box;
    width: 100%;
  }

  &__quantity {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 5px;
  }

  &__quantity-input {
    width: 80px;
  }

  &__quantity-buttons {
    display: flex;
    gap: 5px;
  }

  &__quantity-button {
    width: 40px;
    background-color: $primary-color;
    color: white;
    border: none;
    padding: 5px;
    cursor: pointer;
    border-radius: 4px;

    &:hover {
      opacity: 0.8;
    }
  }

  &__actions {
    display: flex;
    gap: 5px;
    justify-content: flex-end;
    margin-top: 10px;
  }
}
</style>
