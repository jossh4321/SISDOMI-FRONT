<template>
    <v-card >
    <v-card-title class="justify-center">Registro de Informe Educativo Inicial</v-card-title>
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
        Análisis y Diagnóstico
      </v-stepper-step>
    </v-stepper-header>
    <!-- fdsfs -->
    <v-stepper-items>
      <v-stepper-content step="1">
        <div class="container-user">
      <form>
        <v-text-field          
          label="Usuaria CAR"
          outlined          
          color="#009900"
        ></v-text-field>
        <v-text-field
          label="Educador Responsable"
          outlined
          color="#009900"
        ></v-text-field>
        <v-textarea
          label="Lugar de Evaluación"
          auto-grow
          outlined
          rows="2"
          row-height="25"          
          color="#009900"
          shaped
        ></v-textarea>
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
              label="Fecha de Evaluación"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"                            
              color="#009900"
            ></v-text-field>
          </template>
          <v-date-picker            
            @input="menu2 = false"
            locale="es-es"
          ></v-date-picker>
        </v-menu>
        <v-textarea        
          label="Situación Académica"
          auto-grow
          outlined
          rows="2"
          row-height="40"                    
          color="#009900"
          shaped
        ></v-textarea>
        <v-textarea        
          label="Análisis Académico y de comportamiento"
          auto-grow
          outlined
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
        <div  class="container-user">      
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
    data() {
        return {
        datemenu: false,
        step: 1
        }
    },
    methods:{
         cerrarDialogo(){     
            this.step = 1;       
            this.$emit("close-dialog-save");
        },
    }
}
</script>