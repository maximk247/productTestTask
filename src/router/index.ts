import { createRouter, createWebHistory } from 'vue-router';
import ProductList from '../components/ProductList.vue';
import ProductForm from '../components/ProductForm.vue';

const routes = [
  { path: '/', component: ProductList },
  { path: '/add', component: ProductForm },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
