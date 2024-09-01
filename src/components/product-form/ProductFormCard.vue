<template>
  <div class="product-card">
    <h3>Товар {{ index + 1 }}</h3>
    <div class="image-upload" @click="triggerFileInput">
      <img v-if="product.image" :src="product.image" alt="Изображение товара" />
      <div v-else class="upload-placeholder">
        <span>+</span>
        <p>Изображение</p>
      </div>
      <input
        ref="fileInput"
        type="file"
        style="display: none"
        @change="onImageChange"
      />
    </div>
    <div class="field-group">
      <input
        v-model="product.name"
        placeholder="Название товара"
        required
        @input="sanitizeInput(product, 'name')"
      />
      <input
        v-model="product.seller"
        placeholder="Селлер"
        required
        @input="sanitizeInput(product, 'seller')"
      />
      <select v-model="product.integrationType" required>
        <option value="reels">Reels</option>
        <option value="stories">Stories</option>
      </select>
      <div class="quantity-container">
        <input
          v-model="product.quantity"
          type="text"
          placeholder="Количество"
          @input="updateQuantity(index, product.quantity)"
        />
        <div class="quantity-buttons">
          <button type="button" @click="increaseQuantity(index)">+</button>
          <button type="button" @click="decreaseQuantity(index)">-</button>
        </div>
      </div>
    </div>
    <div class="button-group">
      <button
        type="button"
        class="remove-btn"
        :disabled="cartItems.length <= 1"
        @click="removeProduct($event, index)"
      >
        Удалить
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';

const props = defineProps({
  product: Object,
  index: Number,
  cartItems: Array,
  updateQuantity: Function,
  increaseQuantity: Function,
  decreaseQuantity: Function,
  removeProduct: Function,
  sanitizeInput: Function,
});

const fileInput = ref(null);

const triggerFileInput = () => {
  fileInput.value.click();
};

const onImageChange = event => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = e => {
      props.product.image = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};
</script>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
  min-height: 320px;
}

.image-upload {
  position: relative;
  cursor: pointer;
  width: 300px;
  height: 200px;
  background-color: #f0f0f0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-bottom: 10px;
}

.image-upload img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.upload-placeholder {
  text-align: center;
  color: #ccc;
}

.upload-placeholder span {
  font-size: 48px;
  display: block;
}

.upload-placeholder p {
  margin: 0;
  font-size: 12px;
}

.field-group {
  display: flex;
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

.quantity-container {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 5px;
}

.quantity-container input {
  width: 50px;
  text-align: center;
}

.quantity-buttons {
  display: flex;
  gap: 5px;
}

.quantity-buttons button {
  width: 40px;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px;
  cursor: pointer;
  border-radius: 4px;
}

.quantity-buttons button:hover {
  opacity: 0.8;
}
</style>
