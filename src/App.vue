<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <router-link to="/">home</router-link>
  <router-link to="/about">about</router-link>
  <RouterView />
</template>
<style lang="scss">
@import "./assets/all.scss";
</style>
