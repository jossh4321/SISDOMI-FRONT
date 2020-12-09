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
                v-model="usuario.datos.nombreusuaria"
          label="Ingrese el nombre del Acta"
                outlined
                @input="$v.usuario.datos.nombreusuaria.$touch()"
                @blur="$v.usuario.datos.nombreusuaria.$touch()"
                :error-messages="errorNombreusuaria"
                color="#009900"
              ></v-text-field>
              <v-text-field
                v-model="usuario.datos.nombreplan"
          label="Ingrese el nombre-dni de la usuaria"
                outlined
                @input="$v.usuario.datos.nombreplan.$touch()"
                @blur="$v.usuario.datos.nombreplan.$touch()"
                :error-messages="errorNombreplan"
                color="#009900"
              ></v-text-field>
                <v-text-field
                v-model="usuario.datos.objetivogeneral"
          label="Ingrese el objetivo general"
                outlined
                @input="$v.usuario.datos.objetivogeneral.$touch()"
                @blur="$v.usuario.datos.objetivogeneral.$touch()"
                :error-messages="errorObjetivogeneral"
                color="#009900"
              ></v-text-field>
            
              <v-text-field
                v-model="usuario.datos.objetivoespecifico"
          label="Ingrese los objetivos específicos"
                outlined
                @input="$v.usuario.datos.objetivoespecifico.$touch()"
                @blur="$v.usuario.datos.objetivoespecifico.$touch()"
                :error-messages="errorObjetivoespecifico"
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
                v-model="usuario.nombre_acta"
          label="Ingrese nuevo nombre de Acta"
                outlined
                @input="$v.usuario.nombre_acta.$touch()"
                @blur="$v.usuario.nombre_acta.$touch()"
                :error-messages="errorNombre_acta"
                class="inputTextField"
                color="#009900"
              ></v-text-field>

                <v-text-field
                v-model="usuario.actividades_estrategias"
          label="Ingrese nuevo nombre-dni de Usuario"
                outlined
                @input="$v.usuario.actividades_estrategias.$touch()"
                @blur="$v.usuario.actividades_estrategias.$touch()"
                :error-messages="errorActividades_estrategias"
                class="inputTextField"
                color="#009900"
              ></v-text-field>

                <v-text-field
                v-model="usuario.indicadores"
          label="Ingrese nuevo objetivo general"
                outlined
                @input="$v.usuario.indicadores.$touch()"
                @blur="$v.usuario.indicadores.$touch()"
                :error-messages="errorIndicadores"
                class="inputTextField"
                color="#009900"
              ></v-text-field>

                <v-text-field
                v-model="usuario.meta"
          label="Ingrese nuevos objetivos especificos"
                outlined
                @input="$v.usuario.meta.$touch()"
                @blur="$v.usuario.meta.$touch()"
                :error-messages="errorMeta"
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
             
        
              </v-card>
              <v-divider class="divider-custom"></v-divider>
        <v-row>
          <v-col>
              <v-btn block @click="actualizarUsuario()" color="warning">
              <v-icon left>mdi-content-save-all-outline</v-icon>
              <span >Actualizar Usuario</span>
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
import axios from 'axios';
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import { mapMutations, mapState} from "vuex";
import { required, minLength,email,helpers } from 'vuelidate/lib/validators'
import moment from 'moment'
export default {
   props:["usuario","listaroles"],
   components: {
    vueDropzone: vue2Dropzone,
  },
  data() {
    return {
      datemenu: false,
      step:1,
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 250,
        maxFilesize: 3.0,
        maxFiles:1,
        acceptedFiles:".jpg",
        headers: { "My-Awesome-Header": "header value" },
        addRemoveLinks: true,
         dictDefaultMessage: "Seleccione una Imagen de su Dispositivo o Arrastrela Aqui",
      },imagen:{tipo:"url",modificado:"no"}
    };
  },async created(){
  },
  mounted(){
  },
  methods:{
    ...mapMutations(["setUsuarios","addUsuario","replaceUsuario"]),
    mounteddropzone(){
      var file = { size: 123, name: "Imagen de Perfil", type: "image/jpg" };
      this.$refs.myVueDropzone.manuallyAddFile(file, this.usuario.datos.imagen,null,null,true);      
    },
    async actualizarUsuario(){
       this.$v.$touch();
      if (this.$v.$invalid) {
        console.log('hay errores');
        this.mensaje('error','..Oops','Se encontraron errores en el formulario',"<strong>Verifique los campos Ingresados<strong>");
      } else {
        console.log('no hay errores');
        await axios.put("/usuario?tipo="+this.imagen.tipo+"&modificado="+this.imagen.modificado,this.usuario)
          .then(res => {
            var resultado = res.data;
            this.replaceUsuario(resultado);
            this.cerrarDialogo();
          }).catch(err => console.log(err));
          await this.mensaje('success','listo','Usuario Actualizado Satisfactoriamente',"<strong>Se redirigira a la Interfaz de Gestion<strong>");
      }
    },
    resetUsuarioValidationState(){
        this.$refs.myVueDropzone.removeAllFiles();
        this.$v.usuario.$reset();
    },
    cerrarDialogo(){
      this.resetUsuarioValidationState();
      this.$emit("close-dialog-update");
    },
    afterSuccess(file,response){
       this.usuario.datos.imagen = file.dataURL.split(",")[1];
       this.$v.usuario.datos.imagen.$model = file.dataURL.split(",")[1];
       this.imagen ={ tipo: "base64", modificado:"si"};
    },
    afterRemoved(file, error, xhr){
      this.usuario.datos.imagen = "";
       this.$v.usuario.datos.imagen.$model = "";
    }
    ,async mensaje(icono,titulo,texto,footer){
      await this.$swal({
        icon: icono,
        title: titulo,
        text: texto,
        footer:footer
      });
    }
  },
  watch:{
  },
  computed:{
    ...mapState(["usuarios"]),
    verifyColor(){
        return 'red';
      },
     errorNombreUsuario () {
      const errors = []
      if (!this.$v.usuario.usuario.$dirty) return errors
          !this.$v.usuario.usuario.required && errors.push('Debe ingresar un Nombre de Usuario Obligatoriamente')
          !this.$v.usuario.usuario.minLength && errors.push('El Nombre de Usuario debe poseer al menos 4 caracteres')
      return errors
    },
    errorNombre () {
      const errors = []
      if (!this.$v.usuario.datos.nombre.$dirty) return errors
          !this.$v.usuario.datos.nombre.required && errors.push('Debe ingresar un Nombre Obligatoriamente')
          !this.$v.usuario.datos.nombre.minLength && errors.push('El Nombre debe tener al menos 3 caracteres')
      return errors
    },
    errorApellido () {
      const errors = []
      if (!this.$v.usuario.datos.apellido.$dirty) return errors
          !this.$v.usuario.datos.apellido.required && errors.push('Debe ingresar un Apellido Obligatoriamente')
          !this.$v.usuario.datos.apellido.minLength && errors.push('El apellido debe tener al menos 3 caracteres')
      return errors
    },
    errorNumeroDocumento () {
      const errors = []
      if (!this.$v.usuario.datos.numerodocumento.$dirty) return errors
          !this.$v.usuario.datos.numerodocumento.required && errors.push('Debe ingresar el Numero de Documento Obligatoriamente')
          !this.usuario.datos.tipodocumento != "" && errors.push('Debe seleccionar el Tipo de Documento Inicialmente')
          if(this.usuario.datos.tipodocumento == "DNI"){ !/^[0-9]{8}$/.test(this.usuario.datos.numerodocumento) != false && errors.push('El Numero de DNI debe poseer 8 digitos numericos')}
          if(this.usuario.datos.tipodocumento == "Pasaporte"){!/^(?!^0+$)[a-zA-Z0-9]{3,20}$/.test(this.usuario.datos.numerodocumento) != false && errors.push('El Numero de Pasaporte debe poseer de 3 a 20 caracteres alfanumericos')}
          if(this.usuario.datos.tipodocumento == "Carnet Extranjeria"){ !/^[0-9]{9}$/.test(this.usuario.datos.numerodocumento) != false && errors.push('El Numero de DNI debe poseer 9 digitos numericos')}
      return errors
    },
     errorTipoDocumento () {
      const errors = []
      if (!this.$v.usuario.datos.tipodocumento.$dirty) return errors
          !this.$v.usuario.datos.tipodocumento.required && errors.push('Debe seleccionar el Tipo de Documento Obligatoriamente')
      return errors
    },errorFechaNacimiento () {
      const errors = []
      if (!this.$v.usuario.datos.fechanacimiento.$dirty) return errors
          !this.$v.usuario.datos.fechanacimiento.required && errors.push('Debe Ingresar una Fecha de Nacimiento Obligatoriamente')
          //validating whether the user are an adult
          var dateselected =  new Date(this.usuario.datos.fechanacimiento);
          var maxdate = new Date();
          maxdate.setFullYear(maxdate.getFullYear()-18);
          !(dateselected.getTime()<= maxdate.getTime()) && errors.push('El usuario debe ser mayor de edad')

      return errors
    },
     errorEmail () {
      const errors = []
      if (!this.$v.usuario.datos.email.$dirty) return errors
          !this.$v.usuario.datos.email.required && errors.push('Debe ingresar el email Obligatoriamente')
          !this.$v.usuario.datos.email.email && errors.push('Debe ingresar el formato example@example.something')
      return errors
    },errorDireccion () {
      const errors = []
      if (!this.$v.usuario.datos.email.$dirty) return errors
          !this.$v.usuario.datos.direccion.required && errors.push('Debe ingresar una direccion Obligatoriamente')
          !this.$v.usuario.datos.direccion.minLength && errors.push('La direccion debe tener al menos 10 caracteres')
      return errors
    },errorRol(){
        const errors = []
      if (!this.$v.usuario.rol.$dirty) return errors
          !this.$v.usuario.rol.required && errors.push('Debe seleccionar un Rol obligatoriamente')
          return errors
    },errorEstado(){
                const errors = []
      if (!this.$v.usuario.estado.$dirty) return errors
          !this.$v.usuario.estado.required && errors.push('Debe seleccionar un Estado obligatoriamente')
          return errors
    },errorImagen(){
      return this.$v.usuario.datos.imagen.required == false && this.$v.usuario.datos.imagen.$dirty == true ?true:false;
    }
  },
  validations() {
    return {
        usuario: {
          usuario:{
            required,
            minLength: minLength(4)
          },rol:{
            required
          },estado:{
            required
          },datos:{
              nombre:{
                required,
                minLength: minLength(3)
              },
              apellido:{
                required,
                minLength: minLength(3)
                },
                fechanacimiento:{
                  required, //cumplio? false
                },
              tipodocumento:{
                required
                },
              numerodocumento:{
                  required
                },
                email:{
                  required,
                  email
                },direccion:{
                  required,
                  minLength: minLength(10)
                },fechanacimiento:{
                  required
                },direccion:{
                  required,
                  minLength: minLength(10)
                },imagen:{
                  required
                }
          }
        }
  }
  }
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
.divider-custom{
  margin-top:7px;
  margin-bottom:7px
}

.inputTextField{
  border-color: green;
}
</style>