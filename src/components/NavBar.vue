<template>
  <nav class="w-100 bg-white navbar py-0 px-4 rounded-1">
    <ul class="nav" role="tablist">
      <li
        v-for="link in links"
        :key="`nav-item-${link.path}`"
        class="nav-item fs-sm"
      >
        <RouterLink
          v-if="isLoaded || isInitialised"
          class="nav-link px-4 py-3 text-lighten-3"
          activeClass="border-bottom border-2 border-primary"
          :to="link.path"
        >
          {{ link.name }}
        </RouterLink>
        <span v-else class="nav-link px-4 py-3 text-lighten-3">
          {{ link.name }}
        </span>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { RouteRecordRaw, RouterLink } from "vue-router"
import { useStoreState } from "@/composables/useStoreState"

const { isLoaded, isInitialised } = useStoreState()

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
