<template>
  <v-card>
    <v-card-title>Documentos</v-card-title>
    <v-list>
      <template v-for="(areaDocumento, index) in areaDocuments">
        <template v-if="areaDocumento.documentos.length > 1">
          <v-list-group :key="index" prepend-icon="mdi-file-outline" no-action>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>{{
                  areaDocumento | typeDocument
                }}</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="(documento, index) in areaDocumento.documentos"
              :key="index"
            >
              <v-list-item-content>
                <v-list-item-title>{{
                  index | letPaddingZeros(areaDocumento)
                }}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn icon @click="detailDocument(documento)">
                  <v-icon color="info" large>mdi-information</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list-group>
        </template>
        <template v-else>
          <v-list-item :key="index">
            <v-list-item-icon>
              <v-icon>mdi-file-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              {{ areaDocumento | typeDocument }}
            </v-list-item-title>
            <v-list-item-action>
              <v-btn icon @click="detailDocument(areaDocumento.documentos[0])">
                <v-icon color="info" large>mdi-information</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </template>
      </template>
    </v-list>
    <v-dialog v-model="showInfoDocument" persistent>
        <component :is="typeDocument"></component>
    </v-dialog>
  </v-card>
</template>

<script>
export default {
  name: "app-detalle-documentos",
  data() {
      return {
          showInfoDocument: false,
          typeDocument: ""
      }
  },
  props: {
    areaDocuments: {
      type: Array,
      default: [],
    },
  },
  methods: {
      detailDocument(documentId) {
          console.log(documentId);
      }
  },
  filters: {
    typeDocument(value) {
      if (/^.*(Inicial)$/.test(value.tipo)) {
        return "Inicial";
      } else if (/^.*(Evolutivo)$/.test(value.tipo)) {
        return "Evolutivo";
      } else if (/^.*(Final)$/.test(value.tipo)) {
        return "Final";
      } else if (/^.*(Individual)$/.test(value.tipo)) {
        return "Plan de Intervención";
      }
    },
    letPaddingZeros(value, areaDocumento) {
      return areaDocumento.tipo
        .charAt(0)
        .concat("-")
        .concat((value + 1).toString().padStart(3, 0));
    },
  },
};
</script>

<style>
</style>