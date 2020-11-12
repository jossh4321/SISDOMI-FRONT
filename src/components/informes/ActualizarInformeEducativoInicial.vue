<template>
    <v-card>
      <v-card-title class="justify-center">Modificación de Informe Educativo Inicial</v-card-title>
    </v-card>
</template>
<script> 
import axios from 'axios';
import RegistrarInformeEducativoInicial from '@/components/informes/RegistrarInformeEducativoInicial.vue'
import RegistrarInformeEducativoEvolutivo from '@/components/informes/RegistroInformeEducativoEvolutivo.vue'
import {mapMutations, mapState} from "vuex";
export default {
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
        listaresidentes:[],
        titulo:"Titulo por defecto",
        listaeducadores:[],
        showRegistrarInformeEI: false,
        showRegistrarInformeEE: false
      }
    }
}
</script>