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
              <form>

                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="tallerescuelapadres.titulo"
                      label="Titulo del Taller"
                      color="#009900"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="tallerescuelapadres.descripcion"
                      label="Descripción"
                      color="#009900"
                    ></v-text-field>
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
                        v-model="tallerescuelapadres.contenido.fechainicio"
                        style="margin-top_5px"
                        color="#009900"
                        prepend-icon="mdi-calendar"
                        v-bind="attrs"
                        v-on="on"
                        label="Fecha del inicio del taller"
                        ></v-text-field>
                    </template>
                    <v-date-picker
                        v-model="tallerescuelapadres.contenido.fechainicio"
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
                            v-model="tallerescuelapadres.fechafin"
                            style="margin-top_5px"
                            color="#009900"
                            prepend-icon="mdi-calendar"
                            v-bind="attrs"
                            v-on="on"
                            label="Fecha fin del taller"
                            ></v-text-field>
                        </template>
                        <v-date-picker
                            v-model="tallerescuelapadres.fechafin"
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
                                          ></v-textarea>
                                        </v-col>
                                      </v-row>

                                      <v-autocomplete
                                        label="Nombres y apellidos del residente"
                                        outlined
                                        v-model="residente"
                                        :loading="loadingSearch"
                                        :search-input.sync="searchResidente"
                                        :items="listResidentes"
                                        item-text="residente"
                                        item-value="id"
                                        hide-no-data
                                        hide-selected
                                        return-object
                                        >
                                        <template v-slot:item="item">
                                            <v-list-item-avatar
                                            color="primary"
                                            class="headline font-weight-light white--text"
                                            >
                                            {{ item.item.residente.charAt(0) }}
                                            </v-list-item-avatar>
                                            <v-list-item-content>
                                            <v-list-item-title>
                                                {{ item.item.residente }}
                                            </v-list-item-title>
                                            <v-list-item-subtitle>
                                                {{ item.item.numeroDocumento }}
                                            </v-list-item-subtitle>
                                            </v-list-item-content>
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
                                      ></v-textarea>
                                    </v-card-text>
                                    <v-card-actions>
                                      <v-spacer></v-spacer>
                                      <v-btn 
                                        v-if="accion == 'registrar'"
                                        color="success" @click="guardarTutores()"
                                        >
                                        Agregar
                                      </v-btn>
                                      <v-btn 
                                        v-if="accion == 'actualizar'"
                                        color="yellow" @click="actualizarTutores(indice)"
                                        >
                                        Actualizar
                                      </v-btn>
                                      <v-btn
                                        color="red" @click="cerrarAgregarTutores()"
                                      >
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

export default {
  data(){
    return {
      startStteper: 1,
      tallerescuelapadres:{
        creadordocumento: "",
        tipo: "TallerEscuelaPadres",
        fechacreacion: new Date(),
        area: "social",
        fase: "convivencia",
        titulo: "",
        descripcion: "",
        contenido:{
          tutores:[],
          fechainicio: "",
          fechafin: "",
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
        .get("/residente/all/fase/2")
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
    limpiar(){
      this.tallerescuelapadres.titulo="";
      this.tallerescuelapadres.descripcion="";
      this.tallerescuelapadres.contenido.fechainicio="";
      this.tallerescuelapadres.contenido.fechafin="";
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
      this.residente = null;
    },
    guardarTutores() {
      //this.$v.tutor.$touch();
      //if(!this.$v.tutor.$invalid){
        let tutorA = { 
         nombre: this.tutor.nombre,
         tipoDocumento:this.tutor.tipoDocumento,
         numeroDocumento:this.tutor.numeroDocumento,
         parentesco:this.tutor.parentesco,
         usuaria:this.residente,
        }//crear tutor variable
        
        this.tallerescuelapadres.contenido.tutores.push(tutorA); //añadimos al arreglo principal
        
        //limpiar
        this.tutor.nombre = "";
        this.tutor.tipoDocumento = "";
        this.tutor.numeroDocumento = "";
        this.tutor.parentesco = "";
        this.residente = null;

        this.dialogAgregarTutores = false;
        //reiniciamos el estado de la validacion
        //this.$v.progreso.$reset();
      //}else{
      //  console.log("no se guardo el tutor");
      //}
    },
    actualizarTutores(index) {
      this.tallerescuelapadres.contenido.tutores[index].nombre = this.tutor.nombre;
      this.tallerescuelapadres.contenido.tutores[index].tipoDocumento = this.tutor.tipoDocumento;
      this.tallerescuelapadres.contenido.tutores[index].numeroDocumento = this.tutor.numeroDocumento;
      this.tallerescuelapadres.contenido.tutores[index].parentesco = this.tutor.parentesco;
      this.tallerescuelapadres.contenido.tutores[index].usuaria = this.residente;

      this.dialogAgregarTutores = false;
    },
    modalActualizar(index) {
      this.accion = "actualizar";
      this.dialogAgregarTutores = true;
      this.tutor.nombre = this.tallerescuelapadres.contenido.tutores[index].nombre;
      this.tutor.tipoDocumento = this.tallerescuelapadres.contenido.tutores[index].tipoDocumento;
      this.tutor.numeroDocumento = this.tallerescuelapadres.contenido.tutores[index].numeroDocumento;
      this.tutor.parentesco = this.tallerescuelapadres.contenido.tutores[index].parentesco;
      this.residente = this.tallerescuelapadres.contenido.tutores[index].usuaria;
      
      this.indice = index;
    },
    modalConsultar(index) {
      this.accion = "consultar";
      this.dialogAgregarTutores = true;

      this.tutor.nombre = this.tallerescuelapadres.contenido.tutores[index].nombre;
      this.tutor.tipoDocumento = this.tallerescuelapadres.contenido.tutores[index].tipoDocumento;
      this.tutor.numeroDocumento = this.tallerescuelapadres.contenido.tutores[index].numeroDocumento;
      this.tutor.parentesco = this.tallerescuelapadres.contenido.tutores[index].parentesco;
      this.residente = this.tallerescuelapadres.contenido.tutores[index].usuaria;
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
      //this.$v.$touch();

      //if (this.$v.$invalid) {
      //  this.messageSweet(
      //    "error",
      //    "Errores al intentar registrar",
      //    "Se ha presentado errores en los campos para el registro del Plan de Intervención",
      //    false
      //  );
      //} else {
        for (let index = 0; index < this.listImages.length; index++) {
          let formData = new FormData();
          formData.append("file", this.listImages[index]);
          await axios
            .post("/Media", formData)
            .then((res) => {
              this.tallerescuelapadres.firma.urlfirma = res.data;
              this.tallerescuelapadres.firma.nombre = this.user.usuario;
              this.tallerescuelapadres.firma.cargo = this.user.rol;
              
              console.log(this.tallerescuelapadres.firma.urlfirma);
              console.log(this.tallerescuelapadres.firma.nombre);
              console.log(this.tallerescuelapadres.firma.cargo);
            })
            .catch((err) => {
              console.error(err);
            });
        }
        //Añadimos el id del usuario actual
        this.tallerescuelapadres.creadordocumento = this.user.id;

        this.tallerescuelapadres.contenido.tutores.forEach((element) => { element.usuariaid = element.usuaria.id; delete element.usuaria; });
        let tallerescuelapadres = this.tallerescuelapadres;
        
        axios
          .post("/Taller/crearTEP", tallerescuelapadres)
          .then((res) => {
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
      //}
    },
    messageSweet(icon, title, text, valid) {
      this.$swal({
        icon: icon,
        title: title,
        text: text,
      }).then((res) => {
        if (valid) {
          //this.$emit("register-complete");
        }
      });
    },
  },
  computed:{
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
  },
  components: {
    vueDropzone: vue2Dropzone
  },
}
</script>

<style>

</style>