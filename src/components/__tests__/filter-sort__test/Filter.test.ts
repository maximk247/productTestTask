import Filter from '@/components/filter-sort/Filter.vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

describe('Filter.vue', () => {
  it('renders with correct default value', () => {
    const wrapper = mount(Filter, {
      props: {
        selectedFilter: 'all',
      },
    });

    const select = wrapper.find('select');
    expect(select.exists()).toBe(true);
    expect(select.element.value).toBe('all');
  });

  it('renders options correctly', () => {
    const wrapper = mount(Filter);

    const options = wrapper.findAll('option');
    expect(options.length).toBe(3);
    expect(options[0].text()).toBe('Все');
    expect(options[1].text()).toBe('Reels');
    expect(options[2].text()).toBe('Stories');
  });

  it('emits update:selectedFilter event when the filter is changed', async () => {
    const wrapper = mount(Filter);

    const select = wrapper.find('select');
    await select.setValue('reels');

    expect(wrapper.emitted('update:selectedFilter')).toBeTruthy();
    expect(wrapper.emitted('update:selectedFilter')?.[0]).toEqual(['reels']);
  });

  it('correctly sets the value based on the selectedFilter prop', () => {
    const wrapper = mount(Filter, {
      props: {
        selectedFilter: 'stories',
      },
    });

    const select = wrapper.find('select');
    expect(select.element.value).toBe('stories');
  });
});
