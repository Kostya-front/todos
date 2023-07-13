<template>
  <form @submit.prevent="createTask" class="form_aside">
    <InputUi v-model="title" :is-focused="title" placeholder="Название задачи"/>
    <TextAreaUi v-model="description" :is-focused="description" placeholder="Описание"/>
    <ButtonUi name="Создать"/>
  </form>
</template>

<script setup lang="ts">
import InputUi from "@/shared/ui/InputUi";
import TextAreaUi from "@/shared/ui/TextAreaUi";
import ButtonUi from "@/shared/ui/ButtonUi";
import {ref} from "vue";
import {Store, useStore} from "vuex";
import {IRootState} from "@/store";
import {ITaskStore} from "@/features/task/taskStore";
import {IAuthState} from "@/features/auth/authStore";

const store: Store<IRootState> = useStore()
const taskStore: ITaskStore = store.state.taskStore
const authStore: IAuthState = store.state.authStore

const title = ref('')
const description = ref('')

function createTask() {
  store.commit('createTask', {
    title: title.value,
    userEmail: authStore.user.email,
    description: description.value,
    isSelected: false,
    isComplete: false
  })
  title.value = ''
  description.value = ''
}
</script>

<style lang="scss" scoped>
  .form_aside {
    position: sticky;
    top: 10px;
    height: max-content;
  }
</style>