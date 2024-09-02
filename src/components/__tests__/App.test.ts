import App from '@/App.vue';
import Navigation from '@/components/navigation/Navigation.vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', name: 'Home', component: { template: '<div>Home</div>' } },
  {
    path: '/add',
    name: 'AddProduct',
    component: { template: '<div>Add Product</div>' },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

describe('App.vue', () => {
  it('renders Navigation component and router-view', async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.findComponent(Navigation).exists()).toBe(true);

    // Проверяем, что router-view рендерит компонент в зависимости от маршрута
    await router.push('/');
    await wrapper.vm.$nextTick();
    expect(wrapper.html()).toContain('<div>Home</div>');

    await router.push('/add');
    await wrapper.vm.$nextTick();
    expect(wrapper.html()).toContain('<div>Add Product</div>');
  });
});
