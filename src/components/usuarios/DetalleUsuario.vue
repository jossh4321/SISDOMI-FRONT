<template>
  <v-card >
    <v-card-title class="justify-center">Detalle de Usuario</v-card-title>

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
        Datos de Cuenta
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <div class="container-user">
      <form>
        <v-text-field
           v-model="usuario.datos.nombre"
          label="Ingrese los Nombres"
          outlined
          readonly
          color="#009900"
        ></v-text-field>
        <v-text-field
          v-model="usuario.datos.apellido"
          label="Ingrese los Apellidos"
          outlined
          readonly
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
          readonly
          color="#009900"
           v-model="usuario.datos.tipodocumento"
        ></v-select>
        <v-text-field
          v-model="usuario.datos.numerodocumento"
          label="Ingrese el Numero de Documento"
          outlined
          readonly
          color="#009900"
        ></v-text-field>
        <v-textarea
          v-model="usuario.datos.direccion"
          label="Ingrese el la direccion"
          auto-grow
          outlined
          rows="2"
          row-height="25"
          readonly
          color="#009900"
          shaped
        ></v-textarea>
        <v-text-field
          v-model="usuario.datos.email"
          label="Ingrese el Correo Electronico"
          outlined
          readonly
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
        <div  class="container-user">
      <form>
        <v-text-field
          v-model="usuario.usuario"
          label="Ingrese el nombre de Usuario"
          outlined
          readonly
          class="inputTextField"
          color="#009900"
        ></v-text-field>
        
        <v-card style="margin:5x;margin-bottom:15px;padding:10px; border: 1px solid #b3b3b3;">
          <v-card-title>Roles del Usuario</v-card-title>
          <v-text-field
          v-model="usuario.rol.nombre"
          label="Rol del Usuario"
          outlined
          readonly
          class="inputTextField"
          color="#009900"
        ></v-text-field>
        <v-text-field
          v-model="usuario.rol.descripcion"
          label="Descripcion del Rol"
          outlined
          readonly
          class="inputTextField"
          color="#009900"
        ></v-text-field>
        <v-card-text>Permisos</v-card-text>
          <v-card style="margin:5px; padding:5px;border:1px solid #b3b3b3; margin-top:1px">
              <div>
            <v-chip v-for="permiso in usuario.rol.permisos" :key="permiso.id"
              class="mr-2"
            >
              <v-icon left>
                mdi-ticket
              </v-icon>
                {{permiso.label}}
            </v-chip>
          </div>
          </v-card>
        </v-card>
        <v-select
        v-model="usuario.estado"
          :items="['activo', 'inactivo']"
          label="Ingrese el Estado"
          dense
          outlined
          readonly
          color="#009900"
        ></v-select>
          <v-card style="margin:5px; padding:5px;border:1px solid #b3b3b3;">
            <v-row>
              <v-col >
                <v-card-subtitle>Imagen del Perfil de {{usuario.datos.nombre}}</v-card-subtitle>
              </v-col>
            </v-row>
            <v-row>
              <v-col
              >
                <v-img style="display:block"
                      height="170"
                    width="170"
                      :src="usuario.datos.imagen"
                    ></v-img>
              </v-col>
            </v-row>
          </v-card>
          <v-divider class="divider-custom"></v-divider>
        <v-row>
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
import { mapMutations, mapState} from "vuex";
import moment from 'moment'
export default {
    name:"DetalleUsuario",
   props:["usuario","listaroles"],
   components: {
  },
  data() {
    return {
      datemenu: false,
      step:1
    };
  },async created(){
  },
  mounted(){
  },
  methods:{
    cerrarDialogo(){
      this.$emit("close-dialog-detail");
    }
  },
  watch:{
  },
  computed:{
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
.divider-custom{
  margin-top:7px;
  margin-bottom:7px
}

.inputTextField{
  border-color: green;
}
</style>