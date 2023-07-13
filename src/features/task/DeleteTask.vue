<template>
  <button @click="() => deleteTask(taskTitle)">delete</button>
</template>

<script setup lang="ts">

import {Store, useStore} from "vuex";
import {IRootState} from "@/store";
interface IProps {
  taskTitle: string
}
const props = defineProps<IProps>()

const store: Store<IRootState> = useStore()
function deleteTask(taskTitle: string) {
  store.commit('deleteTask', taskTitle)
}
</script>

<style scoped>

</style>