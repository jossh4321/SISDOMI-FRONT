<template>
  <v-card v-if="items.length > 0" outlined>
    <v-card-title>{{ name }}</v-card-title>
    <v-divider></v-divider>
    <v-list>
      <template v-for="(item, index) in items">
        <v-list-item :key="index">
          <v-list-item-icon class="mr-2">
            <v-icon color="success" medium>mdi-check</v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            {{ item }}
          </v-list-item-title>
        </v-list-item>
        <v-divider :key="item" v-if="index != items.length - 1"> </v-divider>
      </template>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: "datos-multiple-simple",
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