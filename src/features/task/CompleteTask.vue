<template>
  <button v-if="!task.isComplete" @click="() => completeTask(task.title)">Завершить</button>
  <button v-else @click="() => completeTask(task.title)">Активировать</button>
</template>

<script setup lang="ts">

import {Store, useStore} from "vuex";
import {IRootState} from "@/store";
import {ITask, ITaskStore} from "@/features/task/taskStore";

interface IProps {
  task: ITask
}

const props = defineProps<IProps>()
const store: Store<IRootState> = useStore()

const taskStore: ITaskStore = store.state.taskStore

function completeTask(taskTitle: string) {
  store.commit('completeTask', taskTitle)
}
</script>

<style scoped>

</style>