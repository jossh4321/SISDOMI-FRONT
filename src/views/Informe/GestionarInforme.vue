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
                <RegistrarInformeEducativoInicial   
                 :listaresidentes="listaresidentes"               
                 @close-dialog-save="closeDialogRegistrar()"                                  
                 ></RegistrarInformeEducativoInicial> 
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
import RegistrarInforme from '@/components/informes/RegistrarInforme.vue'
import RegistrarInformeEducativoInicial from '@/components/informes/RegistrarInformeEducativoInicial.vue'
import {mapMutations, mapState} from "vuex";
export default {
  name: "GestionarInforme",
  components: {
    RegistrarInforme,
    RegistrarInformeEducativoInicial
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
          value: "codigodocumento",
        },
        { text: "Nombre del residente", value:"datosresidente.apellido"},
        { text: "Fecha de creación", value: "fechacreacion" },
        { text: "Tipo de Informe", value: "tipo" },        
        { text: "Acciones", value: "actions", sortable: false },
      ],
       dialogoregistro: false,
       listaresidentes:[]
    };
  },
  async created(){    
      this.obtenerInformes();
      this.obtenerResidentes();
  },
  methods: {
     ...mapMutations(["setInformes"]),    
      closeDialogRegistrar(){
      this.dialogoregistro = false;
    },
    async obtenerInformes(){
           await axios.get("/informe/all")
            .then(res => { 
                    this.setInformes(res.data);    
                    console.log(res.data);                  
            }).catch(err => console.log(err));
    },async obtenerResidentes(){
          await axios.get("/residente/all")
                  .then( x => {
                            this.listaresidentes = x.data;
                            console.log(this.listaresidentes);
                  }).catch(err => console.log(err));}
  },
  computed:{
    ...mapState(["informes"])
  }
};
</script>
<style scoped>
.card {
  margin: 20px;
}
</style>