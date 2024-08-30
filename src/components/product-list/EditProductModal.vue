<template>
  <div class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <h2>Редактировать товар</h2>
      <div class="field-group">
        <label for="name">Название товара:</label>
        <input id="name" v-model="editedProduct.name" />
      </div>
      <div class="field-group">
        <label for="seller">Селлер:</label>
        <input id="seller" v-model="editedProduct.seller" />
      </div>
      <div class="field-group">
        <label for="integrationType">Тип интеграции:</label>
        <select id="integrationType" v-model="editedProduct.integrationType">
          <option value="reels">Reels</option>
          <option value="stories">Stories</option>
        </select>
      </div>
      <div class="field-group">
        <label for="quantity">Количество:</label>
        <input
          id="quantity"
          v-model.number="editedProduct.quantity"
          type="number"
          min="1"
        />
      </div>
      <div class="button-group">
        <button @click="saveChanges">Сохранить</button>
        <button @click="closeModal">Отмена</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, ref } from 'vue';

const props = defineProps({
  product: Object,
  index: Number,
});

const emits = defineEmits(['close', 'save']);

const editedProduct = ref({ ...props.product });

const closeModal = () => {
  emits('close');
};

const saveChanges = () => {
  emits('save', { product: editedProduct.value, index: props.index });
  closeModal();
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
}

.field-group {
  margin-bottom: 15px;
}

.button-group {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

button {
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  opacity: 0.8;
}
</style>
