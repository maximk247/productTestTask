<template>
  <div class="modal">
    <div class="modal__overlay">
      <div class="modal__content">
        <button class="modal__close-btn" @click="closeModal">×</button>
        <h2 class="modal__title">Редактировать товар</h2>
        <ImageUpload
          :initial-image="editedProduct.image"
          class="modal__image-upload"
          @image-change="updateImage"
        />
        <div class="modal__field-group">
          <label class="modal__label" for="name">Название товара:</label>
          <input
            id="name"
            v-model="editedProduct.name"
            class="modal__input"
            @input="handleSanitizeInput('name')"
          />
        </div>
        <div class="modal__field-group">
          <label class="modal__label" for="seller">Селлер:</label>
          <input
            id="seller"
            v-model="editedProduct.seller"
            class="modal__input"
            @input="handleSanitizeInput('seller')"
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
            type="text"
            min="1"
            @input="handleSanitizeInput('quantity', true)"
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
import { sanitizeInput } from '../../utils/sanitazeInput';
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

const handleSanitizeInput = (field: string, isNumeric = false) => {
  let value = editedProduct.value[field];
  if (isNumeric) {
    value = value.replace(/[^0-9]/g, '');
  }
  editedProduct.value[field] = sanitizeInput(value);
};

onMounted(() => {
  document.addEventListener('keydown', handleEscKey);
});

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleEscKey);
});
</script>

<style scoped lang="scss">
$modal-background: rgb(0 0 0 / 70%);
$modal-content-background: #fff;
$border-color: #ddd;
$primary-color: #007bff;
$success-color: #28a745;
$placeholder-color: #ccc;

.modal {
  &__overlay {
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

  &__content {
    position: relative;
    background: $modal-content-background;
    padding: 20px;
    border-radius: 12px;
    width: 90%;
    max-width: 500px;
    box-shadow: 0 10px 30px rgb(0 0 0 / 20%);
    animation: modal__slide-in 0.3s ease;

    @media (width <= 576px) {
      margin-bottom: 150px;
    }
  }

  &__close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: transparent;
    border: none;
    font-size: 20px;
    cursor: pointer;
  }

  &__title {
    margin-bottom: 15px;
    font-size: 20px;
    color: #333;
    text-align: center;
  }

  &__image-upload {
    width: 100%;
    margin-bottom: 15px;

    img {
      width: 100%;
      height: auto;
    }
  }

  &__field-group {
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }

  &__label {
    margin-bottom: 5px;
    font-weight: bold;
    color: #555;
    width: 100%;
  }

  &__input {
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

  &__button-group {
    display: flex;
    justify-content: center;
    gap: 10px;
  }

  &__save-btn {
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

/* stylelint-disable-next-line keyframes-name-pattern */
@keyframes modal__fade-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

/* stylelint-disable-next-line keyframes-name-pattern */
@keyframes modal__slide-in {
  from {
    transform: translateY(-20px);
  }

  to {
    transform: translateY(0);
  }
}
</style>
