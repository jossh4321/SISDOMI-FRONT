<template>
  <v-card >
    <v-card-title class="justify-center">Modificacion de Perfil</v-card-title>

      
      <form>
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
        <v-select
          :items="['DNI', 'Pasaporte', 'Carnet Extranjeria']"
          label="Ingrese el Tipo de Documento"
          dense
          outlined
          v-model="usuario.datos.tipodocumento"
          @input="$v.usuario.datos.tipodocumento.$touch()"
          @blur="$v.usuario.datos.tipodocumento.$touch()"
          :error-messages="errorTipoDocumento"
          color="#009900"
        ></v-select>
        <v-text-field
          v-model="usuario.datos.numerodocumento"
          label="Ingrese el Numero de Documento"
          outlined
          @input="$v.usuario.datos.numerodocumento.$touch()"
          @blur="$v.usuario.datos.numerodocumento.$touch()"
          :error-messages="errorNumeroDocumento"
          color="#009900"
        ></v-text-field>
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
          shaped
        ></v-textarea>
        <v-text-field
          v-model="usuario.datos.email"
          label="Ingrese el Correo Electronico"
          outlined
          @input="$v.usuario.datos.email.$touch()"
          @blur="$v.usuario.datos.email.$touch()"
          :error-messages="errorEmail"
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
  name:"Perfil",
  data() {
    return {
      datemenu: false,
      step:1,
      
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
    

  },
  watch:{
  },
  computed:{
    ...mapState(["usuarios"]),
    verifyColor(){
        return 'red';
      },
     
  },
  validations() {
    return {
        
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
