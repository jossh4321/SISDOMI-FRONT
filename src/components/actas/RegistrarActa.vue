<template>
  <v-card>
    <v-card-title class="justify-center">Registrar Acta de externamiento</v-card-title>

    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step editable step="1"> Registro de Datos </v-stepper-step>

        <v-divider></v-divider>

        
      </v-stepper-header>

      <v-stepper-items>
      
        <v-stepper-content step="1">
          <div class="container-user">
            <form>

              <v-autocomplete
                v-model="actaexternamiento.datos.idresidente"
                :items="listaActas"
                filled
                chips
                dense
                outlined
                color="#009900"
                label="Seleccione un residente del Sistema"
                item-text="nombre"
                item-value="id"
                @input="$v.actaexternamiento.datos.idresidente.$touch()"
                @blur="$v.actaexternamiento.datos.idresidente.$touch()"
                :error-messages="erroridresidente"
              >
                <template v-slot:selection="data">
                  <v-chip
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    style="margin-top: 5px"
                  >
                    <v-avatar left color="#b3b3ff" size="24">
                      <span style="font-size: 12px">RT</span>
                    </v-avatar>
                    {{ data.item.nombre + " " + data.item.apellido }}
                  </v-chip>
                </template>
                <template v-slot:item="data">
                  <template>
                    <v-list-item-avatar>
                      <v-avatar left color="#b3b3ff" size="24">
                        <span style="font-size: 12px">RT</span>
                      </v-avatar>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title
                        >Rol: {{ data.item.nombre + " " + data.item.apellido }}</v-list-item-title
                      >
                      <v-list-item-subtitle
                        >Area: {{ data.item.area }}</v-list-item-subtitle
                      >
                      <v-list-item-subtitle
                        >descripcion:
                        {{ data.item.descripcion }}</v-list-item-subtitle
                      >
                    </v-list-item-content>
                  </template>
                </template>
              </v-autocomplete>

                
             

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
                    v-model="actaexternamiento.datos.fechacreacion"
                    label="Ingrese fecha creacion"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    @input="$v.actaexternamiento.datos.fechacreacion.$touch()"
                @blur="$v.actaexternamiento.datos.fechacreacion.$touch()"
                :error-messages="errorfechacreacion"
                    color="#009900"
                    outlined
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="actaexternamiento.datos.fechacreacion"
                  @input="datemenu = false"
                  locale="es-es"
                ></v-date-picker>
              </v-menu>

               <v-text-field
               v-model="actaexternamiento.datos.entidaddisposicion"
          label="Ingrese nueva entidad disposicion"
                outlined
               @input="$v.actaexternamiento.datos.entidaddisposicion.$touch()"
                @blur="$v.actaexternamiento.datos.entidaddisposicion.$touch()"
                :error-messages="errorentidaddisposicion"
                class="inputTextField"
                color="#009900"
              ></v-text-field>


 <v-text-field
               v-model="actaexternamiento.datos.numeroresolucion"
          label="Ingrese nuevo numero resolucion"
                outlined
               @input="$v.actaexternamiento.datos.numeroresolucion.$touch()"
                @blur="$v.actaexternamiento.datos.numeroresolucion.$touch()"
                :error-messages="errornumeroresolucion"
                class="inputTextField"
                color="#009900"
              ></v-text-field>


               <v-text-field
               v-model="actaexternamiento.datos.numerooficio"
          label="Ingrese nuevo numero oficio"
                outlined
               @input="$v.actaexternamiento.datos.numerooficio.$touch()"
                @blur="$v.actaexternamiento.datos.numerooficio.$touch()"
                :error-messages="errornumerooficio"
                class="inputTextField"
                color="#009900"
              ></v-text-field>


               <v-text-field
               v-model="actaexternamiento.datos.observaciones"
          label="Ingrese nuevas observaciones"
                outlined
               @input="$v.actaexternamiento.datos.observaciones.$touch()"
                @blur="$v.actaexternamiento.datos.observaciones.$touch()"
                :error-messages="errorobservaciones"
                class="inputTextField"
                color="#009900"
              ></v-text-field>

              



            

                
              <div>
                <vue-dropzone
                  ref="myVueDropzone"
                  @vdropzone-success="afterSuccess"
                  @vdropzone-removed-file="afterRemoved"
                  id="dropzone"
                  :options="dropzoneOptions"
                >
                </vue-dropzone>
              </div>
              <v-card v-if="errorImagen" color="red">
                <v-card-text class="text-center" style="color: white"
                  >Debe Subir una imagen del Usuario
                  Obligatoriamente</v-card-text
                >
              </v-card>
              <v-divider class="divider-custom"></v-divider>
              <v-row>
                <v-col>
                  <v-btn block @click="registrarUsuario" color="success">
                    <v-icon left>mdi-content-save-all-outline</v-icon>
                    <span>Registrar Acta</span>
                  </v-btn>
                </v-col>
                <v-col>
                  <v-btn block @click="cerrarDialogo()" color="primary">
                    <v-icon left>mdi-close-outline</v-icon>
                    <span>Cerrar</span>
                  </v-btn>
                </v-col>
              </v-row>
            </form>
          </div>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-card>
</template>
<script>
import axios from "axios";
import Vue from 'vue'
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import { mapMutations, mapState } from "vuex";
import { required, minLength, email, helpers } from "vuelidate/lib/validators";
import moment from "moment";
export default {
  props: ["listaActas"],
  components: {
    vueDropzone: vue2Dropzone,
  },
  data() {
    return {
      datemenu: false,
      step: 1,
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 250,
        maxFilesize: 3.0,
        maxFiles: 1,
        acceptedFiles: ".jpg, .png, jpeg",
        headers: { "My-Awesome-Header": "header value" },
        addRemoveLinks: true,
        dictDefaultMessage:
          "Seleccione una Imagen de su Dispositivo o Arrastrela Aqui",
      }, //utilizado en los formularios como un prop
      actaexternamiento: {
        
        datos: {
       id: "",
        fechacreacion:"",
        
        idresidente:"",       
        
        entidaddisposicion:"",  
        numeroresolucion:"",  
        numerooficio:"",  
        observaciones:"",
        
        imagen:""
        },
      },
    };
  },
  created() {},
  methods: {
    ...mapMutations(["setUsuarios", "addUsuario"]),
    async registrarUsuario() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log("hay errores");
        this.mensaje(
          "error",
          "..Oops",
          "Se encontraron errores en el formulario",
          "<strong>Verifique los campos Ingresados<strong>"
        );
      } else {
        console.log("no hay errores");
        await axios
          .post("/usuario", this.actaexternamiento)
          .then((res) => {
            console.log(this.actaexternamiento)
            this.actaexternamiento = res.data;
            this.addUsuario(this.actaexternamiento);
            this.cerrarDialogo();
          })
          .catch((err) => console.log(err));
        await this.mensaje(
          "success",
          "listo",
          "Acta registrada Satisfactoriamente",
          "<strong>Se redirigira a la Interfaz de Gestion<strong>"
        );
      }
    },
    resetUsuarioValidationState() {
      this.$refs.myVueDropzone.removeAllFiles();
      this.$v.actaexternamiento.$reset();
    },
    cerrarDialogo() {
      this.actaexternamiento = this.limpiarUsuario();
      this.step = 1;
      this.resetUsuarioValidationState();
      this.$emit("close-dialog-save");
    },
    afterSuccess(file, response) {
      console.log(file);
      this.actaexternamiento.datos.imagen = file.dataURL.split(",")[1];
      this.$v.actaexternamiento.datos.imagen.$model = file.dataURL.split(",")[1];
      //console.log(file.dataURL.split(",")[1]);
    },
    afterRemoved(file, error, xhr) {
      this.actaexternamiento.datos.imagen = "";
      this.$v.actaexternamiento.datos.imagen.$model = "";
    },
    async mensaje(icono, titulo, texto, footer) {
      await this.$swal({
        icon: icono,
        title: titulo,
        text: texto,
        footer: footer,
      });
    },
    limpiarUsuario() {
      return {
       
        datos: {
       id: "",
        fechacreacion:"",
       
        
        idresidente:" ",       
        
        entidaddisposicion:" ",  
        numeroresolucion:" ",  
        numerooficio:" ",  
        observaciones:" ",
        
        imagen:""
        },
      };
    },
  },
  computed: {
    ...mapState(["usuarios"]),
    verifyColor() {
      return "red";
   
    },
    
    erroridresidente () {
      const errors = []
      if (!this.$v.actaexternamiento.datos.idresidente.$dirty) return errors
          !this.$v.actaexternamiento.datos.idresidente.required && errors.push('Debe ingresar el idresidente Obligatoriamente')
          
      return errors
      },
    errorfechacreacion () {
      const errors = []
      if (!this.$v.actaexternamiento.datos.fechacreacion.$dirty) return errors
          !this.$v.actaexternamiento.datos.fechacreacion.required && errors.push('Debe Ingresar una Fecha de Creacion Obligatoriamente')
        
          var dateselected =  new Date(this.actaexternamiento.fechacreacion);
          var maxdate = new Date();
          maxdate.setFullYear(maxdate.getFullYear());
          
      return errors
    },
          errorentidaddisposicion () {
      const errors = []
      if (!this.$v.actaexternamiento.datos.entidaddisposicion.$dirty) return errors
          !this.$v.actaexternamiento.datos.entidaddisposicion.required && errors.push('Debe ingresar entidad disposicion Obligatoriamente')
          
      return errors
      },
          errornumeroresolucion () {
      const errors = []
      if (!this.$v.actaexternamiento.datos.numeroresolucion.$dirty) return errors
          !this.$v.actaexternamiento.datos.numeroresolucion.required && errors.push('Debe ingresar el numero resolucion Obligatoriamente')
          
      return errors
      },
          errornumerooficio () {
      const errors = []
      if (!this.$v.actaexternamiento.datos.numerooficio.$dirty) return errors
          !this.$v.actaexternamiento.datos.numerooficio.required && errors.push('Debe ingresar el numero oficio Obligatoriamente')
          
      return errors
      },
          errorobservaciones () {
      const errors = []
      if (!this.$v.actaexternamiento.datos.observaciones.$dirty) return errors
          !this.$v.actaexternamiento.datos.observaciones.required && errors.push('Debe ingresar observaciones Obligatoriamente')
          
      return errors
    },
    errorImagen() {
      return this.$v.actaexternamiento.datos.imagen.required == false &&
        this.$v.actaexternamiento.datos.imagen.$dirty == true
        ? true
        : false; 
    },
  },
  validations() {
    return {
      actaexternamiento: {
             
        
        
        datos: {
        
                 
              idresidente:{
                  required
                                
              
                },fechacreacion:{
                  required
             
                 
                     },
              entidaddisposicion:{
                  required
                     },
              numeroresolucion:{
                  required
                     },
              numerooficio:{
                  required
                     },
              observaciones:{
                  required
                    },

        
                imagen:{
                  required,
          
                },
        },
      },
    };
  },
};
</script>
<style  scoped>
.container-user {
  margin: 15px;
}

.dropzone-custom-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.dropzone-custom-title {
  margin-top: 0;
  color: #00b782;
}

.subtitle {
  color: #314b5f;
}
.divider-custom {
  margin-top: 7px;
  margin-bottom: 7px;
}

.inputTextField {
  border-color: green;
}
</style>