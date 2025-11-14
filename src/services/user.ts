import api from "../services/api"

export type User = {
  id?: number;
  name: string;
  password?: string;
};


export async function listUsers(): Promise<User[]> {
  const { data } = await api.get<User[]>('/user')
  return data
}

export async function getUser(id: number): Promise<User> {
  const { data } = await api.get<User>(`/user/${id}`)
  return data
}

export async function createUser(payload: User): Promise<User> {
  const { data } = await api.post<User>('/user', payload)
  return data
}

export async function updateUser(id: number, payload: User): Promise<User> {
  const { data } = await api.put<User>(`/user/${id}`, payload)
  return data
}

export async function deleteUser(id: number): Promise<void> {
  await api.delete(`/user/${id}`)
}