<template>
  <button
    class="btn btn-lg btn-primary border-0 outline-0"
    :class="{ 'bg-main-primary-active': selected }"
    @click="selectBusLine"
  >
    {{ line }}
  </button>
</template>

<script setup lang="ts">
import { useStore } from "vuex"

const props = defineProps<{
  line: number
  selected: boolean
}>()
const store = useStore()

const selectBusLine = () => {
  store.dispatch("selectBusLine", { line: props.line })
}
</script>

<style scoped>
button {
  font-size: 0.75rem;
}

button:hover {
  background-color: #0f3bb4;
}
</style>
