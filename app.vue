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
import "@picocss/pico";
</script>

<style scoped>
.brand-title {
  margin-top: 1rem;
}
</style>
