import { ENDPOINTS } from "../constants"
import axiosClient from "./axiosClient"
import type { AxiosResponse } from "axios"

export const userApi = {
  getUser: (id: string) => (): Promise<AxiosResponse<any, any>> => {
    return axiosClient.get(ENDPOINTS.USER + `/${id}`)
  },
  followUser:
    (username: string, follow: boolean) =>
    (): Promise<AxiosResponse<any, any>> => {
      return axiosClient.post(ENDPOINTS.USER + `/${username}`, { follow })
    },
}
