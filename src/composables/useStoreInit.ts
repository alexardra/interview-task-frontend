import { computed, watch } from "vue"
import { useRouter } from "vue-router"
import { useStore } from "vuex"

export function useStoreInit() {
  const router = useRouter()
  const store = useStore()
  const isSetupState = computed(() => store.getters.isSetupState)
  const isErrorState = computed(() => store.getters.isErrorState)

  watch(
    isSetupState,
    () => {
      if (isSetupState.value) {
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
