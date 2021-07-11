<template>
  <v-card>
    <v-card-title class="justify-center">Consultar Entrevista Familiar</v-card-title>
    <div class="container-user">
      <v-card style="padding:1% 3%">
        <form style="margin-top: 15px">
          <v-text-field
            v-model.trim="contenidoEntrevistaFamiliar.datosresidente.nombrecompleto"
            label="Nombre Completo del Residente"
            outlined
            color="#009900"
            readonly
          ></v-text-field>
          <v-text-field
            v-model.trim="contenidoEntrevistaFamiliar.nombreApoderado"
            label="Nombre del apoderado"
            outlined
            readonly
            color="#009900"
          ></v-text-field>
          <v-text-field
            v-model.trim="contenidoEntrevistaFamiliar.apellidoApoderado"
            label="Apellido del apoderado"
            outlined
            readonly
            color="#009900"
          ></v-text-field>
          <v-menu
            v-model="datemenu"
            :close-on-content-click="true"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="contenidoEntrevistaFamiliar.fechaEntrevista"
                label="Fecha de Entrevista"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                outlined
              ></v-text-field>
            </template>
          </v-menu>
          <v-text-field
            v-model="contenidoEntrevistaFamiliar.dniApoderado"
            outlined
            readonly
            label="N° de documento del apoderado"
            color="#009900"
          ></v-text-field>
          <v-text-field
            v-model="contenidoEntrevistaFamiliar.observaciones"
            color="#009900"
            readonly
            label="Observaciones"
          ></v-text-field>
          <v-row>
            <v-col>
              <v-btn block @click="cerrarDialogo()" color="primary">
                <v-icon left>mdi-close-outline</v-icon>
                <span>Cerrar</span>
              </v-btn>
            </v-col>
          </v-row>
        </form>
      </v-card>
    </div>
  </v-card>
</template>

<script>
import {
  required,
  minLength,
  maxLength,
  email,
  helpers,
  numeric
} from "vuelidate/lib/validators";
import moment from "moment";
export default {
  name:"ConsultarEntrevistasFamiliares",
  props:["contenidoEntrevistaFamiliar"],
  data() {
    return {
      datemenu: false,
      menu: false,
    };
  },
  methods: {
    cerrarDialogo() {
      this.$emit("close-dialog-detail");
    },
  },
};
</script>

