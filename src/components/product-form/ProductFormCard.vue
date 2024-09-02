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
          @input="handleQuantityInput"
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
            :disabled="localProduct.quantity <= 1"
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

const handleQuantityInput = (event: Event) => {
  const inputElement = event.target as HTMLInputElement;
  // Очищаем ввод, оставляем только цифры
  inputElement.value = inputElement.value.replace(/[^0-9]/g, '');
  props.updateQuantity(props.index, localProduct.value.quantity);
};
</script>

<style scoped lang="scss">
$product-card-bg: #fff;
$product-card-border: #e0e0e0;
$product-card-shadow: 0 2px 8px rgb(0 0 0 / 10%);
$product-card-radius: 8px;
$primary-color: #007bff;
$remove-button-bg: #dc3545;
$small-padding: 10px;
$small-font-size: 14px;

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

  &__input,
  &__quantity-input,
  &__select {
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
    width: 90px;
  }

  &__quantity-buttons {
    display: flex;
    gap: 5px;
    height: 100%;
  }

  &__quantity-button {
    width: 40px;
    background-color: $primary-color;
    color: white;
    font-size: 20px;
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

@media (width <= 1200px) {
  .product-card {
    padding: $small-padding;
    min-height: 280px;

    &__input,
    &__quantity-input,
    &__select {
      padding: 8px;
      font-size: $small-font-size;
    }

    &__quantity-input {
      width: 80px;
    }

    &__quantity-button {
      width: 35px;
    }
  }
}

@media (width <= 992px) {
  .product-card {
    padding: $small-padding;
    min-height: 260px;

    &__input,
    &__quantity-input,
    &__select {
      padding: 7px;
      font-size: $small-font-size;
    }

    &__quantity-input {
      width: 70px;
    }

    &__quantity-button {
      width: 30px;
    }
  }
}

@media (width <= 768px) {
  .product-card {
    padding: $small-padding;
    min-height: 240px;

    &__input,
    &__quantity-input,
    &__select {
      padding: 6px;
      font-size: $small-font-size;
    }

    &__quantity-input {
      width: 60px;
    }

    &__quantity-button {
      width: 25px;
    }
  }
}

@media (width <= 576px) {
  .product-card {
    padding: $small-padding;
    min-height: 220px;

    &__input,
    &__quantity-input,
    &__select {
      padding: 5px;
      font-size: $small-font-size;
    }

    &__quantity-input {
      width: 50px;
    }

    &__quantity-button {
      width: 20px;
      font-size: $small-font-size;
    }
  }
}
</style>
