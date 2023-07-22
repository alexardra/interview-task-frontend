import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import BusLinesPage from "@/views/BusLinesPage.vue"

export const AppRoutes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Bus Lines",
    component: () => BusLinesPage,
  },
  {
    path: "/stops",
    name: "Stops",
    component: () => import("@/views/StopsPage.vue"),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: AppRoutes,
})

export default router
