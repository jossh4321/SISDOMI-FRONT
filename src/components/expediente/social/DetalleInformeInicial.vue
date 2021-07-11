<template>
  <v-card>
    <v-card-title class="justify-center"> Informe Social Inicial </v-card-title>
    <v-card-text>
      <v-stepper v-model="step">
        <v-stepper-header>
          <v-stepper-step editable step="1"> Datos Generales </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step editable step="2">
            Descripción de la situación
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step editable step="3">
            Análisis y diagnóstico
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
                    >Motivo de ingreso</label
                  >
                  <p class="label-text text-none">
                    {{ documento.residente.motivoIngreso }}
                  </p>
                </v-card-text>
              </v-col>
              <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                <v-card-text class="border-content">
                  <label class="font-weight-medium label-title"
                    >Antecendentes</label
                  >
                  <p class="label-text text-none">
                    {{ documento.contenido.antecedentes }}
                  </p>
                </v-card-text>
              </v-col>
              <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                <v-card-text class="border-content">
                  <label class="font-weight-medium label-title"
                    >Familiares</label
                  >
                  <v-expansion-panels focusable>
                    <v-expansion-panel
                      v-for="(familiar, index) in documento.contenido
                        .familiares"
                      :key="index"
                    >
                      <v-expansion-panel-header>
                        {{ familiar.nombre + " " + familiar.apellido }}
                        <template v-slot:actions>
                          <v-icon color="info"> mdi-eye </v-icon>
                        </template>
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <v-row>
                          <v-col cols="12" sm="6" md="6" xl="4" lg="4">
                            <label class="font-weight-medium label-title-sm"
                              >Número de documento</label
                            >
                            <p class="label-text-sm text-none">
                              {{ familiar.numerodocumento }}
                            </p>
                          </v-col>
                          <v-col cols="12" sm="6" md="6" xl="4" lg="4">
                            <label class="font-weight-medium label-title-sm"
                              >Parentesco</label
                            >
                            <p class="label-text-sm text-none">
                              {{ familiar.parentesco }}
                            </p>
                          </v-col>
                          <v-col cols="12" sm="6" md="6" xl="4" lg="4">
                            <label class="font-weight-medium label-title-sm"
                              >Edad</label
                            >
                            <p class="label-text-sm text-none">
                              {{ familiar.edad }}
                            </p>
                          </v-col>
                          <v-col cols="12" sm="6" md="6" xl="4" lg="4">
                            <label class="font-weight-medium label-title-sm"
                              >Grado de instrucción</label
                            >
                            <p class="label-text-sm text-none">
                              {{ familiar.gradoinstruccion }}
                            </p>
                          </v-col>
                          <v-col cols="12" sm="6" md="6" xl="4" lg="4">
                            <label class="font-weight-medium label-title-sm"
                              >Ocupación</label
                            >
                            <p class="label-text-sm text-none">
                              {{ familiar.ocupacion }}
                            </p>
                          </v-col>
                          <v-col cols="12" sm="6" md="6" xl="4" lg="4">
                            <label class="font-weight-medium label-title-sm"
                              >Estado civil</label
                            >
                            <p class="label-text-sm text-none">
                              {{ familiar.estadocivil }}
                            </p>
                          </v-col>
                          <v-col cols="12" sm="12" md="12" xl="12" lg="12">
                            <label class="font-weight-medium label-title-sm"
                              >Observaciones</label
                            >
                            <p class="label-text-sm text-none">
                              {{ familiar.observaciones }}
                            </p>
                          </v-col>
                        </v-row>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-card-text>
              </v-col>
            </v-row>
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
          </v-stepper-content>
          <v-stepper-content step="2">
            <v-row>
              <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                <v-card-text class="border-content">
                  <label class="font-weight-medium label-title"
                    >Descripción de la vivienda</label
                  >
                  <p class="label-text text-none">
                    {{ documento.contenido.situacionvivienda }}
                  </p>
                </v-card-text>
              </v-col>
              <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                <v-card-text class="border-content">
                  <label class="font-weight-medium label-title"
                    >Descripción de la situación económica</label
                  >
                  <p class="label-text text-none">
                    {{ documento.contenido.situacioneconomica }}
                  </p>
                </v-card-text>
              </v-col>
              <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                <v-card-text class="border-content">
                  <label class="font-weight-medium label-title"
                    >Descripción de la situación de salud</label
                  >
                  <p class="label-text text-none">
                    {{ documento.contenido.situacionsalud }}
                  </p>
                </v-card-text>
              </v-col>
              <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                <v-card-text class="border-content">
                  <label class="font-weight-medium label-title"
                    >Descripción de la situación educativa</label
                  >
                  <p class="label-text text-none">
                    {{ documento.contenido.educacion }}
                  </p>
                </v-card-text>
              </v-col>
              <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                <v-card-text class="border-content">
                  <label class="font-weight-medium label-title"
                    >Descripción de la situación social</label
                  >
                  <p class="label-text text-none">
                    {{ documento.contenido.situacionactual }}
                  </p>
                </v-card-text>
              </v-col>
            </v-row>
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
          </v-stepper-content>
          <v-stepper-content step="3">
            <v-row>
              <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                <v-card-text class="border-content">
                  <label class="font-weight-medium label-title"
                    >Diagnóstico social</label
                  >
                  <p class="label-text">
                    {{ documento.contenido.diagnosticosocial }}
                  </p>
                </v-card-text>
              </v-col>
              <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                <datos-multiple-simple
                  name="Recomendaciones"
                  :items="documento.contenido.recomendaciones"
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
import DatosMultipleAnexo from "@/components/expediente/general/DatosMultipleAnexo.vue";

export default {
  name: "detalle-informe-incial-social",
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