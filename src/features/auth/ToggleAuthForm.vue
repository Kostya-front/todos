<template>
  <div class="tabs">
    <span
        @click="() => toggleIndex(1)"
        :class="{tab_active: authStore.tabIndex === 1 }"
        class="tab text-middle"
    >
      Регистрация
    </span>
    <span
        @click="() => toggleIndex(2)"
        :class="{tab_active: authStore.tabIndex === 2 }"
        class="tab text-middle"
    >
      Авторизация
    </span>
  </div>
</template>

<script setup lang="ts">

import {useStore} from "vuex";
import {IAuthState} from "@/features/auth/authStore";

const store = useStore()
const authStore: IAuthState = store.state.authStore

function toggleIndex(index: number) {
  store.commit('toggleAuthForm', index)
}
</script>

<style scoped>
  .tabs {
    display: flex;
    justify-content: space-around;
  }
</style>