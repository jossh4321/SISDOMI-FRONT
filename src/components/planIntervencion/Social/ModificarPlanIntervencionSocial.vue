<template>
  <v-card>
    <v-card-title class="justify-center"
      >Modificar Plan de Intervención Social</v-card-title
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
              <v-text-field
                v-model.trim="planI.contenido.titulo"
                label="Ingrese el nombre del plan"
                @input="$v.planI.contenido.titulo.$touch()"
                @blur="$v.planI.contenido.titulo.$touch()"
                :error-messages="errorTitulo"
                outlined
                color="#009900"
              ></v-text-field>

              <!-- <v-autocomplete
                filled
                label="Residente"
                outlined
                @input="$v.planI.idresidente.$touch()"
                @blur="$v.planI.idresidente.$touch()"
                :error-messages="errorResidente"
                v-model="planI.idresidente"
                :items="listResidentes"
                item-text="residente"
                item-value="idresidente"
                @change="setFase"
              >
              </v-autocomplete> -->

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

              <v-container grid-list-md text-xs-center>
                <v-layout row wrap>
                  <v-flex xs10>
                    <v-text-field
                      v-model.trim="objetivosAux"
                      label="Ingrese los objetivos del plan de intervención"
                      @blur="$v.planI.contenido.objetivos.$touch()"
                      :error-messages="errorObjetivos"
                      outlined
                      color="#009900"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs2>
                    <v-btn @click="addObjetivos">Añadir</v-btn>
                  </v-flex>
                </v-layout>
              </v-container>

              <v-list flat>
                <v-list-item
                  v-for="(item, i) in planI.contenido.objetivos"
                  :key="i"
                >
                  <v-list-item-icon>
                    <v-icon @click="deleteItemObjetivos(i)" left color="red"
                      >mdi-minus-circle</v-icon
                    >
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="item"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDialog">
                  Cerrar
                </v-btn>
                <v-btn block @click="step = 2" color="primary">
                  <v-icon left>mdi-page-next-outline</v-icon>
                  <span>Continuar</span>
                </v-btn>
              </v-card-actions>
            </form>
          </div>
        </v-stepper-content>
        <v-stepper-content step="2">
          <div class="container-user">
            <form>
              <br />

              <v-container grid-list-md text-xs-center>
                <v-layout row wrap>
                  <v-flex xs10>
                    <v-text-field
                      v-model.trim="actividadAux"
                      label="Actividades/Estrategias"
                      @blur="$v.planI.contenido.estrategias.$touch()"
                      :error-messages="errorEstrategias"
                      outlined
                      color="#009900"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs2>
                    <v-btn @click="addActividad">Añadir</v-btn>
                  </v-flex>
                </v-layout>
              </v-container>

              <v-list flat>
                <v-list-item
                  v-for="(item, i) in planI.contenido.estrategias"
                  :key="i"
                >
                  <v-list-item-icon>
                    <v-icon @click="deleteItemActividades(i)" left color="red"
                      >mdi-minus-circle</v-icon
                    >
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="item"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>

              <v-container grid-list-md text-xs-center>
                <v-layout row wrap>
                  <v-flex xs10>
                    <v-text-field
                      v-model.trim="indicadorAux"
                      label="Indicadores"
                      @blur="$v.planI.contenido.indicadores.$touch()"
                      :error-messages="errorIndicadores"
                      outlined
                      color="#009900"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs2>
                    <v-btn @click="addIndicador">Añadir</v-btn>
                  </v-flex>
                </v-layout>
              </v-container>

              <v-list flat>
                <v-list-item
                  v-for="(item, i) in planI.contenido.indicadores"
                  :key="i"
                >
                  <v-list-item-icon>
                    <v-icon @click="deleteItemIndicadores(i)" left color="red"
                      >mdi-minus-circle</v-icon
                    >
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="item"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>

              <v-container grid-list-md text-xs-center>
                <v-layout row wrap>
                  <v-flex xs10>
                    <v-text-field
                      v-model.trim="metaAux"
                      label="Metas"
                      @blur="$v.planI.contenido.metas.$touch()"
                      :error-messages="errorMetas"
                      outlined
                      color="#009900"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs2>
                    <v-btn @click="addMeta">Añadir</v-btn>
                  </v-flex>
                </v-layout>
              </v-container>

              <v-list flat>
                <v-list-item
                  v-for="(item, i) in planI.contenido.metas"
                  :key="i"
                >
                  <v-list-item-icon>
                    <v-icon @click="deleteItemMetas(i)" left color="red"
                      >mdi-minus-circle</v-icon
                    >
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="item"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>

              <v-container grid-list-md text-xs-center>
                <v-layout row wrap>
                  <v-flex xs10>
                    <v-text-field
                      v-model="avanceAux"
                      label="Avances"
                      @blur="$v.planI.contenido.avances.$touch()"
                      :error-messages="errorAvances"
                      outlined
                      color="#009900"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs2>
                    <v-btn @click="addAvance">Añadir</v-btn>
                  </v-flex>
                </v-layout>
              </v-container>

              <v-list flat>
                <v-list-item
                  v-for="(item, i) in planI.contenido.avances"
                  :key="i"
                >
                  <v-list-item-icon>
                    <v-icon @click="deleteItemAvance(i)" left color="red"
                      >mdi-minus-circle</v-icon
                    >
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="item"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>

              <div>
                <vue-dropzone
                  ref="myVueDropzone"
                  @vdropzone-success="afterSuccess"
                  @vdropzone-removed-file="afterRemoved"
                  id="dropzone"
                  :options="dropzoneOptions"
                >
                </vue-dropzone>
                <v-card v-if="errorImagen" color="red">
                  <v-card-text class="text-center" style="color: white">
                    Debe subir una firma obligatoriamente
                  </v-card-text>
                </v-card>
              </div>
              <v-divider class="divider-custom"></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDialog">
                  Cerrar
                </v-btn>
                <v-btn block color="accent" @click="modificarPlan">
                  <v-icon left>mdi-mdi-content-save-all-outline</v-icon>
                  <span>Modificar Plan</span>
                </v-btn>
              </v-card-actions>
            </form>
          </div>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-card>
</template>
<script>
import axios from "axios";
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import { mapMutations, mapState } from "vuex";
import { required, minLength, between } from "vuelidate/lib/validators";

export default {
  props: ["planI"],
  components: {
    vueDropzone: vue2Dropzone,
  },
  data() {
    return {
      planIntervencion: {},
      datemenu: false,
      step: 1,
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 250,
        maxFilesize: 3.0,
        maxFiles: 1,
        acceptedFiles: ".jpg",
        headers: { "My-Awesome-Header": "header value" },
        addRemoveLinks: true,
        dictDefaultMessage:
          "Seleccione la firma del responsable o Arrastrela Aqui",
      },
      objetivosAux: "",
      avanceAux: "",
      actividadAux: "",
      indicadorAux: "",
      metaAux: "",
      listResidentes: [],
      firmaAux: [],
    };
  },
  methods: {
    ...mapMutations(["setResidentes"]),
    async modificarPlan() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log("Hay errores");
        this.mensaje(
          "error",
          "..Oops",
          "Se encontraron errores en el formulario",
          "<strong>Verifique los campos Ingresados<strong>"
        );
      } else {
        for (let index = 0; index < this.firmaAux.length; index++) {
          let formData = new FormData();

          formData.append("file", this.firmaAux[0]);

          await axios
            .post("/Media", formData)
            .then((res) => {
              this.planI.contenido.firmas[index].urlfirma = res.data;
            })
            .catch((err) => {
              console.error(err);
            });
        }

        this.planIntervencion = this.planI;

        await axios
          .put("/PlanIntervencion/social", this.planIntervencion)
          .then((res) => {
            if (res.data.id !== "") {
              this.resetPlanIValidationState();
              this.mensaje(
                "success",
                "Listo",
                "Plan modificado satisfactoriamente",
                "<strong>Se redirigirá a la Interfaz de Gestión<strong>"
              );
              this.closeDialog();
            }
          })
          .catch((err) => console.log(err));
      }
    },
    resetPlanIValidationState() {
      this.$refs.myVueDropzone.removeAllFiles();
      this.$v.planI.$reset();
      this.$v.firmaAux.$reset();
    },
    afterSuccess(file, response) {
      this.firmaAux.push(file);
    },
    afterRemoved(file, error, xhr) {
      let indexFile = this.firmaAux.findIndex((image) => image == file);

      if (indexFile != -1) {
        this.firmaAux.splice(indexFile, 1);
      }
    },
    mensaje(icono, titulo, texto, footer) {
      this.$swal({
        icon: icono,
        title: titulo,
        text: texto,
        footer: footer,
      });
    },
    deleteItemObjetivos(index) {
      this.planI.contenido.objetivos.splice(index, 1);
    },
    deleteItemAvance(index) {
      this.planI.contenido.avances.splice(index, 1);
    },
    deleteItemActividades(index) {
      this.planI.contenido.estrategias.splice(index, 1);
    },
    deleteItemIndicadores(index) {
      this.planI.contenido.indicadores.splice(index, 1);
    },
    deleteItemMetas(index) {
      this.planI.contenido.metas.splice(index, 1);
    },
    addObjetivos() {
      if (this.objetivosAux != "") {
        this.planI.contenido.objetivos.push(this.objetivosAux);
        this.objetivosAux = "";
      }
    },
    addAvance() {
      if (this.avanceAux != "") {
        this.planI.contenido.avances.push(this.avanceAux);
        this.avanceAux = "";
      }
    },
    addActividad() {
      if (this.actividadAux != "") {
        this.planI.contenido.estrategias.push(this.actividadAux);
        this.actividadAux = "";
      }
    },
    addIndicador() {
      if (this.indicadorAux != "") {
        this.planI.contenido.indicadores.push(this.indicadorAux);
        this.indicadorAux = "";
      }
    },
    addMeta() {
      if (this.metaAux != "") {
        this.planI.contenido.metas.push(this.metaAux);
        this.metaAux = "";
      }
    },
    closeDialog() {
      this.$emit("close-dialog");
    },
    setFase() {
      let usuariacar = this.residentes.find(
        (x) => x.id === this.planI.idresidente
      );
      this.planI.fase =
        usuariacar.progreso[usuariacar.progreso.length - 1].nombre;
    },
    async mensaje(icono, titulo, texto, footer) {
      await this.$swal({
        icon: icono,
        title: titulo,
        text: texto,
        footer: footer,
      });
    },
    async obtenerResidentes() {
      await axios
        .get("/residente/all")
        .then((res) => {
          this.setResidentes(res.data);
          res.data.forEach((element) => {
            //this.listResidentes.splice(0,0,element.apellido)
            this.listResidentes.push({
              residente: element.apellido + " " + element.nombre,
              idresidente: element.id,
            });
          });
        })
        .catch((err) => console.log(err));
    },
  },
  computed: {
    ...mapState(["residentes"]),
    verifyColor() {
      return "red";
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
      if (!this.$v.planI.idresidente.$dirty) return errors;
      !this.$v.planI.idresidente.required &&
        errors.push("Debe ingresar un residente obligatoriamente");
      !this.$v.planI.idresidente != "" &&
        errors.push("Debe seleccionar el residente inicialmente");
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
      !this.$v.planI.contenido.objetivos.required &&
        errors.push(
          "Debe ingresar al menos un objetivo específico obligatoriamente"
        );
      return errors;
    },
    errorAvances() {
      const errors = [];
      if (!this.$v.planI.contenido.avances.$dirty) return errors;
      !this.$v.planI.contenido.avances.required &&
        errors.push("Debe ingresar al menos un avance obligatoriamente");
      return errors;
    },
    errorEstrategias() {
      const errors = [];
      if (!this.$v.planI.contenido.estrategias.$dirty) return errors;
      !this.$v.planI.contenido.estrategias.required &&
        errors.push("Debe ingresar al menos una estrategia obligatoriamente");
      return errors;
    },
    errorIndicadores() {
      const errors = [];
      if (!this.$v.planI.contenido.indicadores.$dirty) return errors;
      !this.$v.planI.contenido.indicadores.required &&
        errors.push("Debe ingresar al menos un indicador obligatoriamente");
      return errors;
    },
    errorMetas() {
      const errors = [];
      if (!this.$v.planI.contenido.metas.$dirty) return errors;
      !this.$v.planI.contenido.metas.required &&
        errors.push("Debe ingresar al menos una meta obligatoriamente");
      return errors;
    },
    errorImagen() {
      return this.$v.firmaAux.required == false &&
        this.$v.firmaAux.$dirty == true
        ? true
        : false;
    },
  },
  async created() {
    this.obtenerResidentes();
  },
  validations() {
    return {
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
          },
          avances: {
            required,
          },
          estrategias: {
            required,
          },
          indicadores: {
            required,
          },
          metas: {
            required,
          },
          titulo: {
            required,
            minLength: minLength(4),
          },
          /*  firma: {
            urlfirma: ""
          }, */
        },
      },
      firmaAux: {
        required,
      },
    };
  },
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
</style>