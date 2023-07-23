<template>
  <div class="bg-white p-4 rounded-1 d-flex flex-column gap-2">
    <h3 class="text-main fs-sm mb-0">Select Bus Line</h3>

    <div class="py-4 d-flex flex-wrap gap-2">
      <BusLineItem v-for="line in lines" :key="line" :line="line" />
    </div>
  </div>
</template>

<script setup lang="ts">
import BusLineItem from "./BusLineItem.vue"
import { computed } from "vue"
import { useStore } from "vuex"

const store = useStore()

const lines = computed(() => store.getters.busLines)
</script>
