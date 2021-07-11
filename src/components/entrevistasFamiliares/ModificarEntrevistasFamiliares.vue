<template>
  <v-card>
    <v-card-title class="justify-center">Modificar Entrevista Familiar</v-card-title>
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
                v-model="documentoEntrevistaFamiliar.idresidente"
                filled
                chips
                dense
                outlined
                color="#009900"
                label="Seleccione un Residente"
                :item-text="select.value"
                item-value="id"
                @input="$v.documentoEntrevistaFamiliar.idresidente.$touch()"
                @blur="$v.documentoEntrevistaFamiliar.idresidente.$touch()"
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
            v-model.trim="documentoEntrevistaFamiliar.contenido.nombreApoderado"
            label="Nombre del apoderado"
            outlined
            color="#009900"
            @input="$v.documentoEntrevistaFamiliar.contenido.nombreApoderado.$touch()"
            @blur="$v.documentoEntrevistaFamiliar.contenido.nombreApoderado.$touch()"
            :error-messages="errorNombreApoderado"
          ></v-text-field>
          <v-text-field
            v-model.trim="documentoEntrevistaFamiliar.contenido.apellidoApoderado"
            label="Apellido del apoderado"
            outlined
            color="#009900"
            @input="$v.documentoEntrevistaFamiliar.contenido.apellidoApoderado.$touch()"
            @blur="$v.documentoEntrevistaFamiliar.contenido.apellidoApoderado.$touch()"
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
                v-model="documentoEntrevistaFamiliar.contenido.fechaEntrevista"
                label="Fecha de Entrevista"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                outlined
                @input="$v.documentoEntrevistaFamiliar.contenido.fechaEntrevista.$touch()"
                @blur="$v.documentoEntrevistaFamiliar.contenido.fechaEntrevista.$touch()"
                :error-messages="errorFechaEntrevista"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="documentoEntrevistaFamiliar.contenido.fechaEntrevista"
              @input="menu = false"
              locale="es-es"
            ></v-date-picker>
          </v-menu>
          <v-text-field
            v-model="documentoEntrevistaFamiliar.contenido.dniApoderado"
            outlined
            @input="$v.documentoEntrevistaFamiliar.contenido.dniApoderado.$touch()"
            @blur="$v.documentoEntrevistaFamiliar.contenido.dniApoderado.$touch()"
            :error-messages="errorNumeroDocumentoApoderado"
            label="N° de documento del apoderado"
            color="#009900"
          ></v-text-field>
          <v-text-field
            v-model="documentoEntrevistaFamiliar.contenido.observaciones"
            color="#009900"
            label="Observaciones"
            @input="$v.documentoEntrevistaFamiliar.contenido.observaciones.$touch()"
            @blur="$v.documentoEntrevistaFamiliar.contenido.observaciones.$touch()"
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
              <v-btn block @click="modificarEntrevistaFamiliar()" color="success">
                <v-icon left>mdi-content-save-all-outline</v-icon>
                <span>Modificar</span>
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
import axios from "axios"; //Para las llamadas a las apis
import Vuelidate from "vuelidate"; //Para las validaciones
import { mapMutations, mapState, mapGetters } from "vuex";
//Para una sola palabra o frase
function esTexto(value) {
  return /^[A-Za-z\sáéíóúÁÉÍÓÚñÑ]+$/.test(value); 
}
//Para oraciones o parrafos
function esParrafo(value) {
  return /^[A-Za-z\d\s.,;°"“()áéíóúÁÉÍÓÚñÑ]+$/.test(value); 
}
export default {
  name:"ModificarEntrevistasFamiliares",
  props:["documentoEntrevistaFamiliar","dialogoactualizacion"],
  data() {
    return {
      datemenu: false,
      menu: false,
      select: { value: "1", text: "Nombre" },
      items: [
        { value: "nombre", text: 'Nombre'},
        { value: "apellido", text: 'Apellido'},
        { value: "numeroDocumento", text: 'Numero Documento'},
      ],
      residenteArray:[],
    };
  },
  methods: {
    ...mapMutations(["replaceEntrevistaFamiliar","setResidentes"]),
    cerrarDialogo() {
      this.$emit("close-dialog-update");
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
    retornarNombreCompleto(){
      for (let i = 0; i < this.residentes.length; i++) {
        if(this.residentes[i].id = this.documentoEntrevistaFamiliar.idresidente){
          return this.residentes[i].nombre + " " + this.residentes[i].apellido;
        }
        
      }
    },
    retornarNumeroDNI(){
      for (let i = 0; i < this.residentes.length; i++) {
        if(this.residentes[i].id = this.documentoEntrevistaFamiliar.idresidente){
          return this.residentes[i].numeroDocumento;
        }
      }
    },

    //Modificar la entrevista Familiar
    async modificarEntrevistaFamiliar() {
      this.$v.documentoEntrevistaFamiliar.$touch();
      if (this.$v.documentoEntrevistaFamiliar.$invalid) {
        this.mensaje(
          "error",
          "..Oops",
          "Se encontraron errores en el formulario",
          "<strong>Verifique los campos Ingresados<strong>"
        );
      } else {
        
        var documento = {
          area: this.documentoEntrevistaFamiliar.area,
          estado: this.documentoEntrevistaFamiliar.estado,
          creadordocumento: this.documentoEntrevistaFamiliar.creadordocumento,
          fase: this.documentoEntrevistaFamiliar.fase,
          fechacreacion: this.documentoEntrevistaFamiliar.fechacreacion,
          historialcontenido: this.documentoEntrevistaFamiliar.historialcontenido,
          id: this.documentoEntrevistaFamiliar.id,
          idresidente: this.documentoEntrevistaFamiliar.idresidente,
          tipo: this.documentoEntrevistaFamiliar.tipo,
          contenido:{
            apellidoApoderado: this.documentoEntrevistaFamiliar.contenido.apellidoApoderado,
            dniApoderado: this.documentoEntrevistaFamiliar.contenido.dniApoderado,
            fechaEntrevista: this.documentoEntrevistaFamiliar.contenido.fechaEntrevista,
            nombreApoderado: this.documentoEntrevistaFamiliar.contenido.nombreApoderado,
            observaciones: this.documentoEntrevistaFamiliar.contenido.observaciones,
          }
        }
        console.log("obj a enviar:");
        console.log(documento);
        await axios
          .put("/Documento/entrevistafamiliar", documento)
          .then((res)=> {
            var info = {};
            info = res.data;
            info.contenido.fechaEntrevista = res.data.contenido.fechaEntrevista.split("T")[0];
            var nombreCompletoResidente = this.retornarNombreCompleto();
            var numeroResidente = this.retornarNumeroDNI();
            var objDocumentoContenido = { 
              datosresidente:{
                nombrecompleto: nombreCompletoResidente,
                numerodocumento: numeroResidente
              }
            };
            info.contenido = Object.assign(info.contenido, objDocumentoContenido);
            var nombreCompletoApoderado = info.contenido.nombreApoderado + " " + info.contenido.apellidoApoderado;
            const ApoderadoCompleto = { nombrecompleto: nombreCompletoApoderado};
            info.contenido = Object.assign(info.contenido, ApoderadoCompleto);

            this.replaceEntrevistaFamiliar(info);
            console.log(info);
            this.$v.documentoEntrevistaFamiliar.$reset();
            this.cerrarDialogo();
          })
          .catch(err => console.log(err));
        await this.mensaje(
          "success",
          "listo",
          "Entrevista Familiar modificada Satisfactoriamente",
          "<strong>Se redirigira a la Interfaz de Gestion<strong>"
        );
      }
    },
  },
  async created(){
    await this.obtenerResidentes();
    this.residenteArray = this.residentes;
    console.log(this.documentoEntrevistaFamiliar);
  },
  watch:{
    dialogoregistro: async function(dialogoregistro){
      if(dialogoregistro){
        await this.obtenerResidentes();
        this.residenteArray = this.residentes;
        console.log(this.documentoEntrevistaFamiliar);
      }
    }
  },
  computed:{
    ...mapState(["residentes"]),
    errorResidente() {
      const errors = [];
      if (!this.$v.documentoEntrevistaFamiliar.idresidente.$dirty) return errors;
      !this.$v.documentoEntrevistaFamiliar.idresidente.required &&
        errors.push("Debe seleccionar un residente obligatoriamente");
      return errors;
    },
    errorNombreApoderado() {
      const errors = [];
      if (!this.$v.documentoEntrevistaFamiliar.contenido.nombreApoderado.$dirty) return errors;
      !this.$v.documentoEntrevistaFamiliar.contenido.nombreApoderado.required &&
        errors.push("Debe ingresar un Nombre Obligatoriamente");
      !this.$v.documentoEntrevistaFamiliar.contenido.nombreApoderado.minLength &&
        errors.push("El Nombre debe tener al menos 3 caracteres");
      !this.$v.documentoEntrevistaFamiliar.contenido.nombreApoderado.esTexto &&
        errors.push("El Nombre no debe contener caracteres especiales");
      return errors;
    },
    errorApellidoApoderado() {
      const errors = [];
      if (!this.$v.documentoEntrevistaFamiliar.contenido.apellidoApoderado.$dirty) return errors;
      !this.$v.documentoEntrevistaFamiliar.contenido.apellidoApoderado.required &&
        errors.push("Debe ingresar un Apellido Obligatoriamente");
      !this.$v.documentoEntrevistaFamiliar.contenido.apellidoApoderado.minLength &&
        errors.push("El Apellido debe tener al menos 3 caracteres");
      !this.$v.documentoEntrevistaFamiliar.contenido.apellidoApoderado.esTexto &&
        errors.push("El Apellido no debe contener caracteres especiales");
      return errors;
    },
    errorNumeroDocumentoApoderado() {
      const errors = [];
      if (!this.$v.documentoEntrevistaFamiliar.contenido.dniApoderado.$dirty) return errors;
      !this.$v.documentoEntrevistaFamiliar.contenido.dniApoderado.required &&
        errors.push("Debe ingresar el Numero de Documento Obligatoriamente");
      !/^[0-9]{8}$/.test(this.documentoEntrevistaFamiliar.contenido.dniApoderado) != false &&
        errors.push("El Numero de DNI debe poseer 8 digitos numericos");
      return errors;
    },
    errorFechaEntrevista() {
      const errors = [];
      if (!this.$v.documentoEntrevistaFamiliar.contenido.fechaEntrevista.$dirty) return errors;
      !this.$v.documentoEntrevistaFamiliar.contenido.fechaEntrevista.required &&
        errors.push("Debe ingresar la fecha de creacion obligatoriamente");
      var dateselected = new Date(this.documentoEntrevistaFamiliar.contenido.fechaEntrevista);
      var maxdate = new Date();
      !(dateselected.getTime() < maxdate.getTime()) &&
        errors.push("La fecha no debe ser mayor a la actual");
      return errors;
    },
    errorObservaciones() {
      const errors = [];
      if (!this.$v.documentoEntrevistaFamiliar.contenido.observaciones.$dirty) return errors;
      !this.$v.documentoEntrevistaFamiliar.contenido.observaciones.required &&
        errors.push("Debe escribir un observacion obligatoriamente");
      !this.$v.documentoEntrevistaFamiliar.contenido.observaciones.esParrafo &&
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
      documentoEntrevistaFamiliar:{
        idresidente:{
          required
        },
        contenido: {
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
      }, 
    };
  }
};
</script>