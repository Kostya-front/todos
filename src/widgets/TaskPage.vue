<template>
  <section class="task">
    <div class="header">{{}}</div>
    <InputUi v-model="title"/>
    <TextAreaUi v-model="description"/>
    <ButtonUi name="Сохранить"/>
  </section>
</template>

<script setup lang="ts">
import InputUi from "@/shared/ui/InputUi";
import TextAreaUi from "@/shared/ui/TextAreaUi";
import ButtonUi from "@/shared/ui/ButtonUi";
import {Store, useStore} from "vuex";
import {IRootState} from "@/store";
import {ITaskStore} from "@/features/task/taskStore";
import {computed, ref} from "vue";

const store: Store<IRootState> = useStore()
const taskStore: ITaskStore = store.state.taskStore

const task = computed(() => {
  return store.getters.task
})

const title = ref(store.getters.task.title)
const description = ref(store.getters.task.description)
</script>

<style lang="scss" scoped>
  .task {
    padding: 80px 0;
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
</style>