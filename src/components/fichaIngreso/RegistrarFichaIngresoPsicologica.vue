<template>
    <v-card >
      <v-card-title class="justify-center">Registrar Ficha de Ingreso Psicológica</v-card-title>
      <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step 
          editable
          step="1"
        >
        Datos del Residente
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step
          editable
          step="2"
        >
        Datos Psicológicos
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
                  label="Residente"
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
                </v-autocomplete> 

                <v-row>
                    <v-col>
                        <v-text-field
                            label="Nombres"
                            auto-grow
                            outlined        
                            color="#009900"
                            shaped
                        ></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field
                            label="Apellidos"
                            auto-grow
                            outlined         
                            color="#009900"
                            shaped
                        ></v-text-field>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col>
                        <v-select              
                            :items="itemSexo"
                            v-model="itemSexo.value"
                            label="Sexo"
                            outlined      
                            dense       
                        ></v-select>
                    </v-col>
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
                                    label="Fecha de Nacimiento"
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
                    </v-col>
                </v-row>

                <v-row>
                    <v-col>
                        <v-text-field
                            label="Apoderado"
                            auto-grow
                            outlined       
                            color="#009900"
                            shaped
                        ></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field
                            label="Celular"
                            auto-grow
                            outlined       
                            color="#009900"
                            shaped
                        ></v-text-field>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col>
                        <v-btn block @click="cerrarDialogo" color="primary">
                            <v-icon left>mdi-close-outline</v-icon>
                            <span>Cerrar</span>
                        </v-btn>
                    </v-col>
                    <v-col>
                        <v-btn block color= yellow>
                            <v-icon left>mdi-page-next-outline</v-icon>
                            <span>Ver más del Residente</span>
                        </v-btn>
                    </v-col>
                    <v-col>
                        <v-btn block @click="step = 2" color="success">
                            <v-icon left>mdi-page-next-outline</v-icon>
                            <span>Continuar</span>
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
                        <v-text-field
                            label="Entrevistador"
                            auto-grow
                            outlined        
                            color="#009900"
                            shaped
                        ></v-text-field>
                    </v-col>
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
                                    label="Fecha de Entrevista"
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
                    </v-col>
                </v-row>
                
                <v-textarea
                    label="Diagnostico"
                    auto-grow
                    outlined        
                    color="#009900"
                    shaped
                ></v-textarea>

                <v-expansion-panels 
                popout
                shaped
                >
                    <v-expansion-panel>
                        <v-expansion-panel-header>Observaciones del Residente</v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <v-textarea
                                label="Observación 1"
                                auto-grow
                                outlined         
                                color="#009900"
                                shaped
                            ></v-textarea>
                            <v-btn 
                            depressed
                            color= rgba(0,0,0,0.2)
                            >
                                <span>Agregar Observación</span>
                            </v-btn>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>

                

              <v-row>
                    <v-col>
                        <v-btn block @click="cerrarDialogo" color="primary">
                            <v-icon left>mdi-close-outline</v-icon>
                            <span>Cerrar</span>
                        </v-btn>
                    </v-col>
                    <v-col>
                        <v-btn block @click="step = 1" color= yellow>
                            <v-icon left>mdi-page-next-outline</v-icon>
                            <span>Ver datos del Residente</span>
                        </v-btn>
                    </v-col>
                    <v-col>
                        <v-btn block @click="registrarFichaPsicologicaIngreso" color="success">
                            <v-icon left>mdi-content-save-all-outline</v-icon>
                            <span >Registrar Ficha de Ingreso</span>
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
        
    props:["listaresidentes","visible"],
    ...mapMutations(["setFichaIngreso","addFichaIngreso"]),
    data() {
        return {
            itemSexo: [
                { value: '1', text: 'Femenino'},
                { value: '2', text: 'Masculino'}
            ],

            datemenu: false,
            step: 1
        }
    },
    methods:{
        cerrarDialogo(){     
            this.step = 1;       
            this.$emit("cerrar-modal-registro-ficha-ingreso");
        }, 
        async registrarFichaPsicologicaIngreso(){
            
            await axios.post("/Documento/all/fichaingresopsicologicacrear")
              .then(res => {
                    //console.log( "porfavor" )
              this.fichaIngreso=res.data;
              this.rFichaIngresoP(res.data);
              this.addFichaIngreso(this.fichaIngreso)
            }).catch(err => console.log(err));
            
      }
      , async mensaje(icono,titulo,texto,footer){
      await this.$swal({
        icon: icono,
        title: titulo,
        text: texto,
        footer:footer
      });
    },
    async registrarInforme(){

    },
    },
    computed: {
    show: {
      get () {
        return this.visible
      },
      set (value) {
        if (!value) {
          this.$emit('close-dialog-fichaIngreso')
        }
      }
    }
  }
}
</script>