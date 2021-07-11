<template>
  <v-card v-if="items.length > 0" outlined>
    <v-card-title>{{ name }}</v-card-title>
    <v-divider></v-divider>
    <v-list>
      <template v-for="(item, index) in items">
        <v-list-item :key="index">
          <v-list-item-content>
            <v-list-item-title>
              {{ item }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider :key="item" v-if="index != items.length - 1"> </v-divider>
      </template>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: "visualizacion-multiple",
  data() {
    return {};
  },
  props: {
    items: {
      type: Array,
      default: [],
    },
    name: {
      type: String,
    },
  },
};
</script>

<style>
</style>