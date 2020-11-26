<template>
  <div>
    <v-card class="card">
      <v-card-title> Gestionar Seguimiento Educativo </v-card-title>
      <v-data-table
        :headers="headers"
        :items="seguimientoEducativo"
        :search="search"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Informes de Seguimiento Educativo actuales</v-toolbar-title>
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
            <v-dialog v-model="dialogoregistro" max-width="880px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="success"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon left>mdi-account-multiple-plus-outline</v-icon>
                  <span>Registrar Sesion  Educativo</span>
                </v-btn>
              </template>
             <RegistrarSeguimientoEducativo
             
             :listaresidentes ="listaresidentes"
             :listaeducadores="listaeducadores"
             @close-dialog-save="closeDialogRegistrar()"
             >
             </RegistrarSeguimientoEducativo>
            </v-dialog>
          </v-toolbar>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-row align="center" justify="space-around">
             <!--<v-dialog v-model="dialogoactualizacion" max-width="880px">
               <ActualizarPlanIntervencion v-if="dialogoactualizacion" :planIntervencion="planIntervencion" @close-dialog-detail="closeDialogActualizar()">
          </ActualizarPlanIntervencion></v-dialog> -->
            <v-btn color="warning" dark @click="editItem(item)">
              <v-icon left> mdi-pencil </v-icon>
              <span>Actualizar</span>
            </v-btn>
                 
            <v-btn color="info" @click="abrirDialogoDetalle(item.id)" >
              <v-icon left> mdi-pencil </v-icon>
              <span>Visualizar</span>
            </v-btn>  
               
          </v-row>
        </template>
      </v-data-table>
       
    <v-dialog persistent v-model="dialogodetalle" max-width="880px">
        <DetalleSeguimientoEducativo
          :seguimiento="seguimiento"
          :residente ="residente"
          :listaresidentes ="listaresidentes"
          @close-dialog-detail="closeDialogDetalle()"
        >
        </DetalleSeguimientoEducativo>
    </v-dialog>
      
    </v-card>
  </div>
</template>
<script>
import axios from "axios";

import DetalleSeguimientoEducativo from '@/components/seguimientoEducativo/DetalleSeguimientoEducativo.vue'
import RegistrarSeguimientoEducativo from '@/components/seguimientoEducativo/RegistrarSeguimientoEducativo.vue'
import { mapMutations, mapState } from "vuex";

export default {
  name: "GestionarSeguimientoEducativo",
  components: {
    DetalleSeguimientoEducativo,
    RegistrarSeguimientoEducativo
    
  },
  data() {
    return {
      search: "",
      seguimiento: {},
      residente:{},
      listaresidentes: [],
      listaeducadores:[],

      headers: [
        {
          text: "Nombre Documento",
          align: "start",
          sortable: false,
          value: "id",
        },
        { text: "Nombre del residente", value: "nombrecompleto" },
        { text: "Fecha de creacion", value: "fechacreacion" },
        { text: "Estado", value: "estado" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    
      dialogoregistro: false,
      dialogoactualizacion: false,
      dialogodetalle: false,
    };
  },
  async created(){
 this.obtenerSeguimiento();
 this.obtenerResidentes();
 this.obtenerEducadores();
  },
  methods: {
    ...mapMutations(["setSeguimiento"]),
    editItem(item) {
    },
    detailItem(item) {
    },
    closeDialogDetalle() {
      this.dialogodetalle = false;
    },
    closeDialogRegistrar() {
      this.dialogoregistro = false;
    },
    closeDialogModificar() {
      this.dialogoactualizacion = false;
    },
    ///abrir dialogo de detalle
   async abrirDialogoDetalle(idseguimiento) {
      this.seguimiento = await this.loadSeguimientoDetalle(idseguimiento);
      this.residente = await this.loadResidente(this.seguimiento.idresidente);// traelos datos del residnete
      this.dialogodetalle = !this.dialogodetalle;
      },
  /////////////////Consumo de  apis 
    async obtenerSeguimiento() {
      await axios
        .get("/SeguimientoEducativo/all")
        .then((res) => {
          var info = {};
          info = res.data;
          console.log(res.data)
          for (var x=0;x<res.data.length;x++){
              info[x].fechacreacion = res.data[x].fechacreacion.split("T")[0];
          }
          
          this.setSeguimiento(info);
        })
        .catch((err) => console.log(err));
    },
    ///////////Obtener seguimiento con id
     async loadSeguimientoDetalle(idseguimiento) {
      var user = {};
      await axios
        .get("/SeguimientoEducativo/id?id=" + idseguimiento)
        .then((res) => {
          console.log(res);
          user = res.data;
          user.fechacreacion = user.fechacreacion.split("T")[0];
        })
        .catch((err) => console.log(err));
      console.log(user);
      return user;
    },
    /////Obtener residente
     async loadResidente(idresidente) {
      var user = {};
      await axios
        .get("/Residente/id?id=" + idresidente)
        .then((res) => {
          console.log(res);
          user = res.data;
         
        })
        .catch((err) => console.log(err));
      console.log(user);
      return user;
    },
    //obtener todos los residentes
    async obtenerResidentes(){
          await axios.get("/residente/all")
                  .then( x => {
                            this.listaresidentes = x.data;
                            console.log(this.listaresidentes);
                  }).catch(err => console.log(err));
        },
        ////obtener todos los eduacatoderes
         async obtenerEducadores(){
          await axios.get("/usuario/idrol?idrol=5f73b6440a37af031f716806")
            .then(res => {
                    this.listaeducadores = res.data;
                    console.log(this.listaeducadores);
            }).catch(err => console.log(err));
    }
  },
  
   computed:{
 ...mapState(["seguimientoEducativo"])
  }
}

</script>
<style scoped>
.card {
  margin: 20px;
}
</style>