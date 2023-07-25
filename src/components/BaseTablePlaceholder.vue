<template>
  <div class="w-100 h-100 d-flex justify-content-center align-items-center">
    <div
      v-if="isLoading"
      class="w-50 placeholder placeholder-sm placeholder-glow bg-lighten-2"
    ></div>
    <div v-else class="text-lighten-2 fs-sm">
      {{ text }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStoreState } from "@/composables/useStoreState"

defineProps<{
  text: string
}>()
const { isLoading } = useStoreState()
</script>
