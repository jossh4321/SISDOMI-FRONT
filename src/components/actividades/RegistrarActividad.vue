<template>
  <v-card>
    <v-card-title class="justify-center">Registro de Actividad</v-card-title>
    <v-card>
      <v-stepper v-model="step">
        <v-stepper-header>
          <v-stepper-step editable step="1">
            Datos Generales de Actividad
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
                    <v-textarea
                      label="Titulo del Actividad"
                      v-model.trim="actividad.nombre"
                      outlined
                      color="#009900"
                      rows="1"
                      auto-grow
                      :readonly="isDisabled"
                      :error-messages="nombreErrors"
                      @input="$v.actividad.nombre.$touch()"
                      @blur="$v.actividad.nombre.$touch()"
                    ></v-textarea>
                  </v-col>
                  <v-col>
                    <v-textarea
                      label="Descripción del Actividad"
                      v-model.trim="actividad.descripcion"
                      outlined
                      color="#009900"
                      rows="1"
                      auto-grow
                      :readonly="isDisabled"
                      :error-messages="descripcionErrors"
                      @input="$v.actividad.descripcion.$touch()"
                      @blur="$v.actividad.descripcion.$touch()"
                    ></v-textarea>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <v-menu
                      v-model="datemenuR"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="actividad.contenido.fechainicio"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          color="#009900"
                          outlined
                          label="Fecha de inicio del actividad"
                          @input="$v.actividad.contenido.fechainicio.$touch()"
                          @blur="$v.actividad.contenido.fechainicio.$touch()"
                          :error-messages="fechainicioErrors"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="actividad.contenido.fechainicio"
                        @input="menu1 = false"
                        locale="es-es"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col>
                    <v-select
                      :items="['Programa', 'Taller', 'Charla']"
                      label="Seleccione un tipo de actividad"
                      outlined
                      v-model="actividad.tipo"
                      :readonly="isDisabled"
                      color="#009900"
                      @input="$v.actividad.tipo.$touch()"
                      @blur="$v.actividad.tipo.$touch()"
                      :error-messages="tipoErrors"
                    ></v-select>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <v-menu
                      v-model="datemenuR2"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="actividad.contenido.fechafin"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          color="#009900"
                          outlined
                          label="Fecha de fin del taller"
                          @input="$v.actividad.contenido.fechafin.$touch()"
                          @blur="$v.actividad.contenido.fechafin.$touch()"
                          :error-messages="fechafinErrors"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="actividad.contenido.fechafin"
                        @input="menu1 = false"
                        locale="es-es"
                      ></v-date-picker>
                    </v-menu>
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
                      <v-btn
                        fab
                        small
                        dark
                        color="green"
                        @click="modalRegistrarParticipantes()"
                      >
                        <v-icon dark> mdi-plus </v-icon>
                      </v-btn>
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
                            <v-autocomplete
                              :items="listResidentes"
                              v-model="participante.usuaria"
                              :search-input.sync="searchResidente"
                              filled
                              chips
                              outlined
                              color="#009900"
                              label="Residente participante"
                              item-text="residente"
                              return-object
                              @input="$v.participante.usuaria.$touch()"
                              @blur="$v.participante.usuaria.$touch()"
                              :error-messages="errorResidente"
                              :readonly="isDisabled"
                            >
                              <template v-slot:selection="data">
                                <v-chip
                                  v-bind="data.attrs"
                                  :input-value="data.selected"
                                  style="margin-top: 5px"
                                >
                                  <v-avatar left color="#b3b3ff" size="24">
                                    <span style="font-size: 12px">{{
                                      data.item.residente.charAt(0)
                                    }}</span>
                                  </v-avatar>
                                  {{ data.item.residente }}
                                </v-chip>
                              </template>
                              <template v-slot:item="data">
                                <template>
                                  <v-list-item-avatar>
                                    <v-avatar left color="#b3b3ff" size="24">
                                      <span style="font-size: 12px">{{
                                        data.item.residente.charAt(0)
                                      }}</span>
                                    </v-avatar>
                                  </v-list-item-avatar>
                                  <v-list-item-content>
                                    <v-list-item-title
                                      >Nombre completo:
                                      {{ data.item.residente }}
                                      {{ data.item.apellido }}
                                    </v-list-item-title>
                                    <v-list-item-subtitle
                                      >Nro. Documento:
                                      {{
                                        data.item.numeroDocumento
                                      }}</v-list-item-subtitle
                                    >
                                  </v-list-item-content>
                                </template>
                              </template>
                            </v-autocomplete>

                            <v-radio-group
                              v-model="participante.cooperacion"
                              row
                              :readonly="isDisabled"
                              @input="$v.participante.cooperacion.$touch()"
                              @blur="$v.participante.cooperacion.$touch()"
                              :error-messages="errorCooperacion"
                            >
                              <template v-slot:label class="mr-25">
                                <div>Cooperación</div>
                              </template>

                              <v-tooltip top>
                                <template v-slot:activator="{ on }">
                                  <v-radio
                                    label="A"
                                    color="green"
                                    value="A"
                                    class="mr-5"
                                    v-on="on"
                                  ></v-radio>
                                </template>
                                <span
                                  >Se muestra colaborador y cooperativo</span
                                >
                              </v-tooltip>

                              <v-tooltip top>
                                <template v-slot:activator="{ on }">
                                  <v-radio
                                    label="B"
                                    color="indigo"
                                    value="B"
                                    class="mr-5"
                                    v-on="on"
                                  ></v-radio>
                                </template>
                                <span>Colaboradora bajo presión</span>
                              </v-tooltip>

                              <v-tooltip top>
                                <template v-slot:activator="{ on }">
                                  <v-radio
                                    label="C"
                                    color="error"
                                    value="C"
                                    v-on="on"
                                  ></v-radio>
                                </template>
                                <span>No colabora, no apoya a los demás</span>
                              </v-tooltip>
                            </v-radio-group>

                            <v-radio-group
                              v-model="participante.puntualidad"
                              row
                              :readonly="isDisabled"
                              @input="$v.participante.puntualidad.$touch()"
                              @blur="$v.participante.puntualidad.$touch()"
                              :error-messages="errorPuntualidad"
                            >
                              <template v-slot:label class="mr-25">
                                <div>Puntualidad</div>
                              </template>
                              <v-tooltip top>
                                <template v-slot:activator="{ on }">
                                  <v-radio
                                    label="A"
                                    color="green"
                                    value="A"
                                    class="mr-5"
                                    v-on="on"
                                  ></v-radio>
                                </template>
                                <span>Asiste puntualmente</span>
                              </v-tooltip>

                              <v-tooltip top>
                                <template v-slot:activator="{ on }">
                                  <v-radio
                                    label="B"
                                    color="indigo"
                                    value="B"
                                    class="mr-5"
                                    v-on="on"
                                  ></v-radio>
                                </template>
                                <span
                                  >Se demora entre 5 y 10 minutos para
                                  llegar</span
                                >
                              </v-tooltip>

                              <v-tooltip top>
                                <template v-slot:activator="{ on }">
                                  <v-radio
                                    label="C"
                                    color="error"
                                    value="C"
                                    v-on="on"
                                  ></v-radio>
                                </template>
                                <span
                                  >Demora más de 10 minutos en llegar y/o se
                                  retira con frecuencia</span
                                >
                              </v-tooltip>
                            </v-radio-group>

                            <v-radio-group
                              v-model="participante.aprendizaje"
                              row
                              :readonly="isDisabled"
                              @input="$v.participante.aprendizaje.$touch()"
                              @blur="$v.participante.aprendizaje.$touch()"
                              :error-messages="errorAprendizaje"
                            >
                              <template v-slot:label class="mr-25">
                                <div>Aprendizaje</div>
                              </template>
                              <v-tooltip top>
                                <template v-slot:activator="{ on }">
                                  <v-radio
                                    label="A"
                                    color="green"
                                    value="A"
                                    class="mr-5"
                                    v-on="on"
                                  ></v-radio>
                                </template>
                                <span
                                  >Se muestra muy interesado, pregunta y asimila
                                  los conocimientos</span
                                >
                              </v-tooltip>

                              <v-tooltip top>
                                <template v-slot:activator="{ on }">
                                  <v-radio
                                    label="B"
                                    color="indigo"
                                    value="B"
                                    class="mr-5"
                                    v-on="on"
                                  ></v-radio>
                                </template>
                                <span
                                  >Interés fluctuante, en ocasiones pregunta y
                                  asimila conocimientos</span
                                >
                              </v-tooltip>

                              <v-tooltip top>
                                <template v-slot:activator="{ on }">
                                  <v-radio
                                    label="C"
                                    color="error"
                                    value="C"
                                    v-on="on"
                                  ></v-radio>
                                </template>
                                <span
                                  >Poco o ningún interés, distraído, dificultad
                                  en asimilar conocimientos</span
                                >
                              </v-tooltip>
                            </v-radio-group>

                            <v-radio-group
                              v-model="participante.conducta"
                              row
                              :readonly="isDisabled"
                              @input="$v.participante.conducta.$touch()"
                              @blur="$v.participante.conducta.$touch()"
                              :error-messages="errorConducta"
                            >
                              <template v-slot:label class="mr-25">
                                <div>Conducta</div>
                              </template>
                              <v-tooltip top>
                                <template v-slot:activator="{ on }">
                                  <v-radio
                                    label="A"
                                    color="green"
                                    value="A"
                                    class="mr-5"
                                    v-on="on"
                                  ></v-radio>
                                </template>
                                <span
                                  >Muy buen comportamiento, respeta a los
                                  demás</span
                                >
                              </v-tooltip>

                              <v-tooltip top>
                                <template v-slot:activator="{ on }">
                                  <v-radio
                                    label="B"
                                    color="indigo"
                                    value="B"
                                    class="mr-5"
                                    v-on="on"
                                  ></v-radio>
                                </template>
                                <span
                                  >Conducta fluctuantes, ocasionalmente
                                  intranquilo y disperso</span
                                >
                              </v-tooltip>

                              <v-tooltip top>
                                <template v-slot:activator="{ on }">
                                  <v-radio
                                    label="C"
                                    color="error"
                                    value="C"
                                    v-on="on"
                                  ></v-radio>
                                </template>
                                <span
                                  >Rebelde, irrespetuoso, desafiante y genera
                                  desorden</span
                                >
                              </v-tooltip>
                            </v-radio-group>

                            <vue-dropzone
                              ref="myVueDropzoneParticipante"
                              :options="dropzoneOptionsP"
                              id="dropzoneParticipante"
                              v-bind:class="validDropParticipante"
                              @vdropzone-success="registerFileParticipante"
                              @vdropzone-removed-file="removedFileParticipante"
                            >
                              <div
                                v-bind:class="[
                                  'dz-message',
                                  mostrarTextInicial,
                                ]"
                                data-dz-message
                              >
                                <span>Ingrese la firma del residente</span>
                              </div>
                            </vue-dropzone>
                            <v-alert
                              type="error"
                              v-if="!$v.participante.imgfirma.required"
                              class="mt-2"
                            >
                              Debe ingresar una firma para el registro
                            </v-alert>
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              v-if="accion == 'registrar'"
                              color="success"
                              @click="guardarParticipantes()"
                            >
                              <v-icon left class="mr-0 icon-plan"
                                >mdi-check</v-icon
                              >
                              Agregar
                            </v-btn>
                            <v-btn
                              v-if="accion == 'actualizar'"
                              color="yellow"
                              @click="actualizarParticipantes(indice)"
                            >
                              <v-icon left class="mr-0 icon-plan"
                                >mdi-pencil</v-icon
                              >
                              Actualizar
                            </v-btn>
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
                                color="yellow"
                                @click="modalActualizar(index)"
                              >
                                <v-icon dark> mdi-pen </v-icon>
                              </v-btn>
                            </v-col>
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
                            <v-col style="padding: 0; margin: 0">
                              <v-btn
                                fab
                                x-small
                                dark
                                color="red"
                                @click="eliminarParticipantes(index)"
                              >
                                <v-icon dark> mdi-minus </v-icon>
                              </v-btn>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </div>
                  </v-card-text>
                </v-card>
                <div>
                  <h4
                    class="red--text mt-5 mb-10"
                    v-if="$v.actividad.contenido.participantes.$error"
                  >
                    Debe tener como mínimo un participante registrado
                  </h4>
                </div>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-btn
                      color="error"
                      elevation="2"
                      @click="closeDialog"
                      width="100%"
                    >
                      <v-icon left>mdi-close-outline</v-icon>
                      Cerrar
                    </v-btn>
                  </v-col>

                  <v-col cols="12" sm="6" md="6">
                    <v-btn
                      color="success"
                      elevation="2"
                      width="100%"
                      @click="sendActividad"
                    >
                      <v-icon left>mdi-check</v-icon>
                      Finalizar
                    </v-btn>
                  </v-col>
                </v-row>
              </form>
            </div>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-card>
    <v-dialog width="450px" v-model="cargaRegistro" persistent>
      <v-card height="300px">
        <v-card-title class="justify-center">Registrando Actividad</v-card-title>
        <div>
          <v-progress-circular
            style="display: block; margin: 40px auto"
            :size="90"
            :width="9"
            color="purple"
            indeterminate
          ></v-progress-circular>
        </div>
        <v-card-subtitle
          class="justify-center"
          style="font-weight: bold; text-align: center"
          >En unos momentos finalizaremos...</v-card-subtitle
        >
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import axios from "axios";
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import { mapMutations, mapState } from "vuex";
import { required, minLength, numeric } from "vuelidate/lib/validators";

import { mapGetters } from "vuex";

function fechaFvalid2(value) {
  return !(this.$moment(value) > this.$moment());
}

function fechaFvalid3(value,value2) {
  return !(this.$moment(value) >= this.$moment(value2));
}

export default {
  data() {
    return {
      actividad: {
        idcreador: "",
        tipo: "",
        fechacreacion: new Date(),
        nombre: "",
        descripcion: "",
        contenido: {
          fechafin: "",
          fechainicio: "",
          participantes: [],
        },
      },
      participante: {
        cooperacion: "",
        puntualidad: "",
        aprendizaje: "",
        conducta: "",
        usuaria: {
          residente: "",
          numeroDocumento: "",
        },
        firma: "",
        imgfirma: {},
      },
      step: 1,
      editable: true,
      datemenuR: false,
      datemenuR2: false,
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
      dropzoneOptionsP: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 250,
        maxFiles: 1,
        addRemoveLinks: true,
        //dictDefaultMessage: "Ingrese la firma del residente",
        acceptedFiles: "image/*",
        headers: { "My-Awesome-Header": "header value" },
        dictRemoveFile: "Remover firma",
        dictMaxFilesExceeded: "Tamaño excedido",
      },
      isActiveDropPart: true,
      cargaRegistro: false
    };
  },
  watch: {
    searchResidente(value) {
      if (value == null) {
        this.residente = {
          residente: "",
          id: "",
          numeroDocumento: "",
        };
      }

      if (this.listResidentes.length > 0) {
        return;
      }
      if (this.loadingSearch) {
        return;
      }

      this.loadingSearch = true;

      axios
        .get("/residente/all") //NO HAY...TOCA USAR 1 DE PRUEBA
        .then((res) => {
          let residentesMap = res.data.map(function (res) {
            return {
              residente: res.nombre + " " + res.apellido,
              id: res.id,
              numeroDocumento: res.tipoDocumento + ": " + res.numeroDocumento,
            };
          });

          this.listResidentes = residentesMap;

          this.loadingSearch = false;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  methods: {
    limpiar() {
      this.actividad.nombre = "";
      this.actividad.descripcion = "";
      this.actividad.contenido.fechainicio = "";
      this.actividad.contenido.fechafin = 0;
      this.actividad.tipo = "";
      this.actividad.contenido.participantes = [];
      this.$refs.myVueDropzone.removeAllFiles();
      this.$refs.myVueDropzoneParticipante.removeAllFiles();

      this.step = 1;
    },
    fechaActual() {
      var f = new Date();
      return f.getFullYear() + "-" + (f.getMonth() + 1) + "-" + f.getDate();
    },
    closeDialog() {
      this.$emit("close-dialog");
      this.limpiar();
      this.show = false;
    },
    modalRegistrarParticipantes() {
      this.accion = "registrar";
      this.dialogAgregarParticipantes = true;
    },
    eliminarParticipantes(index) {
      this.actividad.contenido.participantes.splice(index, 1);
    },
    cerrarAgregarParticipantes() {
      this.dialogAgregarParticipantes = false;

      this.participante.cooperacion = "";
      this.participante.puntualidad = "";
      this.participante.aprendizaje = "";
      this.participante.conducta = "";
      this.participante.usuaria = {};
      this.participante.imgfirma = {};
      this.$refs.myVueDropzoneParticipante.removeAllFiles();
      this.isActiveDropPart = true;
      this.$refs.myVueDropzoneParticipante.$options.dictDefaultMessage =
        "Ingrese la firma del residente";

      this.$v.participante.$reset();
    },
    guardarParticipantes() {
      this.$v.participante.$touch();
      if (!this.$v.participante.$invalid) {
        let parti = {
          cooperacion: this.participante.cooperacion,
          puntualidad: this.participante.puntualidad,
          aprendizaje: this.participante.aprendizaje,
          conducta: this.participante.conducta,
          usuaria: this.participante.usuaria,
          imgfirma: this.participante.imgfirma,
        };

        this.actividad.contenido.participantes.push(parti);

        this.participante.cooperacion = "";
        this.participante.puntualidad = "";
        this.participante.aprendizaje = "";
        this.participante.conducta = "";
        this.participante.usuaria = {};
        this.participante.imgfirma = {};
        this.$refs.myVueDropzoneParticipante.removeAllFiles();

        this.dialogAgregarParticipantes = false;

        this.$v.participante.$reset();
      } else {
        console.log("no se guardo el participante");
      }
    },
    actualizarParticipantes(index) {
      this.$v.participante.$touch();
      if (!this.$v.participante.$invalid) {
        this.actividad.contenido.participantes[
          index
        ].cooperacion = this.participante.cooperacion;
        this.actividad.contenido.participantes[
          index
        ].puntualidad = this.participante.puntualidad;
        this.actividad.contenido.participantes[
          index
        ].aprendizaje = this.participante.aprendizaje;
        this.actividad.contenido.participantes[
          index
        ].conducta = this.participante.conducta;
        this.actividad.contenido.participantes[
          index
        ].usuaria = this.participante.usuaria;
        this.actividad.contenido.participantes[
          index
        ].imgfirma = this.participante.imgfirma;

        this.participante.cooperacion = "";
        this.participante.puntualidad = "";
        this.participante.aprendizaje = "";
        this.participante.conducta = "";
        this.participante.usuaria = {};
        this.participante.imgfirma = {};
        this.$refs.myVueDropzoneParticipante.removeAllFiles();

        this.dialogAgregarParticipantes = false;

        this.$v.participante.$reset();
      } else {
        console.log("no se actualizo el participante");
      }
    },
    dataURItoBlob(dataURI) {
      "use strict";
      var byteString, mimestring;

      if (dataURI.split(",")[0].indexOf("base64") !== -1) {
        byteString = atob(dataURI.split(",")[1]);
      } else {
        byteString = decodeURI(dataURI.split(",")[1]);
      }

      mimestring = dataURI.split(",")[0].split(":")[1].split(";")[0];

      var content = new Array();
      for (var i = 0; i < byteString.length; i++) {
        content[i] = byteString.charCodeAt(i);
      }

      return new Blob([new Uint8Array(content)], { type: mimestring });
    },
    modalActualizar(index) {
      this.accion = "actualizar";
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

      //Mostrar la imagen en el modal
      //var dataURI = 'data:image/png;base64,' + this.participante.imgfirma;
      //var blob = this.dataURItoBlob(dataURI);
      this.$refs.myVueDropzoneParticipante.addFile(this.participante.imgfirma);

      this.indice = index;
    },
    modalConsultar(index) {
      this.accion = "consultar";
      this.$refs.myVueDropzoneParticipante.$options.dictDefaultMessage = "";
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

      //Mostrar la imagen en el modal
      //var dataURI = 'data:image/png;base64,' + this.participante.imagenfirma;
      //var blob = this.dataURItoBlob(dataURI);
      this.$refs.myVueDropzoneParticipante.addFile(this.participante.imgfirma);
      //bloquear el dropzone

      this.isActiveDropPart = false;
    },
    registerFile(file, response) {
      this.listImages.push(file);
    },
    removedFile(file, error, xhr) {
      let indexFile = this.listImages.findIndex((image) => image == file);

      if (indexFile != -1) {
        this.listImages.splice(indexFile, 1);
      }
    },
    registerFileParticipante(file, response) {
      //this.imagenfirmaParticipante = file.dataURL.split(",")[1];
      this.participante.imgfirma = file;
      console.log(this.participante.imgfirma);
    },
    removedFileParticipante(file, error, xhr) {
      //this.imagenfirmaParticipante = "";
      this.participante.imgfirma = {};
    },
    async sendActividad() {
      this.$v.actividad.$touch();

      if (this.$v.actividad.$invalid) {
        this.messageSweet(
          "error",
          "Errores al intentar registrar",
          "Se ha presentado errores en los campos para el registro de la actividad",
          false
        );
      } else {
        this.cargaRegistro = true;
        for (var participante of this.actividad.contenido.participantes) {
          let formData = new FormData();
          formData.append("file", participante.imgfirma);
          await axios
            .post("/Media/actividades", formData)
            .then((res) => {
              //colocamos la url de la firma en el objeto por cada participante
              participante.firma = res.data;
              //quitamos el atributo imgfirma del obj
              delete participante.imgfirma;
            })
            .catch((err) => {
              console.error(err);
            });
        }

        this.actividad.idcreador = this.user.id;

        let actividad = this.actividad;

        axios
          .post("/Actividad", actividad)
          .then((res) => {
            this.cargaRegistro = false;
            this.messageSweet(
              "success",
              "Registro del Actividad",
              "Se registró la actividad de manera satisfactoria",
              true
            );
          })
          .catch((err) => {
            console.error(err);
          });
      }
    },
    messageSweet(icon, title, text, valid) {
      this.$swal({
        icon: icon,
        title: title,
        text: text,
      }).then((res) => {
        if (valid) {
          this.closeDialog();
          this.$emit("register-complete");
        }
      });
    },
  },
  computed: {
    ...mapGetters(["user"]),
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
    validDropParticipante: function () {
      return {
        "blockear-dropzone": !this.isActiveDropPart,
      };
    },
    mostrarTextInicial: function () {
      return {
        esconder: !this.isActiveDropPart,
      };
    },
    isDisabled() {
      if (this.accion == "consultar") {
        return true;
      } else {
        return false;
      }
    },
    //validaciones
    nombreErrors() {
      const errors = [];

      if (!this.$v.actividad.nombre.$dirty) {
        return errors;
      }

      if (!this.$v.actividad.nombre.required) {
        errors.push("El titulo es requerido");
      }

      if (!this.$v.actividad.nombre.minLength) {
        errors.push("Debe ingresar como mínimo 10 caracteres");
      }

      return errors;
    },
    descripcionErrors() {
      const errors = [];

      if (!this.$v.actividad.descripcion.$dirty) {
        return errors;
      }

      if (!this.$v.actividad.descripcion.required) {
        errors.push("La descripción es requerida");
      }

      if (!this.$v.actividad.descripcion.minLength) {
        errors.push("Debe ingresar como mínimo 10 caracteres");
      }

      return errors;
    },
    fechainicioErrors() {
      const errors = [];

      if (!this.$v.actividad.contenido.fechainicio.$dirty) return errors;

      !this.$v.actividad.contenido.fechainicio.required &&
        errors.push(
          "Debe Ingresar la fecha en la cual se realizó la actividad obligatoriamente"
        );

      !this.$v.actividad.contenido.fechainicio.fechaFvalid2 &&
        errors.push("La fecha de inicio debe ser antes del día de hoy");

      return errors;
    },
    tipoErrors() {
      const errors = [];

      if (!this.$v.actividad.tipo.$dirty) {
        return errors;
      }

      if (!this.$v.actividad.tipo.required) {
        errors.push("Debe ingresar el tipo obligatoriamente");
      }

      return errors;
    },
    fechafinErrors() {
      const errors = [];

      if (!this.$v.actividad.contenido.fechafin.$dirty) return errors;

      !this.$v.actividad.contenido.fechafin.required &&
        errors.push(
          "Debe Ingresar la fecha en la cual se realizó la actividad obligatoriamente"
        );

      !this.$v.actividad.contenido.fechafin.fechaFvalid2 &&
        errors.push("La fecha de terminación debe ser antes del día de hoy");

      return errors;
    },
    errorCooperacion() {
      const errors = [];

      if (!this.$v.participante.cooperacion.$dirty) return errors;

      !this.$v.participante.cooperacion.required &&
        errors.push("Debe seleccionar una opción");

      return errors;
    },
    errorPuntualidad() {
      const errors = [];

      if (!this.$v.participante.puntualidad.$dirty) return errors;

      !this.$v.participante.puntualidad.required &&
        errors.push("Debe seleccionar una opción");

      return errors;
    },
    errorAprendizaje() {
      const errors = [];

      if (!this.$v.participante.aprendizaje.$dirty) return errors;

      !this.$v.participante.aprendizaje.required &&
        errors.push("Debe seleccionar una opción");

      return errors;
    },
    errorConducta() {
      const errors = [];

      if (!this.$v.participante.conducta.$dirty) return errors;

      !this.$v.participante.conducta.required &&
        errors.push("Debe seleccionar una opción");

      return errors;
    },
    errorResidente() {
      const errors = [];
      if (!this.$v.participante.usuaria.$dirty) return errors;
      !this.$v.participante.usuaria.required &&
        errors.push("Debe ingresar un residente obligatoriamente");

      return errors;
    },
  },
  validations: {
    listImages: {
      required,
    },
    actividad: {
      nombre: {
        required,
        minLength: minLength(10),
      },
      tipo: {
        required,
      },
      descripcion: {
        required,
        minLength: minLength(10),
      },
      contenido: {
        fechainicio: {
          required,
          fechaFvalid2,
        },
        fechafin: {
          required,
          fechaFvalid2,
        },
        participantes: {
          required,
        },
      },
    },
    participante: {
      cooperacion: { required },
      puntualidad: { required },
      aprendizaje: { required },
      conducta: { required },
      usuaria: { required },
      imgfirma: { required },
    },
  },
  components: {
    vueDropzone: vue2Dropzone,
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