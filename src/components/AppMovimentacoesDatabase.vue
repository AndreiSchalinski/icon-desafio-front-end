<template>
  <v-sheet border rounded elevation="2">
    <v-data-table
      :headers="movimento.listHeader"
      :items="movimento.listMovimentacoes"
      :hide-default-footer="true"
      no-data-text="Sem movimentações cadastradas"
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

            Todas as movimentações
          </v-toolbar-title>

          <v-btn
            class="me-2 text-caption"
            prepend-icon="mdi-plus"
            rounded="lg"
            text="Movimentação"
            border
            @click="movimento.adicionar()"
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
                prepend-icon="mdi-rename"
                text="Detalhamento"
                variant="flat"
                color="black"
                size="small"
                rounded="lg"
                @click="movimento.detalharMovimentacao(item)"
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
                @click="movimento.remover(item)"
              ></v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-data-table>
  </v-sheet>

  <v-dialog
    v-if="!movimento.isRemove"
    v-model="movimento.dialog"
    width="1000px"
    height="1000px"
  >
    <v-card
      :subtitle="`${
        movimento.isReadOnly ? 'Todas as informações desta' : 'Adicionar'
      } movimentação de estoque`"
      :title="`${
        movimento.isReadOnly ? 'Detalhamento' : 'Adicionar'
      } movimentação de estoque`"
    >
      <template v-slot:text>
        <v-item-group
          selected-class="bg-black"
          v-model="movimento.movimento.tipo"
        >
          <v-container>
            <v-row>
              <v-col cols="12" class="text-center"
                ><p style="font-size: 25px">
                  {{
                    movimento.isReadOnly
                      ? "Movimentação selecionada"
                      : "Selecione o tipo de movimentação"
                  }}
                </p></v-col
              >
            </v-row>
            <v-row>
              <v-col v-for="tipo in 2" :key="tipo" cols="12" md="6">
                <v-item v-slot="{ isSelected, selectedClass, toggle }">
                  <v-card
                    :disabled="movimento.isReadOnly"
                    :class="['d-flex align-center', selectedClass]"
                    height="100"
                    width="100%"
                    dark
                    elevation="1"
                    @click="
                      () => {
                        toggle();
                        movimento.handleChange(tipo, isSelected);
                      }
                    "
                  >
                    <div
                      class="text-h3 flex-grow-1 text-center"
                      style="font-size: 18px !important"
                    >
                      {{
                        isSelected
                          ? tipo == 1
                            ? `ENTRADA`
                            : `SAIDA`
                          : tipo == 1
                          ? `ENTRADA`
                          : `SAIDA`
                      }}
                    </div>
                  </v-card>
                </v-item>
              </v-col>
            </v-row>
          </v-container>
        </v-item-group>

        <v-row class="mt-10">
          <v-col cols="12" md="4">
            <v-number-input
              :readonly="movimento.isReadOnly"
              v-model="movimento.movimentacao.valorVenda"
              :min="0.01"
              label="Valor de venda"
              :precision="2"
            ></v-number-input>
          </v-col>
          <v-col cols="12" md="4">
            <v-date-input
              :readonly="movimento.isReadOnly"
              label="Data venda"
              v-model="movimento.movimentacao.dataVenda"
            ></v-date-input>
          </v-col>
          <v-col cols="12" md="4">
            <v-number-input
              :readonly="movimento.isReadOnly"
              v-model="movimento.movimentacao.quantidadeMovimentada"
              :min="1"
              label="Quantidade movimentada"
            ></v-number-input>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-sheet border rounded elevation="2"
              ><v-data-table
                v-model="movimento.movimentacao.produto"
                :headers="movimento.headersProdutos"
                :items="movimento.listProdutos"
                item-value="name"
                items-per-page="5"
                return-object
                :show-select="!movimento.isReadOnly"
                select-strategy="single"
                no-data-text="Sem produtos selecionados para movimentação"
                hide-default-footer
                ><template v-slot:top>
                  <v-toolbar flat>
                    <v-toolbar-title class="text-caption">
                      <v-icon
                        color="medium-emphasis"
                        icon="mdi-book-multiple"
                        size="x-small"
                        start
                      ></v-icon>

                      Todos os produtos
                    </v-toolbar-title>
                  </v-toolbar>
                </template></v-data-table
              ></v-sheet
            >
          </v-col>
        </v-row>
      </template>

      <v-divider></v-divider>

      <v-card-actions class="bg-surface-light">
        <v-btn
          class="text-caption"
          :text="movimento.isReadOnly ? `Voltar` : `Cancelar`"
          variant="plain"
          @click="movimento.dialog = false"
        ></v-btn>

        <v-spacer></v-spacer>

        <v-btn
          :disabled="movimento.isReadOnly"
          class="text-caption"
          text="Salvar"
          @click="movimento.salvar()"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-else v-model="movimento.dialog" max-width="500">
    <v-card
      subtitle="Atenção, você removerá tipo produto!"
      title="Deletar tipo de produto"
    >
      <template v-slot:text>
        <v-row>
          <v-col cols="12" class="text-center">
            {{ `Deletar ?` }}
          </v-col>
        </v-row>
      </template>

      <v-divider />

      <v-card-actions class="bg-surface-light">
        <v-btn
          class="text-caption"
          text="Cancelar"
          variant="plain"
          @click="(movimento.dialog = false), (movimento.isRemove = false)"
        />
        <v-spacer />
        <v-btn
          class="text-caption"
          text="Deletar"
          @click="movimento.delete()"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup>
import { movimentacaoStore } from "@/store/movimentacao.store";
import { onMounted } from "vue";

const movimento = movimentacaoStore();

onMounted(() => {
  movimento.reset();
  movimento.carregarLista();
});
</script>
