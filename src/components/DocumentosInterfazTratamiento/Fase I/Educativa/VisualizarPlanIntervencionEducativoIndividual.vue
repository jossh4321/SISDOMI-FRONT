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
                  <v-col cols="12" sm="12" md="12">
                         <v-card class="subcard card-padre">
                          <v-card class="subcard"  style="margin-bottom:7px" color="#e6f3ff">
                              <span>
                                Residente: {{this.residente.nombre}} {{this.residente.apellido}}
                              </span>
                          </v-card >
                          <v-card class="subcard" color="#e6f3ff">
                            <span>
                              Fecha de Ingreso: {{ this.residente.fechaingreso | fomatoFecha}}
                            </span>
                          </v-card>
                        </v-card>
                  </v-col>
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
import axios from "axios";
import VisualizacionMultiple from "@/components/planIntervencion/General/VisualizacionMultiple.vue";
import moment from "moment";
export default {
  name: "visualizar-plan-intervencion",
  props:["residente"],
  data() {
      return {
      planIid: "",
      planIntervencion:{
        id: "",
        tipo: "",
        historialcontenido: [],
        fechacreacion: "",
        area: "",
        idresidente: "",
        fase: "",
        estado: "", 
        creador: "",
        contenido: {
          car: '',
          edad: "",
          trimestre: "",
          objetivogeneral: "",
          objetivoespecificos: [],
          aspectosintervencion: [],
          estrategias: [],
          indicadores: [],
          metas: [],
          titulo: "",
          codigodocumento: "",
        },
      },
      step:1,
      usuario:"",
      firma:"",
    };
  },
  filters: {
    fomatoFecha: (fecha) =>{
            var formato = moment(fecha);
            return formato.format("llll");
    }
  },
  async created() {
    await this.obtenerPlanIId();
    await this.detailPlanIntervencion(this.planIid);
    await this.obtenerCreador();
  },
  methods:{
    cerrarDialogo(){
      this.$emit("cerrar-modal-docf1");
    },
    async obtenerPlanIId() {
      await axios
        .get("/documento/PlanIntervencionIndividualEducativo/residente/"+this.residente.id)
        .then((x) => {
          this.planIid = x.data[0].id;
        })
        .catch((err) => console.log(err));
    },
    async detailPlanIntervencion(item) {
      await axios
        .get("/PlanIntervencion/" + item)
        .then((res) => {
          this.planIntervencion = res.data;
        })
        .catch((err) => {
          console.error(err);
        });
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