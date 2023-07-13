<template>
  <AuthorizationForm>
    <template v-slot:tabs>
      <ToggleAuthForm/>
    </template>

    <RegisterUser v-if="authStore.tabIndex === 1"/>

    <LoginUser v-else/>
  </AuthorizationForm>
</template>

<script setup lang="ts">

import AuthorizationForm from "@/entities/AuthorizationForm.vue";
import RegisterUser from "@/features/auth/RegisterUser.vue";
import LoginUser from "@/features/auth/LoginUser.vue";
import ToggleAuthForm from "@/features/auth/ToggleAuthForm.vue";
import {Store, useStore} from "vuex";
import {IAuthState} from "@/features/auth/authStore";

const store: Store<any> = useStore()

const authStore: IAuthState = store.state.authStore
</script>

<style lang="scss" scoped>

</style>