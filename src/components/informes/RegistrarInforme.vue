<template>
    <v-card >
        <v-card-title class="justify-center">Seleccione el tipo de informe que desea registrar</v-card-title>               
         <div  class="container-user">
             <v-card-text>            
            <v-select
                v-model="items.value"
                :items="items"
                label="Selector de Formularios de Informes"
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
                <template>
                    <v-col>
                        <v-btn block @click="abrirDialogo()" color="success">
                        <v-icon left>done</v-icon>
                        <span >Continuar</span>
                        </v-btn>
                        <RegistrarInformeEducativoEvolutivo v-if="showRegistrarInformeEE" :listaresidentes="listaresidentes" :listaeducadores="listaeducadores" 
                        :visible="showRegistrarInformeEE" :titulo="titulo" @close="showRegistrarInformeEE=false"/>                     
                        <RegistrarInformeEducativoInicial 
                            :listaresidentes="listaresidentes"
                            :listaeducadores="listaeducadores"                             
                            :visible="showRegistrarInformeEI"  
                            @close="showRegistrarInformeEI=false"/>                  
                    </v-col>
                </template>
            </v-row>
            </v-card-text>                       
         </div>
    </v-card>
</template>
<script> 
import axios from 'axios';
import RegistrarInformeEducativoInicial from '@/components/informes/RegistrarInformeEducativoInicial.vue'
import RegistrarInformeEducativoEvolutivo from '@/components/informes/RegistroInformeEducativoEvolutivo.vue'
import {mapMutations, mapState} from "vuex";
export default {
    props:["listaresidentes", "listaeducadores"],
    components: {
        RegistrarInformeEducativoInicial,
        RegistrarInformeEducativoEvolutivo
    },
    data () {
      return {                
        items: [
            { value: '1', text: 'Informe Educativo Inicial'},
            { value: '2', text: 'Informe Educativo Evolutivo'},
            { value: '3', text: 'Informe Educativo Final'},
            { value: '4', text: 'Informe Social Inicial'},
            { value: '5', text: 'Informe Social Evolutivo'},
            { value: '6', text: 'Informe Social Final'},
            { value: '7', text: 'Informe Psicológico Inicial'},
            { value: '8', text: 'Informe Psicológico Evolutivo'},
            { value: '9', text: 'Informe Psicológico Final'}
        ],
        titulo:"Titulo por defecto",
        showRegistrarInformeEI: false,
        showRegistrarInformeEE: false
      }
    },
     methods:{
        cerrarDialogo(){            
            this.$emit("close-dialog-save");
        },
        abrirDialogo(){
            console.log(this.items.value);
            if(this.items.value === "1"){
                this.showRegistrarInformeEI = true;
            }else if(this.items.value ==="2"){
                this.titulo = "Registrar Informe Educativo Evolutivo"
                this.showRegistrarInformeEE = true;
            }else if(this.items.value ==="3"){
                this.titulo = "Registrar Informe Educativo Final"
                this.showRegistrarInformeEE = true;
            } 
            else{
                console.log("no encontre ni pincho");
            }
            this.$emit("close-dialog-save");
        },
     }
}
</script>