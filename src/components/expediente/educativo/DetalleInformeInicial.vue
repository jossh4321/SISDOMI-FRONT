<template>
  <v-card>
    <v-card-title class="justify-center">
      Informe Inicial Educativo
    </v-card-title>
    <v-card-text>
      <v-stepper v-model="step">
        <v-stepper-header>
          <v-stepper-step editable step="1"> Datos Generales </v-stepper-step>
          <v-divider></v-divider>

          <v-stepper-step editable step="2">
            Aspectos de intervención
          </v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content step="1">
            <v-row>
              <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                <v-card-text class="border-content">
                  <label class="font-weight-medium label-title"
                    >Usuario CAR</label
                  >
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
                  <label class="font-weight-medium label-title"
                    >Educador responsable</label
                  >
                  <p class="label-text">{{ documento.contenido.evaluador }}</p>
                </v-card-text>
              </v-col>
              <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                <v-card-text class="border-content">
                  <label class="font-weight-medium label-title"
                    >Lugar de Evaluación</label
                  >
                  <p class="label-text">
                    {{ documento.contenido.lugarevaluacion }}
                  </p>
                </v-card-text>
              </v-col>
              <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                <v-card-text class="border-content">
                  <label class="font-weight-medium label-title"
                    >Fecha de evaluación</label
                  >
                  <p class="label-text">
                    {{ documento.fechacreacion | moment("DD/MM/YYYY") }}
                  </p>
                </v-card-text>
              </v-col>

              <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                <v-card-text class="border-content">
                  <label class="font-weight-medium label-title"
                    >Situación Académica</label
                  >
                  <p class="label-text">
                    {{ documento.contenido.situacionacademica }}
                  </p>
                </v-card-text>
              </v-col>
              <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                <v-card-text class="border-content">
                  <label class="font-weight-medium label-title"
                    >Análisis académico y de comportamiento</label
                  >
                  <p class="label-text">
                    {{ documento.contenido.analisisacademico }}
                  </p>
                </v-card-text>
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
                  name="Conclusiones y recomendaciones"
                  :items="documento.contenido.conclusiones"
                  class="border-content"
                ></datos-multiple-simple>
              </v-col>
              <v-col class="12" sm="12" md="12" lg="12" xl="12">
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

import axios from "axios";

export default {
  name: "detalle-informe-inicial-educativo",
  data() {
    return {
      step: 1,
    };
  },
  methods: {
    cerrarDialogo() {
      this.$emit("close-dialog-detail");
    },
    async obtainEvaluater() {
      await axios
        .get("/usuario/id?id=" + this.documento.contenido.evaluador)
        .then((res) => {
          this.documento.contenido.evaluador =
            res.data.datos.nombre + " " + res.data.datos.apellido;
        })
        .catch((err) => {
          console.error(err);
        });
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
  async created() {
    await this.obtainEvaluater();
  },
};
</script>

<style lang="scss" scoped>
.label-title {
  font-size: 1.2rem;
}

.label-text {
  margin-top: 2px;
  font-size: 1rem;
  color: rgba(0, 0, 0, 0.87);
  text-transform: capitalize;
}

.border-content {
  border: 1px solid gray;
  border-radius: 10px;
  box-shadow: 1px 5px 5px rgb(194, 191, 191);
}
</style>