<template>
  <v-card>
    <v-card-title class="justify-center">Visualizar Taller de escuela para padres</v-card-title>
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
                      v-model.trim="taller.titulo"
                      outlined
                      color="#009900"
                      rows="1"
                      auto-grow
                      readonly
                    ></v-textarea>
                  </v-col>
                  <v-col>
                    <v-textarea
                      label="Descripción del Taller"
                      v-model="taller.descripcion"
                      outlined
                      color="#009900"
                      rows="1"
                      auto-grow
                      readonly
                    ></v-textarea>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <v-text-field
                        v-model="taller.contenido.fechainicio"
                        prepend-icon="mdi-calendar"
                        readonly
                        color="#009900"
                        outlined
                        label="Fecha del inicio del taller"
                      ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="taller.contenido.fechafin"
                      prepend-icon="mdi-calendar"
                      readonly
                      color="#009900"
                      outlined
                      label="Fecha fin del taller"
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
                                        readonly
                                      ></v-textarea>
                                      
                                      <v-row>
                                        <v-col>
                                          <v-select
                                            :items="['DNI', 'Pasaporte', 'Carnet Extranjeria']"
                                            label="Ingrese el Tipo de Documento"
                                            dense
                                            outlined
                                            v-model="tutor.tipoDocumento"
                                            readonly
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
                                            readonly
                                          ></v-textarea>
                                        </v-col>
                                      </v-row>
                                      
                                      <v-row>
                                          <v-chip
                                            style="margin-top:5px"
                                            >
                                            <span style="font-size:15px">Residente a cargo del tutor: </span>
                                              <v-avatar color="#b3b3ff" size="24">
                                                <span style="font-size:12px">R</span>
                                              </v-avatar>
                                              {{ tutor.usuaria.residente }} - Nro. Documento: {{ tutor.usuaria.numeroDocumento }}
                                          </v-chip>
                                      </v-row>

                                      <v-textarea
                                        label="Parentesco con la residente"
                                        v-model="tutor.parentesco"
                                        outlined
                                        color="#009900"
                                        rows="1"
                                        auto-grow
                                        readonly
                                        style="margin-top:50px"
                                      ></v-textarea>
                                    </v-card-text>
                                    <v-card-actions>
                                      <v-spacer></v-spacer>
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
                              v-for="(item, index) in taller.contenido.tutores"
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
                                        color="blue"
                                        @click="modalConsultar(index)"
                                      >
                                        <v-icon dark>
                                          mdi-eye
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
                <v-col cols="12" sm="12" align="center">
                  <v-img
                    :src="taller.firma.urlfirma"
                    max-width="250"
                    max-height="250"
                    >
                    </v-img>
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

export default {
  data(){
    return {
      startStteper: 1,
      tutor: {
          nombre: "",
          tipoDocumento: "",
          numeroDocumento: "",
          parentesco: "",
          usuaria: {}
      },
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
    }
  },  
  methods:{
    limpiar(){
      this.taller.titulo="";
      this.taller.descripcion="";
      this.taller.contenido.fechainicio="";
      this.taller.contenido.fechafin="";
      this.taller.contenido.tutores=[];
      this.step = 1;
    },
    fechaActual(){
      var f = new Date();
      return f.getFullYear() + "-" + (f.getMonth() +1) + "-"+ f.getDate();
    },
    closeDialog() {
      this.$emit("close-dialog");
      this.limpiar();
      this.show = false;
    },
    cerrarAgregarTutores() {
      this.dialogAgregarTutores = false;

      //limpiarTodo
      this.tutor.nombre = "";
      this.tutor.tipoDocumento = "";
      this.tutor.numeroDocumento = "";
      this.tutor.parentesco = "";
      this.tutor.usuaria = {};
    },
    modalConsultar(index) {
      this.accion = "consultar";
      this.dialogAgregarTutores = true;

      this.tutor.nombre = this.taller.contenido.tutores[index].nombre;
      this.tutor.tipoDocumento = this.taller.contenido.tutores[index].tipoDocumento;
      this.tutor.numeroDocumento = this.taller.contenido.tutores[index].numeroDocumento;
      this.tutor.parentesco = this.taller.contenido.tutores[index].parentesco;

      this.tutor.usuaria = this.taller.contenido.tutores[index].usuaria;
    },
  },
  props: {
    taller: {
      type: Object,
    },
  },
  computed:{
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
}
</script>

<style>

</style>