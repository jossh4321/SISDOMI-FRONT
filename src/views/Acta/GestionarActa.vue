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
            <v-toolbar-title>Actas de externamiento SISDOMI</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
            <v-col cols="12" sm="6" md="4">
              <v-dialog ref="dialog" v-model="modal" persistent width="290px">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="dates"
                    label="Rango de fechas"
                    prepend-icon="mdi-calendar"
                    readonly
                    single-line
                    v-bind="attrs"
                    v-on="on"
                    hide-details
                  ></v-text-field>
                </template>
                <v-date-picker v-model="dates" locale="es-es" range scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="modal = false">
                    Cancel
                  </v-btn>
                  <v-btn text color="primary" @click="cargarDocumentosRango(dates)">
                    OK
                  </v-btn>
                </v-date-picker>
              </v-dialog>
            </v-col>

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
                  <span>Registrar Acta</span>
                </v-btn>
              </template>
              <RegistrarActa
                :listaActas="listaActas"
                @close-dialog-save="closeDialogRegistrar()"
              ></RegistrarActa>
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
            <v-btn color="info" dark @click="abrirDialogoDetalle(item.id)">
              <v-icon left>mdi-file-eye</v-icon>
              <span>Detalle</span>
            </v-btn>
          </v-row>
        </template>
      </v-data-table>
      <!--Dialogo de Actualizacion-->
      <v-dialog persistent v-model="dialogoactualizacion" max-width="880px">
        <ActualizarActa
          v-if="dialogoactualizacion"
          :actaexternamiento="actaexternamiento"
          :listaActas="listaActas"
          @close-dialog-update="closeDialogActualizar()"
        ></ActualizarActa>
      </v-dialog>
      <!-----><!--Hola -->
      <!--Dialogo de Detalle-->
      <v-dialog persistent v-model="dialogodetalle" max-width="880px">
        <ConsultarActa
          :actaexternamiento="actaexternamiento"
          @close-dialog-detail="closeDialogDetalle()"
        ></ConsultarActa>
      </v-dialog>
      <!----->
    </v-card>
  </div>
</template>
<script>
import axios from "axios";
//import { mdiCardAccountDetailsStarOutline } from '../../../node_modules/@mdi/font';
import RegistrarActa from "@/components/actas/RegistrarActa.vue";
import ActualizarActa from "@/components/actas/ActualizarActa.vue";
import ConsultarActa from "@/components/actas/VisualizarActa.vue";
import { mapMutations, mapState } from "vuex";
export default {
  name: "GestionarActaI",
  components: {
    RegistrarActa,
    ActualizarActa,
    ConsultarActa,
  },
  data() {
    return {
      search: "",
      //obj usado para almacenar datos de usuario en la actualizacion y consulta
      actaexternamiento: {},
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
      dialogodetalle: false,
      listaActas: [],
      fromDate: null,
      toDate: null,
      dates: [],
      modal: false,
    };
  },
  async created() {
    this.obtenerUsuarios();
    this.ObtenerResidente();
  },
  methods: {
    ...mapMutations(["setUsuarios", "replaceUsuario"]),
    testing2() {
      axios
        .get("/actaexternamiento/saludos")
        .then((x) => {
          console.log(x.data);
        })
        .catch((err) => console.log(err));
    },
    closeDialogRegistrar() {
      this.dialogoregistro = false;
    },
    closeDialogActualizar() {
      this.dialogoactualizacion = false;
    },
    closeDialogDetalle() {
      this.dialogodetalle = false;
    },
    editItem(item) {
      console.log(item);
    },
    deleteItem(item) {
      console.log(item);
    },
    //llamando al API para obtener los datos de un usuario especifico
    async abrirDialogoActualizar(id) {
      this.actaexternamiento = await this.loadUsuarioModificacion(id);
      this.dialogoactualizacion = !this.dialogoactualizacion;
    },
    async ObtenerResidente() {
      await axios
        .get("/residente/all")
        .then((x) => {
          this.listaActas = x.data;

          console.log(this.listaActas);
        })
        .catch((err) => console.log(err));
    },
    // Abre
    async abrirDialogoDetalle(id) {
      this.actaexternamiento = await this.loadUsuarioDetalle(id); //Pide
      this.dialogodetalle = !this.dialogodetalle;
    },
    async loadUsuarioModificacion(id) {
      var user = {};
      await axios
        .get("/actaexternamiento/id?id=" + id)
        .then((res) => {
          user = res.data;
          user.fechacreacion = res.data.fechacreacion.split("T")[0];
        })
        .catch((err) => console.log(err));
      return user;
    },
    async loadUsuarioDetalle(id) {
      var user = {};
      await axios
        .get("/actaexternamiento/id?id=" + id)
        .then((res) => {
          user = res.data; // devuelve
          user.fechacreacion = res.data.fechacreacion.split("T")[0];
        })
        .catch((err) => console.log(err));
      console.log(user);
      return user;
    },
    async obtenerUsuarios() {
      let listParams = [];

      let fromDateParam =
        this.fromDate == null ? "" : "FromDate=" + this.fromDate;
      let toDateParam = this.toDate == null ? "" : "ToDate=" + this.toDate;

      if (fromDateParam != "") {
        listParams.push(fromDateParam);
      }

      if (toDateParam != "") {
        listParams.push(toDateParam);
      }

      let params = listParams.join("&");

      await axios
        .get("/actaexternamiento/all?" + params) ////////OBTENER ACTA EXTERNAMIENTO
        .then((res) => {
          this.setUsuarios(res.data);
        })
        .catch((err) => console.log(err));
    },
    async cambiarEstadoUsuario(actaexternamiento) {
      await this.$swal({
        title: "Esta Seguro?",
        text:
          actaexternamiento.estado == "activo"
            ? "Se desactivara el usuario " + actaexternamiento.actaexternamiento
            : "Se activara el usuario " + actaexternamiento.actaexternamiento,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText:
          actaexternamiento.estado == "activo" ? "Desactivar" : "Activar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          var estadonuevo =
            actaexternamiento.estado == "activo" ? "inactivo" : "activo";
          axios
            .put(
              "/actaexternamiento/estado?id=" +
                actaexternamiento.id +
                "&nuevoestado=" +
                estadonuevo,
              actaexternamiento
            )
            .then((res) => {
              this.replaceUsuario(res.data);
              this.mensaje(
                "success",
                "Listo",
                "Estado del Usuario modificado Satisfactoriamente"
              );
            })
            .catch((err) => console.log(err));
        }
      });
    },
    async mensaje(icono, titulo, texto) {
      await this.$swal({
        icon: icono,
        title: titulo,
        text: texto,
      });
    },
    cargarDocumentosRango(dates) {
      this.dates = dates.sort();          
      this.fromDate = this.formatDate(dates[0]);
      this.toDate = this.formatDate(dates[1]);      
      this.obtenerUsuarios();      
      this.modal = false;
    },
    formatDate (date) {
        if (!date) return null;
        const [year, month, day] = date.split('-')
        return `${month}-${day}-${year}`
    },
  },
  computed: {
    ...mapState(["usuarios"]),
  },
};
</script>
<style scoped>
.card {
  margin: 20px;
}
</style>