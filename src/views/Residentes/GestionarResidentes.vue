<template>
  <div>
    <v-card class="card">
      <v-card-title> Gestionar Residentes </v-card-title>
      <v-data-table
        :headers="headers"
        :items="residentes"
        :search="search"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Residentes SISCAR</v-toolbar-title>
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
            <v-dialog persistent v-model="dialogoregistro" max-width="880px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="success"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon left>mdi-account-multiple-plus-outline</v-icon>
                  <span>Registrar nuevo Residente</span>
                </v-btn>
              </template>
              <RegistrarResidente
                @close-dialog-save="closeDialogRegistrar()"
              ></RegistrarResidente>
            </v-dialog>
          </v-toolbar>
        </template>

        <template v-slot:[`item.actions`]="{ item }"
          ><!--Abrir dialogo detalle -->
          <v-row align="center" justify="space-around">
            <!--BOTONES-->
            <v-btn color="warning" dark @click="abrirDialogoModificar(item.id)">
              <v-icon left> mdi-pencil </v-icon>
              <span>Actualizar</span>
            </v-btn>
            <v-btn color="info" dark @click="abrirDialogoDetalle(item.id)">
              <v-icon left> info </v-icon>
              <span>Visualizar</span>
            </v-btn>
            <v-btn v-if="faseActual(item.progreso)" color="grey" dark @click="abrirDialogoPromover(item.id)">
              <v-icon left> mdi-page-next-outline </v-icon>
              <span>Promover</span>
            </v-btn>
            <v-btn v-else color="grey" disabled>
              <v-icon left> mdi-page-next-outline </v-icon>
              <span>Promover</span>
            </v-btn>
          </v-row>
        </template>
      </v-data-table>
      <!----->
      <!--Dialogo de Modificacion-->
      <v-dialog persistent v-model="dialogoactualizacion" max-width="880px">
        <ModificarResidente
          v-if="dialogoactualizacion"
          :residente="residente"                   
          @close-dialog-update="closeDialogModificar()"
        >
        </ModificarResidente>
      </v-dialog>
      <!--Dialogo de Detalle-->
      <v-dialog persistent v-model="dialogodetalle" max-width="880px">
        <ConsultarResidente
          v-if="dialogodetalle"
          :residente="residente"         
          @close-dialog-detail="closeDialogDetalle()"
        >
        </ConsultarResidente>
      </v-dialog>
      <!--Dialogo de Detalle-->
      <v-dialog persistent v-model="dialogopromover" max-width="880px">
        <PromoverResidente
          :residente="residente"
          :dialogopromover="dialogopromover"
          @close-dialog-promover="closeDialogPromover()"
        >
        </PromoverResidente>
      </v-dialog>
    </v-card>
  </div>
</template>
<script>
import axios from "axios";

import ModificarResidente from "@/components/residentes/ActualizarResidente.vue";
import ConsultarResidente from "@/components/residentes/DetalleResidente.vue";
import RegistrarResidente from "@/components/residentes/RegistrarResidente.vue";
import PromoverResidente from "@/components/residentes/PromoverResidente.vue";
import { mapMutations, mapState } from "vuex";
export default {
  name: "GestionarResidentes",
  components: {
    ConsultarResidente,
    ModificarResidente,
    RegistrarResidente,
    PromoverResidente
  },
  data() {
    return {
      search: "",
      residente: {},

      headers: [
        {
          text: "Nombre ",
          align: "start",
          sortable: false,
          value: "nombre",
        },
        { text: "Apellido", value: "apellido" },
        { text: "Tipo de documento", value: "tipoDocumento" },
        { text: "N°documento", value: "numeroDocumento" },
        { text: "Fecha de Ingreso", value: "fechaIngreso" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      dialogoregistro: false,
      dialogoactualizacion: false,
      dialogodetalle: false,
      dialogopromover:false,
      departamentos: [],
      provincias: [],
      distritos: [],
      idDepartamento: "",
      idProvincia: "",
      idDistrito: "",
      ubigeo:"",
    };
  },
  async created() {
    this.obtenerResidentes();    
  },
  methods: {
    ...mapMutations(["setResidentes"]),
    editItem(item) {
      console.log(item);     
    },
    faseActual(array){
      var ultimoProgreso = array[array.length - 1].fase
      if(ultimoProgreso === 3){
        return false
      }else{
        return true
      }
    },
    detailItem(item) {
      console.log(item);
    },
    closeDialogDetalle() {
      this.dialogodetalle = false;
    },
    closeDialogRegistrar() {
      this.dialogoregistro = false;
    },
    closeDialogModificar() {
      this.dialogoactualizacion = false;
    },
    closeDialogPromover(){
      this.dialogopromover = false;
    },
    ///abrir dialogo de detalle
    async abrirDialogoDetalle(idresidente) {
      this.residente = await this.loadResidenteDetalle(idresidente);
      this.dialogodetalle = !this.dialogodetalle;
    },
    ///abrir dialogo de modificacion
    async abrirDialogoModificar(idresidente) {
      this.residente = await this.loadResidenteDetalle(idresidente);
      this.dialogoactualizacion = !this.dialogoactualizacion;
    },
    ///abrir dialogo de promover
    async abrirDialogoPromover(idresidente) {
      this.residente = await this.loadResidenteDetalle(idresidente);
      this.dialogopromover = !this.dialogopromover;
    },

    async loadResidenteDetalle(idresidente) {
      var user = {};
      await axios
        .get("/residente/id?id=" + idresidente)
        .then((res) => {
          console.log(res);
          user = res.data;
          user.fechaNacimiento = user.fechaNacimiento.split("T")[0];
          user.fechaIngreso = user.fechaIngreso.split("T")[0];
        })
        .catch((err) => console.log(err));
      console.log(user);     
      return user;
    },    
    ///////////////////Consumo de  apis
    async obtenerResidentes() {
      await axios
        .get("/residente/all")
        .then((res) => {
          var info = {};
          info = res.data;
          console.log(res.data)
          for (var x=0;x<res.data.length;x++){
              info[x].fechaIngreso = res.data[x].fechaIngreso.split("T")[0];
          }
          
          this.setResidentes(info);
        })
        .catch((err) => console.log(err));
    },    
  },
  computed: {
    ...mapState(["residentes"]),
  },
};
</script>
<style scoped>
.card {
  margin: 20px;
}
</style>
