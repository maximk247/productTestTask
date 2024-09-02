import AddProductBlock from '@/components/product-form/AddProductBlock.vue';
import ProductForm from '@/components/product-form/ProductForm.vue';
import ProductFormCard from '@/components/product-form/ProductFormCard.vue';
import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createStore } from 'vuex';

describe('ProductForm.vue', () => {
  let store: any;
  let commitMock: any;
  let dispatchMock: any;

  beforeEach(() => {
    commitMock = vi.fn();
    dispatchMock = vi.fn();

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
        INCREASE_QUANTITY: commitMock,
        DECREASE_QUANTITY: commitMock,
        UPDATE_QUANTITY: commitMock,
        REMOVE_FROM_CART: commitMock,
      },
      actions: {
        addToCart: dispatchMock,
        removeFromCart: dispatchMock,
        saveProducts: dispatchMock,
        clearCart: dispatchMock,
      },
      getters: {
        cartItems: (state: any) => state.cart,
      },
    });

    store.commit = commitMock;
    store.dispatch = dispatchMock;
  });

  const createWrapper = () => {
    return mount(ProductForm, {
      global: {
        plugins: [store],
      },
    });
  };

  it('renders correctly with products in the cart', () => {
    const wrapper = createWrapper();

    expect(wrapper.find('.form-section__title').text()).toBe('Добавить товары');
    expect(wrapper.findAllComponents(ProductFormCard).length).toBe(
      store.state.cart.length
    );
    expect(wrapper.findComponent(AddProductBlock).exists()).toBe(true);
  });

  it('adds a product when AddProductBlock emits an event', async () => {
    const wrapper = createWrapper();

    await wrapper.findComponent(AddProductBlock).trigger('click');
    expect(dispatchMock).toHaveBeenCalledWith('addToCart', expect.any(Object));
  });
});
