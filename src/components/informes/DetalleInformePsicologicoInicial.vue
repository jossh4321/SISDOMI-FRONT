<template>
  <v-card>
    <v-card-title class="justify-center"
      >Detalle de Informe Psicológico Inicial</v-card-title
    >
    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step editable step="1">
          Datos Generales
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step editable step="2">
          Análisis y Diagnóstico
        </v-stepper-step>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content step="1">
          <div class="container-user">
            <form>
              <v-text-field
                v-model="residente"
                label="Usuaria CAR"
                outlined
                readonly
                color="#009900"
              ></v-text-field>

              <v-menu
                v-model="datemenu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="informe.fechacreacion"
                    label="Fecha de Evaluación"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    color="#009900"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="informe.fechacreacion"
                  @input="menu2 = false"
                  locale="es-es"
                ></v-date-picker>
              </v-menu>

              <v-textarea
                label="Antecedentes"
                v-model="informe.contenido.antecedentes"
                auto-grow
                outlined
                rows="2"
                readonly
                row-height="25"
                color="#009900"
                shaped
              ></v-textarea>

              <v-textarea
                label="Contexto psicológico"
                v-model="informe.contenido.contextopsicologico"
                auto-grow
                outlined
                rows="2"
                readonly
                row-height="25"
                color="#009900"
                shaped
              ></v-textarea>

              <v-textarea
                label="Análisis de estado psicológico actual"
                v-model="informe.contenido.analisisactual"
                auto-grow
                outlined
                readonly
                rows="2"
                row-height="25"
                color="#009900"
                shaped
              ></v-textarea>

              <v-card
                style="margin-top:1%;margin-bottom:1%;padding-bottom:1%;background-color:#EAEAEA"
              >
                <v-card-title>Transtornos posibles</v-card-title>
                <v-card
                  tile
                  elevation="0"
                  color="#FAFAFA"
                  style="margin:5px"
                  height="60"
                  v-for="transtorno in informe.contenido.transtornos"
                  :key="transtorno"
                >
                  <v-row style="margin-left:10px;heigh:100%" align="center">
                    <v-col :cols="8" align="left">
                      <span>{{ transtorno }}</span>
                    </v-col>
                  </v-row>
                </v-card>
              </v-card>

              <v-row>
                <v-col>
                  <v-btn block @click="step = 2" color="success">
                    <v-icon left>mdi-page-next-outline</v-icon>
                    <span>Continuar</span>
                  </v-btn>
                </v-col>
                <v-col>
                  <v-btn block @click="cerrarDialogo()" color="primary">
                    <v-icon left>mdi-close-outline</v-icon>
                    <span>Cerrar</span>
                  </v-btn>
                </v-col>
              </v-row>
            </form>
          </div>
        </v-stepper-content>
        <v-stepper-content step="2">
          <div class="container-user">
            <form>
              <v-card
                style="margin-top:1%;margin-bottom:1%;padding-bottom:1%;background-color:#EAEAEA"
              >
                <v-card-title>Conclusiones</v-card-title>
                <v-card
                  tile
                  elevation="0"
                  color="#FAFAFA"
                  style="margin:5px"
                  height="60"
                  v-for="conclusion in informe.contenido.conclusiones"
                  :key="conclusion"
                >
                  <v-row style="margin-left:10px;heigh:100%" align="center">
                    <v-col :cols="8" align="left">
                      <span>{{ conclusion }}</span>
                    </v-col>
                  </v-row>
                </v-card>
              </v-card>

              <v-card
                style="margin-top:1%;margin-bottom:1%;padding-bottom:1%;background-color:#EAEAEA"
              >
                <v-card-title>Recomendaciones</v-card-title>
                <v-card
                  tile
                  elevation="0"
                  color="#FAFAFA"
                  style="margin:5px"
                  height="60"
                  v-for="recomendacion in informe.contenido.recomendaciones"
                  :key="recomendacion"
                >
                  <v-row style="margin-left:10px;heigh:100%" align="center">
                    <v-col :cols="8" align="left">
                      <span>{{ recomendacion }}</span>
                    </v-col>
                  </v-row>
                </v-card>
              </v-card>

              <v-card
                  style="margin-top:30px;padding:5px 5px;background-color:#EAEAEA"
                >
                  <v-card
                    elevation="0"
                    style="background-color:#EAEAEA"
                    height="70"
                  >
                    <v-row style="margin:1%;heigh:100%" align="center">
                      <v-col :cols="4" align="left">
                        <v-text-field
                          v-model="this.usuario"
                          label="Nombre"
                          color="#009900"
                          readonly
                        ></v-text-field>
                      </v-col>
                      <v-col :cols="4" align="left">
                        <v-text-field
                          v-model="this.cargo"
                          label="Cargo"
                          color="#009900"
                          readonly
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-card>
                  <v-row>
                    <v-col :cols="12" align="center">
                      <div>
                        <v-card-text>
                              <img
                                width="240"
                                height="170"
                                :src="this.firma"
                                alt=""
                              />
                        </v-card-text>
                      </div>
                    </v-col>
                  </v-row>
                </v-card>

              <v-row>
                <v-col>
                  <v-btn block @click="cerrarDialogo()" color="primary">
                    <v-icon left>mdi-close-outline</v-icon>
                    <span>Cerrar</span>
                  </v-btn>
                </v-col>
              </v-row>
            </form>
          </div>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-card>
</template>
<script>
import axios from "axios";
import { mapGetters, mapMutations, mapState } from "vuex";
import moment from "moment";

export default {
  props: ["informe", "visible"],
  data() {
    return {
      step: 1,
      transtorno: "",
      transtornos: [],
      conclusion: "",
      conclusiones: [],
      recomendacion: "",
      recomendaciones: [],
      datemenu: false,
      residente: "",
      usuario: "",
      cargo:"",
      firma:"",
    };
  },
  created() {
    this.obtenerResidente();
    this.obtenerCreador();
  },
  methods: {
    async obtenerResidente() {
      await axios
        .get("/residente/id?id=" + this.informe.idresidente)
        .then((x) => {
          this.residente = x.data.nombre + " " + x.data.apellido;
          this.motivoIngreso = x.data.motivoIngreso;
        })
        .catch((err) => console.log(err));
    },
     async obtenerCreador() {
      await axios
        .get("/usuario/rol/permiso?id=" + this.informe.creadordocumento)
        .then((x) => {
          this.usuario = x.data.datos.nombre + " " + x.data.datos.apellido;
          this.cargo = x.data.rol.nombre;
          this.firma = x.data.datos.firma;
        })
        .catch((err) => console.log(err));
    },
    async mensaje(icono, titulo, texto, footer) {
      await this.$swal({
        icon: icono,
        title: titulo,
        text: texto,
        footer: footer,
      });
    },
    cerrarDialogo() {
      this.$emit("close-dialog-detail");
    },
  },
  computed: {
    show: {
      get() {
        return this.visible;
      },
      set(value) {
        if (!value) {
          this.$emit("close");
        }
      },
    },
    ...mapGetters(["user"]),
  },
};
</script>
