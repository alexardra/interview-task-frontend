import { createStore } from "vuex"
import { IBusLine, IBusStop } from "@/types"
import { dateComparer, sortedPush, unique } from "@/utils"
import { getStops } from "@/client/stops"

export const StoreActionStates = [
  "setup",
  "loading", // fetching data
  "error", // error fetching data
  "loaded", // raw data in store, bus lines accessible
  "initialised", // structured data accessible
] as const

type StoreActionState = (typeof StoreActionStates)[number]

type StateShape = {
  actionState: StoreActionState
  schedule: Map<number, Map<string, { order: number; times: string[] }>>
  busLineList: number[]
  selectedBusLine: number | null
  selectedBusStop: IBusStop | null

  stopsSortOrder: BusStopSortOrder
  selectedStopsSortOrder: BusStopSortOrder
}

const busStopSortOrder = ["desc", "asc"] as const
type BusStopSortOrder = (typeof busStopSortOrder)[number]

export default createStore({
  state: <StateShape>{
    actionState: "setup",
    busLineList: [],
    schedule: new Map(),

    selectedBusLine: null,
    selectedBusStop: null,

    stopsSortOrder: "desc",
    selectedStopsSortOrder: "asc",
  },
  getters: {
    busLines(state) {
      return state.busLineList
    },
    selectedBusLine(state) {
      return state.selectedBusLine
    },
    selectedBusStop(state) {
      return state.selectedBusStop
    },
    selectedBusLineStops(state) {
      if (state.selectedBusLine === null || state.actionState !== "initialised")
        return null

      const stopsMap = state.schedule.get(state.selectedBusLine)

      const sortedStops = [] as IBusStop[]

      stopsMap?.forEach(({ order }, stopName) => {
        sortedPush<IBusStop>(
          sortedStops,
          {
            name: stopName,
            order,
          } as IBusStop,
          (a, b) =>
            state.selectedStopsSortOrder === "asc"
              ? a.order - b.order
              : b.order - a.order
        )
      })

      return sortedStops
    },
    selectedBusStopTimes(state) {
      if (state.selectedBusLine === null || state.selectedBusStop === null)
        return null

      return state.schedule
        .get(state.selectedBusLine)
        ?.get(state.selectedBusStop.name)?.times
    },
    busStops(state) {
      const stops = [] as IBusStop[]

      state.schedule.forEach((stopMap) => {
        stopMap.forEach((stopData, stopName) => {
          sortedPush(
            stops,
            { name: stopName, order: stopData.order } as IBusStop,
            (a, b) =>
              state.stopsSortOrder === "asc"
                ? a.order - b.order
                : b.order - a.order
          )
        })
      })
      return stops
    },
    isSetupState(state) {
      return state.actionState === "setup"
    },
    isLoadingState(state) {
      return state.actionState === "loading"
    },
    isErrorState(state) {
      return state.actionState === "error"
    },
    isLoadedState(state) {
      return state.actionState === "loaded"
    },
    isInitialisedState(state) {
      return state.actionState === "initialised"
    },
  },
  mutations: {
    setActionState(state, actionState: StoreActionState) {
      state.actionState = actionState
    },
    setBusLinesList(state, busLineList: number[]) {
      state.busLineList = busLineList
    },
    setStops(state, schedule: IBusLine[]) {
      schedule.forEach((scheduleItem) => {
        if (!state.schedule.has(scheduleItem.line)) {
          const stopMap = new Map()
          stopMap.set(scheduleItem.stop, {
            order: scheduleItem.order,
            times: [scheduleItem.time],
          })

          state.schedule.set(scheduleItem.line, stopMap)
        } else if (
          !state.schedule.get(scheduleItem.line)?.has(scheduleItem.stop)
        ) {
          const lineMap = state.schedule.get(scheduleItem.line)
          lineMap?.set(scheduleItem.stop, {
            order: scheduleItem.order,
            times: [scheduleItem.time],
          })
        } else {
          const stopMap = state.schedule
            .get(scheduleItem.line)
            ?.get(scheduleItem.stop)

          if (stopMap)
            sortedPush(stopMap.times, scheduleItem.time, dateComparer)
        }
      })
    },
    setSelectedBusLine(state, line: number) {
      state.selectedBusLine = line
      state.selectedBusStop = null
    },
    setSelectedBusStop(state, stop: IBusStop) {
      state.selectedBusStop = stop
    },
    toggleStopsSortOrder(state) {
      state.stopsSortOrder = state.stopsSortOrder === "asc" ? "desc" : "asc"
    },
    toggleSelectedStopsSortOrder(state) {
      state.selectedStopsSortOrder =
        state.selectedStopsSortOrder === "asc" ? "desc" : "asc"
    },
  },
  actions: {
    async init(context) {
      context.commit("setActionState", "loading")

      try {
        const response = await getStops()

        const schedule = response.data as IBusLine[]

        const busLineList = unique(
          schedule.map((scheduleItem) => scheduleItem.line)
        ).sort((a, b) => a - b)

        context.commit("setBusLinesList", busLineList)
        context.commit("setActionState", "loaded")

        context.commit("setStops", schedule)
        context.commit("setActionState", "initialised")
      } catch (error) {
        context.commit("setActionState", "error")
      }
    },
    selectBusLine(context, { line }: { line: number }) {
      context.commit("setSelectedBusLine", line)
    },
    selectBusStop(context, busStop: IBusStop) {
      if (context.state.selectedBusLine !== null) {
        context.commit("setSelectedBusStop", busStop)
      }
    },
    toggleStopsSortOrder(context) {
      context.commit("toggleStopsSortOrder")
    },
    toggleSelectedStopsSortOrder(context) {
      context.commit("toggleSelectedStopsSortOrder")
    },
  },
})
