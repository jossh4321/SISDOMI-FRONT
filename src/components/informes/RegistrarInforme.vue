<template>
    <v-card >
        <v-card-title class="justify-center">Seleccione el tipo de informe que desea registrar</v-card-title>               
         <div  class="container-user">
             <v-card-text>
            <v-combobox
                :items="items"
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
                    <v-btn block @click="registrarUsuario" color="success">
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
          'Informe Educativo Inicial',
          'Informe Educativo Evolutivo',
          'Informe Educativo Final',
          'Informe Social Inicial',
          'Informe Social Evolutivo',          
          'Informe Social Final',
          'Informe Psicológico Inicial',          
          'Informe Psicológico Evolutivo', 
          'Informe Psicológico Final'
        ],
      }
    },
     methods:{
         cerrarDialogo(){            
            this.$emit("close-dialog-save");
        },
     }
}
</script>