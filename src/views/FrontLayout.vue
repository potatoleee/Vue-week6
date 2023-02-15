<template>
  <div class="text-center">
    <h1>這是前台頁面</h1>
    <RouterLink to="/">home</RouterLink>|
    <RouterLink to="/about">about</RouterLink>|
    <RouterLink to="/products">產品一覽</RouterLink>|
    <RouterLink to="/cart">購物車</RouterLink>|
    <RouterLink to="/login">login</RouterLink>|
    <RouterLink to="/admin/products">後台產品頁面</RouterLink>|
    <RouterView></RouterView>
  </div>
</template>
<script>
import { RouterView } from "vue-router";
export default {
  components: {
    RouterView,
  },
};
</script>
