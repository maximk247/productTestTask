<template>
  <div class="modal">
    <div class="modal__overlay">
      <div class="modal__content">
        <button class="modal__close-btn" @click="closeModal">×</button>
        <h2 class="modal__title">Редактировать товар</h2>
        <ImageUpload
          :initial-image="editedProduct.image"
          @image-change="updateImage"
        />
        <div class="modal__field-group">
          <label class="modal__label" for="name">Название товара:</label>
          <input id="name" v-model="editedProduct.name" class="modal__input" />
        </div>
        <div class="modal__field-group">
          <label class="modal__label" for="seller">Селлер:</label>
          <input
            id="seller"
            v-model="editedProduct.seller"
            class="modal__input"
          />
        </div>
        <div class="modal__field-group">
          <label class="modal__label" for="integrationType"
            >Тип интеграции:</label
          >
          <select
            id="integrationType"
            v-model="editedProduct.integrationType"
            class="modal__input"
          >
            <option value="reels">Reels</option>
            <option value="stories">Stories</option>
          </select>
        </div>
        <div class="modal__field-group">
          <label class="modal__label" for="quantity">Количество:</label>
          <input
            id="quantity"
            v-model.number="editedProduct.quantity"
            class="modal__input"
            type="number"
            min="1"
          />
        </div>
        <div class="modal__button-group">
          <button class="modal__save-btn" @click="saveChanges">
            Сохранить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, onBeforeUnmount, onMounted, ref } from 'vue';
import ImageUpload from '../shared/ImageUpload.vue';

const props = defineProps({
  product: {
    type: Object as () => Record<string, any> | null,
    default: () => ({}),
  },
  id: {
    type: String,
    default: '',
  },
});

const emits = defineEmits(['close', 'save']);

const editedProduct = ref<Record<string, any>>(props.product || {});

const closeModal = () => {
  emits('close');
};

const saveChanges = () => {
  emits('save', { product: editedProduct.value, id: props.id });
  closeModal();
};

const updateImage = (image: string) => {
  editedProduct.value.image = image;
};

const handleEscKey = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    closeModal();
  }
};

onMounted(() => {
  document.addEventListener('keydown', handleEscKey);
});

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleEscKey);
});
</script>

<style scoped lang="scss">
$modal-background: rgba(0, 0, 0, 0.7);
$modal-content-background: #ffffff;
$border-color: #ddd;
$primary-color: #007bff;
$success-color: #28a745;
$placeholder-color: #ccc;

.modal__overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: $modal-background;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
  animation: modal__fade-in 0.3s ease;
}

.modal__content {
  position: relative;
  background: $modal-content-background;
  padding: 20px;
  border-radius: 12px;
  width: 300px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  animation: modal__slide-in 0.3s ease;
}

.modal__close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.modal__title {
  margin-bottom: 15px;
  font-size: 20px;
  color: #333;
  text-align: center;
}

.modal__image-upload {
  position: relative;
  cursor: pointer;
  width: 100%;
  height: 150px;
  background-color: #f0f0f0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-bottom: 15px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .modal__upload-placeholder {
    text-align: center;
    color: $placeholder-color;
  }
}

.modal__field-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;

  .modal__label {
    margin-bottom: 5px;
    font-weight: bold;
    color: #555;
    width: 100%;
  }

  .modal__input {
    box-sizing: border-box;
    width: 100%;
    padding: 8px;
    border: 1px solid $border-color;
    border-radius: 8px;
    font-size: 14px;
    transition: border-color 0.2s;

    &:focus {
      border-color: $primary-color;
      outline: none;
    }
  }
}

.modal__button-group {
  display: flex;
  justify-content: center;
  gap: 10px;

  .modal__save-btn {
    padding: 8px 16px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    background-color: $success-color;
    color: white;

    &:hover {
      opacity: 0.9;
    }
  }
}

@keyframes modal__fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes modal__slide-in {
  from {
    transform: translateY(-20px);
  }
  to {
    transform: translateY(0);
  }
}
</style>
