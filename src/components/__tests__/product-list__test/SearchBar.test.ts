import SearchBar from '@/components/product-list/SearchBar.vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

describe('SearchBar.vue', () => {
  it('renders correctly', () => {
    const wrapper = mount(SearchBar);

    expect(wrapper.find('.search-bar').exists()).toBe(true);
    expect(wrapper.find('.search-bar__select').exists()).toBe(true);
    expect(wrapper.find('.search-bar__input').exists()).toBe(true);
  });

  it('sets initial query and searchBy props correctly', () => {
    const wrapper = mount(SearchBar, {
      props: {
        initialQuery: 'test query',
        initialSearchBy: 'seller',
      },
    });

    const inputElement = wrapper.find('.search-bar__input')
      .element as HTMLInputElement;
    const selectElement = wrapper.find('.search-bar__select')
      .element as HTMLSelectElement;

    expect(inputElement.value).toBe('test query');
    expect(selectElement.value).toBe('seller');
  });
});
