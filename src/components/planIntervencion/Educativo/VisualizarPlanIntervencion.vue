<template>
    <v-card>
    <v-card-title class="justify-center"
      >Detalle del plan de intervención educativo</v-card-title
    >
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
            <div class="container-planI">
              <form>
                <v-row>
                  <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                    <v-text-field
                      :value="planIntervencion.contenido.titulo"
                      label="Nombre del Plan de Intervención"
                      outlined
                      color="success"
                      readonly
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                    <v-text-field
                      :value="planIntervencion.contenido.car"
                      label="Nombre del CAR"
                      outlined
                      color="success"
                      readonly
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6" lg="6" xl="6">
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
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                    <v-text-field
                      :value="planIntervencion.contenido.edad"
                      label="Edad del Residente"
                      outlined
                      readonly
                      color="success"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                    <v-text-field
                      :value="planIntervencion.contenido.trimestre"
                      label="Trimestre"
                      outlined
                      readonly
                      color="success"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                    <v-text-field
                      :value="planIntervencion.contenido.objetivogeneral"
                      label="Objetivo General"
                      outlined
                      readonly
                      color="success"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                    lg="12"
                    xl="12"
                    class="mb-5 pt-0"
                  >
                    <visualizacion-multiple
                      name="Objetivos específicos"
                      :items="planIntervencion.contenido.objetivoespecificos"
                    ></visualizacion-multiple>
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
              </form>
            </div>
          </v-stepper-content>
          <v-stepper-content step="2">
            <div class="container-user">
              <v-row>
                <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                  <visualizacion-multiple
                    name="Aspectos de Intervención"
                    :items="planIntervencion.contenido.aspectosintervencion"
                  ></visualizacion-multiple>
                </v-col>
                <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                  <visualizacion-multiple
                    name="Actividades/Estrategias"
                    :items="planIntervencion.contenido.estrategias"
                  ></visualizacion-multiple>
                </v-col>
                <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                  <visualizacion-multiple
                    name="Indicadores"
                    :items="planIntervencion.contenido.indicadores"
                  ></visualizacion-multiple>
                </v-col>
                <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                  <visualizacion-multiple
                    name="Metas"
                    :items="planIntervencion.contenido.metas"
                  ></visualizacion-multiple>
                </v-col>
                <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                  <v-text-field
                    :value="planIntervencion.creador"
                    label="Creador del plan"
                    outlined
                    readonly
                    color="success"
                  >
                  </v-text-field>
                  <v-img
                    :src="planIntervencion.contenido.firmas[0].urlfirma"
                    max-width="200"
                    max-height="200"
                  >
                  </v-img>
                </v-col>
              </v-row>

              <v-btn block @click="cerrarDialogo()" color="primary">
                <v-icon left>mdi-close-outline</v-icon>
                <span>Cerrar</span>
              </v-btn>
            </div>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-card-text>
    </v-card>
</template>
<script>
import VisualizacionMultiple from "@/components/planIntervencion/General/VisualizacionMultiple.vue";

export default {
   name: "visualizar-plan-intervencion",
  data() {
      return {
      step:1,
    };
  },methods:{
    cerrarDialogo(){
      this.$emit("close-dialog-detail");
    },
   
  },
  props: {
    planIntervencion: {
      type: Object
    }
  },
  components: {
     VisualizacionMultiple,
  }

}
</script>
<style  scoped>
.container-planI {
  margin: 15px;
}
</style>