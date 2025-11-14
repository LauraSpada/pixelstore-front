import api from "../services/api"

export type Store = {
  id?: number;
  name: string;
  location: string;
  description: string;
};

export async function listStores(): Promise<Store[]> {
  const { data } = await api.get<Store[]>('/store')
  return data
}

export async function getStore(id: number): Promise<Store> {
  const { data } = await api.get<Store>(`/store/${id}`)
  return data
}

export async function createStore(payload: Store): Promise<Store> {
  const { data } = await api.post<Store>('/store', payload)
  return data
}

export async function updateStore(id: number, payload: Store): Promise<Store> {
  const { data } = await api.put<Store>(`/store/${id}`, payload)
  return data
}

export async function deleteStore(id: number): Promise<void> {
  await api.delete(`/Store/${id}`)
}