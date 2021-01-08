<template>
  <v-card>
    <v-card-title
      class="pr-3"
      >Documentos
      <v-spacer></v-spacer>
      <v-btn fab rounded color="primary" x-small @click="closeDialogDetailDocuments">
        <v-icon dark small>mdi-close</v-icon>
      </v-btn>
    </v-card-title>
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
    <v-dialog v-model="showInfoDocument" persistent max-width="880">
      <component
        :is="typeDocument"
        :documento="documento"
        :firmas="firmas"
        @close-dialog-detail="closeDialogDetail"
      ></component>
    </v-dialog>
  </v-card>
</template>

<script>
import axios from "axios";
import DetallePlanIntervencionEducativo from "@/components/expediente/educativo/DetallePlanIntervencion.vue";
import DetallePlanIntervencionPsicologico from "@/components/expediente/psicologico/DetallePlanIntervencion.vue";
import DetallePlanIntervencionSocial from "@/components/expediente/social/DetallePlanIntervencion.vue";
import DetalleInformeInicialEducativo from "@/components/expediente/educativo/DetalleInformeInicial.vue";
import DetalleInformeInicialPsicologico from "@/components/expediente/psicologico/DetalleInformeInicial.vue";
import DetalleInformeInicialSocial from "@/components/expediente/social/DetalleInformeInicial.vue";
import DetalleInformeEvolutivoEducativo from "@/components/expediente/educativo/DetalleInformeEvolutivo.vue";
import DetalleInformeEvolutivoPsicologico from "@/components/expediente/psicologico/DetalleInformeEvolutivo.vue";
import DetalleInformeEvolutivoSocial from "@/components/expediente/social/DetalleInformeEvolutivo.vue";
import DetalleInformeFinalEducativo from "@/components/expediente/educativo/DetalleInformeFinal.vue";
import DetalleInformeFinalPsicologico from "@/components/expediente/psicologico/DetalleInformeFinal.vue";
import DetalleInformeFinalSocial from "@/components/expediente/social/DetalleInformeFinal.vue";

export default {
  name: "app-detalle-documentos",
  data() {
    return {
      showInfoDocument: false,
      typeDocument: "",
      documento: null,
      firmas: []
    };
  },
  props: {
    areaDocuments: {
      type: Array,
      default: [],
    },
  },
  methods: {
    detailDocument(documentId) {
      axios
        .get("/documento/" + documentId)
        .then((res) => {
          this.firmas = [];
          let area = "";
          let informe = "";

          area = this.evaluateArea(res.data.area);
          informe = this.evaluateDocumento(res.data.tipo);

          this.documento = res.data;
          this.firmas.push(this.documento.creador);
          this.typeDocument = "Detalle" + informe + area;
          this.showInfoDocument = true;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    evaluateArea(area) {
      let areaEvaluate = "";

      switch (area) {
        case "educativa":
          areaEvaluate = "Educativo";
          break;
        case "psicologica":
          areaEvaluate = "Psicologico";
          break;
        case "social":
          areaEvaluate = "Social";
          break;
        default:
          break;
      }

      return areaEvaluate;
    },
    evaluateDocumento(tipo) {
      let tipoEvaluate = "";

      if (/^.*(Inicial)$/.test(tipo)) {
        tipoEvaluate = "InformeInicial";
      } else if (/^.*(Evolutivo)$/.test(tipo)) {
        tipoEvaluate = "InformeEvolutivo";
      } else if (/^.*(Final)$/.test(tipo)) {
        tipoEvaluate = "InformeFinal";
      } else if (/^.*(Individual).*$/.test(tipo)) {
        tipoEvaluate = "PlanIntervencion";
      }

      return tipoEvaluate;
    },
    closeDialogDetail() {
      this.typeDocument = "";
      this.showInfoDocument = false;
    },
    closeDialogDetailDocuments() {
      this.$emit('close-detail-documents');
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
      } else if (/^.*(Individual).*$/.test(value.tipo)) {
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
  components: {
    DetallePlanIntervencionEducativo,
    DetallePlanIntervencionPsicologico,
    DetallePlanIntervencionSocial,
    DetalleInformeInicialEducativo,
    DetalleInformeInicialPsicologico,
    DetalleInformeInicialSocial,
    DetalleInformeEvolutivoEducativo,
    DetalleInformeEvolutivoPsicologico,
    DetalleInformeEvolutivoSocial,
    DetalleInformeFinalEducativo,
    DetalleInformeFinalPsicologico,
    DetalleInformeFinalSocial,
  },
};
</script>

<style>
</style>