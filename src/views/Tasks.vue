<template>
  <AuthLayout>
    <ChangeTabTask/>
    <TaskGrid/>
  </AuthLayout>
</template>

<script setup lang="ts">
import AuthLayout from "@/layout/AuthLayout";
import TaskGrid from "@/widgets/TasksGrid.vue";
import ChangeTabTask from "@/features/task/ChangeTabTask.vue";

</script>

<style lang="scss" scoped>

</style>