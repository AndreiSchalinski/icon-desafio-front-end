<template>
  <v-navigation-drawer expand-on-hover>
    <v-list>
      <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
        subtitle="sandra_a88@gmailcom"
        title="Sandra Adams"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item
        v-for="(item, i) in drawer.listOptions"
        :key="i"
        :value="item"
        :to="item.path"
        ><template v-slot:prepend>
          <v-icon :icon="item.props.prependIcon"></v-icon>
        </template>

        <v-list-item-title v-text="item.title"></v-list-item-title
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { drawerStore } from "@/store/drawer.store";

const drawer = drawerStore();
</script>
