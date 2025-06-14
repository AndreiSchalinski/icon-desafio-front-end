import customAxios from "@/util/customAxios";

export const salvarMovimentacao = async (movimentacao) => {
  const { data } = await customAxios.post(`/movimentacao/save`, movimentacao);
  return data;
};

export const getMovimentacao = async (id) => {
  const { data } = await customAxios.get(`/movimentacao/${id}`);
  return data;
};

export const getListMovimentacao = async () => {
  const { data } = await customAxios.get(`/movimentacao/list`);
  return data;
};

export const getDetalhamentoMovimentacao = async (id) => {
  const { data } = await customAxios.get(`/movimentacao/${id}`);
  return data;
};

