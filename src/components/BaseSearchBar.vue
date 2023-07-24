<template>
  <form class="p-2">
    <div class="input-group">
      <input
        @input="(e) => updateQuery(e as InputEvent)"
        type="text"
        class="form-control shadow-none text-main-lighten-3 border-end-0 outline-0"
        placeholder="Search..."
        aria-label="Username"
        aria-describedby="search-bar"
        :value="query"
        :disabled="disabled"
      />
      <button
        @click="search"
        class="btn btn-outline-secondary bg-white border-start-0 border ms-n5"
        type="button"
        :disabled="disabled"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M1.83325 7.33337C1.83325 4.29581 4.29569 1.83337 7.33325 1.83337C10.3708 1.83337 12.8333 4.29581 12.8333 7.33337C12.8333 10.3709 10.3708 12.8334 7.33325 12.8334C4.29569 12.8334 1.83325 10.3709 1.83325 7.33337ZM7.33325 0.833374C3.7434 0.833374 0.833252 3.74352 0.833252 7.33337C0.833252 10.9232 3.7434 13.8334 7.33325 13.8334C8.9482 13.8334 10.4256 13.2444 11.5624 12.2696L13.6464 14.3536C13.8416 14.5489 14.1582 14.5489 14.3535 14.3536C14.5487 14.1583 14.5487 13.8418 14.3535 13.6465L12.2695 11.5625C13.2443 10.4257 13.8333 8.94832 13.8333 7.33337C13.8333 3.74352 10.9231 0.833374 7.33325 0.833374Z"
            fill="#9A9DA4"
          />
        </svg>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { debounce } from "@/utils"

defineProps<{
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: "changed", query: string): void
}>()

const query = ref("")
const updateQuery = (e: InputEvent) => {
  query.value = (e.target as HTMLInputElement).value

  search()
}

const search = debounce(() => {
  emit("changed", query.value)
}, 1000)
</script>

<style scoped>
input:focus {
  border: 1px solid #1952e1 !important;
  border-right: none !important;
}
input:focus + button {
  border: 1px solid #1952e1 !important;
  border-left: none !important;
}

.form-control::placeholder,
.form-control::-moz-placeholder {
  color: #9a9da4;
}
</style>
