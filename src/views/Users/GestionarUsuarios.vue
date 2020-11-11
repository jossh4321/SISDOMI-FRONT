<template>
  <div>
    <v-card class="card">
      <v-card-title> Gestion de Usuarios </v-card-title>
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
                >
                <v-icon left>mdi-account-multiple-plus-outline</v-icon>
                  <span>Usuario</span>
                </v-btn>
              </template>
                <RegistrarUsuario
                  :listaroles="listaroles"
                  @close-dialog-save="closeDialogRegistrar()"></RegistrarUsuario>
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
            <v-btn
              v-if="item.estado == 'inactivo'"
              color="success"
              dark
              @click="cambiarEstadoUsuario(item)"
            >
              <v-icon left> mdi-check-decagram </v-icon>
              <span>Activar</span>
            </v-btn>

            <v-btn v-else color="error" dark @click="cambiarEstadoUsuario(item)">
              <v-icon left> mdi-close-outline </v-icon>
              <span>Desactivar</span>
            </v-btn>
          </v-row>
        </template>
      </v-data-table>
      <!--Dialogo de Actualizacion-->
      <v-dialog persistent
                v-model="dialogoactualizacion" 
                max-width="880px">
        <ActualizarUsuario
        v-if="dialogoactualizacion" 
        :usuario="usuario" :listaroles="listaroles" @close-dialog-update="closeDialogActualizar()">
        </ActualizarUsuario>

      </v-dialog>
      <!-----><!--Hola -->
      <!--Dialogo de Detalle-->
      <v-dialog persistent
                v-model="dialogodetalle" 
                max-width="880px">
          <ConsultarUsuario :usuario="usuario" @close-dialog-detail="closeDialogDetalle()">
          </ConsultarUsuario>
      </v-dialog>
      <!----->
        <v-btn @click="testing2()">TEST</v-btn>
    </v-card>
  </div>
</template>
<script>
import axios from 'axios';
//import { mdiCardAccountDetailsStarOutline } from '../../../node_modules/@mdi/font';
import RegistrarUsuario from '@/components/usuarios/RegistrarUsuario.vue'
import ActualizarUsuario from '@/components/usuarios/ActualizarUsuario.vue'
import ConsultarUsuario from  '@/components/usuarios/DetalleUsuario.vue'
import {mapMutations, mapState} from "vuex";
export default {
  name: "GestionarUsuario",
  components: {
    RegistrarUsuario,ActualizarUsuario, ConsultarUsuario
  },
  data() {
    return {
      search: "",
      //obj usado para almacenar datos de usuario en la actualizacion y consulta
      usuario:{},
      //lsita de cabeceras de la data table
      headers: [
        {
          text: "Nombre de Usuario",
          align: "start",
          sortable: false,
          value: "usuario",
        },
        { text: "Tipo Doc.", value:"datos.tipodocumento"},
        { text: "Nro. Doc", value: "datos.numerodocumento" },
        { text: "E-mail", value: "datos.email" },
        { text: "estado", value: "estado" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      dialogoregistro: false,
      dialogoactualizacion: false,
      dialogodetalle:false,
      listaroles:[]
    };
  },
  async created(){
      this.obtenerUsuarios();
      this.obtenerRoles();
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
    async abrirDialogoActualizar(idusuario){
        this.usuario = await this.loadUsuarioModificacion(idusuario);
        this.dialogoactualizacion = !this.dialogoactualizacion;
    },
    // Abre
    async abrirDialogoDetalle(idusuario){
        this.usuario = await this.loadUsuarioDetalle(idusuario); //Pide
        this.dialogodetalle = !this.dialogodetalle;
    },
    async loadUsuarioModificacion(idusuario){
      var user = {};
      await axios.get("/usuario/id?id="+idusuario)
      .then(res => {
         user = res.data; 
         user.datos.fechanacimiento = res.data.datos
                  .fechanacimiento.split("T")[0];
      })
      .catch(err => console.log(err));
      return user;
    },async loadUsuarioDetalle(idusuario){
      var user = {};
      await axios.get("/usuario/rol/permiso?id="+idusuario)
      .then(res => {
         user = res.data; // devuelve
         user.datos.fechanacimiento = res.data.datos
                  .fechanacimiento.split("T")[0];
      })
      .catch(err => console.log(err));
      console.log(user);
      return user;
    },async obtenerRoles(){
          await axios.get("/usuario/sistema/rol")
                  .then( x => {
                            this.listaroles = x.data;
                            console.log(this.listaroles);
                  }).catch(err => console.log(err));
    }, async obtenerUsuarios(){
           await axios.get("/usuario/all")
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