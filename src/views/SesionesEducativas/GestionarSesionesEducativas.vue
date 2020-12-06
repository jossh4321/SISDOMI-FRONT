<template>
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
            <v-dialog persistent v-model="dialogoregistro" max-width="900px">
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
                @close-dialog-dontsave="closeDialogRegistrar()"
                :dialogoregistro="dialogoregistro"
              ></RegistrarSesionEducativa>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <!--BOTONES-->
          <v-row align="center" justify="space-around">
            <!--Abrir dialogo Modificar -->
            <v-btn color="warning" dark @click="abrirDialogoModificar(item.id,item)">
              <v-icon left> mdi-pencil </v-icon>
              <span>Modificar Sesion</span>
            </v-btn>
            <!--Abrir dialogo Ver Sesiones -->
            <v-btn color="info" dark @click="abrirDialogoDetalle(item.id,item)">
              <v-icon left> info </v-icon>
              <span>Ver Sesión</span>
            </v-btn>
            <!--Abrir Agregar Participante -->
            <v-btn color="#6FB7F0" dark @click="abrirDialogoParticipante(item.id,item)">
              <v-icon left>mdi-plus</v-icon>
              <span>Agregar Participante</span>
            </v-btn>
          </v-row>
        </template>
      </v-data-table>
      <!--Dialogo de Modificacion-->
      <v-dialog persistent v-model="dialogomodificar" max-width="880px">
        <ModificarSesionEducativa
          :sesioneducativa="sesioneducativa"
          :datoSesion="datoSesion"
          :dialogomodificar="dialogomodificar"
          @close-dialog-edit="closeDialogModificar()"
        ></ModificarSesionEducativa>
      </v-dialog>
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
      <v-dialog persistent v-model="dialogoparticipante" max-width="920px">
        <AgregarParticipante
          :sesioneducativa="sesioneducativa"
          :dialogoparticipante="dialogoparticipante"
          @close-dialog-participantes="closeDialogParticipantes()"
        ></AgregarParticipante>
      </v-dialog>
    </v-card>
</template>

<script>
import axios from "axios";
import AgregarParticipante from "@/components/sesioneseducativas/AgregarParticipante.vue";
import ModificarSesionEducativa from "@/components/sesioneseducativas/ModificarSesionEducativa.vue";
import RegistrarSesionEducativa from "@/components/sesioneseducativas/RegistrarSesionEducativa.vue";
import DetalleSesionEducativa from "@/components/sesioneseducativas/DetalleSesionEducativa.vue";
import { mapMutations, mapState } from "vuex";
export default {
  name: "GestionarSesionesEducativas",
  components:{
    AgregarParticipante, RegistrarSesionEducativa, DetalleSesionEducativa, ModificarSesionEducativa
  },
  data(){
    return{
      search:"",
      sesioneducativa: {},
      datoSesion:{},
      headers:[
        { text: "Titulo", align:"start", sortable:false, value: "titulo" },
        { text: "Tipo de Sesión", value: "tipo" },
        { text: "Id Creador", value: "datoscreador.usuario" },
        { text: "Fecha de Creacion", value: "fechaCreacion" },
        { text: "Area", value: "area" },
        { text: "Actions", value: "actions", sortable: false }
      ],
      dialogoregistro: false,
      dialogomodificar:false,
      dialogodetalle: false,
      dialogoparticipante:false,
      loading:true
    }
  },
  async created() {
    this.obtenerSesionesEducativas();
    //this.obtenerResidentes();
    //this.obtenerEducadores();
  },
  methods:{
    ...mapMutations(["setSesionesEducativas","setResidentes"]),
    closeDialogDetalle() {
      this.dialogodetalle = false;
    },
    closeDialogModificar() {
      this.dialogomodificar = false;
    },
    closeDialogRegistrar() {
      this.dialogoregistro = false;
    },
    closeDialogParticipantes() {
      this.dialogoparticipante = false;
    },

    convertDateFormat(string) {
        //cambia formato de fecha de MongoDB a dd/MM/yyyy
        var dateMongo = string.split('T');
        var date = dateMongo[0].split('-');
        return date[2] + '/' + date[1] + '/' + date[0];
    },
    async abrirDialogoDetalle(idsesion,array) {
      this.sesioneducativa = await this.loadSesionEducativaDetalle(idsesion,array);
      this.datoSesion= await this.obtenerSesionEducativaDTO(idsesion);
      this.dialogodetalle = !this.dialogodetalle;
    },
    async abrirDialogoModificar(idsesion,array) {
      this.sesioneducativa = await this.loadSesionEducativaDetalle(idsesion,array);
      console.log("Saliendo:")
      console.log(this.sesioneducativa)
      this.datoSesion= await this.obtenerSesionEducativaDTO(idsesion);
      this.dialogomodificar = !this.dialogomodificar;
      
    },
    async abrirDialogoParticipante(idsesion, array) {
      this.sesioneducativa = await this.loadSesionEducativaDetalle(idsesion,array);
      this.dialogoparticipante = !this.dialogoparticipante;
    },

    //Obtener datos de una sesión por id
    async loadSesionEducativaDetalle(idsesion,array) {
      var user = {};
      await axios
        .get("/SesionesEducativas/id?id=" + idsesion)
        .then((res) => {
          user = res.data;
          user.fechaCreacion = user.fechaCreacion.split("T")[0];
        })
        .catch((err) => console.log(err));
      user={
        id: user.id,
        titulo: user.titulo,
        idCreador: user.idCreador,
        fechaCreacion: user.fechaCreacion,
        area: user.area,
        contenido: user.contenido,
        tipo: user.tipo,
        datoscreador: array.datoscreador.usuario
      }
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
              info[x].fechaCreacion = info[x].fechaCreacion.split("T")[0];
          }
          this.setSesionesEducativas(info);
          
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
