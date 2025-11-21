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

export async function createCategory( name: string, description: string, storeId: number ) {
  const token = localStorage.getItem("auth_token");
  const res = await api.post(
    `/category/store/${storeId}`,{ name, description,
    },{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
}

export async function updateCategory(id: number, name: string, description: string) {
  const token = localStorage.getItem("auth_token");
  const res = await api.put(
    `/category/${id}`,
    { name, description },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
}

export async function deleteCategory(id: number) {
  const token = localStorage.getItem("auth_token");
  const res = await api.delete(`/category/${id}`,
    {
      headers:{
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
}