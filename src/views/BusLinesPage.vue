<template>
  <MainLayout>
    <div class="row g-0">
      <BusLineList />
    </div>
    <div class="row g-0 mt-3 d-md-flex flex-md-fill" style="max-height: 450px">
      <div class="col-md bg-white mb-2 mb-md-0 me-md-2 rounded-1 h-100">
        <BaseTablePlaceholder
          v-if="!selectedBusLine"
          :text="emptyBusLineText"
        />
        <BusStopsTable
          v-else
          @selected="selectBusStop"
          :line="selectedBusLine"
          :stops="selectedBusLineStops"
          :selectedStop="selectedBusStop"
        />
      </div>
      <div class="col-md bg-white mt-2 mt-md-0 ms-md-2 rounded-1 h-100">
        <BaseTablePlaceholder
          v-if="!selectedBusStop"
          :text="emtpyBusStopText"
        />
        <BusStopTimetable
          v-else
          :stop="selectedBusStop"
          :times="selectedBusStopTimes"
        />
      </div>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from "@/layouts/MainLayout.vue"
import BusLineList from "@/components/BusLineList.vue"
import BaseTablePlaceholder from "@/components/BaseTablePlaceholder.vue"
import BusStopsTable from "@/components/BusStopsTable.vue"
import BusStopTimetable from "@/components/BusStopTimetable.vue"

import { useStore } from "vuex"
import { computed } from "vue"
import { IBusStop } from "@/types"
import { useStoreInit } from "@/composables/useStoreInit"

useStoreInit()

const store = useStore()

const selectedBusLine = computed(() => store.getters.selectedBusLine)
const selectedBusLineStops = computed(() => store.getters.selectedBusLineStops)

const selectedBusStop = computed(() => store.getters.selectedBusStop)
const selectedBusStopTimes = computed(() => store.getters.selectedBusStopTimes)

const emptyBusLineText = "Please select the bus line first"

const emtpyBusStopText = computed(() => {
  if (!selectedBusLine.value) return emptyBusLineText

  return "Please select the bus stop first"
})

const selectBusStop = (stop: IBusStop) => {
  store.dispatch("selectBusStop", stop)
}
</script>
