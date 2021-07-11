<template>
  <v-card>
    <v-card-title class="justify-center">Visualizar Taller educativo</v-card-title>
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
                    <v-text-field
                      label="Titulo del Taller"
                      v-model.trim="taller.titulo"
                      outlined
                      readonly
                      color="success"
                      ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      label="Descripción del Taller"
                      v-model.trim="taller.descripcion"
                      outlined
                      readonly
                      color="success"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <v-text-field
                      label="Fecha de realización del taller"
                      v-model="taller.contenido.fecharealizacion"
                      outlined
                      readonly
                      color="success"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                      <v-text-field
                      label="Turno"
                      v-model="taller.contenido.turno"
                      outlined
                      readonly
                      color="success"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      label="Nº de sesión"
                      v-model.number="taller.contenido.nrosesion"
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
                        <v-card style="padding:5px 5px;background-color:#EAEAEA">
                          <v-card-title>
                            <v-col :cols="8">
                              Lista de Participantes
                            </v-col>
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
                                                    <span style="font-size:12px">R</span>
                                                </v-avatar>
                                            </v-list-item-avatar>
                                            <v-list-item-content>
                                            <v-list-item-title>
                                                Nombre: {{ participante.usuaria.residente }}
                                            </v-list-item-title>
                                            <v-list-item-subtitle>
                                                Nro. Documento: {{ participante.usuaria.numeroDocumento }}
                                            </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </template>
                                        <!-- <template>
                                            <v-list-item-avatar>
                                                <v-avatar left color="#b3b3ff" size="24">
                                                    <span style="font-size:12px">R</span>
                                                </v-avatar>
                                            </v-list-item-avatar>
                                            <v-list-item-content>
                                            <v-list-item-title>
                                                Nombre: {{ participante.usuaria.residente }}
                                            </v-list-item-title>
                                            <v-list-item-subtitle>
                                                Nro. Documento: {{ participante.usuaria.numeroDocumento }}
                                            </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </template> -->

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


                                      <!-- <v-radio-group
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
                                      </v-radio-group> -->

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
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";

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
    }
  },
  methods:{
    limpiar(){
      this.taller.titulo="";
      this.taller.descripcion="";
      this.taller.contenido.fecharealizacion="";
      this.taller.contenido.nrosesion=0;
      this.taller.contenido.turno="";
      this.taller.contenido.participantes=[];

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

      this.participante.cooperacion = this.taller.contenido.participantes[index].cooperacion;
      this.participante.puntualidad = this.taller.contenido.participantes[index].puntualidad;
      this.participante.aprendizaje = this.taller.contenido.participantes[index].aprendizaje;
      this.participante.conducta = this.taller.contenido.participantes[index].conducta;
      this.participante.usuaria = this.taller.contenido.participantes[index].usuaria;
      this.participante.imgfirma = this.taller.contenido.participantes[index].imgfirma;
      this.participante.firma = this.taller.contenido.participantes[index].firma;
      
      //Mostrar la imagen en el modal
      
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
  .blockear-dropzone {
    pointer-events: none;
    cursor: default;
  }
  .esconder {
    display: none;
  }
</style>