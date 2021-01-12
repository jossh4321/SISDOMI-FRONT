<template>
  <v-card>
    <v-card-title class="justify-center">Visualizar Actividad</v-card-title>
    <v-card>
      <v-stepper v-model="step">
        <v-stepper-header>
          <v-stepper-step editable step="1">
            Datos generales de actividad
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step editable step="2"> Participantes </v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content step="1">
            <div class="container-user">
              <form style="margin-top: 10px">
                <v-row>
                  <v-col>
                    <v-text-field
                      label="Titulo del actividad"
                      v-model.trim="actividad.nombre"
                      outlined
                      readonly
                      color="success"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      label="Descripción del actividad"
                      v-model.trim="actividad.descripcion"
                      outlined
                      readonly
                      color="success"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <v-text-field
                      label="Fecha de Inicio del actividad"
                      v-model="actividad.contenido.fechainicio"
                      outlined
                      readonly
                      color="success"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      label="Fecha de Fin del actividad"
                      v-model="actividad.contenido.fechafin"
                      outlined
                      readonly
                      color="success"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      label="Tipo"
                      v-model="actividad.tipo"
                      outlined
                      readonly
                      color="success"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-btn
                      color="error"
                      elevation="2"
                      block
                      @click="closeDialog"
                    >
                      <v-icon left>mdi-close-outline</v-icon>
                      Cerrar
                    </v-btn>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-btn
                      color="success"
                      elevation="2"
                      @click="step = 2"
                      block
                    >
                      <v-icon left>mdi-page-next-outline</v-icon>
                      <span>Continuar</span>
                    </v-btn>
                  </v-col>
                </v-row>
              </form>
            </div>
          </v-stepper-content>
          <v-stepper-content step="2">
            <!--COMPONENTE PARA AGREGAR PARTICIPANTES-->
            <div class="container-user">
              <form>
                <v-card style="padding: 5px 5px; background-color: #eaeaea">
                  <v-card-title>
                    <v-col :cols="8"> Lista de Participantes </v-col>
                    <v-col :cols="4" align="right">
                      <v-dialog
                        v-model="dialogAgregarParticipantes"
                        persistent
                        max-width="600px"
                      >
                        <v-card align="center">
                          <v-card-title>
                            <span class="headline">Datos Participante</span>
                          </v-card-title>
                          <v-card-text>
                            <template>
                              <v-list-item-avatar>
                                <v-avatar left color="#b3b3ff" size="24">
                                  <span style="font-size: 12px">R</span>
                                </v-avatar>
                              </v-list-item-avatar>
                              <v-list-item-content>
                                <v-list-item-title>
                                  Nombre: {{ participante.usuaria.residente }}
                                </v-list-item-title>
                                <v-list-item-subtitle>
                                  Nro. Documento:
                                  {{ participante.usuaria.numeroDocumento }}
                                </v-list-item-subtitle>
                              </v-list-item-content>
                            </template>

                            <v-text-field
                              label="Cooperación"
                              v-model="participante.cooperacion"
                              outlined
                              readonly
                              color="success"
                            ></v-text-field>

                            <v-text-field
                              label="Puntualidad"
                              v-model="participante.puntualidad"
                              outlined
                              readonly
                              color="success"
                            ></v-text-field>

                            <v-text-field
                              label="Aprendizaje"
                              v-model="participante.aprendizaje"
                              outlined
                              readonly
                              color="success"
                            ></v-text-field>

                            <v-text-field
                              label="Conducta"
                              v-model="participante.conducta"
                              outlined
                              readonly
                              color="success"
                            ></v-text-field>

                            <v-col cols="12" sm="12" align="center">
                              <v-img
                                :src="participante.firma"
                                max-width="250"
                                max-height="250"
                              >
                              </v-img>
                            </v-col>
                          </v-card-text>
                          <v-card-actions>
                            <v-btn
                              color="error"
                              @click="cerrarAgregarParticipantes()"
                            >
                              <v-icon left class="mr-0 icon-plan"
                                >mdi-close</v-icon
                              >
                              Cerrar
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-col>
                  </v-card-title>

                  <v-card-text style="background-color: #fafafa">
                    <v-row>
                      <v-col><h3>Nombre</h3></v-col>
                      <v-col><h3>Cooperación</h3></v-col>
                      <v-col><h3>Puntualidad</h3></v-col>
                      <v-col><h3>Aprendizaje</h3></v-col>
                      <v-col><h3>Conducta</h3></v-col>
                      <v-col><h3>Acciones</h3></v-col>
                    </v-row>
                    <div
                      v-for="(item, index) in actividad.contenido.participantes"
                      :key="index"
                    >
                      <v-row>
                        <v-col>{{ item.usuaria.residente }}</v-col>
                        <v-col>{{ item.cooperacion }}</v-col>
                        <v-col>{{ item.puntualidad }}</v-col>
                        <v-col>{{ item.aprendizaje }}</v-col>
                        <v-col>{{ item.conducta }}</v-col>
                        <v-col>
                          <v-row style="padding: 0; margin: 0">
                            <v-col style="padding: 0; margin: 0">
                              <v-btn
                                fab
                                x-small
                                dark
                                color="blue"
                                @click="modalConsultar(index)"
                              >
                                <v-icon dark> mdi-eye </v-icon>
                              </v-btn>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </div>
                  </v-card-text>
                </v-card>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-btn
                      color="warning"
                      elevation="2"
                      block
                      @click="regresar"
                    >
                      <v-icon left>mdi-arrow-left</v-icon>
                      Regresar
                    </v-btn>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-btn
                      color="error"
                      elevation="2"
                      block
                      @click="closeDialog"
                    >
                      <v-icon left>mdi-close-outline</v-icon>
                      Cerrar
                    </v-btn>
                  </v-col>
                </v-row>
              </form>
            </div>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-card>
  </v-card>
</template>

<script>
import axios from "axios";
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import moment from "moment";
moment.locale("es");

export default {
  data() {
    return {
      participante: {
        cooperacion: "",
        puntualidad: "",
        aprendizaje: "",
        conducta: "",
        usuaria: {
          residente: "",
          id: "",
          numeroDocumento: "",
        },
        firma: "",
        imgfirma: {},
      },
      step: 1,
      editable: true,
      listResidentes: [],
      residente: {
        residente: "",
        id: "",
        numeroDocumento: "",
      },
      searchResidente: null,
      loadingSearch: false,
      dialogAgregarParticipantes: false,
      accion: "registrar",
      indice: "",
      listImages: [],
      imagenfirmaParticipante: "",
    };
  },
  methods: {
    limpiar() {
      this.actividad.nombre = "";
      this.actividad.descripcion = "";
      this.actividad.contenido.fechainicio = "";
      this.actividad.contenido.fechafinal;
      this.actividad.contenido.tipo = "";
      this.actividad.contenido.participantes = [];

      this.step = 1;
    },
    fechaActual() {
      var f = new Date();
      return f.getFullYear() + "-" + (f.getMonth() + 1) + "-" + f.getDate();
    },
    closeDialog() {
      this.$emit("close-dialog");
      this.show = false;
    },
    regresar() {
      this.step = 1;
    },
    cerrarAgregarParticipantes() {
      this.dialogAgregarParticipantes = false;

      this.participante.cooperacion = "";
      this.participante.puntualidad = "";
      this.participante.aprendizaje = "";
      this.participante.conducta = "";
      this.participante.usuaria = {};
      this.participante.imgfirma = {};
      this.participante.firma = "";
    },
    modalConsultar(index) {
      this.accion = "consultar";
      this.dialogAgregarParticipantes = true;

      this.participante.cooperacion = this.actividad.contenido.participantes[
        index
      ].cooperacion;
      this.participante.puntualidad = this.actividad.contenido.participantes[
        index
      ].puntualidad;
      this.participante.aprendizaje = this.actividad.contenido.participantes[
        index
      ].aprendizaje;
      this.participante.conducta = this.actividad.contenido.participantes[
        index
      ].conducta;
      this.participante.usuaria = this.actividad.contenido.participantes[
        index
      ].usuaria;
      this.participante.imgfirma = this.actividad.contenido.participantes[
        index
      ].imgfirma;
      this.participante.firma = this.actividad.contenido.participantes[
        index
      ].firma;

      //Mostrar la imagen en el modal
    },
  },
  props: {
    actividad: {
      type: Object,
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
  },
};
</script>

<style>
.blockear-dropzone {
  pointer-events: none;
  cursor: default;
}
.esconder {
  display: none;
}
</style>