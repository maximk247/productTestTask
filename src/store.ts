import { v4 as uuidv4 } from 'uuid';
import { createStore } from 'vuex';
import { Product } from './interfaces/ProductInterfaces';

interface State {
  products: Product[];
  cart: Product[];
  currentPage: number;
  itemsPerPage: number;
  filterType: string;
  sortOrder: string;
}

export default createStore<State>({
  state: {
    products: JSON.parse(localStorage.getItem('products') || '[]'),
    cart: [],
    currentPage: 1,
    itemsPerPage: 20,
    filterType: 'all',
    sortOrder: 'none',
  },
  mutations: {
    ADD_TO_CART(state, product: Product) {
      if (!product.id) product.id = uuidv4();
      state.cart.push({ ...product, quantity: 1 });
    },
    UPDATE_PRODUCT_IMAGE(
      state,
      { index, image }: { index: number; image: string }
    ) {
      state.cart[index].image = image;
    },
    REMOVE_FROM_CART(state, index: number) {
      state.cart.splice(index, 1);
    },
    INCREASE_QUANTITY(state, index: number) {
      state.cart[index].quantity += 1;
    },
    DECREASE_QUANTITY(state, index: number) {
      if (state.cart[index].quantity > 1) {
        state.cart[index].quantity -= 1;
      }
    },
    UPDATE_QUANTITY(
      state,
      { index, quantity }: { index: number; quantity: number }
    ) {
      if (quantity > 0) {
        state.cart[index].quantity = quantity;
      }
    },
    REMOVE_PRODUCT(state, id: string) {
      state.products = state.products.filter(product => product.id !== id);
      localStorage.setItem('products', JSON.stringify(state.products));
    },
    REMOVE_ALL_PRODUCTS(state) {
      state.products = [];
      localStorage.setItem('products', JSON.stringify(state.products));
    },
    CLEAR_CART(state) {
      state.cart = [];
    },
    ADD_PRODUCTS(state, products: Product[]) {
      products.forEach(product => {
        if (!product.id) product.id = uuidv4();
        state.products.push(product);
      });
    },
    SET_PRODUCTS(state, products: Product[]) {
      state.products = products;
    },
    SET_PAGE(state, page: number) {
      state.currentPage = page;
    },
    SET_FILTER_TYPE(state, filterType: string) {
      state.filterType = filterType;
    },
    SET_SORT_ORDER(state, sortOrder: string) {
      state.sortOrder = sortOrder;
    },
    UPDATE_PRODUCT(state, { product, id }: { product: Product; id: string }) {
      const index = state.products.findIndex(p => p.id === id);
      if (index !== -1) {
        state.products[index] = product;
        localStorage.setItem('products', JSON.stringify(state.products));
      }
    },
  },
  actions: {
    saveProducts({ commit, state }) {
      commit('ADD_PRODUCTS', state.cart);
      commit('CLEAR_CART');
      localStorage.setItem('products', JSON.stringify(state.products));
    },
    addToCart({ commit }, product: Product) {
      commit('ADD_TO_CART', product);
    },
    removeFromCart({ commit }, index: number) {
      commit('REMOVE_FROM_CART', index);
    },
    increaseQuantity({ commit }, index: number) {
      commit('INCREASE_QUANTITY', index);
    },
    decreaseQuantity({ commit }, index: number) {
      commit('DECREASE_QUANTITY', index);
    },
    updateQuantity(
      { commit },
      { index, quantity }: { index: number; quantity: number }
    ) {
      commit('UPDATE_QUANTITY', { index, quantity });
    },
    removeProduct({ commit }, id: string) {
      commit('REMOVE_PRODUCT', id);
    },
    removeAllProducts({ commit }) {
      commit('REMOVE_ALL_PRODUCTS');
    },
    updateProduct({ commit }, product: Product) {
      commit('UPDATE_PRODUCT', product);
    },
    clearCart({ commit }) {
      commit('CLEAR_CART');
    },
    setPage({ commit }, page: number) {
      commit('SET_PAGE', page);
    },
    setFilterType({ commit }, filterType: string) {
      commit('SET_FILTER_TYPE', filterType);
    },
    setSortOrder({ commit }, sortOrder: string) {
      commit('SET_SORT_ORDER', sortOrder);
    },
  },
  getters: {
    filteredAndSortedProducts(state) {
      let products = state.products;

      if (state.filterType && state.filterType !== 'all') {
        products = products.filter(
          product => product.integrationType === state.filterType
        );
      }

      if (state.sortOrder !== 'none') {
        const [key, order] = state.sortOrder.split('_');
        products = products.sort((a, b) => {
          if (order === 'asc') {
            return a[key].localeCompare(b[key]);
          } else {
            return b[key].localeCompare(a[key]);
          }
        });
      }

      return products;
    },

    paginatedProducts(state, getters) {
      const start = (state.currentPage - 1) * state.itemsPerPage;
      return getters.filteredAndSortedProducts.slice(
        start,
        start + state.itemsPerPage
      );
    },

    hasMore(state, getters) {
      return (
        getters.filteredAndSortedProducts.length >
        state.currentPage * state.itemsPerPage
      );
    },

    cartItems(state) {
      return state.cart;
    },
  },
});
