<template>
  <nav class="w-100 bg-white navbar py-0 px-4 rounded-1">
    <ul class="nav" role="tablist">
      <li
        v-for="link in links"
        :key="`nav-item-${link.path}`"
        class="nav-item fs-sm"
      >
        <RouterLink
          :to="link.path"
          class="nav-link px-4 py-3 text-lighten-3"
          activeClass="border-bottom border-2 border-primary"
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

<style scoped lang="scss">
@import "@/styles/variables.scss";

.router-link-active,
.router-link-exact-active {
  color: $lighten-1 !important;
}
</style>
