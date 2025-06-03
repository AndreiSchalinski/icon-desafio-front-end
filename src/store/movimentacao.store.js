import {
  getDetalhamentoMovimentacao,
  getListMovimentacao,
  salvarMovimentacao,
} from "@/service/movimentacao.service";
import { getListProduto } from "@/service/produto.service";
import { defineStore } from "pinia";
import { it } from "vuetify/locale";

export const movimentacaoStore = defineStore("movimentacaoStore", {
  state: () => ({
    dialog: false,
    isReadOnly: false,
    isRemove: false,
    listHeader: [
      { title: "Cód", key: "id", align: "start" },
      { title: "Movimentação", key: "tipoMovimentacao" },
      { title: "Data de venda", key: "dataVenda" },
      { title: "Quantidade", key: "quantidadeMovimentada" },
      { title: "Valor Venda", key: "valorVenda" },
      { title: "Ações", key: "actions", sortable: false, align: "end" },
    ],
    listMovimentacoes: [],
    movimentacao: {
      produtoId: null,
      tipoMovimentacao: null,
      valorVenda: null,
      dataVenda: null,
      quantidadeMovimentada: null,
    },
    headersProdutos: [
      { title: "Cód", key: "codigo", align: "start" },
      { title: "Descrição", key: "descricao" },
      { title: "Tipo de produto", key: "tipoProduto" },
      { title: "Preço no fornecedor", key: "precoFornecedor" },
      { title: "Quantidade disponível", key: "quantidadeMovimentada" },
    ],
    listProdutos: [],
    isSelected: null,
    movimento: {
      tipo: null,
    },
    produtoSelecionado: [],
    isError: false,
    messageError: "",
  }),
  actions: {
    adicionar() {
      this.reset();
      this.carregarListaProdutos();
      this.movimentacao = {
        produtoId: null,
        tipoMovimentacao: null,
        valorVenda: null,
        dataVenda: null,
        quantidadeMovimentada: null,
      };
      this.dialog = true;
    },

    async salvar() {
      try {
        this.setValueObjects();

        await salvarMovimentacao(this.movimentacao);

        this.reset();
        this.carregarLista();
      } catch (error) {
        this.dialog = true;
        this.isError = true;

        if (error.response && error.response.status === 400) {
          this.messageError = error.response.data.message;
        }
        this.produtoSelecionado = []
      }
    },

    async detalharMovimentacao(item) {

      this.listProdutos = [];

      this.movimentacao = { ...item };

      const resp = await getDetalhamentoMovimentacao(item.id);

      this.listProdutos.push(resp);

      this.movimento.tipo =
        this.movimentacao.tipoMovimentacao == "ENTRADA" ? 0 : 1;

      this.isReadOnly = true;
      this.dialog = true;
    },

    remover(item) {
      this.movimentacao = {
        id: item.id,
      };
      this.isRemove = true;
      this.dialog = true;
    },

    async delete() {
      await deleteMovimentacao(this.movimentacao?.id);
      this.reset();
      this.carregarLista();
    },

    async carregarLista() {
      this.listMovimentacoes = await getListMovimentacao();
    },

    async carregarListaProdutos() {
      this.listProdutos = await getListProduto();
    },

    handleChange(option, status) {
      if (option == 1 && !status) {
        this.movimentacao.tipoMovimentacao = "ENTRADA";
      }

      if (option == 2 && !status) {
        this.movimentacao.tipoMovimentacao = "SAIDA";
      }
    },

    setValueObjects() {
      this.movimentacao.dataVenda = this.movimentacao.dataVenda
        .toISOString()
        .slice(0, 10);

      this.movimentacao.produtoId = this.produtoSelecionado[0]?.id;
    },

    reset() {
      this.dialog = false;
      this.isReadOnly = false;
      this.isRemove = false;
      this.movimento.tipo = null;
      this.isError = false;
    },
  },
  getters: {},
});
