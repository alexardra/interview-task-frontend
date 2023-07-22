<template>
  <nav class="w-100 bg-white navbar p-0">
    <ul class="nav" role="tablist">
      <li
        v-for="link in links"
        :key="`nav-item-${link.path}`"
        class="nav-item"
        activeClass="border-bottom border-2 border-primary"
      >
        <RouterLink
          :to="link.path"
          class="nav-link"
          activeClass="border-bottom border-2 border-primary"
        >
          <span class="text-black">{{ link.name }}</span>
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
