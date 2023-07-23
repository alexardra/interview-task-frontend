<template>
  <table class="table table-responsive mb-0 fs-xs">
    <thead>
      <tr>
        <th scope="col" class="px-4 py-4 fw-medium">
          <slot name="title"></slot>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) in rows" :key="index">
        <td class="px-4 py-3">{{ row }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
defineProps<{
  rows: string[]
}>()
</script>
