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
              class="mr-10"
            ></v-text-field>
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
            <v-spacer></v-spacer>

            <!--modal seleccionar taller-->
            <v-dialog v-model="dialogRegister" persistent max-width="500">
              <v-card>
                <v-card-title>Selección del Taller</v-card-title>
                <v-card-subtitle class="mt-1"
                  >Seleccione el tipo del taller para el registro</v-card-subtitle
                >
                <v-card-text class="pr-2">
                  <v-combobox
                    filled
                    label="Tipo de taller"
                    :items="selectTallerRegister"
                    v-model="selectedTaller"
                    return-object
                  ></v-combobox>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn @click="dialogRegister = false" color="error">
                    <v-icon left class="mr-0 icon-plan">mdi-close</v-icon>
                    Cerrar
                  </v-btn>
                  <v-btn color="success" @click="selectedRegister">
                    <v-icon left class="mr-0 icon-plan">mdi-check</v-icon>
                    Registrar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <!--Registrar Modal-->
            <v-dialog v-model="dialogTallerRegister" persistent max-width="880">
              <component
                :is="selectedTaller.value"
                @close-dialog="closeDialog"
                @register-complete="registerComplete"
              ></component>
            </v-dialog>

            <!--Actualizar Modal-->
            <v-dialog v-model="dialogTallerModify" persistent max-width="880">
              <component
                :is="typeTallerSelected"
                :taller="taller"
                @close-dialog="closeDialogModify"
                @edit-complete="editComplete"
              ></component>
            </v-dialog>

          </v-toolbar>
        </template>
        <template v-slot:[`item.fechaCreacion`]="{ item }">
          {{ item.fechaCreacion | moment("DD/MM/YYYY") }}
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-row align="center" justify="space-around">
            <v-btn color="warning" dark @click="editItem(item)">
              <v-icon left> mdi-pencil </v-icon>
              <span>Actualizar</span>
            </v-btn>

            <v-btn color="info" dark @click="detailItem(item)">
              <v-icon left> mdi-file-eye </v-icon>
              <span>Visualizar</span>
            </v-btn>
          </v-row>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
<script>
import axios from "axios";
import RegistrarTallerEscuelaPadres from "@/components/talleres/escuelapadres/RegistrarTallerEscuelaPadres.vue";
import RegistrarTallerEducativo from "@/components/talleres/educativo/RegistrarTallerEducativo.vue";
import ActualizarTallerEscuelaPadres from "@/components/talleres/escuelapadres/ActualizarTallerEscuelaPadres.vue";
export default {
  name: "GestionarTalleres",
  components: {
     RegistrarTallerEscuelaPadres,
     ActualizarTallerEscuelaPadres,
     RegistrarTallerEducativo
  },
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Titulo Taller",
          align: "start",
          sortable: false,
          value: "titulo",
        },
        { text: "Tipo", value: "tipo" },
        { text: "Área", value: "area" },
        { text: "Fase", value: "fase" },
        { text: "Fecha registro", value: "fechaCreacion" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      talleres: [],
      selectTallerRegister: [
        {
          text: "Escuela para padres",
          value: "RegistrarTallerEscuelaPadres",
        },
        {
          text: "Educativa",
          value: "RegistrarTallerEducativo",
        },
        {
          text: "Formativo para Egreso",
          value: "RegistrarTallerFormativoEgreso",
        },
      ],
      selectedTaller: {
        text: "",
        value: "",
      },
      taller: {},
      typeTallerSelected: "",
      dialogRegister: false,
      dialogTallerRegister: false,
      dialogTallerModify: false,
    };
  },
  methods: {
    async editItem(item) {
      await axios
        .get("/Taller/" + item.id)
        .then((res) => {
          this.taller = res.data;

          if (res.data.tipo == "TallerEscuelaPadres") {
            this.typeTallerSelected = "ActualizarTallerEscuelaPadres";
            this.taller.contenido.fechainicio = res.data.contenido.fechainicio.split("T")[0];
            this.taller.contenido.fechafin = res.data.contenido.fechafin.split("T")[0];
          } else if (res.data.area == "social") {
            this.typeTallerSelected = "ModificarPlanIntervencionSocial";
          } else if (res.data.area == "psicologica") {
            this.typeTallerSelected = "ModificarPlanIntervencionPsicologico";
          }

          this.dialogTallerModify = true;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    detailItem(item) {
      console.log(item);
    },
    listTalleres() {
      axios
        .get("/Taller/all")
        .then((res) => {
          //this.loading = false;
          this.talleres = res.data;
          
        })
        .catch((err) => {
          console.error(err);
        });
    },
    selectedRegister() {
      this.dialogRegister = false;
      this.dialogTallerRegister = true;
    },
    closeDialog() {
      this.dialogTallerRegister = false;
      this.selectedTaller = {
          text: "",
          value: "",
      };
    },
    registerComplete() {
      this.closeDialog();
      this.loading = true;
      this.listTalleres();
    },
    editComplete() {
      this.closeDialogModify();
      this.loading = true;
      this.listTalleres();
    },
    closeDialogModify() {
      this.dialogTallerModify = false;
      this.typeTallerSelected = "";
    },
  },
  created() {
    this.listTalleres();
  }
};
</script>
<style scoped>
.card {
  margin: 20px;
}
</style>