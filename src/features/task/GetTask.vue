<template>
  <section>
    <slot/>
  </section>
</template>

<script setup lang="ts">

import {Store, useStore} from "vuex";
import {IRootState} from "@/store";
import {computed, onBeforeMount, ref} from "vue";
import {useRoute} from "vue-router";

const route = useRoute()
const store: Store<IRootState> = useStore()



onBeforeMount(() => {
  store.commit('getTask', route.params.title)
})

</script>

<style lang="scss" scoped>
</style>