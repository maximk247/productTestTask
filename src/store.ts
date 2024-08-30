import { createStore } from 'vuex';

export default createStore({
  state: {
    products: JSON.parse(localStorage.getItem('products') || '[]'),
    cart: [], // Корзина для несохраненных товаров
    currentPage: 1,
    itemsPerPage: 20,
    filterType: '',
    sortOrder: 'name_asc', 
  },
  mutations: {
    ADD_TO_CART(state, product) {
      state.cart.push({ ...product, quantity: 1 });
    },
    REMOVE_FROM_CART(state, index) {
      state.cart.splice(index, 1); 
    },
    INCREASE_QUANTITY(state, index) {
      state.cart[index].quantity += 1;
    },
    DECREASE_QUANTITY(state, index) {
      if (state.cart[index].quantity > 1) {
        state.cart[index].quantity -= 1;
      }
    },
    UPDATE_QUANTITY(state, { index, quantity }) {
      if (quantity > 0) {
        state.cart[index].quantity = quantity;
      }
    },
    REMOVE_PRODUCT(state, index) {
      state.products.splice(index, 1);
      localStorage.setItem('products', JSON.stringify(state.products));
    },
    CLEAR_CART(state) {
      state.cart = [];
    },
    ADD_PRODUCTS(state, products) {
      state.products.push(...products);
    },
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    SET_PAGE(state, page) {
      state.currentPage = page;
    },
    SET_FILTER_TYPE(state, filterType) {
      state.filterType = filterType;
    },
    SET_SORT_ORDER(state, sortOrder) {
      state.sortOrder = sortOrder;
    },
    UPDATE_PRODUCT(state, { product, index }) {
      state.products[index] = product;
      localStorage.setItem('products', JSON.stringify(state.products));
    },
  },
  actions: {
    saveProducts({ commit, state }) {
      commit('ADD_PRODUCTS', state.cart);
      commit('CLEAR_CART');
      localStorage.setItem('products', JSON.stringify(state.products));
    },
    addToCart({ commit }, product) {
      commit('ADD_TO_CART', product);
    },
    removeFromCart({ commit }, index) {
      commit('REMOVE_FROM_CART', index);
    },
    increaseQuantity({ commit }, index) {
      commit('INCREASE_QUANTITY', index);
    },
    decreaseQuantity({ commit }, index) {
      commit('DECREASE_QUANTITY', index);
    },
    updateQuantity({ commit }, { index, quantity }) {
      commit('UPDATE_QUANTITY', { index, quantity });
    },
    removeProduct({ commit }, index) {
      commit('REMOVE_PRODUCT', index);
    },
    updateProduct({ commit }, { product, index }) {
      commit('UPDATE_PRODUCT', { product, index });
    },
    clearCart({ commit }) {
      commit('CLEAR_CART');
    },
    setPage({ commit }, page) {
      commit('SET_PAGE', page);
    },
    setFilterType({ commit }, filterType) {
      commit('SET_FILTER_TYPE', filterType);
    },
    setSortOrder({ commit }, sortOrder) {
      commit('SET_SORT_ORDER', sortOrder);
    },
  },
  getters: {
    filteredAndSortedProducts(state) {
      let products = state.products;

      // Фильтрация
      if (state.filterType && state.filterType !== 'all') {
        products = products.filter(
          product => product.integrationType === state.filterType
        );
      }

      // Сортировка
      const [key, order] = state.sortOrder.split('_');
      products = products.sort((a, b) => {
        if (order === 'asc') {
          return a[key].localeCompare(b[key]);
        } else {
          return b[key].localeCompare(a[key]);
        }
      });

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
