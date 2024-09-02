<template>
  <div>
    <nav class="navigation">
      <router-link
        to="/"
        class="navigation__link"
        active-class="navigation__link--active"
        >Список товаров</router-link
      >
      <router-link
        to="/add"
        class="navigation__link"
        active-class="navigation__link--active"
        >Добавить товар</router-link
      >
    </nav>
    <router-view />
  </div>
</template>

<script setup></script>

<style lang="scss">
$nav-link-color: blue;
$nav-link-active-color: #000;
$nav-link-padding: 5px 15px;
$nav-link-border-radius: 5px;
$nav-link-hover-bg: #f0f0f0;

.navigation {
  display: flex;
  gap: 20px;
  padding-left: 15px;
  box-sizing: border-box;

  &__link {
    text-decoration: none;
    color: $nav-link-color;
    padding: $nav-link-padding;
    border-radius: $nav-link-border-radius;
    transition:
      background-color 0.3s,
      color 0.3s;

    &:hover {
      background-color: $nav-link-hover-bg;
    }

    &--active {
      font-weight: bold;
      color: $nav-link-active-color;
      background-color: $nav-link-hover-bg;
    }
  }
}
</style>
