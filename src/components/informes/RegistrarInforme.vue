<template>
    <v-card >
        <v-card-title class="justify-center">Seleccione el tipo de informe que desea registrar</v-card-title>               
         <div  class="container-user">
             <v-card-text>            
            <v-combobox              
                :items="items"
                v-model="items.value"
                label="Selector de Formularios de Informes"            
                outlined
                dense                
            ></v-combobox>            
            <v-row>
                <v-col>
                    <v-btn block @click="cerrarDialogo()" color="primary">
                    <v-icon left>mdi-close-outline</v-icon>
                    <span>Cerrar</span>
                    </v-btn>
                </v-col>
                <v-col>
                    <v-btn block color="success">
                    <v-icon left>done</v-icon>
                    <span >Continuar</span>
                    </v-btn>                    
                </v-col>
            </v-row>
            </v-card-text>                       
         </div>
    </v-card>
</template>
<script> 

export default {
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
      }
    },
     methods:{
         cerrarDialogo(){            
            this.$emit("close-dialog-save");
        }
     }
}
</script>