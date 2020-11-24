<template>
    <div>
         <v-data-table
    :headers="headers"
    :items="incidencias"

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
        <v-dialog v-model="dialogoConsultarIncidencia" max-width="500px">
          <v-card>
            <v-card-title class="headline">CONSULTA DE UNA INCIDENCIA</v-card-title>
          </v-card>
        </v-dialog>
        <!---->
    <!--DIALOGO DE MODIFICACION DE INCIDENCIA-->
        <v-dialog v-model="dialogoModificarIncidencia" max-width="500px">
          <v-card>
            <v-card-title class="headline">MODIFICACION DE UNA INCIDENCIA</v-card-title>
          </v-card>
        </v-dialog>
        <!---->
    </div>
</template>
<script>
import RegistrarIncidencia from '@/components/incidencias/RegistrarIncidencia.vue'
import moment from "moment";
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
                incidencias:[
                {id:"000000001",
                usuario:"Usuario1",
                fecharegistro:new Date(),
                fecha: new Date(),
                titulo:"Titulo1",
                descripcion:"Descripcion1",
                observaciones:["Obs1","Obs2","Obs3"],
                incidencias:["Inc1","Inc2","Inc3"],
                residentes:["Res1","Res2","Res3"]},
                {id:"000000002",
                usuario:"Usuario2",
                fecharegistro:new Date(),
                fecha: new Date(),
                titulo:"Titulo2",
                descripcion:"Descripcion2",
                observaciones:["Obs1","Obs2","Obs3"],
                incidencias:["Inc1","Inc2","Inc3"],
                residentes:["Res1","Res2","Res3"]}],
                headers: [
                            {
                            text: 'Titulo',
                            align: 'start',
                            sortable: true,
                            value: 'titulo',
                            },
                            { text: 'Fecha/Hora', value: 'fecha' },
                            { text: 'Responsable', value: 'usuario' },
                            { text: 'N° Involucrados', value: 'residentes' },
                            { text: 'Opciones', value: 'actions', sortable: false }
                        ],
        }
        
    },components:{
        RegistrarIncidencia

    },methods:{
        consultarIncidencia(id){
            this.dialogoConsultarIncidencia = !this.dialogoConsultarIncidencia;
        },modificarIncidencia(id){
            this.dialogoModificarIncidencia = !this.dialogoModificarIncidencia;
        },closeDialogRegistrar(){
            this.dialogoRegistrarIncidencia = !this.dialogoRegistrarIncidencia;
        }
    },computed:{
        
    },filters:{
        numResidentes: (residentes) => {
      return residentes.length + " Residentes";
    },
        fomatoFecha: (fecha) =>{
            var formato = moment(fecha);
            return formato.format("llll");
        }
    }
}
</script>