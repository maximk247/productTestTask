import EditProductModal from '@/components/product-list/EditProductModal.vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

describe('EditProductModal.vue', () => {
  const product = {
    name: 'Test Product',
    seller: 'Test Seller',
    integrationType: 'reels',
    quantity: 5,
    image: 'test-image.jpg',
  };

  it('renders correctly with initial product data', () => {
    const wrapper = mount(EditProductModal, {
      props: {
        product,
        id: '1',
      },
    });

    const nameInput = wrapper.find('#name').element as HTMLInputElement;
    const sellerInput = wrapper.find('#seller').element as HTMLInputElement;
    const integrationTypeSelect = wrapper.find('#integrationType')
      .element as HTMLSelectElement;
    const quantityInput = wrapper.find('#quantity').element as HTMLInputElement;

    expect(wrapper.find('.modal__title').text()).toBe('Редактировать товар');
    expect(nameInput.value).toBe(product.name);
    expect(sellerInput.value).toBe(product.seller);
    expect(integrationTypeSelect.value).toBe(product.integrationType);
    expect(quantityInput.value).toBe(String(product.quantity));
  });

  it('emits close event when close button is clicked', async () => {
    const wrapper = mount(EditProductModal, {
      props: {
        product,
        id: '1',
      },
    });

    await wrapper.find('.modal__close-btn').trigger('click');
    expect(wrapper.emitted().close).toBeTruthy();
  });

  it('emits save event with updated product data when save button is clicked', async () => {
    const wrapper = mount(EditProductModal, {
      props: {
        product,
        id: '1',
      },
    });

    const nameInput = wrapper.find('#name');
    await nameInput.setValue('Updated Product');

    await wrapper.find('.modal__save-btn').trigger('click');

    expect(wrapper.emitted().save).toBeTruthy();
  });

  it('closes modal when Escape key is pressed', async () => {
    const wrapper = mount(EditProductModal, {
      props: {
        product,
        id: '1',
      },
    });

    await wrapper.vm.handleEscKey({ key: 'Escape' } as KeyboardEvent);

    expect(wrapper.emitted().close).toBeTruthy();
  });
});
