<template>
  <v-card>
    <v-card-title class="justify-center">
      Plan de Intervención Psicológico
    </v-card-title>
    <v-card-text>
      <v-stepper v-model="step">
        <v-stepper-header>
          <v-stepper-step editable step="1">
            Datos del Residente
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step editable step="2">
            Aspectos de Intervención
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step editable step="3">
            Datos del psicólogo
          </v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content step="1">
            <v-row>
              <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                <v-card-text class="border-content">
                  <label class="font-weight-medium label-title"
                    >Título del Plan</label
                  >
                  <p class="label-text">{{ documento.contenido.titulo }}</p>
                </v-card-text>
              </v-col>
              <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                <v-card-text class="border-content">
                  <label class="font-weight-medium label-title"
                    >Nombre del residente</label
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
                    >Número de documento</label
                  >
                  <p class="label-text">
                    {{ documento.residente.numeroDocumento }}
                  </p>
                </v-card-text>
              </v-col>
              <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                <v-card-text class="border-content">
                  <label class="font-weight-medium label-title"
                    >Fecha de nacimiento</label
                  >
                  <p class="label-text">
                    {{
                      $moment(documento.residente.fechaNacimiento).format(
                        "DD/MM/YYYY"
                      )
                    }}
                  </p>
                </v-card-text>
              </v-col>
              <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                <v-card-text class="border-content">
                  <label class="font-weight-medium label-title">Sexo</label>
                  <p class="label-text">{{ documento.residente.sexo }}</p>
                </v-card-text>
              </v-col>
              <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                <v-card-text class="border-content">
                  <label class="font-weight-medium label-title"
                    >Motivo de ingreso</label
                  >
                  <p class="label-text">
                    {{ documento.residente.motivoIngreso }}
                  </p>
                </v-card-text>
              </v-col>
              <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                <v-card-text class="border-content">
                  <label class="font-weight-medium label-title">Estado</label>
                  <p class="label-text">{{ documento.residente.estado }}</p>
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
              <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                <v-card-text class="border-content">
                  <label class="font-weight-medium label-title"
                    >Descripción</label
                  >
                  <p class="label-text">
                    {{ documento.contenido.descripcion }}
                  </p>
                </v-card-text>
              </v-col>
              <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                <v-card-text class="border-content">
                  <label class="font-weight-medium label-title"
                    >Frecuencia de sesiones</label
                  >
                  <p class="label-text">
                    {{ documento.contenido.frecuenciasesion }}
                  </p>
                </v-card-text>
              </v-col>
              <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                <v-card-text class="border-content">
                  <label class="font-weight-medium label-title"
                    >Número de sesiones</label
                  >
                  <p class="label-text">
                    {{ documento.contenido.numerosesion }}
                  </p>
                </v-card-text>
              </v-col>
              <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                <datos-multiple-simple
                  name="Objetivos específicos"
                  :items="documento.contenido.objetivoespecificos"
                  class="border-content"
                ></datos-multiple-simple>
              </v-col>
              <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                <datos-multiple-simple
                  name="Técnicas"
                  :items="documento.contenido.tecnicas"
                  class="border-content"
                ></datos-multiple-simple>
              </v-col>
              <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                <datos-multiple-simple
                  name="Metas"
                  :items="documento.contenido.metas"
                  class="border-content"
                ></datos-multiple-simple>
              </v-col>
              <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                <datos-multiple-simple
                  name="Indicadores"
                  :items="documento.contenido.indicadores"
                  class="border-content"
                ></datos-multiple-simple>
              </v-col>
              <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                <datos-multiple-simple
                  name="Requerimientos"
                  :items="documento.contenido.requerimientos"
                  class="border-content"
                ></datos-multiple-simple>
              </v-col>
              <v-row>
                <v-col cols="12" sm="12" md="6" lg="6">
                  <v-btn block @click="step = 3" color="info">
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
            </v-row>
          </v-stepper-content>
          <v-stepper-content step="3">
            <v-row>
              <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                <datos-multiple-firma
                  :firmas="firmas"
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

export default {
  name: "detalle-plan-intervencion-psicologico",
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
    firmas: {
      type: Array
    }
  },
  components: {
    DatosMultipleSimple,
    DatosMultipleFirma,
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