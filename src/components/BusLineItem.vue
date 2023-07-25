<template>
  <button
    class="btn btn-lg btn-primary fs-xs border-0 outline-0"
    :class="{ active: selected }"
    @click="selectBusLine"
    :disabled="disabled"
  >
    {{ line }}
  </button>
</template>

<script setup lang="ts">
import { useStore } from "vuex"

const props = defineProps<{
  line: number
  selected?: boolean
  disabled?: boolean
}>()
const store = useStore()

const selectBusLine = () => {
  store.dispatch("selectBusLine", { line: props.line })
}
</script>
