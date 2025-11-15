import api from "../services/api"

export type Category = {
  id?: number;
  name: string;
  description: string;
};

export async function listCategories(): Promise<Category[]> {
  const { data } = await api.get<Category[]>('/category')
  return data
}

export async function getCategory(id: number): Promise<Category> {
  const { data } = await api.get<Category>(`/category/${id}`)
  return data
}

export async function getProductsByCategory(categoryId: number) {
  const { data } = await api.get(`/category/${categoryId}/products`)
  return data.data;
}

export async function createCategory(payload: Category): Promise<Category> {
  const { data } = await api.post<Category>('/category', payload)
  return data
}

export async function updateCategory(id: number, payload: Category): Promise<Category> {
  const { data } = await api.put<Category>(`/category/${id}`, payload)
  return data
}

export async function deleteCategory(id: number): Promise<void> {
  await api.delete(`/category/${id}`)
}