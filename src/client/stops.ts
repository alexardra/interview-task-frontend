import { axios } from "./index"

export async function getStops() {
  const response = await axios.get("/stops")
  return response
}
