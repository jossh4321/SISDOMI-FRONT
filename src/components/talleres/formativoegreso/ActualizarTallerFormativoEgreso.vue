<template>
  <v-card>
    <v-card-title class="justify-center">Actualización de Taller formativo egreso</v-card-title>
    <v-card>
      <v-stepper v-model="step">
        <v-stepper-header>
          <v-stepper-step editable step="1">
            Datos generales de taller
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step editable step="2">
            Participantes
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step editable step="3">
            Firma
          </v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content step="1">
            <div class="container-user">
              <form style="margin-top: 10px;">
                <v-row>
                  <v-col>
                    <v-textarea
                      label="Titulo del Taller"
                      v-model.trim="taller.titulo"
                      outlined
                      color="#009900"
                      rows="1"
                      auto-grow
                      :readonly="isDisabled"
                      :error-messages="tituloErrors"
                      @input="$v.taller.titulo.$touch()"
                      @blur="$v.taller.titulo.$touch()"
                    ></v-textarea>
                  </v-col>
                  <v-col>
                    <v-textarea
                      label="Descripción del Taller"
                      v-model.trim="taller.descripcion"
                      outlined
                      color="#009900"
                      rows="1"
                      auto-grow
                      :readonly="isDisabled"
                      :error-messages="descripcionErrors"
                      @input="$v.taller.descripcion.$touch()"
                      @blur="$v.taller.descripcion.$touch()"
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
                          v-model="taller.contenido.fecharealizacion"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          color="#009900"
                          outlined
                          label="Fecha de realización del taller"
                          @input="$v.taller.contenido.fecharealizacion.$touch()"
                            @blur="$v.taller.contenido.fecharealizacion.$touch()"
                            :error-messages="fecharealizacionErrors"
                          ></v-text-field>
                      </template>
                      <v-date-picker
                          v-model="taller.contenido.fecharealizacion"
                          @input="menu1 = false"
                          locale="es-es"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col>
                    <v-select
                      :items="['mañana', 'tarde', 'noche']"
                      label="Seleccione un turno"
                      outlined
                      v-model="taller.contenido.turno"
                      :readonly="isDisabled"
                      color="#009900"
                      @input="$v.taller.contenido.turno.$touch()"
                      @blur="$v.taller.contenido.turno.$touch()"
                      :error-messages="turnoErrors"
                    ></v-select>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-textarea
                      label="Nº de sesión"
                      v-model.number="taller.contenido.nrosesion"
                      outlined
                      color="#009900"
                      rows="1"
                      auto-grow
                      :readonly="isDisabled"
                      :error-messages="nroSesionErrors"
                      @input="$v.taller.contenido.nrosesion.$touch()"
                      @blur="$v.taller.contenido.nrosesion.$touch()"
                    ></v-textarea>
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
                        <v-card style="padding:5px 5px;background-color:#EAEAEA">
                          <v-card-title>
                            <v-col :cols="8">
                              Lista de Participantes
                            </v-col>
                            <v-col :cols="4" align="right">
                              <v-btn
                                fab
                                small
                                dark
                                color="green"
                                @click="modalRegistrarParticipantes()"
                              >
                                <v-icon dark>
                                  mdi-plus
                                </v-icon>
                              </v-btn>
                              <v-dialog
                                  v-model="dialogAgregarParticipantes"
                                  persistent
                                  max-width="600px"
                                  eager
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
                                            style="margin-top:5px"
                                          >
                                            <v-avatar left color="#b3b3ff" size="24">
                                              <span style="font-size:12px">{{ data.item.residente.charAt(0) }}</span>
                                            </v-avatar>
                                            {{ data.item.residente }}
                                          </v-chip>
                                        </template>
                                        <template v-slot:item="data">
                                          <template>
                                            <v-list-item-avatar>
                                              <v-avatar left color="#b3b3ff" size="24">
                                                <span style="font-size:12px">{{ data.item.residente.charAt(0) }}</span>
                                              </v-avatar>
                                            </v-list-item-avatar>
                                            <v-list-item-content>
                                              <v-list-item-title
                                                >Nombre completo: {{ data.item.residente }}
                                                {{ data.item.apellido }}
                                              </v-list-item-title>
                                              <v-list-item-subtitle
                                                >Nro. Documento:
                                                {{ data.item.numeroDocumento }}</v-list-item-subtitle
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
                                          <span>Se muestra colaborador y cooperativo</span>
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
                                          <span>Se demora entre 5 y 10 minutos para llegar</span>
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
                                          <span>Demora más de 10 minutos en llegar y/o se retira con frecuencia</span>
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
                                          <span>Se muestra muy interesado, pregunta y asimila los conocimientos</span>
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
                                          <span>Interés fluctuante, en ocasiones pregunta y asimila conocimientos</span>
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
                                          <span>Poco o ningún interés, distraído, dificultad en asimilar conocimientos</span>
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
                                          <span>Muy buen comportamiento, respeta a los demás</span>
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
                                          <span>Conducta fluctuantes, ocasionalmente intranquilo y disperso</span>
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
                                          <span>Rebelde, irrespetuoso, desafiante y genera desorden</span>
                                        </v-tooltip>
                                      </v-radio-group>

                                      <vue-dropzone
                                        ref="myVueDropzoneParticipante"
                                        :options="dropzoneOptionsP"
                                        id="dropzoneParticipante"
                                        @vdropzone-success="registerFileParticipante"
                                        @vdropzone-removed-file="removedFileParticipante"
                                      >
                                      </vue-dropzone>
                                      <v-alert
                                        type="error"
                                        v-if="!$v.participante.imgfirma.required & accion !='consultar'"
                                        class="mt-2"
                                        >
                                        Debe ingresar una firma para el registro
                                      </v-alert>
                                    </v-card-text>
                                    <v-card-actions>
                                      <v-spacer></v-spacer>
                                      <v-btn 
                                        v-if="accion == 'registrar'"
                                        color="success" @click="guardarParticipantes()"
                                        >
                                        <v-icon left class="mr-0 icon-plan">mdi-check</v-icon>
                                        Agregar
                                      </v-btn>
                                      <v-btn
                                        v-if="accion == 'actualizar'"
                                        color="yellow" @click="actualizarParticipantes(indice)"
                                        >
                                        <v-icon left class="mr-0 icon-plan">mdi-pencil</v-icon>
                                        Actualizar
                                      </v-btn>
                                      <v-btn
                                        color="error" @click="cerrarAgregarParticipantes()"
                                      >
                                       <v-icon left class="mr-0 icon-plan">mdi-close</v-icon>
                                        Cerrar
                                      </v-btn>
                                    </v-card-actions>
                                  </v-card>
                                </v-dialog>
                            </v-col>
                          </v-card-title>

                          <v-card-text style="background-color:#FAFAFA">
                            <v-row>
                              <v-col><h3>Nombre</h3></v-col>
                              <v-col><h3>Cooperación</h3></v-col>
                              <v-col><h3>Puntualidad</h3></v-col>
                              <v-col><h3>Aprendizaje</h3></v-col>
                              <v-col><h3>Conducta</h3></v-col>
                              <v-col><h3>Acciones</h3></v-col>
                            </v-row>
                            <div
                              v-for="(item, index) in taller.contenido.participantes"
                              :key="index"
                              >
                              <v-row>
                                <v-col>{{item.usuaria.residente}}</v-col>
                                <v-col>{{item.cooperacion }}</v-col>
                                <v-col>{{item.puntualidad}}</v-col>
                                <v-col>{{item.aprendizaje}}</v-col>
                                <v-col>{{item.conducta}}</v-col>
                                <v-col>
                                  <v-row style="padding:0;margin:0">
                                    <v-col style="padding:0;margin:0">
                                      <v-btn
                                        fab
                                        x-small
                                        dark
                                        color="yellow"
                                        @click="modalActualizar(index)"
                                        >
                                        <v-icon dark>
                                          mdi-pen
                                        </v-icon>
                                      </v-btn>
                                    </v-col>
                                    <v-col style="padding:0;margin:0">
                                      <v-btn
                                        fab
                                        x-small
                                        dark
                                        color="blue"
                                        @click="modalConsultar(index)"
                                        >
                                        <v-icon dark>
                                          mdi-eye
                                        </v-icon>
                                      </v-btn>
                                    </v-col>
                                    <v-col style="padding:0;margin:0">
                                      <v-btn
                                        fab
                                        x-small
                                        dark
                                        color="red"
                                        @click="eliminarParticipantes(index)"
                                        >
                                        <v-icon dark>
                                          mdi-minus
                                        </v-icon>
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
                            v-if="$v.taller.contenido.participantes.$error"
                            >
                            Debe tener como mínimo un participante registrado
                          </h4>
                        </div>
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
                        @click="step = 3"
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
          <v-stepper-content step="3">
            <form>
              <v-row>
                <v-col cols="12" sm="12">
                  <vue-dropzone
                    ref="myVueDropzone"
                    :options="dropzoneOptions"
                    id="dropzone"
                    @vdropzone-success="registerFile"
                    @vdropzone-removed-file="removedFile"
                    @vdropzone-mounted="mounteddropzone"
                  ></vue-dropzone>
                  <v-alert
                    type="error"
                    v-if="!$v.listImages.required"
                    class="mt-2"
                  >
                    Debe ingresar una firma para el registro
                  </v-alert>
                </v-col>
                
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
                    @click="sendtaller"
                  >
                    <v-icon left>mdi-check</v-icon>
                    Finalizar
                  </v-btn>
                </v-col>
              </v-row>
            </form>
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
import { mapMutations, mapState } from "vuex";
import { required, minLength, numeric } from "vuelidate/lib/validators";

import { mapGetters } from "vuex";

function nrosesionValid(value) {
  return (value > 0);
}

export default {
  data(){
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
          imgfirma: { }
      },
      step:1,
      editable:true,
      datemenuR: false,
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
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 250,
        maxFiles: 1,
        addRemoveLinks: true,
        dictDefaultMessage: "Ingrese su firma para el registro",
        acceptedFiles: "image/*",
        headers: { "My-Awesome-Header": "header value" },
        dictRemoveFile: "Remover firma",
        dictMaxFilesExceeded: "Tamaño excedido",
      },
      dropzoneOptionsP: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 250,
        maxFiles: 1,
        addRemoveLinks: true,
        dictDefaultMessage: "Ingrese la firma del residente",
        acceptedFiles: "image/*",
        headers: { "My-Awesome-Header": "header value" },
        dictRemoveFile: "Remover firma",
        dictMaxFilesExceeded: "Tamaño excedido",
      },
      isActiveDropPart: true,
    }
  },
  watch: {
    searchResidente(value) {
      if (value == null) {
        this.residente = {
          residente: "",
          id: "",
          numeroDocumento: ""
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
        .get("/residente/all/fase/1")//NO HAY el verdadero es fase 3...TOCA USAR 1 DE PRUEBA
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
  methods:{
    ...mapMutations(["replaceTaller"]),
    limpiar(){
      this.taller.titulo="";
      this.taller.descripcion="";
      this.taller.contenido.fecharealizacion="";
      this.taller.contenido.nrosesion=0;
      this.taller.contenido.turno="";
      this.taller.contenido.participantes=[];
      this.$refs.myVueDropzone.removeAllFiles();
      this.$refs.myVueDropzoneParticipante.removeAllFiles();

      this.step = 1;
    },
    fechaActual(){
      var f = new Date();
      return f.getFullYear() + "-" + (f.getMonth() +1) + "-"+ f.getDate();
    },
    closeDialog() {
      this.$emit("close-dialog");
      this.limpiar();
      this.show = false
    },
    modalRegistrarParticipantes() {
      this.accion = "registrar";
      this.dialogAgregarParticipantes = true;
    },
    eliminarParticipantes(index) {
      this.taller.contenido.participantes.splice(index, 1);
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
      this.$refs.myVueDropzoneParticipante.removeAllFiles();
      this.isActiveDropPart = true;
      this.$refs.myVueDropzoneParticipante.$options.dictDefaultMessage = "Ingrese la firma del residente";

      this.$v.participante.$reset();
    },
    guardarParticipantes() {
      this.$v.participante.$touch();
      if(!this.$v.participante.$invalid){
        let parti = { 
         cooperacion: this.participante.cooperacion,
         puntualidad:this.participante.puntualidad,
         aprendizaje:this.participante.aprendizaje,
         conducta:this.participante.conducta,
         usuaria:this.participante.usuaria,
         imgfirma:this.participante.imgfirma
        }
        
        this.taller.contenido.participantes.push(parti);
        
        this.participante.cooperacion = "";
        this.participante.puntualidad = "";
        this.participante.aprendizaje = "";
        this.participante.conducta = "";
        this.participante.usuaria = {};
        this.participante.imgfirma = {};
        this.$refs.myVueDropzoneParticipante.removeAllFiles();

        this.dialogAgregarParticipantes = false;
        
        this.$v.participante.$reset();
      }else{
        console.log("no se guardo el participante");
      }
    },
    actualizarParticipantes(index) {
      this.$v.participante.$touch();
      if(!this.$v.participante.$invalid){
        this.taller.contenido.participantes[index].cooperacion = this.participante.cooperacion;
        this.taller.contenido.participantes[index].puntualidad = this.participante.puntualidad;
        this.taller.contenido.participantes[index].aprendizaje = this.participante.aprendizaje;
        this.taller.contenido.participantes[index].conducta = this.participante.conducta;
        this.taller.contenido.participantes[index].usuaria = this.participante.usuaria;
        this.taller.contenido.participantes[index].imgfirma = this.participante.imgfirma;

        this.participante.cooperacion = "";
        this.participante.puntualidad = "";
        this.participante.aprendizaje = "";
        this.participante.conducta = "";
        this.participante.usuaria = {};
        this.participante.imgfirma = {};
        this.$refs.myVueDropzoneParticipante.removeAllFiles();

        this.dialogAgregarParticipantes = false;

        this.$v.participante.$reset();
      }
      else{
        console.log("no se actualizo el participante");
      }
    },
    dataURItoBlob(dataURI) {
        'use strict'
        var byteString, 
            mimestring 

        if(dataURI.split(',')[0].indexOf('base64') !== -1 ) {
            byteString = atob(dataURI.split(',')[1])
        } else {
            byteString = decodeURI(dataURI.split(',')[1])
        }

        mimestring = dataURI.split(',')[0].split(':')[1].split(';')[0]

        var content = new Array();
        for (var i = 0; i < byteString.length; i++) {
            content[i] = byteString.charCodeAt(i)
        }

        return new Blob([new Uint8Array(content)], {type: mimestring});
    },
    modalActualizar(index) {
      this.accion = "actualizar";
      this.dialogAgregarParticipantes = true;
      this.participante.cooperacion = this.taller.contenido.participantes[index].cooperacion;
      this.participante.puntualidad = this.taller.contenido.participantes[index].puntualidad;
      this.participante.aprendizaje = this.taller.contenido.participantes[index].aprendizaje;
      this.participante.conducta = this.taller.contenido.participantes[index].conducta;
      this.participante.usuaria = this.taller.contenido.participantes[index].usuaria;
      this.participante.imgfirma = this.taller.contenido.participantes[index].imgfirma;
      this.participante.firma = this.taller.contenido.participantes[index].firma;

      //Mostrar la imagen en el modal
      //var dataURI = 'data:image/png;base64,' + this.participante.imgfirma;
      //var blob = this.dataURItoBlob(dataURI); 
      if(this.participante.firma === "") {
        this.$refs.myVueDropzoneParticipante.addFile(this.participante.imgfirma);
      }
      else{
        
        var file = { size: 250, name: "Firma de la residente", type: "image/jpg" };
        var url = this.participante.firma;

        this.$refs.myVueDropzoneParticipante.manuallyAddFile(file, url);
      }
      
      this.indice = index;
    },
    modalConsultar(index) {
      this.accion = "consultar";
      this.dialogAgregarParticipantes = true;

      this.participante.cooperacion = this.taller.contenido.participantes[index].cooperacion;
      this.participante.puntualidad = this.taller.contenido.participantes[index].puntualidad;
      this.participante.aprendizaje = this.taller.contenido.participantes[index].aprendizaje;
      this.participante.conducta = this.taller.contenido.participantes[index].conducta;
      this.participante.usuaria = this.taller.contenido.participantes[index].usuaria;
      this.participante.imgfirma = this.taller.contenido.participantes[index].imgfirma;
      this.participante.firma = this.taller.contenido.participantes[index].firma;
      //Mostrar la imagen en el modal
      //var dataURI = 'data:image/png;base64,' + this.participante.imagenfirma;
      //var blob = this.dataURItoBlob(dataURI);
      if(this.participante.firma === "") {
        this.$refs.myVueDropzoneParticipante.addFile(this.participante.imgfirma);
      }
      else{
        console.log(this.$refs.myVueDropzoneParticipante);
        var file = { size: 250, name: "Firma de la residente", type: "image/jpg" };
        var url = this.participante.firma;

        this.$refs.myVueDropzoneParticipante.manuallyAddFile(file, url);
      }
      /*this.listImages.push(
        this.$refs.myVueDropzoneParticipante.$refs.dropzoneElement.dropzone.files[0]
      );

      this.$refs.myVueDropzoneParticipante.addFile(this.participante.imgfirma);*/
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
    },
    removedFileParticipante(file, error, xhr) {
      //this.imagenfirmaParticipante = "";
      this.participante.imgfirma =  {};
    },
    async sendtaller() {
      this.$v.taller.$touch();

      if (this.$v.taller.$invalid) {
        this.messageSweet(
          "error",
          "Errores al intentar actualizar",
          "Se ha presentado errores en los campos para la actualización del Taller formativo de egreso",
          false
        );
      } else {
        for (var participante of this.taller.contenido.participantes) {
          if(participante.firma == "" || participante.firma == null || participante.firma == undefined){ //Si es una nueva firma
            let formData = new FormData();
            formData.append("file", participante.imgfirma);
            await axios
                .post("/Media/talleres", formData)
                .then((res) => {
                  participante.firma = res.data;
                  delete participante.imgfirma;
                })
                .catch((err) => {
                  console.error(err);
                });
          }
          else{
            delete participante.imgfirma;
          }
        }

        if(this.taller.firma.urlfirma == "" || this.taller.firma.urlfirma == null || this.taller.firma.urlfirma == undefined){
          for (let index = 0; index < this.listImages.length; index++) {
          let formData = new FormData();
          formData.append("file", this.listImages[index]);
          await axios
            .post("/Media/talleres", formData)
            .then((res) => {
              this.taller.firma.urlfirma = res.data;
              this.taller.firma.nombre = this.user.usuario;
              this.taller.firma.cargo = this.user.rol.nombre;
            })
            .catch((err) => {
              console.error(err);
            });
          }
        }

        let taller = this.taller;

        await axios
          .put("/Taller/actualizarTallerFE", taller)
          .then((res) => {
            this.replaceTaller(res.data);

            this.messageSweet(
              "success",
              "Actualización del Taller formativo de egreso",
              "Se actualizó el Taller formativo de egreso de manera satisfactoria",
              true
            );
          })
          .catch((err) => {
            console.error(err);
          });
      }
    },
    mounteddropzone() {
      var file = { size: 250, name: "Firma del trabajador", type: "image/jpg" };
      var url = this.taller.firma.urlfirma;
      this.$refs.myVueDropzone.manuallyAddFile(file, url);
      this.listImages.push(
        this.$refs.myVueDropzone.$refs.dropzoneElement.dropzone.files[0]
      );
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
  props: {
    taller: {
      type: Object,
    },
  },
  async created(){ //solo para que se sepa que tiene algo
      for (var participante of this.taller.contenido.participantes) {
        const response = await fetch(participante.firma,
            { method: 'GET',
            mode: 'no-cors'
            });
        const blob = await response.blob();
        const file = new File([blob], 'image/jpg', {type: "image/jpg"});    
        participante.imgfirma = file;
      }

      //inicializar la lista de residentes
    await axios
        .get("/residente/all/fase/1")//deberia ser fase 2 pasa a 1 para probar
        .then((res) => {
          let residentesMap = res.data.map(function (res) {
            return {
              residente: res.nombre + " " + res.apellido,
              id: res.id,
              numeroDocumento: res.tipoDocumento + ": " + res.numeroDocumento,
            };
          });
          this.listResidentes = residentesMap;
        })
        .catch((error) => {
          console.error(error);
        });
  },
  computed:{
    ...mapState(["talleres"]),
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
    validDropParticipante: function (){
      return {
        'blockear-dropzone': !this.isActiveDropPart,
      }
    },
    mostrarTextInicial: function (){
      return {
        'esconder': !this.isActiveDropPart,
      }
    },
    isDisabled() {
      if (this.accion == "consultar") {
        return true;
      } else {
        return false;
      }
    },
    //validaciones
    tituloErrors() {
      const errors = [];

      if (!this.$v.taller.titulo.$dirty) {
        return errors;
      }

      if (!this.$v.taller.titulo.required) {
        errors.push("El titulo es requerido");
      }

      if (!this.$v.taller.titulo.minLength) {
        errors.push("Debe ingresar como mínimo 10 caracteres");
      }

      return errors;
    },
    descripcionErrors() {
      const errors = [];

      if (!this.$v.taller.descripcion.$dirty) {
        return errors;
      }

      if (!this.$v.taller.descripcion.required) {
        errors.push("La descripción es requerida");
      }

      if (!this.$v.taller.descripcion.minLength) {
        errors.push("Debe ingresar como mínimo 10 caracteres");
      }

      return errors;
    },
    fecharealizacionErrors() {
      const errors = [];

      if (!this.$v.taller.contenido.fecharealizacion.$dirty) return errors;

      !this.$v.taller.contenido.fecharealizacion.required && errors.push("Debe Ingresar la fecha en la cual se realizó el taller obligatoriamente");

      return errors;
    },
    turnoErrors() {
      const errors = [];

      if (!this.$v.taller.contenido.turno.$dirty) {
        return errors;
      }

      if (!this.$v.taller.contenido.turno.required) {
        errors.push("Debe ingresar el turno obligatoriamente");
      }

      return errors;
    },
    nroSesionErrors() {
      const errors = [];

      if (!this.$v.taller.contenido.nrosesion.$dirty) {
        return errors;
      }

      if (!this.$v.taller.contenido.nrosesion.required) {
        errors.push("Debe ingresar el n° de sesión obligatoriamente");
      }

      !this.$v.taller.contenido.nrosesion.numeric &&
        errors.push(
          "Debe Ingresar valores Numericos"
        );
      !this.$v.taller.contenido.nrosesion.nrosesionValid &&
        errors.push(
          "El n° de sesión debe ser mayor a 0"
        );

      return errors;
    },
    errorCooperacion() {
      const errors = [];

      if (!this.$v.participante.cooperacion.$dirty) return errors;

      !this.$v.participante.cooperacion.required && errors.push("Debe seleccionar una opción");
      
      return errors;
    },
    errorPuntualidad() {
      const errors = [];

      if (!this.$v.participante.puntualidad.$dirty) return errors;

      !this.$v.participante.puntualidad.required && errors.push("Debe seleccionar una opción");
      
      return errors;
    },
    errorAprendizaje() {
      const errors = [];

      if (!this.$v.participante.aprendizaje.$dirty) return errors;

      !this.$v.participante.aprendizaje.required && errors.push("Debe seleccionar una opción");
      
      return errors;
    },
    errorConducta() {
      const errors = [];

      if (!this.$v.participante.conducta.$dirty) return errors;

      !this.$v.participante.conducta.required && errors.push("Debe seleccionar una opción");
      
      return errors;
    },
    errorResidente() {
      const errors = [];
      if (!this.$v.participante.usuaria.$dirty) return errors;
      !this.$v.participante.usuaria.required && errors.push("Debe ingresar un residente obligatoriamente");
      
      return errors;
    },
  },
  validations: {
    listImages: {
      required,
    },
    taller:{
        titulo: {
          required,
          minLength: minLength(10),
        },
        descripcion: {
          required,
          minLength: minLength(10),
        },
        contenido:{
          fecharealizacion:{
            required,
          },
          turno:{
            required,
          },
          nrosesion:{
            required,
            numeric,
            nrosesionValid
          },
          participantes:{
            required
          }
        },
      },
      participante: {
          cooperacion: { required },
          puntualidad: { required },
          aprendizaje: { required },
          conducta: { required },
          usuaria: { required },
          imgfirma: { required }
      }
  },
  components: {
    vueDropzone: vue2Dropzone
  },
}
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