<template>
  <button :disabled="disabled" class="button text-middle">
    {{name}}
  </button>
</template>

<script setup lang="ts">

import {defineProps} from "vue";
interface IProps {
  name: string
  disabled?: boolean
}
const props = defineProps<IProps>()
</script>

<style lang="scss" scoped>
  .button {
    background: #2c3e50;
    color: #fff;
    border-radius: 10px;
    padding: 15px 20px;
    border: none;
    &:disabled {
      background: #92b2d2;
    }
  }
</style>