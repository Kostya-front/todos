<template>
  <div class="info">
    <h1 class="text-large">Приветствую, {{username}}</h1>
    <p class="text-middle">Перейди на страницу задач и начни работу</p>
    <ButtonUi @click="router.push('/tasks')" name="Перейти"/>
  </div>
</template>

<script setup lang="ts">

import {Store, useStore} from "vuex";
import {IRootState} from "@/store";
import {IAuthState} from "@/features/auth/authStore";
import {onBeforeMount, ref} from "vue";
import ButtonUi from "@/shared/ui/ButtonUi.vue";
import {useRouter} from "vue-router";

interface IProps {
  username: string
}

const props = defineProps<IProps>()


const router = useRouter()
const store: Store<IRootState> = useStore()

const authStore: IAuthState = store.state.authStore

const text = ref('')

onBeforeMount(() => {
  store.commit('getUser', props.email)
  store.commit('loadUsersDb')
})

</script>

<style lang="scss" scoped>
  .info {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
</style>