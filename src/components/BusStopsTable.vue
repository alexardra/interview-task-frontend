<template>
  <div
    class="bg-white rounded-1 d-flex flex-column gap-2 h-100 overflow-y-auto"
    style="max-height: 360px"
  >
    <h3 class="text-main fs-sm mb-0 px-4 pt-4">Bus Line: 104</h3>
    <BaseTable :rows="rows">
      <template #title> Bus Stops </template>
    </BaseTable>
  </div>
</template>

<script setup lang="ts">
import { IBusStop } from "@/types"
import { computed, toRefs } from "vue"
import BaseTable from "./BaseTable.vue"

const props = defineProps<{ stops: IBusStop[] }>()

const { stops } = toRefs(props)

const rows = computed(() => {
  return stops.value.map((stop) => `${stop.name} ${stop.order}`)
})
</script>
