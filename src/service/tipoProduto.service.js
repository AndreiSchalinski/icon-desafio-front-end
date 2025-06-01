import customAxios from "@/util/customAxios";

export const salvarTipoProduto = async (tipoProduto) => {
  const { data } = await customAxios.post(`/categoria/save`, tipoProduto);
  return data;
};

export const editarTipoProduto = async (tipoProduto) => {
  const { data } = await customAxios.put(
    `/categoria/${tipoProduto?.id}`,
    tipoProduto
  );
  return data;
};

export const getTipoProduto = async (id) => {
  const { data } = await customAxios.get(`/categoria/${id}`);
  return data;
};

export const getListTipoProduto = async () => {
  const { data } = await customAxios.get(`/categoria/list`);
  return data;
};

export const deleteTipoProduto = async (id) => {
  const { data } = await customAxios.delete(`/categoria/${id}`);
  return data;
};
