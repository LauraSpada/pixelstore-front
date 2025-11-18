import api from "../services/api"
import { getToken } from "./auth";

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

export async function createUser(name: string, password: string, storeId: number) {
  const res = await api.post(`/user/store/${storeId}`, { name, password
  });
  return res.data;
}

export async function updateUser(user: User): Promise<User> {
  const token = getToken();
  const response = await api.put(`/user/${user.id}`, user, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function deleteUser(id: number): Promise<void> {
  const token = getToken();
  await api.delete(`/user/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
