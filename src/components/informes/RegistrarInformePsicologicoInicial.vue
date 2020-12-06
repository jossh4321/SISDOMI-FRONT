<template>
  <v-dialog v-model="show" max-width="50%">
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
                    v-for="transtorno in transtornos"
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
                          @vdropzone-success="afterSuccess"
                          @vdropzone-removed-file="afterRemoved"
                          id="dropzone"
                          :options="dropzoneOptions"
                        >
                        </vue-dropzone>
                      </div>
                      <!-- <v-card v-if="errorUrlFirma" color="red">
                        <v-card-text class="text-center" style="color: white"
                          >Debe Subir una imagen de la firma
                          obligatoriamente</v-card-text
                        >
                      </v-card> -->
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
                    <v-btn block color="success" @click="registrarInforme">
                      <v-icon left>mdi-content-save-all-outline</v-icon>
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
import { mapGetters, mapMutations, mapState } from "vuex";
import moment from "moment";

export default {
  props: ["listaresidentes", "visible"],
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
      informe: {
        id: "",
        tipo: "InformePsicologicoInicial",
        historialcontenido: [],
        creadordocumento: "",
        fechacreacion: "",
        area: "psicologica",
        fase: "acogida",
        idresidente: "",
        estado: "creado",
        contenido: {
          antecedentes: "",
          contextopsicologico: "",
          analisisactual: "",
          transtornos: [],
          recomendaciones: [],
          conclusiones: [],
          firmas: [],
          codigodocumento: "",
          evaluador: "",
        },
      },
      imagen: "",
      dialogVistaPreviaFirma: false,
      datemenu: false,
    };
  },
  methods: {
    async registrarInforme() {
      this.informe.creadordocumento = this.user.id;
      console.log(this.informe);
      // this.$v.informe.$touch();
      // if (this.$v.informe.$invalid) {
      //   console.log("hay errores");
      //   this.mensaje(
      //     "error",
      //     "..Oops",
      //     "Se encontraron errores en el formulario",
      //     "<strong>Verifique los campos Ingresados<strong>"
      //   );
      // } else {
      //     console.log("no hay errores");
      //     console.log(this.informe);
          await axios
            .post("/informe/informepi", this.informe)
            .then((res) => {
              this.informe = res.data;
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
      // }
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
      let transtornos = this.transtorno;
      this.informe.contenido.transtornos.push(transtornos);
      this.transtornos = this.informe.contenido.transtornos;
      this.transtorno = "";
    },
    eliminarTranstorno(transtorno) {
      this.transtornos.forEach(function(car, index, object) {
        if (car === transtorno) {
          object.splice(index, 1);
        }
      });
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
    agregarRecomendacion() {
      let recomendaciones = this.recomendacion;
      this.informe.contenido.recomendaciones.push(recomendaciones);
      this.recomendaciones = this.informe.contenido.recomendaciones;
      this.recomendacion = "";
      //this.$v.conclusion.$reset();
    },
    eliminarRecomendacion(recomendacion) {
      this.recomendaciones.forEach(function(car, index, object) {
        if (car === recomendacion) {
          object.splice(index, 1);
        }
      });
    },
    agregarFirma() {
      // this.$v.firmas.$touch();
      // this.$v.urlfirma.$touch();

      // if (!this.$v.firmas.$invalid && !this.$v.urlfirma.$invalid) {
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
      //   this.$v.firmas.$reset();
      //   this.$v.urlfirma.$reset();
      // }
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
      //this.informe = this.limpiarInforme();
      this.step = 1;
      this.$emit("close");
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
  },
};
</script>
