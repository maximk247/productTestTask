import Cart from '@/components/cart/Cart.vue';
import CartButtons from '@/components/cart/CartButtons.vue';
import CartItem from '@/components/cart/CartItem.vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';

describe('Cart.vue', () => {
  const defaultCartItems = [
    {
      name: 'Product 1',
      seller: 'Seller 1',
      integrationType: 'reels',
      quantity: 2,
      image: '',
      id: '1',
    },
    {
      name: 'Product 2',
      seller: 'Seller 2',
      integrationType: 'stories',
      quantity: 1,
      image: '',
      id: '2',
    },
  ];

  const updateQuantityMock = vi.fn();
  const increaseQuantityMock = vi.fn();
  const decreaseQuantityMock = vi.fn();
  const removeProductMock = vi.fn();
  const submitProductsMock = vi.fn();
  const removeAllProductsMock = vi.fn();

  const mountCart = () => {
    return mount(Cart, {
      props: {
        cartItems: defaultCartItems,
        updateQuantity: updateQuantityMock,
        increaseQuantity: increaseQuantityMock,
        decreaseQuantity: decreaseQuantityMock,
        removeProduct: removeProductMock,
        submitProducts: submitProductsMock,
        removeAllProducts: removeAllProductsMock,
      },
    });
  };

  it('renders the cart title', () => {
    const wrapper = mountCart();
    expect(wrapper.find('.cart__title').text()).toBe('Корзина товаров');
  });

  it('renders a list of cart items when cartItems is not empty', () => {
    const wrapper = mountCart();
    const cartItemComponents = wrapper.findAllComponents(CartItem);
    expect(cartItemComponents.length).toBe(2);
  });

  it('displays "Корзина пуста" when cartItems is empty', () => {
    const wrapper = mount(Cart, {
      props: {
        cartItems: [],
        updateQuantity: updateQuantityMock,
        increaseQuantity: increaseQuantityMock,
        decreaseQuantity: decreaseQuantityMock,
        removeProduct: removeProductMock,
        submitProducts: submitProductsMock,
        removeAllProducts: removeAllProductsMock,
      },
    });
    expect(wrapper.find('.cart__empty-message').text()).toBe('Корзина пуста');
  });

  it('renders CartButtons component and passes methods to it', () => {
    const wrapper = mountCart();
    const cartButtons = wrapper.findComponent(CartButtons);
    expect(cartButtons.exists()).toBe(true);
    expect(cartButtons.props('submitProducts')).toBe(submitProductsMock);
    expect(cartButtons.props('removeAllProducts')).toBe(removeAllProductsMock);
  });
});
