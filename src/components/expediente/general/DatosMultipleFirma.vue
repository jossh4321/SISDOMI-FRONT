<template>
  <v-slide-group multiple show-arrows>
    <v-slide-item v-for="(firma, index) in firmas" :key="index">
      <v-card elevation="10" outlined class="mr-10">
        <v-card-title>{{ firma.nombres }}</v-card-title>
        <v-card-text>
          <v-img :src="firma.firma" max-width="200" max-height="200"></v-img>
        </v-card-text>
      </v-card>
    </v-slide-item>
  </v-slide-group>
</template>

<script>
export default {
  name: "datos-multiple-firma",
  data() {
    return {};
  },
  props: {
    firmas: {
      type: Array,
      default: [],
    },
  },
};
</script>

<style lang="scss" scoped>

</style>