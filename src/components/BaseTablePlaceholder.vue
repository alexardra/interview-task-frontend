<template>
  <div class="w-100 h-100 d-flex justify-content-center align-items-center">
    <div class="text-lighten-2 fs-sm">
      {{ text }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  text: string
}>()
</script>
