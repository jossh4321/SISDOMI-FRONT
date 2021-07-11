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
          <v-btn
            color="success"
            class="d-block mt-2"
            @click="showAnnexe(anexo)"
          >
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
    <v-dialog v-model="dialogPDF" max-width="600" persistent>
      <v-card>
        <v-card-title>
          Visualización del documento en PDF
          <v-spacer></v-spacer>
          <v-btn
            fab
            rounded
            small
            color="primary"
            @click="closeDialogDetailPdf"
          >
            <v-icon dark>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <iframe :src="urlAnnexe" width="100%" height="600"></iframe>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
export default {
  name: "datos-multiple-anexo",
  data() {
    return {
      dialogPDF: false,
      urlAnnexe: "",
    };
  },
  props: {
    anexos: {
      type: Array,
      default: [],
    },
  },
  methods: {
    showAnnexe(enlace) {
      this.dialogPDF = true;
      this.urlAnnexe = enlace.url;
    },
    closeDialogDetailPdf() {
      this.dialogPDF = false;
      this.urlAnnexe = "";
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