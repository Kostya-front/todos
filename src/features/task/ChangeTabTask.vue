<template>
  <div class="tabs">
    <span
        v-for="tab of tabs"
        @click="() => changeTab(tab)"
        :class="{tab_active: taskTitle === tab}"
        :key="tab"
        class="text-middle"
    >
      {{tab}}
    </span>
  </div>
</template>

<script setup lang="ts">
import {Store, useStore} from "vuex";
import {IRootState} from "@/store";
import {computed, ref} from "vue";
import {IAuthState} from "@/features/auth/authStore";

const store: Store<IRootState> = useStore()
const authStore: IAuthState = store.state.authStore

const tabs = ref(['Все задачи', 'Избранное', 'Завершенные'])

function changeTab(title: string) {
  store.commit('changeTabTask', title)
}

const taskTitle = computed(() => {
  return store.getters.tabTitle
})
</script>

<style lang="scss" scoped>
  .tabs {
    display: flex;
    justify-content: flex-start;
    gap: 30px;
    margin-top: 50px;
  }
  .tab {
    &_active {
      color: #182634;
      text-decoration: underline;
    }
  }
</style>