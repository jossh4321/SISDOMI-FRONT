<template>
  <v-card elevation="3" outlined class="card">
    <v-card-title>Gestión de Anexos</v-card-title>
    <v-card-subtitle
      >Visualice todos los anexos y realice la búsqueda mediante
      filtros</v-card-subtitle
    >
    <div>
      <v-data-table
        :headers="headers"
        :items="anexos"
        :items-per-page="itemsPerPage"
        :page.sync="page"
        hide-default-footer
        loading-text="Cargando Anexos"
        @page-count="pageCount = $event"
        no-data-text="No se ha registrado ningún anexo hasta el momento."
        no-results-text="No se ha encontrado ningún anexo."
        class="datatable"
        :loading="loading"
        :search="search"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Anexos</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Residente"
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
        <template v-slot:[`item.fechacreacion`]="{ item }">
          {{ item.fechacreacion | moment("DD/MM/YYYY") }}
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
        :anexo="selectedanexo"
        :residente="selectedresidente"
        @close-dialog="closeDialogModify"
        @modifier-complete="modifierComplete"
      ></component>
    </v-dialog>

    <!--Visualizar Model-->
    <v-dialog v-model="dialogDetail" persistent max-width="880">
      <component
        :is="isvisualizer"
        :anexo="selectedanexo"
        @close-dialog-detail="closeDialogDetail"
      >
      </component>
    </v-dialog>
  </v-card>
</template>

<script>
import axios from "axios";
import RegistrarAnexo from "@/components/anexos/RegistrarAnexo.vue";
import ModificarAnexo from "@/components/anexos/ModificarAnexo.vue";
import VisualizarAnexo from "@/components/anexos/VisualizarAnexo.vue";

export default {
  components: {
    RegistrarAnexo,
    ModificarAnexo,
    VisualizarAnexo,
  },
  name: "app-gestion-anexos",
  data() {
    return {
      isregister: "RegistrarAnexo",
      ismodifier: "ModificarAnexo",
      isvisualizer: "VisualizarAnexo",
      selectedanexo: {},
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
          text: "Código",
          align: "start",
          sortable: false,
          value: "id",
        },
        {
          text: "Título de Anexo",
          align: "start",
          sortable: false,
          value: "titulo",
        },
        {
          text: "Fecha de registro",
          value: "fechacreacion",
        },
        {
          text: "Creador",
          value: "creador",
        },
        {
          text: "Acciones",
          value: "actions",
          sortable: false,
          align: "center",
        },
      ],
      anexos: [],
    };
  },
  methods: {
    registerComplete() {
      this.closeDialog();
      this.loading = true;
    },
    modifierComplete() {
      this.closeDialogModify();
      this.loading = true;
    },
    closeDialog() {
      this.dialogRegister = false;
    },
    closeDialogModify() {
      this.dialogModify = false;
    },
    closeDialogDetail() {
      this.dialogDetail = false;
    },
    async updateAnexo(item) {
      await axios
        .get("/Anexo/" + item.id)
        .then((res) => {
          this.selectedanexo = res.data;
          this.dialogModify = true;
        })
        .catch((err) => {
          console.error(err);
        });
     
      await axios
      .get("/residente/all")
      .then((res) => {
        let selected = res.data.find(
          (element) => element.id == this.selectedanexo.idresidente
        );
        this.selectedresidente.id = selected.id;
        this.selectedresidente.residente = selected.apellido + " " + selected.nombre;
      })
      .catch((err) => console.log(err));
      this.dialogModify = true;
    },
    async detailAnexo(item) {
      await axios
        .get("/Anexo/" + item.id)
        .then((res) => {
          this.selectedanexo = res.data;
          this.dialogDetail = true;
        })
        .catch((err) => {
          console.error(err);
        });
      this.dialogDetail = true;
    },
    listAnexos() {
      axios
        .get("/Anexo/all")
        .then((res) => {
          this.loading = false;
          this.anexos = res.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  created() {
    this.listAnexos();
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