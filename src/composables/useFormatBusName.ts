import { IBusStop } from "@/types"
import { prepand } from "@/utils"
import { computed } from "vue"

export function useFormatBusName(stop: IBusStop) {
  return computed(() => `${stop.name} ${prepand("" + stop.order, 2)}`)
}
