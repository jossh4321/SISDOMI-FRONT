<template>
<v-dialog v-model="show">
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
      <v-stepper-items>
        <v-stepper-content step="1">
          <div class="container-user">
            <form>
                <v-autocomplete              
                  :items="listaresidentes"
                  filled
                  chips
                  dense
                  outlined          
                  color="#009900"
                  label="Usuaria CAR"
                  item-text="nombre"
                  item-value="id"                            
                >
                  <template v-slot:selection="data">
                    <v-chip
                      v-bind="data.attrs"
                      :input-value="data.selected"
                      style="margin-top:5px"
                    >
                      <v-avatar left color="#b3b3ff"  size="24">
                        <span style="font-size:12px">RT</span>
                      </v-avatar>
                        {{ data.item.nombre }}
                    </v-chip>
                  </template>
                  <template v-slot:item="data">
                    <template>
                    <v-list-item-avatar>
                      <v-avatar left color="#b3b3ff"  size="24">
                        <span style="font-size:12px">UC</span>
                      </v-avatar>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>Nombre completo: {{ data.item.nombre }} {{data.item.apellido}} </v-list-item-title>
                      <v-list-item-subtitle>Nro. Documento: {{data.item.numerodocumento}}</v-list-item-subtitle>                    
                    </v-list-item-content>
                    </template>
                  </template>
                </v-autocomplete> 

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
                    <v-btn block @click="show=false" color="primary">
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
              <v-row>
                <v-col>
                  <v-btn block @click="registrarInforme" color="success">
                    <v-icon left>mdi-content-save-all-outline</v-icon>
                    <span >Registrar Informe</span>
                  </v-btn>
                </v-col>
                <v-col>
                  <v-btn block @click="show=false" color="primary">
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
  </v-dialog>
</template>
<script> 

import axios from 'axios';
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import {mapMutations, mapState} from "vuex";
import { required, minLength,email,helpers } from 'vuelidate/lib/validators'
import moment from 'moment'

export default {
    props:["listaresidentes","visible"],
    ...mapMutations(["addInforme"]),
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
        async registrarInforme(){
         // this.$v.$touch();
          // if (this.$v.$invalid) {
          //   console.log('hay errores');
          //   this.mensaje('error','..Oops','Se encontraron errores en el formulario',"<strong>Verifique los campos Ingresados<strong>");
          // } else {
          //   console.log('no hay errores');
            await axios.post("/informe/informeei",this.informe)
              .then(res => {
                  this.informe = res.data;
                  this.addInforme(this.informe);
                  this.cerrarDialogo();
              }).catch(err => console.log(err));
          //  await this.mensaje('success','listo','Usuario registrado Satisfactoriamente',"<strong>Se redirigira a la Interfaz de Gestion<strong>");            
          //}
      }
      }, async mensaje(icono,titulo,texto,footer){
      await this.$swal({
        icon: icono,
        title: titulo,
        text: texto,
        footer:footer
      });
    },
    computed: {
    show: {
      get () {
        return this.visible
      },
      set (value) {
        if (!value) {
          this.$emit('close')
        }
      }
    }
  }
}
</script>