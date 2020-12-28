<template>
  <v-card>
    <v-card-title class="justify-center"
      >Registrar Seguimiento Educativo</v-card-title
    >
    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step editable step="1">
          Datos Generales
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step editable step="2">
          Datos Especificos
        </v-stepper-step>
      </v-stepper-header>
      <v-stepper-items>
        <!--CONTIENE LOS STEPPERS CREADOS ARRIBA EN ESTE CASO SON TRES-->
        <v-stepper-content step="1"
          ><!--CONTIENE LOS STEPPERS 1 -->
          <div class="container-user">
            <form>
              <v-autocomplete
                v-model="seguimiento.idresidente"
                :items="listaresidentes"
                filled
                chips
                dense
                outlined
                color="#009900"
                label="Usuaria CAR"
                item-text="nombre"
                item-value="id"
                @input="$v.seguimiento.idresidente.$touch()"
                @blur="$v.seguimiento.idresidente.$touch()"
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
                        {{ data.item.numeroDocumento }}</v-list-item-subtitle
                      >
                    </v-list-item-content>
                  </template>
                </template>
              </v-autocomplete>

              <v-select
                label="Modalidad"
                v-model="seguimiento.contenido.modalidad"
                :items="itemsModalidad"
                color="#009900"
                :item-text="itemsModalidad.text"
                :item-value="itemsModalidad.value"
                @input="$v.seguimiento.contenido.modalidad.$touch()"
                @blur="$v.seguimiento.contenido.modalidad.$touch()"
                :error-messages="errorModalidad"
                outlined
              ></v-select>
              <v-select
                label="Nivel"
                v-model="seguimiento.contenido.nivel"
                :items="itemsNivel"
                color="#009900"
                :item-text="itemsNivel.text"
                :item-value="itemsNivel.value"
                @input="$v.seguimiento.contenido.nivel.$touch()"
                @blur="$v.seguimiento.contenido.nivel.$touch()"
                :error-messages="errorNivel"
                outlined
              ></v-select>
              <v-select
                label="Grado"
                v-model="seguimiento.contenido.grado"
                :items="itemsGrado"
                color="#009900"
                :item-text="itemsGrado.text"
                :item-value="itemsGrado.value"
                @input="$v.seguimiento.contenido.grado.$touch()"
                @blur="$v.seguimiento.contenido.grado.$touch()"
                :error-messages="errorGrado"
                outlined
              ></v-select>

              <v-text-field
                v-model="seguimiento.contenido.añoescolar"
                @input="$v.seguimiento.contenido.añoescolar.$touch()"
                @blur="$v.seguimiento.contenido.añoescolar.$touch()"
                :error-messages="errorAñoEscolar"
                label="Año Escolar"
                outlined
                color="#009900"
              ></v-text-field>
              <!--Comienza el cuadro de Fima -->
              <v-row justify="center">
                <v-dialog v-model="dialog" persistent max-width="850px">
                  <template v-slot:activator="{ on }">
                    <v-btn color="primary" v-on="on">
                      Ver Firma del creador de documento
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="headline"> Firma</span>
                    </v-card-title>
                    <v-card-text>
                      <!-- cuadros de texto para añadir firma-->
                      <v-text-field
                        v-model="this.user.rol.nombre"
                        label="Cargo"
                        outlined
                        readonly
                        color="#009900"
                      ></v-text-field>
                      <v-text-field
                        v-model="this.user.usuario"
                        label="Nombre"
                        outlined
                        readonly
                        color="#009900"
                      ></v-text-field>
                      <div align="center">
                        <v-card-text>
                          <img
                            width="240"
                            height="170"
                            :src="this.user.datos.firma"
                            alt=""
                          />
                        </v-card-text>
                      </div>
                     <!-- <div>
                        <vue-dropzone
                          ref="myVueDropzone"
                          @vdropzone-success="afterSuccess"
                          @vdropzone-removed-file="afterRemoved"
                          id="dropzone"
                          :options="dropzoneOptions"
                        >
                        </vue-dropzone>
                      </div>
                      <v-card v-if="errorImagen" color="red">
                        <v-card-text class="text-center" style="color: white"
                          >Debe Subir una firma Obligatoriamente</v-card-text
                        >
                      </v-card>
                      <v-btn color="success" @click="guardarFirma">
                        añadir
                      </v-btn>

                      <v-divider class="divider-custom"></v-divider> -->
                      <!-- cuadros de textofin -->

                     <!-- <v-card
                        style="margin-top:30px;left-top:30px;padding:5px 5px;background-color:#EAEAEA"
                      >
                        <v-card-title style="font-size:22px;padding: 10px 10px;"
                          >Firma de creador(es) de documento</v-card-title
                        > -->
                        <!-- Cabecera -->
                       <!-- <v-card
                          elevation="0"
                          color="#EAEAEA"
                          style="margin-top:5px; margin-bottom:15px"
                          height="30"
                        >
                          <v-row
                            style="margin-left:10px;heigh:100%"
                            align="center"
                          >
                            <v-col cols="4">
                              <article>
                                <span style="font-size:16px">Cargo</span>
                              </article>
                            </v-col>
                            <v-col cols="4">
                              <article>
                                <span style="font-size:16px">Nombre</span>
                              </article>
                            </v-col>
                            <v-col>
                              <article cols="4">
                                <span style="font-size:16px">Firma</span>
                              </article>
                            </v-col>
                            <v-col align="right"> </v-col>
                          </v-row>
                        </v-card>-->
                        <!-- Cuerpo -->
                        <!--<v-card
                          tile
                          elevation="0"
                          color="#FAFAFA"
                          style="margin-top:5px"
                          height="80"
                          v-for="(item, index) in seguimiento.contenido.firmas"
                          :key="index"
                        >
                          <v-row
                            style="margin-left:10px;heigh:100%;"
                            align="center"
                          >
                            <v-col :cols="4">
                              <article>
                                <span style="font-size:16px">{{
                                  item.cargo
                                }}</span>
                              </article>
                            </v-col>
                            <v-col :cols="4">
                              <article>
                                <span style="font-size:16px">{{
                                  item.nombre
                                }}</span>
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
                            </v-col>-->

                            <!--  <v-col align="right">
                                    <div style="margin-right:20px">
                                  <v-btn
                                        style="margin-right:10px"
                                        fab
                                        x-small
                                        dark
                                        color="#126BB5"
                                      >
                                        <v-icon dark>
                                          mdi-pencil
                                        </v-icon>
                                      </v-btn>  
                                      
                                    </div>
                                  </v-col>-->
                         <!-- </v-row>
                        </v-card>
                      </v-card>-->
                      <!--fin-->
                      <!-- -->
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="cerrarSeguimientoFirma()"
                      >
                        Cerrar
                      </v-btn>
                      <!-- <v-btn
                        color="blue darken-1"
                        text
                        @click="guardarSeguimientoFirma()"
                      >
                        Guardar
                      </v-btn> -->
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>
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

              <!--Botones de card -->
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
        <!--CONTIENE LOS STEPPERS 2 -->
        <v-stepper-content step="2">
          <div class="container-user">
            <form>
              <!--Aqui comienza Trimestre -->
              <!--campos de texto -->
              <v-text-field
                v-model="trimestre.orden"
                @input="$v.trimestre.orden.$touch()"
                @blur="$v.trimestre.orden.$touch()"
                :error-messages="errorOrdenTrimestre"
                label="N°Puesto"
                outlined
                color="#009900"
              ></v-text-field>

              <v-text-field
                v-model="trimestre.analisiseducativo"
                @input="$v.trimestre.analisiseducativo.$touch()"
                @blur="$v.trimestre.analisiseducativo.$touch()"
                :error-messages="errorAnalisisTrimestre"
                label="Analisis Educativo"
                outlined
                color="#009900"
              ></v-text-field>
              <v-text-field
                v-model="trimestre.recomendaciones"
                @input="$v.trimestre.recomendaciones.$touch()"
                @blur="$v.trimestre.recomendaciones.$touch()"
                :error-messages="errorRecomendacionTrimestre"
                label="Recomendaciones"
                outlined
                color="#009900"
              ></v-text-field>

              <v-btn color="success" @click="guardarTrimestre">
                añadir
              </v-btn>
              <v-card
                style="margin-top:30px;left-top:30px;padding:5px 5px;background-color:#FFBAB0"
              >
                <v-card-title style="font-size:22px;padding: 10px 10px;"
                  >Notas de Trimestre</v-card-title
                >
                <!-- Cabecera -->
                <v-card
                  elevation="0"
                  color="#FFBAB0"
                  style="margin-top:5px; margin-bottom:15px"
                  height="80"
                >
                  <v-row style="margin-left:10px;heigh:100%" align="center">
                    <v-col cols="2">
                      <article>
                        <span style="font-size:16px">Orden</span>
                      </article>
                    </v-col>
                    <v-col cols="3">
                      <article>
                        <span style="font-size:16px">Analisis Educativo</span>
                      </article>
                    </v-col>
                    <v-col>
                      <article cols="3">
                        <span style="font-size:16px">Recomendaciones</span>
                      </article>
                    </v-col>
                    <v-col>
                      <article cols="3">
                        <span style="font-size:16px">Ver Calificaciones</span>
                      </article>
                    </v-col>
                    <v-col align="right"> </v-col>
                  </v-row>
                </v-card>
                <!-- Cuerpo del car  el heig en este caso e sla altura de los nombres d e los curosos-->
                <v-card
                  tile
                  elevation="0"
                  color="#FAFAFA"
                  style="margin-top:5px"
                  height="60"
                  v-for="(item, index) in seguimiento.contenido.trimestre"
                  :key="index"
                >
                  <v-row style="margin-left:5px;heigh:100%;" align="center">
                    <v-col :cols="2">
                      <article>
                        <span style="font-size:16px">{{ item.orden }}</span>
                      </article>
                    </v-col>
                    <v-col :cols="3">
                      <article>
                        <span style="font-size:16px">{{
                          item.analisiseducativo
                        }}</span>
                      </article>
                    </v-col>
                    <v-col :cols="3">
                      <span style="font-size:16px">{{
                        item.recomendaciones
                      }}</span>
                    </v-col>

                    <v-col :cols="3">
                      <div style="margin-right:20px">
                        <!--card de  notas (conbinacion fuerte)-->

                        <v-btn
                          style="margin-right:15px;margin-top:-5px"
                          dark
                          color="#2E9CCF"
                          @click="abrirDialogoNotas(item.puntajes, index)"
                        >
                          Añadir Notas
                        </v-btn>
                      </div>
                    </v-col>

                    <v-col :cols="1">
                      <div style="margin-right:20px">
                        <v-btn
                          fab
                          x-small
                          dark
                          color="red"
                          @click="eliminarTrimestre(index)"
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
              <!--Card de  trimestre nOTAS  nose cual es-->
              <v-row justify="center">
                <v-dialog v-model="dialog1" persistent max-width="850px">
                  <v-card>
                    <v-card-title>
                      <span class="headline"> Calificaciones</span>
                    </v-card-title>
                    <!--Campo de texto de notas -->
                    <v-text-field
                      v-model="puntajes.area"
                      @input="$v.puntajes.area.$touch()"
                      @blur="$v.puntajes.area.$touch()"
                      :error-messages="errorAreaPuntajes"
                      label="Nombre del Curso:"
                      outlined
                      color="#009900"
                    ></v-text-field>
                    <v-text-field
                      v-model="puntajes.promedio"
                      @input="$v.puntajes.promedio.$touch()"
                      @blur="$v.puntajes.promedio.$touch()"
                      :error-messages="errorPromedioPuntajes"
                      label="Nota obtenida:"
                      outlined
                      color="#009900"
                    ></v-text-field>
                    <v-btn color="success" @click="guardarNotas">
                      añadir
                    </v-btn>
                    <v-card-text>
                      <v-card align="center" elevation="0">
                        <v-card
                          style="margin-top:30px;left-top:10px;padding:5px -15px;width:50%;background-color:#4ABBEF"
                        >
                          <v-card-title
                            style="font-size:22px;padding: 10px 10px;"
                            >Notas del trimestre</v-card-title
                          >
                          <!-- Cabecera -->
                          <v-card
                            elevation="0"
                            color="#4ABBEF"
                            style="margin-top:5px; margin-bottom:15px"
                            height="30"
                          >
                            <v-row
                              style="margin-left:10px;heigh:100%"
                              align="center"
                            >
                              <v-col cols="4">
                                <article>
                                  <span style="font-size:16px">Curso</span>
                                </article>
                              </v-col>
                              <v-col cols="4">
                                <article>
                                  <span style="font-size:16px">Nota</span>
                                </article>
                              </v-col>

                              <v-col align="right"> </v-col>
                            </v-row>
                          </v-card>
                          <!-- Cuerpo -->
                          <v-card
                            tile
                            elevation="0"
                            color="#FAFAFA"
                            style="margin-top:5px"
                            height="50"
                            v-for="(item, index) in notas"
                            :key="index"
                          >
                            <v-row
                              style="margin-left:10px;heigh:100%;"
                              align="center"
                            >
                              <v-col :cols="4">
                                <article>
                                  <span style="font-size:16px">{{
                                    item.area
                                  }}</span>
                                </article>
                              </v-col>
                              <v-col :cols="4">
                                <article>
                                  <span style="font-size:16px">{{
                                    item.promedio
                                  }}</span>
                                </article>
                              </v-col>
                              <v-col align="right">
                                <div style="margin-right:20px">
                                  <v-btn
                                    fab
                                    x-small
                                    dark
                                    color="red"
                                    @click="eliminarNotas(index)"
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
                      </v-card>

                      <!--fin-->

                      <!-- -->
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="guardarSeguimientoNotas"
                      >
                        Guardar
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>

              <!--Botones de card -->
              <v-row>
                <v-col>
                  <v-btn block @click="registrarSeguimiento" color="success">
                    <v-icon left>mdi-page-next-outline</v-icon>
                    <span>Registrar Seguimiento </span>
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
import Vue from "vue";
import Vuelidate from "vuelidate";
Vue.use(Vuelidate);
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import { mapMutations, mapState } from "vuex";
import {
  required,
  minLength,
  maxLength,
  email,
  helpers,
  numeric,
} from "vuelidate/lib/validators";
import moment from "moment";
import { mapGetters } from "vuex";
export default {
  name: "RegistrarSeguimientoEducativo",
  props: ["listaresidentes", "listaeducadores"],
  components: {
    vueDropzone: vue2Dropzone,
  },
  data() {
    return {
      datemenu: false,
      dialog: false, // dialogo firma
      dialog1: false, //dialogo notas

      dialogVistaPreviaFirma: false,
      step: 1,
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 250,
        maxFilesize: 3.0,
        maxFiles: 1,
        acceptedFiles: ".jpg, .png, jpeg",
        headers: { "My-Awesome-Header": "header value" },
        addRemoveLinks: true,
        dictDefaultMessage:
          "Seleccione una Imagen de su Dispositivo o Arrastrela Aqui",
      },
      dropzoneOptions2: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 250,
        maxFilesize: 5.0,
        maxFiles: 1,
        acceptedFiles: ".jpg, .png, jpeg",
        headers: { "My-Awesome-Header": "header value" },
        addRemoveLinks: true,
        dictDefaultMessage:
          "Seleccione la imagen de la firma su dispositivo o arrástrela aquí",
      },
      itemsModalidad: [
        { value: "EBA", text: "Educacion Basica Alternativa" },
        { value: "EBE", text: "Educacion Basica Especial" },
        { value: "EBR", text: "Educacion Basica Regular" },
      ],
      itemsNivel: [
        { value: "PRIMARIA", text: "Nivel Primaria" },
        { value: "SECUNDARIA", text: "Nivel Secundaria" },
        //{ value: 'SUPERIOR', text: 'Estudio Superior'}
      ],
      itemGrado: [
        { value: "1", text: "1" },
        { value: "2", text: "2" },
        { value: "3", text: "3" },
        { value: "4", text: "4" },
        { value: "5", text: "5" },
      ],

      //separacion
      imagen: "",
      firma: { urlfirma: "", nombre: "", cargo: "" },
      trimestre: {
        orden: "",
        puntajes: [],
        analisiseducativo: "",
        recomendaciones: "",
      },
      puntajes: { area: "", promedio: "" },
      notas: [],
      index: "",

      seguimiento: {
        id: "",
        tipo: "InformeSeguimientoEducativo",
        historialcontenido: [],
        creadordocumento: "",
        fechacreacion: null,
        area: "educativa",
        fase: "1",
        idresidente: "",
        estado: "creado",
        contenido: {
          modalidad: "",
          nivel: "",
          grado: "",
          añoescolar: "",
          trimestre: [],
          //firmas: [],
          codigodocumento: "",
        },
      },
    };
  },
  methods: {
    ...mapMutations(["addSeguimiento"]),
    cerrarDialogo() {
      this.step = 1;
      this.$emit("close-dialog-save");
    },
    cerrarVistaPreviaFirma() {
      this.dialogVistaPreviaFirma = false;
    },
    abrirDialogoNotas(notas, index) {
      this.notas = notas;
      this.index = index;
      this.dialog1 = true;
      console.log(this.notas, index);
    },
    /*
    afterSuccess(file, response) {
      console.log(file);
      this.firma.urlfirma = file.dataURL.split(",")[1];
      //this.$v.firma.urlfirma.$model = file.dataURL.split(",")[1];
      //console.log(file.dataURL.split(",")[1]);
    },

    afterRemoved(file, error, xhr) {
      this.firma.urlfirma = "";
    },*/

    async mensaje(icono, titulo, texto, footer) {
      await this.$swal({
        icon: icono,
        title: titulo,
        text: texto,
        footer: footer,
      });
    },
    ////////////HACER LA CONSULTA CON LA API  REGISTRAR
    async registrarSeguimiento() {
      this.seguimiento.creadordocumento = this.user.id;
      console.log(this.seguimiento);
      this.$v.seguimiento.$touch();
      if (this.$v.seguimiento.$invalid) {
        console.log("hay errores");
        this.mensaje(
          "error",
          "..Oops",
          "Se encontraron errores en el formulario",
          "<strong>Verifique los campos Ingresados<strong>"
        );
      } else {
        console.log("no hay errores");
        console.log(this.seguimiento);
        await axios
          .post("/SeguimientoEducativo/informese", this.seguimiento)
          .then((res) => {
            this.addSeguimiento(res.data);
            this.cerrarDialogo();
          })
          .catch((err) => console.log(err));
        await this.mensaje(
          "success",
          "listo",
          "Informe Seguimiento educativo registrado Satisfactoriamente",
          "<strong>Se redirigira a la Interfaz de Gestion<strong>"
        );
        this.$emit("cargarSeguimiento");
      }
    },/*
    guardarSeguimientoFirma() {
      this.$v.seguimiento.contenido.firmas.$touch();
      if (!this.$v.seguimiento.contenido.firmas.$invalid) {
        this.$v.firma.$reset();
        this.dialog = false;
      }
    },*/
    cerrarSeguimientoFirma() {
      //this.$v.seguimiento.contenido.firmas.$reset();
      //this.$v.firma.$reset();
      this.dialog = false;
    },
    guardarSeguimientoNotas() {
      this.$v.puntajes.$reset();
      this.$v.trimestre.$reset();
      this.dialog1 = false;
    },

    ///metodo para agregar firma residente
    /*guardarFirma() {
      this.$v.firma.$touch();
      if (!this.$v.firma.$invalid) {
        let firmad = {
          urlfirma: this.firma.urlfirma,
          nombre: this.firma.nombre,
          cargo: this.firma.cargo,
        };

        this.seguimiento.contenido.firmas.push(firmad);
        console.log(this.seguimiento.contenido.firmad);
        this.$refs.myVueDropzone.removeAllFiles();

        this.firma.urlfirma = "";
        this.firma.nombre = "";
        this.firma.cargo = "";
        !this.$v.firma.$reset();
      }
    },
    eliminarFirma(index) {
      this.seguimiento.contenido.firmas.splice(index, 1);
    },
    verFirma(index) {
      console.log(this.seguimiento.contenido.firmas[index].urlfirma);
      this.imagen = this.seguimiento.contenido.firmas[index].urlfirma;
      this.dialogVistaPreviaFirma = true;
    },*/
    guardarTrimestre() {
      this.$v.trimestre.$touch();
      if (!this.$v.trimestre.$invalid) {
        let trimestred = {
          orden: this.trimestre.orden,
          puntajes: [],
          analisiseducativo: this.trimestre.analisiseducativo,
          recomendaciones: this.trimestre.recomendaciones,
        };

        this.seguimiento.contenido.trimestre.push(trimestred);

        console.log(this.seguimiento.contenido.trimestre);

        this.trimestre.orden = "";
        this.trimestre.puntajes = "";
        this.trimestre.analisiseducativo = "";
        this.trimestre.recomendaciones = "";
        !this.$v.trimestre.$reset();
      }
    },
    eliminarTrimestre(index) {
      this.seguimiento.contenido.trimestre.splice(index, 1);
    },
    guardarNotas() {
      this.$v.puntajes.$touch();
      if (!this.$v.puntajes.$invalid) {
        let puntajesd = {
          area: this.puntajes.area,
          promedio: this.puntajes.promedio,
        };
        this.seguimiento.contenido.trimestre[this.index].puntajes.push(
          puntajesd
        );

        console.log(this.trimestre.puntajes);

        this.puntajes.area = "";
        this.puntajes.promedio = "";
        !this.$v.puntajes.$reset();
      }
    },
    eliminarNotas(index) {
      this.seguimiento.contenido.trimestre[this.index].puntajes.splice(
        index,
        1
      );
    },
  },
  computed: {
    verifyColor() {
      return "red";
    },
    ...mapGetters(["user"]),
    itemsGrado() {
      const listaGrados = [
        { value: "1", text: "Primero" },
        { value: "2", text: "Segundo" },
        { value: "3", text: "Tercero" },
        { value: "4", text: "Cuarto" },
        { value: "5", text: "Quinto" },
      ];
      if (this.seguimiento.contenido.nivel == "PRIMARIA") {
        listaGrados.push({ value: "6", text: "Sexto" });
      }
      this.seguimiento.contenido.grado = "1";
      return listaGrados;
    },
    errorResidente() {
      const errors = [];
      if (!this.$v.seguimiento.idresidente.$dirty) return errors;
      !this.$v.seguimiento.idresidente.required &&
        errors.push("Debe seleccionar un residente obligatoriamente");
      return errors;
    },
    errorModalidad() {
      const errors = [];
      if (!this.$v.seguimiento.contenido.modalidad.$dirty) return errors;
      !this.$v.seguimiento.contenido.modalidad.required &&
        errors.push("Debe Ingresar una modalidad Obligatoriamente");
      return errors;
    },
    errorNivel() {
      const errors = [];
      if (!this.$v.seguimiento.contenido.nivel.$dirty) return errors;
      !this.$v.seguimiento.contenido.nivel.required &&
        errors.push("Debe Seleccionar un Nivel Obligatoriamente");
      return errors;
    },
    errorGrado() {
      const errors = [];
      if (!this.$v.seguimiento.contenido.grado.$dirty) return errors;
      !this.$v.seguimiento.contenido.grado.required &&
        errors.push("Debe Seleccionar un Grado Obligatoriamente");
      return errors;
    },
    errorAñoEscolar() {
      const errors = [];
      if (!this.$v.seguimiento.contenido.añoescolar.$dirty) return errors;
      !this.$v.seguimiento.contenido.añoescolar.required &&
        errors.push("Debe ingresar un Año escolar Obligatoriamente");
      !this.$v.seguimiento.contenido.añoescolar.minLength &&
        errors.push("El Año escolar  debe tener al menos 4 caracteres");
      return errors;
    },/*
    errorCargoFirma() {
      const errors = [];
      if (!this.$v.firma.cargo.$dirty) return errors;
      !this.$v.firma.cargo.required && errors.push("Debe ingresar un Cargo");
      !this.$v.firma.cargo.minLength &&
        errors.push("El cargo al menos 4 caracteres");
      return errors;
    },
    errorNombreFirma() {
      const errors = [];
      if (!this.$v.firma.nombre.$dirty) return errors;
      !this.$v.firma.nombre.required && errors.push("Debe ingresar un nombre");
      !this.$v.firma.nombre.minLength &&
        errors.push("El nombre debe tener  al menos 4 caracteres");
      return errors;
    },*/
    errorOrdenTrimestre() {
      const errors = [];
      if (!this.$v.trimestre.orden.$dirty) return errors;
      !this.$v.trimestre.orden.required &&
        errors.push("Debe ingresar un orden");
      !this.$v.trimestre.orden.minLength &&
        errors.push("El trimestre debe tener  al menos 1 caracteres");
      !this.$v.trimestre.orden.numeric &&
        errors.push("Debe Ingresar valores Numericos");
      return errors;
    },
    errorAnalisisTrimestre() {
      const errors = [];
      if (!this.$v.trimestre.analisiseducativo.$dirty) return errors;
      !this.$v.trimestre.analisiseducativo.required &&
        errors.push("Debe ingresar un analisis educativo");
      !this.$v.trimestre.analisiseducativo.minLength &&
        errors.push("El analisis educativo debe tener al menos 4 caracteres");
      return errors;
    },
    errorRecomendacionTrimestre() {
      const errors = [];
      if (!this.$v.trimestre.recomendaciones.$dirty) return errors;
      !this.$v.trimestre.recomendaciones.required &&
        errors.push("Debe ingresar una recomendacion");
      !this.$v.trimestre.recomendaciones.minLength &&
        errors.push("La recomendacion debe tener al menos 4 caracteres");
      return errors;
    },
    errorAreaPuntajes() {
      const errors = [];
      if (!this.$v.puntajes.area.$dirty) return errors;
      !this.$v.puntajes.area.required && errors.push("Debe ingresar un Curso");
      !this.$v.puntajes.area.minLength &&
        errors.push("El puntaje debe tener 2 caracteres");
      return errors;
    },
    errorPromedioPuntajes() {
      const errors = [];
      if (!this.$v.puntajes.promedio.$dirty) return errors;
      !this.$v.puntajes.promedio.required &&
        errors.push("Debe ingresar un promedio");
      !this.$v.puntajes.promedio.minLength &&
        errors.push("el puntaje  debe tener al menos 2 caracteres");
      !this.$v.puntajes.promedio.numeric &&
        errors.push("Debe Ingresar valores Numericos");
      return errors;
    },/*
    errorImagen() {
      return this.$v.firma.urlfirma.required == false &&
        this.$v.firma.urlfirma.$dirty == true
        ? true
        : false;
    },*/
  },
  validations() {
    return {
      seguimiento: {
        historialcontenido: [],
        creadordocumento: {
          //required
        },
        idresidente: {
          required,
        },

        contenido: {
          modalidad: {
            required,
          },
          nivel: {
            required,
          },
          grado: {
            required,
          },
          añoescolar: {
            required,
            minLength: minLength(4),
          },
          trimestre: [],
          //firmas: [],
          codigodocumento: "",
        },
      },/*
      firma: {
        cargo: {
          required,
          minLength: minLength(4),
        },
        nombre: {
          required,
          minLength: minLength(4),
        },
        urlfirma: {
          required,
        },
      },*/
      trimestre: {
        orden: {
          required,
          minLength: minLength(1),
          numeric,
        },
        analisiseducativo: {
          required,
          minLength: minLength(4),
        },
        recomendaciones: {
          required,
          minLength: minLength(4),
        },
      },
      puntajes: {
        area: {
          required,
          minLength: minLength(4),
        },
        promedio: {
          required,
          minLength: minLength(2),
          numeric,
        },
      },
    };
  },
};
</script>

<style></style>
