import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it } from 'vitest';
import { createRouter, createWebHistory } from 'vue-router';
import Navigation from '@/components/navigation/Navigation.vue';

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

describe('Navigation.vue', () => {
  beforeEach(async () => {
    router.push('/');
    await router.isReady();
  });

  it('renders navigation links', () => {
    const wrapper = mount(Navigation, {
      global: {
        plugins: [router],
      },
    });

    const links = wrapper.findAll('.navigation__link');
    expect(links).toHaveLength(2);
    expect(links[0].text()).toBe('Список товаров');
    expect(links[1].text()).toBe('Добавить товар');
  });

  it('applies active class to the active link', async () => {
    const wrapper = mount(Navigation, {
      global: {
        plugins: [router],
      },
    });

    await router.push('/');
    await wrapper.vm.$nextTick();

    let activeLink = wrapper.find('.navigation__link--active');
    expect(activeLink.exists()).toBe(true);
    expect(activeLink.text()).toBe('Список товаров');

    await router.push('/add');
    await wrapper.vm.$nextTick();

    activeLink = wrapper.find('.navigation__link--active');
    expect(activeLink.exists()).toBe(true);
    expect(activeLink.text()).toBe('Добавить товар');
  });
});
