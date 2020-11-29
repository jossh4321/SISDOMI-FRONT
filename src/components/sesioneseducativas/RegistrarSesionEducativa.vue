<template>
  <v-card>
    <v-card-title class="justify-center">Registro de Sesion de Educativa</v-card-title>
    <v-card>
      <v-stepper v-model="step">
        <v-stepper-header>
          <v-stepper-step :complete="complete" :editable="editable" step="1">
            Registro de Sesion
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step editable step="2">
            Agregar participantes
            <small>(Opcional)</small>
          </v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content step="1">
            <div class="container-user">
              <form>
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="sesioneducativa.titulo"
                      label="Titulo de Sesion"
                      color="#009900"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="sesioneducativa.area"
                      label="Area correspondiente"
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
                      v-model="sesioneducativa.fechaCreacion"
                      style="margin-top_5px"
                      color="#009900"
                      prepend-icon="mdi-calendar"
                      v-bind="attrs"
                      v-on="on"
                      label="Fecha de creación de la Sesion Educativa"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="sesioneducativa.fechaCreacion"
                    @input="menu2 = false"
                    locale="es-es"
                  ></v-date-picker>
                </v-menu>
                <v-row>
                  <v-col>
                    <v-btn block color="success">
                      <v-icon left>done</v-icon>
                      <span>Registrar</span>
                    </v-btn>
                  </v-col>
                  <v-col>
                    <v-btn block @click="cerrarTodo()" color="primary">
                      <v-icon left>mdi-close-outline</v-icon>
                      <span>Cancelar</span>
                    </v-btn>
                  </v-col>
                </v-row>
              </form>
            </div>
          </v-stepper-content>
          <v-stepper-content step="2">
            <!--COMPONENTE PARA AGREGAR PARTICIPANTES-->
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
  props:["residente","visible","listaresidentes"],
  data(){
    return{
      sesioneducativa:{
        titulo:"",
        idCreador:"",
        fechaCreacion:"",
        area:"",
        contenido:{
          participantes:[{
            idparticipante:"",
            grado:"",
            fecha: "",
            firma:"",
            observaciones:""
          }]
        },
        tipo:"Sesion Educativa", //Tipo por defecto
        
      },
      step:1,
      editable:true,
      complete:false,
      datemenu: false,
    }
  },
  methods:{
    limpiar(){
      this.sesioneducativa.titulo="";
      this.sesioneducativa.area="";
      this.sesioneducativa.fechaCreacion="";
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
    }
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