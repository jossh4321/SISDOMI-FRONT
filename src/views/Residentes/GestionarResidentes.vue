<template>
  <div>
    <v-card class="card">
      <v-card-title> Gestionar Residentes </v-card-title>
      <v-data-table
        :headers="headers"
        :items="residentes"
        :search="search"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Residentes SISDOMI</v-toolbar-title>
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
                  <span>Registrar nuevo Residente</span>
                </v-btn>
              </template>
                
            </v-dialog>
          </v-toolbar>
        </template>
<<<<<<< HEAD
        <template v-slot:[`item.actions`]="{ item }">
=======

        <template v-slot:[`item.actions`]="{ item }"><!--Abrir dialogo detalle -->
>>>>>>> 777a6425c25642ebd17111790fe4a8b80c8935af
          <v-row align="center" justify="space-around">
            <v-btn color="warning" dark @click="editItem(item)">
              <v-icon left> mdi-pencil </v-icon>
              <span>Actualizar</span>
            </v-btn>
            <v-btn color="info" 
             dark
             @click="abrirDialogoDetalle(item.id)">
              <v-icon left> mdi-pencil </v-icon>
              <span>Visualizar</span>
            </v-btn>
          </v-row>
        </template>
      </v-data-table>
      <!----->
      <!--Dialogo de Detalle-->
      <v-dialog persistent
                v-model="dialogodetalle" 
                max-width="880px">
          <ConsultarResidente :residente="residente" @close-dialog-detail="closeDialogDetalle()">
          </ConsultarResidente>
      </v-dialog>
    </v-card>
  </div>
</template>
<script>
import axios from 'axios';

import  ModificarResidente  from '@/components/residentes/ActualizarResidente.vue'
import  ConsultarResidente  from '@/components/residentes/DetalleResidente.vue'
import {mapMutations, mapState} from "vuex";
export default {
  name: "GestionarResidentes",
  components: {
     ConsultarResidente,
     ModificarResidente
  },
  data() {
    return {
      search: "",
      residente:{},

      headers: [
        {
          text: "Nombre ",
          align: "start",
          sortable: false,
          value: "nombre",
        },
        { text: "Apellido", value: "apellido" },
        { text: "Tipo de documento", value: "tipodocumento" },
        { text: "N°documento", value: "numerodocumento" },
        { text:"Fecha de Ingreso",value:"fechaingreso"},
        { text: "Actions", value: "actions", sortable: false },
      ],
      /*planesI: [
        {
          nombre: "Manuel stafno",
          apellido: "Paredes Guerra",
          tipdocumento: "Dni",
          numdocumento:"72498627",
          fechingreso:"28/05/2019"
        },
        {
          nombre: "PlanI_Psico_Xiomara_1",
          apellido: "Xiomara Paredes Guerra",
          tipdocumento: "Dni",
          numdocumento:"72498627",
          fechingreso:"28/05/2019"
        },
        {
          nombre: "PlanI_Edu_Marlyn_1",
          apellido: "Marlyn Candela Peña",
          tipdocumento: "Dni",
          numdocumento:"72498627",
          fechingreso:"28/05/2019"
        }
      ],*/
      dialogoregistro: false,
      dialogodetalle:false,
    };
  },
  async created(){
    this.obtenerResidentes()
  },
  methods: {
    ...mapMutations(["setResidentes"]),
    editItem(item) {
      console.log(item);
    },
    detailItem(item) {
      console.log(item);
    },
    closeDialogDetalle(){
      this.dialogodetalle = false;
      },
    ///abrir dialogo de detalle
    async abrirDialogoDetalle(idresidente){
        this.residente = await this.loadResidenteDetalle(idresidente);
        this.dialogodetalle = !this.dialogodetalle;
        },

     async loadResidenteDetalle(idresidente){
      var user = {};
      await axios.get("/residente/id?id="+idresidente)
      .then(res => {
         user = res.data;
         user.datos.fechanacimiento = res.data.datos
                  .fechanacimiento.split("T")[0];
      })
      .catch(err => console.log(err));
      console.log(user);
      return user;
    },
     ///////////////////Consumo de  apis
     async obtenerResidentes(){
           await axios.get("/residente/all")
            .then(res => {
                    this.setResidentes(res.data);
            }).catch(err => console.log(err));

            
    }
  },
  computed:{
 ...mapState(["residentes"])
  
  }
};
</script>
<style scoped>
.card {
  margin: 20px;
}
</style>