<template>
  <div>
    <v-card class="card">
      <v-card-title> Gestionar Ficha Ingreso </v-card-title>
      <v-data-table
        :headers="headers"
        :items="fichaingreso"
        :search="search"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Fichas de Ingreso SISDOMI</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>

            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Buscar"
              single-line
              hide-details
            ></v-text-field>
            <!-- :return-value.sync="dates" -->
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
            <!-- Dialogo de Registro-->
            <v-dialog v-model="dialogDialogNuevaFichaIngreso" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="success"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon left>mdi-plus</v-icon>
                  <span>Registrar Ficha Ingreso</span>
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="justify-center"
                  >Nueva Ficha de Ingreso</v-card-title
                >
                <div class="container-user">
                  <v-card-text>
                    <v-select
                      :items="items"
                      :item-value="items.value"
                      v-model="selectorFichaIngreso"
                      label="Seleccione la Ficha de Ingreso"
                      outlined
                      dense
                    ></v-select>

                    <v-row>
                      <v-col>
                        <v-btn
                          block
                          @click="cerrarDialogoSeleccion()"
                          color="primary"
                        >
                          <v-icon left>mdi-close-outline</v-icon>
                          <span>Cerrar</span>
                        </v-btn>
                      </v-col>
                      <v-col>
                        <v-btn
                          block
                          @click="abrirDialogoRegistroFichaIngreso()"
                          color="success"
                        >
                          <v-icon left>mdi-page-next-outline</v-icon>
                          <span>Continuar</span>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </div>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:[`item.fechacreacion`]="{ item }">
          {{ item.fechacreacion | moment("DD/MM/YYYY") }}
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-row align="center" justify="space-around">
            <v-btn color="warning" dark @click="abrirDialogoModificar(item)">
              <v-icon left> mdi-pencil</v-icon>
              <span>Actualizar</span>
            </v-btn>
            <v-btn color="info" dark @click="abrirDialogoConsultar(item)">
              <v-icon left> mdi-file-eye </v-icon>
              <span>Consultar</span>
            </v-btn>
          </v-row>
        </template>
      </v-data-table>
      <!--Dialogo de Registro de Fichas de Ingreso-->
      <v-dialog
        v-model="dialogoRegistroFichaIngreso"
        persistent
        max-width="850px"
      >
        <v-component
          :is="selectorFichaIngreso"
          :listaresidentes="listaresidentes"
          :listaeducadores="listaeducadores"
          @cerrar-modal-registro-ficha-ingreso="
            cerrarDialogoRegistroFichaIngreso
          "
        >
        </v-component>
      </v-dialog>
      <!--Dialogo de Modificar-->
      <v-dialog
        v-model="dialogoModificacionFichaIngreso"
        persistent
        max-width="850px"
      >
        <v-component
          :is="selectorFichaIngreso"
          :listaresidentes="listaresidentes"
          :listaeducadores="listaeducadores"
          :fichaIngreso="fichaIngreso"
          ref="modificarFichaIngreso"
          @cerrar-modal-edicion-ficha-ingreso="
            cerrarDialogoModificacionFichaIngreso
          "
        >
        </v-component>
      </v-dialog>
      <!--Dialogo de Consultar-->
      <v-dialog
        v-model="dialogoConsultaFichaIngreso"
        persistent
        max-width="850px"
      >
        <v-component
          :is="selectorFichaIngreso"
          ref="consultarFichaIngreso"
          :fichaIngreso="fichaIngreso"
          :listaresidentes="listaresidentes"
          :listaeducadores="listaeducadores"
          @cerrar-modal-detalle-ficha-ingreso="
            cerrarDialogoConsultarFichaIngreso
          "
        >
        </v-component>
      </v-dialog>
    </v-card>
  </div>
</template>
<script>
import axios from "axios";
import SeleccionarFichaIngreso from "@/components/fichaIngreso/SeleccionarFichaIngreso.vue";
import RegistrarFichaIngresoEducativa from "@/components/fichaIngreso/RegistrarFichaIngresoEducativa.vue";
import RegistrarFichaIngresoPsicologica from "@/components/fichaIngreso/Psicologica/RegistrarFichaIngresoPsicologica.vue";
import RegistrarFichaIngresoSocial from "@/components/fichaIngreso/Social/RegistrarFichaIngresoSocial.vue";
import ModificarFichaIngresoEducativa from "@/components/fichaIngreso/ModificarFichaIngresoEducativa.vue";
import ModificarFichaIngresoSocial from "@/components/fichaIngreso/Social/ModificarFichaIngresoSocial.vue";
import ModificarFichaIngresoPsicologica from "@/components/fichaIngreso/Psicologica/ModificarFichaIngresoPsicologica.vue";
import ConsultarFichaIngresoEducativa from "@/components/fichaIngreso/ConsultarFichaIngresoEducativa.vue";
import ConsultarFichaIngresoPsicologica from "@/components/fichaIngreso/Psicologica/ConsultarFichaIngresoPsicologica.vue";
import ConsultarFichaIngresoSocial from "@/components/fichaIngreso/Social/ConsultarFichaIngresoSocial.vue";

import { mapMutations, mapState } from "vuex";
export default {
  name: "GestionarFicha",
  components: {
    RegistrarFichaIngresoEducativa,
    RegistrarFichaIngresoPsicologica,
    RegistrarFichaIngresoSocial,
    ModificarFichaIngresoEducativa,
    ModificarFichaIngresoSocial,
    ModificarFichaIngresoPsicologica,
    ConsultarFichaIngresoEducativa,
    ConsultarFichaIngresoSocial,
    ConsultarFichaIngresoPsicologica,
  },
  data() {
    return {
      search: "",            
      residente: {},
      selectorFichaIngreso: "",
      items: [
        {
          value: "RegistrarFichaIngresoSocial",
          text: "Ficha de Ingreso Social",
        },
        {
          value: "RegistrarFichaIngresoEducativa",
          text: "Ficha de Ingreso Educativa",
        },
        {
          value: "RegistrarFichaIngresoPsicologica",
          text: "Ficha de Ingreso Psicologica",
        },
      ],
      headers: [
        {
          text: "Codigo de la Ficha ",
          align: "start",
          sortable: false,
          value: "codigodocumento",
        },
        { text: "Residente", value: "residenteresultado" },
        { text: "Fecha Creacion", value: "fechacreacion" },
        { text: "Area", value: "area" },
        { text: "Aciones", value: "actions", sortable: false },
      ],
      SeleccionarFichaIngreso: false,
      fichaIngreso: "",
      dialogDialogNuevaFichaIngreso: false,
      listaresidentes: [],
      listaeducadores: [],
      dialogoRegistroFichaIngreso: false,
      dialogoModificacionFichaIngreso: false,
      dialogoConsultaFichaIngreso: false,
      documentoFase: {
        fase: "1",
        area: "educativa",
        documentoanterior: "FichaEducativaIngreso",
        documentoactual: "FichaEducativaIngreso",
        estadodocumentoanterior: "Pendiente",
      },
      documentoSocialFase: {
        fase: "1",
        area: "social",
        documentoanterior: "FichaSocialIngreso",
        documentoactual: "FichaSocialIngreso",
        estadodocumentoanterior: "Pendiente",
      },
      documentoPsicoFase: {
        fase: "1",
        area: "psicologica",
        documentoanterior: "FichaPsicologicaIngreso",
        documentoactual: "FichaPsicologicaIngreso",
        estadodocumentoanterior: "Pendiente",
      },
      fromDate: null,
      toDate: null,
      dates: [],
      modal: false,
    };
  },
  async created() {
    this.obtenerfichasIngresos();
    //this.obtenerResidentes();
    //this.obtenerEducadores();
  },

  methods: {
    ...mapMutations(["setFichaIngreso"]),
    async abrirDialogoModificar(item) {
      console.log(item);
      await this.obtenerResidentesModificacion();
      await this.obtenerfichaIngreso(item.id);
      if (item.tipo == "FichaEducativaIngreso") {
        this.selectorFichaIngreso = "ModificarFichaIngresoEducativa";
      } else if (item.tipo == "FichaSocialIngreso") {
        this.selectorFichaIngreso = "ModificarFichaIngresoSocial";
      } else if (item.tipo == "FichaPsicologicaIngreso") {
        this.selectorFichaIngreso = "ModificarFichaIngresoPsicologica";
      }
      this.dialogoModificacionFichaIngreso = true;
    },
    async abrirDialogoConsultar(item) {
      await this.obtenerfichaIngresoDetalle(item.id);
      if (item.tipo == "FichaEducativaIngreso") {
        this.selectorFichaIngreso = "ConsultarFichaIngresoEducativa";
      } else if (item.tipo == "FichaSocialIngreso") {
        this.selectorFichaIngreso = "ConsultarFichaIngresoSocial";
      } else if (item.tipo == "FichaPsicologicaIngreso") {
        this.selectorFichaIngreso = "ConsultarFichaIngresoPsicologica";
      }
      this.dialogoConsultaFichaIngreso = true;
    },
    closeDialogDetalle() {
      this.dialogoFIEconsultar = false;
      this.dialogoFIPconsultar = false;
      this.dialogoFISconsultar = false;
    },
    closeDialogActualizar() {
      this.dialogoaFIEctualizacion = false;
      this.dialogoaFISctualizacion = false;
      this.dialogoaFIPctualizacion = false;
    },
    async abrirDialogoRegistroFichaIngreso() {
      if (this.selectorFichaIngreso == "RegistrarFichaIngresoEducativa") {
        await this.obtenerResidentes();
      } else if (this.selectorFichaIngreso == "RegistrarFichaIngresoSocial") {
        await this.obtenerResidentesSocial();
      } else if (
        this.selectorFichaIngreso == "RegistrarFichaIngresoPsicologica"
      ) {
        await this.obtenerResidentesPsico();
      }
      await this.obtenerEducadores();
      this.dialogoRegistroFichaIngreso = true;
    },
    cerrarDialogoSeleccion() {
      this.dialogDialogNuevaFichaIngreso = false;
      this.selectorFichaIngreso = "";
    },

    cerrarDialogoRegistroFichaIngreso() {
      this.dialogDialogNuevaFichaIngreso = false;
      this.dialogoRegistroFichaIngreso = false;
      this.selectorFichaIngreso = "";
    },
    cerrarDialogoModificacionFichaIngreso() {
      this.dialogoModificacionFichaIngreso = false;
      this.selectorFichaIngreso = "";
    },
    cerrarDialogoConsultarFichaIngreso() {
      this.dialogoConsultaFichaIngreso = false;
      this.selectorFichaIngreso = "";
    },
    //Obtener Detalle de Ficha Ingreso
    async obtenerfichaIngresoDetalle(id) {
      await axios
        .get(`/Documento/fichaingreso/detalle/${id}`)
        .then((res) => {
          //console.log( "porfavor" )
          this.fichaIngreso = res.data;
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    },
    //Obtener una ficha de ingreso espefica
    async obtenerfichaIngreso(id) {
      await axios
        .get(`/Documento/fichaingreso/idficha/${id}`)
        .then((res) => {
          //console.log( "porfavor" )
          this.fichaIngreso = res.data;
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    },
    //Obtener Todas las Fcifas de Ingreso
    async obtenerfichasIngresos() {
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
        .get("/Documento/all/fichaingresoresidente?" + params)
        .then((res) => {
          this.setFichaIngreso(res.data);
        })
        .catch((err) => console.log(err));
    },
    ///Obtener residente
    async loadResidente(idresidente) {
      var user = {};
      await axios
        .get("/Residente/id?id=" + idresidente)
        .then((res) => {
          user = res.data;
          user.fechacreacion = user.fechacreacion.split("T")[0];
        })
        .catch((err) => console.log(err));
      return user;
    },
    //obtener todos los residentes
    async obtenerResidentes() {
      await axios
        .post("/residente/all/estadofase", this.documentoFase)
        .then((x) => {
          this.listaresidentes = x.data;
        })
        .catch((err) => console.log(err));
    },
    async obtenerResidentesSocial() {
      await axios
        .post("/residente/all/estadofase", this.documentoSocialFase)
        .then((x) => {
          this.listaresidentes = x.data;
        })
        .catch((err) => console.log(err));
    },
    async obtenerResidentesPsico() {
      await axios
        .post("/residente/all/estadofase", this.documentoPsicoFase)
        .then((x) => {
          this.listaresidentes = x.data;
        })
        .catch((err) => console.log(err));
    },
    async obtenerResidentesModificacion() {
      await axios
        .get("/residente/all")
        .then((x) => {
          this.listaresidentes = x.data;
        })
        .catch((err) => console.log(err));
    },
    ////obtener todos los eduacatoderes
    async obtenerEducadores() {
      await axios
        .get("/usuario/idrol?idrol=5f73b6440a37af031f716806")
        .then((res) => {
          this.listaeducadores = res.data;
        })
        .catch((err) => console.log(err));
    },
    cargarDocumentosRango(dates) {
      this.dates = dates.sort();          
      this.fromDate = this.formatDate(dates[0]);
      this.toDate = this.formatDate(dates[1]);      
      this.obtenerfichasIngresos();      
      this.modal = false;
    },
    formatDate (date) {
        if (!date) return null;
        const [year, month, day] = date.split('-')
        return `${month}-${day}-${year}`
    },
  },
  computed: {
    ...mapState(["fichaingreso"]),
    dateRangeText() {
      return this.dates.join(" ~ ");
    },
  },
};
</script>
<style scoped>
.card {
  margin: 20px;
}
</style>
