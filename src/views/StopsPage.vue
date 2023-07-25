<template>
  <MainLayout>
    <div class="row g-0 d-md-flex flex-md-fill" style="max-height: 675px">
      <div class="col-md bg-white rounded-1 h-100">
        <template v-if="!isInitialised">
          <div
            class="w-100 h-100 d-flex align-items-center justify-content-center"
          >
            <div
              class="w-50 placeholder placeholder-xs placeholder-glow bg-lighten-2"
            ></div>
          </div>
        </template>
        <template v-else>
          <BaseSearchBar @changed="filterStops" />
          <BusStopsTable :stops="filteredBusStops" />
        </template>
      </div>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from "@/layouts/MainLayout.vue"
import BaseSearchBar from "@/components/BaseSearchBar.vue"
import BusStopsTable from "@/components/BusStopsTable.vue"
import { ref, computed, watch } from "vue"
import { useStore } from "vuex"
import { IBusStop } from "@/types"
import { search } from "@/utils"
import { useStoreInit } from "@/composables/useStoreInit"
import { useStoreState } from "@/composables/useStoreState"

useStoreInit()

const store = useStore()
const busStops = computed(() => store.getters.busStops as IBusStop[])
const filteredBusStops = ref<IBusStop[]>([])

const { isInitialised } = useStoreState()

watch(
  isInitialised,
  () => {
    if (isInitialised.value) {
      filteredBusStops.value = busStops.value
    }
  },
  { immediate: true }
)

const filterStops = (query: string) => {
  /*
   * Abstracting away search - for possibility of future improvement
   */
  filteredBusStops.value = search(busStops.value, query, (item) => item.name)
}
</script>
