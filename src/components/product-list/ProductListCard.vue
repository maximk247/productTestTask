<template>
  <div class="product-card">
    <div class="product-card__image-preview">
      <img
        v-if="product.image"
        :src="product.image"
        alt="Изображение товара"
        class="product-card__image"
      />
    </div>
    <div class="product-card__details">
      <div class="product-card__detail">
        <strong>Название:</strong> {{ product.name || 'Без названия' }}
      </div>
      <div class="product-card__detail">
        <strong>Селлер:</strong> {{ product.seller || 'Без селлера' }}
      </div>
      <div class="product-card__detail">
        <strong>Тип интеграции:</strong> {{ product.integrationType }}
      </div>
      <div class="product-card__detail">
        <strong>Количество:</strong> {{ product.quantity }}
      </div>
    </div>
    <div class="product-card__buttons">
      <button class="product-card__button" @click="openEditModal">
        Редактировать
      </button>
      <button
        class="product-card__button product-card__button--remove"
        @click="removeProduct"
      >
        Удалить
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';
import { Product } from '../../interfaces/ProductInterfaces';

const props = defineProps({
  product: {
    type: Object as () => Record<string, any>,
    required: true,
    default: (): Product => ({
      name: 'Без названия',
      seller: 'Без селлера',
      integrationType: '',
      quantity: 0,
      image: '',
      id: '',
    }),
  },
});

const emit = defineEmits(['edit', 'remove']);

const openEditModal = () => {
  emit('edit', props.product, props.product.id);
};

const removeProduct = () => {
  emit('remove', props.product.id);
};
</script>

<style scoped lang="scss">
$product-card-bg: #f9f9f9;
$product-card-border-radius: 8px;
$product-card-shadow: 0 1px 3px rgb(0 0 0 / 10%);
$product-card-padding: 15px;
$product-card-detail-gap: 5px;
$button-bg-color: #007bff;
$button-remove-bg-color: #dc3545;
$button-text-color: #fff;
$button-hover-opacity: 0.8;

.product-card {
  background: $product-card-bg;
  padding: $product-card-padding;
  border-radius: $product-card-border-radius;
  box-shadow: $product-card-shadow;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &__image-preview {
    width: 100%;
    height: 150px;
    background-color: #f0f0f0;
    border-radius: $product-card-border-radius;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  &__details {
    display: flex;
    flex-direction: column;
    gap: $product-card-detail-gap;
    margin-top: 10px;
  }

  &__detail {
    font-size: 14px;
  }

  &__buttons {
    display: flex;
    gap: 10px;
    margin-top: 15px;
  }

  &__button {
    padding: 8px 12px;
    border: none;
    border-radius: $product-card-border-radius;
    cursor: pointer;
    background-color: $button-bg-color;
    color: $button-text-color;

    &:hover {
      opacity: $button-hover-opacity;
    }

    &--remove {
      background-color: $button-remove-bg-color;
    }
  }
}
</style>
