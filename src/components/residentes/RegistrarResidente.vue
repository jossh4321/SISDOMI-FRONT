<template>
  <v-card>
    <v-card-title class="justify-center">Registro de Residentes</v-card-title>

    <v-stepper v-model="step">
    <v-stepper-header>
      <v-stepper-step
        editable
        step="1"
      >
        Datos Generales
      </v-stepper-step>

      <v-divider></v-divider>
      <v-stepper-step
        editable
        step="2"
      >
        Datos Especificos
      </v-stepper-step>
    </v-stepper-header>
    <!--COMIENZA LA PLANTILLA DEL STEPER -->
        <v-stepper-items>
           <v-stepper-content step="1">
             <div class="container-user">
                <form> <!--aQUI ESTARA LO Q  CONTENDRA -->

                  <v-text-field
                    v-model="residente.nombre"
                    @input="$v.residente.nombre.$touch()"
                    @blur="$v.residente.nombre.$touch()"
                    :error-messages="errorNombre"
                    label="Ingrese el nombre"
                     color="#009900"
                ></v-text-field>
                <v-text-field
                    v-model="residente.apellido"
                    @input="$v.residente.apellido.$touch()"
                    @blur="$v.residente.apellido.$touch()"
                    :error-messages="errorApellido"
                    label="Ingrese el apellido"
                     color="#009900"
                ></v-text-field>
                <v-select
                :items="['Masculino', 'Femenino', 'mucho']"
                label="Ingrese el Sexo"
                dense
                outlined
                v-model="residente.sexo"
                @input="$v.residente.sexo.$touch()"
                @blur="$v.residente.sexo.$touch()"
                :error-messages="errorTipoSexo"
                color="#009900"
              ></v-select>
              <!--  Fecha nacimeinto-->
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
              v-model="residente.fechaNacimiento"
              label="Fecha de Nacimiento"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
              @input="$v.residente.fechaNacimiento.$touch()"
              @blur="$v.residente.fechaNacimiento.$touch()"
              :error-messages="errorFechaNacimiento"
              color="#009900"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="residente.fechaNacimiento"
            @input="menu2 = false"
            locale="es-es"
          ></v-date-picker>
        </v-menu><!--  -->
    <v-select
          :items="['DNI', 'Pasaporte', 'Carnet Extranjeria']"
          label="Ingrese el Tipo de Documento"
          dense
          outlined
          v-model="residente.tipoDocumento"
          @input="$v.residente.tipoDocumento.$touch()"
          @blur="$v.residente.tipoDocumento.$touch()"
          :error-messages="errorTipoDocumento"
          color="#009900"
    ></v-select>
                <v-text-field
                    v-model="residente.numeroDocumento"
                    @input="$v.residente.numeroDocumento.$touch()"
                     @blur="$v.residente.numeroDocumento.$touch()"
                     :error-messages="errorNumeroDocumento"
                    label="Ingrese el  N°documento"
                     color="#009900"
                ></v-text-field>
                <v-text-field
                    v-model="residente.lugarNacimiento"
                    @input="$v.residente.lugarNacimiento.$touch()"
                     @blur="$v.residente.lugarNacimiento.$touch()"
                     :error-messages="errorLugarNacimiento"
                    label="Ingrese el Lugar de Nacimiento"
                     color="#009900"
                ></v-text-field>
<!--botones -->
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
                <form> <!--aQUI ESTARA LO Q  CONTENDRA -->
                 <v-text-field
                    v-model="residente.ubigeo"
                    @input="$v.residente.ubigeo.$touch()"
                     @blur="$v.residente.ubigeo.$touch()"
                     :error-messages="errorUbigeo"
                    label="Ingrese el Ubigeo"
                     color="#009900"
                ></v-text-field>
                  <v-text-field
                    v-model="residente.juzgadoProcedencia"
                    @input="$v.residente.juzgadoProcedencia.$touch()"
                     @blur="$v.residente.juzgadoProcedencia.$touch()"
                     :error-messages="errorJuzgadoProcedencia"
                    label="Ingrese el Juzgado de Procedencia"
                     color="#009900"
                ></v-text-field>
         <!-- --> <v-menu   
          v-model="datemenu1"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="residente.fechaIngreso"
              label="Fecha de Ingreso"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
              @input="$v.residente.fechaIngreso.$touch()"
              @blur="$v.residente.fechaIngreso.$touch()"
              :error-messages="errorFechaIngreso"
              color="#009900"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="residente.fechaIngreso"
            @input="menu2 = false"
            locale="es-es"
          ></v-date-picker>
        </v-menu><!--acabo  -->

        <v-textarea 
          v-model="residente.motivoIngreso"
          @input="$v.residente.motivoIngreso.$touch()"
          @blur="$v.residente.motivoIngreso.$touch()"
          
          label="Ingrese el Motivo de Ingreso"
          color="#009900"
        ></v-textarea>

        <!--AQUIE DEBE IR EL PROGRESO -->
                <v-text-field
                    v-model="residente.estado"
                    @input="$v.residente.estado.$touch()"
                     @blur="$v.residente.estado.$touch()"
                     :error-messages="errorEstado"
                    label="Ingrese el Estado"
                     color="#009900"
                ></v-text-field>


<!--botones -->
                   <v-row>
                    <v-col>
                      <v-btn block @click="registrarResidente" color="success">
                         <v-icon left>mdi-content-save-all-outline</v-icon>
                         <span >Registrar Residente</span>
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
import {mapMutations, mapState} from "vuex";
import { required, minLength,email,helpers } from 'vuelidate/lib/validators'
import moment from 'moment'
export default {
  data(){
    return{
      datemenu: false,
      datemenu1:false,
       step:1
       
   ,
    residente:{
      id:"",
      nombre:"",
      apellido:"",
      tipoDocumento:"",
      numeroDocumento:"",
      lugarNacimiento:"",
      ubigeo:"",
      juzgadoProcedencia:"",
      fechaNacimiento:"",
      sexo:"",
      telefonosReferencia:[
      {
        numero:"",
        referentefamiliar:""
      }],
      fechaIngreso:"",
      motivoIngreso:"",
      progreso:[{
        fase:0,
        fechaingreso:"",
        fechafinalizacion:"",
        estado:""
      }],
      estado:""
    }
    }
  },
  created:{
    

  },
  methods:{
    ...mapMutations(["setResidentes","addResidente"]),
    ///CERRAR DIALOGO
    cerrarDialogo(){
      this.usuario = this.limpiarResidente();
      this.step = 1;
      this.$emit("close-dialog-save");
     },
     //metodo limpiar residente
     limpiarResidente(){
      return {
        residente:{
      id:"",
      nombre:"",
      apellido:"",
      tipoDocumento:"",
      numeroDocumento:"",
      lugarNacimiento:"",
      ubigeo:"",
      juzgadoProcedencia:"",
      fechaNacimiento:Date,
      sexo:"",
      telefonosReferencia:[
      {
        numero:"",
        referentefamiliar:""
      }],
      fechaIngreso:Date,
      motivoIngreso:"",
      progreso:[{
        fase:0,
        fechaingreso:Date,
        fechafinalizacion:Date,
        estado:""
      }],
      estado:""
    }
      }
  ///funcion mensaje para mostrar el mensaje de error
     },async mensaje(icono,titulo,texto,footer){
      await this.$swal({
        icon: icono,
        title: titulo,
        text: texto,
        footer:footer
      });
      },
    ////////////HACER LA CONSULTA CON LA API  REGISTRAR
     async registrarResidente(){
       this.$v.$touch();
      if (this.$v.$invalid) {
        console.log('hay errores');
        this.mensaje('error','..Oops','Se encontraron errores en el formulario',"<strong>Verifique los campos Ingresados<strong>");
      } else {
        console.log('no hay errores');
        console.warn(this.residente)
        await axios.post("/Residente",this.residente)
          .then(res => {
            this.residente = res.data;
            this.addResidente(this.residente);
            this.cerrarDialogo();
          }).catch(err => console.log(err));
        await this.mensaje('success','listo','Usuario registrado Satisfactoriamente',"<strong>Se redirigira a la Interfaz de Gestion<strong>");
        
      }
    }
  },
  
  computed:{ ///validaciones
    ...mapState(["residentes"]),
    verifyColor(){
        return 'red';
      },
     
    errorNombre () {
      const errors = []
      if (!this.$v.residente.nombre.$dirty) return errors
          !this.$v.residente.nombre.required && errors.push('Debe ingresar un Nombre Obligatoriamente')
          !this.$v.residente.nombre.minLength && errors.push('El Nombre debe tener al menos 3 caracteres')
      return errors
    },
    errorApellido () {
      const errors = []
      if (!this.$v.residente.apellido.$dirty) return errors
          !this.$v.residente.apellido.required && errors.push('Debe ingresar un Apellido Obligatoriamente')
          !this.$v.residente.apellido.minLength && errors.push('El apellido debe tener al menos 3 caracteres')
      return errors
    },errorTipoDocumento () {
      const errors = []
      if (!this.$v.residente.tipoDocumento.$dirty) return errors
          !this.$v.residente.tipoDocumento.required && errors.push('Debe seleccionar el Tipo de Documento Obligatoriamente')
      return errors
    },errorNumeroDocumento () {
      const errors = []
      if (!this.$v.residente.numeroDocumento.$dirty) return errors
          !this.$v.residente.numeroDocumento.required && errors.push('Debe ingresar el Numero de Documento Obligatoriamente')
          !this.residente.tipoDocumento != "" && errors.push('Debe seleccionar el Tipo de Documento Inicialmente')
          if(this.residente.tipoDocumento == "DNI"){ !/^[0-9]{8}$/.test(this.residente.numeroDocumento) != false && errors.push('El Numero de DNI debe poseer 8 digitos numericos')}
          if(this.residente.tipoDocumento == "Pasaporte"){!/^(?!^0+$)[a-zA-Z0-9]{3,20}$/.test(this.residente.numeroDocumento) != false && errors.push('El Numero de Pasaporte debe poseer de 3 a 20 caracteres alfanumericos')}
          if(this.residente.tipoDocumento == "Carnet Extranjeria"){ !/^[0-9]{9}$/.test(this.residente.numeroDocumento) != false && errors.push('El Numero del Carnet de Extranjeria debe poseer 9 digitos numericos')}
      return errors
    },errorLugarNacimiento(){
     const errors = []
      if (!this.$v.residente.lugarNacimiento.$dirty) return errors
          !this.$v.residente.lugarNacimiento.required && errors.push('Debe ingresar un Lugar de Nacimiento Obligatoriamente')
          !this.$v.residente.lugarNacimiento.minLength && errors.push('El Lugar de Nacimiento debe tener al menos 3 caracteres')
      return errors
    },errorUbigeo(){
       const errors = []
      if (!this.$v.residente.ubigeo.$dirty) return errors
          !this.$v.residente.ubigeo.required && errors.push('Debe ingresar un Lugar de Nacimiento Obligatoriamente')
          !this.$v.residente.ubigeo.minLength && errors.push('El Lugar de Nacimiento debe tener al menos 3 caracteres')
      return errors
    },errorJuzgadoProcedencia(){
       const errors = []
      if (!this.$v.residente.juzgadoProcedencia.$dirty) return errors
          !this.$v.residente.juzgadoProcedencia.required && errors.push('Debe ingresar un Juzgado de Procedencia Obligatoriamente')
          !this.$v.residente.juzgadoProcedencia.minLength && errors.push('El Juzgado de Procedencia debe tener al menos 3 caracteres')
      return errors
    }
    ,errorFechaNacimiento () {
      const errors = []
      if (!this.$v.residente.fechaNacimiento.$dirty) return errors
          !this.$v.residente.fechaNacimiento.required && errors.push('Debe Ingresar una Fecha de Nacimiento Obligatoriamente')
          //validating whether the user are an adult
          var dateselected =  new Date(this.residente.fechaNacimiento);
          var maxdate = new Date();
          maxdate.setFullYear(maxdate.getFullYear()-18);
          !(dateselected.getTime()<= maxdate.getTime()) && errors.push('El usuario debe ser mayor de edad')

      return errors
    },errorTipoSexo(){
      
      const errors = []
      if (!this.$v.residente.sexo.$dirty) return errors
          !this.$v.residente.sexo.required && errors.push('Debe seleccionar un Sexo')
      return errors
 
    }, errorEstado () {
      const errors = []
      if (!this.$v.residente.estado.$dirty) return errors
          !this.$v.residente.estado.required && errors.push('Debe ingresar el  Estado Obligatoriamente')
          !this.$v.residente.estado && errors.push('El Estado debe tener al menos 3 caracteres')
      return errors
    },
    errorFechaIngreso () {
      const errors = []
      if (!this.$v.residente.fechaIngreso.$dirty) return errors
          !this.$v.residente.fechaIngreso.required && errors.push('Debe Ingresar una Fecha de Nacimiento Obligatoriamente')
          //validating whether the user are an adult
          var dateselected =  new Date(this.residente.fechaIngreso);
          var maxdate = new Date();
          maxdate.setFullYear(maxdate.getFullYear());
          !(dateselected.getTime()<= maxdate.getTime()) && errors.push('La fecha debe ser de hoy')

      return errors
    }
  },
  validations() {
    return {
        residente:{
          
          nombre:{
              required,
                      minLength: minLength(3)},
          apellido:{
              required,
                      minLength: minLength(3)},
          tipoDocumento:{
              required  },
          numeroDocumento:{
              required,
                        },
          lugarNacimiento:{
              required,
                  minLength: minLength(4)},
          ubigeo:{
              required,
                  minLength: minLength(4)},
          juzgadoProcedencia:{
              required,
                  minLength: minLength(4)},
          fechaNacimiento:{
              required
                          },
          sexo:{
              required
                  },
          telefonosReferencia:[],
          fechaIngreso:{
              required
                  },
            motivoIngreso:{
              },
            progreso:[],
            estado:{
              required,
                  minLength: minLength(4)}

              }
       }
    }
  }

</script>

<style>

</style>