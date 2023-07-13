<template>
  <ButtonUi @click.native="logout" name="Выйти"/>
</template>

<script setup lang="ts">
import ButtonUi from "@/shared/ui/ButtonUi";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
const store = useStore()
const router = useRouter()

function logout() {
  store.commit('logout')
  router.push('/')
}
</script>

<style lang="scss" scoped>

</style>