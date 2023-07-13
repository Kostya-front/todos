<template>
  <AuthLayout>
    <main class="main">
      {{JSON.stringify(email)}}
      <GreateUser :username="username"/>
    </main>
  </AuthLayout>
</template>

<script setup lang="ts">
import GreateUser from "@/widgets/GreateUser.vue";
import {computed, onBeforeUnmount} from "vue";
import {useStore} from "vuex";
import {useRoute, useRouter} from "vue-router";
import AuthLayout from "@/layout/AuthLayout.vue";

const router = useRouter()
const store = useStore()

const username = computed(() => {
  const localDb = localStorage.getItem('user')
  if(localDb) {
    return JSON.parse(localDb).username
  }
})
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
