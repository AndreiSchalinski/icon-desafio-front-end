<template>
  <v-container>
    <div>
      <h1>{{ routeName }}</h1>
    </div>
    <v-toolbar flat>
      <v-toolbar-title>
        <v-icon
          color="#474747"
          icon="mdi-view-dashboard"
          size="x-large"
          start
        ></v-icon>

        Todos as movimentações
      </v-toolbar-title>
    </v-toolbar>
  </v-container>
</template>
<script setup>
import { useRoute } from "vue-router";

const route = useRoute();

const routeName = route.name;

</script>
<style lang=""></style>
