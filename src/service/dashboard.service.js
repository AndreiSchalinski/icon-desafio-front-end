import customAxios from "@/util/customAxios";

export const getBalancoEstoque = async (tipo) => {
  const urlDinamica =
    tipo == undefined ? `/produto/balanco` : `/produto/balanco?id=${tipo}`;

  const { data } = await customAxios.get(urlDinamica);
  return data;
};

export const getRelatorioMovimentacoes = async () => {
  const { data } = await customAxios.get(`/movimentacao/relatorio`);
  return data;
};
