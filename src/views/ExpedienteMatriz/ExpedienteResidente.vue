<template>
  <v-card elevation="3" outlined class="card">
    <template v-if="showInfo">
      <div class="progress">
        <v-progress-circular
          size="80"
          width="10"
          color="red"
          indeterminate
        ></v-progress-circular>
      </div>
    </template>
    <template v-else>
      <v-card-title>Datos del Residente</v-card-title>
      <v-card-subtitle
        >Visualice todo los datos que tiene el residente, asimismo los anexos y
        la cantidad de documentos que se le han registrado en su expediente
      </v-card-subtitle>
      <v-card-text>
        <v-card elevation="0" outlined shaped>
          <v-card-title>Datos personales</v-card-title>
          <v-row>
            <v-col cols="12" sm="12" md="12" lg="3" xl="3">
              <v-img
                src="../../assets/static/residente_hombre.png"
                max-width="250"
                max-height="250"
                class="ml-auto mr-auto ml-sm-3 mr-sm-0"
                v-if="residente.sexo == 'masculino'"
              ></v-img>
              <v-img
                src="../../assets/static/residente_mujer.png"
                max-width="250"
                max-height="250"
                class="ml-auto mr-auto ml-sm-3 mr-sm-0"
                v-else-if="residente.sexo == 'femenino'"
              ></v-img>
            </v-col>
            <v-col cols="12" sm="12" md="12" lg="9" xl="9">
              <v-row class="ml-3 ml-sm-0">
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                  lg="4"
                  xl="4"
                  class="text-center text-sm-start"
                >
                  <label class="font-weight-medium label-title"
                    >Nombres y apellidos</label
                  >
                  <p class="label-text">
                    {{ residente.nombre + " " + residente.apellido }}
                  </p>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                  lg="4"
                  xl="4"
                  class="text-center text-sm-start"
                >
                  <label class="font-weight-medium label-title"
                    >Fecha de Nacimiento</label
                  >
                  <p class="label-text">
                    {{ residente.fechaNacimiento | moment("DD/MM/YYYY") }}
                  </p>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                  lg="4"
                  xl="4"
                  class="text-center text-sm-start"
                >
                  <label class="font-weight-medium label-title"
                    >Tipo de Documento</label
                  >
                  <p class="label-text">{{ residente.tipoDocumento }}</p>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                  lg="4"
                  xl="4"
                  class="text-center text-sm-start"
                >
                  <label class="font-weight-medium label-title"
                    >Número de Documento</label
                  >
                  <p class="label-text">{{ residente.numeroDocumento }}</p>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                  lg="4"
                  xl="4"
                  class="text-center text-sm-start"
                >
                  <label class="font-weight-medium label-title"
                    >Lugar de Nacimiento</label
                  >
                  <p class="label-text">{{ residente.lugarNacimiento }}</p>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                  lg="4"
                  xl="4"
                  class="text-center text-sm-start"
                >
                  <label class="font-weight-medium label-title">Ubigeo</label>
                  <p class="label-text">{{ residente.ubigeo }}</p>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                  lg="4"
                  xl="4"
                  class="text-center text-sm-start"
                >
                  <label class="font-weight-medium label-title"
                    >Juzgado de Procedencia</label
                  >
                  <p class="label-text">{{ residente.juzgadoProcedencia }}</p>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                  lg="4"
                  xl="4"
                  class="text-center text-sm-start"
                >
                  <label class="font-weight-medium label-title">Sexo</label>
                  <p class="label-text">{{ residente.sexo }}</p>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                  lg="4"
                  xl="4"
                  class="text-center text-sm-start"
                >
                  <label class="font-weight-medium label-title"
                    >Fecha de Ingreso</label
                  >
                  <p class="label-text">
                    {{ residente.fechaIngreso | moment("DD/MM/YYYY") }}
                  </p>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row class="ml-3">
            <v-col
              cols="12"
              sm="12"
              md="12"
              lg="12"
              xl="12"
              class="text-center text-sm-start"
            >
              <label class="font-weight-medium label-title"
                >Motivo de Ingreso</label
              >
              <p class="label-text text-none">{{ residente.motivoIngreso }}</p>
            </v-col>
            <v-col
              cols="12"
              sm="12"
              md="12"
              lg="12"
              xl="12"
              class="text-center text-sm-start"
            >
              <label class="font-weight-medium label-title">
                Teléfonos de referencia
              </label>
              <v-row justify="center" justify-sm="start">
                <v-col
                  cols="auto"
                  class="pl-0"
                  v-for="(
                    telefonoReferencia, index
                  ) in residente.telefonosReferencia"
                  :key="index"
                >
                  <v-chip class="ma-2" color="primary" outlined>
                    <v-icon left> mdi-phone </v-icon>
                    {{ telefonoReferencia | toPhoneReference }}
                  </v-chip>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-card-text>
      <v-card-text>
        <v-card elevation="0" outlined shaped>
          <v-card-title>Anexos</v-card-title>
          <template v-if="residente.anexos.length > 0">
            <v-row class="ml-3">
              <v-col
                cols="12"
                sm="4"
                md="4"
                lg="4"
                xl="4"
                v-for="(anexo, index) in residente.anexos"
                :key="index"
                class="text-center text-sm-start"
              >
                <label class="font-weight-medium label-title">
                  {{ anexo.titulo }}
                </label>
                <v-btn
                  color="success"
                  class="d-block mt-2 mx-auto mx-sm-0"
                  @click="showAnnexes(anexo)"
                >
                  Ver {{ anexo.titulo }}
                  <v-icon right dark>mdi-file-pdf</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </template>
          <template v-else>
            <v-alert
              text
              outlined
              border="left"
              color="deep-orange"
              width="97%"
              class="ml-3"
              icon="info"
            >
              No se ha registrado ningún anexo al residente
            </v-alert>
          </template>
        </v-card>
      </v-card-text>
      <v-card-text>
        <v-card elevation="0" outlined shaped>
          <v-card-title>Cantidad de documentos registrados</v-card-title>
          <template v-if="residente.cantidadDocumentos.length > 0">
            <div>
              <v-data-table
                :headers="headerDocuments"
                :items="residente.cantidadDocumentos"
                hide-default-footer
                class="datatable"
              >
                <template v-slot:[`item.area`]="{ item }">
                  {{ item.area | toCapitalize }}
                </template>
                <template v-slot:[`item.actions`]="{ item }">
                  <v-btn color="info" @click="showDocuments(item)">
                    <v-icon left class="ml-auto ml-sm-0 mr-auto mr-sm-1"
                      >mdi-eye</v-icon
                    >
                    <span class="d-none d-sm-block">Documentos</span>
                  </v-btn>
                </template>
              </v-data-table>
            </div>
          </template>
          <template v-else>
            <v-alert
              text
              outlined
              border="left"
              color="deep-orange"
              width="97%"
              class="ml-3"
              icon="info"
            >
              No se ha registrado ningún documento al residente
            </v-alert>
          </template>
        </v-card>
      </v-card-text>
      <v-dialog v-model="dialogDocuments" max-width="500">
        <detalle-documentos :areaDocuments="areaDocuments"></detalle-documentos>
      </v-dialog>
      <v-dialog v-model="dialogPDFs" max-width="500" persistent>
        <v-card>
          <v-card-title>Visualización de los anexos</v-card-title>
          <v-card-subtitle
            >Visualice todos los archivos en formato pdf del anexo
            seleccionado</v-card-subtitle
          >
          <v-card-text>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="6"
                lg="4"
                xl="4"
                v-for="(annexe, index) in lstAnnexes"
                :key="index"
              >
                <v-btn color="success" block @click="showAnnexe(annexe)">
                  {{ annexe.descripcion }}
                  <v-icon right dark>mdi-file-pdf</v-icon></v-btn
                >
              </v-col>
            </v-row>
            <v-btn block color="error" @click="dialogPDFs = false" class="mt-2">
              <v-icon left>mdi-close</v-icon>
              <span>Cerrar</span>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogPDF" max-width="600">
        <v-card>
          <v-card-title>Visualización del documento en PDF</v-card-title>
          <v-card-text>
            <iframe :src="urlAnnexe" width="100%" height="600"></iframe>
          </v-card-text>
        </v-card>
      </v-dialog>
    </template>
  </v-card>
</template>

<script>
import axios from "axios";
import DetalleDocumentos from "@/components/expediente/general/DetalleDocumentos.vue";

export default {
  name: "app-expediente-residente",
  data() {
    return {
      residente: null,
      showInfo: true,
      dialogDocuments: false,
      dialogPDFs: false,
      dialogPDF: false,
      headerDocuments: [
        {
          text: "Área",
          value: "area",
          sortable: false,
          align: "start",
        },
        {
          text: "Documentos registrados",
          value: "cantidad",
        },
        {
          text: "Acción",
          value: "actions",
          sortable: false,
          align: "center",
        },
      ],
      areaDocuments: [],
      lstAnnexes: [],
      urlAnnexe: "",
    };
  },
  props: {
    idresidente: {
      type: String,
    },
  },
  methods: {
    showDocuments(item) {
      axios
        .get("/documento/tipo/" + item.area + "/residente/" + this.idresidente)
        .then((res) => {
          this.areaDocuments = res.data;
          this.dialogDocuments = true;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    showAnnexes(anexo) {
      this.dialogPDFs = true;
      this.lstAnnexes = anexo.enlaces;
    },
    showAnnexe(enlace) {
      this.dialogPDF = true;
      this.urlAnnexe = enlace.link;
    }
  },
  filters: {
    toPhoneReference(value) {
      let phoneReference = value.referentefamiliar
        .concat(" (")
        .concat(value.numero)
        .concat(")");

      return phoneReference;
    },
    toCapitalize(value) {
      return value.charAt(0).toUpperCase() + value.substring(1);
    },
  },
  created() {
    axios
      .get("/residente/" + this.idresidente + "/expediente")
      .then((res) => {
        res.data.sexo = res.data.sexo.toLowerCase();
        this.residente = res.data;
        this.showInfo = false;
      })
      .catch((err) => {
        console.error(err);
      });
  },
  components: {
    DetalleDocumentos,
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

.progress {
  width: 50%;
  margin: 0px auto;
  text-align: center;
  padding-top: 15px;
}

.label-title {
  font-size: 1.2rem;
}

.label-text {
  margin-top: 2px;
  font-size: 1rem;
  text-transform: capitalize;
}
</style>