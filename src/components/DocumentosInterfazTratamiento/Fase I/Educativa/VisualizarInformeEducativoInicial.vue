<template>
  <v-card>
    <v-card-title class="justify-center"
      >Detalle del Informe Educativo Inicial</v-card-title
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
              <v-textarea
                label="Lugar de Evaluación"
                v-model="informe.contenido.lugarevaluacion"
                auto-grow
                outlined
                rows="2"
                row-height="25"
                color="#009900"
                shaped
                readonly
              ></v-textarea>

              <v-textarea
                label="Situación Académica"
                v-model="informe.contenido.situacionacademica"
                auto-grow
                outlined
                rows="2"
                row-height="40"
                color="#009900"
                shaped
                readonly
              ></v-textarea>

              <v-textarea
                label="Análisis Académico y de comportamiento"
                v-model="informe.contenido.analisisacademico"
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
                  height="50"
                >
                  <v-card-title>
                    Conclusiones y recomendaciones
                  </v-card-title>
                </v-card>

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
                style="margin-top:30px;padding:5px 5px;background-color:#EAEAEA"
              >
                <v-card-title>Anexos</v-card-title>
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
                    <v-col :cols="2" align="center">
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
                  style="margin-top:30px; margin-bottom:10px; padding:5px 5px;background-color:#EAEAEA"
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
  name: "DetalleInformeEducativoInicial",
  props:["residente"],
  data() {
    return {
      informeid: "",
      informe: {
        id: "",
        tipo: "",
        historialcontenido: [],
        creadordocumento: "",
        fechacreacion: "",
        area: "",
        fase: "",
        idresidente: "",
        estado: "",
        contenido: {
          situacionacademica: "",
          analisisacademico: "",
          conclusiones: [],
          anexos: [],
          codigodocumento: "",
          lugarevaluacion: "",
        },
      },
      datemenu: false,
      step: 1,
      conclusion: "",
      dialogVistaPreviaAnexos: false,
      pdf: "",
      usuario: "",
      cargo:"",
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
        .get("/documento/InformeEducativoInicial/residente/"+this.residente.id)
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
      this.dialogVistaPreviaAnexos = true;
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
