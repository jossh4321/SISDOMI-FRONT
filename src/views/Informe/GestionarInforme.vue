<template>
    <div>
    <v-card class="card">
      <v-card-title> Gestionar Informe </v-card-title>
      <v-data-table
        :headers="headers"
        :items="informes"
        :search="search"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Informes de las Usuarias CAR</v-toolbar-title>
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
            <!--Dialogo de Registro-->
            <v-dialog 
              persistent
              v-model="dialogoregistro" 
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
                  <span>Registrar Informe</span>
                </v-btn>
              </template>
                <RegistrarInformeEducativo                  
                 @close-dialog-save="closeDialogRegistrar()"></RegistrarInformeEducativo> 
            </v-dialog>
            <!---->
          </v-toolbar>
        </template>

      </v-data-table>      
      <!----->       
    </v-card>
  </div>
</template>

<script>
import axios from 'axios';
import RegistrarInformeEducativo from '@/components/informes/RegistrarInformeEducativo.vue'
import {mapMutations, mapState} from "vuex";
export default {
  name: "GestionarInforme",
  components: {
    RegistrarInformeEducativo
  },
  data() {
    return {
      search: "",      
      informe:{},      
      headers: [
        {
          text: "Código del Informe",
          align: "start",
          sortable: false,
          value: "usuario",
        },
        { text: "Nombre del residente", value:""},
        { text: "Fecha de creación", value: "" },
        { text: "Tipo de Informe", value: "" },        
        { text: "Acciones", value: "actions", sortable: false },
      ],
       dialogoregistro: false
    };
  },
  async created(){
    
  },
  methods: {
      closeDialogRegistrar(){
      this.dialogoregistro = false;
    }
    }
};
</script>
<style scoped>
.card {
  margin: 20px;
}
</style>