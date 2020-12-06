<template>
  <v-card>
    <v-card-title class="justify-center">Modificar Anexo</v-card-title>

    <div class="container-anexo">
      <form>
        <v-text-field
          v-model.trim="anexo.titulo"
          label="Ingrese el titulo del anexo del plan"
          outlined
          @input="$v.anexo.titulo.$touch()"
          @blur="$v.anexo.titulo.$touch()"
          :error-messages="errorTitulo"
          color="#009900"
        ></v-text-field>

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

        <v-textarea
          v-model.trim="anexo.descripcion"
          label="Ingrese la descripción del anexo"
          @input="$v.anexo.descripcion.$touch()"
          @blur="$v.anexo.descripcion.$touch()"
          height="25"
          rows="2"
          :error-messages="errorDescripcion"
          outlined
          color="#009900"
        ></v-textarea>

        <v-autocomplete
          filled
          v-model="anexo.area"
          label="Ingrese el área del anexo"
          :items="areas"
          item-value="value"
          item-text="text"
          @input="$v.anexo.area.$touch()"
          @blur="$v.anexo.area.$touch()"
          :error-messages="errorArea"
        >
        </v-autocomplete>

        <div>
          <vue-dropzone
            ref="myVueDropzone"
            id="dropzone"
            @vdropzone-success="afterSuccess"
            @vdropzone-removed-file="afterRemoved"
            @vdropzone-file-added="vfileAdded"
            :options="dropzoneOptions"
          >
          </vue-dropzone>
          <v-alert type="error" v-if="!$v.anexosAux.required" class="mt-2">
            Debe subir un anexo obligatoriamente
          </v-alert>
        </div>
        <v-divider class="divider-custom"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-col cols="12" sm="6" md="6">
            <v-btn block color="success" elevation="2" @click="modificarAnexo">
              <v-icon left>mdi-content-save-all-outline</v-icon>
              <span>Actualizar Anexo</span>
            </v-btn>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-btn color="error" elevation="2" block @click="closeDialog">
              <v-icon left>mdi-close-outline</v-icon>
              Cerrar
            </v-btn>
          </v-col>
        </v-card-actions>
      </form>
    </div>
  </v-card>
</template>

<script>
import axios from "axios";
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import { mapMutations, mapState } from "vuex";
import { required, minLength, between } from "vuelidate/lib/validators";
export default {
  props: ["anexo"],
  components: {
    vueDropzone: vue2Dropzone,
  },
  data() {
    return {
      listResidentes: [],
      areas: [
        { text: "Psicológica", value: "psicologica" },
        { text: "Social", value: "social" },
        { text: "Educativa", value: "educativa" },
      ],
      residente: {
        residente: "",
        id: "",
      },
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 250,
        acceptedFiles: ".pdf",
        headers: { "My-Awesome-Header": "header value" },
        addRemoveLinks: true,
        dictDefaultMessage: "Seleccione el anexo respectivo o arrástrelo aquí",
      },
      anexosAux: [],
      searchResidente: null,
      loadingSearch: false,
    };
  },
  mounted() {
    this.$refs.myVueDropzone.removeAllFiles();
    for (let index = 0; index < this.anexo.enlaces.length; index++) {
      var file = {
        size: 250,
        name: `${this.anexo.enlaces[index].descripcion}.pdf`,
        type: "application/pdf",
        url: `${this.anexo.enlaces[index].link}`,
        accepted: true,
      };
      var url = this.anexo.enlaces[index].link;
      this.$refs.myVueDropzone.manuallyAddFile(file, url);
      this.anexosAux.push(
        this.$refs.myVueDropzone.$refs.dropzoneElement.dropzone.files[index]
      );
    }
    axios
      .get("/residente/all")
      .then((res) => {
        let residentesMap = res.data.map(function (res) {
          return {
            residente: res.nombre + " " + res.apellido,
            numeroDocumento: res.numeroDocumento,
            id: res.id,
          };
        });
        this.listResidentes = residentesMap;
        if (residentesMap !== undefined) {
          let residente_temporal = residentesMap.find(
            (element) => element.id === this.anexo.idresidente
          );
          this.residente = {
            residente:
              residente_temporal.nombre + " " + residente_temporal.apellido,
            id: residente_temporal.id,
          };
        }
        this.loadingSearch = false;
      })
      .catch((error) => {
        console.error(error);
      });
  },
  methods: {
    ...mapMutations(["setResidentes"]),
    vfileAdded(file) {
      console.log(file);
    },
    async modificarAnexo() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.mensaje(
          "error",
          "..Oops",
          "Se encontraron errores en el formulario",
          "<strong>Verifique los campos Ingresados<strong>",
          false
        );
      } else {
        this.anexo.enlaces = [];
        for (let index = 0; index < this.anexosAux.length; index++) {
          if (this.anexosAux[index].url !== undefined) {
            this.anexo.enlaces.push({link: this.anexosAux[index].url, descripcion: "Enlace " + (index + 1)})
            /*this.anexo.enlaces[index].link = this.anexosAux[index].url;
            this.anexo.enlaces[index].descripcion = "Enlace " + (index + 1);*/
          } else {
            let formData = new FormData();

            formData.append("file", this.anexosAux[index]);

            await axios
              .post("/Media/archivos/pdf", formData)
              .then((res) => {
                this.anexo.enlaces.push({link: res.data, descripcion: "Enlace " + (index + 1)})
                /*this.anexo.enlaces[index].link = res.data;
                this.anexo.enlaces[index].descripcion = "Enlace " + (index + 1);*/
              })
              .catch((err) => {
                console.error(err);
              });
          }
        }

        this.anexo.idresidente = this.residente.id;

        await axios
          .put("/Anexo", this.anexo)
          .then((res) => {
            this.anexo = res.data;
            if (this.anexo.id !== "") {
              this.mensaje(
                "success",
                "Listo",
                "Anexo actualizado satisfactoriamente",
                "<strong>Se redirigiá a la Interfaz de Gestión<strong>",
                true
              );
            }
          })
          .catch((err) => console.log(err));
      }
    },
    afterSuccess(file, response) {
      this.anexosAux.push(file);
    },
    afterRemoved(file, error, xhr) {
      let indexFile = this.anexosAux.findIndex((document) => document == file);
      if (indexFile != -1) {
        this.anexosAux.splice(indexFile, 1);
      }
    },
    mensaje(icono, titulo, texto, footer, valid) {
      this.$swal({
        icon: icono,
        title: titulo,
        text: texto,
        footer: footer,
      }).then((res) => {
        if (valid) {
          this.$emit("modifier-complete");
        }
      });
    },
    closeDialog() {
      this.$emit("close-dialog");
    },
  },
  computed: {
    ...mapState(["residentes"]),
    verifyColor() {
      return "red";
    },
    errorTitulo() {
      const errors = [];
      if (!this.$v.anexo.titulo.$dirty) return errors;
      !this.$v.anexo.titulo.required &&
        errors.push("Debe ingresar un título de anexo obligatoriamente");
      !this.$v.anexo.titulo.minLength &&
        errors.push("El título de anexo debe poseer al menos 4 caracteres");
      return errors;
    },
    errorDescripcion() {
      const errors = [];
      if (!this.$v.anexo.descripcion.$dirty) return errors;
      !this.$v.anexo.descripcion.required &&
        errors.push("Debe ingresar una descripción obligatoriamente");
      !this.$v.anexo.descripcion.minLength &&
        errors.push("La descripción debe poseer al menos 4 caracteres");
      return errors;
    },
    errorArea() {
      const errors = [];
      if (!this.$v.anexo.area.$dirty) return errors;
      !this.$v.anexo.area.required &&
        errors.push("Debe ingresar un área obligatoriamente");
      return errors;
    },
    errorResidente() {
      const errors = [];
      if (!this.$v.residente.id.$dirty) return errors;
      !this.$v.residente.id.required &&
        errors.push("Debe ingresar un residente obligatoriamente");
      return errors;
    },
  },
  watch: {
    searchResidente(value) {
      if (value == null) {
        this.residente = {
          residente: "",
          id: "",
        };
      }

      if (this.listResidentes.length > 0) {
        return;
      }
      if (this.loadingSearch) {
        return;
      }

      this.loadingSearch = true;

      axios
        .get("/residente/all")
        .then((res) => {
          let residentesMap = res.data.map(function (res) {
            return {
              residente: res.nombre + " " + res.apellido,
              numeroDocumento: res.numeroDocumento,
              id: res.id,
            };
          });

          this.listResidentes = residentesMap;

          this.loadingSearch = false;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  validations() {
    return {
      residente: {
        id: {
          required,
        },
      },
      anexo: {
        descripcion: {
          required,
          minLength: minLength(4),
        },
        titulo: {
          required,
          minLength: minLength(4),
        },
        area: {
          required,
        },
      },
      anexosAux: {
        required,
      },
    };
  },
};
</script>

<style  scoped>
.container-anexo {
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