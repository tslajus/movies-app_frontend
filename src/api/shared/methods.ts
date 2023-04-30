import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

import { BASE_API_URL } from './constants';

export function get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
  return axios.get<T>(`${BASE_API_URL}/${url}`, config);
}

export function post<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
  return axios.post<T>(`${BASE_API_URL}/${url}`, data, config);
}

export function deleteReq<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
  return axios.delete<T>(`${BASE_API_URL}/${url}`, config);
}
