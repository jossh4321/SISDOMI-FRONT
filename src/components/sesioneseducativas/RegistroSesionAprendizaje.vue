<template>
  <v-card>
    <v-card-title class="justify-center">Registro de Sesion de Aprendizaje</v-card-title>
    <v-card style="padding: 15px 20px">
      <v-container>
        <v-row>
          <v-col>
            <v-text-field
              v-model="residente.nombre"
              label="Nombre del Residente"
              outlined
              readonly
              color="#009900"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="residente.apellido"
              label="Apellidos del Residente"
              outlined
              readonly
              color="#009900"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn block color="success">
              <v-icon left>done</v-icon>
              <span>Registrar</span>
            </v-btn>
          </v-col>
          <v-col>
            <v-btn block @click="show = false" color="warning">
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
  methods:{
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