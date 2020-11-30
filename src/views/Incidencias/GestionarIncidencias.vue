<template>
    <div>
         <v-data-table
    :headers="headers"
    :items="incidencias"
    item-key="id"
    :page.sync="page"
    :items-per-page="itemsPerPage"
    hide-default-footer  
    @page-count="pageCount = $event"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Gestion de Incidencias</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialogoRegistrarIncidencia"
          max-width="650px"
          persistent
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="success"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
            <v-icon left>
                mdi-folder-plus-outline
            </v-icon>
            <span>Nueva Incidencia</span>
            </v-btn>
          </template>
          <v-card>
                <RegistrarIncidencia 
                @close-dialog-save-incidencia="closeDialogRegistrar()"></RegistrarIncidencia>
          </v-card>
        </v-dialog>
        <!---->
      </v-toolbar>
    </template>
     <template v-slot:[`item.autor`]="{ item }">
        {{ item.autor.datos.nombre | getNombreUsuario(item.autor.datos.apellido) }} 
    </template>
    <template v-slot:[`item.fecha`]="{ item }">
      <v-chip
        color="success"
        dark
      >
        {{ item.fecha | fomatoFecha}} 
      </v-chip>
    </template>
     <template v-slot:[`item.residentes`]="{ item }">
      <v-chip
        color="success"
        dark
      >
        {{ item.residentes | numResidentes}} 
      </v-chip>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
        <v-btn
        elevation="2"
        rounded
        color="info"
        class="ma-2"
        @click="consultarIncidencia(item.id)"
        >
            <v-icon left>
                mdi-eye
            </v-icon>
            <span>Ver</span>
        </v-btn>
        <v-btn
        color="warning"
        elevation="2"
        rounded
        class="ma-2"
        @click="modificarIncidencia(item.id)"
        >
            <v-icon left>
                mdi-pencil
            </v-icon>
            <span>Editar</span>
        </v-btn>
    </template>
  </v-data-table>
  <!--PAGINACION EXTERNA-->
  <div class="text-center pt-2">
      <v-pagination
        v-model="page"
        :length="pageCount"
      ></v-pagination>
    </div>
  <!---->
    <!--DIALOGO DE CONSULTA DE INCIDENCIA-->
        <v-dialog v-model="dialogoConsultarIncidencia" max-width="650px">
          <v-card>
            <v-card-title class="headline">CONSULTA DE UNA INCIDENCIA</v-card-title>
          </v-card>
        </v-dialog>
        <!---->
    <!--DIALOGO DE MODIFICACION DE INCIDENCIA-->
        <v-dialog v-model="dialogoModificarIncidencia" max-width="650px">
          <v-card>
              <ModificarIncidencia 
                :incidencia="incidencia"></ModificarIncidencia>
          </v-card>
        </v-dialog>
        <!---->
    </div>
</template>
<script>
import axios from "axios";
import RegistrarIncidencia from '@/components/incidencias/RegistrarIncidencia.vue'
import ModificarIncidencia from '@/components/incidencias/ModificarIncidencia.vue'
//import ConsultarIncidencia from '@/components/incidencias/ConsultarIncidencia.vue'
import moment from "moment";
import { mapState, mapMutations } from "vuex";
moment.locale("es")
export default {
    data(){
        return {
                page: 1,
                pageCount: 0,
                itemsPerPage: 10,
                dialogoConsultarIncidencia:false,
                dialogoModificarIncidencia:false,
                dialogoRegistrarIncidencia:false,
                headers: [
                            {
                            text: 'Titulo',
                            align: 'start',
                            sortable: true,
                            value: 'titulo',
                            },
                            { text: 'Fecha/Hora', value: 'fecha' },
                            { text: 'Responsable', value: 'autor' },
                            { text: 'N° Involucrados', value: 'residentes' },
                            { text: 'Opciones', value: 'actions', sortable: false }
                        ],
                incidencia:{}
        }
        
    },async created(){
        await axios.get("/incidencia/all/detalle")
          .then((res)=>{
                this.setIncidencias(res.data);
          }).catch(error => console.error(error));
    },components:{
        RegistrarIncidencia,
        ModificarIncidencia
    },methods:{
        ...mapMutations(["setIncidencias"]),
        async loadIncidenciaDetalle(id){
          await axios.get(`/incidencia/detalle/${id}`)
                      .then(res=>{
                          console.log(res.data);
                          var fecha = res.data
                          this.incidencia = res.data
                          this.incidencia["hora"]
                      }).catch(err => console.error());
        },consultarIncidencia(id){
            this.dialogoConsultarIncidencia = !this.dialogoConsultarIncidencia;
        },async modificarIncidencia(id){
            await this.loadIncidenciaDetalle(id);
            this.dialogoModificarIncidencia = !this.dialogoModificarIncidencia;
        },closeDialogRegistrar(){
            this.dialogoRegistrarIncidencia = !this.dialogoRegistrarIncidencia;
        }
    },computed:{
        ...mapState(["incidencias"]),
        
    },filters:{
        numResidentes: (residentes) => {
      return residentes.length + " Residentes";
    },fomatoFecha: (fecha) =>{
            var formato = moment(fecha);
            return formato.format("llll");
    },getNombreUsuario: (nombre,apellido)=>{
      return `${nombre} ${apellido}`;
    }
        
    }
}
</script>