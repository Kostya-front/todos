<template>
  <div class="wrap">
    <slot name="tabs"/>
    <slot/>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
  .wrap {
    padding: 20px;
    border: 1px solid gray;
    border-radius: 20px;
    max-width: 500px;
    width: 100%;
    height: 55%;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .tabs {
    display: flex;
    justify-content: space-around;
  }
</style>