import AppDashboard from "@/components/AppDashboard.vue";
import AppTipoProduto from "@/components/AppTipoProduto.vue";
import AppProduto from "@/components/AppProduto.vue";
import AppMovimentacoes from "@/components/AppMovimentacoes.vue";

export const routes = [
  {
    path: "",
    name: "Dasboard",
    component: AppDashboard,
  },
  {
    path: "/admin",
    name: "Dasboard",
    component: AppDashboard,
  },
  {
    path: "/tipo-produto",
    name: "Tipos de produtos",
    component: AppTipoProduto,
  },
  {
    path: "/produtos",
    name: "Produtos",
    component: AppProduto,
  },
  {
    path: "/movimentacoes",
    name: "Movimentações de produtos",
    component: AppMovimentacoes,
  },
];
