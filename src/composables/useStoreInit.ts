import { computed, watch } from "vue"
import { useRouter } from "vue-router"
import { useStore } from "vuex"

export function useStoreInit() {
  const router = useRouter()
  const store = useStore()
  const isNoneState = computed(() => store.getters.isNoneState)
  const isErrorState = computed(() => store.getters.isErrorState)

  watch(
    isNoneState,
    () => {
      if (isNoneState.value) {
        store.dispatch("init")
      }
    },
    { immediate: true }
  )

  watch(
    isErrorState,
    () => {
      if (isErrorState.value) {
        router.push("/error")
      }
    },
    { immediate: true }
  )
}
