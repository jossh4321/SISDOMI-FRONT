<template>
  <v-card>
    <v-card-title class="justify-center"
      >Modificación del plan de intervención social</v-card-title
    >

    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step editable step="1"> Datos Generales </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step editable step="2">
          Aspectos de intervención
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <div class="container-planI">
            <form>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <template v-if="planI.documentos.length > 0">
                    <v-text-field
                      :value="residente.residente"
                      outlined
                      readonly
                      color="success"
                    >
                    </v-text-field>
                  </template>
                  <template v-else>
                    <v-autocomplete
                      label="Nombres y apellidos del residente"
                      outlined
                      v-model="residente"
                      :loading="loadingSearch"
                      :search-input.sync="searchResidente"
                      :items="listResidentes"
                      item-text="residente"
                      item-value="id"
                      hide-no-data
                      hide-selected
                      return-object
                      @input="$v.residente.id.$touch()"
                      @blur="$v.residente.id.$touch()"
                      :error-messages="errorResidente"
                      readonly
                    >
                      <template v-slot:item="item">
                        <v-list-item-avatar
                          color="primary"
                          class="headline font-weight-light white--text"
                        >
                          {{ item.item.residente.charAt(0) }}
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-title>
                            {{ item.item.residente }}
                          </v-list-item-title>
                          <v-list-item-subtitle>
                            DNI: {{ item.item.numeroDocumento }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </template>
                    </v-autocomplete>
                  </template>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model.trim="getTitleByFaseResident"
                    label="Ingrese el nombre del plan"
                    @input="$v.planI.contenido.titulo.$touch()"
                    @blur="$v.planI.contenido.titulo.$touch()"
                    :error-messages="errorTitulo"
                    outlined
                    readonly
                    color="#009900"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    type="number"
                    v-model.number="planI.contenido.edad"
                    label="Ingrese la edad del residente"
                    @input="$v.planI.contenido.edad.$touch()"
                    @blur="$v.planI.contenido.edad.$touch()"
                    :error-messages="errorEdad"
                    outlined
                    color="#009900"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-textarea
                    v-model.trim="planI.contenido.diagnostico"
                    label="Ingrese el diagnóstico"
                    rows="3"
                    auto-grow
                    @input="$v.planI.contenido.diagnostico.$touch()"
                    @blur="$v.planI.contenido.diagnostico.$touch()"
                    :error-messages="errorDiagnostico"
                    outlined
                    color="#009900"
                  ></v-textarea>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <div class="d-flex w-100">
                    <v-text-field
                      v-model.trim="objetivosAux"
                      label="Ingrese los objetivos del plan de intervención"
                      @input="$v.objetivosAux.$touch()"
                      @blur="$v.objetivosAux.$touch()"
                      :error-messages="errorObjetivo"
                      outlined
                      color="#009900"
                    ></v-text-field>
                    <v-btn
                      class="ml-2"
                      fab
                      color="success"
                      @click="addObjetivos"
                    >
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </div>
                  <div>
                    <h4
                      class="red--text"
                      v-if="$v.planI.contenido.objetivos.$error"
                    >
                      Debe tener como mínimo un objetivo registrado
                    </h4>
                  </div>
                  <registro-multiple
                    name="Objetivos"
                    :items="planI.contenido.objetivos"
                  ></registro-multiple>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-btn color="success" elevation="2" @click="step = 2" block>
                    <v-icon left>mdi-page-next-outline</v-icon>
                    <span>Continuar</span>
                  </v-btn>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-btn color="error" elevation="2" block @click="closeDialog">
                    <v-icon left>mdi-close-outline</v-icon>
                    Cerrar
                  </v-btn>
                </v-col>
              </v-row>
            </form>
          </div>
        </v-stepper-content>
        <v-stepper-content step="2">
          <div class="container-user">
            <form>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <div class="w-100 d-flex">
                    <v-text-field
                      v-model.trim="actividadAux"
                      label="Actividad/Estrategia"
                      @input="$v.actividadAux.$touch()"
                      @blur="$v.actividadAux.$touch()"
                      :error-messages="errorActividad"
                      outlined
                      color="#009900"
                    ></v-text-field>
                    <v-btn
                      class="ml-2"
                      fab
                      color="success"
                      @click="addActividad"
                    >
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </div>
                  <div>
                    <h4
                      class="red--text"
                      v-if="$v.planI.contenido.estrategias.$error"
                    >
                      Debe tener como mínimo una actividad/estrategia registrado
                    </h4>
                  </div>
                  <registro-multiple
                    name="Actividades/Estrategias"
                    :items="planI.contenido.estrategias"
                  ></registro-multiple>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <div class="w-100 d-flex">
                    <v-text-field
                      v-model.trim="indicadorAux"
                      label="Indicador"
                      @input="$v.indicadorAux.$touch()"
                      @blur="$v.indicadorAux.$touch()"
                      :error-messages="errorIndicador"
                      outlined
                      color="#009900"
                    ></v-text-field>
                    <v-btn
                      class="ml-2"
                      fab
                      color="success"
                      @click="addIndicador"
                    >
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </div>
                  <div>
                    <h4
                      class="red--text"
                      v-if="$v.planI.contenido.indicadores.$error"
                    >
                      Debe tener como mínimo un indicador registrado
                    </h4>
                  </div>
                  <registro-multiple
                    name="Indicadores"
                    :items="planI.contenido.indicadores"
                  ></registro-multiple>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <div class="w-100 d-flex">
                    <v-text-field
                      v-model.trim="metaAux"
                      label="Meta"
                      @input="$v.metaAux.$touch()"
                      @blur="$v.metaAux.$touch()"
                      :error-messages="errorMeta"
                      outlined
                      color="#009900"
                    ></v-text-field>
                    <v-btn class="ml-2" fab color="success" @click="addMeta">
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </div>
                  <div>
                    <h4
                      class="red--text"
                      v-if="$v.planI.contenido.metas.$error"
                    >
                      Debe tener como mínimo una meta registrada
                    </h4>
                  </div>
                  <registro-multiple
                    name="Metas"
                    :items="planI.contenido.metas"
                  ></registro-multiple>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <div class="w-100 d-flex">
                    <v-text-field
                      v-model="avanceAux"
                      label="Avance"
                      @input="$v.avanceAux.$touch()"
                      @blur="$v.avanceAux.$touch()"
                      :error-messages="errorAvance"
                      outlined
                      color="#009900"
                    ></v-text-field>
                    <v-btn class="ml-2" fab color="success" @click="addAvance">
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </div>
                  <div>
                    <h4
                      class="red--text"
                      v-if="$v.planI.contenido.avances.$error"
                    >
                      Debe tener como mínimo un avance registrado
                    </h4>
                  </div>
                  <registro-multiple
                    name="Avances"
                    :items="planI.contenido.avances"
                  ></registro-multiple>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <div>
                    <v-card-text>
                      <img width="240" height="170" :src="this.firma" alt="" />
                    </v-card-text>
                    <!-- <vue-dropzone
                      ref="myVueDropzone"
                      @vdropzone-success="afterSuccess"
                      @vdropzone-removed-file="afterRemoved"
                      id="dropzone"
                      :options="dropzoneOptions"
                    >
                    </vue-dropzone>
                    <v-alert type="error" v-if="!$v.firmaAux.required">
                      Debe ingresar una firma para el registro
                    </v-alert> -->
                  </div>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-btn block color="success" elevation="2" @click="editPlan">
                    <v-icon left>mdi-content-save-all-outline</v-icon>
                    <span>Finalizar</span>
                  </v-btn>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-btn color="error" elevation="2" block @click="closeDialog">
                    <v-icon left>mdi-close-outline</v-icon>
                    Cerrar
                  </v-btn>
                </v-col>
              </v-row>
            </form>
          </div>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
    <v-dialog width="450px" v-model="cargaModificando" persistent>
      <v-card height="300px">
        <v-card-title class="justify-center"
          >Modificando el Plan de Intervención Individual Social</v-card-title
        >
        <div>
          <v-progress-circular
            style="display: block; margin: 40px auto"
            :size="90"
            :width="9"
            color="purple"
            indeterminate
          ></v-progress-circular>
        </div>
        <v-card-subtitle
          class="justify-center"
          style="font-weight: bold; text-align: center"
          >En unos momentos finalizaremos...</v-card-subtitle
        >
      </v-card>
    </v-dialog>
  </v-card>
</template>
<script>
import axios from "axios";
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import { mapMutations, mapState } from "vuex";
import { required, minLength, between } from "vuelidate/lib/validators";
import RegistroMultiple from "@/components/planIntervencion/General/RegistroMultiple.vue";

export default {
  components: {
    vueDropzone: vue2Dropzone,
    RegistroMultiple,
  },
  data() {
    return {
      datemenu: false,
      step: 1,
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 250,
        maxFiles: 1,
        acceptedFiles: "image/*",
        headers: { "My-Awesome-Header": "header value" },
        addRemoveLinks: true,
        dictDefaultMessage: "Ingrese su firma para el registro",
        dictRemoveFile: "Remover firma",
        dictMaxFilesExceeded: "Tamaño excedido",
      },
      objetivosAux: "",
      avanceAux: "",
      actividadAux: "",
      indicadorAux: "",
      metaAux: "",
      listResidentes: [],
      firmaAux: [],
      residente: {
        residente: "",
        id: "",
        faseActual: "",
      },
      searchResidente: null,
      loadingSearch: false,
      firma: "",
      fasesPlanIntervencion: {
        fases: [1, 2],
        area: "social",
        documentoEstadosAnteriores: [
          {
            tipo: "InformeSocialInicial",
            estado: "Completo",
          },
          {
            tipo: "PlanIntervencionIndividualSocial",
            estado: "Pendiente",
          },
        ],
        documentoEstadosActuales: [
          {
            tipo: "PlanIntervencionIndividualSocial",
            estado: "Completo",
          },
          {
            tipo: "PlanIntervencionIndividualSocial",
            estado: "Completo",
          },
        ],
      },
      cargaModificando: false,
    };
  },
  validations() {
    return {
      objetivosAux: {
        minLength: minLength(10),
      },
      avanceAux: {
        minLength: minLength(10),
      },
      actividadAux: {
        minLength: minLength(10),
      },
      indicadorAux: {
        minLength: minLength(10),
      },
      metaAux: {
        minLength: minLength(10),
      },
      residente: {
        id: {
          required,
        },
      },
      planI: {
        contenido: {
          edad: {
            required,
            between: between(12, 23),
          },
          diagnostico: {
            required,
            minLength: minLength(4),
          },
          objetivos: {
            required,
            minLength: minLength(1),
          },
          avances: {
            required,
            minLength: minLength(1),
          },
          estrategias: {
            required,
            minLength: minLength(1),
          },
          indicadores: {
            required,
            minLength: minLength(1),
          },
          metas: {
            required,
            minLength: minLength(1),
          },
          titulo: {
            required,
            minLength: minLength(4),
          },
        },
      } /*
      firmaAux: {
        required,
      },*/,
    };
  },
  props: {
    planI: {
      type: Object,
    },
  },
  methods: {
    ...mapMutations(["setResidentes"]),
    async obtenerCreador() {
      await axios
        .get("/usuario/rol/permiso?id=" + this.planI.creador)
        .then((x) => {
          this.firma = x.data.datos.firma;
        })
        .catch((err) => console.log(err));
    },
    async editPlan() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.mensaje(
          "error",
          "..Oops",
          "Se encontraron errores en el formulario",
          "<strong>Verifique los campos Ingresados<strong>"
        );
      } else {
        /*for (let index = 0; index < this.firmaAux.length; index++) {
          if (
            this.firmaAux[index] != null &&
            this.firmaAux[index].dataURL != undefined
          ) {
            let formData = new FormData();

            formData.append("file", this.firmaAux[index]);

            await axios
              .post("/media", formData)
              .then((res) => {
                this.planI.contenido.firmas[index].urlfirma = res.data;
              })
              .catch((err) => {
                console.error(err);
              });
          }
        }*/
        this.cargaModificando = true;
        
        let planI = {
          id: this.planI.id,
          historialcontenido: [],
          tipo: this.planI.tipo,
          contenido: this.planI.contenido,
          idresidente: this.residente.id,
        };

        axios
          .put("/planIntervencion/social", planI)
          .then((res) => {
            
            this.cargaModificando = false;

            this.mensaje(
              "success",
              "Actualización del Plan de Intervención",
              "Se actualizó los datos del plan de intervención de manera satisfactoria",
              "<strong>Se redirigirá a la Interfaz de Gestión<strong>",
              true
            );
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } /*
    afterSuccess(file, response) {
      this.firmaAux.push(file);
    },
    afterRemoved(file, error, xhr) {
      let indexFile = this.firmaAux.findIndex((image) => image == file);

      if (indexFile != -1) {
        this.firmaAux.splice(indexFile, 1);
      }
    },*/,
    mensaje(icono, titulo, texto, footer, valid) {
      this.$swal({
        icon: icono,
        title: titulo,
        text: texto,
        footer: footer,
      }).then((res) => {
        if (valid) {
          this.$emit("edit-complete");
        }
      });
    },
    addObjetivos() {
      if (this.objetivosAux != "" && !this.$v.objetivosAux.$invalid) {
        this.planI.contenido.objetivos.push(this.objetivosAux);
        this.objetivosAux = "";
      }
    },
    addAvance() {
      if (this.avanceAux != "" && !this.$v.avanceAux.$invalid) {
        this.planI.contenido.avances.push(this.avanceAux);
        this.avanceAux = "";
      }
    },
    addActividad() {
      if (this.actividadAux != "" && !this.$v.actividadAux.$invalid) {
        this.planI.contenido.estrategias.push(this.actividadAux);
        this.actividadAux = "";
      }
    },
    addIndicador() {
      if (this.indicadorAux != "" && !this.$v.indicadorAux.$invalid) {
        this.planI.contenido.indicadores.push(this.indicadorAux);
        this.indicadorAux = "";
      }
    },
    addMeta() {
      if (this.metaAux != "" && !this.$v.metaAux.$invalid) {
        this.planI.contenido.metas.push(this.metaAux);
        this.metaAux = "";
      }
    },
    closeDialog() {
      this.$emit("close-dialog");
    },
  },
  watch: {
    searchResidente(value) {
      if (value == null || value == "") {
        this.residente = {
          residente: "",
          id: "",
          numeroDocumento: "",
          faseActual: "",
        };
      }

      if (this.listResidentes.length > 1) {
        return;
      }

      if (this.loadingSearch) {
        return;
      }

      this.loadingSearch = true;

      axios
        .post("/residente/all/fases/documentos", this.fasesPlanIntervencion)
        .then((res) => {
          let residentesMap = res.data.map(function (res) {
            return {
              residente: res.nombre + " " + res.apellido,
              id: res.id,
              numeroDocumento: res.numeroDocumento,
              faseActual: res.progreso[res.progreso.length - 1].fase.toString(),
            };
          });

          const residentePlan = {
            residente:
              this.planI.residente.nombre + " " + this.planI.residente.apellido,
            id: this.planI.residente.id,
            numeroDocumento: this.planI.residente.numeroDocumento,
            faseActual: this.planI.residente.progreso[
              this.planI.residente.progreso.length - 1
            ].fase.toString(),
          };

          residentesMap.push(residentePlan);

          this.listResidentes = residentesMap;

          this.loadingSearch = false;
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  computed: {
    ...mapState(["residentes"]),
    verifyColor() {
      return "red";
    },
    getTitleByFaseResident() {
      if (this.residente != null) {
        if (this.residente.faseActual != "") {
          if (this.residente.faseActual == "1") {
            this.planI.contenido.titulo = "Plan de Intervención Social";
          } else {
            this.planI.contenido.titulo =
              "Plan de Intervención Individual " + this.residente.residente;
          }

          return this.planI.contenido.titulo;
        } else {
          return "";
        }
      } else {
        return "";
      }
    },
    errorObjetivo() {
      const errors = [];

      if (!this.$v.objetivosAux.$dirty) {
        return errors;
      }

      if (!this.$v.objetivosAux.minLength) {
        errors.push("Debe ingresar como mínimo 10 caracteres");
      }

      return errors;
    },
    errorAvance() {
      const errors = [];

      if (!this.$v.avanceAux.$dirty) {
        return errors;
      }

      if (!this.$v.avanceAux.minLength) {
        errors.push("Debe ingresar como mínimo 10 caracteres");
      }

      return errors;
    },
    errorActividad() {
      const errors = [];

      if (!this.$v.actividadAux.$dirty) {
        return errors;
      }

      if (!this.$v.actividadAux.minLength) {
        errors.push("Debe ingresar como mínimo 10 caracteres");
      }

      return errors;
    },
    errorIndicador() {
      const errors = [];

      if (!this.$v.indicadorAux.$dirty) {
        return errors;
      }

      if (!this.$v.indicadorAux.minLength) {
        errors.push("Debe ingresar como mínimo 10 caracteres");
      }

      return errors;
    },
    errorMeta() {
      const errors = [];

      if (!this.$v.metaAux.$dirty) {
        return errors;
      }

      if (!this.$v.metaAux.minLength) {
        errors.push("Debe ingresar como mínimo 10 caracteres");
      }

      return errors;
    },
    errorTitulo() {
      const errors = [];
      if (!this.$v.planI.contenido.titulo.$dirty) return errors;
      !this.$v.planI.contenido.titulo.required &&
        errors.push("Debe ingresar un nombre de plan obligatoriamente");
      !this.$v.planI.contenido.titulo.minLength &&
        errors.push("El nombre de plan debe poseer al menos 4 caracteres");
      return errors;
    },
    errorDiagnostico() {
      const errors = [];
      if (!this.$v.planI.contenido.diagnostico.$dirty) return errors;
      !this.$v.planI.contenido.diagnostico.required &&
        errors.push("Debe ingresar un diagnóstico obligatoriamente");
      !this.$v.planI.contenido.diagnostico.minLength &&
        errors.push("El diagnóstico debe poseer al menos 4 caracteres");
      return errors;
    },
    errorResidente() {
      const errors = [];
      if (!this.$v.residente.id.$dirty) return errors;
      !this.$v.residente.id.required &&
        errors.push("Debe ingresar un residente obligatoriamente");
      return errors;
    },
    errorEdad() {
      const errors = [];
      if (!this.$v.planI.contenido.edad.$dirty) return errors;
      !this.$v.planI.contenido.edad.required &&
        errors.push("Debe ingresar la edad del residente obligatoriamente");
      !this.$v.planI.contenido.edad.between &&
        errors.push(
          "La edad del residente debe estar comprendido desde 12 hasta 23 años"
        );
      return errors;
    },
    errorObjetivos() {
      const errors = [];
      if (!this.$v.planI.contenido.objetivos.$dirty) return errors;
      if (!this.$v.planI.contenido.objetivos.required) {
        errors.push("Los objetivos son requeridos");
      }
      if (!this.$v.planI.contenido.objetivos.minLength) {
        errors.push("Se debe registrar un objetivo como mínimo");
      }

      return errors;
    },
    errorAvances() {
      const errors = [];
      if (!this.$v.planI.contenido.avances.$dirty) return errors;
      if (!this.$v.planI.contenido.avances.required) {
        errors.push("Los avances son requeridos");
      }
      if (!this.$v.planI.contenido.avances.minLength) {
        errors.push("Se debe registrar un avance como mínimo");
      }

      return errors;
    },
    errorEstrategias() {
      const errors = [];
      if (!this.$v.planI.contenido.estrategias.$dirty) return errors;

      if (!this.$v.planI.contenido.estrategias.required) {
        errors.push("Las estrategias son requeridas");
      }
      if (!this.$v.planI.contenido.estrategias.minLength) {
        errors.push("Se debe registrar una estrategias como mínimo");
      }

      return errors;
    },
    errorIndicadores() {
      const errors = [];
      if (!this.$v.planI.contenido.indicadores.$dirty) return errors;

      if (!this.$v.planI.contenido.indicadores.required) {
        errors.push("Los indicadores son requeridos");
      }
      if (!this.$v.planI.contenido.indicadores.minLength) {
        errors.push("Se debe registrar un indicador como mínimo");
      }

      return errors;
    },
    errorMetas() {
      const errors = [];
      if (!this.$v.planI.contenido.metas.$dirty) return errors;

      if (!this.$v.planI.contenido.metas.required) {
        errors.push("Las metas son requeridas");
      }
      if (!this.$v.planI.contenido.metas.minLength) {
        errors.push("Se debe registrar una meta como mínimo");
      }

      return errors;
    },
  },
  created() {
    this.residente.residente =
      this.planI.residente.nombre + " " + this.planI.residente.apellido;
    this.residente.id = this.planI.residente.id;
    this.residente.numeroDocumento = this.planI.residente.numeroDocumento;
    this.residente.faseActual = this.planI.residente.progreso[
      this.planI.residente.progreso.length - 1
    ].fase.toString();

    this.listResidentes.push(this.residente);
    this.obtenerCreador();
  } /*
  mounted() {
    var file = { size: 250, name: "firmatrabajador.jpg", type: "image/jpg" };
    var url = this.planI.contenido.firmas[0].urlfirma;

    this.$refs.myVueDropzone.manuallyAddFile(file, url);

    this.firmaAux.push(
      this.$refs.myVueDropzone.$refs.dropzoneElement.dropzone.files[0]
    );
  },*/,
};
</script>
<style  scoped>
.container-planI {
  margin: 15px;
}

.dropzone-custom-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.dropzone-custom-title {
  margin-top: 0;
  color: #00b782;
}

.subtitle {
  color: #314b5f;
}
.divider-custom {
  margin-top: 7px;
  margin-bottom: 7px;
}

.inputTextField {
  border-color: green;
}

.w-100 {
  width: 100%;
}
</style>