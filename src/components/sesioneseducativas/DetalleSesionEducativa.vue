<template>
  <v-card>
    <v-card-title class="justify-center">Sesiones Educativas</v-card-title>
    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step editable step="1">Datos de la Sesión Educativa</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step editable step="2">Participantes de la Sesión Educativa</v-stepper-step>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content step="1">

          <!--Div que contendrá todos los datos de una sola sesion educativa-->
          <v-card class="container-user">
            <div style="margin-top:5px">
              <form>
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="sesioneducativa.titulo"
                      :readonly="!edicion"
                      color="#009900"
                      label="Titulo de Sesión"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="sesioneducativa.area"
                      :readonly="!edicion"
                      color="#009900"
                      label="Area correspondiente"
                    ></v-text-field>
                  </v-col>
                </v-row>
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
                      v-model="sesioneducativa.fechaCreacion"
                      style="margin-top_5px"
                      :readonly="!edicion"
                      color="#009900"
                      prepend-icon="mdi-calendar"
                      v-bind="attrs"
                      v-on="on"
                      label="Fecha de Realización de Sesion de Aprendizaje"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="sesioneducativa.fechaCreacion"
                    :readonly="!edicion"
                    @input="menu2 = false"
                    locale="es-es"
                  ></v-date-picker>
                </v-menu>
              </form>
            </div>
            <v-card-actions v-if="!edicion">
              <v-btn @click="activarEdicionSesionEducativa()" color="warning">
                <v-icon left>mdi-book-outline</v-icon>
                <span>Modificar</span>
              </v-btn>
            </v-card-actions >
            <v-card-actions v-else>
              <v-btn @click="step=2" color="success">
                <v-icon left>mdi-page-next-outline</v-icon>
                <span>Continuar</span>
              </v-btn>
              <v-btn @click="CancelarEdicionSesionEducativa()"  dark color="red">
                <span>Cancelar</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-stepper-content>
        <v-stepper-content step="2">
          <v-card>
            <v-expansion-panels focusable>
              <v-expansion-panel
                v-for="(item,i) in sesioneducativa.contenido.participantes"
                :key="i"
              >
                <v-expansion-panel-header>{{item.idparticipante}}</v-expansion-panel-header>
                <v-expansion-panel-content>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
            <v-card-actions v-if="edicion">
              <v-btn @click="GuardarEdicionSesionEducativa()" color="success">
                <v-icon left>mdi-page-next-outline</v-icon>
                <span>Guardar</span>
              </v-btn>
              <v-btn @click="CancelarEdicionSesionEducativa()"  dark color="red">
                <span>Cancelar</span>
              </v-btn>
            </v-card-actions>
          </v-card>
          <!-- Esto no va aqui exactamente, solo es vista y modificacion, no insercion  
          <AgregarParticipante
          :sesioneducativa="sesioneducativa"
          :listaresidentes="listaresidentes"
          @close-dialog-detail="closeDialogDetalle()"
        ></AgregarParticipante> -->
        </v-stepper-content>  
        <v-spacer></v-spacer>
        <v-card-actions style="padding:2% 3%">
          <v-btn :disabled="edicion" block color="red"  :dark="!edicion" @click="cerrarDialogo()">
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-stepper-items>
    </v-stepper>
  </v-card>
</template>

<script>
import AgregarParticipante from "@/components/sesioneseducativas/AgregarParticipante.vue";
import moment from "moment";
export default {
  name: "DetalleSesionEducativa",
  props: ["sesioneducativa"],
  components:{
    AgregarParticipante
  },
  data(){
    return{
      edicion:false,
      botonGuardarSesionEducativa:false,
      step:1,
      datemenu: false,
    }
  },
  methods:{
    cerrarDialogo() {
      this.$emit("close-dialog-detail");
    },
    activarEdicionSesionEducativa(){
      this.edicion = true;
    },
    GuardarEdicionSesionEducativa(){
      this.edicion = false;
      //Petición post para guardar edicion de sesion
    },
    CancelarEdicionSesionEducativa(){
      this.edicion = false;
      //Cancelar edicion de Reforzamiento
    },
  },
  created(){
    
  }
}
</script>

<style>

</style>