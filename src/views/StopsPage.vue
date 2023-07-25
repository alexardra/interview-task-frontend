<template>
  <MainLayout>
    <div class="row g-0 d-md-flex flex-md-fill h-container h-md-container">
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
          <BaseSearchBar @changed="updateQuery" />
          <BusStopsTable
            class="h-rest"
            :stops="filteredBusStops"
            @click="toggleOrder"
          />
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

const query = ref("")

const updateQuery = (q: string) => {
  query.value = q
  filterStops()
}

const filterStops = () => {
  /*
   * Abstracting away search - for possibility of future improvement
   */
  filteredBusStops.value = search(
    busStops.value,
    query.value,
    (item) => item.name
  )
}

const toggleOrder = () => {
  store.dispatch("toggleStopsSortOrder")
  filterStops()
}
</script>

<style scoped>
.h-container {
  max-height: 450px;
}

@media (min-width: 768px) {
  .h-md-container {
    max-height: calc(100vh - 10rem);
  }
}

.h-rest {
  height: calc(100% - 60px);
}
</style>
