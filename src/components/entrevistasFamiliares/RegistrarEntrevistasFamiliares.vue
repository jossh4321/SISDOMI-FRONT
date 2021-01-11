<template>
  <v-card>
    <v-card-title class="justify-center">Registrar Nueva Entrevista Familiar</v-card-title>
    <div class="container-user">
      <v-card style="padding:1% 3%">
        <form style="margin-top: 15px">
          <v-text-field
            v-model.trim="contenidoEntrevistaFamiliar.nombreApoderado"
            label="Nombre del apoderado"
            outlined
            color="#009900"
            @input="$v.contenidoEntrevistaFamiliar.nombreApoderado.$touch()"
            @blur="$v.contenidoEntrevistaFamiliar.nombreApoderado.$touch()"
            :error-messages="errorNombreApoderado"
          ></v-text-field>
          <v-text-field
            v-model.trim="contenidoEntrevistaFamiliar.apellidoApoderado"
            label="Apellido del apoderado"
            outlined
            color="#009900"
            @input="$v.contenidoEntrevistaFamiliar.apellidoApoderado.$touch()"
            @blur="$v.contenidoEntrevistaFamiliar.apellidoApoderado.$touch()"
            :error-messages="errorApellidoApoderado"
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
                @input="$v.contenidoEntrevistaFamiliar.fechaEntrevista.$touch()"
                @blur="$v.contenidoEntrevistaFamiliar.fechaEntrevista.$touch()"
                :error-messages="errorFechaEntrevista"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="contenidoEntrevistaFamiliar.fechaEntrevista"
              @input="menu = false"
              locale="es-es"
            ></v-date-picker>
          </v-menu>
          <v-text-field
            v-model="contenidoEntrevistaFamiliar.dniApoderado"
            outlined
            @input="$v.contenidoEntrevistaFamiliar.dniApoderado.$touch()"
            @blur="$v.contenidoEntrevistaFamiliar.dniApoderado.$touch()"
            :error-messages="errorNumeroDocumentoApoderado"
            label="N° de documento del apoderado"
            color="#009900"
          ></v-text-field>
          <v-text-field
            v-model="contenidoEntrevistaFamiliar.observaciones"
            color="#009900"
            label="Observaciones"
            @input="$v.contenidoEntrevistaFamiliar.observaciones.$touch()"
            @blur="$v.contenidoEntrevistaFamiliar.observaciones.$touch()"
            :error-messages="errorObservaciones"
          ></v-text-field>
          <v-row>
            <v-col>
              <v-btn block @click="cerrarDialogo()" color="primary">
                <v-icon left>mdi-close-outline</v-icon>
                <span>Cerrar</span>
              </v-btn>
            </v-col>
            <v-col>
              <v-btn block @click="registrarEntrevistaFamiliar()" color="success">
                <v-icon left>mdi-content-save-all-outline</v-icon>
                <span>Registrar</span>
              </v-btn>
            </v-col>
          </v-row>
        </form>
      </v-card>
    </div>
  </v-card>
</template>

<script>
const m = moment();
import axios from "axios"; //Para las llamadas a las apis
import Vuelidate from "vuelidate"; //Para las validaciones
import vue2Dropzone from "vue2-dropzone"; //Para las firmas
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import { mapMutations, mapState } from "vuex";
//Para una sola palabra o frase
function esTexto(value) {
  return /^[A-Za-z\sáéíóúÁÉÍÓÚñÑ]+$/.test(value); 
}
//Para oraciones o parrafos
function esParrafo(value) {
  return /^[A-Za-z\d\s.,;°"“()áéíóúÁÉÍÓÚñÑ]+$/.test(value); 
}

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
  data() {
    return {
      datemenu: false,
      step: 1,
      menu: false,
      contenidoEntrevistaFamiliar: {
        fechaEntrevista: "",
        nombreApoderado: "",
        apellidoApoderado: "",
        dniApoderado: "",
        observaciones: "",
      }
    };
  },
  methods: {
    ...mapMutations(["addEntrevistaFamiliar"]),
    //moment: function() {
    //  return moment();
    //},

    ///CERRAR DIALOGO
    cerrarDialogo() {
      this.contenidoEntrevistaFamiliar = this.limpiarEntrevistaFamiliar();
      this.$v.contenidoEntrevistaFamiliar.$reset();
      this.step = 1;
      this.$emit("close-dialog-save");
    },
    //metodo limpiar residente
    limpiarEntrevistaFamiliar() {
      return {
        fechaEntrevista: "",
          nombreApoderado: "",
          apellidoApoderado: "",
          dniApoderado: "",
          observaciones: "",
      };
      ///funcion mensaje para mostrar el mensaje de error
    },
    async mensaje(icono, titulo, texto, footer) {
      await this.$swal({
        icon: icono,
        title: titulo,
        text: texto,
        footer: footer
      });
    },
    ////////////HACER LA CONSULTA CON LA API  REGISTRAR
    async registrarEntrevistaFamiliar() {
      this.$v.contenidoEntrevistaFamiliar.$touch();
      if (this.$v.contenidoEntrevistaFamiliar.$invalid) {
        this.mensaje(
          "error",
          "..Oops",
          "Se encontraron errores en el formulario",
          "<strong>Verifique los campos Ingresados<strong>"
        );
      } else {
        await axios
          .post("/Documento/entrevistafamiliar", this.contenidoEntrevistaFamiliar)
          .then(res => {
            var info = {
              nombreApoderado: res.data.nombreApoderado,
              apellidoApoderado: res.data.apellidoApoderado,
              dniApoderado: res.data.dniApoderado,
              observaciones: res.data.observaciones,
              fechaEntrevista: res.data.fechaEntrevista.split("T")[0],
            };
            this.addEntrevistaFamiliar(info);
            this.$v.contenidoEntrevistaFamiliar.$reset();
            this.cerrarDialogo();
          })
          .catch(err => console.log(err));
        await this.mensaje(
          "success",
          "listo",
          "Entrevista Familiar registrada Satisfactoriamente",
          "<strong>Se redirigira a la Interfaz de Gestion<strong>"
        );
      }
    },
  },
  computed: {
    ///validaciones
    ...mapState(["residentes"]),
    // verifyColor() {
    //   return "red";
    // },
    errorNombreApoderado() {
      const errors = [];
      if (!this.$v.contenidoEntrevistaFamiliar.nombreApoderado.$dirty) return errors;
      !this.$v.contenidoEntrevistaFamiliar.nombreApoderado.required &&
        errors.push("Debe ingresar un Nombre Obligatoriamente");
      !this.$v.contenidoEntrevistaFamiliar.nombreApoderado.minLength &&
        errors.push("El Nombre debe tener al menos 3 caracteres");
      !this.$v.contenidoEntrevistaFamiliar.nombreApoderado.esTexto &&
        errors.push("El Nombre no debe contener caracteres especiales");
      return errors;
    },
    errorApellidoApoderado() {
      const errors = [];
      if (!this.$v.contenidoEntrevistaFamiliar.apellidoApoderado.$dirty) return errors;
      !this.$v.contenidoEntrevistaFamiliar.apellidoApoderado.required &&
        errors.push("Debe ingresar un Apellido Obligatoriamente");
      !this.$v.contenidoEntrevistaFamiliar.apellidoApoderado.minLength &&
        errors.push("El Apellido debe tener al menos 3 caracteres");
      !this.$v.contenidoEntrevistaFamiliar.apellidoApoderado.esTexto &&
        errors.push("El Apellido no debe contener caracteres especiales");
      return errors;
    },
    errorNumeroDocumentoApoderado() {
      const errors = [];
      if (!this.$v.contenidoEntrevistaFamiliar.dniApoderado.$dirty) return errors;
      !this.$v.contenidoEntrevistaFamiliar.dniApoderado.required &&
        errors.push("Debe ingresar el Numero de Documento Obligatoriamente");
      !/^[0-9]{8}$/.test(this.contenidoEntrevistaFamiliar.dniApoderado) != false &&
        errors.push("El Numero de DNI debe poseer 8 digitos numericos");
      return errors;
    },
    errorFechaEntrevista() {
      const errors = [];
      if (!this.$v.contenidoEntrevistaFamiliar.fechaEntrevista.$dirty) return errors;
      !this.$v.contenidoEntrevistaFamiliar.fechaEntrevista.required &&
        errors.push("Debe ingresar la fecha de creacion obligatoriamente");
      var dateselected = new Date(this.contenidoEntrevistaFamiliar.fechaEntrevista);
      var maxdate = new Date();
      !(dateselected.getTime() > maxdate.getTime()) &&
        errors.push("La fecha no debe ser mayor a la actual");
      return errors;
    },
    errorObservaciones() {
      const errors = [];
      if (!this.$v.contenidoEntrevistaFamiliar.observaciones.$dirty) return errors;
      !this.$v.contenidoEntrevistaFamiliar.observaciones.required &&
        errors.push("Debe escribir un observacion obligatoriamente");
      !this.$v.contenidoEntrevistaFamiliar.observaciones.esParrafo &&
        errors.push("Las observaciones no deben contener caracteres especiales");
      return errors;
    },
  },
  validations() {
    const validacionfecha = (value)=>{
      var dateselected = new Date(value);
      var maxdate = new Date();
      return (dateselected.getTime() > maxdate.getTime()) 
    };
    return {
      contenidoEntrevistaFamiliar: {
        nombreApoderado: {
          esTexto,
          required,
          minLength: minLength(3)
        },
        apellidoApoderado: {
          esTexto,
          required,
          minLength: minLength(3)
        },
        dniApoderado: {
          required
        },
        fechaEntrevista: {
          validacionfecha,
          required
        },
        observaciones: {
          required,
          esParrafo
        },
      },
    };
  }
};
</script>

<style>
.swal2-container {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif !important;
}
</style>
