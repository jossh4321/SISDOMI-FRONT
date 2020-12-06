<template>
    <v-card >
        <v-card-title class="justify-center">Nueva Ficha de Ingreso</v-card-title>               
         <div  class="container-user">
                <v-card-text>
                <v-select              
                    :items="items"
                    v-model="items.value"
                    label="Seleccione la Ficha de Ingreso"            
                    outlined      
                    dense       
                ></v-select>      

           <v-row>
            <v-col>
                <v-btn block @click="cerrarDialogo()" color="primary">
                <v-icon left>mdi-close-outline</v-icon>
                <span>Cerrar</span>
                </v-btn>
            </v-col>
            <v-col>
                <v-btn block @click="abrirDialogo()" color="success">
                <v-icon left>mdi-page-next-outline</v-icon>
                <span>Continuar</span>
                </v-btn>
                
                
                <!--<RegistrarFichaIngresoSocial: :listaresidentes="listaresidentes" :visible="RFichaIngresoSocial_Visible_Visible"  @close="RFichaIngresoSocial_Visible_Visible=false" />-->
            </v-col>
        </v-row>
            </v-card-text>                       
         </div>
    </v-card>
</template>
<script> 


import axios from 'axios';
import RegistrarFichaIngresoEducativa from '@/components/fichaIngreso/RegistrarFichaIngresoEducativa.vue'
import RegistrarFichaIngresoPsicologica from '@/components/fichaIngreso/RegistrarFichaIngresoPsicologica.vue'
import RegistrarFichaIngresoSocial from '@/components/fichaIngreso/RegistrarFichaIngresoSocial.vue'
import {mapMutations, mapState} from "vuex";

export default {
    components: {
        RegistrarFichaIngresoEducativa,
        RegistrarFichaIngresoPsicologica,
        RegistrarFichaIngresoSocial
    },
    data () {
      return {               
        items: [
            { value: '1', text: 'Ficha de Ingreso Social'},
            { value: '2', text: 'Ficha de Ingreso Educativa'},
            { value: '3', text: 'Ficha de Ingreso Psicologica'}
        ],
        listaresidentes:[],
        RFichaIngresoEducativa_Visible: false,
        RFichaIngresoPsicologica_Visible: false,
        RFichaIngresoSocial_Visible: false
      }
    },
    async created(){    
      this.obtenerResidentes();
    },

    methods:{
        cerrarDialogo(){
            this.$emit("close-dialog-initial");
        },
        abrirDialogo(){
            console.log(this.items.value);
            if(this.items.value === "1"){
                this.RFichaIngresoSocial_Visible = true;
            }else if(this.items.value ==="2"){
                this.RFichaIngresoEducativa_Visible = true;
            }else if(this.items.value ==="3"){
                this.RFichaIngresoPsicologica_Visible = true;
            } 
            else{
                //;
            }
            this.$emit("close-dialog-initial");
        },
        async obtenerResidentes(){
          await axios.get("/residente/all")
                  .then( x => {
                            this.listaresidentes = x.data;
                            console.log(this.listaresidentes);
                  }).catch(err => console.log(err));
        }
     }
}
</script>