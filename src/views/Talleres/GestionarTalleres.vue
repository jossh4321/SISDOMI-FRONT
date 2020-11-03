<template>
  <div>
    <v-card class="card">
      <v-card-title> Gestionar Talleres</v-card-title>
      <v-data-table
        :headers="headers"
        :items="talleres"
        :search="search"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Talleres actuales</v-toolbar-title>
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
            <v-dialog v-model="dialogoregistro" max-width="880px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="success"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                <v-icon left>mdi-account-multiple-plus-outline</v-icon>
                  <span>Registrar nuevo taller</span>
                </v-btn>
              </template>
                <RegistrarTaller></RegistrarTaller>
            </v-dialog>
          </v-toolbar>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-row align="center" justify="space-around">
            <v-btn color="warning" dark @click="editItem(item)">
              <v-icon left> mdi-pencil </v-icon>
              <span>Actualizar</span>
            </v-btn>

            <v-btn color="info" dark @click="detailItem(item)">
              <v-icon left> mdi-pencil </v-icon>
              <span>Visualizar</span>
            </v-btn>
          </v-row>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
<script>
import RegistrarTaller from '@/components/talleres/RegistrarTalleres.vue'
export default {
  name: "GestionarTalleres",
  components: {
     RegistrarTaller
  },
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Nombre Taller",
          align: "start",
          sortable: false,
          value: "nombre",
        },
        { text: "Usuaria", value: "usuaria" },
        { text: "Fecha registro", value: "fechaRegistro" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      talleres: [
        {
          nombre: "Taller_Edu_Xiomara_1",
          usuaria: "Xiomara Paredes Guerra",
          fechaRegistro: "15/09/2019"
        },
        {
          nombre: "Taller_Psico_Xiomara_1",
          usuaria: "Xiomara Paredes Guerra",
          fechaRegistro: "16/09/2019"
        },
        {
          nombre: "TallerI_Edu_Marlyn_1",
          usuaria: "Marlyn Albido Candela",
          fechaRegistro: "20/10/2019"
        }
      ],
      dialogoregistro: false,
    };
  },
  methods: {
    editItem(item) {
      console.log(item);
    },
    detailItem(item) {
      console.log(item);
    },
  },
};
</script>
<style scoped>
.card {
  margin: 20px;
}
</style>