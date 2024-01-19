import { ENDPOINTS } from "../constants"
import axiosClient from "./axiosClient"
import type { AxiosResponse } from "axios"

export const tripApi = {
  getTripsOfUser:
    (username: string) => (): Promise<AxiosResponse<any, any>> => {
      return axiosClient.get(ENDPOINTS.TRIP + `/${username}`)
    },
  interactTrip:
    (tripId: string, type: string, value: any) =>
    (): Promise<AxiosResponse<any, any>> => {
      return axiosClient.post(
        ENDPOINTS.INTERACT_TRIP + `/${tripId}`,
        { type, value }
      )
    },
}
