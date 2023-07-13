<template>
  <div class="wrap">
    <input
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="text-middle"
        type="text"
    />
    <span
        :class="{placeholder_active: isFocused}"
        class="placeholder text-small"
    >
      {{placeholder}}
    </span>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";

interface IProps {
  placeholder: string
  isFocused: string
  modelValue: string
}
const props = defineProps<IProps>()
const emit = defineEmits(['update:modelValue'])

const text = ref('')

</script>

<style lang="scss" scoped>
  .wrap {
    border: 1px solid #2c3e50;
    border-radius: 10px;
    box-shadow: 1px 1px 5px #2c3e50;
    position: relative;
  }
  .placeholder {
    position: absolute;
    left: 10px;
    top: 10px;
    transform: translateY(0);
    background: #fff;
    padding: 5px;
    transition: 0.2s;
    &_active {
      transform: translateY(-25px);
    }
  }
</style>