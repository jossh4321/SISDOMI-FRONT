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
                  <span>Usuario</span>
                </v-btn>
              </template>
                <RegistrarUsuario></RegistrarUsuario>
            </v-dialog>
          </v-toolbar>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-row align="center" justify="space-around">
            <v-btn color="warning" dark @click="editItem(item)">
              <v-icon left> mdi-pencil </v-icon>
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
    </v-card>
  </div>
</template>
<script>

import RegistrarUsuario from '@/components/usuarios/ResgistrarUsuario.vue'
export default {
  name: "GestionarUsuario",
  components: {
    RegistrarUsuario
  },
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Nombre de Usuario",
          align: "start",
          sortable: false,
          value: "nombre",
        },
        { text: "area", value: "area" },
        { text: "rol", value: "rol" },
        { text: "estado", value: "estado" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      usuarios: [
        {
          nombre: "josue1234",
          area: "psicologica",
          rol: "director",
          estado: "activo",
        },
        {
          nombre: "piero1234",
          area: "educativa",
          rol: "director",
          estado: "activo",
        },
        {
          nombre: "anderley1234",
          area: "social",
          rol: "director",
          estado: "activo",
        },
        {
          nombre: "sebas1234",
          area: "medica",
          rol: "director",
          estado: "activo",
        },
        {
          nombre: "paredes1234",
          area: "nutricional",
          rol: "director",
          estado: "inactivo",
        },
      ],
      dialogoregistro: false,
    };
  },
  methods: {
    editItem(item) {
      console.log(item);
    },
    deleteItem(item) {
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