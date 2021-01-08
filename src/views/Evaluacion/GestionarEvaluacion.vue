<template>
  <div>
    <v-card class="card">
      <v-card-title>Gestionar Evaluacion</v-card-title>
      <v-data-table
        :headers="headers"
        :items="fichaEvaluacionEduativa"
        :search="search"
        :loading="loading"
        loading-text="Cargando Fichas de Evaluación Educativas"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Fichas de Evaluacion Educativa</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Buscar"
              single-line
              hide-details
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialogoregistro" max-width="65%">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="success"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon left>mdi-account-multiple-plus-outline</v-icon>
                  <span>NUEVA EVALUACIÓN EDUCATIVA</span>
                </v-btn>
              </template>
             <RegistrarEvaluacion
             :listaresidentes ="listaresidentes"
             :listaeducadores="listaeducadores"
             @cargarSeguimiento="obtenerEvaluacionDiagnosticoEducativo()"
             @close-dialog-save="closeDialogRegistrar()"
             >
             </RegistrarEvaluacion>
            </v-dialog>
          </v-toolbar>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-row align="center" justify="space-around">
            <v-btn color="warning" dark @click="abrirDialogoModificar(item.id)">
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
       <!--Dialogo de Modificacion-->
      <v-dialog persistent v-model="dialogoactualizacion" max-width="880px">
        <ModificarEvaluacion
          
          :fichaEvaluacion="fichaEvaluacion"
          :listaresidentes ="listaresidentes"
          :listaeducadores="listaeducadores"
          :dialogodetalle ="dialogoactualizacion"
          @cargarSeguimiento="obtenerEvaluacionDiagnosticoEducativo()"

          @close-dialog-edit="closeDialogModificar()"
        >
        </ModificarEvaluacion>
      </v-dialog>
    <v-dialog persistent v-model="dialogodetalle" max-width="880px">
        <VerEvaluacion
          :fichaEvaluacion="fichaEvaluacion"
          :residente ="residente"
          :listaresidentes ="listaresidentes"
          :listaeducadores="listaeducadores"
          :dialogodetalle ="dialogodetalle"
          @close-dialog-detail="closeDialogDetalle()"
        >
        </VerEvaluacion>
    </v-dialog>
      
    </v-card>
  </div>
</template>

<script>
import axios from "axios";

import VerEvaluacion from '@/components/evaluacion/VerEvaluacion.vue'
import RegistrarEvaluacion from '@/components/evaluacion/RegistrarEvaluacion.vue'
import ModificarEvaluacion from '@/components/evaluacion/ModificarEvaluacion.vue'

import { mapMutations, mapState } from "vuex";

export default {
  name: "GestionarSeguimientoEducativo",
  components: {
    VerEvaluacion,
    RegistrarEvaluacion,
    ModificarEvaluacion
    
  },
  data() {
    return {
      search: "",
      fichaEvaluacion: {},
      residente:{},
      listaresidentes: [],
      listaeducadores:[],

      headers: [
        /*{
          text: "Nombre Documento",
          align: "start",
          sortable: false,
          value: "id",
        },*/
        { text: "Nombre del residente", value: "nombrecompleto" },
        { text: "Fecha de creacion", value: "fechacreacion" },
        { text: "Estado", value: "estado" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    
      dialogoregistro: false,
      dialogoactualizacion: false,
      dialogodetalle: false,
      loading:true
    };
  },
  async created(){
 this.obtenerEvaluacionDiagnosticoEducativo();
 this.obtenerResidentes();
 this.obtenerEducadores();
  },
  methods: {
    ...mapMutations(["setEvaluacion"]),
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
      this.fichaEvaluacion = await this.loadFichaEvalucionDetalle(idseguimiento);
      this.residente = await this.loadResidente(this.fichaEvaluacion.idresidente);// traelos datos del residnete
      this.dialogodetalle = !this.dialogodetalle;
      },
      ///abrir dialogo de modificacion
    async abrirDialogoModificar(idseguimiento) {
      this.fichaEvaluacion = await this.loadFichaEvalucionDetalle(idseguimiento);
      this.residente = await this.loadResidente(this.fichaEvaluacion.idresidente);// traelos datos del residnete
      this.dialogoactualizacion = !this.dialogoactualizacion;
    },
  /////////////////Consumo de  apis 
    async obtenerEvaluacionDiagnosticoEducativo() {
      await axios
        .get("EvaluacionDiagnosticoEducativo/all")
        .then((res) => {
          this.loading = false;
          var info = {};
          info = res.data;
          console.log(res.data)
          for (var x=0;x<res.data.length;x++){
              info[x].fechacreacion = res.data[x].fechacreacion.split("T")[0];
          }
          
          this.setEvaluacion(info);
        })
        .catch((err) => console.log(err));
    },
    ///////////Obtener seguimiento con id
     async loadFichaEvalucionDetalle(idEvaluacion) {
      var user = {};
      await axios
        .get("/EvaluacionDiagnosticoEducativo/id?id=" + idEvaluacion)
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
 ...mapState(["fichaEvaluacionEduativa"])
  }
}

</script>

<style scoped>
.card {
  margin: 20px;
}
</style>