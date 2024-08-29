<template>
  <div>
    <nav>
      <router-link to="/">Список товаров</router-link>
      <router-link to="/add">Добавить товар</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script setup></script>

<style>
nav {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

nav a {
  text-decoration: none;
  color: blue;
}

nav a.router-link-active {
  font-weight: bold;
}
</style>
