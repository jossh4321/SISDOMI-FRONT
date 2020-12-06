<template>
  <v-card>
    <v-card-title>Anexos</v-card-title>
    <v-divider></v-divider>
    <template v-if="anexos.length > 0">
      <v-row class="ml-1">
        <v-col
          cols="12"
          sm="4"
          md="4"
          lg="4"
          xl="4"
          v-for="(anexo, index) in anexos"
          :key="index"
        >
          <label class="font-weight-medium label-title">{{
            anexo.titulo
          }}</label>
          <v-btn color="success" class="d-block mt-2">
            Ver anexo
            <v-icon right dark>mdi-file-pdf</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </template>
    <template v-else>
      <v-alert
        text
        outlined
        border="left"
        color="deep-orange"
        width="97%"
        icon="info"
      >
        No se ha registrado ningún anexo al documento
      </v-alert>
    </template>
  </v-card>
</template>

<script>
export default {
  name: "datos-multiple-anexo",
  data() {
    return {};
  },
  props: {
    anexos: {
      type: Array,
      default: [],
    },
  },
};
</script>

<style lang="scss" scoped>
.label-title {
  font-size: 1rem;
}

.label-text {
  margin-top: 2px;
  font-size: 1rem;
  color: rgba(0, 0, 0, 0.87);
  text-transform: capitalize;
}
</style>