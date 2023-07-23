<template>
  <nav class="w-100 bg-white navbar py-0 px-4 rounded-1">
    <ul class="nav" role="tablist">
      <li
        v-for="link in links"
        :key="`nav-item-${link.path}`"
        class="nav-item fs-sm"
        activeClass="border-bottom border-2 border-primary"
      >
        <RouterLink
          :to="link.path"
          class="nav-link px-4 py-3 text-main-lighten-3"
          activeClass="border-bottom border-2 border-primary text-main-lighten-1"
        >
          {{ link.name }}
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { RouteRecordRaw, RouterLink } from "vue-router"

defineProps<{
  links: RouteRecordRaw[]
}>()
</script>
