<template>
  <v-card>
    <v-card-title class="justify-center">Registrar Acta de externamiento</v-card-title>

    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step editable step="1"> Datos Generales </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step editable step="2">     Registro de Datos </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <div class="container-user">
            <form>
              <v-text-field
                v-model="usuario.datos.CreadorDocumento"
          label="Ingrese el Creador Documento"
                outlined
                @input="$v.usuario.datos.CreadorDocumento.$touch()"
                @blur="$v.usuario.datos.CreadorDocumento.$touch()"
                :error-messages="errorCreadorDocumento"
                color="#009900"
              ></v-text-field>
              <v-text-field
                v-model="usuario.datos.fechacreacion"
          label="Ingrese fecha creacion"
                outlined
                @input="$v.usuario.datos.fechacreacion.$touch()"
                @blur="$v.usuario.datos.fechacreacion.$touch()"
                :error-messages="errorfechacreacion"
                color="#009900"
              ></v-text-field>
                <v-text-field
                v-model="usuario.datos.area"
          label="Ingrese el area"
                outlined
                @input="$v.usuario.datos.area.$touch()"
                @blur="$v.usuario.datos.area.$touch()"
                :error-messages="errorarea"
                color="#009900"
              ></v-text-field>
            
              <v-text-field
                v-model="usuario.datos.fase"
          label="Ingrese la fase"
                outlined
                @input="$v.usuario.datos.fase.$touch()"
                @blur="$v.usuario.datos.fase.$touch()"
                :error-messages="errorfase"
                color="#009900"
              ></v-text-field>
            
             
              <v-row>
                <v-col>
                  <v-btn block @click="step = 2" color="success">
                    <v-icon left>mdi-page-next-outline</v-icon>
                    <span>Continuar</span>
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
        <v-stepper-content step="2">
          <div class="container-user">
            <form>
              <v-text-field
                v-model="usuario.idresidente"
          label="Ingrese nuevo idresidente"
                outlined
                @input="$v.usuario.idresidente.$touch()"
                @blur="$v.usuario.idresidente.$touch()"
                :error-messages="erroridresidente"
                class="inputTextField"
                color="#009900"
              ></v-text-field>

                <v-text-field
                v-model="usuario.estado"
          label="Ingrese nuevo estado"
                outlined
                @input="$v.usuario.estado.$touch()"
                @blur="$v.usuario.estado.$touch()"
                :error-messages="estado"
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
  props: ["listaroles"],
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
      usuario: {
        
        datos: {
        CreadorDocumento:" ",
        fechacreacion:" ",
        area:" ",
        fase:" ", 
        idresidente:" ",       
        estado:" ",
        
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
          .post("/usuario", this.usuario)
          .then((res) => {
            console.log(this.usuario)
            this.usuario = res.data;
            this.addUsuario(this.usuario);
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
      this.$v.usuario.$reset();
    },
    cerrarDialogo() {
      this.usuario = this.limpiarUsuario();
      this.step = 1;
      this.resetUsuarioValidationState();
      this.$emit("close-dialog-save");
    },
    afterSuccess(file, response) {
      console.log(file);
      this.usuario.datos.imagen = file.dataURL.split(",")[1];
      this.$v.usuario.datos.imagen.$model = file.dataURL.split(",")[1];
      //console.log(file.dataURL.split(",")[1]);
    },
    afterRemoved(file, error, xhr) {
      this.usuario.datos.imagen = "";
      this.$v.usuario.datos.imagen.$model = "";
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
        CreadorDocumento:" ",
        fechacreacion:" ",
        area:" ",
        fase:" ", 
        idresidente:" ",       
        estado:" ",
        },
      };
    },
  },
  computed: {
    ...mapState(["usuarios"]),
    verifyColor() {
      return "red";
    },
    errorNombreUsuario() {
      const errors = [];
      if (!this.$v.usuario.usuario.$dirty) return errors;
      !this.$v.usuario.usuario.required &&
        errors.push("Debe ingresar un Nombre de Usuario Obligatoriamente");
      !this.$v.usuario.usuario.minLength &&
        errors.push("El Nombre de Usuario debe poseer al menos 4 caracteres");

      return errors;
    },
    errorNombre () {
      const errors = []
      if (!this.$v.usuario.datos.CreadorDocumento.$dirty) return errors
          !this.$v.usuario.datos.CreadorDocumento.required && errors.push('Debe ingresar un Nombre Obligatoriamente')
          !this.$v.usuario.datos.CreadorDocumento.minLength && errors.push('El Nombre debe tener al menos 3 caracteres')
      return errors
    },
    errorApellido () {
      const errors = []
      if (!this.$v.usuario.datos.area.$dirty) return errors
          !this.$v.usuario.datos.area.required && errors.push('Debe ingresar un area Obligatoriamente')
          !this.$v.usuario.datos.area.minLength && errors.push('El area debe tener al menos 3 caracteres')
      return errors
    },
    errorNumeroDocumento () {
      const errors = []
      if (!this.$v.usuario.datos.idresidente.$dirty) return errors
          !this.$v.usuario.datos.idresidente.required && errors.push('Debe ingresar el idresidente Obligatoriamente')
          
      return errors
      },
    errorFechaNacimiento () {
      const errors = []
      if (!this.$v.usuario.datos.fechacreacion.$dirty) return errors
          !this.$v.usuario.datos.fechacreacion.required && errors.push('Debe Ingresar una Fecha de Creacion Obligatoriamente')
          //validating whether the user are an adult
          var dateselected =  new Date(this.usuario.datos.fechacreacion);
          var maxdate = new Date();
          maxdate.setFullYear(maxdate.getFullYear());
          
      return errors
    },
     errorEmail () {
      const errors = []
      if (!this.$v.usuario.datos.fase.$dirty) return errors
          !this.$v.usuario.datos.fase.required && errors.push('Debe ingresar la fase Obligatoriamente')
          
      return errors
       
    },errorEstado(){
                const errors = []
      if (!this.$v.usuario.estado.$dirty) return errors
          !this.$v.usuario.estado.required && errors.push('Debe seleccionar un Estado obligatoriamente')
          return errors
    },
    errorImagen() {
      return this.$v.usuario.datos.imagen.required == false &&
        this.$v.usuario.datos.imagen.$dirty == true
        ? true
        : false; 
    },
  },
  validations() {
    return {
      usuario: {
        usuario: {
          required,
          minLength: minLength(4),
        },
        rol: {
          required,
        },
        estado: {
          required,
        },
        datos: {
          CreadorDocumento:{
                required,
                minLength: minLength(3)
              },
              area:{
                required,
                minLength: minLength(3)
                             
                
                },
              idresidente:{
                  required
                                
                },fase:{
                  required,
                  minLength: minLength(10)
                },fechacreacion:{
                  required
                },estado:{
                  required,
                  minLength: minLength(10)
                },imagen:{
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