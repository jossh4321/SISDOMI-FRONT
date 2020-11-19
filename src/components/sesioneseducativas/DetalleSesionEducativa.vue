<template>
  <v-card>
    <v-card-title class="justify-center">Sesiones Educativas</v-card-title>
    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step editable step="1">Sesiones de Aprendizaje</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step editable step="2">Sesiones de Reforzamiento</v-stepper-step>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content step="1">

          <!--Div que contendrá todos los datos de una sola sesion de aprendizaje-->
          <v-card color="#EFEFEF" style="padding:3%" class="container-user">
            <form>
              <v-text-field
                style="margin-top_5px"
                outlined
                :readonly="!edicionAprendizaje"
                color="#009900"
                label="Curso/Materia"
              ></v-text-field>

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
                    v-model="fechaejemplo"
                    style="margin-top_5px"
                    outlined
                    :readonly="!edicionAprendizaje"
                    color="#009900"
                    prepend-icon="mdi-calendar"
                    v-bind="attrs"
                    v-on="on"
                    label="Fecha de Realización"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="fechaejemplo"
                  :readonly="!edicionAprendizaje"
                  @input="menu2 = false"
                  locale="es-es"
                ></v-date-picker>
              </v-menu>
              
              <v-text-field
                style="margin-top_5px"
                outlined
                :readonly="!edicionAprendizaje"
                color="#009900"
                label="Observaciones"
              ></v-text-field>
              <v-text-field
                style="margin-top_5px"
                outlined
                :readonly="!edicionAprendizaje"
                color="#009900"
                label="Curso/Materia"
              ></v-text-field>
            </form>
            <v-card-actions v-if="!edicionAprendizaje">
              <v-btn @click="activarEdicionAprendizaje()" color="warning">
                <v-icon left>mdi-book-outline</v-icon>
                <span>Modificar</span>
              </v-btn>
            </v-card-actions >
            <v-card-actions v-else>
              <v-btn @click="GuardarEdicionAprendizaje()" color="success">
                <v-icon left>mdi-page-next-outline</v-icon>
                <span>Guardar</span>
              </v-btn>
              <v-btn @click="CancelarEdicionAprendizaje()" dark color="red">
                <span>Cancelar</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-stepper-content>
        <v-stepper-content step="2">
          <!--Div que contendrá todos los datos de una sola sesion de reforzamiento-->
          <v-card color="#EFEFEF" style="padding:3%" class="container-user">
            <form>
              <v-text-field
                style="margin-top_5px"
                outlined
                :readonly="!edicionReforzamiento"
                color="#009900"
                label="Curso/Materia"
              ></v-text-field>

              <v-menu
                v-model="datemenu1"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="fechaejemplo"
                    style="margin-top_5px"
                    outlined
                    :readonly="!edicionReforzamiento"
                    color="#009900"
                    prepend-icon="mdi-calendar"
                    v-bind="attrs"
                    v-on="on"
                    label="Fecha de Realización"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="fechaejemplo"
                  :readonly="!edicionReforzamiento"
                  @input="menu2 = false"
                  locale="es-es"
                ></v-date-picker>
              </v-menu>
              
              <v-text-field
                style="margin-top_5px"
                outlined
                :readonly="!edicionReforzamiento"
                color="#009900"
                label="Observaciones"
              ></v-text-field>
              <v-text-field
                style="margin-top_5px"
                outlined
                :readonly="!edicionReforzamiento"
                color="#009900"
                label="Curso/Materia"
              ></v-text-field>
            </form>
            <v-card-actions v-if="!edicionReforzamiento">
              <v-btn @click="activarEdicionReforzamiento()" color="warning">
                <v-icon left>mdi-book-outline</v-icon>
                <span>Modificar</span>
              </v-btn>
            </v-card-actions >
            <v-card-actions v-else>
              <v-btn @click="GuardarEdicionReforzamiento()" color="success">
                <v-icon left>mdi-page-next-outline</v-icon>
                <span>Guardar</span>
              </v-btn>
              <v-btn @click="CancelarEdicionReforzamiento()" dark color="red">
                <span>Cancelar</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-stepper-content>  
        <v-spacer></v-spacer>
        <v-card-actions style="padding:2% 3%">
          <v-btn block color="red" dark @click="cerrarDialogo()">
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-stepper-items>
    </v-stepper>
  </v-card>
</template>

<script>
import moment from "moment";
export default {
  name: "DetalleSesionEducativa",
  props: ["residente"],
  data(){
    return{
      edicionAprendizaje:false,
      edicionReforzamiento:false,
      botonGuardarAprendizaje:false,
      botonGuardarReforzamiento:false,
      step:1,
      datemenu: false,
      datemenu1:false,
      fechaejemplo: '2011-04-11' //Ejemplo de fecha
    }
  },
  methods:{
    cerrarDialogo() {
      this.$emit("close-dialog-detail");
    },
    activarEdicionAprendizaje(){
      this.edicionAprendizaje = true;
    },
    activarEdicionReforzamiento(){
      this.edicionReforzamiento = true;
    },
    GuardarEdicionAprendizaje(){
      this.edicionAprendizaje = false;
      //Petición post para guardar edicion de sesion
    },
    GuardarEdicionReforzamiento(){
      //Petición post para guardar edicion de sesion
      this.botonGuardarReforzamiento = true;
      //Si todo es correcto, sucederá lo siguiente
      this.edicionReforzamiento = false;
    },
    CancelarEdicionAprendizaje(){
      this.edicionAprendizaje = false;

      //Cancelar edicion de Reforzamiento
    },
    CancelarEdicionReforzamiento(){
      //Cancelar edicion de Reforzamiento
      this.botonGuardarReforzamiento = true;
      //Si todo es correcto, sucederá lo siguiente
      this.edicionReforzamiento = false;
      
    }
  }
}
</script>

<style>

</style>