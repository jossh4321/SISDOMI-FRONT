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
              <v-autocomplete
                :items="listaresidentes"
                v-model="informe.idresidente"
                filled
                chips
                dense
                outlined
                color="#009900"
                label="Usuaria CAR"
                item-text="nombre"
                item-value="id"
                @input="$v.informe.idresidente.$touch()"
                @blur="$v.informe.idresidente.$touch()"
                :error-messages="errorResidente"
              >
                <template v-slot:selection="data">
                  <v-chip
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    style="margin-top: 5px"
                  >
                    <v-avatar left color="#b3b3ff" size="24">
                      <span style="font-size: 12px">RT</span>
                    </v-avatar>
                    {{ data.item.nombre + " " + data.item.apellido }}
                  </v-chip>
                </template>
                <template v-slot:item="data">
                  <template>
                    <v-list-item-avatar>
                      <v-avatar left color="#b3b3ff" size="24">
                        <span style="font-size: 12px">UC</span>
                      </v-avatar>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title
                        >Nombre completo: {{ data.item.nombre }}
                        {{ data.item.apellido }}
                      </v-list-item-title>
                      <v-list-item-subtitle
                        >Nro. Documento:
                        {{ data.item.numerodocumento }}</v-list-item-subtitle
                      >
                    </v-list-item-content>
                  </template>
                </template>
              </v-autocomplete>

              <v-autocomplete
                :items="listaeducadores"
                filled
                chips
                dense
                outlined
                v-model="informe.creadordocumento"
                color="#009900"
                label="Educador responsable"
                item-text="usuario"
                item-value="id"
                @input="$v.informe.creadordocumento.$touch()"
                @blur="$v.informe.creadordocumento.$touch()"
                :error-messages="errorCreador"
              >
                <template v-slot:selection="data">
                  <v-chip
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    style="margin-top: 5px"
                  >
                    <v-avatar left color="#b3b3ff" size="24">
                      <span style="font-size: 12px">RT</span>
                    </v-avatar>
                    {{ data.item.datos.nombre }}
                  </v-chip>
                </template>
                <template v-slot:item="data">
                  <template>
                    <v-list-item-avatar>
                      <v-avatar left color="#b3b3ff" size="24">
                        <span style="font-size: 12px">UC</span>
                      </v-avatar>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title
                        >Nombre completo: {{ data.item.datos.nombre }}
                        {{ data.item.datos.apellido }}
                      </v-list-item-title>
                      <v-list-item-subtitle
                        >Nro. Documento:
                        {{
                          data.item.datos.numerodocumento
                        }}</v-list-item-subtitle
                      >
                    </v-list-item-content>
                  </template>
                </template>
              </v-autocomplete>

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
                    v-model="informe.fechacreacion"
                    label="Fecha de Evaluación"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    color="#009900"
                    @input="$v.informe.fechacreacion.$touch()"
                    @blur="$v.informe.fechacreacion.$touch()"
                    :error-messages="errorFechaEvaluacion"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="informe.fechacreacion"
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
                style="
                  margin-top: 30px;
                  padding: 5px 5px;
                  background-color: #eaeaea;
                "
              >
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
                <!-- <v-card
                tile
                elevation="0"
                color="#FAFAFA"
                style="margin: 5px"
                height="60"
                v-for="anexo in anexos"
                :key="anexo"
              >
                <v-row style="margin-left: 10px; heigh: 100%" align="center">
                  <v-col :cols="8" align="left">
                    <span>{{ anexo }}</span>
                  </v-col>
                  <v-col :cols="4" align="right">
                    <div style="margin-right: 20px">
                      <v-btn
                        fab
                        x-small
                        dark
                        color="red"
                        @click="eliminarAnexo(anexo)"
                      >
                        <v-icon dark> mdi-minus </v-icon>
                      </v-btn>
                    </div>
                  </v-col>
                </v-row>
              </v-card> -->
              </v-card>
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
                          v-model="firmas.nombre"
                          label="Nombre"
                          color="#009900"
                          @input="$v.firmas.nombre.$touch()"
                          @blur="$v.firmas.nombre.$touch()"
                          :error-messages="errorNombreFirma"
                        ></v-text-field>
                      </v-col>
                      <v-col :cols="4" align="left">
                        <v-text-field
                          v-model="firmas.cargo"
                          label="Cargo"
                          color="#009900"
                          @input="$v.firmas.cargo.$touch()"
                          @blur="$v.firmas.cargo.$touch()"
                          :error-messages="errorCargoFirma"
                        ></v-text-field>
                      </v-col>
                      <v-col :cols="4" align="right">
                        <v-btn
                          fab
                          small
                          dark
                          color="green"
                          @click="agregarFirma"
                        >
                          <v-icon dark>
                            mdi-plus
                          </v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card>
                  <v-row>
                    <v-col :cols="12" align="right">
                      <div>
                        <vue-dropzone
                          ref="myVueDropzone"
                          @vdropzone-success="afterSuccess2"
                          @vdropzone-removed-file="afterRemoved2"
                          id="dropzone2"
                          :options="dropzoneOptions2"
                        >
                        </vue-dropzone>
                      </div>
                      <v-card v-if="errorUrlFirma" color="red">
                        <v-card-text class="text-center" style="color: white"
                          >Debe Subir una imagen de la firma
                          obligatoriamente</v-card-text
                        >
                      </v-card>
                      <v-divider class="divider-custom"></v-divider>
                    </v-col>
                  </v-row>
                  <v-card
                    color="#FAFAFA"
                    style="margin-top:5px"
                    height="60"
                    v-for="(item, index) in informe.contenido.firmas"
                    :key="index"
                  >
                    <v-row style="margin-left:10px;heigh:100%" align="center">
                      <v-col :cols="8">
                        <article>
                          <img
                            style="margin-right:5px;width:6% "
                            src="https://www.flaticon.es/svg/static/icons/svg/996/996443.svg"
                            alt="imagen usuario"
                          />
                          <span style="font-size:18px">
                            {{ item.nombre }} {{ item.cargo }}</span
                          >
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
                            @click="verFirma(index)"
                          >
                            <img
                              style="width:25% "
                              src="https://www.flaticon.es/svg/static/icons/svg/1/1180.svg"
                              alt="firma"
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
                            @click="eliminarFirma(index)"
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
                v-model="dialogVistaPreviaFirma"
                persistent
                max-width="600px"
              >
                <v-card align="center">
                  <v-card-title>
                    <span class="headline">Vista previa</span>
                  </v-card-title>
                  <v-card-text>
                    <img
                      v-if="imagen.includes('http')"
                      width="100%"
                      height="100%"
                      :src="imagen"
                      alt=""
                    />
                    <img
                      v-else
                      width="100%"
                      height="100%"
                      :src="'data:image/jpeg;base64,' + imagen"
                      alt=""
                    />
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="cerrarVistaPreviaFirma()"
                    >
                      Cerrar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

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
import ActualizarInformeEducativoEvolutivoVue from "./ActualizarInformeEducativoEvolutivo.vue";

function esTexto(value) {
  return /^[A-Za-z\s]+$/.test(value); //acepta solo texto y espacios en blanco
}

function esParrafo(value) {
  return /^[A-Za-z\d\s.,;]+$/.test(value); //acepta tambien . , ;
}

export default {
  props: ["informe", "listaresidentes", "listaeducadores"],
  components: {
    vueDropzone: vue2Dropzone,
  },
  data() {
    return {
      datemenu: false,
      step: 1,
      dialogVistaPreviaFirma: false,
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
      dropzoneOptions2: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 250,
        maxFilesize: 5.0,
        maxFiles: 1,
        acceptedFiles: ".png",
        headers: { "My-Awesome-Header": "header value" },
        addRemoveLinks: true,
        dictDefaultMessage:
          "Seleccione la imagen de la firma su dispositivo o arrástrela aquí",
      },
      conclusion: "",
      conclusiones: [],
      anexo: "",
      anexos: [],
      urlfirma: "",
      firmas: { urlfirma: "", nombre: "", cargo: "" },
      imagen: "",
    };
  },
  async created() {
    this.cargarConclusiones();
    this.cargarAnexos();
  },
  methods: {
    ...mapMutations(["replaceInforme"]),
    async actualizarInformeEducativoInicial() {
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
            console.log(this.listaresidentes);
            var resi = this.listaresidentes.filter(function(residente) {
              return residente.id == res.data.idresidente;
            });
            console.log(resi);
            var info = {
              id: res.data.id,
              tipo: res.data.tipo.replace(/([a-z])([A-Z])/g, "$1 $2"),
              fechacreacion: res.data.fechacreacion.split("T")[0],
              codigodocumento: res.data.contenido.codigodocumento,
              nombrecompleto: resi[0].nombre + " " + resi[0].apellido,
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
      this.$emit("close-dialog-update");
    },
    agregarConclusion() {
      let conclusiones = this.conclusion;
      this.informe.contenido.conclusiones.push(conclusiones);
      this.conclusiones = this.informe.contenido.conclusiones;
      this.conclusion = "";
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
    eliminarAnexo(anexo) {
      this.anexos.forEach(function(car, index, object) {
        if (car === anexo) {
          object.splice(index, 1);
        }
      });
    },
    agregarFirma() {
      let firmas = {
        urlfirma: this.urlfirma,
        nombre: this.firmas.nombre,
        cargo: this.firmas.cargo,
      };
      this.informe.contenido.firmas.push(firmas);
      this.$refs.myVueDropzone.removeAllFiles();

      this.urlfirma = "";
      this.firmas.nombre = "";
      this.firmas.cargo = "";
    },
    eliminarFirma(index) {
      this.informe.contenido.firmas.splice(index, 1);
    },
    verFirma(index) {
      console.log(this.informe.contenido.firmas[index].urlfirma);
      this.imagen = this.informe.contenido.firmas[index].urlfirma;
      this.dialogVistaPreviaFirma = true;
    },
    cerrarVistaPreviaFirma() {
      this.dialogVistaPreviaFirma = false;
    },
    afterSuccess(file, response) {
      this.fileList.push(file);
    },
    afterRemoved(file, error, xhr) {
      this.informe.contenido.anexos = "";
      this.$v.informe.contenido.anexos.$model = "";
    },
    afterSuccess2(file, response) {
      this.urlfirma = file.dataURL.split(",")[1];
      console.log(this.urlfirma);
    },
    afterRemoved2(file, error, xhr) {
      this.urlfirma = "";
      //this.informe.contenido.firmas.urlfirma = "";
      // this.$v.informe.contenido.firmas.urlfirma.$model = "";
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
    },
    errorCreador() {
      const errors = [];
      if (!this.$v.informe.contenido.evaluador.$dirty) return errors;
      !this.$v.informe.contenido.evaluador.required &&
        errors.push("Debe seleccionar un educador obligatoriamente");
      return errors;
    },
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
      if (!this.$v.informe.fechacreacion.$dirty) return errors;
      !this.$v.informe.fechacreacion.required &&
        errors.push("Debe ingresar la fecha de evaluación obligatoriamente");
      //validating whether the user are an adult
      var dateselected = new Date(this.informe.fechacreacion);
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
    errorNombreFirma() {
      const errors = [];
      if (!this.$v.firmas.nombre.$dirty) return errors;
      !this.$v.firmas.nombre.required &&
        errors.push("Debe registrar el nombre obligatoriamente");
      !this.$v.firmas.nombre.esTexto &&
        errors.push("Debe registrar el nombre correctamente");
      return errors;
    },
    errorCargoFirma() {
      const errors = [];
      if (!this.$v.firmas.cargo.$dirty) return errors;
      !this.$v.firmas.cargo.required &&
        errors.push("Debe registrar el cargo obligatoriamente");
      !this.$v.firmas.cargo.esTexto &&
        errors.push("Debe registrar el cargo correctamente");
      return errors;
    },
    errorUrlFirma() {
      return this.$v.urlfirma.required == false &&
        this.$v.urlfirma.$dirty == true
        ? true
        : false;
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
        fechacreacion: {
          required,
        },
        contenido: {
          lugarevaluacion: {
            required,
            minLength: minLength(10),
          },
          evaluador: {
            required,
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
        },
      },
      conclusion: {
        required,
        esParrafo,
      },
      urlfirma: {
        required,
      },
      firmas: {
        nombre: {
          required,
          esTexto,
        },
        cargo: {
          required,
          esTexto,
        },
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
