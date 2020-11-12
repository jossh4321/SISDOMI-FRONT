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
        loading-text="Cargando planes"
        @page-count="pageCount = $event"
        no-data-text="No se ha registrado ningún plan de intervención"
        no-results-text="No se ha encontrado ningún plan de intervención"
        class="datatable"
        :loading="loading"
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
          <v-btn color="warning" @click="UpdatePlanIntervencion(item)">
            <v-icon left class="ml-auto ml-sm-0 mr-auto mr-sm-1"
              >mdi-pencil</v-icon
            >
            <span class="d-none d-sm-block">Actualizar</span>
          </v-btn>
          <v-btn
            color="info"
            class="ml-3"
            @click="DetailPlanIntervencion(item)"
          >
            <v-icon left class="ml-auto ml-sm-0 mr-auto mr-sm-1"
              >mdi-file-eye</v-icon
            >
            <span class="d-none d-sm-block">Detalle</span>
          </v-btn>
          <v-btn
            color="error"
            class="ml-3"
            @click="DeletePlanIntervencion(item)"
          >
            <v-icon left class="ml-auto ml-sm-0 mr-auto mr-sm-1"
              >mdi-delete</v-icon
            >
            <span class="d-none d-sm-block">Desactivar</span>
          </v-btn>
        </template>
      </v-data-table>
      <div class="text-center pt-2">
        <v-pagination v-model="page" :length="pageCount"></v-pagination>
      </div>
    </div>

    <!-- Modal para seleccionar el tipo de informe -->
    <v-dialog v-model="dialogRegister" persistent max-width="500">
      <v-card>
        <v-card-title>Selección del Informe</v-card-title>
        <v-card-subtitle class="mt-1"
          >Seleeccione el tipo de informe para el registro</v-card-subtitle
        >
        <v-card-text class="pr-2">
          <v-combobox
            filled
            label="Tipo de informe"
            :items="selectPlanRegister"
            v-model="selectedPlan"
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
    <v-dialog v-model="dialogPlanRegister" persistent max-width="880">
      <component :is="selectedPlan.value" @close-dialog="closeDialog" @register-complete="registerComplete"></component>
    </v-dialog>

    <!--Actualizar Modal-->
    <v-dialog v-model="dialogPlanModify" persistent max-width="880">
      <component
        :is="typePlanSelected"
        :planI="planI"
        @close-dialog="closeDialogModify"
      ></component>
    </v-dialog>
  </v-card>
</template>

<script>
import axios from "axios";
import RegistrarPlanIntervencion from "@/components/planIntervencion/Educativo/RegistrarPlanIntervencion.vue";
import ModificarPlanIntervencion from "@/components/planIntervencion/Educativo/ModificarPlanIntervencion.vue";
import RegistrarPlanIntervencionPsicologico from "@/components/planIntervencion/Psicologico/RegistrarPlanIntervencionPsicologico.vue";
import RegistrarPlanIntervencionSocial from "@/components/planIntervencion/Social/RegistrarPlanIntervencionSocial.vue";
import ModificarPlanIntervencionSocial from "@/components/planIntervencion/Social/ModificarPlanIntervencionSocial.vue";

export default {
  name: "app-gestion-planes",
  data() {
    return {
      search: "",
      selectPlanRegister: [
        {
          text: "Educativa",
          value: "RegistrarPlanIntervencion",
        },
        {
          text: "Psicológica",
          value: "RegistrarPlanIntervencionPsicologico",
        },
        {
          text: "Social",
          value: "RegistrarPlanIntervencionSocial",
        },
      ],
      selectedPlan: {
        text: "",
        value: "",
      },
      typePlanSelected: "",
      page: 1,
      pageCount: 0,
      itemsPerPage: 5,
      dialogRegister: false,
      dialogPlanRegister: false,
      dialogPlanModify: false,
      loading: true,
      headers: [
        {
          text: "Título del Plan de Intervención",
          align: "start",
          sortable: false,
          value: "titulo",
        },
        {
          text: "Residente",
          value: "residente",
        },
        {
          text: "Fecha de registro",
          value: "fechacreacion",
        },
        {
          text: "Área",
          value: "area",
        },
        {
          text: "Acciones",
          value: "actions",
          sortable: false,
          align: "center",
        },
      ],
      planesIntervencion: [],
      planI: {},
    };
  },
  methods: {
    DetailPlanIntervencion(item) {},
    async UpdatePlanIntervencion(item) {
      if (item.area == "educativa") {
        this.typePlanSelected = "ModificarPlanIntervencion";
        await axios
        .get("/PlanIntervencion/educativobyid?id=" + item.id)
        .then((x) => {
          this.planI = x.data;
        })
        .catch((err) => console.log(err));
      } else if (item.area == "social") {
        this.typePlanSelected = "ModificarPlanIntervencionSocial";
        await axios
        .get("/PlanIntervencion/socialbyid?id=" + item.id)
        .then((x) => {
          this.planI = x.data;
        })
        .catch((err) => console.log(err));
      } else {
        this.typePlanSelected = "ModificarPlanIntervencionPsicologico";
        
      }
      this.dialogPlanModify = true;
    },
    DeletePlanIntervencion(item) {},
    selectedRegister() {
      this.dialogRegister = false;
      this.dialogPlanRegister = true;
    },
    closeDialog() {
      this.dialogPlanRegister = false;
      this.selectedPlan = {
        text: "",
        value: ""
      }
    },
    registerComplete() {
      this.closeDialog();

    },
    closeDialogModify() {
      this.dialogPlanModify = false;
      this.typePlanSelected = "";
    },
  },
  computed: {},
  created() {
    axios
      .get("/PlanIntervencionSocial/all")
      .then((res) => {
        this.loading = false;
        this.planesIntervencion = res.data;
      })
      .catch((err) => {
        console.error(err);
      });
  },
  components: {
    RegistrarPlanIntervencion,
    ModificarPlanIntervencion,
    RegistrarPlanIntervencionPsicologico,
    RegistrarPlanIntervencionSocial,
    ModificarPlanIntervencionSocial
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