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
                    required
                    :error-messages="planTituloErrors"
                    @input="
                      $v.planResidentePsicologico.contenido.titulo.$touch()
                    "
                    @blur="
                      $v.planResidentePsicologico.contenido.titulo.$touch()
                    "
                    color="success"
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
                    :error-messages="residenteIdErrors"
                    @input="$v.residente.id.$touch()"
                    @blur="$v.residente.id.$touch()"
                    color="success"
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
                        <v-list-item-subtitle
                          >DNI:
                          {{ item.item.numeroDocumento }}</v-list-item-subtitle
                        >
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
                    required
                    :error-messages="planDescripcionErrors"
                    @input="
                      $v.planResidentePsicologico.contenido.descripcion.$touch()
                    "
                    @blur="
                      $v.planResidentePsicologico.contenido.descripcion.$touch()
                    "
                    color="success"
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
                    required
                    :error-messages="planFrecuenciaSesionErrors"
                    @input="
                      $v.planResidentePsicologico.contenido.frecuenciaSesion.$touch()
                    "
                    @blur="
                      $v.planResidentePsicologico.contenido.frecuenciaSesion.$touch()
                    "
                    color="success"
                  >
                  </v-textarea>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Número de sesiones"
                    outlined
                    type="number"
                    v-model.number="
                      planResidentePsicologico.contenido.numeroSesion
                    "
                    :error-messages="planNumeroSesionErrors"
                    @input="
                      $v.planResidentePsicologico.contenido.numeroSesion.$touch()
                    "
                    @blur="
                      $v.planResidentePsicologico.contenido.numeroSesion.$touch()
                    "
                    color="success"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <div class="w-100 d-flex">
                    <v-text-field
                      label="Objetivo específicos"
                      outlined
                      v-model="objetivoEspecifico"
                      :error-messages="objetivoEspecificoErrors"
                      @input="$v.objetivoEspecifico.$touch()"
                      @blur="$v.objetivoEspecifico.$touch()"
                      color="success"
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
                  <div>
                    <h4
                      v-if="
                        $v.planResidentePsicologico.contenido
                          .objetivoEspecificos.$error
                      "
                      class="red--text"
                    >
                      Debe tener como mínimo un objetivo específico registrado
                    </h4>
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
                    <v-text-field
                      label="Técnica"
                      outlined
                      v-model="tecnica"
                      :error-messages="tecnicaErrors"
                      @input="$v.tecnica.$touch()"
                      @blur="$v.tecnica.$touch()"
                      color="success"
                    >
                    </v-text-field>
                    <v-btn class="ml-2" fab color="success" @click="addTecnica">
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </div>
                  <div>
                    <h4
                      v-if="
                        $v.planResidentePsicologico.contenido
                          .tecnicas.$error
                      "
                      class="red--text"
                    >
                      Debe tener como mínimo una técnica registrada
                    </h4>
                  </div>
                  <registro-multiple
                    :items="planResidentePsicologico.contenido.tecnicas"
                    name="Técnicas"
                  ></registro-multiple>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <div class="w-100 d-flex">
                    <v-text-field
                      label="Meta"
                      outlined
                      v-model="meta"
                      :error-messages="metaErrors"
                      @input="$v.meta.$touch()"
                      @blur="$v.meta.$touch()"
                      color="success"
                    >
                    </v-text-field>
                    <v-btn class="ml-2" fab color="success" @click="addMeta">
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </div>
                  <div>
                    <h4
                      v-if="
                        $v.planResidentePsicologico.contenido
                          .metas.$error
                      "
                      class="red--text"
                    >
                      Debe tener como mínimo una meta registrada
                    </h4>
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
                      :error-messages="indicadorErrors"
                      @input="$v.indicador.$touch()"
                      @blur="$v.indicador.$touch()"
                      color="success"
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
                  <div>
                    <h4
                      v-if="
                        $v.planResidentePsicologico.contenido
                          .indicadores.$error
                      "
                      class="red--text"
                    >
                      Debe tener como mínimo un indicador registrado
                    </h4>
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
                      :error-messages="requerimientoErrors"
                      @input="$v.requerimiento.$touch()"
                      @blur="$v.requerimiento.$touch()"
                      color="success"
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
                  <div>
                    <h4
                      v-if="
                        $v.planResidentePsicologico.contenido
                          .requerimientos.$error
                      "
                      class="red--text"
                    >
                      Debe tener como mínimo un requerimiento registrado
                    </h4>
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
                <v-col cols="12" sm="12">
                  <vue-dropzone
                    ref="myVueDropzone"
                    :options="dropzoneOptions"
                    id="dropzone"
                    @vdropzone-success="registerFile"
                    @vdropzone-removed-file="removedFile"
                  ></vue-dropzone>
                  <v-alert
                    type="error"
                    v-if="!$v.listImages.required"
                    class="mt-2"
                  >
                    Debe ingresar una firma para el registro
                  </v-alert>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-btn
                    color="success"
                    elevation="2"
                    width="100%"
                    @click="sendPlan"
                  >
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

import {
  required,
  minLength,
  between,
  maxLength,
} from "vuelidate/lib/validators";

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
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 250,
        maxFiles: 1,
        addRemoveLinks: true,
        dictDefaultMessage: "Ingrese su firma para el registro",
        acceptedFiles: "image/*",
        headers: { "My-Awesome-Header": "header value" },
        dictRemoveFile: "Remover firma",
        dictMaxFilesExceeded: "Tamaño excedido",
      },
      listImages: [],
      planResidentePsicologico: {
        tipo: "PlanIntervencionIndividual",
        historialcontenido: [],
        creadordocumento: "5f70b799c58b26540822c00f",
        fechacreacion: new Date(),
        area: "psicologico",
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
          numeroSesion: 0,
          requerimientos: [],
          codigoDocumento: "",
          titulo: "",
          firmas: [
            {
              urlfirma: "",
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
  validations: {
    listImages: {
      required,
    },
    objetivoEspecifico: {
      minLength: minLength(10),
    },
    tecnica: {
      minLength: minLength(10),
    },
    meta: {
      minLength: minLength(10),
    },
    indicador: {
      minLength: minLength(10),
    },
    requerimiento: {
      minLength: minLength(10),
    },
    residente: {
      id: {
        required,
      },
    },
    planResidentePsicologico: {
      contenido: {
        descripcion: {
          required,
          minLength: minLength(10),
        },
        objetivoEspecificos: {
          required,
          minLength: minLength(1),
        },
        tecnicas: {
          required,
          minLength: minLength(1),
        },
        metas: {
          required,
          minLength: minLength(1),
        },
        indicadores: {
          required,
          minLength: minLength(1),
        },
        frecuenciaSesion: {
          required,
          minLength: minLength(10),
        },
        numeroSesion: {
          required,
          between: between(2, 10),
        },
        requerimientos: {
          required,
          minLength: minLength(1),
        },
        titulo: {
          required,
          minLength: minLength(4),
        },
      },
    },
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
  methods: {
    closeDialog() {
      this.$emit("close-dialog");
    },
    addStep(step) {
      this.startStteper = step;
    },
    addObjetivo() {
      if (
        this.objetivoEspecifico != "" &&
        !this.$v.objetivoEspecifico.$invalid
      ) {
        this.planResidentePsicologico.contenido.objetivoEspecificos.push(
          this.objetivoEspecifico
        );
        this.objetivoEspecifico = "";
      }
    },
    addTecnica() {
      if (this.tecnica != "" && !this.$v.tecnica.$invalid) {
        this.planResidentePsicologico.contenido.tecnicas.push(this.tecnica);
        this.tecnica = "";
      }
    },
    addMeta() {
      if (this.meta != "" && !this.$v.meta.$invalid) {
        this.planResidentePsicologico.contenido.metas.push(this.meta);
        this.meta = "";
      }
    },
    addIndicador() {
      if (this.indicador != "" && !this.$v.indicador.$invalid) {
        this.planResidentePsicologico.contenido.indicadores.push(
          this.indicador
        );
        this.indicador = "";
      }
    },
    addRequerimiento() {
      if (this.requerimiento != "" && !this.$v.requerimiento.$invalid) {
        this.planResidentePsicologico.contenido.requerimientos.push(
          this.requerimiento
        );
        this.requerimiento = "";
      }
    },
    registerFile(file, response) {
      
      
      this.listImages.push(file);
    },
    removedFile(file, error, xhr) {
      let indexFile = this.listImages.findIndex((image) => image == file);

      if (indexFile != -1) {
        this.listImages.splice(indexFile, 1);
      }
    },
    async sendPlan() {
      this.$v.$touch();

      if (this.$v.$invalid) {
        this.messageSweet(
          "error",
          "Errores al intentar registrar",
          "Se ha presentado errores en los campos para el registro del Plan de Intervención",
          false
        );
      } else {
        for (let index = 0; index < this.listImages.length; index++) {
          let formData = new FormData();
          formData.append("file", this.listImages[0]);
          await axios
            .post("/Media", formData)
            .then((res) => {
               this.planResidentePsicologico.contenido.firmas[index].urlfirma =
                 res.data;
            })
            .catch((err) => {
              console.error(err);
            });
        }
        this.planResidentePsicologico.idresidente = this.residente.id;
        let planResidentePsicologico = {
          idresidente: this.residente.id,
          planIntervencionIndividualPsicologico: this.planResidentePsicologico,
        };
        axios
          .post("/PlanIntervencion/psicologico", planResidentePsicologico)
          .then((res) => {
            this.messageSweet(
              "success",
              "Registro del Plan de Intervencion",
              "Se registro el plan de intervencion de manera satisfactoria",
              true
            );
          })
          .catch((err) => {
            console.error(err);
          });
      }
    },
    messageSweet(icon, title, text, valid) {
      this.$swal({
        icon: icon,
        title: title,
        text: text,
      }).then((res) => {
        
        if(valid) {
          this.$emit('register-complete');
        }

      });
    },
  },
  computed: {
    formatDateBorn() {
      return this.residente != null
        ? this.residente.fechaNacimiento == ""
          ? ""
          : this.$moment(this.residente.fechaNacimiento).format("DD/MM/YYYY")
        : "";
    },
    objetivoEspecificoErrors() {
      const errors = [];

      if (!this.$v.objetivoEspecifico.$dirty) {
        return errors;
      }

      if (!this.$v.objetivoEspecifico.minLength) {
        errors.push("Debe ingresar como mínimo 10 caracteres");
      }

      return errors;
    },
    tecnicaErrors() {
      const errors = [];

      if (!this.$v.tecnica.$dirty) {
        return errors;
      }

      if (!this.$v.tecnica.minLength) {
        errors.push("Debe ingresar como mínimo 10 caracteres");
      }

      return errors;
    },
    metaErrors() {
      const errors = [];

      if (!this.$v.meta.$dirty) {
        return errors;
      }

      if (!this.$v.meta.minLength) {
        errors.push("Debe ingresar como mínimo 10 caracteres");
      }

      return errors;
    },
    indicadorErrors() {
      const errors = [];

      if (!this.$v.indicador.$dirty) {
        return errors;
      }

      if (!this.$v.indicador.minLength) {
        errors.push("Debe ingresar como mínimo 10 caracteres");
      }

      return errors;
    },
    requerimientoErrors() {
      const errors = [];

      if (!this.$v.requerimiento.$dirty) {
        return errors;
      }

      if (!this.$v.requerimiento.minLength) {
        errors.push("Debe ingresar como mínimo 10 caracteres");
      }

      return errors;
    },
    residenteIdErrors() {
      const errors = [];

      if (!this.$v.residente.id.$dirty) {
        return errors;
      }

      if (!this.$v.residente.id.required) {
        errors.push("El nombre del residente es requerido");
      }

      return errors;
    },
    planDescripcionErrors() {
      const errors = [];

      if (!this.$v.planResidentePsicologico.contenido.descripcion.$dirty) {
        return errors;
      }

      if (!this.$v.planResidentePsicologico.contenido.descripcion.minLength) {
        errors.push("La descripción debe tener como mínimo 10 caracteres");
      }

      if (!this.$v.planResidentePsicologico.contenido.descripcion.required) {
        errors.push("La descripción es requerida");
      }

      return errors;
    },
    planObjetivoEspecificosErrors() {
      const errors = [];

      if (
        !this.$v.planResidentePsicologico.contenido.objetivoEspecificos.$dirty
      ) {
        return errors;
      }

      if (
        !this.$v.planResidentePsicologico.contenido.objetivoEspecificos.required
      ) {
        errors.push("Los objetivos específicos son requerido");
      }

      if (
        !this.$v.planResidentePsicologico.contenido.objetivoEspecificos
          .minLength
      ) {
        errors.push("Se debe registrar un objetivos específico como mínimo");
      }

      return errors;
    },
    planTecnicasErrors() {
      const errors = [];

      if (!this.$v.planResidentePsicologico.contenido.tecnicas.$dirty) {
        return errors;
      }

      if (!this.$v.planResidentePsicologico.contenido.tecnicas.required) {
        errors.push("Las técnicas son requerido");
      }

      if (!this.$v.planResidentePsicologico.contenido.tecnicas.minLength) {
        errors.push("Se debe registrar una técnica como mínimo");
      }

      return errors;
    },
    planMetasErrors() {
      const errors = [];

      if (!this.$v.planResidentePsicologico.contenido.metas.$dirty) {
        return errors;
      }

      if (!this.$v.planResidentePsicologico.contenido.metas.required) {
        errors.push("Las metas son requerido");
      }

      if (!this.$v.planResidentePsicologico.contenido.metas.minLength) {
        errors.push("Se debe registrar una meta como mínimo");
      }

      return errors;
    },
    planIndicadoresErrors() {
      const errors = [];

      if (!this.$v.planResidentePsicologico.contenido.indicadores.$dirty) {
        return errors;
      }

      if (!this.$v.planResidentePsicologico.contenido.indicadores.required) {
        errors.push("Las indicadores son requerido");
      }

      if (!this.$v.planResidentePsicologico.contenido.indicadores.minLength) {
        errors.push("Se debe registrar un indicador como mínimo");
      }

      return errors;
    },
    planFrecuenciaSesionErrors() {
      const errors = [];

      if (!this.$v.planResidentePsicologico.contenido.frecuenciaSesion.$dirty) {
        return errors;
      }

      if (
        !this.$v.planResidentePsicologico.contenido.frecuenciaSesion.required
      ) {
        errors.push("La frecuencia de la sesión es requerido");
      }

      if (
        !this.$v.planResidentePsicologico.contenido.frecuenciaSesion.minLength
      ) {
        errors.push("Debe ingresar como mínimo 10 caracteres");
      }

      return errors;
    },
    planNumeroSesionErrors() {
      const errors = [];

      if (!this.$v.planResidentePsicologico.contenido.numeroSesion.$dirty) {
        return errors;
      }

      if (!this.$v.planResidentePsicologico.contenido.numeroSesion.required) {
        errors.push("El número de sesión es requerido");
      }

      if (!this.$v.planResidentePsicologico.contenido.numeroSesion.between) {
        errors.push("Debe estar entre el rango de 2 y 10 sesiones");
      }

      return errors;
    },
    planRequerimientosErrors() {
      const errors = [];

      if (!this.$v.planResidentePsicologico.contenido.requerimientos.$dirty) {
        return errors;
      }

      if (!this.$v.planResidentePsicologico.contenido.indicadores.required) {
        errors.push("Los requerimientos son requerido");
      }

      if (!this.$v.planResidentePsicologico.contenido.indicadores.minLength) {
        errors.push("Se debe registrar un requerimiento como mínimo");
      }

      return errors;
    },
    planTituloErrors() {
      const errors = [];

      if (!this.$v.planResidentePsicologico.contenido.titulo.$dirty) {
        return errors;
      }

      if (!this.$v.planResidentePsicologico.contenido.titulo.required) {
        errors.push("El título es requerido");
      }

      if (!this.$v.planResidentePsicologico.contenido.titulo.minLength) {
        errors.push("Debe ingresar como mínimo 4 caracteres");
      }

      return errors;
    },
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