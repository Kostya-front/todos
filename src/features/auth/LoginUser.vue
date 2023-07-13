<template>
  <form @submit.prevent="($event) => login($event.target)" class="form">
    <InputUi v-model="email" :is-focused="email" placeholder="Email"/>

    <InputUi v-model="password" :is-focused="password" placeholder="Password"/>

    <ButtonUi name="Зарегистрироваться"/>
  </form>
  <p v-if="authStore.error" class="text-middle">{{authStore.error}}</p>
</template>

<script setup lang="ts">
import InputUi from "@/shared/ui/InputUi";
import ButtonUi from "@/shared/ui/ButtonUi.vue";
import {Store, useStore} from "vuex";
import {IAuthState} from "@/features/auth/authStore";
import {Ref, ref, watch} from "vue";
import {useRouter} from "vue-router";

const router = useRouter()
const store: Store<{authStore: IAuthState}> = useStore()
const authStore: IAuthState = store.state.authStore

const email = ref('')
const password = ref('')

function login(event: HTMLFormElement) {
  store.commit('login', {
    email: email.value, password: password.value
  })
}

watch(() => authStore.isAuth, (value) => {
  if(value) {
    router.push({name: 'home', params: {email: email.value}, state: {email: email.value}})
  }
})

</script>

<style lang="scss" scoped>
.form {
  display: grid;
  grid-template-rows: 70px 70px 70px;
  gap: 20px;
  height: 100%;
}
</style>