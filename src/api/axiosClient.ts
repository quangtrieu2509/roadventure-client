/* eslint-disable import/no-extraneous-dependencies */
import axios, { type AxiosError } from 'axios';

import { BASE_URL } from '../configs';
import { RRError } from '../types';
import CustomError from '../utils/CustomError';

const token = localStorage.getItem('token');
const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'content-type': 'application/json',
    common: {
      Authorization: `Bearer ${token}`,
    },
  },
});

// axiosClient.interceptors.request.use(async (config) => {
//   // Handle token here ...
//   return config;
// });
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error: AxiosError) => {
    if (!error.response) {
      console.error('Unknown error:', error.message);
      return;
    }

    const { status, data } = error.response;
    if (status >= 500) {
      // TODO: Show server error message
    } else if (400 <= status && status < 500) {
      // alert((data as RRError).msg)
      throw new CustomError(data as RRError);
      
    }
  },
);
export default axiosClient;
