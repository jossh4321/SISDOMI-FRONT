<template>
  <v-card>
    <v-card-title class="justify-center">Registro de Taller de escuela para padres</v-card-title>
    <v-card>
      <v-stepper v-model="step">
        <v-stepper-header>
          <v-stepper-step editable step="1">
            Datos generales de taller
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step editable step="2">
            Tutores
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
                      v-model.trim="tallerescuelapadres.titulo"
                      outlined
                      color="#009900"
                      rows="1"
                      auto-grow
                      :readonly="isDisabled"
                      :error-messages="tituloErrors"
                      @input="$v.tallerescuelapadres.titulo.$touch()"
                      @blur="$v.tallerescuelapadres.titulo.$touch()"
                    ></v-textarea>
                  </v-col>
                  <v-col>
                    <v-textarea
                      label="Descripción del Taller"
                      v-model="tallerescuelapadres.descripcion"
                      outlined
                      color="#009900"
                      rows="1"
                      auto-grow
                      :readonly="isDisabled"
                      :error-messages="descripcionErrors"
                      @input="$v.tallerescuelapadres.descripcion.$touch()"
                      @blur="$v.tallerescuelapadres.descripcion.$touch()"
                    ></v-textarea>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <v-menu
                      v-model="datemenuinicio"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                      >
                      <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                          v-model="tallerescuelapadres.contenido.fechaInicio"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          color="#009900"
                          outlined
                          label="Fecha del inicio del taller"
                          @input="$v.tallerescuelapadres.contenido.fechaInicio.$touch()"
                            @blur="$v.tallerescuelapadres.contenido.fechaInicio.$touch()"
                            :error-messages="fechainicioErrors"
                          ></v-text-field>
                      </template>
                      <v-date-picker
                          v-model="tallerescuelapadres.contenido.fechaInicio"
                          @input="menu1 = false"
                          locale="es-es"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col>
                    <v-menu
                        v-model="datemenufin"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                        >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                            v-model="tallerescuelapadres.contenido.fechaFin"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            color="#009900"
                            outlined
                            label="Fecha fin del taller"
                            @input="$v.tallerescuelapadres.contenido.fechaFin.$touch()"
                            @blur="$v.tallerescuelapadres.contenido.fechaFin.$touch()"
                            :error-messages="fechafinErrors"
                            ></v-text-field>
                        </template>
                        <v-date-picker
                            v-model="tallerescuelapadres.contenido.fechaFin"
                            @input="menu2 = false"
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
            <!--COMPONENTE PARA AGREGAR TUTORES-->
            <div class="container-user">
                <form>
                        <!--Lista de Tutores-->
                        <v-card style="padding:5px 5px;background-color:#EAEAEA">
                          <v-card-title>
                            <v-col :cols="8">
                              Lista de Tutores
                            </v-col>
                            <v-col :cols="4" align="right">
                              <v-btn
                                fab
                                small
                                dark
                                color="green"
                                @click="modalRegistrarTutores()"
                              >
                                <v-icon dark>
                                  mdi-plus
                                </v-icon>
                              </v-btn>
                              <v-dialog
                                  v-model="dialogAgregarTutores"
                                  persistent
                                  max-width="600px"
                                >
                                  <v-card align="center">
                                    <v-card-title>
                                      <span class="headline">Datos Tutores</span>
                                    </v-card-title>
                                    <v-card-text>
                                      <v-textarea
                                        label="Nombres y apellidos del tutor"
                                        v-model="tutor.nombre"
                                        outlined
                                        color="#009900"
                                        rows="1"
                                        auto-grow
                                        :readonly="isDisabled"
                                        @input="$v.tutor.nombre.$touch()"
                                        @blur="$v.tutor.nombre.$touch()"
                                        :error-messages="tutornombreErrors"
                                      ></v-textarea>
                                      
                                      <v-row>
                                        <v-col>
                                          <v-select
                                            :items="['DNI', 'Pasaporte', 'Carnet Extranjeria']"
                                            label="Ingrese el Tipo de Documento"
                                            dense
                                            outlined
                                            v-model="tutor.tipoDocumento"
                                            :readonly="isDisabled"
                                            color="#009900"
                                            @input="$v.tutor.tipoDocumento.$touch()"
                                            @blur="$v.tutor.tipoDocumento.$touch()"
                                            :error-messages="tipoDocumentoErrors"
                                          ></v-select>
                                        </v-col>
                                        <v-col>
                                          <v-textarea
                                            label=" N° documento"
                                            v-model="tutor.numeroDocumento"
                                            outlined
                                            color="#009900"
                                            rows="1"
                                            auto-grow
                                            :readonly="isDisabled"
                                            @input="$v.tutor.numeroDocumento.$touch()"
                                            @blur="$v.tutor.numeroDocumento.$touch()"
                                            :error-messages="tutornumerodocumentoErrors"
                                          ></v-textarea>
                                        </v-col>
                                      </v-row>

                                      <v-autocomplete
                                        :items="listResidentes"
                                        v-model="tutor.usuaria"
                                        :search-input.sync="searchResidente"
                                        filled
                                        chips
                                        outlined
                                        color="#009900"
                                        label="Residente a cargo del tutor"
                                        item-text="residente"
                                        return-object
                                        @input="$v.tutor.usuaria.$touch()"
                                        @blur="$v.tutor.usuaria.$touch()"
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

                                      <v-textarea
                                        label="Parentesco con la residente"
                                        v-model="tutor.parentesco"
                                        outlined
                                        color="#009900"
                                        rows="1"
                                        auto-grow
                                        :readonly="isDisabled"
                                        @input="$v.tutor.parentesco.$touch()"
                                        @blur="$v.tutor.parentesco.$touch()"
                                        :error-messages="parentescoErrors"
                                      ></v-textarea>
                                    </v-card-text>
                                    <v-card-actions>
                                      <v-spacer></v-spacer>
                                      <v-btn 
                                        v-if="accion == 'registrar'"
                                        color="success" @click="guardarTutores()"
                                        >
                                        <v-icon left class="mr-0 icon-plan">mdi-check</v-icon>
                                        Agregar
                                      </v-btn>
                                      <v-btn
                                        v-if="accion == 'actualizar'"
                                        color="yellow" @click="actualizarTutores(indice)"
                                        >
                                        <v-icon left class="mr-0 icon-plan">mdi-pencil</v-icon>
                                        Actualizar
                                      </v-btn>
                                      <v-btn
                                        color="error" @click="cerrarAgregarTutores()"
                                      >
                                       <v-icon left class="mr-0 icon-plan">mdi-close</v-icon>
                                        Cerrar
                                      </v-btn>
                                    </v-card-actions>
                                  </v-card>
                                </v-dialog>
                            </v-col>
                          </v-card-title>

                          <!-- Cuerpo -->
                          <v-card-text style="background-color:#FAFAFA">
                            <v-row>
                              <v-col><h3>Nombre</h3></v-col>
                              <v-col><h3>Nro. Documento</h3></v-col>
                              <v-col><h3>Parentesco</h3></v-col>
                              <v-col><h3>Acciones</h3></v-col>
                            </v-row>
                            <div
                              v-for="(item, index) in tallerescuelapadres.contenido.tutores"
                              :key="index"
                            >
                              <v-row>
                                <v-col>{{item.nombre}}</v-col>
                                <v-col>{{ item.numeroDocumento }}</v-col>
                                <v-col>{{item.parentesco}} - {{item.usuaria.residente}}</v-col>
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
                                        @click="eliminarTutores(index)"
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
                            v-if="$v.tallerescuelapadres.contenido.tutores.$error"
                          >
                            Debe tener como mínimo un tutor registrado
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
                    @click="sendTallerEscuelaPadres"
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
import { required, minLength, email, helpers } from "vuelidate/lib/validators";

import { mapGetters } from "vuex";

function fechaIvalid(value) {
  return !(this.$moment(value) > this.$moment(this.tallerescuelapadres.contenido.fechaFin));
}

function fechaFvalid(value) {
  return !(this.$moment(value) < this.$moment(this.tallerescuelapadres.contenido.fechaInicio));
}

function fechaFvalid2(value) {
  return !(this.$moment(value) > this.$moment());
}

function nrodocxTipo(value) {
  return this.tutor.tipoDocumento != "";
}

function dniValid(value) {
  if (this.tutor.tipoDocumento == "DNI") {
    return /^[0-9]{8}$/.test(value);
  }
  else{
    return true;
  }
}

function pasValid(value) {
  if (this.tutor.tipoDocumento == "Pasaporte") {
    return /^(?!^0+$)[a-zA-Z0-9]{3,20}$/.test(value);
  }
  else{
    return true;
  }
}

function CEValid(value) {
  if (this.tutor.tipoDocumento == "Carnet Extranjeria") {
    return /^[0-9]{9}$/.test(value);
  }
  else{
    return true;
  }
}

export default {
  data(){
    return {
      tallerescuelapadres:{
        creadordocumento: "",
        tipo: "TallerEscuelaPadres",
        fechacreacion: new Date(),
        area: "social",
        fase: "2",
        titulo: "",
        descripcion: "",
        contenido:{
          tutores:[],
          fechaInicio: "",
          fechaFin: "",
        },
        firma: {
          urlfirma: "",
          nombre: "",
          cargo: ""
        }
      },
      tutor: {
          nombre: "",
          tipoDocumento: "",
          numeroDocumento: "",
          parentesco: "",
          usuaria: {}
      },
      //recordar borrar al programar delete myObject.regex;
      step:1,
      editable:true,
      complete:false,
      datemenuinicio: false,
      datemenufin: false,
      listResidentes: [],
      residente: {
        residente: "",
        id: "",
        numeroDocumento: "",
      },
      searchResidente: null,
      loadingSearch: false,
      dialogAgregarTutores: false,
      accion: "registrar",
      indice: "",
      listImages: [],
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
        .get("/residente/all/fase/1")//es de la fase 2 pero como no hay , cojo de la 1
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
    ...mapMutations(["addTaller"]),
    limpiar(){
      this.tallerescuelapadres.titulo="";
      this.tallerescuelapadres.descripcion="";
      this.tallerescuelapadres.contenido.fechaInicio="";
      this.tallerescuelapadres.contenido.fechaFin="";
      this.tallerescuelapadres.contenido.tutores=[];
      this.step = 1;
    },
    fechaActual(){
      //Retorna la fecha actual en formato YYYY/MM/DD
      var f = new Date();
      return f.getFullYear() + "-" + (f.getMonth() +1) + "-"+ f.getDate();
    },
    closeDialog() {
      this.$emit("close-dialog");
      this.limpiar();
      this.show = false
      this.$refs.myVueDropzone.removeAllFiles()
    },
    modalRegistrarTutores() {
      this.accion = "registrar";
      this.dialogAgregarTutores = true;
    },
    eliminarTutores(index) {
      this.tallerescuelapadres.contenido.tutores.splice(index, 1); ////eliminar elementos de un arreglo el primer numero es para que elimine la posicion  , el segundo es para ver la cantidad de elementos  a eliminar  en este caso 1
    },
    cerrarAgregarTutores() {
      this.dialogAgregarTutores = false;

      //limpiarTodo
      this.tutor.nombre = "";
      this.tutor.tipoDocumento = "";
      this.tutor.numeroDocumento = "";
      this.tutor.parentesco = "";
      this.tutor.usuaria = {};

      this.$v.tutor.$reset();
    },
    guardarTutores() {
      this.$v.tutor.$touch();

      if(!this.$v.tutor.$invalid){
        let tutorA = { 
         nombre: this.tutor.nombre,
         tipoDocumento:this.tutor.tipoDocumento,
         numeroDocumento:this.tutor.numeroDocumento,
         parentesco:this.tutor.parentesco,
         usuaria:this.tutor.usuaria,
        }//crear tutor variable
        this.tallerescuelapadres.contenido.tutores.push(tutorA); //añadimos al arreglo principal
        //limpiar
        this.tutor.nombre = "";
        this.tutor.tipoDocumento = "";
        this.tutor.numeroDocumento = "";
        this.tutor.parentesco = "";
        this.tutor.usuaria = {};
        this.dialogAgregarTutores = false;
        //reiniciamos el estado de la validacion
        this.$v.tutor.$reset();
        
      }else{
        console.log("no se guardo el tutor");
      }
    },
    actualizarTutores(index) {
      this.$v.tutor.$touch();
      if(!this.$v.tutor.$invalid){
        this.tallerescuelapadres.contenido.tutores[index].nombre = this.tutor.nombre;
        this.tallerescuelapadres.contenido.tutores[index].tipoDocumento = this.tutor.tipoDocumento;
        this.tallerescuelapadres.contenido.tutores[index].numeroDocumento = this.tutor.numeroDocumento;
        this.tallerescuelapadres.contenido.tutores[index].parentesco = this.tutor.parentesco;
        this.tallerescuelapadres.contenido.tutores[index].usuaria = this.tutor.usuaria;

        //limpiar
        this.tutor.nombre = "";
        this.tutor.tipoDocumento = "";
        this.tutor.numeroDocumento = "";
        this.tutor.parentesco = "";
        this.tutor.usuaria = {};

        this.dialogAgregarTutores = false;

        this.$v.tutor.$reset();
      }
      else{
        console.log("no se actualizo el tutor");
      }
    },
    modalActualizar(index) {
      this.accion = "actualizar";
      this.dialogAgregarTutores = true;
      this.tutor.nombre = this.tallerescuelapadres.contenido.tutores[index].nombre;
      this.tutor.tipoDocumento = this.tallerescuelapadres.contenido.tutores[index].tipoDocumento;
      this.tutor.numeroDocumento = this.tallerescuelapadres.contenido.tutores[index].numeroDocumento;
      this.tutor.parentesco = this.tallerescuelapadres.contenido.tutores[index].parentesco;
      this.tutor.usuaria = this.tallerescuelapadres.contenido.tutores[index].usuaria;
      
      this.indice = index;
    },
    modalConsultar(index) {
      this.accion = "consultar";
      this.dialogAgregarTutores = true;

      this.tutor.nombre = this.tallerescuelapadres.contenido.tutores[index].nombre;
      this.tutor.tipoDocumento = this.tallerescuelapadres.contenido.tutores[index].tipoDocumento;
      this.tutor.numeroDocumento = this.tallerescuelapadres.contenido.tutores[index].numeroDocumento;
      this.tutor.parentesco = this.tallerescuelapadres.contenido.tutores[index].parentesco;
      this.tutor.usuaria = this.tallerescuelapadres.contenido.tutores[index].usuaria;
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
    async sendTallerEscuelaPadres() {
      this.$v.tallerescuelapadres.$touch();

      if (this.$v.tallerescuelapadres.$invalid || this.$v.listImages.$invalid) {
        this.messageSweet(
          "error",
          "Errores al intentar registrar",
          "Se ha presentado errores en los campos para el registro del Taller de escuela para padres",
          false
        );
      } else {
        for (let index = 0; index < this.listImages.length; index++) {
          let formData = new FormData();
          formData.append("file", this.listImages[index]);
          await axios
            .post("/Media", formData)
            .then((res) => {
              this.tallerescuelapadres.firma.urlfirma = res.data;
              this.tallerescuelapadres.firma.nombre = this.user.usuario;
              this.tallerescuelapadres.firma.cargo = this.user.rol.nombre;
              
            })
            .catch((err) => {
              console.error(err);
            });
        }

        //borrar despues de probar el guardado
        //this.tallerescuelapadres.firma.urlfirma = "https://siscarfileserver2.blob.core.windows.net/planes/8189c988-be54-4d02-84a0-610a65166ac8.jpg";
        //this.tallerescuelapadres.firma.nombre = this.user.usuario;
        //this.tallerescuelapadres.firma.cargo = this.user.rol.nombre;

        //Añadimos el id del usuario actual
        this.tallerescuelapadres.creadordocumento = this.user.id;

        //this.tallerescuelapadres.contenido.tutores.forEach((element) => { element.usuariaid = element.usuaria.id; delete element.usuaria; });
        let tallerescuelapadres = this.tallerescuelapadres;

        axios
          .post("/Taller/crearTEP", tallerescuelapadres)
          .then((res) => {
            this.addTaller(res.data);

            this.messageSweet(
              "success",
              "Registro del Taller de escuela para padres",
              "Se registró el Taller de escuela para padres de manera satisfactoria",
              true
            );
          })
          .catch((err) => {
            console.error(err);
          });
      }

      //Para probar algo sin registrar
      /*this.$v.tallerescuelapadres.$touch();

      if (this.$v.tallerescuelapadres.$invalid || this.$v.tallerescuelapadres.$errors) {
        this.messageSweet(
          "error",
          "Errores al intentar registrar",
          "Se ha presentado errores en los campos para el registro del Taller de escuela para padres",
          false
        );
      }
      else{
        this.messageSweet(
          "success",
          "Registro del Taller de escuela para padres",
          "Se registró el Taller de escuela para padres de manera satisfactoria",
          true
        );
      }*/
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

      if (!this.$v.tallerescuelapadres.titulo.$dirty) {
        return errors;
      }

      if (!this.$v.tallerescuelapadres.titulo.required) {
        errors.push("El titulo es requerido");
      }

      if (!this.$v.tallerescuelapadres.titulo.minLength) {
        errors.push("Debe ingresar como mínimo 10 caracteres");
      }

      return errors;
    },
    descripcionErrors() {
      const errors = [];

      if (!this.$v.tallerescuelapadres.descripcion.$dirty) {
        return errors;
      }

      if (!this.$v.tallerescuelapadres.descripcion.required) {
        errors.push("La descripción es requerida");
      }

      if (!this.$v.tallerescuelapadres.descripcion.minLength) {
        errors.push("Debe ingresar como mínimo 10 caracteres");
      }

      return errors;
    },
    fechainicioErrors() {
      const errors = [];

      if (!this.$v.tallerescuelapadres.contenido.fechaInicio.$dirty) return errors;

      !this.$v.tallerescuelapadres.contenido.fechaInicio.required && errors.push("Debe Ingresar una Fecha de inicio obligatoriamente");

      !this.$v.tallerescuelapadres.contenido.fechaInicio.fechaIvalid && errors.push("La fecha inicio debe ser menor a la fecha fin");

      return errors;
    },
    fechafinErrors() {
      const errors = [];

      if (!this.$v.tallerescuelapadres.contenido.fechaFin.$dirty) return errors;

      !this.$v.tallerescuelapadres.contenido.fechaFin.required && errors.push("Debe Ingresar una Fecha de fin obligatoriamente");

      !this.$v.tallerescuelapadres.contenido.fechaFin.fechaFvalid && errors.push("La fecha fin debe ser mayor a la fecha inicio");
      
      !this.$v.tallerescuelapadres.contenido.fechaFin.fechaFvalid2 && errors.push("La fecha fin debe ser antes del día de hoy");
      
      return errors;
    },
    tutoresErrors(){
      const errors = [];
      if (!this.$v.tallerescuelapadres.contenido.tutores.$dirty) return errors;
      !this.$v.tallerescuelapadres.contenido.tutores.required && errors.push("Debe ingresar un tutor obligatoriamente");
      
      return errors;
    },
    tutornombreErrors() {
      const errors = [];

      if (!this.$v.tutor.nombre.$dirty) return errors;

      !this.$v.tutor.nombre.required && errors.push("Debe ingresar un nombre");
      
      return errors;
    },
    tutornumerodocumentoErrors() {
      const errors = [];
      if (!this.$v.tutor.numeroDocumento.$dirty) return errors;

      !this.$v.tutor.numeroDocumento.required && errors.push("Debe ingresar el número de Documento Obligatoriamente");
      
      !this.$v.tutor.numeroDocumento.nrodocxTipo && errors.push("Debe seleccionar el Tipo de Documento Inicialmente");

      !this.$v.tutor.numeroDocumento.dniValid && errors.push("El número de DNI debe poseer 8 digitos númericos");
      
      !this.$v.tutor.numeroDocumento.pasValid && errors.push("El número de Pasaporte debe poseer de 3 a 20 caracteres alfanumericos");

      !this.$v.tutor.numeroDocumento.CEValid && errors.push("El Numero del Carnet de Extranjeria debe poseer 9 digitos numericos");
      /*
      !this.tutor.tipoDocumento != "" && errors.push("Debe seleccionar el Tipo de Documento Inicialmente");
      if (this.tutor.tipoDocumento == "DNI") {
        !/^[0-9]{8}$/.test(this.tutor.numeroDocumento) != false &&
          errors.push("El Numero de DNI debe poseer 8 digitos numericos");
      }
      if (this.tutor.tipoDocumento == "Pasaporte") {
        !/^(?!^0+$)[a-zA-Z0-9]{3,20}$/.test(this.tutor.numeroDocumento) !=
          false &&
          errors.push(
            "El Numero de Pasaporte debe poseer de 3 a 20 caracteres alfanumericos"
          );
      }
      if (this.tutor.tipoDocumento == "Carnet Extranjeria") {
        !/^[0-9]{9}$/.test(this.tutor.numeroDocumento) != false &&
          errors.push(
            "El Numero del Carnet de Extranjeria debe poseer 9 digitos numericos"
          );
      }
      */
      return errors;
    },
    tipoDocumentoErrors() {
      const errors = [];
      if (!this.$v.tutor.tipoDocumento.$dirty) return errors;
      !this.$v.tutor.tipoDocumento.required &&
        errors.push("Debe seleccionar el Tipo de Documento Obligatoriamente");
      return errors;
    },
    parentescoErrors() {
      const errors = [];

      if (!this.$v.tutor.parentesco.$dirty) return errors;

      !this.$v.tutor.parentesco.required && errors.push("Debe ingresar el parentesco");
      
      return errors;
    },
    errorResidente() {
      const errors = [];
      
      if (!this.$v.tutor.usuaria.$dirty) return errors;

      !this.$v.tutor.usuaria.required && errors.push("Debe ingresar un residente obligatoriamente");
      /*if (this.tallerescuelapadres.contenido.tutores.length > 0) {
        this.tallerescuelapadres.contenido.tutores.forEach(tutor => {
            if(tutor.usuaria.id == this.residente.id) {
              errors.push("Ya ha registrado un tutor para este residente.");
            }
        });
      }*/
      
      return errors;
    },
  },
  validations: {
    listImages: {
      required,
    },
    tallerescuelapadres:{
        titulo: {
          required,
          minLength: minLength(10),
        },
        descripcion: {
          required,
          minLength: minLength(10),
        },
        contenido:{
          fechaInicio:{
            required,
            fechaIvalid
          },
          fechaFin:{
            required,
            fechaFvalid,
            fechaFvalid2
          },
          tutores:{
            required,
          }
        },
      },
      tutor: {
          nombre: { required },
          tipoDocumento: { required },
          numeroDocumento: { required, nrodocxTipo, dniValid, pasValid, CEValid },
          parentesco: { required },
          usuaria: { required }
      }
  },
  components: {
    vueDropzone: vue2Dropzone
  },
}
</script>

<style>

</style>