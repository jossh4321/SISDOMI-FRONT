<template>
  <v-card elevation="3" outlined class="card">
    <v-card-title>Gestión de Actividades</v-card-title>
    <v-card-subtitle
      >Visualice todos las actividades y realice la búsqueda mediante
      filtros</v-card-subtitle
    >
    <div>
      <v-data-table
        :headers="headers"
        :items="actividades"
        :items-per-page="itemsPerPage"
        :page.sync="page"
        hide-default-footer
        loading-text="Cargando Actividades"
        @page-count="pageCount = $event"
        no-data-text="No se ha registrado ninguna actividad hasta el momento."
        no-results-text="No se ha encontrado ninguna actividad."
        class="datatable"
        :loading="loading"
        :search="search"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Actividades</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Creador"
              single-line
              hide-details
              class="mr-10"
            >
            </v-text-field>
            <v-btn
              class="mb-2"
              @click="dialogRegister = true"
              color="success"
              dark
            >
              <v-icon left class="ml-auto ml-sm-0 mr-auto mr-sm-1"
                >mdi-plus</v-icon
              >
              <span class="d-none d-sm-block">Registrar</span>
            </v-btn>
          </v-toolbar>
        </template>
        <template v-slot:[`item.tipo`]="{ item }">
            {{ capitalizeFirstLetter(item.tipo) }}
        </template>
        <template v-slot:[`item.contenido.fechainicio`]="{ item }">
          <v-chip color="success" dark>
            {{ item.contenido.fechainicio | fomatoFecha }}
          </v-chip>
        </template>
        <template v-slot:[`item.contenido.fechafin`]="{ item }">
          <v-chip color="success" dark>
            {{ item.contenido.fechafin | fomatoFecha }}
          </v-chip>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn color="warning" @click="updateAnexo(item)">
            <v-icon left class="ml-auto ml-sm-0 mr-auto mr-sm-1"
              >mdi-pencil</v-icon
            >
            <span class="d-none d-sm-block">Actualizar</span>
          </v-btn>
          <v-btn color="info" class="ml-3" @click="detailAnexo(item)">
            <v-icon left class="ml-auto ml-sm-0 mr-auto mr-sm-1"
              >mdi-file-eye</v-icon
            >
            <span class="d-none d-sm-block">Detalle</span>
          </v-btn>
        </template>
      </v-data-table>
      <div class="text-center pt-2">
        <v-pagination v-model="page" :length="pageCount"></v-pagination>
      </div>
    </div>

    <!--Registrar Modal-->
    <v-dialog v-model="dialogRegister" persistent max-width="880">
      <component
        :is="isregister"
        @close-dialog="closeDialog"
        @register-complete="registerComplete"
      ></component>
    </v-dialog>

    <!--Actualizar Modal-->
    <v-dialog v-model="dialogModify" persistent max-width="880">
      <component
        :is="ismodifier"
        :anexo="selectedactividad"
        @close-dialog="closeDialogModify"
        @modifier-complete="modifierComplete"
      ></component>
    </v-dialog>

    <!--Visualizar Model-->
    <v-dialog v-model="dialogDetail" persistent max-width="880">
      <component
        :is="isvisualizer"
        :actividad="selectedactividad"
        @close-dialog="closeDialogDetail"
      >
      </component>
    </v-dialog>
  </v-card>
</template>

<script>
import axios from "axios";
import RegistrarActividad from "@/components/actividades/RegistrarActividad.vue";
import ModificarAnexo from "@/components/anexos/ModificarAnexo.vue";
import VisualizarActividad from "@/components/actividades/VisualizarActividad.vue";
import moment from "moment";
moment.locale("es");

export default {
  components: {
    RegistrarActividad,
    ModificarAnexo,
    VisualizarActividad,
  },
  name: "app-gestion-actividades",
  data() {
    return {
      isregister: "RegistrarActividad",
      ismodifier: "ModificarAnexo",
      isvisualizer: "VisualizarActividad",
      selectedactividad: {},
      selectedresidente: {},
      search: "",
      page: 1,
      pageCount: 0,
      itemsPerPage: 5,
      loading: true,
      dialogRegister: false,
      dialogModify: false,
      dialogDetail: false,
      headers: [
        {
          text: "Título de Actividad",
          align: "start",
          sortable: false,
          value: "nombre",
        },
        {
          text: "Tipo de Actividad",
          align: "start",
          sortable: false,
          value: "tipo",
        },
        {
          text: "Creador",
          value: "creador",
        },
        {
          text: "Fecha de Inicio",
          value: "contenido.fechainicio",
        },
        {
          text: "Fecha de Fin",
          value: "contenido.fechafin",
        },
        {
          text: "Acciones",
          value: "actions",
          sortable: false,
          align: "center",
        },
      ],
      actividades: [],
    };
  },
  methods: {
    registerComplete() {
      this.closeDialog();
      this.loading = true;
      this.listActividades();
    },
    modifierComplete() {
      this.closeDialogModify();
      this.loading = true;
      this.listActividades();
    },
    closeDialog() {
      this.dialogRegister = false;
    },
    closeDialogModify() {
      this.dialogModify = false;
      this.ismodifier = "";
    },
    closeDialogDetail() {
      this.dialogDetail = false;
    },
    async updateAnexo(item) {
      this.ismodifier = "ModificarAnexo";
      await axios
        .get("/Anexo/" + item.id)
        .then((res) => {
          this.selectedactividad = res.data;
          this.dialogModify = true;
        })
        .catch((err) => {
          console.error(err);
        });

      this.dialogModify = true;
    },
    async detailAnexo(item) {
      await axios
        .get("/Actividad/" + item.id)
        .then((res) => {
          this.selectedactividad = res.data;
          console.log(this.selectedactividad);
          this.dialogDetail = true;
        })
        .catch((err) => {
          console.error(err);
        });
      this.dialogDetail = true;
    },
    listActividades() {
      axios
        .get("/Actividad/all")
        .then((res) => {
          this.loading = false;
          this.actividades = res.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
  },
  created() {
    this.listActividades();
  },
  filters: {
    fomatoFecha: (fecha) => {
      var formato = moment(fecha);
      return formato.format("ll");
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  width: 95%;
  margin: 0px auto;
  margin-top: 30px;
  padding-bottom: 20px;
}
.icon-plan {
  margin-top: 2px;
}
</style>