import axios, { AxiosResponse } from 'axios';

import { BASE_API_URL } from './constants';

export function get<T>(url: string): Promise<AxiosResponse<T>> {
  return axios.get<T>(`${BASE_API_URL}/${url}`);
}

export function post<T>(url: string, data: any): Promise<AxiosResponse<T>> {
  return axios.post<T>(`${BASE_API_URL}/${url}`, data);
}
