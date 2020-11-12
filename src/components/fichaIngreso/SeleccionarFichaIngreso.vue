<template>
    <v-card >
        <v-card-title class="justify-center">Nueva Ficha de Ingreso</v-card-title>               
         <div  class="container-user">
                <v-card-text>
                    <v-select              
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
                </v-select>
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
                <RegistrarFichaIngresoEducativa :listaresidentes="listaresidentes" :visible="RFichaIngresoEducativa_Visible"  @close-dialog-fichaIngreso="RFichaIngresoEducativa_Visible=false"/>
                <RegistrarFichaIngresoPsicologica :listaresidentes="listaresidentes" :visible="RFichaIngresoPsicologica_Visible"  @close-dialog-fichaIngreso="RFichaIngresoPsicologica_Visible=false"/>
                <RegistrarFichaIngresoSocial :listaresidentes="listaresidentes" :visible="RFichaIngresoSocial_Visible"  @close-dialog-fichaIngreso="RFichaIngresoSocial_Visible=false"/>
                
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