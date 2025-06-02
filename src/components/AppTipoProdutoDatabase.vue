<template>
  <v-sheet border rounded elevation="2">
    <v-data-table
      :headers="tipoProduto.listHeader"
      :items="tipoProduto.listTiposProdutos"
      :hide-default-footer="true"
      no-data-text="Sem tipos de produtos cadastrados"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>
            <v-icon
              color="medium-emphasis"
              icon="mdi-puzzle"
              size="x-small"
              start
            ></v-icon>

            Todos tipos de produtos
          </v-toolbar-title>

          <v-btn
            class="me-2 text-caption"
            prepend-icon="mdi-plus"
            rounded="lg"
            text="Tipo produto"
            border
            @click="tipoProduto.adicionar()"
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
                @click="tipoProduto.editar(item)"
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
                @click="tipoProduto.remover(item)"
              ></v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-data-table>
  </v-sheet>

  <v-dialog
    v-if="!tipoProduto.isRemove"
    v-model="tipoProduto.dialog"
    max-width="500"
  >
    <v-card
      :subtitle="`${
        tipoProduto.isEditing ? 'Editar' : 'Adicionar'
      } tipo de produto`"
      :title="`${
        tipoProduto.isEditing ? 'Editar' : 'Adicionar'
      } tipo de produto`"
    >
      <template v-slot:text>
        <v-row v-if="!tipoProduto.isRemove">
          <v-col cols="12">
            <v-text-field
              v-model="tipoProduto.tipoProduto.nome"
              label="Tipo de produto"
            ></v-text-field>
          </v-col>
        </v-row>
      </template>

      <v-divider></v-divider>

      <v-card-actions class="bg-surface-light">
        <v-btn
          class="text-caption"
          text="Cancelar"
          variant="plain"
          @click="tipoProduto.dialog = false"
        ></v-btn>

        <v-spacer></v-spacer>

        <v-btn
          class="text-caption"
          text="Salvar"
          @click="tipoProduto.salvar()"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-else v-model="tipoProduto.dialog" max-width="500">
    <v-card
      subtitle="Atenção, você removerá tipo produto!"
      title="Deletar tipo de produto"
    >
      <template v-slot:text>
        <v-row>
          <v-col cols="12" class="text-center">
            {{ `Deletar ${tipoProduto.tipoProduto.nome}?` }}
          </v-col>
        </v-row>
      </template>

      <v-divider />

      <v-card-actions class="bg-surface-light">
        <v-btn
          class="text-caption"
          text="Cancelar"
          variant="plain"
          @click="(tipoProduto.dialog = false), (tipoProduto.isRemove = false)"
        />
        <v-spacer />
        <v-btn
          class="text-caption"
          text="Deletar"
          @click="tipoProduto.delete()"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup>
import { tipoProdutoStore } from "@/store/tipoProduto.store";
import { onMounted } from "vue";

const tipoProduto = tipoProdutoStore();

onMounted(() => {
  tipoProduto.reset();
  tipoProduto.carregarLista();
});
</script>
