import AddProductBlock from '@/components/product-form/AddProductBlock.vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

describe('AddProductBlock.vue', () => {
  const createWrapper = () => {
    return mount(AddProductBlock);
  };

  it('renders "+" sign', () => {
    const wrapper = createWrapper();
    expect(wrapper.text()).toBe('+');
  });

  it('emits "add-product" event when clicked', async () => {
    const wrapper = createWrapper();

    await wrapper.trigger('click');
    expect(wrapper.emitted()).toHaveProperty('add-product');
    expect(wrapper.emitted('add-product')).toHaveLength(1);
    expect(wrapper.emitted('add-product')?.[0]).toEqual([
      expect.any(MouseEvent),
    ]);
  });

  it('applies correct styles and classes', () => {
    const wrapper = createWrapper();
    const block = wrapper.find('.add-product-block');

    expect(block.exists()).toBe(true);
    expect(block.classes()).toContain('add-product-block');
    expect(block.element.classList).toContain('add-product-block');
  });
});
