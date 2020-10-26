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
            <v-toolbar-title>Usuarios SISDOMI</v-toolbar-title>
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
                <RegistrarUsuario @close-dialog-save="closeDialogRegistrar()"></RegistrarUsuario>
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
              v-if="item.estado == 'activo'"
              color="success"
              dark
              @click="deleteItem(item)"
            >
              <v-icon left> mdi-check-decagram </v-icon>
              <span>Activar</span>
            </v-btn>

            <v-btn v-else color="error" dark @click="deleteItem(item)">
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
        <ActualizarUsuario :usuario="usuario" @close-dialog-update="closeDialogActualizar()">
        </ActualizarUsuario>
      </v-dialog>
      <!----->
      <!--Dialogo de Detalle-->
      
      <!----->
        <v-btn @click="testing()">TEST</v-btn>
    </v-card>
  </div>
</template>
<script>
import axios from 'axios';
import RegistrarUsuario from '@/components/usuarios/RegistrarUsuario.vue'
import ActualizarUsuario from '@/components/usuarios/ActualizarUsuario.vue'
import {mapMutations, mapState} from "vuex";
export default {
  name: "GestionarUsuario",
  components: {
    RegistrarUsuario,ActualizarUsuario
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
          value: "nombreusuario",
        },
        { text: "Tipo Doc.", value:"datos.tipodocumento"},
        { text: "Nro. Doc", value: "datos.numerodocumento" },
        { text: "rol", value: "rol" },
        { text: "estado", value: "estado" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      dialogoregistro: false,
      dialogoactualizacion: false
    };
  },
  created(){
      this.setUsuarios([{
        id:"123",
        nombreusuario:"josuec4321",
        rol:"ABC",
        estado:"activo",
        datos:{
          nombre: "Josue Elias",
          apellido: "Colombo Duran",
          fechanacimiento: "2020-10-08",
          tipodocumento: "DNI",
          numerodocumento: "12345678",
          direccion: "Av Jose C. del torre, 163 Urb. Los ficus - Sta. Anita",
          email: "josuec4321@gmail.com",
          imagen:""
          }
        }]);
  },
  methods: {
    ...mapMutations(["setUsuarios"]),
    closeDialogRegistrar(){
      this.dialogoregistro = false;
    },
    closeDialogActualizar(){
      this.dialogoactualizacion = false;
    },
    editItem(item) {
      console.log(item);
    },
    deleteItem(item) {
      console.log(item);
    },testing(){
       /*axios.get("/usuario/all").then( x=> {
          console.log(x);
       }).catch(err => console.log("Something was wrong: "+err));*/
       this.setUsuarios([1,2,3,4,5,6,7,8,9,10]);
       console.log(this.usuarios);
    },
    //llamando al API para obtener los datos de un usuario especifico
    abrirDialogoActualizar(idusuario){
        this.usuario = this.loadUsuarioModificacion();
        this.dialogoactualizacion = !this.dialogoactualizacion;
    },
    loadUsuarioModificacion(){
       return {
         id:"123",
        nombreusuario:"josuec4321",
        rol:"ABC",
        estado:"activo",
        datos:{
          nombre: "Josue Elias",
          apellido: "Colombo Duran",
          fechanacimiento: "2020-10-08",
          tipodocumento: "DNI",
          numerodocumento: "12345678",
          direccion: "Av Jose C. del torre, 163 Urb. Los ficus - Sta. Anita",
          email: "josuec4321@gmail.com",
          imagen:""
          }
        }
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