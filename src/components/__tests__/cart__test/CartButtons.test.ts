import CartButtons from '@/components/cart/CartButtons.vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';

describe('CartButtons.vue', () => {
  const submitProductsMock = vi.fn();
  const removeAllProductsMock = vi.fn();

  const createWrapper = (overrides = {}) => {
    return mount(CartButtons, {
      props: {
        submitProducts: submitProductsMock,
        removeAllProducts: removeAllProductsMock,
        ...overrides,
      },
    });
  };

  it('renders "Сохранить все товары" и "Удалить все товары" кнопки', () => {
    const wrapper = createWrapper();

    expect(wrapper.find('.save-btn').exists()).toBe(true);
    expect(wrapper.find('.save-btn').text()).toBe('Сохранить все товары');
    expect(wrapper.find('.delete-all-btn').exists()).toBe(true);
    expect(wrapper.find('.delete-all-btn').text()).toBe('Удалить все товары');
  });

  it('calls submitProducts when "Сохранить все товары" button is clicked', async () => {
    const wrapper = createWrapper();

    const saveButton = wrapper.find('.save-btn');
    await saveButton.trigger('click');

    expect(submitProductsMock).toHaveBeenCalled();
  });

  it('calls removeAllProducts when "Удалить все товары" button is clicked', async () => {
    const wrapper = createWrapper();

    const deleteAllButton = wrapper.find('.delete-all-btn');
    await deleteAllButton.trigger('click');

    expect(removeAllProductsMock).toHaveBeenCalled();
  });

  it('does not throw error if submitProducts and removeAllProducts are not provided', async () => {
    const wrapper = createWrapper({
      submitProducts: undefined,
      removeAllProducts: undefined,
    });

    const saveButton = wrapper.find('.save-btn');
    const deleteAllButton = wrapper.find('.delete-all-btn');

    await expect(saveButton.trigger('click')).resolves.toBeUndefined();
    await expect(deleteAllButton.trigger('click')).resolves.toBeUndefined();
  });
});
