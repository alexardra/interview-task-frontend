<template>
  <div class="row g-0 d-md-flex flex-md-fill" style="max-height: 675px">
    <div class="col-md bg-white rounded-1 h-100">
      <BaseSearchBar @changed="filterStops" />
      <BusStopsTable :stops="filteredBusStops" />
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseSearchBar from "@/components/BaseSearchBar.vue"
import BusStopsTable from "@/components/BusStopsTable.vue"
import { ref, computed, onMounted } from "vue"
import { useStore } from "vuex"
import { IBusStop } from "@/types"

const store = useStore()
const busStops = computed(() => store.getters.busStops as IBusStop[])

const filteredBusStops = ref<IBusStop[]>([])

onMounted(() => {
  filteredBusStops.value = busStops.value
})

const filterStops = (query: string) => {
  filteredBusStops.value = busStops.value.filter((stop) =>
    stop.name.includes(query)
  )
}
</script>
