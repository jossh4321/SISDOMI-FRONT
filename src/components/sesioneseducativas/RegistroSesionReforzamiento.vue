<template>
  <v-card>
    <v-card-title class="justify-center">Registro de Sesion de Reforzamiento</v-card-title>
    <v-card style="padding: 15px 20px">
      <v-container>
        <v-row>
          <v-col>
            <v-text-field
              v-model="residente.nombre"
              label="Nombre del Residente"
              filled
              readonly
              color="#009900"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="residente.apellido"
              label="Apellidos del Residente"
              filled
              readonly
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
              v-model="fechaejemplo"
              style="margin-top_5px"
              outlined
              readonly
              color="#009900"
              prepend-icon="mdi-calendar"
              v-bind="attrs"
              v-on="on"
              label="Fecha de Realización de Sesion de Reforzamiento"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="fechaejemplo"
            @input="menu2 = false"
            locale="es-es"
          ></v-date-picker>
        </v-menu>
        <v-text-field
          v-model="curso"
          label="Curso o Materia"
          outlined
          color="#009900"
        ></v-text-field>
        <v-text-field
          v-model="tema"
          label="Actividad o Tema a realizar"
          outlined
          color="#009900"
        ></v-text-field>
        <v-row>
          <v-col>
            <v-btn block color="success">
              <v-icon left>done</v-icon>
              <span>Registrar</span>
            </v-btn>
          </v-col>
          <v-col>
            <v-btn block @click="cerrarModal()" color="warning">
              <v-icon left>mdi-close-outline</v-icon>
              <span>Regresar</span>
            </v-btn>
          </v-col>
          <v-col>
            <v-btn block @click="cerrarTodo()" color="primary">
              <v-icon left>mdi-close-outline</v-icon>
              <span>Cancelar</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
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
    return{
      datemenu: false,
      tema:"",
      curso:"",
      fechaejemplo: '2011-04-11'
    }
  },
  methods:{
    cerrarModal() {
      this.show = false;
      this.tema="";
      this.curso="";
    },
    cerrarTodo() {
      this.$emit("close-all");
      this.show = false
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