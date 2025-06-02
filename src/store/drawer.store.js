import { defineStore } from "pinia";

export const drawerStore = defineStore("drawerStore", {
  state: () => ({
    listOptions: [
      {
        props: {
          prependIcon: "mdi-view-dashboard",
        },
        title: "Dashboard",
        path: "/admin",
        value: 1,
      },
      {
        props: {
          prependIcon: "mdi-puzzle",
        },
        title: "Tipo produto",
        path: "/tipo-produto",
        value: 2,
      },
      {
        props: {
          prependIcon: "mdi-shape",
        },
        title: "Produtos",
        path: "/produtos",
        value: 3,
      },
      {
        props: {
          prependIcon: "mdi-store",
        },
        title: "Movimentações",
        path: "/movimentacoes",
        value: 4,
      },
    ],
  }),
  actions: {},
  getters: {},
});
