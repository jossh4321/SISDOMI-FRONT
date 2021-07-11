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
            <v-col cols="12" sm="6" md="4">
              <v-dialog ref="dialog" v-model="modal" persistent width="290px">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="dates"
                    label="Rango de fechas"
                    prepend-icon="mdi-calendar"
                    readonly
                    single-line
                    v-bind="attrs"
                    v-on="on"
                    hide-details
                  ></v-text-field>
                </template>
                <v-date-picker v-model="dates" locale="es-es" range scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="modal = false">
                    Cancel
                  </v-btn>
                  <v-btn text color="primary" @click="cargarDocumentosRango(dates)">
                    OK
                  </v-btn>
                </v-date-picker>
              </v-dialog>
            </v-col>
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
            @click="updatePlanIntervencion(item)"
            v-if="item.estado != 'inactivo'"
          >
            <v-icon left class="ml-auto ml-sm-0 mr-auto mr-sm-1"
              >mdi-pencil</v-icon
            >
            <span class="d-none d-sm-block">Actualizar</span>
          </v-btn>
          <v-btn
            color="info"
            class="ml-3"
            @click="detailPlanIntervencion(item)"
          >
            <v-icon left class="ml-auto ml-sm-0 mr-auto mr-sm-1"
              >mdi-file-eye</v-icon
            >
            <span class="d-none d-sm-block">Detalle</span>
          </v-btn>
          <v-btn
            color="error"
            class="ml-3"
            @click="deletePlanIntervencion(item)"
            v-if="item.estado != 'inactivo'"
          >
            <v-icon left class="ml-auto ml-sm-0 mr-auto mr-sm-1"
              >mdi-delete</v-icon
            >
            <span class="d-none d-sm-block">Desactivar</span>
          </v-btn>
          <v-btn
            color="success"
            class="ml-3"
            v-if="item.estado == 'inactivo'"
            @click="activatePlanIntervencion(item)"
          >
            <v-icon left class="ml-auto ml-sm-0 mr-auto mr-sm-1">
              mdi-check
            </v-icon>
            <span class="d-none d-sm-block">Activar</span>
          </v-btn>
        </template>
      </v-data-table>
      <div class="text-center pt-2">
        <v-pagination v-model="page" :length="pageCount"></v-pagination>
      </div>
    </div>

    <!-- Modal para seleccionar el tipo de plan -->
    <v-dialog v-model="dialogRegister" persistent max-width="500">
      <v-card>
        <v-card-title>Selección del Plan</v-card-title>
        <v-card-subtitle class="mt-1"
          >Seleccione el tipo del plan para el registro</v-card-subtitle
        >
        <v-card-text class="pr-2">
          <v-combobox
            filled
            label="Tipo de plan"
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
      <component
        :is="selectedPlan.value"
        @close-dialog="closeDialog"
        @register-complete="registerComplete"
      ></component>
    </v-dialog>

    <!--Actualizar Modal-->
    <v-dialog v-model="dialogPlanModify" persistent max-width="880">
      <component
        :is="typePlanSelected"
        :planI="planI"
        @close-dialog="closeDialogModify"
        @edit-complete="editComplete"
      ></component>
    </v-dialog>

    <!--Visualizar Model-->
    <v-dialog v-model="dialogoPlanDetail" persistent max-width="880">
      <component
        :is="typeDetailPlanSelected"
        :planIntervencion="planIntervencionDetail"
        @close-dialog-detail="closeDialogDetail"
      >
      </component>
    </v-dialog>

    <!--Prevenir Activación o Desactivación -->
    <v-dialog v-model="dialogoPlanState" persistent max-width="450">
      <v-card>
        <v-card-title :class="[planStateCss, 'white--text']">{{
          messagesState.title
        }}</v-card-title>
        <v-card-text class="mt-2">
          <h3>{{ messagesState.text }}</h3>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="secondary mr-1" @click="dialogoPlanState = false">
            <v-icon left>mdi-close</v-icon>
            <span>Cerrar</span>
          </v-btn>
          <v-btn
            class="success"
            v-if="messagesState.action == 'activo'"
            @click="updateState"
          >
            <v-icon left>mdi-check</v-icon>
            <span>Activar</span>
          </v-btn>
          <v-btn class="primary" v-else @click="updateState">
            <v-icon left>mdi-delete</v-icon>
            <span>Inactivar</span>
          </v-btn>
        </v-card-actions>
      </v-card>
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
import VisualizarPlanIntervencion from "@/components/planIntervencion/Educativo/VisualizarPlanIntervencion.vue";
import VisualizarPlanIntervencionPsicologico from "@/components/planIntervencion/Psicologico/VisualizarPlanIntervencionPsicologico.vue";
import VisualizarPlanIntervencionSocial from "@/components/planIntervencion/Social/VisualizarPlanIntervencionSocial.vue";
import ModificarPlanIntervencionPsicologico from "@/components/planIntervencion/Psicologico/ModificarPlanIntervencionPsicologico.vue";

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
      typeDetailPlanSelected: "",
      page: 1,
      pageCount: 0,
      itemsPerPage: 5,
      dialogRegister: false,
      dialogPlanRegister: false,
      dialogPlanModify: false,
      dialogoPlanDetail: false,
      dialogoPlanState: false,
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
      planIntervencionDetail: {},
      messagesState: {
        title: "",
        subtitle: "",
        text: "",
        action: "",
      },
      idPlanUpdatedState: "",
      fromDate: null,
      toDate: null,
      dates: [],
      modal: false,
    };
  },
  methods: {
    async detailPlanIntervencion(item) {
      await axios
        .get("/PlanIntervencion/" + item.id)
        .then((res) => {
          this.planIntervencionDetail = res.data;

          if (res.data.area == "educativa") {
            this.typeDetailPlanSelected = "VisualizarPlanIntervencion";
          } else if (res.data.area == "psicologica") {
            this.typeDetailPlanSelected =
              "VisualizarPlanIntervencionPsicologico";
          } else if (res.data.area == "social") {
            this.typeDetailPlanSelected = "VisualizarPlanIntervencionSocial";
          }

          this.dialogoPlanDetail = true;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    async updatePlanIntervencion(item) {
      await axios
        .get("/PlanIntervencion/" + item.id)
        .then((res) => {
          this.planI = res.data;

          if (res.data.area == "educativa") {
            this.typePlanSelected = "ModificarPlanIntervencion";
          } else if (res.data.area == "social") {
            this.typePlanSelected = "ModificarPlanIntervencionSocial";
          } else if (res.data.area == "psicologica") {
            this.typePlanSelected = "ModificarPlanIntervencionPsicologico";
          }

          this.dialogPlanModify = true;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    deletePlanIntervencion(item) {
      this.messagesState.title = "Desactivación del plan de intervención";
      this.messagesState.text =
        "Se va a realizar la desactivación del plan de intervención. ¿Esta seguro de desactivar el plan de intervención?";
      this.messagesState.action = "inactivo";

      this.dialogoPlanState = true;
      this.idPlanUpdatedState = item.id;
    },
    activatePlanIntervencion(item) {
      this.messagesState.title = "Activación del plan de intervención";
      this.messagesState.text =
        "Se va a realizar la activación del plan de intervención. ¿Esta seguro de activar el plan de intervención?";
      this.messagesState.action = "activo";

      this.dialogoPlanState = true;
      this.idPlanUpdatedState = item.id;
    },
    async updateState() {
      let planState = {
        idDocumento: this.idPlanUpdatedState,
        estado: this.messagesState.action,
      };

      await axios
        .put("/PlanIntervencion/state", planState)
        .then((res) => {
          let title =
            planState.estado == "activo"
              ? "Activacion del plan de Intervención"
              : "Desactivación del plan de Intervención";

          let text =
            planState.estado == "activo"
              ? "Se activo el plan de intervención de manera satisfactoria"
              : "Se desactivo el plan de intervención de manera satisfactoria";

          this.messageSweetUpdated("success", title, text);
        })
        .catch((err) => {
          console.error(err);
        });

      this.loading = true;
      this.listInterventionsPlan();
    },
    selectedRegister() {
      this.dialogRegister = false;
      this.dialogPlanRegister = true;
    },
    closeDialog() {
      this.dialogPlanRegister = false;
      this.selectedPlan = {
        text: "",
        value: "",
      };
    },
    registerComplete() {
      this.closeDialog();
      this.loading = true;
      this.listInterventionsPlan();
    },
    editComplete() {
      this.closeDialogModify();
      this.loading = true;
      this.listInterventionsPlan();
    },
    closeDialogModify() {
      this.dialogPlanModify = false;
      this.typePlanSelected = "";
    },
    closeDialogDetail() {
      this.dialogoPlanDetail = false;
      this.typeDetailPlanSelected = "";
    },
    messageSweetUpdated(icon, title, text) {
      this.$swal({
        icon: "success",
        title: title,
        text: text,
      }).then((res) => {
        this.dialogoPlanState = false;
      });
    },
    listInterventionsPlan() {

      let listParams = [];
      
      let fromDateParam = this.fromDate == null ? "": "FromDate=" + this.fromDate;
      let toDateParam = this.toDate == null ? "": "ToDate=" + this.toDate;

      if(fromDateParam != "") {

        listParams.push(fromDateParam);

      }
      
      if(toDateParam != "") {

        listParams.push(toDateParam);

      }

      let params = listParams.join("&");
 
      console.log(params);

      axios
        .get("/PlanIntervencion/all?" + params)
        .then((res) => {
          this.loading = false;
          this.planesIntervencion = res.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },    
    cargarDocumentosRango(dates) {
      this.dates = dates.sort();          
      this.fromDate = this.formatDate(dates[0]);
      this.toDate = this.formatDate(dates[1]);      
      this.listInterventionsPlan();      
      this.modal = false;
    },
    formatDate (date) {
        if (!date) return null;
        const [year, month, day] = date.split('-')
        return `${month}-${day}-${year}`
    },
  },
  computed: {
    planStateCss() {
      return this.messagesState.action == "inactivo" ? "error" : "green";
    },
     dateRangeText() {
      return this.dates.join(" ~ ");
    },
  },
  created() {
    this.listInterventionsPlan();
  },
  components: {
    RegistrarPlanIntervencion,
    ModificarPlanIntervencion,
    RegistrarPlanIntervencionPsicologico,
    RegistrarPlanIntervencionSocial,
    ModificarPlanIntervencionSocial,
    VisualizarPlanIntervencion,
    VisualizarPlanIntervencionPsicologico,
    VisualizarPlanIntervencionSocial,
    ModificarPlanIntervencionPsicologico,
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