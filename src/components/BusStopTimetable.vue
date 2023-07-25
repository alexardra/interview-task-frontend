<template>
  <div
    class="bg-white rounded-1 d-flex flex-column gap-2 h-100 overflow-y-auto"
  >
    <h3 class="text-main fs-sm mb-0 px-4 pt-4">
      Bus Stop: {{ useFormatBusName(stop).value }}
    </h3>
    <BaseTable :rows="times">
      <template #title>Time:</template>
    </BaseTable>
  </div>
</template>

<script setup lang="ts">
import BaseTable from "./BaseTable.vue"
import { toRefs } from "vue"
import { IBusStop } from "@/types"
import { useFormatBusName } from "@/composables/useFormatBusName"

const props = defineProps<{ stop: IBusStop; times: string[] }>()
const { stop, times } = toRefs(props)
</script>
