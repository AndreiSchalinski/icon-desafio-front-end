<template>
  <v-sheet border rounded elevation="2">
    <v-data-table
      :headers="produto.listHeader"
      :items="produto.listProdutos"
      :hide-default-footer="true"
      no-data-text="Sem tipos de produtos cadastrados"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>
            <v-icon
              color="medium-emphasis"
              icon="mdi-book-multiple"
              size="x-small"
              start
            ></v-icon>

            Todos os produtos
          </v-toolbar-title>

          <v-btn
            class="me-2 text-caption"
            prepend-icon="mdi-plus"
            rounded="lg"
            text="Tipo produto"
            border
            @click="produto.adicionar()"
          ></v-btn>
        </v-toolbar>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn
              icon="mdi-dots-vertical"
              variant="text"
              v-bind="props"
            ></v-btn>
          </template>

          <v-list>
            <v-list-item>
              <v-btn
                width="100%"
                class="text-caption"
                prepend-icon="mdi-pencil"
                text="Editar"
                variant="flat"
                color="black"
                size="small"
                rounded="lg"
                @click="produto.editar(item)"
              ></v-btn>
            </v-list-item>
            <v-list-item>
              <v-btn
                width="100%"
                class="text-caption"
                prepend-icon="mdi-delete"
                text="Excluir"
                variant="flat"
                color="red"
                size="small"
                rounded="lg"
                @click="produto.remover(item)"
              ></v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-data-table>
  </v-sheet>

  <v-dialog v-if="!produto.isRemove" v-model="produto.dialog" max-width="500">
    <v-card
      :subtitle="`${produto.isEditing ? 'Editar' : 'Adicionar'} produto`"
      :title="`${produto.isEditing ? 'Editar' : 'Adicionar'} produto`"
    >
      <template v-slot:text>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="produto.produto.codigo"
              label="Código"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="produto.produto.descricao"
              label="Descrição"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-select
              v-model="produto.produto.tipoProdutoId"
              :items="['Fiction', 'Dystopian', 'Non-Fiction', 'Sci-Fi']"
              label="Tipo de produto"
              item-title="text"
              item-value="value"
            ></v-select>
          </v-col>

          <v-col cols="12" md="6">
            <v-number-input
              v-model="produto.produto.precoFornecedor"
              :max="adapter.getYear(adapter.date())"
              :min="1"
              label="Preço no fornecedor"
            ></v-number-input>
          </v-col>

          <v-col cols="12" md="6">
            <v-number-input
              v-model="produto.produto.quantidade"
              :min="1"
              label="Quantidade"
            ></v-number-input>
          </v-col>
        </v-row>
      </template>

      <v-divider></v-divider>

      <v-card-actions class="bg-surface-light">
        <v-btn
          class="text-caption"
          text="Cancelar"
          variant="plain"
          @click="produto.dialog = false"
        ></v-btn>

        <v-spacer></v-spacer>

        <v-btn
          class="text-caption"
          text="Salvar"
          @click="produto.salvar()"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-else v-model="produto.dialog" max-width="500">
    <v-card
      subtitle="Atenção, você removerá tipo produto!"
      title="Deletar tipo de produto"
    >
      <template v-slot:text>
        <v-row>
          <v-col cols="12" class="text-center">
            {{ `Deletar ${produto.produto.descricao}?` }}
          </v-col>
        </v-row>
      </template>

      <v-divider />

      <v-card-actions class="bg-surface-light">
        <v-btn
          class="text-caption"
          text="Cancelar"
          variant="plain"
          @click="(produto.dialog = false), (produto.isRemove = false)"
        />
        <v-spacer />
        <v-btn class="text-caption" text="Deletar" @click="produto.delete()" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup>
import { produtoStore } from "@/store/produto.store";
import { onMounted } from "vue";

const produto = produtoStore();

onMounted(() => {
  produto.reset();
  produto.carregarListaTiposProdutos()
  produto.carregarLista();
});
</script>
