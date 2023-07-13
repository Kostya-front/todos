<template>
  <button
      v-if="!task.isSelected"
      @click="() => selectTask(task.title)"
  >
    Добавить в избранное
  </button>

  <button
      v-else
      @click="() => removeFromSelected(task.title)"
  >
    Удалить из избранное
  </button>
</template>

<script setup lang="ts">

import {Store, useStore} from "vuex";
import {IRootState} from "@/store";
import {ITask} from "@/features/task/taskStore";

interface IProps {
  task: ITask
}

const props = defineProps<IProps>()
const store: Store<IRootState> = useStore()

function selectTask(title: string) {
  store.commit('selectTask', title)
}

function removeFromSelected(title: string) {
  store.commit('removeFromSelected', title)
}
</script>

<style lang="scss" scoped>

</style>