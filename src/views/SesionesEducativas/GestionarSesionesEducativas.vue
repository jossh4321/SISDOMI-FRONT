<template>
  <div>
    <v-card class="card">
      <v-card-title>Gestionar Sesiones Educativas</v-card-title>
      <v-data-table
        :headers="headers"
        :items="sesionesEducativas"
        :search="search"
        :loading="loading"
        loading-text="Cargando Sesiones Educativas"
        class="elevation-1"
      > 
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Sesiones Educativas SISCAR</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
            <v-spacer></v-spacer>
            <!--Dialogo de Registro de Nueva Sesion-->
            <v-dialog persistent v-model="dialogoregistro" max-width="880px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="success"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon left>mdi-book</v-icon>
                  <span>Nueva Sesion Educativa</span>
                </v-btn>
              </template>
              <RegistrarSesionEducativa
                :listaresidentes="listaresidentes"
                @close-dialog-dontsave="closeDialogRegistrar()"
              ></RegistrarSesionEducativa>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <!--BOTONES-->
          <v-row align="center" justify="space-around">
            <!--Abrir dialogo Ver Sesiones -->
            <v-btn color="info" dark @click="abrirDialogoDetalle(item.id)">
              <v-icon left> info </v-icon>
              <span>Ver Sesión</span>
            </v-btn>
            <!--Abrir Agregar Participante -->
            <v-btn color="info" dark @click="abrirDialogoParticipante(item.id)">
              <v-icon left>mdi-plus</v-icon>
              <span>Agregar Participante</span>
            </v-btn>
          </v-row>
        </template>
      </v-data-table>
      <!--Dialogo de Detalle-->
      <v-dialog persistent v-model="dialogodetalle" max-width="880px">
        <DetalleSesionEducativa
          :sesioneducativa="sesioneducativa"
          :datoSesion="datoSesion"
          :dialogodetalle="dialogodetalle"
          @close-dialog-detail="closeDialogDetalle()"
        ></DetalleSesionEducativa>
      </v-dialog>
      <!--Dialogo de Agregar Participantes-->
      <v-dialog persistent v-model="dialogoparticipante" max-width="880px">
        <AgregarParticipante
          :sesioneducativa="sesioneducativa"
          :listaresidentes="listaresidentes"
          @close-dialog-participantes="closeDialogParticipantes()"
        ></AgregarParticipante>
      </v-dialog>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import AgregarParticipante from "@/components/sesioneseducativas/AgregarParticipante.vue";
import RegistrarSesionEducativa from "@/components/sesioneseducativas/RegistrarSesionEducativa.vue";
import DetalleSesionEducativa from "@/components/sesioneseducativas/DetalleSesionEducativa.vue";
import { mapMutations, mapState } from "vuex";
export default {
  name: "GestionarSesionesEducativas",
  components:{
    AgregarParticipante, RegistrarSesionEducativa, DetalleSesionEducativa
  },
  data(){
    return{
      search:"",
      sesioneducativa: {},
      datoSesion:{},
      headers:[
        { text: "Titulo", align:"start", sortable:false, value: "titulo" },
        { text: "Tipo de Sesión", value: "tipo" },
        { text: "Id Creador", value: "idCreador" },
        { text: "Fecha de Creacion", value: "fechaCreacion" },
        { text: "Area", value: "area" },
        { text: "Actions", value: "actions", sortable: false }
      ],
      listaresidentes:[],
      dialogoregistro: false,
      dialogodetalle: false,
      dialogoparticipante:false,
      loading:true
    }
  },
  async created() {
    this.obtenerSesionesEducativas();
    this.obtenerResidentes();
    this.obtenerEducadores();
  },
  methods:{
    ...mapMutations(["setSesionesEducativas","setResidentes"]),
    closeDialogDetalle() {
      this.dialogodetalle = false;
    },
    closeDialogRegistrar() {
      this.dialogoregistro = false;
    },
    closeDialogParticipantes() {
      console.log("asdasdasdasda");
      this.dialogoparticipante = false;
    },

    convertDateFormat(string) {
        //cambia formato de fecha de MongoDB a dd/MM/yyyy
        var dateMongo = string.split('T');
        var date = dateMongo[0].split('-');
        return date[2] + '/' + date[1] + '/' + date[0];
    },
    async abrirDialogoDetalle(idsesion) {
      this.sesioneducativa = await this.loadSesionEducativaDetalle(idsesion);
      this.datoSesion= await this.obtenerSesionEducativaDTO(idsesion);
      this.dialogodetalle = !this.dialogodetalle;
    },
    async abrirDialogoParticipante(idsesion) {
      await this.obtenerResidentes();
      this.listaresidentes = this.residentes;
      console.log("Lista de Residentes:")
      console.log(this.listaresidentes)
      this.sesioneducativa = await this.loadSesionEducativaDetalle(idsesion);
      this.dialogoparticipante = !this.dialogoparticipante;
    },

    //Obtener datos de una sesión por id
    async loadSesionEducativaDetalle(idsesion) {
      var user = {};
      await axios
        .get("/SesionesEducativas/id?id=" + idsesion)
        .then((res) => {
          user = res.data;
          user.fechaCreacion = user.fechaCreacion.split("T")[0];
        })
        .catch((err) => console.log(err));
      console.log(user);
      return user;
    },
    //Obtener datos de una sesión por id
    async obtenerSesionEducativaDTO(idsesion) {
      var user = {};
      await axios
        .get("/SesionesEducativas/allsesiondto/id?id=" + idsesion)
        .then((res) => {
          user = res.data;
          user.fechacreacion = user.fechacreacion.split("T")[0];
          for (var x=0;x<user.contenido.participantes.length;x++){
              user.contenido.participantes[x].fecha = user.contenido.participantes[x].fecha.split("T")[0];
          }
        })
        .catch((err) => console.log(err));
      console.log("Sesion educativa DTO:");
      console.log(user);
      return user;
    },
    //Datos para tabla principal
    async obtenerSesionesEducativas() {
      await axios
        .get("/SesionesEducativas/all")
        .then((res) => {
          this.loading = false;
          console.log(res.data)
          var info = {};
          info = res.data;
          for (var x=0;x<res.data.length;x++){
              info[x].fechaCreacion = this.convertDateFormat(info[x].fechaCreacion);
          }
          this.setSesionesEducativas(info);
          
        })
        .catch((err) => console.log(err));
    },

    //Lista de Residentes para agregar participantes
    async obtenerResidentes() {
      await axios
        .get("/residente/all")
        .then((res) => {
          var info = {};
          info = res.data;
          //this.listaresidentes = info;
          for (var x=0;x<res.data.length;x++){
              info[x].fechaIngreso = res.data[x].fechaIngreso.split("T")[0];
          }
          
          this.setResidentes(info);
          console.log("infooo");
          console.log(info);
        })
        .catch((err) => console.log(err));
    },
  },
  computed:{
    ...mapState(["sesionesEducativas","residentes"]),
    }
};
</script>

<style scoped>
.card {
  margin: 20px;
}
</style>
