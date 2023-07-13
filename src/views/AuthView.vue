<template>
  <main class="main">
    <Authorization/>
  </main>
</template>

<script setup lang="ts">
import Authorization from "@/widgets/Authorization.vue"; // @ is an alias to /src
</script>

<style lang="scss">
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
