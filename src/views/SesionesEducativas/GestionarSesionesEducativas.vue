<template>
  <div>
    <v-card class="card">
      <v-card-title>Gestionar Sesiones Educativas</v-card-title>
      <v-data-table
        :headers="headers"
        :items="residentes"
        :search="search"
        :loading="loading"
        loading-text="Cargando residentes"
        class="elevation-1"
      > 
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Residentes SISCAR</v-toolbar-title>
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
                  <v-icon left>mdi-account-multiple-plus-outline</v-icon>
                  <span>Nueva Sesion Educativa</span>
                </v-btn>
              </template>
              <RegistrarSesionEducativa
                @close-dialog-save="closeDialogRegistrar()"
              ></RegistrarSesionEducativa>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <!--Abrir dialogo Ver Sesiones -->
          <v-row align="center" justify="space-around">
            <!--BOTONES-->
            <v-btn color="info" dark @click="abrirDialogoDetalle(item.id)">
              <v-icon left> info </v-icon>
              <span>Ver Sesiones</span>
            </v-btn>
          </v-row>
        </template>
      </v-data-table>
      <!--Dialogo de Detalle-->
      <v-dialog persistent v-model="dialogodetalle" max-width="880px">
        <DetalleSesionEducativa
          :residente="residente"
          @close-dialog-detail="closeDialogDetalle()"
        >
        </DetalleSesionEducativa>
      </v-dialog>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import RegistrarSesionEducativa from "@/components/sesioneseducativas/RegistrarSesionEducativa.vue";
import DetalleSesionEducativa from "@/components/sesioneseducativas/DetalleSesionEducativa.vue";
import { mapMutations, mapState } from "vuex";
export default {
  name: "GestionarSesionesEducativas",
  components:{
    RegistrarSesionEducativa, DetalleSesionEducativa
  },
  data(){
    return{
      search:"",
      residente: {},
      headers:[
        { text: "Nombre", align:"start", sortable:false, value: "nombre" },
        { text: "Apellido", value: "apellido" },
        { text: "Tipo de documento", value: "tipoDocumento" },
        { text: "N°documento", value: "numeroDocumento" },
        { text: "N° Fase", value: "" },
        { text: "Fase", value: "" },
        { text: "Actions", value: "actions", sortable: false }
      ],
      dialogoregistro: false,
      dialogodetalle: false,
      loading:true
    }
  },
  async created() {
    this.obtenerResidentes();
  },
  methods:{
    ...mapMutations(["setResidentes"]),
    closeDialogDetalle() {
      this.dialogodetalle = false;
    },
    closeDialogRegistrar() {
      this.dialogoregistro = false;
    },
    async abrirDialogoDetalle(idresidente) {
      this.residente = await this.loadResidenteDetalle(idresidente);
      this.dialogodetalle = !this.dialogodetalle;
    },

    //Obtener datos de un residente por id
    async loadResidenteDetalle(idresidente) {
      var user = {};
      await axios
        .get("/residente/id?id=" + idresidente)
        .then((res) => {
          console.log(res);
          user = res.data;
          user.fechaNacimiento = user.fechaNacimiento.split("T")[0];
          user.fechaIngreso = user.fechaIngreso.split("T")[0];
        })
        .catch((err) => console.log(err));
      console.log(user);
      return user;
    },


    //Datos para tabla principal
    async obtenerResidentes() {
      await axios
        .get("/residente/all")
        .then((res) => {
          this.loading = false;
          var info = {};
          info = res.data;
          console.log(res.data)
          for (var x=0;x<res.data.length;x++){
              info[x].fechaIngreso = res.data[x].fechaIngreso.split("T")[0];
          }
          this.setResidentes(info);
          
        })
        .catch((err) => console.log(err));
    },
  },
  computed:{
    ...mapState(["residentes"]),
    }
};
</script>

<style scoped>
.card {
  margin: 20px;
}
</style>
