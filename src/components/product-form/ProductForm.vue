<template>
  <div class="page-container">
    <div class="form-section">
      <h2 class="form-section__title">Добавить товары</h2>
      <div class="form-section__grid">
        <ProductFormCard
          v-for="(product, index) in cartItems"
          :key="index"
          :product="product"
          :index="index"
          :cart-items="cartItems"
          :update-quantity="updateQuantity"
          :increase-quantity="increaseQuantity"
          :decrease-quantity="decreaseQuantity"
          :remove-product="removeProduct"
          :sanitize-input="handleSanitizeInput"
        />
        <AddProductBlock @add-product="addProduct" />
      </div>
    </div>
    <Cart
      class="cart-section"
      :cart-items="cartItems"
      :update-quantity="updateQuantity"
      :increase-quantity="increaseQuantity"
      :decrease-quantity="decreaseQuantity"
      :remove-product="removeProduct"
      :submit-products="submitProducts"
      :remove-all-products="removeAllProducts"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { Product } from '../../interfaces/ProductInterfaces';
import { sanitizeInput } from '../../utils/sanitazeInput';
import Cart from '../cart/Cart.vue';
import AddProductBlock from './AddProductBlock.vue';
import ProductFormCard from './ProductFormCard.vue';

const store = useStore();

// Получаем товары из корзины (не сохраненные продукты)
const cartItems = computed(() => store.state.cart);

// Добавляем пустую карточку, если корзина пуста
onMounted(() => {
  if (cartItems.value.length === 0) {
    store.dispatch('addToCart', {
      name: '',
      seller: '',
      integrationType: 'reels',
      quantity: 1,
    });
  }
});

const addProduct = (event: MouseEvent) => {
  const count = event.shiftKey ? 3 : 1;
  for (let i = 0; i < count; i++) {
    store.dispatch('addToCart', {
      name: '',
      seller: '',
      integrationType: 'reels',
      quantity: 1,
    });
  }
};

const removeProduct = (event: MouseEvent, index: number) => {
  const count = event.shiftKey ? 3 : 1;
  for (let i = 0; i < count; i++) {
    if (cartItems.value.length > 1) {
      store.dispatch('removeFromCart', index);
    }
  }
};

const increaseQuantity = (index: number) => {
  store.commit('INCREASE_QUANTITY', index);
};

const decreaseQuantity = (index: number) => {
  store.commit('DECREASE_QUANTITY', index);
};

const updateQuantity = (index: number, quantity: number) => {
  store.commit('UPDATE_QUANTITY', { index, quantity });
};

const submitProducts = () => {
  // Сохраняем текущие продукты из корзины в основное хранилище и локальное хранилище
  store.dispatch('saveProducts');

  // Очищаем корзину и добавляем одну пустую карточку
  store.dispatch('clearCart');
  store.dispatch('addToCart', {
    name: '',
    seller: '',
    integrationType: 'reels',
    quantity: 1,
  });
};

const removeAllProducts = () => {
  store.dispatch('clearCart');
  store.dispatch('addToCart', {
    name: '',
    seller: '',
    integrationType: 'reels',
    quantity: 1,
  });
};

const handleSanitizeInput = (product: Product, field: string) => {
  product[field] = sanitizeInput(product[field]);
};
</script>

<style scoped lang="scss">
$page-padding: 20px;
$gap: 20px;
$container-background: #fff;
$border-radius: 8px;

.page-container {
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  padding: 0 $page-padding;
  box-sizing: border-box;
  overflow-y: hidden;
}

.form-section {
  flex: 1;

  &__title {
    font-size: 24px;
    margin-bottom: $gap;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: $gap;
    max-height: calc(100vh - 120px);
    overflow-y: auto;
    padding-right: 10px;
    background-color: $container-background;
    border-radius: $border-radius;
  }
}

@media (width <= 576px) {
  /* stylelint-disable-next-line selector-class-pattern */
  .form-section__grid {
    max-height: calc(100vh - 400px);
  }
}

@media (width >= 577px) and (width <= 768px) {
  /* stylelint-disable-next-line selector-class-pattern */
  .form-section__grid {
    max-height: calc(100vh - 140px);
  }
}

@media (width >= 769px) and (width <= 992px) {
  /* stylelint-disable-next-line selector-class-pattern */
  .form-section__grid {
    max-height: calc(100vh - 130px);
  }
}

@media (width >= 993px) {
  /* stylelint-disable-next-line selector-class-pattern */
  .form-section__grid {
    max-height: calc(100vh - 120px);
  }
}

.cart-section {
  margin-top: auto;
  background-color: $container-background;
  border-radius: $border-radius;
  padding: $gap;
  overflow-y: auto;
  max-height: 300px;
}

@media (width >= 992px) {
  .page-container {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }

  .form-section {
    flex: 2;
    margin-right: $gap;
  }

  .cart-section {
    margin-top: 0;
    align-self: flex-start;
    max-height: none;
  }
}
</style>
