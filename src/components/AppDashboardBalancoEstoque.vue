<template>
  <v-card
    title="Balanço de estoque por tipo de produto"
    flat
    elevation="1"
    class="mt-5"
  >
    <template v-slot:text>
      <v-autocomplete
        v-model="dashboard.tipoProdutoId"
        variant="outlined"
        chips
        label="Tipo de produto"
        :items="dashboard.listTipoProduto"
        item-title="nome"
        item-value="id"
        @update:model-value="dashboard.onTipoProdutoSelecionado"
        clearable
        no-data-text="Sem tipo de produto cadastrado ainda!"
      ></v-autocomplete>
    </template>
    <v-data-table
      :headers="dashboard.headeBalancoEstoque"
      :items="dashboard.listBalancoEstoqueProduto"
      :hide-default-footer="true"
      no-data-text="Sem registro em estoque para gerar balanço!"
    >
    </v-data-table>
  </v-card>
</template>
<script setup>
import { dashboardStore } from "@/store/dashboard.store";
import { onMounted } from "vue";

const dashboard = dashboardStore();

onMounted(() => {
  dashboard.carregarBalancoEstoqueProduto();
  dashboard.carregarListTiposProduto();
});
</script>
