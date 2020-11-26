<template>
  <div>
    <v-card class="card">
      <v-card-title> Gestionar Acta de Externamiento </v-card-title>
      <v-data-table
        :headers="headers"
        :items="actaI"
        :search="search"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Actas de Externamiento actuales</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line0
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
                  <span>Registrar nueva Acta</span>
                </v-btn>
              </template>
             <RegistrarPlanIntervencion v-if="dialogoregistro" :actaIntervencion="actaIntervencion" @close-dialog-detail="closeDialogRegistrar()">
                @close-dialog="closeDialog"
              ></RegistrarPlanIntervencion>
            </v-dialog>
          </v-toolbar>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-row align="center" justify="space-around">
             <v-dialog v-model="dialogoactualizacion" max-width="880px">
               <ActualizarActaIntervencion v-if="dialogoactualizacion" :actaIntervencion="actaIntervencion" @close-dialog-detail="closeDialogActualizar()">
          </ActualizarActaIntervencion></v-dialog> -->
            <v-btn color="warning" dark @click="editItem(item)">
              <v-icon left> mdi-pencil </v-icon>
              <span>Actualizar</span>
            </v-btn>
                 <!-- <v-dialog v-model="Visualizarplan" max-width="880px">-->
                  <v-btn color="info" @click="abrirDialogoDetalle(item.id)" >
                  <v-icon left> mdi-pencil </v-icon>
                       <span>Visualizar</span>
                  </v-btn>  
               <!--   </v-dialog> -->
          </v-row>
        </template>
      </v-data-table>
       
            <v-dialog persistent
                v-model="dialogodetalle" 
                max-width="880px">
          <VisualizarActaIntervencion :plan="plan" @close-dialog-detail="closeDialogDetalle()">
          </VisualizarActaIntervencion>
      </v-dialog>
      
    </v-card>
  </div>
</template>
<script>
import axios from "axios";
import RegistrarActa from "@/components/actas/RegistrarActa.vue";

import { mapMutations, mapState } from "vuex";

export default {
  name: "GestionarActaI",
  components: {
    RegistrarActa,
   
  },
  data() {
    return {
      search: "",
      plan: {},
      planA: [],
      headers: [
        {
          text: "Nombre Acta Externamiento",
          align: "start",
          sortable: false,
          value: "nombre",
        },
        { text: "Usuaria", value: "usuaria" },
        { text: "Fecha registro", value: "fechaRegistro" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      actaI: [
        {
          nombre: "ActaI_Edu_Xiomara_1",
          usuaria: "Xiomara Paredes Guerra",
          fechaRegistro: "15/09/2019",
          id: "5facd2e1bd5f87ed3632aa12",
        },
        {
          nombre: "ActaI_Psico_Xiomara_1",
          usuaria: "Xiomara Paredes Guerra",
          fechaRegistro: "16/09/2019",
          id:2

        },
        {
          nombre: "ActaI_Edu_Marlyn_1",
          usuaria: "Marlyn Candela Peña",
          fechaRegistro: "20/10/2019",
          id:3
        }
      ],
      dialogodetalle: false,
      dialogoregistro: false,
      Visualizarplan: false,
      dialogoactualizacion: false
    };
  },


  methods: {
     ...mapMutations(["setPlanInterve"]),
    async editItem(item) {
      this.planA =  await this.actu(item); 
      this.dialogoactualizacion=!this.dialogoactualizacion;
      console.log(item);
   //   console.log(item);
    },
    async actu(item){
   
      var planA = {};
      await axios.get("/usuario/id?id="+id)//prueba
      .then(res => {
         planA = res.data; 
      })
      .catch(err => console.log(err));
      return this.planA;
    },
    detailItem(item) {
           
 // console.log(item.id);
    },
    /////////////////////////////////////
    closeDialogDetalle() {
      this.dialogodetalle = false;
    },
    ///abrir dialogo de detalle
    async abrirDialogoDetalle(idPlanI){
     
       this.plan =  await this.obtenerCualquiercosa(idPlanI); 
        this.dialogodetalle = !this.dialogodetalle;
        console.log(this.plan);
        },
        
      async obtenerCualquiercosa(id){
   
      var user = {};
      await axios.get("/PlanIntervencionSocial/id?id="+id)//prueba
      .then(res => {
         user = res.data; 
  
      })
      .catch(err => console.log(err));
      return user;
    },

  },
   computed:{
     
     
          
     
     
     
    ...mapState(["planesD"])
  }
};
</script>
<style scoped>
.card {
  margin: 20px;
}
</style>