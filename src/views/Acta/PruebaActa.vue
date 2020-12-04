<template>
  <v-card elevation="3" outlined class="card">
    <v-card-title>Consulta de Expedientes Matriz</v-card-title>
    <v-card-subtitle>
      Visualice todos los expediente matriz de los residentes y realice la
      búsqueda mediante filtros
    </v-card-subtitle>
    <div>
      <v-data-table
        :headers="headers"
        :items="Actas"
        :items-per-page="itemsPerPage"
        :page.sync="page"
        @page-count="pageCount = $event"
        hide-default-footer
        loading-text="Cargando expedientes"
        no-data-text="No se ha registrado ningún expediente"
        no-results-text="No se ha encontrado ningún expediente"
        class="datatable"
        :loading="loading"
        :search="search"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Acta Externamiento</v-toolbar-title>
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
          </v-toolbar>
        </template>
        <template v-slot:[`item.fechacreacion`]="{ item }">
            {{ item.fechacreacion | moment("DD/MM/YYYY") }}
        </template>
        <template v-slot:[`item.actions`]="{ item }">
            <v-btn color="info" class="ml-3" @click="detailExpedient(item)">
                <v-icon left class="ml-auto ml-sm-0 mr-auto mr-sm-1">mdi-file-eye</v-icon>
                <span class="d-none d-sm-block">Detalle</span>
            </v-btn>
        </template>
      </v-data-table>
    </div>
    <div class="text-center pt-2">
        <v-pagination v-model="page" :length="pageCount"></v-pagination>
    </div>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  name: "app-gestion-expediente",
  data() {
    return {
      search: "",
      loading: false,
      headers: [
        {
          text: "Nombre Acta Externamiento",
          align: "start",
          sortable: false,
          value: "tipo",
        },
        {
          text: "Residente",
          value: "residente",
        },
        {
          text: "Fecha de creación",
          value: "fechacreacion",
        },
        {
          text: "Acciones",
          value: "actions",
          sortable: false,
          align: "center",
        },
      ],
      Actas: [],
      itemsPerPage: 5,
      page: 1,
      pageCount: 0,
    };
  },
  methods: {
      listActas() {
          axios.get("/actaexternamiento/all")
          .then(res => {
              this.Actas = res.data;
          })
          .catch(err => {
              console.error(err);
          });
      },
      detailExpedient(item) {
        this.$router.push("/dashboard/expediente/" + item.idResidente);    
      }
  },
  created() {
     this.listActas();
  }
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