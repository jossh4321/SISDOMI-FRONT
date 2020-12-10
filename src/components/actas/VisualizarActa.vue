<template>
  <v-card >
    <v-card-title class="justify-center">Detalle de Acta</v-card-title>

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
           v-model="usuario.datos.CreadorDocumento"
          label="Ingrese el Creador Documento"
          outlined
          readonly
          color="#009900"
        ></v-text-field>
        <v-text-field
          v-model="usuario.datos.fechacreacion"
          label="Ingrese fecha creacion"
          outlined
          readonly
          color="#009900"
        ></v-text-field>
                      
       
        <v-text-field
           v-model="usuario.datos.area"
          label="Ingrese el area"
          outlined
          readonly
          color="#009900"
        ></v-text-field>

         <v-text-field
           v-model="usuario.datos.fase"
          label="Ingrese la fase"
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
          v-model="usuario.idresidente"
          label="Ingrese nuevo idresidente"
          outlined
          readonly
          class="inputTextField"
          color="#009900"
        ></v-text-field>
        
        
           
        
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