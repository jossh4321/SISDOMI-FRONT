<template>
  <v-card>
    <v-card-title class="justify-center">Registrar avance del seguimiento</v-card-title>
    <v-card-text>
      <div class="container-user">
        <form>
          <v-card class="subcard card-padre" style="margin-bottom:20px">
            <v-card class="subcard" style="margin-bottom:7px" color="#e6f3ff">
              <span>Residente: {{this.residente.nombre}} {{this.residente.apellido}}</span>
            </v-card>
            <v-card class="subcard" color="#e6f3ff">
              <span>Fecha de Ingreso: {{ this.residente.fechaingreso | fomatoFecha}}</span>
            </v-card>
          </v-card>
          <v-card class="subcard card-padre" style="margin-bottom:20px">
            <v-card class="subcard" style="margin-bottom:7px" color="#e6f3ff">
              <span>Educador: {{this.user.usuario}}</span>
            </v-card>
            <v-card class="subcard" color="#e6f3ff">
              <span>Cargo: {{ this.user.rol.nombre }}</span>
            </v-card>
          </v-card>

          <v-textarea
            v-model="avanceSeg.contenido.observacion"
            label="Observación"
            auto-grow
            outlined
            rows="2"
            row-height="40"
            color="#009900"
            shaped
          ></v-textarea>
          <!-- @input="$v.avanceSeg.contenido.situacionactual.$touch()"
            @blur="$v.avanceSeg.contenido.situacionactual.$touch()"
            :error-messages="errorSituacionEducativa" -->

          <div>
            <vue-dropzone
              ref="myVueDropzone"
              @vdropzone-success="afterSuccess"
              @vdropzone-removed-file="afterRemoved"
              id="dropzone"
              :options="dropzoneOptions"
            ></vue-dropzone>
          </div>

          <v-card style="margin-top:30px;padding:5px 5px;background-color:#EAEAEA">
            <v-row>
              <v-col :cols="12" align="center">
                <div>
                  <v-card-text>
                    <img width="240" height="170" :src="this.user.datos.firma" alt />
                  </v-card-text>
                </div>
              </v-col>
            </v-row>
          </v-card>

          <v-row>
            <v-col>
              <v-btn block @click="cerrarDialogo()" color="primary">
                <v-icon left>mdi-close-outline</v-icon>
                <span>Cerrar</span>
              </v-btn>
            </v-col>
            <v-col>
              <v-btn 
                @click="registrarInforme"
                block color="success">
                <v-icon left>mdi-page-next-outline</v-icon>
                <span>Registrar avance</span>
              </v-btn>
            </v-col>
          </v-row>
        </form>
      </div>
      <v-dialog width="450px" v-model="cargaRegistro" persistent>
        <v-card height="300px">
          <v-card-title class="justify-center">Registrando el avance del seguimiento</v-card-title>
          <div>
            <v-progress-circular
              style="display: block;margin:40px auto;"
              :size="90"
              :width="9"
              color="red"
              indeterminate
            ></v-progress-circular>
          </div>
          <v-card-subtitle
            class="justify-center"
            style="font-weight:bold;text-align:center"
          >En unos momentos finalizaremos...</v-card-subtitle>
        </v-card>
      </v-dialog>
    </v-card-text>
  </v-card>
</template>
<script>
import axios from "axios";
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import { mapMutations, mapState, mapGetters } from "vuex";
import { required, minLength, email, helpers } from "vuelidate/lib/validators";
import moment from "moment";
function esTexto(value) {
  return /^[A-Za-z\sáéíóúÁÉÍÓÚñÑ]+$/.test(value);
}
function esParrafo(value) {
  return /^[A-Za-z\d\s.,;°"“()áéíóúÁÉÍÓÚñÑ-]+$/.test(value);
}
export default {
  props: ["residente"],
  components: {
    vueDropzone: vue2Dropzone
  },
  data() {
    return {
      titulo: "AAA",
      fileList: [],
      datemenu: false,
      step: 1,
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 250,
        maxFilesize: 10.0,
        maxFiles: 10,
        acceptedFiles: ".pdf",
        headers: { "My-Awesome-Header": "header value" },
        addRemoveLinks: true,
        dictDefaultMessage:
          "Seleccione un archivo anexo de su dispositivo o arrástrela aquí"
      },
      cargaRegistro: false,
      avanceSeg: {
        id: "",
        tipo: "AvanceSeguimiento",
        historialcontenido: [],
        creadordocumento: "",
        fechacreacion: null,
        area: "educativa",
        fase: "4",
        idresidente: "",
        estado: "creado",
        contenido: {
          observacion: "",
          anexos: [],
          codigodocumento: ""
        }
      }
    };
  },
  filters: {
    extencionString: cadena => {
      return cadena.length > 35 ? `${cadena.substring(0, 34)}...` : cadena;
    },
    numeracionListaString: (index, etiqueta) => {
      return `${etiqueta} ${++index}: `;
    },
    generarAvatar: datos => {
      return `${datos.nombre.substring(0, 1)}${datos.apellido.substring(0, 1)}`;
    },
    fomatoFecha: fecha => {
      var formato = moment(fecha);
      return formato.format("llll");
    }
  },
  created() {
      
  },
  methods: {
    async sendPDFFiles() {
      let listaTitulos = [];
      let listaanexos = this.fileList;
      for (let index = 0; index < this.fileList.length; index++) {
        let formData = new FormData();
        listaTitulos.push(this.fileList[index].name);
        formData.append("file", this.fileList[index]);
        await axios
          .post("/Media/archivos/pdf", formData)
          .then(res => {
            listaanexos[index] = res.data;
          })
          .catch(err => console.log(err));
      }
      for (let index = 0; index < this.fileList.length; index++) {
        this.avanceSeg.contenido.anexos.push({
          url: listaanexos[index],
          titulo: listaTitulos[index]
        });
      }
      console.log(this.avanceSeg.contenido.anexos);
    },
    async registrarInforme() {
      this.cargaRegistro = true;

      await this.sendPDFFiles();
      this.avanceSeg.creadordocumento = this.user.id;
      this.avanceSeg.idresidente = this.residente.id;

      //this.$v.avanceSeg.$touch();
      /*if (this.$v.avanceSeg.$invalid) {
        this.mensaje(
          "error",
          "..Oops",
          "Se encontraron errores en el formulario",
          "<strong>Verifique los campos Ingresados<strong>"
        );
      } else {*/
        console.log(this.avanceSeg);
        
        await axios
        .post("/informe/avanceseguimiento", this.avanceSeg)
          .then(res => {
            this.$emit("actualizar-progreso-fase1");
            this.cargaRegistro = false;
            this.cerrarDialogo();
          })
          .catch(err => console.log(err));
        
        await this.mensaje(
          "success",
          "Listo",
          "Informe registrado Satisfactoriamente",
          "<strong>Se redirigira a la interfaz de gestión<strong>"
        );

      //}
    },
    cerrarDialogo() {
      this.$emit("cerrar-modal-docf1");
    },
    async mensaje(icono, titulo, texto, footer) {
      await this.$swal({
        icon: icono,
        title: titulo,
        text: texto,
        footer: footer
      });
    },
    afterSuccess(file, response) {
      this.fileList.push(file);
    },
    afterRemoved(file, error, xhr) {
      this.fileList.forEach(function(car, index, object) {
        if (car === file) {
          object.splice(index, 1);
        }
      });
    },
    limpiarInforme() {
      return {
        id: "",
        tipo: "AvanceSeguimiento",
        historialcontenido: [],
        creadordocumento: "",
        fechacreacion: null,
        area: "educativa",
        fase: "4",
        idresidente: "",
        estado: "creado",
        contenido: {
          observacion: "",
          anexos: [],
          codigodocumento: ""
        }
      };
    },
    convertirFechas(fechaConvertir) {
      var fecha = new Date(fechaConvertir);
      return fecha.toLocaleDateString();
    },
  },
  computed: {
    ...mapGetters(["user"]),
    verifyColor() {
      return "red";
    },
    /*errorNombreIE() {
      const errors = [];
      if (!this.$v.informe.contenido.iereinsersion.nombre.$dirty) return errors;
      !this.$v.informe.contenido.iereinsersion.nombre.required &&
        errors.push("Debe ingresar el nombre de la Institución Educativa");
      !this.$v.informe.contenido.iereinsersion.nombre.esParrafo &&
        errors.push(
          "El nombre de la institucion educativa no debe contener caracteres especiales"
        );
      return errors;
    },*/
  },
  validations() {
    
  }
};
</script>

<style scoped>
.container-user {
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
