<template>
  <div
    class="bg-white rounded-1 d-flex flex-column gap-2 h-100 overflow-y-auto"
  >
    <h3 class="text-main fs-sm mb-0 px-4 pt-4">Bus Line: {{ line }}</h3>
    <BaseTable
      @selected="selectBusStop"
      :rows="rows"
      :selectedIndex="selectedIndex"
    >
      <template #title> Bus Stops </template>
    </BaseTable>
  </div>
</template>

<script setup lang="ts">
import BaseTable from "./BaseTable.vue"
import { computed, toRefs } from "vue"
import { IBusStop } from "@/types"
import { useFormatBusName } from "@/composables/useFormatBusName"

const props = defineProps<{
  line: number
  stops: IBusStop[]
  selectedStop?: IBusStop
}>()
const { line, stops, selectedStop } = toRefs(props)

const emit = defineEmits<{
  (e: "selected", name: IBusStop): void
}>()

const rows = stops.value.map((stop) => useFormatBusName(stop).value)
const selectedIndex = computed(() => {
  if (!selectedStop) return undefined

  return stops.value.findIndex((stop) => stop.name === selectedStop.value?.name)
})

const selectBusStop = (index: number) => {
  emit("selected", stops.value[index])
}
</script>
