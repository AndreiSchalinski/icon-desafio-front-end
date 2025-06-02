<template>
  <v-card title="Balanço de todas as saídas" flat elevation="1" class="mt-5">
    <v-data-table
      :headers="dashboard.headeBalancoMovimentacoes"
      :items="dashboard.listRegistrosRelatorioMovimentacao"
      :hide-default-footer="true"
      no-data-text="Sem registros a serem exibidos, gere alguma movimentação para atualizar!"
    >
    </v-data-table>
  </v-card>
</template>
<script setup>
import { dashboardStore } from "@/store/dashboard.store";
import { onMounted } from "vue";

const dashboard = dashboardStore();
onMounted(() => {
  dashboard.gerarRelatorioMovimentacoes();
});
</script>
