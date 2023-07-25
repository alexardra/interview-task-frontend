<template>
  <form class="p-2 col col-md-5 col-lg-4">
    <div class="input-group">
      <input
        @input="(e) => updateQuery(e as InputEvent)"
        @focus="active = true"
        @blur="active = false"
        type="text"
        class="form-control text-main shadow-none border-end-0 outline-0 border-darker-bg fs-xs"
        placeholder="Search..."
        aria-label="Username"
        aria-describedby="search-bar"
        :value="query"
        :disabled="disabled"
      />
      <button
        @click="search"
        class="btn btn-darker-bg bg-white border-start-0 border ms-n5"
        type="button"
        :disabled="disabled"
      >
        <SearchIcon :active="active" />
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import SearchIcon from "./SearchIcon.vue"
import { ref } from "vue"
import { debounce } from "@/utils"

defineProps<{
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: "changed", query: string): void
}>()

const active = ref(false)

const query = ref("")
const updateQuery = (e: InputEvent) => {
  query.value = (e.target as HTMLInputElement).value

  search()
}

const search = debounce(() => {
  emit("changed", query.value)
}, 1000)
</script>

<style scoped lang="scss">
@import "@/styles/variables.scss";

input:focus {
  border: 1px solid $primary !important;
  border-right: none !important;
}
input:focus + button {
  border: 1px solid $primary !important;
  border-left: none !important;
}

.form-control::placeholder {
  color: $lighten-3 !important;
}

.form-control::-moz-placeholder {
  color: $lighten-3 !important;
}
</style>
