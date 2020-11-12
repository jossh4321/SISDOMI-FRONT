<template>
  <div>
    <v-card class="card">
      <v-card-title> Gestionar Plan de Intervención </v-card-title>
      <v-data-table
        :headers="headers"
        :items="planesI"
        :search="search"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Planes de Intervención actuales</v-toolbar-title>
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
                  <span>Registrar nuevo Plan</span>
                </v-btn>
              </template>
           <!--   <RegistrarPlanIntervencion
                @close-dialog="closeDialog"
              ></RegistrarPlanIntervencion>-->
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
          <VisualizarPlanIntervencion :plan="plan" @close-dialog-detail="closeDialogDetalle()">
          </VisualizarPlanIntervencion>
      </v-dialog>
      
    </v-card>
  </div>
</template>
<script>
import axios from "axios";
import RegistrarPlanIntervencion from "@/components/planIntervencion/Educativo/RegistrarPlanIntervencion.vue";
import VisualizarPlanIntervencion from "@/components/planIntervencion/Educativo/VisualizarPlanIntervencion.vue";
import { mapMutations, mapState } from "vuex";

export default {
  name: "GestionarPlanI",
  components: {
    RegistrarPlanIntervencion,
    VisualizarPlanIntervencion,
  },
  data() {
    return {
      search: "",
      plan: {},
      headers: [
        {
          text: "Nombre Plan Intervención",
          align: "start",
          sortable: false,
          value: "nombre",
        },
        { text: "Usuaria", value: "usuaria" },
        { text: "Fecha registro", value: "fechaRegistro" },
        { text: "Actions", value: "actions", sortable: false },
      ],
     planesI: [
        {
          nombre: "PlanI_Edu_Xiomara_1",
          usuaria: "Xiomara Paredes Guerra",
          fechaRegistro: "15/09/2019",
          id: "5facd2e1bd5f87ed3632aa12",
        },
        {
          nombre: "PlanI_Psico_Xiomara_1",
          usuaria: "Xiomara Paredes Guerra",
          fechaRegistro: "16/09/2019",
          id:2

        },
        {
          nombre: "PlanI_Edu_Marlyn_1",
          usuaria: "Marlyn Candela Peña",
          fechaRegistro: "20/10/2019",
          id:3
        }
      ],
      dialogodetalle: false,
      dialogoregistro: false,
      Visualizarplan: false,
    };
  },


  methods: {
   //  ...mapMutations(["setPlanInterve"]),
    editItem(item) {
   //   console.log(item);
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