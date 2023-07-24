<template>
  <table class="table table-responsive mb-0 fs-xs">
    <thead>
      <tr>
        <th scope="col" class="px-4 py-4 fw-medium fs-xs">
          <slot name="title"></slot>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) in rows" :key="index">
        <td
          @click="selectRow(index)"
          class="px-4 py-3 text-lighten-1"
          :class="{ active: selectedIndex === index }"
        >
          {{ row }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
defineProps<{
  rows: string[]
  selectedIndex?: number
}>()

const emit = defineEmits<{
  (e: "selected", index: number): void
}>()

const selectRow = (index: number) => {
  emit("selected", index)
}
</script>

<style scoped lang="scss">
@import "@/styles/variables.scss";

table td:hover {
  background-color: $lighten-bg-1 !important;
  cursor: pointer;
}

td.active {
  color: $primary !important;
}
</style>
