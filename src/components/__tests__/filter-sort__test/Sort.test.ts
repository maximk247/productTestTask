import Sort from '@/components/filter-sort/Sort.vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

describe('Sort.vue', () => {
  it('renders with correct default value', () => {
    const wrapper = mount(Sort, {
      props: {
        selectedSort: 'none',
      },
    });

    const select = wrapper.find('select');
    expect(select.exists()).toBe(true);
    expect(select.element.value).toBe('none');
  });

  it('renders options correctly', () => {
    const wrapper = mount(Sort);

    const options = wrapper.findAll('option');
    expect(options.length).toBe(5);
    expect(options[0].text()).toBe('Без сортировки');
    expect(options[1].text()).toBe('По имени (возрастанию)');
    expect(options[2].text()).toBe('По имени (убыванию)');
    expect(options[3].text()).toBe('По продавцу (возрастанию)');
    expect(options[4].text()).toBe('По продавцу (убыванию)');
  });

  it('emits update:selectedSort event when the sort option is changed', async () => {
    const wrapper = mount(Sort);

    const select = wrapper.find('select');
    await select.setValue('name_asc');

    expect(wrapper.emitted('update:selectedSort')).toBeTruthy();
    expect(wrapper.emitted('update:selectedSort')?.[0]).toEqual(['name_asc']);
  });

  it('correctly sets the value based on the selectedSort prop', () => {
    const wrapper = mount(Sort, {
      props: {
        selectedSort: 'seller_desc',
      },
    });

    const select = wrapper.find('select');
    expect(select.element.value).toBe('seller_desc');
  });
});
