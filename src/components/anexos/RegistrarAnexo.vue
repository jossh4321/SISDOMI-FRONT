<template>
  <v-card>
    <v-card-title class="justify-center">Registrar Anexo</v-card-title>

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
          filled
          label="Residente"
          outlined
          v-model.trim="anexo.idresidente"
          :items="listResidentes"
          @input="$v.anexo.idresidente.$touch()"
          @blur="$v.anexo.idresidente.$touch()"
          item-text="residente"
          item-value="idresidente"
        >
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

        <div>
          <vue-dropzone
            ref="myVueDropzone"
            id="dropzone"
            @vdropzone-success="afterSuccess"
            @vdropzone-removed-file="afterRemoved"
            :options="dropzoneOptions"
          >
          </vue-dropzone>
          <v-card color="red">
            <v-card-text class="text-center" style="color: white">
              Debe subir un anexo obligatoriamente
            </v-card-text>
          </v-card>
        </div>
        <v-divider class="divider-custom"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog">
            Cerrar
          </v-btn>
          <v-btn block color="accent">
            <v-icon left>mdi-mdi-content-save-all-outline</v-icon>
            <span>Registrar Anexo</span>
          </v-btn>
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
  components: {
    vueDropzone: vue2Dropzone,
  },
  data() {
    return {
      listResidentes: [],
      anexo: {
        id: "",
        titulo: "",
        descripcion: "",
        enlaces: [
          {
            link: "",
            descripcion: "",
          },
        ],
        idresidente: "",
        idcreador: "",
        fechacreacion: new Date(),
        area: "",
      },
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 250,
        maxFilesize: 3.0,
        maxFiles: 1,
        acceptedFiles: ".pdf",
        headers: { "My-Awesome-Header": "header value" },
        addRemoveLinks: true,
        dictDefaultMessage: "Seleccione el anexo respectivo o arrástrelo aquí",
      },
      anexosAux: [],
    };
  },
  methods: {
    ...mapMutations(["setResidentes"]),
    afterSuccess(file, response) {
      this.anexosAux.push(file);
    },
    afterRemoved(file, error, xhr) {
      let indexFile = this.anexosAux.findIndex((image) => image == file);

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
          this.$emit("register-complete");
        }
      });
    },
    limpiarAnexo() {
      return {
        id: "",
        titulo: "",
        descripcion: "",
        enlaces: [
          {
            link: "",
            descripcion: "",
          },
        ],
        idresidente: "",
        idcreador: "",
        fechacreacion: new Date(),
        area: "",
      };
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
    errorResidente() {
      const errors = [];
      if (!this.$v.anexo.idresidente.$dirty) return errors;
      !this.$v.anexo.idresidente.required &&
        errors.push("Debe ingresar un residente obligatoriamente");
      !this.$v.anexo.idresidente != "" &&
        errors.push("Debe seleccionar el residente inicialmente");
      return errors;
    },
  },
  async created() {
    this.obtenerResidentes();
  },
  validations() {
    return {
      anexo: {
        idresidente: {
          required,
        },
        descripcion: {
          required,
          minLength: minLength(4),
        },
        titulo: {
          required,
          minLength: minLength(4),
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