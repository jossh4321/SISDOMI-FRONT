<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="incidencias"
      item-key="id"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      hide-default-footer
      @page-count="pageCount = $event"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Gestion de Incidencias</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
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
          <v-spacer></v-spacer>
          <v-dialog
            v-model="dialogoRegistrarIncidencia"
            max-width="650px"
            persistent
          >
            <template v-slot:activator="{ on, attrs }">
              
              <v-btn color="success" dark class="mb-2" v-bind="attrs" v-on="on">
                <v-icon left> mdi-folder-plus-outline </v-icon>
                <span>Nueva Incidencia</span>
              </v-btn>
            </template>
            <v-card>
              <RegistrarIncidencia
                @close-dialog-save-incidencia="closeDialogRegistrar()"
              ></RegistrarIncidencia>
            </v-card>
          </v-dialog>
          <!---->
        </v-toolbar>
      </template>
      <template v-slot:[`item.autor`]="{ item }">
        {{
          item.autor.datos.nombre | getNombreUsuario(item.autor.datos.apellido)
        }}
      </template>
      <template v-slot:[`item.fecha`]="{ item }">
        <v-chip color="success" dark>
          {{ item.fecha | fomatoFecha }}
        </v-chip>
      </template>
      <template v-slot:[`item.residentes`]="{ item }">
        <v-chip color="success" dark>
          {{ item.residentes | numResidentes }}
        </v-chip>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn
          elevation="2"
          rounded
          color="info"
          class="ma-2"
          @click="consultarIncidencia(item.id)"
        >
          <v-icon left> mdi-eye </v-icon>
          <span>Ver</span>
        </v-btn>
        <v-btn
          color="warning"
          elevation="2"
          rounded
          class="ma-2"
          @click="modificarIncidencia(item.id)"
        >
          <v-icon left> mdi-pencil </v-icon>
          <span>Editar</span>
        </v-btn>
      </template>
    </v-data-table>
    <!--PAGINACION EXTERNA-->
    <div class="text-center pt-2">
      <v-pagination v-model="page" :length="pageCount"></v-pagination>
    </div>
    <!---->
    <!--DIALOGO DE CONSULTA DE INCIDENCIA-->
    <v-dialog v-model="dialogoConsultarIncidencia" persistent max-width="650px">
      <v-card>
        <ConsultarIncidencia
          ref="consultarIncidencia"
          @close-dialog-edit-incidencia="closeDialogConsultar"
          :incidencia="incidencia"
        ></ConsultarIncidencia>
      </v-card>
    </v-dialog>
    <!---->
    <!--DIALOGO DE MODIFICACION DE INCIDENCIA-->
    <v-dialog v-model="dialogoModificarIncidencia" persistent max-width="650px">
      <v-card>
        <ModificarIncidencia
          ref="modificarIncidencia"
          @close-dialog-edit-incidencia="closeDialogModificar"
          :incidencia="incidencia"
          :listResidentesSelected="listResidentesSelected"
        ></ModificarIncidencia>
      </v-card>
    </v-dialog>
    <!---->
  </div>
</template>
<script>
import axios from "axios";
import RegistrarIncidencia from "@/components/incidencias/RegistrarIncidencia.vue";
import ModificarIncidencia from "@/components/incidencias/ModificarIncidencia.vue";
import ConsultarIncidencia from "@/components/incidencias/ConsultarIncidencia.vue";
//import ConsultarIncidencia from '@/components/incidencias/ConsultarIncidencia.vue'
import moment from "moment";
import { mapState, mapMutations } from "vuex";
moment.locale("es");
export default {
  name: "GestionarIncidencia",
  data() {
    return {
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      dialogoConsultarIncidencia: false,
      dialogoModificarIncidencia: false,
      dialogoRegistrarIncidencia: false,
      headers: [
        {
          text: "Titulo",
          align: "start",
          sortable: true,
          value: "titulo",
        },
        { text: "Fecha/Hora", value: "fecha" },
        { text: "Responsable", value: "autor" },
        { text: "N° Involucrados", value: "residentes" },
        { text: "Opciones", value: "actions", sortable: false },
      ],
      listResidentesSelected: [],
      incidencia: {},
      fromDate: null,
      toDate: null,
      dates: [],
      modal: false,
      campo: false
    };
  },
  async created() {
    this.obtenerIncidencias();
  },
  components: {
    RegistrarIncidencia,
    ModificarIncidencia,
    ConsultarIncidencia,
  },
  methods: {
    ...mapMutations(["setIncidencias"]),
    async obtenerIncidencias() {
      let listParams = [];

      let fromDateParam =
        this.fromDate == null ? "" : "FromDate=" + this.fromDate;
      let toDateParam = this.toDate == null ? "" : "ToDate=" + this.toDate;

      if (fromDateParam != "") {
        listParams.push(fromDateParam);
      }

      if (toDateParam != "") {
        listParams.push(toDateParam);
      }

      let params = listParams.join("&");

      await axios
        .get("/incidencia/all/detalle?" + params)
        .then((res) => {
          this.setIncidencias(res.data);
        })
        .catch((error) => console.error(error));
    },
    async loadIncidenciaDetalle(id) {
      await axios
        .get(`/incidencia/detalle/${id}`)
        .then((res) => {
          this.incidencia = res.data;
          var fecha = moment(res.data.fecha);
          this.incidencia.fecha = fecha.format("YYYY-MM-DD");
          this.incidencia.hora = fecha.format("HH:mm");
        })
        .catch((err) => console.error());
    },
    async consultarIncidencia(id) {
      await this.loadIncidenciaDetalle(id);
      /*this.incidencia.residentes = this.incidencia.residentes
                      .map((res)=> {return this.convertItemToResidente(res)});*/
      this.dialogoConsultarIncidencia = !this.dialogoConsultarIncidencia;
      if (this.$refs.consultarIncidencia != undefined) {
        this.$refs.consultarIncidencia.mounteddropzone();
      }
    },
    async modificarIncidencia(id) {
      await this.loadIncidenciaDetalle(id);
      this.listResidentesSelected = this.incidencia.residentes.map((res) => {
        return this.convertItemToResidente(res);
      });
      this.incidencia.residentes = this.incidencia.residentes.map((res) => {
        return res.id;
      });
      this.dialogoModificarIncidencia = !this.dialogoModificarIncidencia;
      if (this.$refs.modificarIncidencia != undefined) {
        console.log(this.$refs.modificarIncidencia);
        this.$refs.modificarIncidencia.mounteddropzone();
        this.$refs.modificarIncidencia.imagenFirma = {
          urlOrigen: this.incidencia.firma.urlfirma,
          modificar: { estado: false, file: {} },
        };
      }
    },
    closeDialogConsultar() {
      this.dialogoConsultarIncidencia = !this.dialogoConsultarIncidencia;
    },
    closeDialogRegistrar() {
      this.dialogoRegistrarIncidencia = !this.dialogoRegistrarIncidencia;
    },
    closeDialogModificar() {
      this.dialogoModificarIncidencia = !this.dialogoModificarIncidencia;
    },
    convertItemToResidente(item) {
      return {
        residente: item.nombre + " " + item.apellido,
        id: item.id,
        numeroDocumento: item.numeroDocumento,
      };
    },
     cargarDocumentosRango(dates) {
      this.dates = dates.sort();          
      this.fromDate = this.formatDate(dates[0]);
      this.toDate = this.formatDate(dates[1]);      
      this.obtenerIncidencias();      
      this.modal = false;
    },
    formatDate (date) {
        if (!date) return null;
        const [year, month, day] = date.split('-')
        return `${month}-${day}-${year}`
    },
  },
  computed: {
    ...mapState(["incidencias"]),
  },
  filters: {
    numResidentes: (residentes) => {
      return residentes.length + " Residentes";
    },
    fomatoFecha: (fecha) => {
      var formato = moment(fecha);
      return formato.format("llll");
    },
    getNombreUsuario: (nombre, apellido) => {
      return `${nombre} ${apellido}`;
    },
     dateRangeText() {
      return this.dates.join(" ~ ");
    },
  },
};
</script>