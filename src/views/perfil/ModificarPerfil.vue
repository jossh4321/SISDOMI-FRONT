<template>
  <v-card>
    <v-card-title class="justify-center">Modificar Perfil</v-card-title>
    <v-stepper v-model="step">      
         <v-divider></v-divider>
          <div class="container-user">
            <form>
              <v-row>
               <div>
                 <v-col>
                 <vue-dropzone ref="myVueDropzone"
                    @vdropzone-success=" afterSuccess"
                    @vdropzone-removed-file="afterRemoved"
                    @vdropzone-mounted="mounteddropzone"
                    id="dropzone" :options="dropzoneOptions">
                  </vue-dropzone>
                  </v-col>
                  </div>
                  <v-card v-if="errorImagen" color="red">
                  </v-card>
                  <v-col>
                  <v-text-field
                  v-model="usuario.usuario"
                 label="Ingrese Usuario"
                 outlined
                 @input="$v.usuario.usuario.$touch()"
                 @blur="$v.usuario.usuario.$touch()"
                 :error-messages="errorNombreUsuario"
                 color="#99FFCC"
                 ></v-text-field>

                   <v-text-field
                  v-model="usuario.datos.nombre"
                  label="Ingrese los Nombres"
                  outlined
                  @input="$v.usuario.datos.nombre.$touch()"
                  @blur="$v.usuario.datos.nombre.$touch()"
                  :error-messages="errorNombre"
                   color="#009900"
                  ></v-text-field>
                   
                 
                  <v-text-field
                  v-model="usuario.datos.apellido"
                   label="Ingrese los Apellidos"
                outlined
                @input="$v.usuario.datos.apellido.$touch()"
                @blur="$v.usuario.datos.apellido.$touch()"
                :error-messages="errorApellido"
                color="#009900"
                ></v-text-field>
                   
                <v-row>
                <v-col>  
                <v-select
                :items="['DNI', 'Pasaporte', 'Carnet Extranjeria']"
                label="Ingrese el Tipo de Documento"
                outlined
                v-model="usuario.datos.tipodocumento"
                @input="$v.usuario.datos.tipodocumento.$touch()"
                @blur="$v.usuario.datos.tipodocumento.$touch()"
                :error-messages="errorTipoDocumento"
                color="#009900"
               ></v-select>
               </v-col>
               <v-col>
                 <v-text-field
                v-model="usuario.datos.numerodocumento"
                label="Ingrese el Numero de Documento"
                outlined
                @input="$v.usuario.datos.numerodocumento.$touch()"
                @blur="$v.usuario.datos.numerodocumento.$touch()"
                :error-messages="errorNumeroDocumento"
                color="#009900"
                  ></v-text-field>
                  </v-col>
                  </v-row> 
                  </v-col>
                   </v-row> 
                 <v-textarea
                  v-model="usuario.datos.direccion"
                  label="Ingrese el la direccion"
                  auto-grow
                  outlined
                  rows="2"
                   row-height="25"
                  @input="$v.usuario.datos.direccion.$touch()"
                  @blur="$v.usuario.datos.direccion.$touch()"
                  :error-messages="errorDireccion"
                  color="#009900"
                  shaped> 
               </v-textarea>

               <v-row>
                <v-col>
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
                    v-model="usuario.datos.fechanacimiento"
                    label="Fecha de Nacimiento"
                    prepend-icon="mdi-calendar"
                    outlined
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    @input="$v.usuario.datos.fechanacimiento.$touch()"
                    @blur="$v.usuario.datos.fechanacimiento.$touch()"
                    :error-messages="errorFechaNacimiento"
                    color="#009900"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="usuario.datos.fechanacimiento"
                  @input="menu2 = false"
                  locale="es-es"
                ></v-date-picker>
              </v-menu>
                </v-col>
                 <v-col>
                <v-text-field
                  v-model="usuario.datos.email"
                  label="Ingrese el Correo Electronico"
                  outlined
                  @input="$v.usuario.datos.email.$touch()"
                  @blur="$v.usuario.datos.email.$touch()"
                  :error-messages="errorEmail"
                  color="#009900"
               ></v-text-field>
                </v-col>
                </v-row>
                
                   <v-row justify="center" align="center"> 
                     <div>
                    <vue-dropzone ref="myVueDropzoneFirma"
                    @vdropzone-success=" afterSuccessFirma"
                    @vdropzone-removed-file="afterRemovedFirma"
                    @vdropzone-mounted="mounteddropzoneFirma"
                    id="dropzone" :options="dropzoneOptionsFirma">
                </vue-dropzone>           
                 </div>
                 </v-row>

                  <v-card v-if="errorFirma" color="red">
                   <v-card-text class="text-center" style="color:white">Debe Subir una Firma del usuario Obligatoriamente</v-card-text>
                  </v-card>

                  <v-divider class="divider-custom"></v-divider>
                  <v-row>
                      <v-col>
                     <v-btn block @click="actualizarUsuarioPerfil()" color="success">
                      <v-icon left>mdi-content-save-all-outline</v-icon>
                      <span>Modificar Perfil</span>
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
    </v-stepper>
  </v-card>
</template>
<script>
import axios from "axios";
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import { mapMutations, mapState } from "vuex";
import { required, minLength, email, helpers } from "vuelidate/lib/validators";
import moment from "moment";
import { mapGetters } from "vuex";

export default {
  props: [],
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
        acceptedFiles: ".jpg",
        headers: { "My-Awesome-Header": "header value" },
        addRemoveLinks: true,
        dictDefaultMessage:
          "Seleccione una Imagen de su Dispositivo o Arrastrela Aqui",
      },
      dropzoneOptionsFirma: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 250,
        maxFilesize: 3.0,
        maxFiles: 1,
        acceptedFiles: ".jpg, .png, jpeg",
        headers: { "My-Awesome-Header": "header value" },
        addRemoveLinks: true,
        dictDefaultMessage:
          "Seleccione la firma de su dispositivo o arrástrela aquí",
      },
      imagen:{},
      firma:{},
      usuario: {
        id:"",
        usuario: "",
        clave: "",
        estado:"",
        rol:"", 
        datos: {
          nombre: "",
          apellido: "",
          fechanacimiento: "",
          tipodocumento: "",
          numerodocumento: "",
          direccion: "",
          email: "",
          imagen: "",
          firma:"",
         },  
      },
    };
  },
  created() { 
  this.DialogloadUsuarioModificacion();      
  },
  methods: {
    ...mapMutations(["setUser"]),
  
 
DialogloadUsuarioModificacion(){
this.usuario.id = this.user.id;
this.usuario.usuario=this.user.usuario;
this.usuario.clave=this.user.clave;
this.usuario.estado=this.user.estado;
this.usuario.rol=this.user.rol;

this.usuario.datos.nombre=this.user.datos.nombre;
this.usuario.datos.apellido=this.user.datos.apellido;
this.usuario.datos.fechanacimiento=this.user.datos.fechanacimiento;
this.usuario.datos.tipodocumento=this.user.datos.tipodocumento;
this.usuario.datos.numerodocumento=this.user.datos.numerodocumento;
this.usuario.datos.direccion=this.user.datos.direccion;
this.usuario.datos.email=this.user.datos.email;
this.usuario.datos.imagen=this.user.datos.imagen;
this.usuario.datos.firma=this.user.datos.firma;

this.usuario.datos.fechanacimiento =this.usuario.datos
                  .fechanacimiento.split("T")[0];
  },
  
async actualizarUsuarioPerfil(){     
       this.$v.$touch();
      if (this.$v.$invalid) {
           console.log("hay errores");
        this.mensaje('error','..Oops','Se encontraron errores en el formulario',"<strong>Verifique los campos Ingresados<strong>");
       }else {      
        let usuarioA={
           id: this.usuario.id,
           usuario: this.usuario.usuario,
           clave:  "",
           datos: this.usuario.datos,
           estado: "",
           rol: "",       
        }; 
        await axios.put("/Perfil/modificarperfil",usuarioA)            
        .then((res) => {
               var miusuariomodificado = res.data;  
             
              this.user.datos.imagen = miusuariomodificado.datos.imagen;
              this.user.datos.firma = miusuariomodificado.datos.firma;
              
              this.user.datos.direccion=miusuariomodificado.datos.direccion;
             this.user.usuario=miusuariomodificado.usuario;
             this.user.datos.nombre=miusuariomodificado.datos.nombre;
             this.user.datos.apellido=miusuariomodificado.datos.apellido;
             this.user.datos.fechanacimiento=miusuariomodificado.datos.fechanacimiento;
             this.user.datos.tipodocumento=miusuariomodificado.datos.tipodocumento;
             this.user.datos.numerodocumento=miusuariomodificado.datos.numerodocumento;
             this.user.datos.direccion=miusuariomodificado.datos.direccion;
             this.user.datos.email=miusuariomodificado.datos.email;
               this.setUser(this.user);
                
                 this.cerrarDialogo();
                  })
                  .catch((err) => {
                    console.error(err);
                  });          
        this.mensaje('success','listo','Perfil Actualizado Satisfactoriamente',"<strong>Se redigira al home <strong>");  
         
      }
    },
  
     resetUsuarioValidationState() {
     this.$refs.myVueDropzone.removeAllFiles();
        this.$v.usuario.$reset();
    },  
    cerrarDialogo() {
      this.resetUsuarioValidationState();
      this.$router.push('/dashboard/home');
    },
  
   afterSuccess(file,response){
       this.usuario.datos.imagen = file.dataURL.split(",")[1];
       this.$v.usuario.datos.imagen.$model = file.dataURL.split(",")[1];
      // this.imagen ={ tipo: "base64", modificado:"si"};
    },
    afterRemoved(file, error, xhr){
      this.usuario.datos.imagen = "";
       this.$v.usuario.datos.imagen.$model = "";
    },

///

    afterSuccessFirma(file,response){
       this.usuario.datos.firma = file.dataURL.split(",")[1];
       this.$v.usuario.datos.firma.$model = file.dataURL.split(",")[1];
      // this.firma ={ tipo: "base64", modificado:"si"};
    },
    afterRemovedFirma(file, error, xhr){
      this.usuario.datos.firma = "";
       this.$v.usuario.datos.firma.$model = "";
    },

///


   mensaje(icono, titulo, texto, footer) {
     this.$swal({
        icon: icono,
        title: titulo,
        text: texto,
        footer: footer,
      });    
   
    },
mounteddropzone(){
  
     var file = { size: 250, name: "Imagen de Perfil", type: "image/jpg" };
      this.$refs.myVueDropzone.manuallyAddFile(file, this.usuario.datos.imagen,null,null,true);      
      
    },
///
  mounteddropzoneFirma(){
    
     var file = { size: 250, name: "Imagen de Firma", type: "image/jpg" };
      this.$refs.myVueDropzoneFirma.manuallyAddFile(file, this.usuario.datos.firma,null,null,true);         
    },
////
  },
  computed: {
   
    ...mapGetters(["user"]),

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
    errorNombre() {
      const errors = [];
      if (!this.$v.usuario.datos.nombre.$dirty) return errors;
      !this.$v.usuario.datos.nombre.required &&
        errors.push("Debe ingresar un Nombre Obligatoriamente");
      !this.$v.usuario.datos.nombre.minLength &&
        errors.push("El Nombre debe tener al menos 3 caracteres");
      return errors;
    },
    errorApellido() {
      const errors = [];
      if (!this.$v.usuario.datos.apellido.$dirty) return errors;
      !this.$v.usuario.datos.apellido.required &&
        errors.push("Debe ingresar un Apellido Obligatoriamente");
      !this.$v.usuario.datos.apellido.minLength &&
        errors.push("El apellido debe tener al menos 3 caracteres");
      return errors;
    },
    errorNumeroDocumento() {
      const errors = [];
      if (!this.$v.usuario.datos.numerodocumento.$dirty) return errors;
      !this.$v.usuario.datos.numerodocumento.required &&
        errors.push("Debe ingresar el Numero de Documento Obligatoriamente");
      !this.usuario.datos.tipodocumento != "" &&
        errors.push("Debe seleccionar el Tipo de Documento Inicialmente");
      if (this.usuario.datos.tipodocumento == "DNI") {
        !/^[0-9]{8}$/.test(this.usuario.datos.numerodocumento) != false &&
          errors.push("El Numero de DNI debe poseer 8 digitos numericos");
      }
      if (this.usuario.datos.tipodocumento == "Pasaporte") {
        !/^(?!^0+$)[a-zA-Z0-9]{3,20}$/.test(
          this.usuario.datos.numerodocumento
        ) != false &&
          errors.push(
            "El Numero de Pasaporte debe poseer de 3 a 20 caracteres alfanumericos"
          );
      }
      if (this.usuario.datos.tipodocumento == "Carnet Extranjeria") {
        !/^[0-9]{9}$/.test(this.usuario.datos.numerodocumento) != false &&
          errors.push("El Numero de DNI debe poseer 9 digitos numericos");
      }
      return errors;
    },
    errorTipoDocumento() {
      const errors = [];
      if (!this.$v.usuario.datos.tipodocumento.$dirty) return errors;
      !this.$v.usuario.datos.tipodocumento.required &&
        errors.push("Debe seleccionar el Tipo de Documento Obligatoriamente");
      return errors;
    },
    errorFechaNacimiento() {
      const errors = [];
      if (!this.$v.usuario.datos.fechanacimiento.$dirty) return errors;
      !this.$v.usuario.datos.fechanacimiento.required &&
        errors.push("Debe Ingresar una Fecha de Nacimiento Obligatoriamente");
      //validating whether the user are an adult
      var dateselected = new Date(this.usuario.datos.fechanacimiento);
      var maxdate = new Date();
      maxdate.setFullYear(maxdate.getFullYear() - 18);
      !(dateselected.getTime() <= maxdate.getTime()) &&
        errors.push("El usuario debe ser mayor de edad");

      return errors;
    },
    errorEmail() {
      const errors = [];
      if (!this.$v.usuario.datos.email.$dirty) return errors;
      !this.$v.usuario.datos.email.required &&
        errors.push("Debe ingresar el email Obligatoriamente");
      !this.$v.usuario.datos.email.email &&
        errors.push("Debe ingresar el formato example@example.something");
      return errors;
    },
    errorDireccion() {
      const errors = [];
      if (!this.$v.usuario.datos.email.$dirty) return errors;
      !this.$v.usuario.datos.direccion.required &&
        errors.push("Debe ingresar una direccion Obligatoriamente");
      !this.$v.usuario.datos.direccion.minLength &&
        errors.push("La direccion debe tener al menos 10 caracteres");
      return errors;
    },
    errorRol() {
      const errors = [];
      if (!this.$v.usuario.rol.$dirty) return errors;
      !this.$v.usuario.rol.required &&
        errors.push("Debe seleccionar un Rol obligatoriamente");
      return errors;
    },
   
    errorImagen() {
      return this.$v.usuario.datos.imagen.required == false &&
        this.$v.usuario.datos.imagen.$dirty == true
        ? true
        : false;
    },
    errorFirma() {
      return this.$v.usuario.datos.firma.required == false &&
        this.$v.usuario.datos.firma.$dirty == true
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
        
        datos: {
          nombre: {
            required,
            minLength: minLength(3),
          },
          apellido: {
            required,
            minLength: minLength(3),
          },
          fechanacimiento: {
            required, //cumplio? false
          },
          tipodocumento: {
            required,
          },
          numerodocumento: {
            required,
          },
          email: {
            required,
            email,
          },
          direccion: {
            required,
            minLength: minLength(10),
          },
          fechanacimiento: {
            required,
          },
          direccion: {
            required,
            minLength: minLength(10),
          },
          imagen: {
            required,
          },
          firma: {
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