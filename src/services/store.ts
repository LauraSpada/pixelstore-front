import api from "../services/api"
import { getToken } from "./auth";

export type Store = {
  id?: number;
  name: string;
  location: string;
};

export async function listStores(): Promise<Store[]> {
  const { data } = await api.get<Store[]>('/store')
  return data
}

export async function getStore(id: number): Promise<Store> {
  const { data } = await api.get<Store>(`/store/${id}`)
  return data
}

export async function getUsersByStore(storeId: number) {
  const { data } = await api.get(`/store/${storeId}/users`)
  return data.data;
}

export async function getProductsByStore(storeId: number) {
  const { data } = await api.get(`/store/${storeId}/products`)
  return data.data;
}

export async function getCategoriesByStore(storeId: number) {
  const { data } = await api.get(`/store/${storeId}/categories`)
  return data.data;
}

export async function createStore(data: { name: string; location: string }): Promise<Store> {
  const res = await api.post<Store>('/store', data)
  return res.data;
}

export async function updateStore(id: number, name: string, location: string) {
  const res = await api.put(
    `/store/${id}`,
    { name, location },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
  return res.data;
}

export async function deleteStore(id: number) {
  const res = await api.delete(`/store/${id}`, 
    {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return res.data;
}