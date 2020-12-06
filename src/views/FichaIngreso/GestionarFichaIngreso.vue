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
            <v-dialog  v-model="dialogDialogNuevaFichaIngreso"
            max-width="350px">

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
                <SeleccionarFichaIngreso 
                :residente ="residente"
                :listaresidentes="listaresidentes"
                :listaeducadores="listaeducadores"
                @close-dialog-initial="closeDialogNuevaFichaIngreso()"
                ></SeleccionarFichaIngreso >
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:[`item.fechacreacion`]="{ item }">
          {{ item.fechacreacion | moment("DD/MM/YYYY") }}
        </template>
         <template v-slot:[`item.actions`]="{ item }">
          <v-row align="center" justify="space-around">
          <v-btn  color="warning"
             dark 
             @click="editItem(item)">
            <v-icon left> mdi-pencil</v-icon>
              <span>Actualizar</span>
            </v-btn>
            <v-btn color="info" dark
             @click="abrirDialogoConsultar(item.id)">
              <v-icon left> mdi-file-eye </v-icon>
              <span>Consultar</span>
            </v-btn> 
          </v-row>
        </template>
      </v-data-table>
      <!--Dialogo de Modificar-->
      <v-dialog persistent
                v-model="dialogoactualizacion" 
                max-width="880px">
        <ModificarFichaIngresoEducativa
        v-if="dialogoaFIEctualizacion" 
        :fichaIngresos="fichaIngresos" 
          :listaroles="listaroles" 
          :listaresidentes="listaresidentes"
          :listaeducadores="listaeducadores" 
        @close-dialog-update="closeDialogActualizar()">
        </ModificarFichaIngresoEducativa>  
      </v-dialog>
      <v-dialog persistent
                v-model="dialogoactualizacion" 
                max-width="880px">
        <ModificarFichaIngresoSocial
        v-if="dialogoaFIEctualizacion" 
        :fichaIngresos="fichaIngresos" 
          :listaroles="listaroles" 
          :listaresidentes="listaresidentes"
          :listaeducadores="listaeducadores" 
        @close-dialog-update="closeDialogActualizar()">
        </ModificarFichaIngresoSocial>  
      </v-dialog>
      <v-dialog persistent
                v-model="dialogoactualizacion" 
                max-width="880px">
        <ModificarFichaIngresoPsicologica
        v-if="dialogoaFIPctualizacion" 
        :fichaIngresos="fichaIngresos" 
          :listaroles="listaroles" 
          :listaresidentes="listaresidentes"
          :listaeducadores="listaeducadores" 
        @close-dialog-update="closeDialogActualizar()">
        </ModificarFichaIngresoPsicologica>  
      </v-dialog>
     <!--Dialogo de Consultar-->
      <v-dialog persistent
          v-model="dialogoFIPconsultar" 
          max-width="880px">
        <ConsultarFichaIngresoPsicologica ::fichaIngresos="fichaIngresos" @close-dialog-detail="closeDialogDetalle()"/>
      </v-dialog>
       <v-dialog persistent
          v-model="dialogoFISconsultar" 
          max-width="880px">
        <ConsultarFichaIngresoSocial ::fichaIngresos="fichaIngresos"  @close-dialog-detail="closeDialogDetalle()"/>
      </v-dialog>
      <v-dialog persistent
          v-model="dialogoFIEconsultar" 
          max-width="880px">
        <ConsultarFichaIngresoEducativa ::fichaIngresos="fichaIngresos"  @close-dialog-detail="closeDialogDetalle()"/>
      </v-dialog>
    </v-card>
  </div>
</template>
<script>
import axios from 'axios';
//import RegistrarPlanIntervencion from '@/components/planIntervencion/RegistrarPlanIntervencion.vue'
import SeleccionarFichaIngreso from '@/components/fichaIngreso/SeleccionarFichaIngreso.vue'
import ModificarFichaIngresoEducativa from '@/components/fichaIngreso/ModificarFichaIngresoEducativa.vue'
import ModificarFichaIngresoPsicologica from '@/components/fichaIngreso/ModificarFichaIngresoPsicologica.vue'
import ModificarFichaIngresoSocial  from '@/components/fichaIngreso/ModificarFichaIngresoSocial.vue'
import ConsultarFichaIngresoEducativa from '@/components/fichaIngreso/ConsultarFichaIngresoEducativa.vue'
import ConsultarFichaIngresoPsicologica from '@/components/fichaIngreso/ConsultarFichaIngresoPsicologica.vue'
import ConsultarFichaIngresoSocial from '@/components/fichaIngreso/ConsultarFichaIngresoSocial.vue'
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
          text: "Codigo de la Ficha ",
          align: "start",
          sortable: false,
          value: "codigodocumento",
        },
        { text: "Residente", value: "residenteresultado"},
        { text: "Fecha Creacion", value: "fechacreacion" },
        { text: "Area",value:"area"},
        { text: "Aciones", value: "actions", sortable: false },
      ],
     SeleccionarFichaIngreso:false,
      fichaIngreso: [],
      dialogDialogNuevaFichaIngreso :false,
       listaresidentes: [],
       listaeducadores:[],
    };
  },
      async created(){
      this.obtenerfichasIngresos();
      this.obtenerResidentes();
      this.obtenerEducadores();
  },

  methods: {
    ...mapMutations(["setFichaIngreso"]),
    editItem(item) {
    },
    detailItem(item) {
    },
    closeDialogDetalle() {
      this.dialogoFIEconsultar=false
      this.dialogoFIPconsultar=false
      this.dialogoFISconsultar=false
    },
   closeDialogActualizar() {
   this.dialogoaFIEctualizacion=false
   this.dialogoaFISctualizacion=false
   this.dialogoaFIPctualizacion=false
    },

    closeDialogNuevaFichaIngreso()
    {
      this.dialogDialogNuevaFichaIngreso=false
    },
       
    
       async obtenerfichasIngresos(){
           await axios.get("/Documento/all/fichaingresoresidente")
            .then(res => {
              //console.log( "porfavor" )
              this.setFichaIngreso(res.data);
            }).catch(err => console.log(err));            
    },
    ///Obtener residente
     async loadResidente(idresidente) {
      var user = {};
      await axios
        .get("/Residente/id?id=" + idresidente)
        .then((res) => {
          console.log(res);
          user = res.data;
          user.fechacreacion = user.fechacreacion.split("T")[0];
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