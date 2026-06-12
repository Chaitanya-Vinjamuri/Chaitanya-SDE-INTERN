import api from "../../api/axiosconfig";

export const fetchProductsAPI = async () => {
  const response = await api.get("/products");
  return response.data;
};

export const addProductAPI = async (product) => {
  const response = await api.post("/products", product);
  return response.data;
};

export const updateProductAPI = async (product) => {
  const response = await api.put(
    `/products/${product.id}`,
    product
  );

  return response.data;
};

export const deleteProductAPI = async (id) => {
  await api.delete(`/products/${id}`);
  return id;
};