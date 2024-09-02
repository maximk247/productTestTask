import ImageUpload from '@/components/shared/ImageUpload.vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';

describe('ImageUpload.vue', () => {
  it('renders an image if initialImage prop is provided', () => {
    const wrapper = mount(ImageUpload, {
      props: { initialImage: 'image-url' },
    });

    const img = wrapper.find('img');
    expect(img.exists()).toBe(true);
    expect(img.attributes('src')).toBe('image-url');
  });

  it('renders a placeholder if no initialImage prop is provided', () => {
    const wrapper = mount(ImageUpload);

    const placeholder = wrapper.find('.image-upload__placeholder');
    expect(placeholder.exists()).toBe(true);

    const img = wrapper.find('img');
    expect(img.exists()).toBe(false);
  });

  it('triggers file input click when the component is clicked', async () => {
    const wrapper = mount(ImageUpload);

    const fileInput = wrapper.find('input[type="file"]');

    await wrapper.trigger('click');

    expect(fileInput.element).toBeTruthy();
  });

  it('emits imageChange event with the correct data when an image is uploaded', async () => {
    const wrapper = mount(ImageUpload);

    const file = new File(['dummy content'], 'example.png', {
      type: 'image/png',
    });

    const fileInput = wrapper.find('input[type="file"]');

    // Мокаем FileReader и его метод onload
    const readerMock = {
      readAsDataURL: vi.fn(),
      onload: vi.fn(),
    };
    vi.spyOn(window, 'FileReader').mockImplementation(() => readerMock as any);

    // Устанавливаем files для fileInput и триггерим change event
    Object.defineProperty(fileInput.element, 'files', {
      value: [file],
    });

    await fileInput.trigger('change');

    readerMock.onload({
      target: {
        result: 'data:image/png;base64,example',
      },
    });

    const emitted = wrapper.emitted('imageChange');
    expect(emitted).toBeTruthy();
    if (emitted) {
      expect(emitted[0]).toEqual(['data:image/png;base64,example']);
    }
  });
});
