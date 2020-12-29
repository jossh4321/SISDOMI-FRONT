<template>
    <v-card>
      <v-card-title class="justify-center"
        >Registro de Informe Educativo Inicial</v-card-title
      >
      <v-stepper v-model="step">
        <v-stepper-header>
          <v-stepper-step editable step="1">
            Datos Generales
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step editable step="2">
            Análisis y Diagnóstico
          </v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content step="1">
            <div class="container-user">
              <form>
                  <v-card class="subcard card-padre">
                          <v-card class="subcard"  style="margin-bottom:7px" color="#e6f3ff">
                              <span>
                                Residente: {{this.residente.nombre}} {{this.residente.apellido}}
                              </span>
                          </v-card >
                          <v-card class="subcard" color="#e6f3ff">
                            <span>
                              Fecha de Ingreso: {{ this.residente.fechaingreso | fomatoFecha}}
                            </span>
                          </v-card>
                  </v-card>
                <v-textarea
                  label="Lugar de Evaluación"
                  v-model="informe.contenido.lugarevaluacion"
                  auto-grow
                  outlined
                  rows="2"
                  row-height="25"
                  color="#009900"
                  shaped
                  @input="$v.informe.contenido.lugarevaluacion.$touch()"
                  @blur="$v.informe.contenido.lugarevaluacion.$touch()"
                  :error-messages="errorLugarEvaluacion"
                ></v-textarea>

                <v-menu
                  v-model="datemenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="informe.contenido.fechaevaluacion"
                      label="Fecha de Evaluación"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      color="#009900"
                      @input="$v.informe.contenido.fechaevaluacion.$touch()"
                      @blur="$v.informe.contenido.fechaevaluacion.$touch()"
                      :error-messages="errorFechaEvaluacion"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="informe.contenido.fechaevaluacion"
                    @input="menu2 = false"
                    locale="es-es"
                  ></v-date-picker>
                </v-menu>

                <v-textarea
                  label="Situación Académica"
                  v-model="informe.contenido.situacionacademica"
                  auto-grow
                  outlined
                  rows="2"
                  row-height="40"
                  color="#009900"
                  shaped
                  @input="$v.informe.contenido.situacionacademica.$touch()"
                  @blur="$v.informe.contenido.situacionacademica.$touch()"
                  :error-messages="errorSituacionAcademica"
                ></v-textarea>

                <v-textarea
                  label="Análisis Académico y de comportamiento"
                  v-model="informe.contenido.analisisacademico"
                  auto-grow
                  outlined
                  rows="2"
                  row-height="40"
                  color="#009900"
                  shaped
                  @input="$v.informe.contenido.analisisacademico.$touch()"
                  @blur="$v.informe.contenido.analisisacademico.$touch()"
                  :error-messages="errorAnalisisAcademico"
                ></v-textarea>
                <v-row>
                  <v-col>
                    <v-btn block @click="step = 2" color="success">
                      <v-icon left>mdi-page-next-outline</v-icon>
                      <span>Continuar</span>
                    </v-btn>
                  </v-col>
                  <v-col>
                    <v-btn block @click="cerrarDialogo" color="primary">
                      <v-icon left>mdi-close-outline</v-icon>
                      <span>Cerrar</span>
                    </v-btn>
                  </v-col>
                </v-row>
              </form>
            </div>
          </v-stepper-content>
          <v-stepper-content step="2">
            <div class="container-user">
              <form>
                <v-card
                  style="margin-top:1%;margin-bottom:1%;padding-bottom:1%;background-color:#EAEAEA"
                >
                  <v-card
                    elevation="0"
                    style="background-color:#EAEAEA"
                    height="70"
                  >
                    <v-row style="margin:1%;heigh:100%" align="center">
                      <v-col :cols="8" align="left">
                        <v-text-field
                          v-model="conclusion"
                          label="Conclusiones y recomendaciones"
                          color="#009900"
                          @input="$v.conclusion.$touch()"
                          @blur="$v.conclusion.$touch()"
                          :error-messages="errorConclusion"
                        ></v-text-field>
                      </v-col>
                      <v-col :cols="4" align="right">
                        <v-btn
                          fab
                          small
                          dark
                          color="green"
                          @click="agregarConclusion"
                        >
                          <v-icon dark>
                            mdi-plus
                          </v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card>

                  <v-card
                    tile
                    elevation="0"
                    color="#FAFAFA"
                    style="margin:5px"
                    height="60"
                    v-for="conclusion in conclusiones"
                    :key="conclusion"
                  >
                    <v-row style="margin-left:10px;heigh:100%" align="center">
                      <v-col :cols="8" align="left">
                        <span>{{ conclusion }}</span>
                      </v-col>
                      <v-col :cols="4" align="right">
                        <div style="margin-right:20px">
                          <v-btn
                            fab
                            x-small
                            dark
                            color="red"
                            @click="eliminarConclusion(conclusion)"
                          >
                            <v-icon dark>
                              mdi-minus
                            </v-icon>
                          </v-btn>
                        </div>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-card>

                <div>
                  <vue-dropzone
                    ref="myVueDropzone"
                    @vdropzone-success="afterSuccess"
                    @vdropzone-removed-file="afterRemoved"
                    @vdropzone-complete="afterComplete"
                    id="dropzone"
                    :options="dropzoneOptions"
                  >
                  </vue-dropzone>
                </div>
                <v-card
                  style="margin-top:30px;padding:5px 5px;background-color:#EAEAEA"
                >
                  <v-card
                    elevation="0"
                    style="background-color:#EAEAEA"
                    height="70"
                  >
                    <v-row style="margin:1%;heigh:100%" align="center">
                      <v-col :cols="4" align="left">
                        <v-text-field
                          v-model="this.user.usuario"
                          label="Nombre"
                          color="#009900"
                          readonly
                        ></v-text-field>
                      </v-col>
                      <v-col :cols="4" align="left">
                        <v-text-field
                          v-model="this.user.rol.nombre"
                          label="Cargo"
                          color="#009900"
                          readonly
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-card>
                  <v-row>
                    <v-col :cols="12" align="center">
                      <div>
                        <v-card-text>
                              <img
                                width="240"
                                height="170"
                                :src="this.user.datos.firma"
                                alt=""
                              />
                        </v-card-text>
                      </div>
                    </v-col>
                  </v-row>
                </v-card>

                <v-row>
                  <v-col>
                    <v-btn block @click="registrarInforme" color="success">
                      <v-icon left>mdi-content-save-all-outline</v-icon>
                      <span>Registrar Informe</span>
                    </v-btn>
                  </v-col>
                  <v-col>
                    <v-btn block @click="cerrarDialogo" color="primary">
                      <v-icon left>mdi-close-outline</v-icon>
                      <span>Cerrar</span>
                    </v-btn>
                  </v-col>
                </v-row>
              </form>
            </div>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
      <v-dialog width="450px" v-model="cargaRegistro" persistent>
        <v-card height="300px">
          <v-card-title class="justify-center">Registrando del Informe Educativo Inicial</v-card-title>
          <div>
              <v-progress-circular
              style="display: block;margin:40px auto;"
              :size="90"
              :width="9"
              color="purple"
              indeterminate
            ></v-progress-circular>
          </div>
           <v-card-subtitle class="justify-center" style="font-weight:bold;text-align:center">En unos momentos finalizaremos...</v-card-subtitle>
        </v-card>
      </v-dialog>    
    </v-card>
</template>
<script>
import axios from "axios";
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import { mapMutations, mapState } from "vuex";
import { required, minLength, email, helpers } from "vuelidate/lib/validators";
import moment from "moment";
import { mapGetters } from "vuex";

function esTexto(value) {
  return /^[A-Za-z\sáéíóúÁÉÍÓÚñÑ]+$/.test(value);
}

function esParrafo(value) {
  return /^[A-Za-z\d\s.,;°"“()áéíóúÁÉÍÓÚñÑ]+$/.test(value);
}
export default {
  props:["residente"],
  components: {
    vueDropzone: vue2Dropzone,
  },
  data() {
    return {
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
          "Seleccione un archivo anexo de su dispositivo o arrástrela aquí",
      },
      conclusion: "",
      conclusiones: [],
      informe: {
        id: "",
        tipo: "InformeEducativoInicial",
        historialcontenido: [],
        creadordocumento: "",
        fechacreacion: null,
        area: "educativa",
        fase: "1",
        idresidente: this.residente.id,
        estado: "creado",
        contenido: {
          situacionacademica: "",
          analisisacademico: "",
          conclusiones: [],
          anexos: [],
          codigodocumento: "",
          lugarevaluacion: "",
          fechaevaluacion: "",
        },
      },
      imagen: "",
      cargaRegistro:false,
    };
  },
  async created() {
    this.conclusiones = "";
    this.conclusion = "";
  },
  methods: {
    ...mapMutations(["addInforme"]),
    async sendPDFFiles() {
      let listaTitulos = [];
      let listaanexos = this.fileList;
      for (let index = 0; index < this.fileList.length; index++) {
        let formData = new FormData();
        listaTitulos.push(this.fileList[index].name);
        formData.append("file", this.fileList[index]);
        await axios
          .post("/Media/archivos/pdf", formData)
          .then((res) => {
            listaanexos[index] = res.data;
          })
          .catch((err) => console.log(err));
      }
      for (let index = 0; index < this.fileList.length; index++) {
        this.informe.contenido.anexos.push({
          url: listaanexos[index],
          titulo: listaTitulos[index],
        });
      }
    },
    async registrarInforme() {
      await this.sendPDFFiles();
      this.informe.creadordocumento = this.user.id;
      this.$v.informe.$touch();
      if (this.$v.informe.$invalid) {
        console.log("hay errores");
        this.mensaje(
          "error",
          "..Oops",
          "Se encontraron errores en el formulario",
          "<strong>Verifique los campos Ingresados<strong>"
        );
      } else {
        console.log("no hay errores");
        console.log(this.informe);
        this.cargaRegistro = true;
        await axios
          .post("/informe/informeei", this.informe)
          .then((res) => {
            /*this.informe = res.data;
            var resi = this.listaresidentes.filter(function(residente) {
              return residente.id == res.data.idresidente;
            });
            var info = {
              id: res.data.id,
              tipo: res.data.tipo.replace(/([a-z])([A-Z])/g, "$1 $2"),
              fechaevaluacion: res.data.contenido.fechaevaluacion.split("T")[0],
              codigodocumento: res.data.contenido.codigodocumento,
              nombrecompleto: resi[0].nombre + " " + resi[0].apellido,
            };
            this.addInforme(info);*/
            this.$emit("actualizar-progreso-fase1");
            this.cargaRegistro = false;
            this.cerrarDialogo();
          })
          .catch((err) => console.log(err));
        await this.mensaje(
          "success",
          "Listo",
          "Informe registrado Satisfactoriamente",
          "<strong>Se redirigira a la interfaz de gestión<strong>"
        );
      }
      this.$v.conclusion.$reset();
    },
    resetInformeValidationState() {
      this.$refs.myVueDropzone.removeAllFiles();
      this.$v.informe.$reset();
      this.$v.urlfirma.$reset();
    },
    async mensaje(icono, titulo, texto, footer) {
      await this.$swal({
        icon: icono,
        title: titulo,
        text: texto,
        footer: footer,
      });
    },
    cerrarDialogo() {
      this.informe = this.limpiarInforme();
      this.step = 1;
      this.$emit("cerrar-modal-docf1");
    },
    agregarConclusion() {
      this.$v.conclusion.$touch();
      if (!this.$v.conclusion.$invalid) {
        let conclusiones = this.conclusion;
        this.informe.contenido.conclusiones.push(conclusiones);
        this.conclusiones = this.informe.contenido.conclusiones;
        this.conclusion = "";
        this.$v.conclusion.$reset();
      }
    },
    eliminarConclusion(conclusion) {
      this.conclusiones.forEach(function(car, index, object) {
        if (car === conclusion) {
          object.splice(index, 1);
        }
      });
    },
    afterSuccess(file, response) {
      console.log(file);
      this.fileList.push(file);
    },
    afterComplete(file) {
      if (file.status == "error") {
        this.$refs.myVueDropzone.removeFile(file);
      }
    },
    afterRemoved(file, error, xhr) {
      this.informe.contenido.anexos = "";
    },
    limpiarInforme() {
      return {
        informe: {
          id: "",
          tipo: "",
          historialcontenido: [],
          creadordocumento: "",
          fechacreacion: "",
          area: "",
          fase: "",
          idresidente: "",
          estado: "",
          contenido: {
            situacionacademica: "",
            analisisacademico: "",
            conclusiones: [],
            anexos: [],
            codigodocumento: "",
          },
        },
      };
    },
  },filters:{
        fomatoFecha: (fecha) =>{
            var formato = moment(fecha);
            return formato.format("llll");
        }
    },
  computed: {
    ...mapGetters(["user"]),
    errorLugarEvaluacion() {
      const errors = [];
      if (!this.$v.informe.contenido.lugarevaluacion.$dirty) return errors;
      !this.$v.informe.contenido.lugarevaluacion.required &&
        errors.push("Debe ingresar un lugar de evaluación obligatoriamente");
      !this.$v.informe.contenido.lugarevaluacion.minLength &&
        errors.push("El lugar de evaluación debe tener al menos 10 caracteres");
      return errors;
    },
    errorFechaEvaluacion() {
      const errors = [];
      if (!this.$v.informe.contenido.fechaevaluacion.$dirty) return errors;
      !this.$v.informe.contenido.fechaevaluacion.required &&
        errors.push("Debe ingresar la fecha de evaluación obligatoriamente");
      //validating whether the user are an adult
      var dateselected = new Date(this.informe.contenido.fechaevaluacion);
      var maxdate = new Date();
      !(dateselected.getTime() <= maxdate.getTime()) &&
        errors.push("La fecha no debe ser mayor a la actual");

      return errors;
    },
    errorSituacionAcademica() {
      const errors = [];
      if (!this.$v.informe.contenido.situacionacademica.$dirty) return errors;
      !this.$v.informe.contenido.situacionacademica.required &&
        errors.push("Debe ingresar la situación académica obligatoriamente");
      !this.$v.informe.contenido.situacionacademica.minLength &&
        errors.push(
          "La situación académica debe tener al menos 100 caracteres"
        );
      !this.$v.informe.contenido.situacionacademica.esParrafo &&
        errors.push(
          "La situación académica no debe contener caracteres especiales"
        );
      return errors;
    },
    errorAnalisisAcademico() {
      const errors = [];
      if (!this.$v.informe.contenido.analisisacademico.$dirty) return errors;
      !this.$v.informe.contenido.analisisacademico.required &&
        errors.push("Debe ingresar el análisis académico obligatoriamente");
      !this.$v.informe.contenido.analisisacademico.minLength &&
        errors.push("El análisis académico debe tener al menos 100 caracteres");
      !this.$v.informe.contenido.analisisacademico.esParrafo &&
        errors.push(
          "El análisis académico no debe contener caracteres especiales"
        );
      return errors;
    },
    errorConclusion() {
      const errors = [];
      if (!this.$v.conclusion.$dirty) return errors;
      !this.$v.conclusion.required &&
        errors.push("Debe registrar la conclusión obligatoriamente");
      !this.$v.conclusion.esParrafo &&
        errors.push(
          "La conclusión o recomendación no debe contener caracteres especiales"
        );
      return errors;
    },
  },
  validations() {
    return {
      informe: {
        contenido: {
          lugarevaluacion: {
            required,
            minLength: minLength(10),
          },
          situacionacademica: {
            required,
            minLength: minLength(100),
            esParrafo,
          },
          analisisacademico: {
            required,
            minLength: minLength(100),
            esParrafo,
          },
          fechaevaluacion: {
          required,
         },
        },
      },
      conclusion: {
        required,
        esParrafo,
      },
    };
  },
};
</script>
<style scoped>
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

.card-padre{
   border: 2px solid #EAEAEA;
   margin-bottom:25px;
   border-radius: 5px;
}
</style>
