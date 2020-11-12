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
              <v-icon left> mdi-pencil </v-icon>
              <span>Visualizar</span>
            </v-btn>
          </v-row>
        </template>
      </v-data-table>
      <!----->
      <!--Dialogo de Modificacion-->
      <v-dialog persistent v-model="dialogoactualizacion" max-width="880px">
        <ModificarResidente
          :residente="residente"
          @close-dialog-detail="closeDialogModificar()"
        >
        </ModificarResidente>
      </v-dialog>
      <!--Dialogo de Detalle-->
      <v-dialog persistent v-model="dialogodetalle" max-width="880px">
        <ConsultarResidente
          :residente="residente"
          @close-dialog-detail="closeDialogDetalle()"
        >
        </ConsultarResidente>
      </v-dialog>
    </v-card>
  </div>
</template>
<script>
import axios from "axios";

import ModificarResidente from "@/components/residentes/ActualizarResidente.vue";
import ConsultarResidente from "@/components/residentes/DetalleResidente.vue";
import RegistrarResidente from "@/components/residentes/RegistrarResidente.vue";
import { mapMutations, mapState } from "vuex";
export default {
  name: "GestionarResidentes",
  components: {
    ConsultarResidente,
    ModificarResidente,
    RegistrarResidente,
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
      /*planesI: [
        {
          nombre: "Manuel stafno",
          apellido: "Paredes Guerra",
          tipdocumento: "Dni",
          numdocumento:"72498627",
          fechingreso:"28/05/2019"
        },
        {
          nombre: "PlanI_Psico_Xiomara_1",
          apellido: "Xiomara Paredes Guerra",
          tipdocumento: "Dni",
          numdocumento:"72498627",
          fechingreso:"28/05/2019"
        },
        {
          nombre: "PlanI_Edu_Marlyn_1",
          apellido: "Marlyn Candela Peña",
          tipdocumento: "Dni",
          numdocumento:"72498627",
          fechingreso:"28/05/2019"
        }
      ],*/
      dialogoregistro: false,
      dialogoactualizacion: false,
      dialogodetalle: false,
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

    async loadResidenteDetalle(idresidente) {
      var user = {};
      await axios
        .get("/residente/id?id=" + idresidente)
        .then((res) => {
          console.log(res);
          user = res.data;
          user.fechaNacimiento = res.data.fechaNacimiento.split("T")[0];
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
          this.setResidentes(res.data);
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
