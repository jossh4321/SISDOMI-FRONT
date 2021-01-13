<template>
  <v-card>
    <v-card-title class="justify-center">Registrar Nueva Entrevista Familiar</v-card-title>
    <div class="container-user">
      <v-card style="padding:1% 3%">
        <form style="margin-top: 15px">
          <v-row no-gutters>
            <v-col cols="3">
              <v-select
                style="margin-top:6%;margin-right:6%"
                v-model="select"
                :items="items"
                item-text="text"
                item-value="value"
                label="Filtrar por:"
                return-object
                outlined
                dense
              ></v-select>
            </v-col>
            <v-col cols="9">
              <v-autocomplete
                style="margin-top:2%"
                :items="residentes"
                v-model="documento.idresidente"
                filled
                chips
                dense
                outlined
                color="#009900"
                label="Seleccione un Residente"
                :item-text="select.value"
                item-value="id"
                @input="$v.documento.idresidente.$touch()"
                @blur="$v.documento.idresidente.$touch()"
                :error-messages="errorResidente"
              >
                <template v-slot:selection="data">
                  <v-chip
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    style="margin-top:5px"
                  >
                    <v-avatar left color="#b3b3ff" size="24">
                      <span style="font-size:12px">RT</span>
                    </v-avatar>
                    {{ data.item.nombre }} {{ data.item.apellido }} 
                  </v-chip>
                </template>
                <template v-slot:item="data">
                  <template>
                    <v-list-item-avatar>
                      <v-avatar left color="#b3b3ff" size="24">
                        <span style="font-size:12px">RE</span>
                      </v-avatar>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title
                        >Nombre completo: {{ data.item.nombre }}
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
            </v-col>
          </v-row>
          
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
import { mapMutations, mapState, mapGetters } from "vuex";
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
  name:"RegistrarEntrevistasFamiliares",
  props:["dialogoregistro"],
  data() {
    return {
      select: { value: "1", text: "Nombre" },
      items: [
        { value: "nombre", text: 'Nombre'},
        { value: "apellido", text: 'Apellido'},
        { value: "numeroDocumento", text: 'Numero Documento'},
      ],
      datemenu: false,
      menu: false,
      residenteArray:[],
      documento:{
        tipo:"EntrevistaFamiliar",
        historialcontenido:[],
        creadordocumento:"",
        fechacreacion: null,
        area:"social",
        fase:"1",
        idresidente:"",
        estado:"creado",
        contenido:{}
      },
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
    ...mapMutations(["setResidentes","addEntrevistaFamiliar"]),
    //moment: function() {
    //  return moment();
    //},

    ///CERRAR DIALOGO
    cerrarDialogo() {
      this.contenidoEntrevistaFamiliar= this.limpiarEntrevistaFamiliar();
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
    async obtenerResidentes() {
      await axios
        .get("/residente/all")
        .then((res) => {
          var info = {};
          info = res.data;
          for (var x=0;x<res.data.length;x++){
              info[x].fechaIngreso = res.data[x].fechaIngreso.split("T")[0];
          }    
          this.setResidentes(info);
        })
        .catch((err) => console.log(err));
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

        this.documento.contenido = this.contenidoEntrevistaFamiliar;
        console.log("obj a enviar:");
        console.log(this.documento);
        await axios
          .post("/Documento/entrevistafamiliar", this.documento)
          .then((res)=> {
            var info = {};
            info = res.data;
            for (var x=0;x<res.data.length;x++){
                info[x].contenido.fechaEntrevista = res.data[x].contenido.fechaEntrevista.split("T")[0];
                var nombreCompletoResidente = info[x].contenido.datosresidente.nombre + " " + info[x].contenido.datosresidente.apellido
                const ResidenteCompleto = { nombrecompleto: nombreCompletoResidente};
                info[x].contenido.datosresidente = Object.assign(info[x].contenido.datosresidente, ResidenteCompleto);
                var nombreCompletoApoderado = info[x].contenido.nombreApoderado + " " + info[x].contenido.apellidoApoderado;
                const ApoderadoCompleto = { nombrecompleto: nombreCompletoApoderado};
                info[x].contenido = Object.assign(info[x].contenido, ApoderadoCompleto);
            }
            
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
  async created(){
    await this.obtenerResidentes();
    this.residenteArray = this.residentes;
    this.documento.creadordocumento = this.user.id;
  },
  watch:{
    dialogoregistro: async function(dialogoregistro){
      if(dialogoregistro){
        await this.obtenerResidentes();
        this.residenteArray = this.residentes;
        this.documento.creadordocumento = this.user.id;
      }
    }
  },
  computed: {
    ///validaciones
    ...mapState(["residentes"]),
    ...mapGetters(["user"]),
    // verifyColor() {
    //   return "red";
    // },
    errorResidente() {
      const errors = [];
      if (!this.$v.documento.idresidente.$dirty) return errors;
      !this.$v.documento.idresidente.required &&
        errors.push("Debe seleccionar un residente obligatoriamente");
      return errors;
    },
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
      !(dateselected.getTime() < maxdate.getTime()) &&
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
      return (dateselected.getTime() < maxdate.getTime()) 
    };
    return {
      documento:{
        idresidente:{
          required
        }
      },
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
