import {
  deleteProduto,
  editarProduto,
  getListProduto,
  salvarProduto,
} from "@/service/produto.service";
import { getListTipoProduto } from "@/service/tipoProduto.service";
import { defineStore } from "pinia";

export const produtoStore = defineStore("produtoStore", {
  state: () => ({
    dialog: false,
    isEditing: false,
    isRemove: false,
    listHeader: [
      { title: "Cód", key: "codigo", align: "start" },
      { title: "Descrição", key: "descricao" },
      { title: "Tipo de produto", key: "tipoProduto.nome" },
      { title: "Preço no fornecedor", key: "precoFornecedor" },
      { title: "Quantidade", key: "quantidade" },
      { title: "Ações", key: "actions", align: "end", sortable: false },
    ],
    listProdutos: [],
    listTipoProduto: [],
    produto: {
      codigo: null,
      descricao: null,
      tipoProduto: {
        id: null,
        nome: null,
      },
      precoFornecedor: null,
      quantidade: null,
    },
  }),
  actions: {
    adicionar() {
      this.reset();
      this.produto = {
        codigo: null,
        descricao: null,
        tipoProduto: {
          id: null,
          nome: null,
        },
        precoFornecedor: null,
        quantidade: null,
      };
      this.dialog = true;
    },

    async salvar() {
      if (this.isEditing) {
        await editarProduto(this.produto);
      } else {
        await salvarProduto(this.produto);
      }
      this.reset();
      this.carregarLista();
    },

    editar(item) {
      this.produto = { ...item };
      this.isEditing = true;
      this.dialog = true;
    },

    remover(item) {
      this.produto = item;
      this.isRemove = true;
      this.dialog = true;
    },

    async delete() {
      await deleteProduto(this.produto?.id);
      this.reset();
      this.carregarLista();
    },

    async carregarLista() {
      this.listProdutos = await getListProduto();
    },

    async carregarListaTiposProdutos() {
      this.listTipoProduto = await getListTipoProduto();
      this.listTipoProduto.map((tipo) => ({
        text: tipo.nome,
        value: tipo.id,
      }));
    },

    reset() {
      this.dialog = false;
      this.isEditing = false;
      this.isRemove = false;
    },
  },
  getters: {},
});
