import { createStore } from 'vuex';

export default createStore({
  state: {
    products: JSON.parse(localStorage.getItem('products') || '[]'),
    currentPage: 1,
    itemsPerPage: 20,
  },
  mutations: {
    ADD_PRODUCT(state, product) {
      state.products.push(product);
      localStorage.setItem('products', JSON.stringify(state.products));
    },
    REMOVE_PRODUCT(state, index) {
      state.products.splice(index, 1);
      localStorage.setItem('products', JSON.stringify(state.products));
    },
    SET_PRODUCTS(state, products) {
      state.products = products;
      localStorage.setItem('products', JSON.stringify(state.products));
    },
    SET_PAGE(state, page) {
      state.currentPage = page;
    },
  },
  actions: {
    addProduct({ commit }, product) {
      commit('ADD_PRODUCT', product);
    },
    removeProduct({ commit }, index) {
      commit('REMOVE_PRODUCT', index);
    },
    setProducts({ commit }, products) {
      commit('SET_PRODUCTS', products);
    },
    setPage({ commit }, page) {
      commit('SET_PAGE', page);
    },
  },
  getters: {
    paginatedProducts(state) {
      const start = (state.currentPage - 1) * state.itemsPerPage;
      return state.products.slice(start, start + state.itemsPerPage);
    },
    hasMore(state) {
      return state.products.length > state.currentPage * state.itemsPerPage;
    },
  },
});
