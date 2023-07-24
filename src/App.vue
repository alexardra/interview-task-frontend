<template>
  <div class="w-100 min-vh-100 overflow-auto bg-light-bg">
    <MainLayout>
      <RouterView />
    </MainLayout>
  </div>
</template>

<script setup lang="ts">
import MainLayout from "@/layouts/MainLayout.vue"

import { useStore } from "vuex"

const store = useStore()

store.dispatch("init")
</script>
