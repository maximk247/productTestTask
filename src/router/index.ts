import { createRouter, createWebHistory } from 'vue-router';
import ProductForm from '../components/product-form/ProductForm.vue';
import ProductList from '../components/product-list/ProductList.vue';

const routes = [
  { path: '/', component: ProductList },
  { path: '/add', component: ProductForm },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
