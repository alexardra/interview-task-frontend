<template>
  <div class="w-100 vh-100 overflow-hidden bg-light-500">
    <MainLayout>
      <RouterView />
    </MainLayout>
  </div>
</template>

<script lang="ts">
import MainLayout from "@/layouts/MainLayout.vue"

export default {
  components: {
    MainLayout,
  },
}
</script>
