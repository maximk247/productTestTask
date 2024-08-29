<template>
  <div class="container">
    <div class="form-container">
      <h2>Добавить товары</h2>
      <div class="product-grid">
        <div
          v-for="(product, index) in products"
          :key="index"
          class="product-card"
        >
          <h3>Товар {{ index + 1 }}</h3>
          <div class="field-group">
            <input
              v-model="product.name"
              placeholder="Название товара"
              required
            />
            <input v-model="product.seller" placeholder="Селлер" required />
            <select v-model="product.integrationType" required>
              <option value="reels">Reels</option>
              <option value="stories">Stories</option>
            </select>
          </div>
          <div class="button-group">
            <button type="button" class="add-btn" @click="addProduct($event)">
              +
            </button>
            <button
              type="button"
              class="remove-btn"
              :disabled="products.length === 1"
              @click="removeProduct($event, index)"
            >
              -
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="cart-container">
      <h2>Корзина товаров</h2>
      <div class="cart-items">
        <div v-if="products.length > 0">
          <ul>
            <li
              v-for="(product, index) in products"
              :key="index"
              class="cart-item"
            >
              <div>{{ product.name || 'Без названия' }}</div>
              <div>{{ product.seller || 'Без селлера' }}</div>
              <div>{{ product.integrationType }}</div>
              <button
                class="remove-btn-cart"
                :disabled="products.length === 1"
                @click="removeProduct($event, index)"
              >
                Удалить
              </button>
            </li>
          </ul>
        </div>
        <div v-else>
          <p>Корзина пуста</p>
        </div>
      </div>
      <div class="cart-buttons">
        <button type="button" class="save-btn" @click="submitProducts">
          Сохранить все товары
        </button>
        <button type="button" class="delete-all-btn" @click="removeAllProducts">
          Удалить все товары
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

// Гарантируем, что список всегда содержит хотя бы один элемент
const products = computed(() => {
  return store.state.products.length > 0
    ? store.state.products
    : [{ name: '', seller: '', integrationType: 'reels' }];
});

const addProduct = (event: MouseEvent) => {
  const count = event.shiftKey ? 3 : 1;
  for (let i = 0; i < count; i++) {
    store.dispatch('addProduct', {
      name: '',
      seller: '',
      integrationType: 'reels',
    });
  }
};

const removeProduct = (event: MouseEvent, index: number) => {
  const count = event.shiftKey ? 3 : 1;
  for (let i = 0; i < count; i++) {
    if (products.value.length > 1) {
      store.dispatch('removeProduct', index);
    }
  }
};

const submitProducts = () => {
  // Действие при сохранении всех товаров
};

const removeAllProducts = () => {
  store.dispatch('setProducts', [
    { name: '', seller: '', integrationType: 'reels' },
  ]);
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
}

.product-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
}

.field-group {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;
}

.button-group {
  display: flex;
  gap: 5px;
  justify-content: flex-end;
  margin-top: 10px;
}

.add-btn,
.remove-btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  width: 35px;
  height: 35px;
}

.remove-btn {
  background-color: #dc3545;
}

.add-btn:hover,
.remove-btn:hover {
  opacity: 0.8;
}

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
  max-height: calc(100vh - 250px); /* Максимальная высота корзины */
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

.cart-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 15px;
  padding: 10px;
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.remove-btn-cart {
  align-self: flex-start;
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 14px;
}

.cart-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.save-btn {
  display: block;
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
  text-align: center;
}

.delete-all-btn {
  display: block;
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
  text-align: center;
}

.save-btn:hover,
.delete-all-btn:hover {
  opacity: 0.8;
}
</style>
