import { computed } from "vue"
import { useStore } from "vuex"

export function useStoreState() {
  const store = useStore()
  const isSetup = computed(() => store.getters.isSetupState)
  const isLoading = computed(() => store.getters.isLoadingState)
  const isError = computed(() => store.getters.isErrorState)
  const isLoaded = computed(() => store.getters.isLoadedState)
  const isInitialised = computed(() => store.getters.isInitialisedState)

  return {
    isSetup,
    isLoading,
    isError,
    isLoaded,
    isInitialised,
  }
}
