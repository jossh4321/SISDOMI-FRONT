<template>
  <div>
    <v-card class="card">
      <v-card-title> Gestionar Ficha Ingreso </v-card-title>
      <v-data-table
        :headers="headers"
        :items="fichaingreso"    
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
              label="Buscar"
              single-line
              hide-details
            ></v-text-field>
            <v-spacer></v-spacer>
            <!-- Dialogo de Registro-->
            <v-dialog
            persistent
            v-model="dialogDialogNuevaFichaIngreso"
            max-width="880px">

              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="success"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                <v-icon left>mdi-plus</v-icon>
                  <span>Registrar Ficha Ingreso</span>
                </v-btn>
              </template>
                <SeleccionarFichaIngreso @close-dialog-initial="closeDialogNuevaFichaIngreso()"/>
                
            </v-dialog>-->
          </v-toolbar>
        </template>
        <template ><!-- v-slot:[`item.actions`]="{ item }"-->
          <v-row align="center" justify="space-around">
            <!--<v-btn color="warning"
             dark 
             @click="abrirDialogoModificar(item.id)"
             >
            <v-icon left> mdi-pencil </v-icon>
              <span>ModificarFichaIngreso</span>
            </v-btn>
            <v-btn 
            color="info" dark
             @click="abrirDialogoConsultar(item.id)">
              <v-icon left> mdi-briefcase-edit </v-icon>
              <span>ConsultarFichaIngreso</span>
            </v-btn> -->
          </v-row>
        </template>
      </v-data-table>
      <!--Dialogo de Modificar-->
      <!--<v-dialog persistent
                v-model="dialogoactualizacion" 
                max-width="880px">
        <ModificarFichaIngreso
        v-if="dialogoactualizacion" 
        :usuario="usuario" :listaroles="listaroles" @close-dialog-update="closeDialogActualizar()">
        </ModificarFichaIngreso>  
      </v-dialog>-->

     <!--Dialogo de Consultar-->
      <!--<v-dialog persistent
          v-model="dialogoconsultar" 
          max-width="880px">
        <ConsultarFichaIngreso :fichaIngreso="fichaIngreso" @close-dialog-detail="closeDialogDetalle()"/>
      </v-dialog>-->
    </v-card>
  </div>
</template>
<script>
import axios from 'axios';
//import RegistrarPlanIntervencion from '@/components/planIntervencion/RegistrarPlanIntervencion.vue'
import SeleccionarFichaIngreso from '@/components/fichaIngreso/SeleccionarFichaIngreso.vue'

import {mapMutations, mapState} from "vuex";
export default {
  name: "GestionarFicha",
  components: {
   
     SeleccionarFichaIngreso,
       
  },
  data() {
    return {
      search: "",
      residente:{},
      headers: [
        {
          text: "Codigo ",
          align: "start",
          sortable: false,
          value: "codigodocumento",
        },
        { text: "Tipo Ficha Ingreso ", value: "tipo"},
        { text: "Àrea", value: "area" },
        { text:"Fase",value:"fase"},
        { text: "Actions", value: "actions", sortable: false },
      ],
     SeleccionarFichaIngreso:false,
      fichaIngreso: [],
      dialogDialogNuevaFichaIngreso :false,
    };
  },
      async created(){
      this.obtenerfichasIngresos();
  },

  methods: {
    ...mapMutations(["setFichaIngreso"]),

    closeDialogNuevaFichaIngreso()
    {
      this.dialogoregistro=false
    },
    
       async obtenerfichasIngresos(){
           await axios.get("/Documento/all/fichaingresoresidente")
            .then(res => {
              //console.log( "porfavor" )
              this.setFichaIngreso(res.data);
            }).catch(err => console.log(err));            
    }

  },computed:{
    ...mapState(["fichaingreso"]),
    
  }

};
</script>
<style scoped>
.card {
  margin: 20px;
}
</style>