<template>
  <div
    class="container-md vh-md-100 py-3 px-4 d-flex flex-column gap-4 overflow-md-hidden"
  >
    <h1 class="text-main m-0 p-0 h3">Timetable</h1>
    <div class="d-flex h-100 flex-column gap-3 align-items-start">
      <NavBar :links="AppRoutes" />
      <div class="container-fluid p-0 h-100 d-flex flex-column">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBar from "@/components/NavBar.vue"
import { AppRoutes } from "@/router"
</script>
