<template>
  <div class="container">
    <nav>
      <h4 class="brand-title">
        <nuxt-link to="/">CENAC IRPF 2023</nuxt-link>
      </h4>
    </nav>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import "./assets/picocss-theme.scss";
</script>

<style scoped>
.brand-title {
  margin-top: 1rem;
}
</style>
