<template>
  <v-card>
    <v-card-title class="justify-center">Modificar Ficha Diagnostico Educativo</v-card-title>
    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step editable step="1">
          Datos Generales
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step editable step="2">
          Datos Especificos
        </v-stepper-step>

      </v-stepper-header>
         <v-stepper-items>
            <!--CONTIENE LOS STEPPERS CREADOS ARRIBA EN ESTE CASO SON TRES-->
            <v-stepper-content step="1"
              ><!--CONTIENE LOS STEPPERS 1 -->
              <div class="container-user">
                <form>


                     <!--Botones de card -->
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
            <v-stepper-content step="2"
              ><!--CONTIENE LOS STEPPERS 2 -->
              <div class="container-user">
                <form>


                     <!--Botones de card -->
                      <v-row>
                        <v-col>
                          <v-btn block @click="step = 1" color="success">
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
        </v-stepper-items>
     </v-stepper>
  </v-card>
</template>

<script>
export default {
name:"ActualizarFichaDiagnosticoEducativo",
data(){
    return{
     step:1,
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

<style>

</style>