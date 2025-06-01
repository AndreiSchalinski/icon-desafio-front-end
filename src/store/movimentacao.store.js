import {
  deleteMovimentacao,
  editarMovimentacao,
  getListMovimentacao,
  salvarMovimentacao,
} from "@/service/movimentacao.service";
import { getListProduto } from "@/service/produto.service";
import { defineStore } from "pinia";

export const movimentacaoStore = defineStore("movimentacaoStore", {
  state: () => ({
    dialog: false,
    isEditing: false,
    isRemove: false,
    listHeader: [
      { title: "Cód", key: "id", align: "start" },
      { title: "Movimentação", key: "tipoMovimentacao" },
      { title: "Data de venda", key: "dataVenda" },
      { title: "Quantidade", key: "quantidadeMovimentada" },
      { title: "Valor Venda", key: "valorVenda" },
      { title: "Ações", key: "actions", align: "end", sortable: false },
    ],
    listMovimentacoes: [],
    movimentacao: {
      tipoMovimentacao: null,
      valorVenda: null,
      dataVenda: null,
      quantidadeMovimentada: null,
      produto: null,
    },
    produtosSelecionados: [],
    headersProdutos: [
      { title: "Cód", key: "codigo", align: "start" },
      { title: "Descrição", key: "descricao" },
      { title: "Tipo de produto", key: "tipoProduto.nome" },
      { title: "Preço no fornecedor", key: "precoFornecedor" },
      { title: "Quantidade", key: "quantidade" },
    ],
    listProdutos: [],
    isSelected: null,
  }),
  actions: {
    adicionar() {
      this.reset();
      this.carregarListaProdutos();
      this.movimentacao = {
        tipoMovimentacao: null,
        valorVenda: null,
        dataVenda: null,
        quantidadeMovimentada: null,
        produto: null,
      };
      this.dialog = true;
    },

    async salvar() {
      this.setValueObjects();

      if (this.isEditing) {
        await editarMovimentacao(this.movimentacao);
      } else {
        console.log(this.movimentacao);
        await salvarMovimentacao(this.movimentacao);
      }
      this.reset();
      this.carregarLista();
    },

    editar(item) {
      this.movimentacao = { ...item };
      this.isEditing = true;
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

      this.movimentacao.produto = this.movimentacao.produto[0];
    },

    reset() {
      this.dialog = false;
      this.isEditing = false;
      this.isRemove = false;
    },
  },
  getters: {},
});
