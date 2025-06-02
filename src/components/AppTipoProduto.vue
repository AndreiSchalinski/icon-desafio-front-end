<template>
  <v-container>
    <h1>{{ routeName }}</h1>
    <div class="mb-5 mt-2"><v-divider></v-divider></div>
    <AppTipoProdutoDatabase />
  </v-container>
</template>
<script setup>
import { useRoute } from "vue-router";

const route = useRoute();

const routeName = route.name;
</script>
<style lang=""></style>
