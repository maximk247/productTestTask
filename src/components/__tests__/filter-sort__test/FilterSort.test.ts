import Filter from '@/components/filter-sort/Filter.vue';
import FilterSort from '@/components/filter-sort/FilterSort.vue';
import Sort from '@/components/filter-sort/Sort.vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

describe('FilterSort.vue', () => {
  it('renders Filter and Sort components', () => {
    const wrapper = mount(FilterSort);

    const filterComponent = wrapper.findComponent(Filter);
    const sortComponent = wrapper.findComponent(Sort);

    expect(filterComponent.exists()).toBe(true);
    expect(sortComponent.exists()).toBe(true);
  });

  it('emits filter event when filter is updated', async () => {
    const wrapper = mount(FilterSort);

    const filterComponent = wrapper.findComponent(Filter);
    await filterComponent.vm.$emit('update:selected-filter', 'reels');

    const emittedFilter = wrapper.emitted('filter');
    expect(emittedFilter).toBeTruthy();
    if (emittedFilter) {
      expect(emittedFilter[0]).toEqual(['reels']);
    }
  });

  it('emits sort event when sort is updated', async () => {
    const wrapper = mount(FilterSort);

    const sortComponent = wrapper.findComponent(Sort);
    await sortComponent.vm.$emit('update:selected-sort', 'name_asc');

    const emittedSort = wrapper.emitted('sort');
    expect(emittedSort).toBeTruthy();
    if (emittedSort) {
      expect(emittedSort[0]).toEqual(['name_asc']);
    }
  });

  it('synchronizes prop changes to local state', async () => {
    const wrapper = mount(FilterSort, {
      props: {
        selectedFilter: 'reels',
        selectedSort: 'name_asc',
      },
    });

    expect(wrapper.vm.localSelectedFilter).toBe('reels');
    expect(wrapper.vm.localSelectedSort).toBe('name_asc');

    await wrapper.setProps({
      selectedFilter: 'stories',
      selectedSort: 'seller_desc',
    });

    expect(wrapper.vm.localSelectedFilter).toBe('stories');
    expect(wrapper.vm.localSelectedSort).toBe('seller_desc');
  });
});
