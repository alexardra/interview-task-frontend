<template>
  <div class="row g-0">
    <BusLineList />
  </div>
  <div class="row g-0 mt-3 d-md-flex flex-md-fill">
    <div class="col-md bg-white mb-2 mb-md-0 me-md-2 rounded-1 h-100">
      <BaseTablePlaceholder
        v-if="!selectedBusLine"
        text="Please select the bus line first"
      />
      <BusStopsTable v-else :stops="selectedBusLineStops" />
    </div>
    <div class="col-md bg-white mt-2 mt-md-0 ms-md-2 rounded-1">
      <BaseTablePlaceholder text="Please select the bus line first" />
    </div>
  </div>
</template>

<script setup lang="ts">
import BusLineList from "@/components/BusLineList.vue"
import BaseTablePlaceholder from "@/components/BaseTablePlaceholder.vue"
import BusStopsTable from "@/components/BusStopsTable.vue"

import { useStore } from "vuex"
import { computed } from "vue"
const store = useStore()

const selectedBusLine = computed(() => store.getters.selectedBusLine)
const selectedBusLineStops = computed(() => store.getters.selectedBusLineStops)
</script>
