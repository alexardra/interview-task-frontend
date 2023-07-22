<template>
  <div class="container-md h-100 py-3 px-4 d-flex flex-column gap-4">
    <h1 class="text-dark-500 m-0 p-0 h3">Timetable</h1>
    <div class="d-flex h-100 flex-column gap-3 align-items-start">
      <NavBar :links="AppRoutes" />
      <div class="w-100 h-100">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBar from "@/components/NavBar.vue"
import { AppRoutes } from "@/router"
</script>
