<template>
  <form @submit.prevent="editTask" class="task">
    <InputUi v-model="title" :is-focused="title" placeholder="Название задачи"/>
    <TextAreaUi v-model="description" :is-focused="description" placeholder="Описание задачи"/>
    <ButtonUi :disabled="!isDirty" name="Сохранить"/>
  </form>
</template>

<script setup lang="ts">
import InputUi from "@/shared/ui/InputUi";
import TextAreaUi from "@/shared/ui/TextAreaUi";
import ButtonUi from "@/shared/ui/ButtonUi";

import {Store, useStore} from "vuex";
import {IRootState} from "@/store";
import {ITaskStore} from "@/features/task/taskStore";
import {onBeforeMount, onMounted, ref, watch} from "vue";
import {useRouter} from "vue-router";

const router = useRouter()
const store: Store<IRootState> = useStore()
const taskStore: ITaskStore = store.state.taskStore

const title = ref('')
const description = ref('')
const isDirty = ref(false)

function editTask() {
  store.commit('editTask', {title: title.value, description: description.value})
  router.push(`/task/${title.value}`)
  alert('Сохранение прошло успешно')
}

onBeforeMount(() => {
  title.value = taskStore.task.title
  description.value = taskStore.task.description
})
onMounted(() => {
  watch(title,(newValue: string, oldValue: string) => {
  if(newValue) {
    isDirty.value = true
  }
})
  watch(description,(newValue: string, oldValue: string) => {
    if(newValue) {
      isDirty.value = true
    }})
})
</script>

<style scoped>
  .task {
    padding: 80px 0;
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
</style>