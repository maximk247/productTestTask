import Pagination from '@/components/shared/Pagination.vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

describe('Pagination.vue', () => {
  it('renders buttons with correct disabled state', () => {
    const wrapper = mount(Pagination, {
      props: {
        currentPage: 1,
        hasMore: true,
      },
    });

    const buttons = wrapper.findAll('.pagination__button');
    expect(buttons.length).toBe(4);

    // Кнопки "Первая" и "Предыдущая" должны быть заблокированы на первой странице
    expect(buttons[0].attributes('disabled')).toBeDefined();
    expect(buttons[1].attributes('disabled')).toBeDefined();

    // Кнопки "Следующая" и "Последняя" должны быть разблокированы, если есть больше страниц
    expect(buttons[2].attributes('disabled')).toBeUndefined();
    expect(buttons[3].attributes('disabled')).toBeUndefined();
  });

  it('emits the correct event when the buttons are clicked', async () => {
    const wrapper = mount(Pagination, {
      props: {
        currentPage: 2,
        hasMore: true,
      },
    });

    const firstButton = wrapper.find('.pagination__button:nth-child(1)');
    const prevButton = wrapper.find('.pagination__button:nth-child(2)');
    const nextButton = wrapper.find('.pagination__button:nth-child(3)');
    const lastButton = wrapper.find('.pagination__button:nth-child(4)');

    await firstButton.trigger('click');
    await prevButton.trigger('click');
    await nextButton.trigger('click');
    await lastButton.trigger('click');

    expect(wrapper.emitted('firstPage')).toBeTruthy();
    expect(wrapper.emitted('prevPage')).toBeTruthy();
    expect(wrapper.emitted('nextPage')).toBeTruthy();
    expect(wrapper.emitted('lastPage')).toBeTruthy();
  });

  it('disables the "next" and "last" buttons when hasMore is false', () => {
    const wrapper = mount(Pagination, {
      props: {
        currentPage: 1,
        hasMore: false,
      },
    });

    const buttons = wrapper.findAll('.pagination__button');

    expect(buttons[2].attributes('disabled')).toBeDefined();
    expect(buttons[3].attributes('disabled')).toBeDefined();
  });
});
