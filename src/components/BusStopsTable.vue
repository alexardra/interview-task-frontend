<template>
  <div class="bg-white rounded-1 d-flex flex-column gap-2 overflow-y-auto">
    <h3 v-if="line" class="text-main fs-sm mb-0 px-4 pt-4">
      Bus Line: {{ line }}
    </h3>
    <BaseTable
      @selected="selectBusStop"
      :rows="rows"
      :selectedIndex="selectedIndex"
    >
      <template #title>
        <div class="d-flex align-items-center gap-1">
          <span>Bus Stops</span>
          <button class="btn btn-plain p-0 lh-1" @click="toggleStopsOrder">
            <SortIcon />
          </button>
        </div>
      </template>
    </BaseTable>
  </div>
</template>

<script setup lang="ts">
import BaseTable from "./BaseTable.vue"
import SortIcon from "./SortIcon.vue"
import { computed, toRefs } from "vue"
import { IBusStop } from "@/types"
import { useFormatBusName } from "@/composables/useFormatBusName"

const props = defineProps<{
  stops: IBusStop[]
  line?: number
  selectedStop?: IBusStop
}>()
const { line, stops, selectedStop } = toRefs(props)

const emit = defineEmits<{
  (e: "selected", name: IBusStop): void
  (e: "toggleOrder"): void
}>()

const rows = computed(() => {
  return stops.value.map((stop) => useFormatBusName(stop).value)
})
const selectedIndex = computed(() => {
  if (!selectedStop) return undefined

  return stops.value.findIndex((stop) => stop.name === selectedStop.value?.name)
})

const selectBusStop = (index: number) => {
  emit("selected", stops.value[index])
}

const toggleStopsOrder = () => {
  emit("toggleOrder")
}
</script>
