<template>
  <div>
    <v-card class="card">
      <v-card-title> Gestion de Acta </v-card-title>
      <v-data-table
        :headers="headers"
        :items="usuarios"
        :search="search"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Residentes SISDOMI</v-toolbar-title>
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
                >  <v-icon left>mdi-account-multiple-plus-outline</v-icon> <span>Registrar Acta</span>
                 </v-btn>       
                   </template>
                <RegistrarActa :listaActas="listaActas" @close-dialog-save="closeDialogRegistrar()"></RegistrarActa>
            </v-dialog>
            <!---->
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-row align="center" justify="space-around">
                <v-btn
                  color="warning"
                  dark
                  @click="abrirDialogoActualizar(item.id)"
                >
                <v-icon left>mdi-briefcase-edit</v-icon>
                  <span>Actualizar</span>
                </v-btn>
                <v-btn
                  color="info"
                  dark
                  @click="abrirDialogoDetalle(item.id)"
                >
                <v-icon left>mdi-file-eye</v-icon>
                  <span>Detalle</span>
                </v-btn>
            

            
          </v-row>
        </template>
      </v-data-table>
      <!--Dialogo de Actualizacion-->
      <v-dialog persistent
                v-model="dialogoactualizacion" 
                max-width="880px">
        <ActualizarActa v-if="dialogoactualizacion" :usuario="usuario"  @close-dialog-update="closeDialogActualizar()"></ActualizarActa>

      </v-dialog>
      <!-----><!--Hola -->
      <!--Dialogo de Detalle-->
      <v-dialog persistent
                v-model="dialogodetalle" 
                max-width="880px">
          <ConsultarActa :usuario="usuario" @close-dialog-detail="closeDialogDetalle()"></ConsultarActa>
      </v-dialog>
      <!----->
    </v-card>
  </div>
</template>
<script>
import axios from 'axios';
//import { mdiCardAccountDetailsStarOutline } from '../../../node_modules/@mdi/font';
import RegistrarActa from '@/components/actas/RegistrarActa.vue'
import ActualizarActa from '@/components/actas/ActualizarActa.vue'
import ConsultarActa from  '@/components/actas/VisualizarActa.vue'
import {mapMutations, mapState} from "vuex";
export default {
  name: "GestionarActaI",
  components: {
    RegistrarActa,ActualizarActa, ConsultarActa
  },
  data() {
    return {
      search: "",
      //obj usado para almacenar datos de usuario en la actualizacion y consulta
      usuario:{},
      //lsita de cabeceras de la data table
      headers: [
        {
          text: "Tipo",
          align: "start",
          sortable: false,
          value: "tipo",
        },
     
      { text: "fechacreacion", value: "fechacreacion" },
      { text: "area", value: "area" },
      { text: "fase", value: "fase" },
      { text: "residente", value: "residente" },
      { text: "estado", value: "estado" },
 
        
        { text: "Actions", value: "actions", sortable: false },
      ],
      dialogoregistro: false,
      dialogoactualizacion: false,
      dialogodetalle:false,
      listaActas: [],
    };
  },
  async created(){
      this.obtenerUsuarios();
      this.ObtenerResidente();
  },
  methods: {
    ...mapMutations(["setUsuarios","replaceUsuario"]),
    testing2(){
        axios.get("/usuario/saludos")
        .then(x => {
          console.log(x.data);
        }).catch(err => console.log(err));
    },
    closeDialogRegistrar(){
      this.dialogoregistro = false;
    },
    closeDialogActualizar(){
      this.dialogoactualizacion = false;
    },
    closeDialogDetalle(){
      this.dialogodetalle = false;
    },
    editItem(item) {
      console.log(item);
    },
    deleteItem(item) {
      console.log(item);
    },
    //llamando al API para obtener los datos de un usuario especifico
    async abrirDialogoActualizar(id){
        this.usuario = await this.loadUsuarioModificacion(id);
        this.dialogoactualizacion = !this.dialogoactualizacion;
    },
    async ObtenerResidente(){
      await axios
      .get("/residente/all")
      .then((x) => {
        this.listaActas = x.data;
        console.log(this.listaActas);
       })
       .catch((err)=> console.log(err));
    },
    // Abre
    async abrirDialogoDetalle(id){
        this.usuario = await this.loadUsuarioDetalle(id); //Pide
        this.dialogodetalle = !this.dialogodetalle;
    },
    async loadUsuarioModificacion(id){
      var user = {};
      await axios.get("/actaexternamiento/id?id="+id)
      .then(res => {
         user = res.data; 
         user.datos.fechanacimiento = res.data.datos
                  .fechanacimiento.split("T")[0];
      })
      .catch(err => console.log(err));
      return user;
    },async loadUsuarioDetalle(id){
      var user = {};
      await axios.get("/actaexternamiento/id?id="+id)
      .then(res => {
         user = res.data; // devuelve
         user.datos.fechacreacion = res.data.tipo
                  .fechacreacion.split("T")[0];
      })
      .catch(err => console.log(err));
      console.log(user);
      return user;
    
    }, async obtenerUsuarios(){
           await axios.get("/actaexternamiento/all") ////////OBTENER ACTA EXTERNAMIENTO
            .then(res => {
                   this.setUsuarios(res.data);
            }).catch(err => console.log(err));
    }, async cambiarEstadoUsuario(usuario){
       await this.$swal({
            title: 'Esta Seguro?',
            text: usuario.estado=="activo"?
                    "Se desactivara el usuario "+usuario.usuario:
                    "Se activara el usuario "+usuario.usuario,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: usuario.estado=="activo"?'Desactivar':'Activar',
            cancelButtonText:"Cancelar"
          }).then((result) => {
            if (result.isConfirmed) {
              var estadonuevo= usuario.estado=="activo"?
                    "inactivo":"activo";
              axios.put("/usuario/estado?id="+usuario.id+"&nuevoestado="+estadonuevo,usuario)
                .then(res => {
                     this.replaceUsuario(res.data);
                     this.mensaje("success","Listo","Estado del Usuario modificado Satisfactoriamente")
                }).catch(err => console.log(err));
            }
          })
    },async mensaje(icono,titulo,texto){
      await this.$swal({
        icon: icono,
        title: titulo,
        text: texto
      });
    }
  },computed:{
    ...mapState(["usuarios"])
  }
};
</script>
<style scoped>
.card {
  margin: 20px;
}
</style>