<template>
  <v-card>
    <v-card-title class="justify-center"
      >Registro de Informe Psicológico Inicial</v-card-title
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
              >
                <template v-slot:selection="data">
                  <v-chip
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    style="margin-top:5px"
                  >
                    <v-avatar left color="#b3b3ff" size="24">
                      <span style="font-size:12px">RT</span>
                    </v-avatar>
                    {{ data.item.nombre }} {{ data.item.apellido }}
                  </v-chip>
                </template>
                <template v-slot:item="data">
                  <template>
                    <v-list-item-avatar>
                      <v-avatar left color="#b3b3ff" size="24">
                        <span style="font-size:12px">UC</span>
                      </v-avatar>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title
                        >Nombre completo: {{ data.item.nombre }}
                        {{ data.item.apellido }}
                      </v-list-item-title>
                      <v-list-item-subtitle
                        >Nro. Documento:
                        {{ data.item.numeroDocumento }}</v-list-item-subtitle
                      >
                    </v-list-item-content>
                  </template>
                </template>
              </v-autocomplete>

              <v-autocomplete
                :items="listapsicologos"
                filled
                chips
                dense
                outlined
                v-model="informe.contenido.evaluador"
                color="#009900"
                label="Evaluador"
                item-text="usuario"
                item-value="id"
                :error-messages="errorEvaluador"
              >
                <template v-slot:selection="data">
                  <v-chip
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    style="margin-top:5px"
                  >
                    <v-avatar left color="#b3b3ff" size="24">
                      <span style="font-size:12px">RT</span>
                    </v-avatar>
                    {{ data.item.datos.nombre }}
                    {{ data.item.datos.apellido }}
                  </v-chip>
                </template>
                <template v-slot:item="data">
                  <template>
                    <v-list-item-avatar>
                      <v-avatar left color="#b3b3ff" size="24">
                        <span style="font-size:12px">UC</span>
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
                label="Antecedentes"
                v-model="informe.contenido.antecedentes"
                auto-grow
                outlined
                rows="2"
                row-height="25"
                color="#009900"
                shaped
                @input="$v.informe.contenido.antecedentes.$touch()"
                @blur="$v.informe.contenido.antecedentes.$touch()"
                :error-messages="errorAntecedentes"
              ></v-textarea>

              <v-textarea
                label="Contexto psicológico"
                v-model="informe.contenido.contextopsicologico"
                auto-grow
                outlined
                rows="2"
                row-height="25"
                color="#009900"
                shaped
                @input="$v.informe.contenido.contextopsicologico.$touch()"
                @blur="$v.informe.contenido.contextopsicologico.$touch()"
                :error-messages="errorContextoPsicologico"
              ></v-textarea>

              <v-textarea
                label="Análisis de estado psicológico actual"
                v-model="informe.contenido.analisisactual"
                auto-grow
                outlined
                rows="2"
                row-height="25"
                color="#009900"
                shaped
                @input="$v.informe.contenido.analisisactual.$touch()"
                @blur="$v.informe.contenido.analisisactual.$touch()"
                :error-messages="errorAnalisisActual"
              ></v-textarea>

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
                        v-model="transtorno"
                        label="Transtornos posibles"
                        color="#009900"
                        @input="$v.transtorno.$touch()"
                        @blur="$v.transtorno.$touch()"
                        :error-messages="errorTranstorno"
                      ></v-text-field>
                    </v-col>
                    <v-col :cols="4" align="right">
                      <v-btn
                        fab
                        small
                        dark
                        color="green"
                        @click="agregarTranstorno()"
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
                  v-for="transtorno in informe.contenido.transtornos"
                  :key="transtorno"
                >
                  <v-row style="margin-left:10px;heigh:100%" align="center">
                    <v-col :cols="8" align="left">
                      <span>{{ transtorno }}</span>
                    </v-col>
                    <v-col :cols="4" align="right">
                      <div style="margin-right:20px">
                        <v-btn
                          fab
                          x-small
                          dark
                          color="red"
                          @click="eliminarTranstorno(transtorno)"
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
                        label="Conclusiones"
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
                  v-for="conclusion in informe.contenido.conclusiones"
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
                        v-model="recomendacion"
                        label="Recomendaciones"
                        color="#009900"
                        @input="$v.recomendacion.$touch()"
                        @blur="$v.recomendacion.$touch()"
                        :error-messages="errorRecomendacion"
                      ></v-text-field>
                    </v-col>
                    <v-col :cols="4" align="right">
                      <v-btn
                        fab
                        small
                        dark
                        color="green"
                        @click="agregarRecomendacion"
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
                  v-for="recomendacion in informe.contenido.recomendaciones"
                  :key="recomendacion"
                >
                  <v-row style="margin-left:10px;heigh:100%" align="center">
                    <v-col :cols="8" align="left">
                      <span>{{ recomendacion }}</span>
                    </v-col>
                    <v-col :cols="4" align="right">
                      <div style="margin-right:20px">
                        <v-btn
                          fab
                          x-small
                          dark
                          color="red"
                          @click="eliminarRecomendacion(recomendacion)"
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
                      <v-btn fab small dark color="green" @click="agregarFirma">
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
                        @vdropzone-success="afterSuccess"
                        @vdropzone-removed-file="afterRemoved"
                        id="dropzone"
                        :options="dropzoneOptions"
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
                  <v-btn block color="success" @click="actualizarInforme">
                    <v-icon left>mdi-content-save-all-outline</v-icon>
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
import {
  required,
  minLength,
  email,
  helpers,
  numeric,
  between,
} from "vuelidate/lib/validators";
import moment from "moment";
import { mapGetters } from "vuex";

function esTexto(value) {
  return /^[A-Za-z\sáéíóúÁÉÍÓÚñÑ]+$/.test(value);
}

function esParrafo(value) {
  return /^[A-Za-z\d\s.,;°"“()áéíóúÁÉÍÓÚñÑ]+$/.test(value);
}


export default {
  props: ["listaresidentes", "visible", "informe", "listapsicologos"],
  components: {
    vueDropzone: vue2Dropzone,
  },
  data() {
    return {
      dropzoneOptions: {
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
      step: 1,
      transtorno: "",
      transtornos: [],
      conclusion: "",
      conclusiones: [],
      recomendacion: "",
      recomendaciones: [],
      urlfirma: "",
      firmas: { nombre: "", cargo: "" },
      imagen: "",
      dialogVistaPreviaFirma: false,
      datemenu: false,
    };
  },
  methods: {    
    async actualizarInforme() {
      this.informe.creadordocumento = this.user.id;
      console.log(this.informe);
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
        await axios
          .put("/informe/informepi", this.informe)
          .then((res) => {
            this.informe = res.data;
            var resi = this.listaresidentes.filter(function(residente) {
              return residente.id == res.data.idresidente;
            });
            var info = {
              id: res.data.id,
              tipo: res.data.tipo.replace(/([a-z])([A-Z])/g, "$1 $2"),
              fechacreacion: res.data.fechacreacion.split("T")[0],
              codigodocumento: res.data.contenido.codigodocumento,
              nombrecompleto: resi[0].nombre + " " + resi[0].apellido,
            };
            this.addInforme(info);
            this.cerrarDialogo();
          })
          .catch((err) => console.log(err));
        await this.mensaje(
          "success",
          "Listo",
          "Informe registrado Satisfactoriamente",
          "<strong>Se redirigirá a la interfaz de gestión<strong>"
        );
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
    agregarTranstorno() {
      this.$v.transtorno.$touch();
      if (!this.$v.transtorno.$invalid) {
        let transtornos = this.transtorno;
        this.informe.contenido.transtornos.push(transtornos);
        this.transtornos = this.informe.contenido.transtornos;
        this.transtorno = "";
        this.$v.transtorno.$reset();
      }
    },
    eliminarTranstorno(transtorno) {
      this.transtornos.forEach(function(car, index, object) {
        if (car === transtorno) {
          object.splice(index, 1);
        }
      });
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
    agregarRecomendacion() {
       this.$v.conclusion.$touch();
      if (!this.$v.conclusion.$invalid) {
      let recomendaciones = this.recomendacion;
      this.informe.contenido.recomendaciones.push(recomendaciones);
      this.recomendaciones = this.informe.contenido.recomendaciones;
      this.recomendacion = "";
      this.$v.conclusion.$reset();
      }
    },
    eliminarRecomendacion(recomendacion) {
      this.recomendaciones.forEach(function(car, index, object) {
        if (car === recomendacion) {
          object.splice(index, 1);
        }
      });
    },
    agregarFirma() {
      this.$v.firmas.$touch();
      this.$v.urlfirma.$touch();

      if (!this.$v.firmas.$invalid && !this.$v.urlfirma.$invalid) {
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
        this.$v.firmas.$reset();
        this.$v.urlfirma.$reset();
      }
    },
    eliminarFirma(index) {
      this.informe.contenido.firmas.splice(index, 1);
    },
    verFirma(index) {
      this.imagen = this.informe.contenido.firmas[index].urlfirma;
      this.dialogVistaPreviaFirma = true;
    },
    cerrarVistaPreviaFirma() {
      this.dialogVistaPreviaFirma = false;
    },
    afterSuccess(file, response) {
      this.urlfirma = file.dataURL.split(",")[1];
    },
    afterRemoved(file, error, xhr) {
      this.urlfirma = "";
    },
    cerrarDialogo() {
      this.$emit("close-dialog-update");
    },
  },
  computed: {
    show: {
      get() {
        return this.visible;
      },
      set(value) {
        if (!value) {
          this.$emit("close");
        }
      },
    },
    ...mapGetters(["user"]),
    errorResidente() {
      const errors = [];
      if (!this.$v.informe.idresidente.$dirty) return errors;
      !this.$v.informe.idresidente.required &&
        errors.push("Debe seleccionar un residente obligatoriamente");
      return errors;
    },
    errorEvaluador() {
      const errors = [];
      if (!this.$v.informe.contenido.evaluador.$dirty) return errors;
      !this.$v.informe.contenido.evaluador.required &&
        errors.push("Debe seleccionar un evaluador obligatoriamente");
      return errors;
    },
    errorAntecedentes() {
      const errors = [];
      if (!this.$v.informe.contenido.antecedentes.$dirty) return errors;
      !this.$v.informe.contenido.antecedentes.required &&
        errors.push("Debe completar los antecedentes obligatoriamente.");
      !this.$v.informe.contenido.antecedentes.esParrafo &&
        errors.push("No se aceptan caracteres especiales.");
      return errors;
    },
    errorContextoPsicologico() {
      const errors = [];
      if (!this.$v.informe.contenido.contextopsicologico.$dirty) return errors;
      !this.$v.informe.contenido.contextopsicologico.required &&
        errors.push("Debe completar el contexto psicológico obligatoriamente.");
      !this.$v.informe.contenido.contextopsicologico.esParrafo &&
        errors.push("No se aceptan caracteres especiales.");
      return errors;
    },
    errorAnalisisActual() {
      const errors = [];
      if (!this.$v.informe.contenido.analisisactual.$dirty) return errors;
      !this.$v.informe.contenido.analisisactual.required &&
        errors.push("Debe completar el análisis actual obligatoriamente.");
      !this.$v.informe.contenido.analisisactual.esParrafo &&
        errors.push("No se aceptan caracteres especiales.");
      return errors;
    },
    errorTranstorno() {
      const errors = [];
      if (!this.$v.transtorno.$dirty) return errors;
      !this.$v.transtorno.required &&
        errors.push("Debe registrar el campo obligatoriamente");
      !this.$v.transtorno.esParrafo &&
        errors.push("No se aceptan caracteres especiales.");
      return errors;
    },
    errorRecomendacion() {
      const errors = [];
      if (!this.$v.recomendacion.$dirty) return errors;
      !this.$v.recomendacion.required &&
        errors.push("Debe registrar la recomendación obligatoriamente");
      !this.$v.recomendacion.esParrafo &&
        errors.push("La recomendación no debe contener caracteres especiales.");
      return errors;
    },
    errorConclusion() {
      const errors = [];
      if (!this.$v.conclusion.$dirty) return errors;
      !this.$v.conclusion.required &&
        errors.push("Debe registrar la conclusión obligatoriamente");
      !this.$v.conclusion.esParrafo &&
        errors.push("La conclusión no debe contener caracteres especiales.");
      return errors;
    },
    errorNombreFirma() {
      const errors = [];
      if (!this.$v.firmas.nombre.$dirty) return errors;
      !this.$v.firmas.nombre.required &&
        errors.push("Debe registrar el nombre obligatoriamente");
      !this.$v.firmas.nombre.esTexto &&
        errors.push("El nombre debe contener solo texto.");
      return errors;
    },
    errorCargoFirma() {
      const errors = [];
      if (!this.$v.firmas.cargo.$dirty) return errors;
      !this.$v.firmas.cargo.required &&
        errors.push("Debe registrar el cargo obligatoriamente");
      !this.$v.firmas.cargo.esTexto &&
        errors.push("El cargo debe contener solo texto.");
      return errors;
    },
    errorUrlFirma() {
      return this.$v.urlfirma.required == false &&
        this.$v.urlfirma.$dirty == true
        ? true
        : false;
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
          evaluador: {
            required,
          },
          antecedentes: {
            required,
            esParrafo,
          },
          contextopsicologico: {
            required,
            esParrafo,
          },
          analisisactual: {
            required,
            esParrafo,
          },
        },
      },
      transtorno: {
        required,
        esParrafo,
      },
      recomendacion: {
        required,
        esParrafo,
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
