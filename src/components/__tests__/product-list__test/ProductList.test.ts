import ProductList from '@/components/product-list/ProductList.vue';
import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createStore } from 'vuex';

describe('ProductList.vue', () => {
  let store: any;

  beforeEach(() => {
    store = createStore({
      state: {
        filterType: '',
        sortOrder: '',
        currentPage: 1,
        itemsPerPage: 20,
        products: [
          {
            id: '1',
            name: 'Product 1',
            seller: 'Seller 1',
            integrationType: 'reels',
            quantity: 2,
          },
          {
            id: '2',
            name: 'Product 2',
            seller: 'Seller 2',
            integrationType: 'stories',
            quantity: 5,
          },
        ],
      },
      getters: {
        filteredAndSortedProducts: state => state.products,
        hasMore: state =>
          state.currentPage * state.itemsPerPage < state.products.length,
      },
      actions: {
        setPage: vi.fn(),
        removeProduct: vi.fn(),
        removeAllProducts: vi.fn(),
        updateProduct: vi.fn(),
        setFilterType: vi.fn(),
        setSortOrder: vi.fn(),
      },
    });

    vi.spyOn(store, 'dispatch');
  });

  it('renders correctly with initial data', () => {
    const wrapper = mount(ProductList, {
      global: {
        plugins: [store],
      },
    });

    expect(wrapper.find('.product-list__title').text()).toBe('Список товаров');
    expect(wrapper.findAllComponents({ name: 'ProductListCard' }).length).toBe(
      2
    );
  });

  it('opens and closes edit modal', async () => {
    const wrapper = mount(ProductList, {
      global: {
        plugins: [store],
      },
    });

    await wrapper
      .findComponent({ name: 'ProductListCard' })
      .vm.$emit('edit', store.state.products[0], '1');

    expect(wrapper.findComponent({ name: 'EditProductModal' }).exists()).toBe(
      true
    );

    await wrapper.findComponent({ name: 'EditProductModal' }).vm.$emit('close');

    expect(wrapper.findComponent({ name: 'EditProductModal' }).exists()).toBe(
      false
    );
  });

  it('removes a product when remove is triggered', async () => {
    const wrapper = mount(ProductList, {
      global: {
        plugins: [store],
      },
    });

    await wrapper
      .findComponent({ name: 'ProductListCard' })
      .vm.$emit('remove', '1');

    expect(store.dispatch).toHaveBeenCalledWith('removeProduct', '1');
  });

  it('removes all products when "Удалить все товары" is clicked', async () => {
    const wrapper = mount(ProductList, {
      global: {
        plugins: [store],
      },
    });

    await wrapper.find('.product-list__delete-all-btn').trigger('click');

    expect(store.dispatch).toHaveBeenCalledWith('removeAllProducts');
  });

  it('saves product changes when save is triggered in edit modal', async () => {
    const wrapper = mount(ProductList, {
      global: {
        plugins: [store],
      },
    });

    await wrapper
      .findComponent({ name: 'ProductListCard' })
      .vm.$emit('edit', store.state.products[0], '1');

    const editModal = wrapper.findComponent({ name: 'EditProductModal' });

    await editModal.vm.$emit('save', {
      product: { ...store.state.products[0], name: 'Updated Product' },
      id: '1',
    });

    expect(store.dispatch).toHaveBeenCalledWith('updateProduct', {
      product: { ...store.state.products[0], name: 'Updated Product' },
      id: '1',
    });
  });

  it('applies search, filter, and sort correctly', async () => {
    const wrapper = mount(ProductList, {
      global: {
        plugins: [store],
      },
    });

    await wrapper
      .findComponent({ name: 'SearchBar' })
      .vm.$emit('search', { query: 'Product 1', searchBy: 'name' });
    expect(wrapper.vm.searchQuery).toBe('Product 1');

    await wrapper
      .findComponent({ name: 'FilterSort' })
      .vm.$emit('filter', 'reels');
    expect(store.dispatch).toHaveBeenCalledWith('setFilterType', 'reels');

    await wrapper.findComponent({ name: 'FilterSort' }).vm.$emit('sort', 'asc');
    expect(store.dispatch).toHaveBeenCalledWith('setSortOrder', 'asc');
  });

  it('handles pagination correctly', async () => {
    const wrapper = mount(ProductList, {
      global: {
        plugins: [store],
      },
    });

    await wrapper.findComponent({ name: 'Pagination' }).vm.$emit('first-page');
    expect(store.dispatch).toHaveBeenCalledWith('setPage', 1);
  });
});
