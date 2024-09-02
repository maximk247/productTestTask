import ProductFormCard from '@/components/product-form/ProductFormCard.vue';
import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createStore } from 'vuex';

describe('ProductFormCard.vue', () => {
  let store: any;

  beforeEach(() => {
    store = createStore({
      state: {
        cart: [
          {
            name: 'Product 1',
            seller: 'Seller 1',
            integrationType: 'reels',
            quantity: 2,
          },
        ],
      },
      mutations: {
        INCREASE_QUANTITY: vi.fn(),
        DECREASE_QUANTITY: vi.fn(),
        UPDATE_QUANTITY: vi.fn(),
        REMOVE_FROM_CART: vi.fn(),
      },
      actions: {
        addToCart: vi.fn(),
        removeFromCart: vi.fn(),
        saveProducts: vi.fn(),
        clearCart: vi.fn(),
      },
      getters: {
        cartItems: state => state.cart,
      },
    });

    vi.spyOn(store, 'commit');
    vi.spyOn(store, 'dispatch');
  });

  const createWrapper = () => {
    return mount(ProductFormCard, {
      global: {
        plugins: [store],
      },
      props: {
        product: store.state.cart[0],
        index: 0,
        cartItems: store.state.cart,
        updateQuantity: (index: number, quantity: number) =>
          store.commit('UPDATE_QUANTITY', { index, quantity }),
        increaseQuantity: (index: number) =>
          store.commit('INCREASE_QUANTITY', index),
        decreaseQuantity: (index: number) =>
          store.commit('DECREASE_QUANTITY', index),
        removeProduct: (_: any, index: number) =>
          store.dispatch('removeFromCart', index),
        sanitizeInput: vi.fn(),
      },
    });
  };

  it('renders correctly', () => {
    const wrapper = createWrapper();
    expect(wrapper.find('.product-card__title').text()).toBe('Товар 1');
  });

  it('calls increaseQuantity method when "+" button is clicked', async () => {
    const wrapper = createWrapper();

    await wrapper.find('.product-card__quantity-button').trigger('click');
    expect(store.commit).toHaveBeenCalledWith('INCREASE_QUANTITY', 0);
  });

  it('calls decreaseQuantity method when "-" button is clicked', async () => {
    const wrapper = createWrapper();

    await wrapper
      .find('.product-card__quantity-button:last-child')
      .trigger('click');
    expect(store.commit).toHaveBeenCalledWith('DECREASE_QUANTITY', 0);
  });

  it('calls updateQuantity method on quantity input change', async () => {
    const wrapper = createWrapper();
    const input = wrapper.find('.product-card__quantity-input');

    await input.setValue('3');
    expect(store.commit).toHaveBeenCalledWith('UPDATE_QUANTITY', {
      index: 0,
      quantity: 3,
    });
  });
});
