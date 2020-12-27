<template>
  <v-card>
    <v-card-title class="justify-center">
      Detalle del Plan de Intervención Psicológico
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
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Títlo del Plan"
                  :value="planIntervencion.contenido.titulo"
                  outlined
                  color="success"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  :value="
                    planIntervencion.residente.nombre +
                    ' ' +
                    planIntervencion.residente.apellido
                  "
                  label="Nombre del residente"
                  outlined
                  readonly
                  color="success"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Número de Documento"
                  :value="planIntervencion.residente.numeroDocumento"
                  outlined
                  color="success"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Fecha de Nacimiento"
                  :value="$moment(planIntervencion.residente.fechaNacimiento).format('DD/MM/YYYY')"
                  outlined
                  color="success"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Sexo"
                  :value="planIntervencion.residente.sexo"
                  outlined
                  color="success"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Motivo de ingreso"
                  :value="planIntervencion.residente.motivoIngreso"
                  outlined
                  color="success"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6"
                ><v-text-field
                  label="Estado"
                  :value="planIntervencion.residente.estado"
                  outlined
                  color="success"
                  readonly
                ></v-text-field>
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
              <v-col cols="12" sm="12" md="12" lg="12">
                <v-textarea
                  label="Descripcion"
                  outlined
                  readonly
                  color="success"
                  :value="planIntervencion.contenido.descripcion"
                >
                </v-textarea>
              </v-col>
              <v-col cols="12" sm="6" md="6" lg="6">
                <v-textarea
                  label="Frecuencia de sesiones"
                  :value="planIntervencion.contenido.frecuenciasesion"
                  outlined
                  readonly
                  color="success"
                >
                </v-textarea>
              </v-col>
              <v-col cols="12" sm="6" md="6" lg="6">
                <v-text-field
                  label="Número de sesiones"
                  :value="planIntervencion.contenido.numerosesion"
                  outlined
                  readonly
                  color="success"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <visualizacion-multiple
                  name="Objetivo específicos"
                  :items="planIntervencion.contenido.objetivoespecificos"
                ></visualizacion-multiple>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <visualizacion-multiple
                  name="Técnicas"
                  :items="planIntervencion.contenido.tecnicas"
                ></visualizacion-multiple>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <visualizacion-multiple
                  name="Metas"
                  :items="planIntervencion.contenido.metas"
                ></visualizacion-multiple>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <visualizacion-multiple
                  name="Indicadores"
                  :items="planIntervencion.contenido.indicadores"
                ></visualizacion-multiple>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <visualizacion-multiple
                  name="Requerimientos"
                  :items="planIntervencion.contenido.requerimientos"
                ></visualizacion-multiple>
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
              <v-col cols="12" sm="12" md="12" lg="12">
                <v-text-field
                  :value="this.usuario"
                  label="Creador del plan"
                  outlined
                  readonly
                  color="success"
                >
                </v-text-field>
                <img
                  width="240"
                  height="170"
                  :src="this.firma"
                  alt=""
                />
                <!-- <v-img
                  :src="planIntervencion.contenido.firmas[0].urlfirma"
                  max-width="200"
                  max-height="200"
                >
                </v-img> -->
              </v-col>
              <v-btn block @click="cerrarDialogo()" color="primary">
                <v-icon left>mdi-close-outline</v-icon>
                <span>Cerrar</span>
              </v-btn>
            </v-row>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from "axios";
import VisualizacionMultiple from "@/components/planIntervencion/General/VisualizacionMultiple.vue";

export default {
  name: "visualizar-plan-intervencion-psicologico",
  data() {
    return {
      step: 1,
      usuario:"",
      firma:"",
    };
  },
  created() {
    this.obtenerCreador();
  },
  methods: {
    cerrarDialogo() {
      this.$emit("close-dialog-detail");
    },
    async obtenerCreador() {
        await axios
        .get("/usuario/rol/permiso?id=" + this.planIntervencion.creador)
        .then((x) => {
          this.usuario = x.data.datos.nombre + " " + x.data.datos.apellido;
          this.firma = x.data.datos.firma;
        })
        .catch((err) => console.log(err));
      },
  },
  props: {
    planIntervencion: {
      type: Object,
    },
  },
  components: {
    VisualizacionMultiple,
  },
};
</script>

<style>
</style>