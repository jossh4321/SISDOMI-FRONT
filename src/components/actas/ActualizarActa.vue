<template>
  <v-card>
    <v-card-title class="justify-center">Actualizar Acta de externamiento</v-card-title>

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
               v-model="usuario.tipo"
          label="Ingrese el tipo"
                outlined
                @input="$v.usuario.tipo.$touch()"
                @blur="$v.usuario.tipo.$touch()"
                :error-messages="errortipo"
                color="#009900"
              ></v-text-field>
              <v-text-field
                 v-model="usuario.fechacreacion"
          label="Ingrese fecha creacion"
                outlined
                @input="$v.usuario.fechacreacion.$touch()"
                @blur="$v.usuario.fechacreacion.$touch()"
                :error-messages="errorfechacreacion"
                color="#009900"
              ></v-text-field>
                <v-text-field
                v-model="usuario.area"
          label="Ingrese el area"
                outlined
                @input="$v.usuario.area.$touch()"
                @blur="$v.usuario.area.$touch()"
                :error-messages="errorarea"
                color="#009900"
              ></v-text-field>
            
              <v-text-field
                v-model="usuario.fase"
          label="Ingrese la fase"
                outlined
                 @input="$v.usuario.fase.$touch()"
                @blur="$v.usuario.fase.$touch()"
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
               v-model="usuario.entidaddisposicion"
          label="Ingrese nuevo entidad disposicion"
                outlined
               @input="$v.usuario.entidaddisposicion.$touch()"
                @blur="$v.usuario.entidaddisposicion.$touch()"
                :error-messages="errorentidaddisposicion"
                class="inputTextField"
                color="#009900"
              ></v-text-field>


 <v-text-field
               v-model="usuario.numeroresolucion"
          label="Ingrese nueva entidad disposicion"
                outlined
               @input="$v.usuario.numeroresolucion.$touch()"
                @blur="$v.usuario.numeroresolucion.$touch()"
                :error-messages="errornumeroresolucion"
                class="inputTextField"
                color="#009900"
              ></v-text-field>


               <v-text-field
               v-model="usuario.numerooficio"
          label="Ingrese nuevo numero oficio"
                outlined
               @input="$v.usuario.numerooficio.$touch()"
                @blur="$v.usuario.numerooficio.$touch()"
                :error-messages="errornumerooficio"
                class="inputTextField"
                color="#009900"
              ></v-text-field>


               <v-text-field
               v-model="usuario.observaciones"
          label="Ingrese nuevas observaciones"
                outlined
               @input="$v.usuario.observaciones.$touch()"
                @blur="$v.usuario.observaciones.$touch()"
                :error-messages="errorobservaciones"
                class="inputTextField"
                color="#009900"
              ></v-text-field>


                    <v-select
                v-model="usuario.estado"
                 :items="['creado', 'modificado']"
          label="Ingrese nuevo estado"
                outlined
                @input="$v.usuario.estado.$touch()"
                @blur="$v.usuario.estado.$touch()"
                :error-messages="errorestado"
                class="inputTextField"
                color="#009900"
            ></v-select>


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
              <v-btn block @click="actualizarUsuario()" color="warning">
              <v-icon left>mdi-content-save-all-outline</v-icon>
              <span >Actualizar Acta</span>
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
   props:["usuario"],
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
    errortipo () {
      const errors = []
      if (!this.$v.usuario.datos.tipo.$dirty) return errors
          !this.$v.usuario.datos.tipo.required && errors.push('Debe ingresar el tipo Obligatoriamente')
          !this.$v.usuario.datos.tipo.minLength && errors.push('El Nombre debe tener al menos 3 caracteres')
      return errors
    },
    errorarea () {
      const errors = []
      if (!this.$v.usuario.datos.area.$dirty) return errors
          !this.$v.usuario.datos.area.required && errors.push('Debe ingresar un area Obligatoriamente')
          !this.$v.usuario.datos.area.minLength && errors.push('El area debe tener al menos 3 caracteres')
      return errors
    },
    erroridresidente () {
      const errors = []
      if (!this.$v.usuario.datos.idresidente.$dirty) return errors
          !this.$v.usuario.datos.idresidente.required && errors.push('Debe ingresar el idresidente Obligatoriamente')
          
      return errors
      },
    errorfechacreacion () {
      const errors = []
      if (!this.$v.usuario.datos.fechacreacion.$dirty) return errors
          !this.$v.usuario.datos.fechacreacion.required && errors.push('Debe Ingresar una Fecha de Creacion Obligatoriamente')
          //validating whether the user are an adult
          var dateselected =  new Date(this.usuario.fechacreacion);
          var maxdate = new Date();
          maxdate.setFullYear(maxdate.getFullYear());
          
      return errors
    },
     errorfase () {
      const errors = []
      if (!this.$v.usuario.datos.fase.$dirty) return errors
          !this.$v.usuario.datos.fase.required && errors.push('Debe ingresar la fase Obligatoriamente')
          
      return errors
       
    },errorestado(){
                const errors = []
      if (!this.$v.usuario.estado.$dirty) return errors
          !this.$v.usuario.estado.required && errors.push('Debe seleccionar un Estado obligatoriamente')
          return errors
    },
           errorentidaddisposicion () {
      const errors = []
      if (!this.$v.usuario.datos.entidaddisposicion.$dirty) return errors
          !this.$v.usuario.datos.entidaddisposicion.required && errors.push('Debe ingresar entidad disposicion Obligatoriamente')
          
      return errors
      },
          errornumeroresolucion () {
      const errors = []
      if (!this.$v.usuario.datos.numeroresolucion.$dirty) return errors
          !this.$v.usuario.datos.numeroresolucion.required && errors.push('Debe ingresar el numero resolucion Obligatoriamente')
          
      return errors
      },
          errornumerooficio () {
      const errors = []
      if (!this.$v.usuario.datos.numerooficio.$dirty) return errors
          !this.$v.usuario.datos.numerooficio.required && errors.push('Debe ingresar el numero oficio Obligatoriamente')
          
      return errors
      },
          errorobservaciones () {
      const errors = []
      if (!this.$v.usuario.datos.observaciones.$dirty) return errors
          !this.$v.usuario.datos.observaciones.required && errors.push('Debe ingresar observaciones Obligatoriamente')
          
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
          
          },estado:{
            required
          },datos:{
              tipo:{
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