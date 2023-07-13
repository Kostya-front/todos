<template>
  <div
      :class="{
        task_selected: task.isSelected,
        task_completed: task.isComplete
      }"
      class="task"
  >
    <span class="title text-middle">{{task.title}}</span>
    <SelecteTask :task="task"/>
    <CompleteTask :task="task"/>
    <DeleteTask :task-title="task.title"/>
    <router-link :to="'/task/' + task.title"/>
  </div>
</template>

<script setup lang="ts">
import {ITask} from "@/features/task/taskStore";
import DeleteTask from "@/features/task/DeleteTask.vue";
import SelecteTask from "@/features/task/SelecteTask.vue";
import CompleteTask from "@/features/task/CompleteTask.vue";

interface IProps {
  task: ITask
}
const props = defineProps<IProps>()
</script>

<style lang="scss" scoped>
  .task {
    display: grid;
    grid-template-columns: auto max-content max-content max-content;
    gap: 20px;
    text-align: left;
    border: 2px solid;
    border-radius: 10px;
    padding: 10px;
    position: relative;
    &_selected {
      border: 2px solid green;
    }
    &_completed {
      text-decoration: line-through;
    }
    button {
      position: relative;
      z-index: 10;
    }
    a {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
    }
  }
</style>