<template>
  <AuthLayout>
    <GetTask>
      <EditTask/>
    </GetTask>
  </AuthLayout>
</template>

<script setup lang="ts">
import AuthLayout from "@/layout/AuthLayout";
import TaskPage from "@/widgets/TaskPage.vue";
import GetTask from "@/features/task/GetTask.vue";
import EditTask from "@/features/task/EditTask.vue";

</script>

<style lang="scss" scoped>

</style>