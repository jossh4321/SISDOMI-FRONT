<template>
  <v-card>
    <v-card-title class="justify-center">Registro de Taller de escuela para padres</v-card-title>
    <v-card>
      <v-stepper v-model="step">
        <v-stepper-header>
          <v-stepper-step :complete="complete" :editable="editable" step="1">
            Datos generales de taller
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step editable step="2">
            Participantes
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
                        v-model="tallerescuelapadres.fechainicio"
                        style="margin-top_5px"
                        color="#009900"
                        prepend-icon="mdi-calendar"
                        v-bind="attrs"
                        v-on="on"
                        label="Fecha del inicio del taller"
                        ></v-text-field>
                    </template>
                    <v-date-picker
                        v-model="tallerescuelapadres.fechainicio"
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
                      color="success"
                      elevation="2"
                      @click="step = 2"
                      block
                    >
                      <v-icon left>mdi-page-next-outline</v-icon>
                      <span>Continuar</span>
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
          <v-stepper-content step="2">
            <!--COMPONENTE PARA AGREGAR TUTORES-->
            <div class="container-user">
                <form>
                    <v-row>
                        <v-col cols="12" sm="12" md="12">
                            <v-text-field
                                v-model="tutor.nombre"
                                label="Ingrese los nombres y apellidos del tutor"
                                color="#009900"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <v-select
                                :items="['DNI', 'Pasaporte', 'Carnet Extranjeria']"
                                label="Ingrese el Tipo de Documento"
                                dense
                                outlined
                                v-model="tutor.tipoDocumento"
                                color="#009900"
                            ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <v-text-field
                                v-model="tutor.numeroDocumento"
                                label="Ingrese el  N°documento"
                                color="#009900"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
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
                                    DNI: {{ item.item.numeroDocumento }}
                                </v-list-item-subtitle>
                                </v-list-item-content>
                            </template>
                            </v-autocomplete>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <v-text-field
                                v-model="tutor.parentesco"
                                label="Ingrese el parentesco con la residente"
                                color="#009900"
                            ></v-text-field>
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
import { mapMutations, mapState } from "vuex";
import { required, minLength, email, helpers } from "vuelidate/lib/validators";

export default {
  props:["residente","visible"],
  data(){
    return {
      tallerescuelapadres:{
        creadordocumento: "",
        tipo: "TallerEscuelaPadres",
        fechacreacion: "",
        area: "social",
        fase: "convivencia",
        titulo: "",
        descripcion: "",
        contenido:{
          tutores:[{
            nombre: "",
            tipoDocumento: "",
            numeroDocumento: "",
            parentesco: "",
            usuariaid: ""
          }],
          fechainicio: "",
          fechafin: ""
        }
      },
      tutor: {
          nombre: "",
          tipoDocumento: "",
          numeroDocumento: "",
          parentesco: "",
          usuariaid: ""
      },
      step:1,
      editable:true,
      complete:false,
      datemenuinicio: false,
      datemenufin: false,
    }
  },
  methods:{
    limpiar(){
      this.tallerescuelapadres.titulo="";
      this.tallerescuelapadres.descripcion="";
      this.tallerescuelapadres.fechainicio="";
      this.tallerescuelapadres.fechafin="";
    },

    /*
    //Funcion para cerrar solo el presente modal.
    //No utilizado
    cerrarModal() {
      this.show = false;
      this.limpiar();
    },*/
    cerrarTodo() {
      this.$emit("close-dialog-dontsave");
      this.limpiar();
      this.show = false
    },
    fechaActual(){
      //Retorna la fecha actual en formato YYYY/MM/DD
      var f = new Date();
      return f.getFullYear() + "-" + (f.getMonth() +1) + "-"+ f.getDate();
    },
    closeDialog() {
      this.$emit("close-dialog");
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
  }
}
</script>

<style>

</style>