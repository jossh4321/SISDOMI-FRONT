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
                <v-btn block @click="cerrarDialogo()" color="success">
                <v-icon left>mdi-page-next-outline</v-icon>
                <span>Continuar</span>
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
            { value: '1', text: 'Ficha de Ingreso Social'},
            { value: '2', text: 'Ficha de Ingreso Educativa'},
            { value: '3', text: 'Ficha de Ingreso Psicologica'}
        ],
      }
    },
     methods:{
         cerrarDialogo(){
            this.$emit("close-dialog-initial");
        }
     }
}
</script>