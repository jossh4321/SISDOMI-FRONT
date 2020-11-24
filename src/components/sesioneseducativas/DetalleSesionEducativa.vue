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
            <v-row>
              <v-col>
                <v-select
                  v-model="select"
                  :items="items"
                  item-text="text"
                  item-value="value"
                  label="Filtrar por:"
                  return-object
                  outlined
                  dense
                ></v-select> 
              </v-col>
              <v-col>
                <v-text-field
                  v-model="search"
                  label="Buscar..."
                  outlined
                  clearable
                  type="text"
                  dense
                ></v-text-field>
              </v-col>
              <v-col>
                <v-btn @click="filtradoSearch(datoSesion.contenido.participantes, select)" small fab dark color="blue">
                  <v-icon center>mdi-magnify</v-icon>
                </v-btn>
              </v-col>
            </v-row>

            <v-expansion-panels focusable>
              <v-expansion-panel
                v-for="(item,i) in participantesFiltrados"
                :key="i"
              >
                <v-card outlined tile>
                  <v-expansion-panel-header>
                    <v-row no-gutters>
                      <v-col cols="6">
                        <v-avatar left color="#81C3F8" size="24" style="margin-right:8px">
                          <span style="font-size:10px">PR</span>
                        </v-avatar>
                        <span :class="[(select.value==='1') ? 'resaltado' : '']">{{item.datosresidente.nombre + " "}}</span>
                        <span :class="[(select.value==='2') ? 'resaltado' : '']">{{item.datosresidente.apellido}}</span>
                      </v-col>
                      <v-col cols="6">No. Doc:<span :class="[(select.value==='3') ? 'resaltado' : '']">{{" "+ item.datosresidente.numerodocumento}}</span></v-col>
                    </v-row>
                  </v-expansion-panel-header>
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
                </v-card>
              </v-expansion-panel>
              <p style="color:grey;margin-top:2%;margin-bottom:0%" >Encontrados: {{numeroEcontrados(participantesFiltrados)}}</p>
            </v-expansion-panels>
            <v-card-actions v-if="!edicion" style="margin-top:2%">
              <v-btn @click="activarEdicionSesionEducativa()" color="warning">
                <v-icon left>mdi-book-outline</v-icon>
                <span>Modificar</span>
              </v-btn>
            </v-card-actions >
            <v-card-actions v-else style="margin-top:2%">
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
      select: { value: "1", text: "Nombre" },
      items: [
        { value: "1", text: 'Nombre'},
        { value: "2", text: 'Apellido'},
        { value: "3", text: 'Numero Documento'},
      ],
      participantesFiltrados: [],
      search:"",
      edicion:false,
      botonGuardarSesionEducativa:false,
      step:1,
      datemenu: false,
      datoSesion:{}
    }
  },
  watch:{
    search: function(search){
        this.filtradoSearch(this.datoSesion.contenido.participantes, search)
    },
    participantesFiltrados:async function(){
        if(this.numeroEcontrados(this.participantesFiltrados)===0){
          this.participantesFiltrados = await this.datoSesion.contenido.participantes;
        }
    }
  },
  methods:{
    cerrarDialogo() {
      this.$emit("close-dialog-detail");
      this.step=1;
      this.participantesFiltrados = this.datoSesion.contenido.participantes;
      this.select= { value: "1", text: "Nombre" };
      this.search="";
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

    filtradoSearch(array, string){
      if(this.select.value==="1"){
        this.participantesFiltrados = array.filter(partic => partic.datosresidente.nombre.includes(string));
      }
      else if(this.select.value==="2"){
        this.participantesFiltrados = array.filter(partic => partic.datosresidente.apellido.includes(string));
      }
      else if(this.select.value==="3"){
        this.participantesFiltrados = array.filter(partic => partic.datosresidente.numerodocumento.includes(string));
      }
      if(this.participantesFiltrados.length===0){
        console.log("No se encontró al participante")
      }

    },
    numeroEcontrados(array){
      return array.length;
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
    this.participantesFiltrados = await this.datoSesion.contenido.participantes;
    
  }

}
</script>

<style scoped>
.resaltado{
  font-weight: 600;
}
</style>