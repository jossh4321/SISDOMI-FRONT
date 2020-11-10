<template>
  <v-card elevation="3" outlined class="card">
    <v-card-title>Gestión de Planes de Intervención</v-card-title>
    <v-card-subtitle
      >Visualice todos los planes de intervención y realice la búsqueda mediante
      filtros</v-card-subtitle
    >
    <div>
      <v-data-table
        :headers="headers"
        :items="planesIntervencion"
        :items-per-page="itemsPerPage"
        :page.sync="page"
        hide-default-footer
        @page-count="pageCount = $event"
        no-data-text="No se ha registrado ningún plan de intervención"
        no-results-text="No se ha encontrado ningún plan de intervención"
        class="datatable"
        :search="search"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Planes de Intervenciones</v-toolbar-title>
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
              <v-icon left>mdi-plus</v-icon>
              Registrar
            </v-btn>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn color="warning" @click="UpdatePlanIntervencion(item)">
            <v-icon left>mdi-pencil</v-icon><span class="d-none d-sm-block">Actualizar</span>
          </v-btn>
          <v-btn
            color="error"
            class="ml-3"
            @click="DeletePlanIntervencion(item)"
          >
            <v-icon left>mdi-delete</v-icon>
            <span class="d-none d-sm-block">Eliminar</span>
          </v-btn>
          <v-btn color="info" class="ml-3" @click="DetailPlanIntervencion(item)">
             <v-icon left>mdi-file-eye</v-icon>
             <span class="d-none d-sm-block">Detalle</span>
          </v-btn>
        </template>
      </v-data-table>
      <div class="text-center pt-2">
        <v-pagination v-model="page" :length="pageCount"></v-pagination>
      </div>
    </div>
    <v-dialog> </v-dialog>
  </v-card>
</template>

<script>
export default {
  name: "app-gestion-planes",
  data() {
    return {
      search: "",
      page: 1,
      pageCount: 0,
      itemsPerPage: 5,
      dialogRegister: false,
      headers: [
        {
          text: "Título del Plan de Intervención",
          align: "start",
          sortable: false,
          value: "titulo",
        },
        {
          text: "Residente",
          value: "usuario",
        },
        {
          text: "Fecha de registro",
          value: "fechacreacion",
        },
        {
          text: "Acciones",
          value: "actions",
          sortable: false,
          align: "center",
        },
      ],
      planesIntervencion: [
        {
          titulo: "Plan de Intervencion Inicial",
          usuario: "Juan Mendez",
          fechacreacion: "20/10/2020",
        },
        {
          titulo: "Plan de Intervencion Inicial",
          usuario: "Juan Mendez",
          fechacreacion: "20/10/2020",
        },
        {
          titulo: "Plan de Intervencion Inicial",
          usuario: "Juan Mendez",
          fechacreacion: "20/10/2020",
        },
        {
          titulo: "Plan de Intervencion Inicial",
          usuario: "Juan Mendez",
          fechacreacion: "20/10/2020",
        },
        {
          titulo: "Plan de Intervencion Inicial",
          usuario: "Juan Mendez",
          fechacreacion: "20/10/2020",
        },
        {
          titulo: "Plan de Intervencion Inicial",
          usuario: "Juan Mendez",
          fechacreacion: "20/10/2020",
        },
        {
          titulo: "Plan de Intervencion Inicial",
          usuario: "Juan Mendez",
          fechacreacion: "20/10/2020",
        },
        {
          titulo: "Plan de Intervencion Inicial",
          usuario: "Juan Mendez",
          fechacreacion: "20/10/2020",
        },
        {
          titulo: "Plan de Intervencion Inicial",
          usuario: "Juan Mendez",
          fechacreacion: "20/10/2020",
        },
      ],
    };
  },
  methods: {},
  computed: {},
};
</script>

<style lang="scss" scoped>
.card {
  width: 95%;
  margin: 0px auto;
  margin-top: 30px;
  padding-bottom: 20px;
}
</style>