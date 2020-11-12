<template>
  <div>
    <v-card class="card">
      <v-card-title> Gestionar Ficha Ingreso </v-card-title>
      <v-data-table
        :headers="headers"
        :items="fichaIngreso"    
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
            <!-- Dialogo de Registro-->
            <v-dialog
            persistent
            v-model="dialogregistro"
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
                
                <RegistrarFichaIngreso
                @close-dialog-save="closeDialogRegistrar()"></RegistrarFichaIngreso> 
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-row align="center" justify="space-around">
            <v-btn color="warning"
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
            </v-btn>
          </v-row>
        </template>
      </v-data-table>
      <!--Dialogo de Modificar-->
      <v-dialog persistent
                v-model="dialogoactualizacion" 
                max-width="880px">
        <ModificarFichaIngreso
        v-if="dialogoactualizacion" 
        :usuario="usuario" :listaroles="listaroles" @close-dialog-update="closeDialogActualizar()">
        </ModificarFichaIngreso>

      </v-dialog>
     <!--Dialogo de Consultar-->
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
import ModificarFichaIngreso from '@/components/fichaIngreso/ActualizarFichaIngreso.vue'
import ConsultarFichaIngresoEducativa  from '@/components/fichaIngreso/ConsultarFichaIngresoEducativa.vue'
import {mapMutations, mapState} from "vuex";
export default {
  name: "GestionarFicha",
  components: {
    // RegistrarPlanIntervencion,
     RegistrarFichaIngreso,
     ConsultarFichaIngresoEducativa,ModificarFichaIngreso
      
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
        { text: "Nombre y apellido ", value: "datosresidente.apellido"},
        { text: "DNI", value: "datosresidente.numerodocumento" },
        { text:"Fecha de Inserccion",value:"datosresidente.fechaingreso"},
        { text: "Actions", value: "actions", sortable: false },
      ],
      dialogoconsultar:false,
      dialogoregistro: false,
      dialogmodificar:false,
      
    };
  },
      async created(){
      this.obtenerfichasIngresos();
     
     
  },

  methods: {
 
    ...mapMutations(["setDocumento"]),

    closeDialogRegistrar()
    {
      this.dialogoregistro=false
    },
    
    closeDialogModificar()
    {
      this.dialogmodificar=false
    },
    
    closeDialogConsultar()
    {
      this.dialogoconsultar=false
    },

  editItem(item) {
      console.log(item);
    },
    detailItem(item) {
      console.log(item);
    },
   
    
     //llamando al API para obtener los datos de ficha Educativa especifico

        async abrirDialogoModificar(idfichaingreso){
        this.usuario = await this.loadFichaModificar(idfichaingreso);
        this.dialogomodificar= !this.dialogomodificar;
    },
    async abrirDialogConsultar(idfichaingreso){
        this.usuario = await this.loadUsuarioDetalle(idfichaingreso);
        this.dialogodetalle = !this.dialogodetalle;
    },
    
       async obtenerfichasIngresosEducativa(){
           await axios.get("/fichaingresoeducativa/all")
            .then(res => {
                    this.setFichaIngresos(fie.data);
            }).catch(err => console.log(err));            
    }

  },computed:{
    ...mapState(["documentos"]),
    
  }

};
</script>
<style scoped>
.card {
  margin: 20px;
}
</style>