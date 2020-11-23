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
                v-for="(item,i) in datoSesion.contenido.participantes"
                :key="i"
              >
                <v-expansion-panel-header>{{item.datosresidente.nombre + " " + item.datosresidente.apellido }}</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <form>
                    <v-card elevation="0">
                      <v-text-field
                          v-model="item.grado"
                          style="margin-top_5px"
                          :readonly="!edicion"
                          color="#009900"
                          label="Grado"
                      ></v-text-field>
                      <v-text-field
                          v-model="item.firma"
                          style="margin-top_5px"
                          :readonly="!edicion"
                          color="#009900"
                          label="Firma (enlace)"
                      ></v-text-field>
                      <v-text-field
                          v-model="item.observaciones"
                          style="margin-top_5px"
                          :readonly="!edicion"
                          color="#009900"
                          label="Observaciones"
                      ></v-text-field>
                      <v-card-actions v-if="edicion" align="right">
                        <v-row
                          align="center"
                          justify="end"
                        >
                          <v-btn dark color="red">
                            <v-icon left>mdi-delete</v-icon>
                            <span>Eliminar Participante</span>
                          </v-btn>
                        </v-row>
                      </v-card-actions>
                      
                    </v-card>
                  </form>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
            <v-card-actions v-if="!edicion" style="margin-top:3%">
              <v-btn @click="activarEdicionSesionEducativa()" color="warning">
                <v-icon left>mdi-book-outline</v-icon>
                <span>Modificar</span>
              </v-btn>
            </v-card-actions >
            <v-card-actions v-else style="margin-top:3%">
              <v-btn @click="GuardarEdicionSesionEducativa()" color="success">
                <v-icon left>mdi-page-next-outline</v-icon>
                <span>Guardar</span>
              </v-btn>
              <v-btn @click="CancelarEdicionSesionEducativa()"  dark color="red">
                <span>Cancelar</span>
              </v-btn>
            </v-card-actions>
          </v-card>
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
import axios from "axios";
import moment from "moment";
export default {
  name: "DetalleSesionEducativa",
  props: ["sesioneducativa"],
  data(){
    return{
      edicion:false,
      botonGuardarSesionEducativa:false,
      step:1,
      datemenu: false,
      datoSesion:{}
    }
  },
  methods:{
    cerrarDialogo() {
      this.$emit("close-dialog-detail");
      this.step=1;
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
    //Obtener datos de una sesión por id
    async obtenerSesionEducativaDTO(idsesion) {
      var user = {};
      await axios
        .get("/SesionesEducativas/allsesiondto/id?id=" + idsesion)
        .then((res) => {
          user = res.data;
          user.fechacreacion = user.fechacreacion.split("T")[0];
        })
        .catch((err) => console.log(err));
      console.log("Sesion educativa DTO:");
      console.log(user);
      return user;
    },
  },
  async created() {
    this.datoSesion= await this.obtenerSesionEducativaDTO(this.sesioneducativa.id);
  },
}
</script>

<style>

</style>