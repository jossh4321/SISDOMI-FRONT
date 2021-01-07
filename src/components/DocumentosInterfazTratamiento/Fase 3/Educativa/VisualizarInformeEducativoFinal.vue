<template>
  <v-card>
    <v-card-title class="justify-center">Informe Educativo Final</v-card-title>
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
             <v-card class="subcard card-padre" style="margin-bottom:20px">
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
              <v-text-field
                v-model="informe.contenido.iereinsersion.nombre"
                label="Instirución Educativa"
                outlined
                readonly
                color="#009900"
              ></v-text-field>
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="informe.contenido.iereinsersion.modalidad"
                    label="Modalidad"
                    outlined
                    readonly
                    color="#009900"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="informe.contenido.iereinsersion.nivel"
                    label="Nivel Educativo"
                    outlined
                    readonly
                    color="#009900"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="informe.contenido.iereinsersion.grado"
                    label="Grado"
                    outlined
                    readonly
                    color="#009900"
                  ></v-text-field>
                </v-col>
              </v-row>
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
              </v-menu>
              <v-textarea
                v-model="informe.contenido.antecedentes"
                label="Antecedentes"
                auto-grow
                outlined
                readonly
                rows="2"
                row-height="40"
                color="#009900"
                shaped
              ></v-textarea>
              <v-textarea
                v-model="informe.contenido.situacionactual"
                label="Situación Educativa Actual"
                auto-grow
                outlined
                readonly
                rows="2"
                row-height="40"
                color="#009900"
                shaped
              ></v-textarea>
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
                <v-card
                  elevation="0"
                  style="background-color:#EAEAEA"
                  height="70"
                >
                  <v-card-title>
                    Logros Alcanzados
                  </v-card-title>
                </v-card>

                <v-card
                  tile
                  elevation="0"
                  color="#FAFAFA"
                  style="margin:5px"
                  height="60"
                  v-for="logro in informe.contenido.logroalcanzado"
                  :key="logro"
                >
                  <v-row style="margin-left:10px;heigh:100%" align="center">
                    <v-col :cols="8" align="left">
                      <span>{{ logro }}</span>
                    </v-col>
                  </v-row>
                </v-card>
              </v-card>
              <v-card
                style="margin-top:1%;margin-bottom:1%;padding-bottom:1%;background-color:#EAEAEA"
              >
                <v-card
                  elevation="0"
                  style="background-color:#EAEAEA"
                  height="70"
                >
                  <v-card-title>
                    Recomendaciones
                  </v-card-title>
                </v-card>

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
                  height="50"
                >
                  <v-card-title>
                    Anexos
                  </v-card-title>
                </v-card>
                <v-card
                  color="#FAFAFA"
                  style="margin-top:5px"
                  height="60"
                  v-for="(item, index) in informe.contenido.anexos"
                  :key="index"
                >
                  <v-row style="margin-left:10px;heigh:100%" align="center">
                    <v-col :cols="8">
                      <article>
                        <img
                          style="margin-right:5px;width:6% "
                          src="https://www.flaticon.es/svg/static/icons/svg/2991/2991112.svg"
                          alt="imagen documento"
                        />
                        <span style="font-size:18px"> {{ item.titulo }}</span>
                      </article>
                    </v-col>
                    <v-col :cols="4" align="center">
                      <template>
                        <v-btn
                          fab
                          icon=""
                          x-small
                          dark
                          color="#EAEAEA"
                          @click="verAnexo(index)"
                        >
                          <img
                            style="width:25% "
                            src="https://www.flaticon.es/svg/static/icons/svg/709/709612.svg"
                            alt="visualizar"
                          />
                        </v-btn>
                      </template>
                    </v-col>
                  </v-row>
                </v-card>
              </v-card>

              <v-dialog
                v-model="dialogVistaPreviaAnexos"
                persistent
                max-width="600px"
              >
                <v-card align="center">
                  <v-card-title>
                    <span class="headline">Vista previa</span>
                  </v-card-title>
                  <v-card-text>
                    <iframe :src="pdf" width="100%" height="600"></iframe>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="cerrarVistaPreviaAnexo()"
                    >
                      Cerrar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

              <v-card
                style="margin-top:30px;margin-bottom:10px;padding:5px 5px;background-color:#EAEAEA"
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

              <v-btn block @click="cerrarDialogo()" color="primary">
                <v-icon left>mdi-close-outline</v-icon>
                <span>Cerrar</span>
              </v-btn>
            </form>
          </div>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-card>
</template>
<script>
import axios from "axios";
import { mapMutations, mapState } from "vuex";
import moment from "moment";

export default {
  name: "DetalleInformeEducativoFinal",
  props: ["residente"],
  data() {
    return {
      datemenu: false,
      step: 1,
      logro: "",
      recomendacion: "",
      pdf: "",
      dialogVistaPreviaAnexos: false,
      usuario: "",
      cargo: "",
      firma: "",
      informe: {
        id: "",
        tipo: "InformeEducativoFinal",
        historialcontenido: [],
        creadordocumento: "",
        fechacreacion: null,
        area: "educativa",
        fase: "2",
        idresidente: "",
        estado: "creado",
        contenido: {
          antecedentes: "",
          situacionactual: "",
          logroalcanzado: [],
          recomendaciones: [],
          iereinsersion: {
            nombre: "",
            modalidad: "EBA",
            nivel: "PRIMARIA",
            grado: "1",
          },
          anexos: [],
          codigodocumento: "",
        },
      },
    };
  },
  filters: {
    fomatoFecha: (fecha) => {
      var formato = moment(fecha);
      return formato.format("llll");
    },
  },
  async created() {
    await this.obtenerInformeId();
    this.informe = await this.loadInformeModificacion(this.informeid);
    await this.obtenerCreador();
  },
  methods: {
    cerrarDialogo() {
      this.$emit("cerrar-modal-docf1");
    },
     async obtenerInformeId() {
      await axios
        .get("/documento/InformeEducativoFinal/residente/"+this.residente.id)
        .then((x) => {
          this.informeid = x.data[0].id;
        })
        .catch((err) => console.log(err));
    },
    async loadInformeModificacion(idinforme) {
      var info = {};
      await axios
        .get("/informe/id?id=" + idinforme)
        .then((res) => {
          info = res.data;
        })
        .catch((err) => console.log(err));
      return info;
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
    verAnexo(index) {
      this.pdf = this.informe.contenido.anexos[index].url;
      console.log(this.pdf), (this.dialogVistaPreviaAnexos = true);
    },
    cerrarVistaPreviaAnexo() {
      this.dialogVistaPreviaAnexos = false;
    },
  },
};
</script>
<style scoped>
.container-user {
  margin: 15px;
}

.dropzone-custom-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.dropzone-custom-title {
  margin-top: 0;
  color: #00b782;
}

.subtitle {
  color: #314b5f;
}
.divider-custom {
  margin-top: 7px;
  margin-bottom: 7px;
}

.inputTextField {
  border-color: green;
}
</style>
