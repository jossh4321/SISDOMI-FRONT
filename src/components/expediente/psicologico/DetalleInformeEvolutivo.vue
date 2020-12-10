<template>
  <v-card>
    <v-card-title class="justify-center"
      >Informe Psicológico Evolutivo</v-card-title
    >
    <v-card-text>
      <v-stepper v-model="step">
        <v-stepper-header>
          <v-stepper-step editable step="1"> Datos Generales </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step editable step="2">
            Análisis y Diagnóstico
          </v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content step="1">
            <v-row>
              <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                <v-card-text class="border-content">
                  <label class="font-weight-medium label-title">
                    Usuaria CAR
                  </label>
                  <p class="label-text">
                    {{
                      documento.residente.nombre +
                      " " +
                      documento.residente.apellido
                    }}
                  </p>
                </v-card-text>
              </v-col>
              <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                <v-card-text class="border-content">
                  <label class="font-weight-medium label-title">
                    Fecha de evaluación
                  </label>
                  <p class="label-text">
                    {{ documento.fechacreacion | moment("DD/MM/YYYY") }}
                  </p>
                </v-card-text>
              </v-col>
              <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                <v-card-text class="border-content">
                  <label class="font-weight-medium label-title">
                    Observaciones generales de conducta
                  </label>
                  <p class="label-text">
                    {{ documento.contenido.observacionesgenerales }}
                  </p>
                </v-card-text>
              </v-col>
              <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                <v-card-text class="border-content">
                  <label class="font-weight-medium label-title">
                    Interpretación de resultados
                  </label>
                  <p class="label-text">
                    {{ documento.contenido.interpretacionresultados }}
                  </p>
                </v-card-text>
              </v-col>
              <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                <v-card-text class="border-content">
                  <label class="font-weight-medium label-title">
                    Diagnóstico psicológico
                  </label>
                  <p class="label-text">
                    {{ documento.contenido.diagnostico }}
                  </p>
                </v-card-text>
              </v-col>
              <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                <datos-multiple-simple
                  name="Pruebas psicológicas aplicadas"
                  class="border-content"
                  :items="documento.contenido.pruebasaplicadas"
                >
                </datos-multiple-simple>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12" md="6" lg="6">
                <v-btn block @click="step = 2" color="info">
                  <v-icon left>mdi-page-next-outline</v-icon>
                  <span>Continuar</span>
                </v-btn>
              </v-col>
              <v-col cols="12" sm="12" md="6" lg="6">
                <v-btn block color="error" @click="cerrarDialogo">
                  <v-icon left>mdi-close</v-icon>
                  <span>Cerrar</span>
                </v-btn>
              </v-col>
            </v-row>
          </v-stepper-content>
          <v-stepper-content step="2">
            <v-row>
              <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                <datos-multiple-simple
                  name="Conclusiones"
                  class="border-content"
                  :items="documento.contenido.conclusiones"
                >
                </datos-multiple-simple>
              </v-col>
              <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                <datos-multiple-simple
                  name="Recomendaciones"
                  class="border-content"
                  :items="documento.contenido.recomendaciones"
                >
                </datos-multiple-simple>
              </v-col>
              <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                <datos-multiple-anexo
                  :anexos="documento.contenido.anexos"
                  class="border-content"
                ></datos-multiple-anexo>
              </v-col>
              <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                <datos-multiple-firma
                  :firmas="documento.contenido.firmas"
                ></datos-multiple-firma>
              </v-col>
            </v-row>
            <v-btn block @click="cerrarDialogo" color="primary">
              <v-icon left>mdi-close-outline</v-icon>
              <span>Cerrar</span>
            </v-btn>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-card-text>
  </v-card>
</template>

<script>
import DatosMultipleSimple from "@/components/expediente/general/DatosMultipleSimple.vue";
import DatosMultipleFirma from "@/components/expediente/general/DatosMultipleFirma.vue";
import DatosMultipleAnexo from "@/components/expediente/general/DatosMultipleAnexo.vue";

export default {
  name: "detalle-informe-evolutivo-psicologico",
  data() {
    return {
      step: 1,
    };
  },
  methods: {
    cerrarDialogo() {
      this.$emit("close-dialog-detail");
    },
  },
  props: {
    documento: {
      type: Object,
    },
  },
  components: {
    DatosMultipleSimple,
    DatosMultipleFirma,
    DatosMultipleAnexo,
  },
};
</script>

<style lang="scss" scoped>
.label-title {
  font-size: 1.2rem;
}

.label-title-sm {
  font-size: 1rem;
}

.label-text {
  margin-top: 2px;
  font-size: 1rem;
  color: rgba(0, 0, 0, 0.87);
  text-transform: capitalize;
}

.label-text-sm {
  margin-top: 2px;
  font-size: 0.9rem;
  color: rgba(0, 0, 0, 0.87);
  text-transform: capitalize;
}

.border-content {
  border: 1px solid gray;
  border-radius: 10px;
  box-shadow: 1px 5px 5px rgb(194, 191, 191);
}
</style>