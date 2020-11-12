<template>
    <v-card>
      <v-card-title class="justify-center">{{titulo}}</v-card-title>
      <v-stepper v-model="step">
        <v-stepper-header>
          <v-stepper-step editable step="1">
            Datos Generales
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step editable step="2">
            Análisis y Diagnóstico
          </v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content step="1">
            <div class="container-user">
              <form>
                <v-text-field
                    v-model="informe.idresidente"
                    label="Usuaria CAR"
                    outlined
                    readonly
                    color="#009900"
                ></v-text-field>
                <v-text-field
                    v-model="informe.creadordocumento"
                    label="Educador Responsable"
                    outlined
                    readonly
                    color="#009900"
                ></v-text-field>  
                <v-text-field
                    v-model="informe.contenido.iereinsersion.nombre"
                    label="Instirución Educativa"
                    outlined
                    readonly
                    color="#009900"
                ></v-text-field>
        <v-row>
          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="informe.contenido.iereinsersion.modalidad"
              label="Modalidad"
              outlined
              readonly
              color="#009900"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="informe.contenido.iereinsersion.nivel"
              label="Nivel Educativo"
              outlined
              readonly
              color="#009900"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="informe.contenido.iereinsersion.grado"
              label="Grado"
              outlined
              readonly
              color="#009900"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-textarea
          v-model="informe.contenido.antecedentes"        
          label="Antecedentes"
          auto-grow
          outlined
          readonly
          rows="2"
          row-height="40"                    
          color="#009900"
          shaped
        ></v-textarea>
        <v-textarea
          v-model="informe.contenido.situacionactual"        
          label="Situación Educativa Actual"
          auto-grow
          outlined
          readonly
          rows="2"
          row-height="40"                    
          color="#009900"
          shaped
        ></v-textarea>                
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
                    <v-btn block @click="cerrarDialogo()" color="primary">
                      <v-icon left>mdi-close-outline</v-icon>
                      <span>Cerrar</span>
                    </v-btn>
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
    name:"DetalleInformeEducativoEvolutivo",
    props:["informe","titulo"],
    data () {
      return {                
        datemenu: false,
        step:1
      }
    },
    methods:{
        cerrarDialogo(){
            this.$emit("close-dialog-detail");
        }
    }
}
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