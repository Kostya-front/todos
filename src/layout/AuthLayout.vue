<template>
  <header class="header">
    <div class="container container-flex">
      <router-link to="/tasks">
        <span class="text-middle logo">Список задач</span>
      </router-link>
      <LogoutUser/>
    </div>
  </header>

  <div class="container container-column-flex">
    <slot/>
  </div>
</template>

<script setup lang="ts">
import ButtonUi from "@/shared/ui/ButtonUi";
import LogoutUser from "@/features/auth/LogoutUser.vue";

</script>

<style lang="scss" scoped>
  .header {
    height: 80px;
    background: #2c3e50;
    display: flex;
    align-items: center;
    button {
      color: #2c3e50;
      background: #fff;
    }
  }
  .container-column-flex {
    display: flex;
    flex-direction: column;
    gap: 50px;
  }
  .container-flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logo {
    color: #fff;
    padding: 10px;
    border-bottom: 5px solid #fff;

  }
</style>