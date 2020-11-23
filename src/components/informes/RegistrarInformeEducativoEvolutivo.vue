<template>
  <v-dialog v-model="show" max-width="880px">
    <v-card>
      <v-card-title class="justify-center">{{ titulo }}</v-card-title>
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
        <!-- fdsfs -->
        <v-stepper-items>
          <v-stepper-content step="1">
            <div class="container-user">
              <form>
                <v-autocomplete
                  v-model="informe.idresidente"
                  :items="listaresidentes"
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
                      style="margin-top:5px"
                    >
                      <v-avatar left color="#b3b3ff" size="24">
                        <span style="font-size:12px">UE</span>
                      </v-avatar>
                      {{ data.item.nombre + " " + data.item.apellido }}
                    </v-chip>
                  </template>
                  <template v-slot:item="data">
                    <template>
                      <v-list-item-avatar>
                        <v-avatar left color="#b3b3ff" size="24">
                          <span style="font-size:12px">US</span>
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
                      style="margin-top:5px"
                    >
                      <v-avatar left color="#b3b3ff" size="24">
                        <span style="font-size:12px">RT</span>
                      </v-avatar>
                      {{ data.item.datos.nombre }}
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
                <v-text-field
                  v-model="informe.contenido.iereinsersion.nombre"
                  label="Institución Educativa"
                  outlined
                  @input="$v.informe.contenido.iereinsersion.nombre.$touch()"
                  @blur="$v.informe.contenido.iereinsersion.nombre.$touch()"
                  :error-messages="errorNombreIE"
                  color="#009900"
                ></v-text-field>
                <v-row>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="informe.contenido.iereinsersion.modalidad"
                      label="Modalidad"
                      outlined
                      @input="
                        $v.informe.contenido.iereinsersion.modalidad.$touch()
                      "
                      @blur="
                        $v.informe.contenido.iereinsersion.modalidad.$touch()
                      "
                      :error-messages="errorModalidadIE"
                      color="#009900"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="informe.contenido.iereinsersion.nivel"
                      label="Nivel Educativo"
                      outlined
                      @input="$v.informe.contenido.iereinsersion.nivel.$touch()"
                      @blur="$v.informe.contenido.iereinsersion.nivel.$touch()"
                      :error-messages="errorNivelIE"
                      color="#009900"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="informe.contenido.iereinsersion.grado"
                      label="Grado"
                      outlined
                      @input="$v.informe.contenido.iereinsersion.grado.$touch()"
                      @blur="$v.informe.contenido.iereinsersion.grado.$touch()"
                      :error-messages="errorGradoIE"
                      color="#009900"
                    ></v-text-field>
                  </v-col>
                </v-row>
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
                  v-model="informe.contenido.antecedentes"
                  label="Antecedentes"
                  auto-grow
                  outlined
                  @input="$v.informe.contenido.antecedentes.$touch()"
                  @blur="$v.informe.contenido.antecedentes.$touch()"
                  :error-messages="errorAntecedentes"
                  rows="2"
                  row-height="40"
                  color="#009900"
                  shaped
                ></v-textarea>
                <v-textarea
                  v-model="informe.contenido.situacionactual"
                  label="Situación Educativa Actual"
                  auto-grow
                  outlined
                  @input="$v.informe.contenido.situacionactual.$touch()"
                  @blur="$v.informe.contenido.situacionactual.$touch()"
                  :error-messages="errorSituacionEducativa"
                  rows="2"
                  row-height="40"
                  color="#009900"
                  shaped
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
                          v-model="logro"
                          label="Logros alcanzados"
                          color="#009900"
                        ></v-text-field>
                      </v-col>
                      <v-col :cols="4" align="right">
                        <v-btn
                          fab
                          small
                          dark
                          color="green"
                          @click="agregarLogros"
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
                    v-for="logro in logros"
                    :key="logro"
                  >
                    <v-row style="margin-left:10px;heigh:100%" align="center">
                      <v-col :cols="8" align="left">
                        <span>{{ logro }}</span>
                      </v-col>
                      <v-col :cols="4" align="right">
                        <div style="margin-right:20px">
                          <v-btn
                            fab
                            x-small
                            dark
                            color="red"
                            @click="eliminarLogros(logro)"
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
                        ></v-text-field>
                      </v-col>
                      <v-col :cols="4" align="right">
                        <v-btn
                          fab
                          small
                          dark
                          color="green"
                          @click="agregarRecomendaciones"
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
                    v-for="recomendacion in recomendaciones"
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
                            @click="eliminarRecomendaciones(recomendacion)"
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
                          v-model="firmas.nombre"
                          label="Nombre"
                          color="#009900"
                        ></v-text-field>
                      </v-col>
                      <v-col :cols="4" align="left">
                        <v-text-field
                          v-model="firmas.cargo"
                          label="Cargo"
                          color="#009900"
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
                        <v-dialog
                          v-model="dialogVistaPreviaFirma"
                          persistent
                          max-width="600px"
                        >
                          <template v-slot:activator="{ on }">
                            <v-btn
                              v-on="on"
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
                <v-row>
                  <v-col>
                    <v-btn block @click="registrarInforme" color="success">
                      <v-icon left>mdi-page-next-outline</v-icon>
                      <span>Registrar Informe</span>
                    </v-btn>
                  </v-col>
                  <v-col>
                    <v-btn block @click="show = false" color="primary">
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
  </v-dialog>
</template>
<script>
import axios from "axios";
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import { mapMutations, mapState } from "vuex";
import { required, minLength, email, helpers } from "vuelidate/lib/validators";
import moment from "moment";

export default {
  props: ["listaresidentes", "visible", "titulo", "listaeducadores"],
  components: {
    vueDropzone: vue2Dropzone,
  },
  data() {
    return {
      fileList: [],
      datemenu: false,
      dialogVistaPreviaFirma: false,
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
      logro: "",
      logros: [],
      recomendacion: "",
      recomendaciones: [],
      urlfirma: "",
      firmas: { urlfirma: "", nombre: "", cargo: "" },
      informe: {
        id: "",
        tipo: "",
        historialcontenido: [],
        creadordocumento: "",
        fechacreacion: "",
        area: "educativa",
        fase: "acogida",
        idresidente: "",
        estado: "creado",
        contenido: {
          antecedentes: "",
          situacionactual: "",
          logroalcanzado: [],
          recomendaciones: [],
          iereinsersion: {
            nombre: "",
            modalidad: "",
            nivel: "",
            grado: "",
          },
          anexos: [],
          firmas: [],
          codigodocumento: "",
        },
      },
    };
  },
  async created() {
    this.logros = "";
    this.logro = "";
    this.recomendaciones = "";
    this.recomendacion = "";
  },
  methods: {
    ...mapMutations(["addInforme"]),
    async sendPDFFiles() {
      let listaanexos = this.fileList;
      for (let index = 0; index < this.fileList.length; index++) {
        let formData = new FormData();
        formData.append("file", this.fileList[index]);
        await axios
          .post("/Media/archivos/pdf", formData)
          .then((res) => {
            listaanexos[index] = res.data;
          })
          .catch((err) => console.log(err));
      }
      this.informe.contenido.anexos = listaanexos;
      console.log(listaanexos);
    },
    async registrarInforme() {
      await this.sendPDFFiles();
      if (this.titulo === "Registrar Informe Educativo Evolutivo") {
        this.informe.tipo = "InformeEducativoEvolutivo";
      } else {
        this.informe.tipo = "InformeEducativoFinal";
      }
      console.log(this.informe);
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log("hay errores");
        this.mensaje(
          "Error",
          "..Oops",
          "Se encontraron errores en el formulario",
          "<strong>Verifique los campos Ingresados<strong>"
        );
      } else {
        console.log("no hay errores");
        console.log(this.informe);
        await axios
          .post("/informe/informeee", this.informe)
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
            console.log("HOLA");
            console.log(info);
            this.addInforme(info);
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
    },
    agregarLogros() {
      let logros = this.logro;
      this.informe.contenido.logroalcanzado.push(logros);
      this.logros = this.informe.contenido.logroalcanzado;
      this.logro = "";
    },
    eliminarLogros(logro) {
      this.logros.forEach(function(car, index, object) {
        if (car === logro) {
          object.splice(index, 1);
        }
      });
    },
    agregarRecomendaciones() {
      let recomendaciones = this.recomendacion;
      this.informe.contenido.recomendaciones.push(recomendaciones);
      this.recomendaciones = this.informe.contenido.recomendaciones;
      this.recomendacion = "";
    },
    eliminarRecomendaciones(recomendacion) {
      this.recomendaciones.forEach(function(car, index, object) {
        if (car === recomendacion) {
          object.splice(index, 1);
        }
      });
    },
    cerrarDialogo() {
      this.informe = this.limpiarInforme();
      this.step = 1;
      this.$emit("close");
    },
    async mensaje(icono, titulo, texto, footer) {
      await this.$swal({
        icon: icono,
        title: titulo,
        text: texto,
        footer: footer,
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
    },
    cerrarVistaPreviaFirma() {
      this.dialogVistaPreviaFirma = false;
    },
    afterSuccess(file, response) {
      console.log(file);
      console.log(file.dataURL);
      console.log(this.$refs.myVueDropzone);
      this.fileList.push(file);
    },
    afterRemoved(file, error, xhr) {
      this.informe.contenido.anexos = "";
      //this.$v.informe.contenido.anexos.$model = "";
    },
    afterSuccess2(file, response) {
      this.urlfirma = file.dataURL.split(",")[1];
    },
    afterRemoved2(file, error, xhr) {
      this.urlfirma = "";
    },
    limpiarInforme() {
      return {
        tipo: "",
        historialcontenido: [],
        creadordocumento: "",
        fechacreacion: "",
        area: "educativa",
        fase: "acogida",
        idresidente: "",
        estado: "creado",
        contenido: {
          antecedentes: "",
          situacionactual: "",
          logroalcanzado: [],
          recomendaciones: [],
          iereinsersion: {
            nombre: "",
            modalidad: "",
            nivel: "",
            grado: "",
          },
          anexos: [],
          firmas: [],
          codigodocumento: "",
        },
      };
    },
  },
  computed: {
    ...mapState(["informes"]),
    verifyColor() {
      return "red";
    },
    errorNombreIE() {
      const errors = [];
      if (!this.$v.informe.contenido.iereinsersion.nombre.$dirty) return errors;
      !this.$v.informe.contenido.iereinsersion.nombre.required &&
        errors.push("Debe ingresar el nombre de la Institución Educativa");
      return errors;
    },
    errorModalidadIE() {
      const errors = [];
      if (!this.$v.informe.contenido.iereinsersion.modalidad.$dirty)
        return errors;
      !this.$v.informe.contenido.iereinsersion.modalidad.required &&
        errors.push("Debe ingresar la modalidad");
      return errors;
    },
    errorNivelIE() {
      const errors = [];
      if (!this.$v.informe.contenido.iereinsersion.nivel.$dirty) return errors;
      !this.$v.informe.contenido.iereinsersion.nivel.required &&
        errors.push("Debe ingresar el nivel");
      return errors;
    },
    errorGradoIE() {
      const errors = [];
      if (!this.$v.informe.contenido.iereinsersion.grado.$dirty) return errors;
      !this.$v.informe.contenido.iereinsersion.grado.required &&
        errors.push("Debe ingresar el grado");
      return errors;
    },
    errorAntecedentes() {
      const errors = [];
      if (!this.$v.informe.contenido.antecedentes.$dirty) return errors;
      !this.$v.informe.contenido.antecedentes.required &&
        errors.push("Debe ingresar un antecedente");
      return errors;
    },
    errorSituacionEducativa() {
      const errors = [];
      if (!this.$v.informe.contenido.situacionactual.$dirty) return errors;
      !this.$v.informe.contenido.situacionactual.required &&
        errors.push("Debe ingresar la situación actual");
      return errors;
    },
    errorResidente() {
      const errors = [];
      if (!this.$v.informe.idresidente.$dirty) return errors;
      !this.$v.informe.idresidente.required &&
        errors.push("Debe seleccionar un residente obligatoriamente");
      return errors;
    },
    errorCreador() {
      const errors = [];
      if (!this.$v.informe.creadordocumento.$dirty) return errors;
      !this.$v.informe.creadordocumento.required &&
        errors.push("Debe seleccionar un educador obligatoriamente");
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
  },
  validations() {
    return {
      informe: {
        idresidente: {
          required,
        },
        creadordocumento: {
          required,
        },
        fechacreacion: {
          required,
        },
        contenido: {
          antecedentes: {
            required,
          },
          situacionactual: {
            required,
          },
          iereinsersion: {
            nombre: {
              required,
            },
            modalidad: {
              required,
            },
            nivel: {
              required,
            },
            grado: {
              required,
            },
          },
        },
      },
    };
  },
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
