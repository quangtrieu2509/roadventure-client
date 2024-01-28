import { ENDPOINTS } from "../constants"
import axiosClient from "./axiosClient"
import type { AxiosResponse } from "axios"

export const tripApi = {
  getTripsOfUser:
    (username: string) => (): Promise<AxiosResponse<any, any>> => {
      return axiosClient.get(ENDPOINTS.TRIP + `/${username}/trips`)
    },
  getSavedTrips:
    () => (): Promise<AxiosResponse<any, any>> => {
      return axiosClient.get(ENDPOINTS.SAVED_TRIP)
    },
  interactTrip:
    (tripId: string, type: string, value: any, content: string = "") =>
    (): Promise<AxiosResponse<any, any>> => {
      return axiosClient.post(
        ENDPOINTS.INTERACT_TRIP + `/${tripId}`,
        { type, value, content }
      )
    },
  createTrip:
    (data: any) => (): Promise<AxiosResponse<any, any>> => {
      return axiosClient.post(ENDPOINTS.TRIP, data)
    },
  getTripDetail:
    (tripId: string) => (): Promise<AxiosResponse<any, any>> => {
      return axiosClient.get(ENDPOINTS.TRIP_DETAIL + `/${tripId}`)
    },
}
