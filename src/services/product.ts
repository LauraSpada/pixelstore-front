import api from "../services/api"
import { getToken } from "./auth";

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

export async function createProduct(name: string, price: number, stock: number) {
  const token = localStorage.getItem("auth_token");
  const res = await api.post(
    `/product/category/{$categoriId}`, { name, price, stock
    }, {
       headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
}

export async function updateProduct(id: number, name: string, price: number, stock: number) {
  const token = localStorage.getItem("auth_token");
  const res = await api.put(`/product/${id}`,
    { name, price, stock },
     {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}

export async function deleteProduct(id: number) {
  const token = localStorage.getItem("auth_token");
  const res = await api.delete(`/product/${id}`, 
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
}
