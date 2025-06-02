import {
  deleteTipoProduto,
  editarTipoProduto,
  getListTipoProduto,
  salvarTipoProduto,
} from "@/service/tipoProduto.service";
import { defineStore } from "pinia";

export const tipoProdutoStore = defineStore("tipoProdutoStore", {
  state: () => ({
    dialog: false,
    isEditing: false,
    isRemove: false,
    listHeader: [
      { title: "Cód", key: "id", align: "start" },
      { title: "Tipo produto", key: "nome" },
      { title: "Ações", key: "actions", align: "end", sortable: false },
    ],
    listTiposProdutos: [],
    tipoProduto: {
      nome: "",
    },
  }),
  actions: {
    adicionar() {
      this.reset();
      this.tipoProduto = {
        nome: "",
      };
      this.dialog = true;
    },

    async salvar() {
      if (this.isEditing) {
        await editarTipoProduto(this.tipoProduto);
      } else {
        await salvarTipoProduto(this.tipoProduto);
      }
      this.reset();
      this.carregarLista();
    },

    editar(item) {
      this.tipoProduto = {
        id: item.id,
        nome: item.nome,
      };
      this.isEditing = true;
      this.dialog = true;
    },

    remover(item) {
      this.tipoProduto = {
        id: item.id,
        nome: item.nome,
      };
      this.isRemove = true;
      this.dialog = true;
    },

    async delete() {
      await deleteTipoProduto(this.tipoProduto?.id);
      this.reset();
      this.carregarLista()
    },

    async carregarLista() {
      this.listTiposProdutos = await getListTipoProduto();
    },

    reset() {
      this.dialog = false;
      this.isEditing = false;
      this.isRemove = false;
    },
  },
  getters: {},
});
