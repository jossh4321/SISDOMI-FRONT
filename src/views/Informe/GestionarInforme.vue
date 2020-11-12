<template>
  <div>
    <v-card class="card">
      <v-card-title> Gestionar Informe </v-card-title>
      <v-data-table
        :headers="headers"
        :items="informes"
        :search="search"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Informes de las Usuarias CAR</v-toolbar-title>
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
                  <v-icon left>mdi-plus</v-icon>
                  <span>Registrar Informe</span>
                </v-btn>
              </template>
              <RegistrarInforme
                @close-dialog-save="closeDialogRegistrar()"
              ></RegistrarInforme>
            </v-dialog>
            <!---->
          </v-toolbar>
        </template>
      </v-data-table>
      <!----->
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import RegistrarInforme from "@/components/informes/RegistrarInforme.vue";
import { mapMutations, mapState } from "vuex";
export default {
  name: "GestionarInforme",
  components: {
    RegistrarInforme,
  },
  data() {
    return {
      search: "",
      informe: {},
      headers: [
        {
          text: "Código del Informe",
          align: "start",
          sortable: false,
          value: "codigodocumento",
        },
        { text: "Nombre del residente", value: "nombrecompleto" },
        { text: "Fecha de creación", value: "fechacreacion" },
        { text: "Tipo de Informe", value: "tipo" },
        { text: "Acciones", value: "actions", sortable: false },
      ],
      dialogoregistro: false,
      listaresidentes: [],
    };
  },
  async created() {
    this.obtenerInformes();
  },
  methods: {
    ...mapMutations(["setInformes"]),
    closeDialogRegistrar() {
      this.dialogoregistro = false;
    },
    async obtenerInformes() {
      await axios
        .get("/informe/all")
        .then((res) => {
          var info = {};
          info = res.data;
          for (var x=0;x<res.data.length;x++){
              info[x].fechacreacion = res.data[x].fechacreacion.split("T")[0];
              info[x].tipo = res.data[x].tipo.replace(/([a-z])([A-Z])/g, '$1 $2');
          }
          console.log(res.data[1].tipo);
          this.setInformes(info);
        })
        .catch((err) => console.log(err));
    },
  },
  computed: {
    ...mapState(["informes"]),
  },
};
</script>
<style scoped>
.card {
  margin: 20px;
}
</style>
