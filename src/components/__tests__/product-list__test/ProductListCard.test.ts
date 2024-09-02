import ProductListCard from '@/components/product-list/ProductListCard.vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

describe('ProductListCard.vue', () => {
  const product = {
    id: '1',
    name: 'Test Product',
    seller: 'Test Seller',
    integrationType: 'reels',
    quantity: 10,
    image: 'test-image.jpg',
  };

  it('renders product details correctly', () => {
    const wrapper = mount(ProductListCard, {
      props: {
        product,
      },
    });

    const details = wrapper.findAll('.product-card__detail');

    expect(details[0].text()).toContain('Test Product');
    expect(details[1].text()).toContain('Test Seller');
    expect(details[2].text()).toContain('reels');
    expect(details[3].text()).toContain('10');
    expect(wrapper.find('.product-card__image').attributes('src')).toBe(
      'test-image.jpg'
    );
  });

  it('emits edit event with correct data when edit button is clicked', async () => {
    const wrapper = mount(ProductListCard, {
      props: {
        product,
      },
    });

    await wrapper.find('.product-card__button').trigger('click');

    expect(wrapper.emitted().edit).toBeTruthy();
    expect(wrapper.emitted().edit[0]).toEqual([product, product.id]);
  });

  it('emits remove event with correct id when remove button is clicked', async () => {
    const wrapper = mount(ProductListCard, {
      props: {
        product,
      },
    });

    await wrapper.find('.product-card__button--remove').trigger('click');

    expect(wrapper.emitted().remove).toBeTruthy();
    expect(wrapper.emitted().remove[0]).toEqual([product.id]);
  });

  it('renders placeholder text when product data is missing', () => {
    const wrapper = mount(ProductListCard, {
      props: {
        product: {
          id: '2',
          name: '',
          seller: '',
          integrationType: '',
          quantity: 0,
          image: '',
        },
      },
    });

    const details = wrapper.findAll('.product-card__detail');

    expect(details[0].text()).toContain('Без названия');
    expect(details[1].text()).toContain('Без селлера');
  });
});
