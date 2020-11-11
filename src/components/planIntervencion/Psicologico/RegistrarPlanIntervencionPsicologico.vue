<template>
  <v-card>
    <v-card-title class="justify-center">
      Registrar plan de intervención psicológico
    </v-card-title>
    <v-card-text>
      <v-stepper v-model="startStteper">
        <v-stepper-header>
          <v-stepper-step editable step="1">
            Datos del Residente
          </v-stepper-step>
          <v-stepper-step editable step="2">
            Aspectos de Intervención
          </v-stepper-step>
          <v-stepper-step editable step="3">
            Datos del Psicólogo
          </v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content step="1">
            <form>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Título"
                    outlined
                    v-model="planResidentePsicologico.contenido.titulo"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-autocomplete
                    v-model="residente"
                    :loading="loadingSearch"
                    :items="residentes"
                    item-text="residente"
                    item-value="id"
                    :search-input.sync="searchResidente"
                    hide-no-data
                    hide-selected
                    label="Nombres y apellidos del residente"
                    return-object
                    outlined
                  >
                    <template v-slot:item="item">
                      <v-list-item-avatar
                        color="primary"
                        class="headline font-weight-light white--text"
                      >
                        {{ item.item.residente.charAt(0) }}
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>{{
                          item.item.residente
                        }}</v-list-item-title>
                        <v-list-item-subtitle>DNI: {{
                          item.item.numeroDocumento
                        }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </template>
                  </v-autocomplete>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="DNI del Residente"
                    outlined
                    :value="residente != null ? residente.numeroDocumento : ''"
                    readonly
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Fecha de Nacimiento"
                    :value="formatDateBorn"
                    outlined
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Sexo"
                    outlined
                    :value="residente != null ? residente.sexo : ''"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Motivo de ingreso"
                    outlined
                    :value="residente != null ? residente.motivoIngreso : ''"
                  >
                  </v-text-field
                ></v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Estado"
                    outlined
                    :value="residente != null ? residente.estado : ''"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-btn
                    color="success"
                    elevation="2"
                    width="100%"
                    @click="addStep(2)"
                  >
                    <v-icon left>mdi-content-save-all-outline</v-icon>
                    Continuar
                  </v-btn>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-btn
                    color="error"
                    elevation="2"
                    @click="closeDialog"
                    width="100%"
                  >
                    <v-icon left>mdi-close-outline</v-icon>
                    Cerrar
                  </v-btn>
                </v-col>
              </v-row>
            </form>
          </v-stepper-content>
          <v-stepper-content step="2">
            <form>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-textarea
                    label="Descripcion"
                    rows="3"
                    row-height="10"
                    outlined
                    v-model="planResidentePsicologico.contenido.descripcion"
                  >
                  </v-textarea>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-textarea
                    label="Frecuencia de sesiones"
                    rows="3"
                    row-height="10"
                    outlined
                    v-model="
                      planResidentePsicologico.contenido.frecuenciaSesion
                    "
                  >
                  </v-textarea>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Número de sesiones"
                    outlined
                    v-model="planResidentePsicologico.contenido.numeroSesion"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <div class="w-100 d-flex">
                    <v-text-field
                      label="Objetivo específicos"
                      outlined
                      v-model="objetivoEspecifico"
                    >
                    </v-text-field>
                    <v-btn
                      class="ml-2"
                      fab
                      color="success"
                      @click="addObjetivo"
                    >
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </div>
                  <registro-multiple
                    :items="
                      planResidentePsicologico.contenido.objetivoEspecificos
                    "
                    name="Objetivos específicos"
                  ></registro-multiple>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <div class="w-100 d-flex">
                    <v-text-field label="Técnica" outlined v-model="tecnica">
                    </v-text-field>
                    <v-btn class="ml-2" fab color="success" @click="addTecnica">
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </div>
                  <registro-multiple
                    :items="planResidentePsicologico.contenido.tecnicas"
                    name="Técnicas"
                  ></registro-multiple>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <div class="w-100 d-flex">
                    <v-text-field label="Meta" outlined v-model="meta">
                    </v-text-field>
                    <v-btn class="ml-2" fab color="success" @click="addMeta">
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </div>
                  <registro-multiple
                    :items="planResidentePsicologico.contenido.metas"
                    name="Metas"
                  ></registro-multiple>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <div class="w-100 d-flex">
                    <v-text-field
                      label="Indicador"
                      outlined
                      v-model="indicador"
                    >
                    </v-text-field>
                    <v-btn
                      class="ml-2"
                      fab
                      color="success"
                      @click="addIndicador"
                    >
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </div>
                  <registro-multiple
                    :items="planResidentePsicologico.contenido.indicadores"
                    name="Indicadores"
                  ></registro-multiple>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <div class="w-100 d-flex">
                    <v-text-field
                      label="Requerimiento"
                      outlined
                      v-model="requerimiento"
                    >
                    </v-text-field>
                    <v-btn
                      class="ml-2"
                      fab
                      color="success"
                      @click="addRequerimiento"
                    >
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </div>
                  <registro-multiple
                    :items="planResidentePsicologico.contenido.requerimientos"
                    name="Requerimientos"
                  ></registro-multiple>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-btn
                    color="success"
                    elevation="2"
                    width="100%"
                    @click="addStep(3)"
                  >
                    <v-icon left>mdi-content-save-all-outline</v-icon>
                    Continuar
                  </v-btn>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-btn
                    color="error"
                    elevation="2"
                    @click="closeDialog"
                    width="100%"
                  >
                    <v-icon left>mdi-close-outline</v-icon>
                    Cerrar
                  </v-btn>
                </v-col>
              </v-row>
            </form>
          </v-stepper-content>
          <v-stepper-content step="3">
            <form>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field label="Nombre del psicólogo" outlined>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field label="Número de Colegiatura" outlined>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="12">
                  <!-- <vue-dropzone></vue-dropzone> -->
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-btn color="success" elevation="2" width="100%">
                    <v-icon left>mdi-check</v-icon>
                    Finalizar
                  </v-btn>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-btn
                    color="error"
                    elevation="2"
                    @click="closeDialog"
                    width="100%"
                  >
                    <v-icon left>mdi-close-outline</v-icon>
                    Cerrar
                  </v-btn>
                </v-col>
              </v-row>
            </form>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-card-text>
  </v-card>
</template>

<script>
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import RegistroMultiple from "@/components/planIntervencion/Psicologico/RegistroMultiple.vue";
import axios from "axios";

export default {
  name: "registrar-plan-intervencion-psicologico",
  data() {
    return {
      startStteper: 1,
      objetivoEspecifico: "",
      tecnica: "",
      meta: "",
      indicador: "",
      requerimiento: "",
      searchResidente: null,
      planResidentePsicologico: {
        tipo: "PlanIntervencionIndividual",
        historialcontenido: [],
        creadordocumento: "5f70b799c58b26540822c00f",
        fechacreacion: new Date(),
        area: "",
        fase: "",
        estado: "creado",
        idresidente: "",
        contenido: {
          descripcion: "",
          objetivoEspecificos: [],
          tecnicas: [],
          metas: [],
          indicadores: [],
          frecuenciaSesion: "",
          numeroSesion: "",
          requerimientos: [],
          codigoDocumento: "",
          titulo: "",
          firmas: [
            {
              url: "",
              nombre: "",
              cargo: "",
            },
          ],
        },
      },
      residentes: [],
      loadingSearch: false,
      residente: {
        residente: "",
        id: "",
        fechaNacimiento: "",
        sexo: "",
        motivoIngreso: "",
        estado: "",
      },
    };
  },
  watch: {
    searchResidente(value) {
      if (value == null) {
        this.residente = {
          residente: "",
          id: "",
          fechaNacimiento: "",
          sexo: "",
          motivoIngreso: "",
          estado: "",
        };
      }

      if (this.residentes.length > 0) {
        return;
      }
      if (this.loadingSearch) {
        return;
      }

      this.loadingSearch = true;

      axios
        .get("/Residente/all")
        .then((res) => {
          let residentesMap = res.data.map(function (res) {
            return {
              residente: res.nombre + " " + res.apellido,
              id: res.id,
              numeroDocumento: res.numeroDocumento,
              fechaNacimiento: res.fechaNacimiento,
              sexo: res.sexo,
              motivoIngreso: res.motivoIngreso,
              estado: res.estado,
            };
          });

          this.residentes = residentesMap;

          this.loadingSearch = false;

        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  computed: {
      formatDateBorn() {
          return this.residente != null ? this.residente.fechaNacimiento == "" ? '':
          this.$moment(this.residente.fechaNacimiento).format("DD/MM/YYYY")  : '';
      }
  },
  methods: {
    closeDialog() {
      this.$emit("close-dialog");
    },
    addStep(step) {
      this.startStteper = step;
    },
    addObjetivo() {
      this.planResidentePsicologico.contenido.objetivoEspecificos.push(
        this.objetivoEspecifico
      );
      this.objetivoEspecifico = "";
    },
    addTecnica() {
      this.planResidentePsicologico.contenido.tecnicas.push(this.tecnica);
      this.tecnica = "";
    },
    addMeta() {
      this.planResidentePsicologico.contenido.metas.push(this.meta);
      this.meta = "";
    },
    addIndicador() {
      this.planResidentePsicologico.contenido.indicadores.push(this.indicador);
      this.indicador = "";
    },
    addRequerimiento() {
      this.planResidentePsicologico.contenido.requerimientos.push(
        this.requerimiento
      );
      this.requerimiento = "";
    }
  },
  components: {
    vueDropzone: vue2Dropzone,
    RegistroMultiple,
  },
};
</script>

<style lang="scss" scoped>
.w-100 {
  width: 100% !important;
}
</style>