<template>
  <div class="container">
    <div class="form-container">
      <h2>Добавить товары</h2>
      <div class="product-grid">
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
          :sanitize-input="sanitizeInput"
        />
        <AddProductBlock @add-product="addProduct" />
      </div>
    </div>
    <Cart
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

const sanitizeInput = (product, field) => {
  // Убираем лишние пробелы и предотвращаем пробелы в начале строки
  product[field] = product[field].replace(/^\s+/, '').replace(/\s{2,}/g, ' ');
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 20px;
}

.form-container {
  flex: 2;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  max-height: 600px;
  overflow-y: auto;
  padding-right: 10px;
}
</style>
