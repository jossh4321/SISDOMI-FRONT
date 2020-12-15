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
                  v-model="informe.contenido.observacionesgenerales"
                  label="Observaciones generales de conducta"
                  auto-grow
                  outlined
                  @input="$v.informe.contenido.observacionesgenerales.$touch()"
                  @blur="$v.informe.contenido.observacionesgenerales.$touch()"
                  :error-messages="errorObservacionesGenerales"
                  rows="2"
                  row-height="40"
                  color="#009900"
                  shaped
                ></v-textarea>

                <v-card
                  style="margin-bottom:5%;padding-bottom:1%;background-color:#EAEAEA"
                >
                  <v-card
                    elevation="0"
                    style="background-color:#EAEAEA"
                    height="70"
                  >
                    <v-row style="margin:1%;heigh:100%" align="center">
                      <v-col :cols="8" align="left">
                        <v-text-field
                          v-model="prueba"
                          label="Pruebas psicologicas aplicadas"
                          color="#009900"
                          @input="$v.prueba.$touch()"
                          @blur="$v.prueba.$touch()"
                          :error-messages="errorPrueba"
                        ></v-text-field>
                      </v-col>
                      <v-col :cols="4" align="right">
                        <v-btn
                          fab
                          small
                          dark
                          color="green"
                          @click="agregarPrueba"
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
                    v-for="prueba in pruebas"
                    :key="prueba"
                  >
                    <v-row style="margin-left:10px;heigh:100%" align="center">
                      <v-col :cols="8" align="left">
                        <span>{{ prueba }}</span>
                      </v-col>
                      <v-col :cols="4" align="right">
                        <div style="margin-right:20px">
                          <v-btn
                            fab
                            x-small
                            dark
                            color="red"
                            @click="eliminarPrueba(prueba)"
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

                <v-textarea
                  v-model="informe.contenido.interpretacionresultados"
                  label="Interpretación de resultados"
                  auto-grow
                  outlined
                  @input="$v.informe.contenido.interpretacionresultados.$touch()"
                  @blur="$v.informe.contenido.interpretacionresultados.$touch()"
                  :error-messages="errorInterpretacion"
                  rows="2"
                  row-height="40"
                  color="#009900"
                  shaped
                ></v-textarea>
                <v-textarea
                  v-model="informe.contenido.diagnostico"
                  label="Diagnostico Psicologico"
                  auto-grow
                  outlined
                  @input="$v.informe.contenido.diagnostico.$touch()"
                  @blur="$v.informe.contenido.diagnostico.$touch()"
                  :error-messages="errorDiagnostico"
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
                  style="margin-top:1%;margin-bottom:5%;padding-bottom:1%;background-color:#EAEAEA"
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

                <v-card
                  style="margin-top:30px;padding:5px 5px;background-color:#EAEAEA"
                >
                      <div>
                        <vue-dropzone
                        ref="myVueDropzone2"
                        @vdropzone-success="afterSuccess"
                        @vdropzone-removed-file="afterRemoved"
                        id="dropzone"
                        :options="dropzoneOptions"
                        >
                        </vue-dropzone>
                      </div>
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
function esTexto(value) {
  return /^[A-Za-z\sáéíóúÁÉÍÓÚñÑ]+$/.test(value); 
}
function esParrafo(value) {
  return /^[A-Za-z\d\s.,;°"“()áéíóúÁÉÍÓÚñÑ]+$/.test(value); 
}
export default {
  props: ["listaresidentes", "visible", "titulo"],
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
          "Seleccione la imagen de la firma de su dispositivo o arrástrela aquí",
      },
      recomendacion: "",
      recomendaciones: [],
      pruebas:[],
      prueba:"",
      conclusion:"",
      conclusiones:[],
      urlfirma: "",
      firmas: { urlfirma: "", nombre: "", cargo: "" },
      imagen: "",
      informe: {
        id: "",
        tipo: "",
        historialcontenido: [],
        creadordocumento: "5f9e4cdae4655cf92eaa4d5b",
        fechacreacion: "",
        area: "psicologica",
        fase: "2",
        idresidente: "",
        estado: "creado",
        contenido: {
          observacionesgenerales: "",
          pruebasaplicadas: [],
          interpretacionresultados:"",
          conclusiones: [],
          diagnostico:"",
          recomendaciones: [],
          anexos: [],
          firmas: [],
          codigodocumento: "",
          evaluador: "",
        },
      },
    };
  },
  methods: {
    ...mapMutations(["addInforme"]),
    async sendPDFFiles() {
      let listaTitulos = [];
      let listaanexos = this.fileList;
      for (let index = 0; index < this.fileList.length; index++) {
        let formData = new FormData();
        listaTitulos.push(this.fileList[index].name)
        formData.append("file", this.fileList[index]);
        await axios
          .post("/Media/archivos/pdf", formData)
          .then((res) => {
            listaanexos[index] = res.data;
          })
          .catch((err) => console.log(err));
      }
      for (let index = 0; index < this.fileList.length; index++) {
        this.informe.contenido.anexos.push(
          {
            url: listaanexos[index],
            titulo: listaTitulos[index],
          }
        )
      }
      console.log(this.informe.contenido.anexos);
    },
    async registrarInforme() {
      await this.sendPDFFiles();
      if (this.titulo === "Registrar Informe Psicologico Evolutivo") {
        this.informe.tipo = "InformePsicologicoEvolutivo";
      } else {
        this.informe.tipo = "InformePsicologicoFinal";
      }
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
          .post("/informe/informepe", this.informe)
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
    agregarRecomendaciones() {
      this.$v.recomendacion.$touch();
      if (!this.$v.recomendacion.$invalid) {
        let recomendaciones = this.recomendacion;
        this.informe.contenido.recomendaciones.push(recomendaciones);
        this.recomendaciones = this.informe.contenido.recomendaciones;
        this.recomendacion = "";
        this.$v.recomendacion.$reset();
      }
    },
    eliminarRecomendaciones(recomendacion) {
      this.recomendaciones.forEach(function(car, index, object) {
        if (car === recomendacion) {
          object.splice(index, 1);
        }
      });
    },
    agregarPrueba() {
      this.$v.prueba.$touch();
      if (!this.$v.prueba.$invalid) {
        let pruebas = this.prueba;
        this.informe.contenido.pruebasaplicadas.push(pruebas);
        this.pruebas = this.informe.contenido.pruebasaplicadas;
        this.prueba = "";
        this.$v.prueba.$reset();
      }
    },
    eliminarPrueba(prueba) {
      this.pruebas.forEach(function(car, index, object) {
        if (car === prueba) {
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
      console.log(this.informe.contenido.firmas[index].urlfirma);
      this.imagen = this.informe.contenido.firmas[index].urlfirma;
      this.dialogVistaPreviaFirma = true;
    },
    cerrarVistaPreviaFirma() {
      this.dialogVistaPreviaFirma = false;
    },
    afterSuccess(file, response) {
      this.fileList.push(file);
      console.log(this.fileList.length)
    },
    afterRemoved(file, error, xhr) {
      this.fileList.forEach(function(car, index, object) {
        if (car === file) {
          object.splice(index, 1);
        }
      });
      console.log(this.fileList.length)
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
        creadordocumento: "5f9e4cdae4655cf92eaa4d5b",
        fechacreacion: "",
        area: "psicologica",
        fase: "acogida",
        idresidente: "",
        estado: "creado",
        contenido: {
          observacionesgenerales: "",
          pruebasaplicadas: [],
          interpretacionresultados:"",
          conclusiones: [],
          diagnostico:"",
          recomendaciones: [],
          anexos: [],
          firmas: [],
          codigodocumento: "",
          evaluador: ""
        },
      };
    },
  },
  computed: {
    verifyColor() {
      return "red";
    },
    errorObservacionesGenerales() {
      const errors = [];
      if (!this.$v.informe.contenido.observacionesgenerales.$dirty) return errors;
      !this.$v.informe.contenido.observacionesgenerales.required &&
        errors.push("Debe ingresar una observación general");
      !this.$v.informe.contenido.observacionesgenerales.esParrafo &&
        errors.push(
          "La observacion general no debe contener caracteres especiales"
        );
      return errors;
    },
    errorInterpretacion() {
      const errors = [];
      if (!this.$v.informe.contenido.interpretacionresultados.$dirty) return errors;
      !this.$v.informe.contenido.interpretacionresultados.required &&
        errors.push("Debe ingresar una interpretación de resultados");
      !this.$v.informe.contenido.interpretacionresultados.esParrafo &&
        errors.push(
          "La interpretacion de resultados no debe contener caracteres especiales"
        );
      return errors;
    },
    errorDiagnostico() {
      const errors = [];
      if (!this.$v.informe.contenido.diagnostico.$dirty) return errors;
      !this.$v.informe.contenido.diagnostico.required &&
        errors.push("Debe ingresar un diagnostico psicologico");
      !this.$v.informe.contenido.diagnostico.esParrafo &&
        errors.push(
          "El diagnostico psicologico no debe contener caracteres especiales"
        );
      return errors;
    },
    errorResidente() {
      const errors = [];
      if (!this.$v.informe.idresidente.$dirty) return errors;
      !this.$v.informe.idresidente.required &&
        errors.push("Debe seleccionar un residente obligatoriamente");
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
    errorPrueba(){
      const errors = [];
      if (!this.$v.prueba.$dirty) return errors;
      !this.$v.prueba.required &&
        errors.push("Debe registrar la prueba obligatoriamente");
      !this.$v.prueba.esParrafo &&
        errors.push(
          "La prueba no debe contener caracteres especiales"
        );
      return errors;
    },
    errorConclusion() {
      const errors = [];
      if (!this.$v.conclusion.$dirty) return errors;
      !this.$v.conclusion.required &&
        errors.push("Debe registrar la conclusion obligatoriamente");
      !this.$v.conclusion.esParrafo &&
        errors.push(
          "La conclusion no debe contener caracteres especiales"
        );
      return errors;
    },
    errorRecomendacion() {
      const errors = [];
      if (!this.$v.recomendacion.$dirty) return errors;
      !this.$v.recomendacion.required &&
        errors.push("Debe registrar la recomendacion obligatoriamente");
      !this.$v.recomendacion.esParrafo &&
        errors.push(
          "La recomendacion no debe contener caracteres especiales"
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
        fechacreacion: {
          required,
        },
        contenido: {
          observacionesgenerales: {
            required,
            esParrafo,
          },
          interpretacionresultados: {
            required,
            esParrafo,
          },
          diagnostico: {
            required,
            esParrafo,
          },
        },
      },
      recomendacion: {
        required,
        esParrafo,
      },
      prueba: {
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
