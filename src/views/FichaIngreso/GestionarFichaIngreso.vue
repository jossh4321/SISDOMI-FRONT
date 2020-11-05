<template>
  <div>
    <v-card class="card">
      <v-card-title> Gestionar Ficha Ingreso </v-card-title>
      <v-data-table
        :headers="headers"
        :items="documento"    
        :search="search"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Fichas de Ingreso SISDOMI</v-toolbar-title>
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
                  <span>Registrar Ficha Ingreso</span>
                </v-btn>
              </template>
                
                <RegistrarFichaIngreso
                @close-dialog-save="closeDialogRegistrar()"></RegistrarFichaIngreso> 
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-row align="center" justify="space-around">
            <v-btn color="warning" dark @click="editItem(item)">
              <v-icon left> mdi-pencil </v-icon>
              <span>Modificar Ficha</span>
            </v-btn>
            <v-btn color="info" dark @click="abrirDialogoActualizar(item.id)">
              <v-icon left> mdi-pencil </v-icon>
              <span>Ver Ficha</span>
            </v-btn>
          </v-row>
        </template>
      </v-data-table>

      <v-dialog persistent
          v-model="dialogoconsultar" 
          max-width="880px">
        <ConsultarFichaIngreso :fichaIngreso="fichaIngreso" @close-dialog-detail="closeDialogDetalle()">
        </ConsultarFichaIngreso>
      </v-dialog>
    </v-card>
  </div>
</template>
<script>
import axios from 'axios';
//import RegistrarPlanIntervencion from '@/components/planIntervencion/RegistrarPlanIntervencion.vue'
import RegistrarFichaIngreso from '@/components/fichaIngreso/RegistrarFichaIngreso.vue'
import ConsultarFichaIngresoEducativa  from '@/components/fichaIngreso/ConsultarFichaIngresoEducativa.vue'
import {mapMutations, mapState} from "vuex";
export default {
  name: "GestionarFicha",
  components: {
    // RegistrarPlanIntervencion,
     RegistrarFichaIngreso,
     ConsultarFichaIngresoEducativa,
      
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
        { text: "N°documento", value: "numerodocumento" },
        { text:"Fecha de Ingreso",value:"fechaingreso"},
        { text: "Actions", value: "actions", sortable: false },
      ],
      dialogoconsultar:false,
      dialogoregistro: false,
      
    };
  },
      async created(){
      this.obtenerfichasIngresos();
       this.obtenerResidentes()
     
  },

  methods: {
 
    ...mapMutations(["setDocumento"]),
 editItem(item) {
      console.log(item);
    },
    detailItem(item) {
      console.log(item);
    },

    closeDialogConsultar(){

       this.dialogoconsultar = false;
    },

     async abrirDialogoConsultar(idresidente){
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
     //llamando al API para obtener los datos de ficha Educativa especifico
       async obtenerfichasIngresos(){
           await axios.get("/fichaingresoeducativa/all")
            .then(res => {
                    this.setFichaIngresos(fie.data);
            }).catch(err => console.log(err));

            
    }


  },computed:{
    ...mapState(["documento"]),
    
  }

};
</script>
<style scoped>
.card {
  margin: 20px;
}
</style>