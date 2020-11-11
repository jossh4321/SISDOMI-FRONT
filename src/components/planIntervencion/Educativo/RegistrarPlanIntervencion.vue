<template>
  <v-card>
    <v-card-title class="justify-center"
      >Registrar Plan de Intervención</v-card-title
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
                v-model="planI.nombreplan"
                label="Ingrese el nombre del plan"
                outlined
                color="#009900"
              ></v-text-field>

              <v-text-field
                v-model="planI.contenido.car"
                label="Ingrese el nombre del CAR"
                outlined
                color="#009900"
              ></v-text-field>

              <v-autocomplete
                filled
                label="Residente"
                outlined
                v-model="planI.idresidente"
                :items="listResidentes"
                item-text="residente"
                item-value="idresidente"
                @change="setFase"
              >
              </v-autocomplete>

              <v-text-field
                type="number"
                v-model.number="planI.contenido.edad"
                label="Ingrese la edad del residente"
                outlined
                color="#009900"
              ></v-text-field>

              <v-text-field
                type="number"
                v-model.number="planI.contenido.trimestre"
                label="Ingrese el trimestre"
                outlined
                color="#009900"
              ></v-text-field>

              <v-text-field
                v-model="planI.contenido.car"
                label="Ingrese el nombre del CAR"
                outlined
                color="#009900"
              ></v-text-field>

              <v-text-field
                v-model="planI.contenido.objetivoGeneral"
                label="Ingrese el objetivo general"
                outlined
                color="#009900"
              ></v-text-field>

              <v-container grid-list-md text-xs-center>
                <v-layout row wrap>
                  <v-flex xs10>
                    <v-text-field
                      v-model="objetivoespecificoAux"
                      label="Ingrese los objetivos específicos"
                      outlined
                      color="#009900"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs2>
                    <v-btn @click="addObjEspecifico">Añadir</v-btn>
                  </v-flex>
                </v-layout>
              </v-container>

              <v-list flat>
                <v-list-item
                  v-for="(item, i) in planI.contenido.objetivoEspecificos"
                  :key="i"
                >
                  <v-list-item-icon>
                    <v-icon
                      @click="deleteItemObjEspecificios(i)"
                      left
                      color="red"
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
                      v-model="casoAux"
                      label="Casos/Problemas"
                      outlined
                      color="#009900"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs2>
                    <v-btn @click="addCaso">Añadir</v-btn>
                  </v-flex>
                </v-layout>
              </v-container>

              <v-list flat>
                <v-list-item
                  v-for="(item, i) in planI.contenido.casos_problemas"
                  :key="i"
                >
                  <v-list-item-icon>
                    <v-icon @click="deleteItemCasos(i)" left color="red"
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
                      v-model="actividadAux"
                      label="Actividades/Estrategias"
                      auto-grow
                      outlined
                      rows="2"
                      row-height="25"
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
                      v-model="indicadorAux"
                      label="Indicadores"
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
                      v-model="metaAux"
                      label="Meta"
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

              <div>
                <vue-dropzone
                  ref="myVueDropzone"
                  @vdropzone-success="afterSuccess"
                  @vdropzone-removed-file="afterRemoved"
                  id="dropzone"
                  :options="dropzoneOptions"
                >
                </vue-dropzone>
              </div>
              <v-divider class="divider-custom"></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDialog">
                  Cerrar
                </v-btn>
                <v-btn block color="accent">
                  <v-icon left>mdi-mdi-content-save-all-outline</v-icon>
                  <span>Registrar Plan</span>
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
import { required, minLength } from "vuelidate/lib/validators";

export default {
  components: {
    vueDropzone: vue2Dropzone,
  },
  data() {
    return {
      planI: {
        id: "",
        tipo: "PlanIntervencionIndividual",
        idresidente: "",
        nombreplan: "",
        fase: "",
        estado: "creado",
        creadordocumento: "Piero Erickson Lavado Cervantes",
        contenido: {
          car: "",
          edad: 0,
          trimestre: 1,
          objetivoGeneral: "",
          objetivoEspecificos: [],
          casos_problemas: [],
          estrategias: [],
          indicadores: [],
          metas: [],
          firma: {
            urlfirma: "",
            nombre: "Piero Erickson Lavado Cervantes",
            cargo: "Educador",
          },
        },
      },
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
      objetivoespecificoAux: "",
      casoAux: "",
      actividadAux: "",
      indicadorAux: "",
      metaAux: "",
      listResidentes: [],
      firmaAux: null,
    };
  },
  methods: {
    ...mapMutations(["setResidentes"]),
    afterSuccess(file, response) {
      this.firmaAux = file.dataURL;
      //this.$v.planI.firma.$model = file.dataURL;
    },
    afterRemoved(file, error, xhr) {
      this.planI.firma.imagen = "";
      //this.$v.planI.firma.$model = "";
    },
    mensaje(icono, titulo, texto, footer) {
      this.$swal({
        icon: icono,
        title: titulo,
        text: texto,
        footer: footer,
      });
    },
    deleteItemObjEspecificios(index) {
      this.planI.contenido.objetivoEspecificos.splice(index, 1);
    },
    deleteItemCasos(index) {
      this.planI.contenido.casos_problemas.splice(index, 1);
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
    addObjEspecifico() {
      this.planI.contenido.objetivoEspecificos.push(this.objetivoespecificoAux);
      this.objetivoespecificoAux = "";
    },
    addCaso() {
      this.planI.contenido.casos_problemas.push(this.casoAux);
      this.casoAux = "";
    },
    addActividad() {
      this.planI.contenido.estrategias.push(this.actividadAux);
      this.actividadAux = "";
    },
    addIndicador() {
      this.planI.contenido.indicadores.push(this.indicadorAux);
      this.indicadorAux = "";
    },
    addMeta() {
      this.planI.contenido.metas.push(this.metaAux);
      this.metaAux = "";
    },
    closeDialog() {
      this.$emit("close-dialog");
    },
    setFase() {
      let usuariacar = this.residentes.find(
        (x) => x.id === this.planI.idresidente
      );
      this.planI.fase = usuariacar.progreso[usuariacar.progreso.length-1].nombre;
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
  },
  async created() {
    this.obtenerResidentes();
  },
  validations() {
    return {
      planI: {
        idresidente: {
          required,
        },
        nombreplan: {
          required,
        },
        contenido: {
          car: {
            required,
          },
          edad: {
            required,
            between: between(12, 23),
          },
          trimestre: {
            required,
            between: between(1, 4),
          },
          objetivoGeneral: {
            required,
          },
          objetivoEspecificos: {
            required,
          },
          casos_problemas: {
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
          /*  firma: {
            urlfirma: ""
          }, */
        },
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