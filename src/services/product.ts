import api from "../services/api"

export type Product = {
  id?: number;
  name: string;
  price: number;
  stock: number;
};

export async function listProducts(): Promise<Product[]> {
  const { data } = await api.get<Product[]>('/product')
  return data
}

export async function getProduct(id: number): Promise<Product> {
  const { data } = await api.get<Product>(`/product/${id}`)
  return data
}

export async function createProduct(payload: Product): Promise<Product> {
  const { data } = await api.post<Product>('/product', payload)
  return data
}

export async function updateProduct(id: number, payload: Product): Promise<Product> {
  const { data } = await api.put<Product>(`/product/${id}`, payload)
  return data
}

export async function deleteProduct(id: number): Promise<void> {
  await api.delete(`/product/${id}`)
}