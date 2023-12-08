import { ENDPOINTS } from '../constants';
import axiosClient from './axiosClient';
import type { AxiosResponse } from 'axios';
export const authApi = {
  signinByGoogle: (token: string) => (): Promise<AxiosResponse<any, any>> => {
    return axiosClient.get(ENDPOINTS.GOOGLE_AUTH, 
      { 
        headers:
          { 
            Authorization: `Bearer ${token}` 
          } 
      }
    );
  }
};
