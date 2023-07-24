<template>
  <div class="row g-0 d-md-flex flex-md-fill" style="max-height: 675px">
    <div class="col-md bg-white rounded-1 h-100">
      <BaseSearchBar @changed="filterStops" />
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseSearchBar from "@/components/BaseSearchBar.vue"

const filterStops = (query: string) => {
  console.log(query)
}
</script>
