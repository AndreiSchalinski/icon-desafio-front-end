import customAxios from "@/util/customAxios";

export const salvarProduto = async (produto) => {
  const { data } = await customAxios.post(`/produto/save`, produto);
  return data;
};

export const editarProduto = async (produto) => {
  const { data } = await customAxios.put(
    `/produto/${produto?.id}`,
    produto
  );
  return data;
};

export const getProduto = async (id) => {
  const { data } = await customAxios.get(`/produto/${id}`);
  return data;
};

export const getListProduto = async () => {
  const { data } = await customAxios.get(`/produto/list`);
  return data;
};

export const deleteProduto = async (id) => {
  const { data } = await customAxios.delete(`/produto/${id}`);
  return data;
};
