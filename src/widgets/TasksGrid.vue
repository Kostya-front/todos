<template>
  <section class="form">
    <CreateTask/>
    <ul class="list">
      <li v-for="task of tasks" :key="task.title" class="item">
        <TaskItem :task="task"/>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import TaskItem from "@/entities/TaskItem";
import {computed, onBeforeMount, ref} from "vue";
import {Store, useStore} from "vuex";
import {IRootState} from "@/store";
import CreateTask from "@/features/task/CreateTask.vue";
import {ITask} from "@/features/task/taskStore";

const title = ref('')
const description = ref('')

const store: Store<IRootState> = useStore()
const taskStore = store.state.taskStore
const authStore = store.state.authStore

const tasks = computed(() => {
  return store.getters.tasks.filter((task: ITask) => task.userEmail === authStore.user.email) as ITask[]
})
onBeforeMount(() => {
  store.commit('getAllTasks')
})
</script>

<style lang="scss" scoped>
  .form {
    display: grid;
    grid-template-columns: 1fr 3fr;
    padding: 40px 0;
    gap: 30px;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    & button {
      margin-top: 30px;
    }
  }
  .list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .item {

  }
</style>