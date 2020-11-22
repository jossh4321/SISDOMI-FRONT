<template>
  <v-card>
    <v-card-title class="justify-center">Detalle de Seguimiento Educativo</v-card-title>
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
                  </form>
              </div>
            </v-stepper-content>
         </v-stepper-items>
    </v-stepper>
  </v-card>
</template>

<script>
export default {
name:RegistrarSeguimientoEducativo
}
</script>

<style>

</style>