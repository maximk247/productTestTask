<template>
  <div class="image-upload" @click="triggerFileInput">
    <img
      v-if="image"
      :src="image"
      alt="Изображение товара"
      class="image-upload__image"
    />
    <div v-else class="image-upload__placeholder">
      <span class="image-upload__icon">+</span>
      <p class="image-upload__text">Изображение</p>
    </div>
    <input
      ref="fileInput"
      type="file"
      class="image-upload__input"
      @change="onImageChange"
    />
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, ref } from 'vue';

const props = defineProps({
  initialImage: {
    type: String,
    default: '',
  },
});

const emits = defineEmits(['imageChange']);

const image = ref(props.initialImage);

const fileInput = ref<HTMLInputElement | null>(null);

const triggerFileInput = () => {
  fileInput.value?.click();
};

const onImageChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = e => {
      image.value = e.target?.result as string;
      emits('imageChange', image.value);
    };
    reader.readAsDataURL(file);
  }
};
</script>

<style scoped lang="scss">
$image-upload-bg: #f0f0f0;
$image-upload-placeholder-color: #ccc;
$image-upload-icon-size: 48px;
$image-upload-text-size: 12px;
$border-radius: 8px;

.image-upload {
  position: relative;
  cursor: pointer;
  width: 100%;
  height: 200px;
  background-color: $image-upload-bg;
  border-radius: $border-radius;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-bottom: 10px;

  &__image {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  &__placeholder {
    text-align: center;
    color: $image-upload-placeholder-color;
  }

  &__icon {
    font-size: $image-upload-icon-size;
    display: block;
  }

  &__text {
    margin: 0;
    font-size: $image-upload-text-size;
  }

  &__input {
    display: none;
  }
}
</style>
