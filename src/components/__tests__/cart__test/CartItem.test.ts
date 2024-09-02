import CartItem from '@/components/cart/CartItem.vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';

describe('CartItem.vue', () => {
  const product = {
    name: 'Product 1',
    seller: 'Seller 1',
    integrationType: 'reels',
    quantity: 2,
    image: '',
    id: '1',
  };

  const index = 0;
  const updateQuantityMock = vi.fn();
  const increaseQuantityMock = vi.fn();
  const decreaseQuantityMock = vi.fn();
  const removeProductMock = vi.fn();

  const createWrapper = (overrides = {}) => {
    return mount(CartItem, {
      props: {
        product,
        index,
        updateQuantity: updateQuantityMock,
        increaseQuantity: increaseQuantityMock,
        decreaseQuantity: decreaseQuantityMock,
        removeProduct: removeProductMock,
        ...overrides,
      },
    });
  };

  it('renders product information correctly', () => {
    const wrapper = createWrapper();

    expect(wrapper.find('.cart-item__name').text()).toBe('Product 1');
    expect(wrapper.find('.cart-item__seller').text()).toBe('Seller 1');
    expect(wrapper.find('.cart-item__integration').text()).toBe('reels');
  });

  it('updates quantity when input is changed', async () => {
    const wrapper = createWrapper();
    const input = wrapper.find('.cart-item__quantity-input');

    await input.setValue('3');
    expect(updateQuantityMock).toHaveBeenCalledWith(index, 3);
  });

  it('calls increaseQuantity when "+" button is clicked', async () => {
    const wrapper = createWrapper();
    const increaseButton = wrapper.find(
      '.cart-item__quantity-buttons button:first-child'
    );

    await increaseButton.trigger('click');
    expect(increaseQuantityMock).toHaveBeenCalledWith(index);
  });

  it('calls decreaseQuantity when "-" button is clicked', async () => {
    const wrapper = createWrapper();
    const decreaseButton = wrapper.find(
      '.cart-item__quantity-buttons button:last-child'
    );

    await decreaseButton.trigger('click');
    expect(decreaseQuantityMock).toHaveBeenCalledWith(index);
  });

  it('disables "-" button when quantity is 1', () => {
    const wrapper = createWrapper({
      product: { ...product, quantity: 1 },
    });

    const decreaseButton = wrapper.find(
      '.cart-item__quantity-buttons button:last-child'
    );
    const buttonElement = decreaseButton.element as HTMLButtonElement;
    expect(buttonElement.disabled).toBe(true);
  });

  it('calls removeProduct when "Удалить" button is clicked', async () => {
    const wrapper = createWrapper();
    const removeButton = wrapper.find('.cart-item__remove-btn');

    await removeButton.trigger('click');
    expect(removeProductMock).toHaveBeenCalledWith(expect.any(Object), index);
  });

  it('renders product image if available', () => {
    const wrapper = createWrapper({
      product: { ...product, image: 'path/to/image.jpg' },
    });

    const image = wrapper.find('.cart-item__image-preview img');
    expect(image.exists()).toBe(true);
    expect(image.attributes('src')).toBe('path/to/image.jpg');
  });

  it('does not render product image if not available', () => {
    const wrapper = createWrapper();

    const imagePreview = wrapper.find('.cart-item__image-preview');
    expect(imagePreview.exists()).toBe(false);
  });
});
