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
          <v-btn
            color="warning"
            @click="updateAnexo(item)"
          >
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
        @close-dialog="closeDialogModify"
        @modifier-complete="modifierComplete"
      ></component>
    </v-dialog> 

    <!--Visualizar Model-->
    <!--  <v-dialog v-model="dialogoPlanDetail" persistent max-width="880">
      <component
        :is="typeDetailPlanSelected"
        :Anexo="AnexoDetail"
        @close-dialog-detail="closeDialogDetail"
      >
      </component>
    </v-dialog> -->
  </v-card>
</template>

<script>
import axios from "axios";
import RegistrarAnexo from "@/components/anexos/RegistrarAnexo.vue";
import ModificarAnexo from "@/components/anexos/ModificarAnexo.vue";

export default {
  components: {
    RegistrarAnexo,
    ModificarAnexo
  },
  name: "app-gestion-anexos",
  data() {
    return {
      isregister: "RegistrarAnexo",
      ismodifier: "ModificarAnexo",
      selectedanexo: {},
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
          value: "usuario",
        },
        {
          text: "Acciones",
          value: "actions",
          sortable: false,
          align: "center",
        },
      ],
      anexos: [
        {
          id: "5f8f78f3076924e34c9613d0",
          titulo: "Pepinardo",
          descripcion: "Soy guapo, lo sé",
          enlaces: [
            {
              link: "www.twitch.tv/fede_3012",
              descripcion: "Enlace 1",
            },
          ],
          idresidente: "5f9f182cba5ac935cc3fe6f5",
          idcreador: "5f9e4cdae4655cf92eaa4d5b",
          usuario: "Renzo Guerra",
          fechacreacion: "20/11/2020",
          area: "psicologica",
        },
      ],
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
    async updateAnexo(item) {
      await axios
        .get("/Anexo/" + item.id)
        .then((res) => {
          this.selectedanexo = res.data;
          this.dialogPlanModify = true;
        })
        .catch((err) => {
          console.error(err);
        });
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