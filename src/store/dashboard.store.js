import {
  getBalancoEstoque,
  getRelatorioMovimentacoes,
} from "@/service/dashboard.service";
import { getListTipoProduto } from "@/service/tipoProduto.service";
import { defineStore } from "pinia";

export const dashboardStore = defineStore("dashboardStore", {
  state: () => ({
    headeBalancoMovimentacoes: [
      { align: "start", sortable: true, title: "Descrição", key: "descricao" },
      { title: "Quantidade Movimentada", key: "totalQuantidadeMovimentada" },
      { title: "Lucro Bruto (R$)", key: "totalLucroBruto" },
      {
        title: "Valor do Fornecedor (R$)",
        key: "totalFornecedor",
      },
      { title: "Lucro Líquido (R$)", key: "totalLucroLiquido" },
    ],
    headeBalancoEstoque: [
      {
        align: "start",
        sortable: true,
        title: "Cód",
        key: "produto.id",
        align: "start",
      },
      { title: "Descrição", key: "produto.descricao" },
      { title: "Tipo de produto", key: "produto.tipoProduto.nome" },
      { title: "Entradas", key: "totalEntradas" },
      { title: "Saídas", key: "totalSaidas" },
      { title: "Disponível", key: "quantidadeDisponicel" },
    ],

    listBalancoEstoqueProduto: [],
    listRegistrosRelatorioMovimentacao: [],
    tipoMovimento: null,
    listTipoProduto: [],
    tipoProdutoId: null,
  }),
  actions: {
    async carregarBalancoEstoqueProduto() {
      this.listBalancoEstoqueProduto = await getBalancoEstoque();
    },

    async onTipoProdutoSelecionado(value) {
      this.listBalancoEstoqueProduto = await getBalancoEstoque(value);
    },

    async gerarRelatorioMovimentacoes() {
      this.listRegistrosRelatorioMovimentacao =
        await getRelatorioMovimentacoes();
    },

    async carregarListTiposProduto() {
      this.listTipoProduto = await getListTipoProduto();
    },
  },
  getters: {},
});
