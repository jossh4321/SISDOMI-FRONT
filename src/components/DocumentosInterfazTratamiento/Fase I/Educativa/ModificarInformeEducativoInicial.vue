<template>
  <v-card>
    <v-card-title class="justify-center"
      >Modificación de Informe Educativo Inicial</v-card-title
    >
    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step editable step="1"> Datos Generales </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step editable step="2">
          Análisis y Diagnóstico
        </v-stepper-step>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content step="1">
          <div class="container-user">
            <form>
               <v-card class="subcard card-padre" style="margin-bottom:20px">
                          <v-card class="subcard"  style="margin-bottom:7px" color="#e6f3ff">
                              <span>
                                Residente: {{this.residenteDocumento.nombre}} {{this.residenteDocumento.apellido}}
                              </span>
                          </v-card >
                          <v-card class="subcard" color="#e6f3ff">
                            <span>
                              Fecha de Ingreso: {{ this.residenteDocumento.fechaingreso | fomatoFecha}}
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
                  <v-btn block @click="cerrarDialogo()" color="primary">
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
                style="
                  margin-top: 1%;
                  margin-bottom: 1%;
                  padding-bottom: 1%;
                  background-color: #eaeaea;
                "
              >
                <v-card
                  elevation="0"
                  style="background-color: #eaeaea"
                  height="70"
                >
                  <v-row style="margin: 1%; heigh: 100%" align="center">
                    <v-col :cols="8" align="left">
                      <v-text-field
                        v-model="conclusion"
                        label="Conclusiones y recomendaciones"
                        color="#009900"
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
                        <v-icon dark> mdi-plus </v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card>

                <v-card
                  tile
                  elevation="0"
                  color="#FAFAFA"
                  style="margin: 5px"
                  height="60"
                  v-for="conclusion in conclusiones"
                  :key="conclusion"
                >
                  <v-row style="margin-left: 10px; heigh: 100%" align="center">
                    <v-col :cols="8" align="left">
                      <span>{{ conclusion }}</span>
                    </v-col>
                    <v-col :cols="4" align="right">
                      <div style="margin-right: 20px">
                        <v-btn
                          fab
                          x-small
                          dark
                          color="red"
                          @click="eliminarConclusion(conclusion)"
                        >
                          <v-icon dark> mdi-minus </v-icon>
                        </v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-card>
              </v-card>
              <v-card
                style="margin-top:30px;padding:5px 5px;background-color:#EAEAEA"
              >
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
                  color="#FAFAFA"
                  style="margin-top:5px"
                  height="60"
                  v-for="(item, index) in informe.contenido.anexos"
                  :key="index"
                >
                  <v-row style="margin-left:10px;heigh:100%" align="center">
                    <v-col :cols="8">
                      <article>
                        <img
                          style="margin-right:5px;width:6% "
                          src="https://www.flaticon.es/svg/static/icons/svg/2991/2991112.svg"
                          alt="imagen documento"
                        />
                        <span style="font-size:18px"> {{ item.titulo }}</span>
                      </article>
                    </v-col>
                    <v-col :cols="2" align="center">
                      <template>
                        <v-btn
                          fab
                          icon=""
                          x-small
                          dark
                          color="#EAEAEA"
                          @click="verAnexo(index)"
                        >
                          <img
                            style="width:25% "
                            src="https://www.flaticon.es/svg/static/icons/svg/709/709612.svg"
                            alt="visualizar"
                          />
                        </v-btn>
                      </template>
                    </v-col>
                    <v-col :cols="2" align="right">
                      <div style="margin-right:20px">
                        <v-btn
                          fab
                          x-small
                          dark
                          color="red"
                          @click="eliminarAnexo(index)"
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

              <v-dialog
                v-model="dialogVistaPreviaAnexos"
                persistent
                max-width="600px"
              >
                <v-card align="center">
                  <v-card-title>
                    <span class="headline">Vista previa</span>
                  </v-card-title>
                  <v-card-text>
                    <iframe :src="pdf" width="100%" height="600"></iframe>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="cerrarVistaPreviaAnexo()"
                    >
                      Cerrar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

              <v-card
                  style="margin-top:30px;margin-bottom:10px;padding:5px 5px;background-color:#EAEAEA"
                >
                  <v-card
                    elevation="0"
                    style="background-color:#EAEAEA"
                    height="70"
                  >
                    <v-row style="margin:1%;heigh:100%" align="center">
                      <v-col :cols="4" align="left">
                        <v-text-field
                          v-model="this.usuario"
                          label="Nombre"
                          color="#009900"
                          readonly
                        ></v-text-field>
                      </v-col>
                      <v-col :cols="4" align="left">
                        <v-text-field
                          v-model="this.cargo"
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
                                :src="this.firma"
                                alt=""
                              />
                        </v-card-text>
                      </div>
                    </v-col>
                  </v-row>
                </v-card>

              <v-row>
                <v-col>
                  <v-btn
                    color="warning"
                    @click="actualizarInformeEducativoInicial()"
                    block
                  >
                    <v-icon left>mdi-briefcase-edit</v-icon>
                    <span>Actualizar Informe</span>
                  </v-btn>
                </v-col>

                <v-col>
                  <v-btn block @click="cerrarDialogo()" color="primary">
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
  </v-card>
</template>
<script>
import axios from "axios";
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import { mapMutations, mapState } from "vuex";
import { required, minLength, email, helpers } from "vuelidate/lib/validators";
import moment from "moment";

function esTexto(value) {
  return /^[A-Za-z\sáéíóúÁÉÍÓÚñÑ]+$/.test(value); 
}

function esParrafo(value) {
  return /^[A-Za-z\d\s.,;°"“()áéíóúÁÉÍÓÚñÑ]+$/.test(value); 
}

export default {
  props:["residenteDocumento"],
  components: {
    vueDropzone: vue2Dropzone,
  },
  data() {
    return {
      informeid: "",
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
          lugarevaluacion: "",
          fechaevaluacion: "",
        },
      },
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
      pdf: { tipo: "url", modificado: "no" },
      conclusion: "",
      conclusiones: [],
      anexo: "",
      anexos: [],
      imagen: "",
      fileList: [],
      dialogVistaPreviaAnexos : false,
      usuario: "",
      cargo:"",
      firma:"",
    };
  },
  filters: {
    fomatoFecha: (fecha) =>{
            var formato = moment(fecha);
            return formato.format("llll");
    }
  },
  async created() {
    await this.obtenerInformeId();
    this.informe = await this.loadInformeModificacion(this.informeid);
    this.cargarConclusiones();
    this.cargarAnexos();
    await this.obtenerCreador()
  },
  methods: {    
    ...mapMutations(["replaceInforme"]),
    async obtenerInformeId() {
      await axios
        .get("/documento/InformeEducativoInicial/residente/"+this.residenteDocumento.id)
        .then((x) => {
          this.informeid = x.data[0].id;
        })
        .catch((err) => console.log(err));
    },
    async loadInformeModificacion(idinforme) {
      var info = {};
      await axios
        .get("/informe/id?id=" + idinforme)
        .then((res) => {
          info = res.data;
          info.contenido.fechaevaluacion = res.data.contenido.fechaevaluacion.split("T")[0];
        })
        .catch((err) => console.log(err));
      return info;
    },
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
    async obtenerCreador() {
        await axios
        .get("/usuario/rol/permiso?id=" + this.informe.creadordocumento)
        .then((x) => {
          this.usuario = x.data.datos.nombre + " " + x.data.datos.apellido;
          this.cargo = x.data.rol.nombre;
          this.firma = x.data.datos.firma;
        })
        .catch((err) => console.log(err));
    },
    async actualizarInformeEducativoInicial() {
      await this.sendPDFFiles();
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
        await axios
          .put("/informe/informeei", this.informe)
          .then((res) => {
            this.informe = res.data;            
            var resi = this.residenteDocumento;         
            var info = {
              id: res.data.id,
              tipo: res.data.tipo.replace(/([a-z])([A-Z])/g, "$1 $2"),
              fechaevaluacion: res.data.contenido.fechaevaluacion.split("T")[0],
              codigodocumento: res.data.contenido.codigodocumento,
              nombrecompleto: resi.nombre + " " + resi.apellido,
            };
            this.replaceInforme(info);
            this.cerrarDialogo();
          })
          .catch((err) => console.log(err));
        await this.mensaje(
          "success",
          "listo",
          "Informe Actualizado Satisfactoriamente",
          "<strong>Se redirigira a la Interfaz de Gestión<strong>"
        );
      }
    },
    cerrarDialogo() {
      //this.resetUsuarioValidationState();
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
    cargarConclusiones() {
      this.conclusiones = this.informe.contenido.conclusiones;
    },
    cargarAnexos() {
      this.anexos = this.informe.contenido.anexos;
    },
    verAnexo(index) {
      this.pdf = this.informe.contenido.anexos[index].url;
      (this.dialogVistaPreviaAnexos = true);
    },
    cerrarVistaPreviaAnexo() {
      this.dialogVistaPreviaAnexos = false;
    },
    eliminarAnexo(anexo) {
      this.anexos.forEach(function(car, index, object) {
        if (car === anexo) {
          object.splice(index, 1);
        }
      });
    },
     afterSuccess(file, response) {
      this.fileList.push(file);
    },
    afterRemoved(file, error, xhr) {
      this.informe.contenido.anexos = "";
      this.$v.informe.contenido.anexos.$model = "";
    },
    afterComplete(file) {
      if(file.status == "error"){
         this.$refs.myVueDropzone.removeFile(file);
      }
    },
    async mensaje(icono, titulo, texto, footer) {
      await this.$swal({
        icon: icono,
        title: titulo,
        text: texto,
        footer: footer,
      });
    },
  },
  computed: {
    errorResidente() {
      const errors = [];
      if (!this.$v.informe.idresidente.$dirty) return errors;
      !this.$v.informe.idresidente.required &&
        errors.push("Debe seleccionar un residente obligatoriamente");
      return errors;
    },/*
    errorCreador() {
      const errors = [];
      if (!this.$v.informe.contenido.evaluador.$dirty) return errors;
      !this.$v.informe.contenido.evaluador.required &&
        errors.push("Debe seleccionar un educador obligatoriamente");
      return errors;
    },*/
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
      !(dateselected.getTime() < maxdate.getTime()) &&
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
        idresidente: {
          required,
        },        
        contenido: {
          lugarevaluacion: {
            required,
            minLength: minLength(10),
          },/*
          evaluador: {
            required,
          },*/
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
</style>
