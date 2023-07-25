<template>
  <div class="bg-white p-4 pb-0 rounded-1 d-flex flex-column gap-2">
    <template v-if="isLoading">
      <div
        class="mb-0 placeholder placeholder-sm placeholder-glow bg-main"
      ></div>
      <div class="py-4">
        <div
          class="w-100 placeholder placeholder-xs placeholder-wave bg-primary"
        ></div>
        <div
          class="w-75 placeholder placeholder-xs placeholder-glow bg-primary"
        ></div>
      </div>
    </template>
    <template v-else>
      <h3 class="text-main fs-sm mb-0">Select Bus Line</h3>

      <div class="py-4 d-flex flex-wrap gap-2">
        <BusLineItem
          v-for="line in lines"
          :key="line"
          :line="line"
          :selected="selectedBusLine === line"
          :disabled="!isInitialised"
        />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import BusLineItem from "./BusLineItem.vue"
import { computed } from "vue"
import { useStore } from "vuex"
import { useStoreState } from "@/composables/useStoreState"

const store = useStore()

const lines = computed(() => store.getters.busLines)
const selectedBusLine = computed(() => store.getters.selectedBusLine)

const { isLoading, isInitialised } = useStoreState()
</script>
