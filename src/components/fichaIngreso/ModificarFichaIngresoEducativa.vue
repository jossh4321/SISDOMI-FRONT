<template>
  <v-card>
    <v-card-title class="justify-center"
      >Modificar Ficha de Ingreso Educativa</v-card-title
    >
    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step editable step="1">
          Residente
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step editable step="2">
          Institución Educativa
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step editable step="3">
          Encargado
        </v-stepper-step>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content step="1">
          <div class="container-user">
            <form>
              <v-autocomplete
                style="margin-top:10px"
                :items="listaresidentes"
                chips
                dense
                outlined
                v-model="fichaIngreso.idresidente"
                color="#009900"
                label="Residente"
                item-text="nombre"
                item-value="id"
                @input="$v.fichaIngreso.idresidente.$touch()"
                @blur="$v.fichaIngreso.idresidente.$touch()"
                :error-messages="errorResidente"
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
                    {{ data.item.nombre + " " + data.item.apellido }}
                  </v-chip>
                </template>

                <template v-slot:item="data">
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
              </v-autocomplete>

              <v-row>
                <v-col>
                  <v-select
                    label="Nivel"
                    v-model="fichaIngreso.contenido.ieprocedencia.nivel"
                    :items="itemsNivel"
                    color="#009900"
                    :item-text="itemsNivel.text"
                    :item-value="itemsNivel.value"
                    @input="
                      $v.fichaIngreso.contenido.ieprocedencia.nivel.$touch()
                    "
                    @blur="
                      $v.fichaIngreso.contenido.ieprocedencia.nivel.$touch()
                    "
                    :error-messages="errorNivel"
                    outlined
                  ></v-select>
                </v-col>
                <v-col>
                  <v-select
                    label="Grado"
                    v-model="fichaIngreso.contenido.ieprocedencia.grado"
                    :items="itemsGrado"
                    color="#009900"
                    :item-text="itemsGrado.text"
                    :item-value="itemsGrado.value"
                    @input="
                      $v.fichaIngreso.contenido.ieprocedencia.grado.$touch()
                    "
                    @blur="
                      $v.fichaIngreso.contenido.ieprocedencia.grado.$touch()
                    "
                    :error-messages="errorGrado"
                    outlined
                  ></v-select>
                </v-col>
              </v-row>

              <v-textarea
                label="Situacion Academica"
                v-model="fichaIngreso.contenido.ieprocedencia.situacionEscolar"
                color="#009900"
                outlined
                rows="4"
                row-height="30"
                @input="
                  $v.fichaIngreso.contenido.ieprocedencia.situacionEscolar.$touch()
                "
                @blur="
                  $v.fichaIngreso.contenido.ieprocedencia.situacionEscolar.$touch()
                "
                :error-messages="errorSituacionEscolar"
                shaped
              ></v-textarea>
              <v-textarea
                label="Observacion de la Institucion"
                v-model="fichaIngreso.contenido.ieprocedencia.observacion"
                color="#009900"
                outlined
                rows="4"
                row-height="30"
                @input="
                  $v.fichaIngreso.contenido.ieprocedencia.observacion.$touch()
                "
                @blur="
                  $v.fichaIngreso.contenido.ieprocedencia.observacion.$touch()
                "
                :error-messages="errorObservacion"
                shaped
              ></v-textarea>

              <!--Documentos Escolares-->
              <v-card
                style="margin-top:1%;margin-bottom:1%;padding-bottom:1%;background-color:#EAEAEA"
              >
                <v-row>
                  <v-col cols="10">
                    <v-card-title
                      >Documentos Escolares (Opcional)</v-card-title
                    ></v-col
                  >
                  <v-col cols="2">
                    <v-btn
                      class="mx-2"
                      fab
                      dark
                      color="success"
                      @click="abrirDialogoRegistrarDocumentoEscolar"
                    >
                      <v-icon dark>
                        mdi-plus
                      </v-icon>
                    </v-btn>
                  </v-col>
                </v-row>

                <template
                  v-if="
                    fichaIngreso.contenido.ieprocedencia.documentosEscolares ==
                      0
                  "
                >
                  <v-card style="margin:10px">
                    <v-card-title
                      >No hay Documentos Escolares Añadidos</v-card-title
                    >
                  </v-card>
                </template>
                <template v-else>
                  <v-card style="margin:10px">
                    <v-card
                      v-for="(item, i) in fichaIngreso.contenido.ieprocedencia
                        .documentosEscolares"
                      :key="i"
                      style="margin:5px"
                    >
                      <v-list-item
                        v-if="
                          item.archivoDocumento != undefined &&
                            item.archivoDocumento.accion != 'eliminado'
                        "
                      >
                        <v-list-item-content>
                          <v-list-item-title>{{
                            item.titulo
                          }}</v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-icon>
                          <v-btn
                            rounded
                            color="primary"
                            @click="eliminarDocumentoEscolar(i, item)"
                          >
                            <v-icon left>
                              mdi-delete-forever-outline
                            </v-icon>
                            Borrar
                          </v-btn>
                        </v-list-item-icon>
                      </v-list-item>
                    </v-card>
                  </v-card>
                </template>
                <v-dialog
                  v-model="dialogoDocumentoEscolar"
                  width="600px"
                  persistent
                  eager
                >
                  <v-card style="padding:20px">
                    <v-card-title
                      >Registro de Documentos Escolares</v-card-title
                    >
                    <v-form>
                      <v-text-field
                        label="Titulo del Documento"
                        v-model="documentoEscolar.titulo"
                        :error-messages="errorTituloDocumentoEscolar"
                        @input="$v.documentoEscolar.titulo.$touch()"
                        @blur="$v.documentoEscolar.titulo.$touch()"
                        color="success"
                        outlined
                      ></v-text-field>
                      <vue-dropzone
                        ref="myVueDropzoneDocumentosEscolares"
                        @vdropzone-success="afterSuccessDocumentos"
                        @vdropzone-removed-file="afterRemovedDocumentos"
                        id="dropzone3"
                        :options="dropzoneOptionsDocumentos"
                      >
                      </vue-dropzone>
                      <v-card v-if="errorFileDocumentoEscolar" color="red">
                        <v-card-text class="text-center" style="color: white"
                          >Debe Subir un archivo Obligatoriamente</v-card-text
                        >
                      </v-card>
                      <v-row>
                        <v-col cols="6">
                          <v-btn
                            block
                            @click="cerrarDialogoRegistrarDocumentoEscolar"
                            color="primary"
                          >
                            <v-icon left>mdi-close-outline</v-icon>
                            <span>Cerrar</span>
                          </v-btn>
                        </v-col>
                        <v-col cols="6">
                          <v-btn
                            block
                            @click="agregarDocumentoEscolar"
                            color="success"
                          >
                            <v-icon left>mdi-close-outline</v-icon>
                            <span>agregar</span>
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-card>
                </v-dialog>
              </v-card>
              <!------------------------->
              <v-row>
                <v-col>
                  <v-btn block @click="cerrarDialogo" color="primary">
                    <v-icon left>mdi-close-outline</v-icon>
                    <span>Cerrar</span>
                  </v-btn>
                </v-col>
                <!-- <v-col>
                  <v-btn block color="yellow">
                    <v-icon left>mdi-page-next-outline</v-icon>
                    <span>Datos del Residente</span>
                  </v-btn>
                </v-col> -->
                <v-col>
                  <v-btn block @click="step = 2" color="success">
                    <v-icon left>mdi-page-next-outline</v-icon>
                    <span>Continuar</span>
                  </v-btn>
                </v-col>
              </v-row>
            </form>
          </div>
        </v-stepper-content>

        <v-stepper-content step="2">
          <div class="container-user">
            <form>
              <v-text-field
                style="margin-top:10px"
                label="Nombre de Institución Educativa"
                v-model="fichaIngreso.contenido.ieprocedencia.nombre"
                auto-grow
                outlined
                color="#009900"
                @input="$v.fichaIngreso.contenido.ieprocedencia.nombre.$touch()"
                @blur="$v.fichaIngreso.contenido.ieprocedencia.nombre.$touch()"
                :error-messages="errorNombreIE"
              ></v-text-field>

              <v-row>
                <v-col>
                  <v-select
                    label="Tipo"
                    v-model="fichaIngreso.contenido.ieprocedencia.tipo"
                    :items="itemsTipo"
                    color="#009900"
                    :item-text="itemsTipo.text"
                    :item-value="itemsTipo.value"
                    @input="
                      $v.fichaIngreso.contenido.ieprocedencia.tipo.$touch()
                    "
                    @blur="
                      $v.fichaIngreso.contenido.ieprocedencia.tipo.$touch()
                    "
                    :error-messages="errorTipo"
                    outlined
                  ></v-select>
                </v-col>
                <v-col>
                  <v-select
                    label="Modalidad"
                    v-model="fichaIngreso.contenido.ieprocedencia.modalidad"
                    :items="itemsModalidad"
                    color="#009900"
                    :item-text="itemsModalidad.text"
                    :item-value="itemsModalidad.value"
                    @input="
                      $v.fichaIngreso.contenido.ieprocedencia.modalidad.$touch()
                    "
                    @blur="
                      $v.fichaIngreso.contenido.ieprocedencia.modalidad.$touch()
                    "
                    :error-messages="errorModalidad"
                    outlined
                  ></v-select>
                </v-col>
              </v-row>

              <v-text-field
                label="Dirección"
                v-model="fichaIngreso.contenido.ieprocedencia.direccion"
                auto-grow
                outlined
                color="#009900"
                shaped
                :error-messages="errorDireccion"
                @input="
                  $v.fichaIngreso.contenido.ieprocedencia.direccion.$touch()
                "
                @blur="
                  $v.fichaIngreso.contenido.ieprocedencia.direccion.$touch()
                "
              ></v-text-field>
              <v-row>
                <v-col>
                  <v-text-field
                    label="Celular/Telefono"
                    v-model="fichaIngreso.contenido.ieprocedencia.telefono"
                    :error-messages="errorTelefono"
                    @input="
                      $v.fichaIngreso.contenido.ieprocedencia.telefono.$touch()
                    "
                    @blur="
                      $v.fichaIngreso.contenido.ieprocedencia.telefono.$touch()
                    "
                    auto-grow
                    outlined
                    color="#009900"
                    shaped
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    label="Correo"
                    v-model="fichaIngreso.contenido.ieprocedencia.correo"
                    :error-messages="errorCorreo"
                    @input="
                      $v.fichaIngreso.contenido.ieprocedencia.correo.$touch()
                    "
                    @blur="
                      $v.fichaIngreso.contenido.ieprocedencia.correo.$touch()
                    "
                    auto-grow
                    outlined
                    color="#009900"
                    shaped
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-btn block @click="cerrarDialogo" color="primary">
                    <v-icon left>mdi-close-outline</v-icon>
                    <span>Cerrar</span>
                  </v-btn>
                </v-col>
                <v-col>
                  <v-btn block @click="step = 3" color="success">
                    <v-icon left>mdi-page-next-outline</v-icon>
                    <span>Continuar</span>
                  </v-btn>
                </v-col>
              </v-row>
            </form>
          </div>
        </v-stepper-content>

        <v-stepper-content step="3">
          <div class="container-user">
            <form>
              <v-card style="padding:10px;background-color:#EAEAEA">
                <v-card
                  elevation="0"
                  style="background-color:#EAEAEA; padding:10px"
                >
                  <v-row align="center">
                    <v-col :cols="10" align="left">
                      <v-textarea
                        label="Ingrese una Observacion"
                        v-model="observacionAux"
                        color="#009900"
                        outlined
                        rows="4"
                        row-height="30"
                        @input="$v.observacionAux.$touch()"
                        @blur="$v.observacionAux.$touch()"
                        :error-messages="errorObservacionAux"
                        shaped
                      ></v-textarea>
                    </v-col>
                    <v-col :cols="2" align="right">
                      <v-btn
                        fab
                        small
                        dark
                        color="green"
                        @click="agregarObservacion"
                      >
                        <v-icon dark>
                          mdi-plus
                        </v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card>

                <v-card
                  elevation="0"
                  color="#FAFAFA"
                  style="margin:5px;padding:5px"
                  height="60"
                  v-for="(observacion, i) in fichaIngreso.contenido
                    .observaciones"
                  :key="i"
                >
                  <v-row align="center">
                    <v-col :cols="10" align="left">
                      <span
                        >{{ i | numeracionListaString("Observacion") }}
                        {{ observacion | extencionString }}</span
                      >
                    </v-col>
                    <v-col :cols="2" align="right">
                      <v-btn
                        rounded
                        color="primary"
                        @click="eliminarObservacion(i)"
                      >
                        <v-icon left>
                          mdi-delete-forever-outline
                        </v-icon>
                        Borrar
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card>
              </v-card>
              <v-card v-if="errorObservaciones" class="error-card" color="red">
                <v-card-text class="text-center" style="color: white"
                  >Debe Ingresar al menos una Observacion
                </v-card-text>
              </v-card>
              <v-card
                style="margin-top:30px;padding:5px 5px;background-color:#EAEAEA"
              >
                <v-card class="subcard">
                  <v-card-title>Datos del Informante</v-card-title>
                  <v-card
                    class="subcard"
                    style="margin-bottom:7px"
                    color="#e6f3ff"
                  >
                    <v-text-field
                      v-model="this.usuario"
                      label="Autor del Informe de Incidencia"
                      outlined
                      color="info"
                      readonly
                    ></v-text-field>
                  </v-card>
                  <v-card class="subcard" color="#e6f3ff">
                    <v-text-field
                      v-model="this.cargo"
                      label="Cargo del Autor"
                      outlined
                      color="info"
                      readonly
                    ></v-text-field>
                  </v-card>
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
                      <!-- <vue-dropzone
                          ref="myVueDropzoneFirma"
                          @vdropzone-success="afterSuccessFirma"
                          @vdropzone-removed-file="afterRemovedFirma"
                          @vdropzone-mounted="mounteddropzone"
                          id="dropzone2"
                          :options="dropzoneOptionsFirma"
                        >
                        </vue-dropzone>
                        <v-card v-if="errorFirma" class="error-card" color="red">
                          <v-card-text class="text-center" style="color: white"
                            >Debe Subir una firma obligatoriamente
                            </v-card-text
                          >
                        </v-card> -->
                    </div>
                  </v-col>
                </v-row>
              </v-card>
              <v-row>
                <v-col>
                  <v-btn block @click="cerrarDialogo" color="primary">
                    <v-icon left>mdi-close-outline</v-icon>
                    <span>Cerrar</span>
                  </v-btn>
                </v-col>
                <v-col>
                  <v-btn block @click="modificarFicha" color="success">
                    <v-icon left>mdi-content-save-all-outline</v-icon>
                    <span>Modificar Ficha de Ingreso</span>
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
import { mapMutations, mapState, mapGetters } from "vuex";
import {
  required,
  minLength,
  maxLength,
  email,
  helpers,
  numeric,
} from "vuelidate/lib/validators";
import Vuelidate from "vuelidate";
import moment from "moment";

export default {
  props: ["listaresidentes", "listaeducadores", "fichaIngreso"],
  components: {
    vueDropzone: vue2Dropzone,
  },
  data() {
    return {
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
      itemsTipo: [
        { value: "PRIVADA", text: "Institucion Privada" },
        { value: "ESTATAL", text: "Institcuion Estatal" },
      ],
      itemGrado: [
        { value: "1", text: "1" },
        { value: "2", text: "2" },
        { value: "3", text: "3" },
        { value: "4", text: "4" },
        { value: "5", text: "5" },
      ],
      itemSexo: [
        { value: "1", text: "Femenino" },
        { value: "2", text: "Masculino" },
      ],
      dropzoneOptionsFirma: {
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
      dropzoneOptionsDocumentos: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 250,
        maxFilesize: 10.0,
        maxFiles: 1,
        acceptedFiles: ".pdf",
        headers: { "My-Awesome-Header": "header value" },
        addRemoveLinks: true,
        dictDefaultMessage:
          "Seleccione una observacion de su dispositivo o arrástrela aquí",
      },
      documentoEscolar: {
        titulo: "",
        file: "",
      },
      dialogoDocumentoEscolar: false,
      observacionAux: "",
      step: 1,
      imagenFirma: {},
      usuario: "",
      cargo: "",
      firma: "",
    };
  },
  created() {
    /*
      this.imagenFirma = {urlOrigen: this.fichaIngreso.contenido.firma.urlfirma,
                        modificar:{estado:false,file:{}}};
      console.log("Se creo la instancia");
      console.log(this.fichaIngreso);*/
    this.fichaIngreso.contenido.ieprocedencia.documentosEscolares = this.fichaIngreso.contenido.ieprocedencia.documentosEscolares.map(
      (val) => {
        return {
          titulo: val.titulo,
          archivoDocumento: {
            urlOrigen: val.url,
            accion: "creado",
            //cuando no es un archivo modificado
            estado: false,
          },
        };
      }
    );
    this.obtenerCreador();
  },
  methods: {
    ...mapMutations(["replaceFichaIngreso"]),
    /*mounteddropzone(){
            var file = { size: 123, name: "Firma del Documento", type: "image/jpg" };
            this.$refs.myVueDropzoneFirma.manuallyAddFile(file, this.fichaIngreso.contenido.firma.urlfirma,null,null,true);
          },*/
    verificarAccion(accion) {
      if (accion != "eliminado" || accion != undefined) {
        return true;
      } else {
        return false;
      }
    },
    async obtenerCreador() {
      await axios
        .get("/usuario/rol/permiso?id=" + this.fichaIngreso.creadordocumento)
        .then((x) => {
          this.usuario = x.data.datos.nombre + " " + x.data.datos.apellido;
          this.cargo = x.data.rol.nombre;
          this.firma = x.data.datos.firma;
        })
        .catch((err) => console.log(err));
    },
    agregarDocumentoEscolar() {
      this.$v.documentoEscolar.$touch();
      if (!this.$v.documentoEscolar.$invalid) {
        this.fichaIngreso.contenido.ieprocedencia.documentosEscolares.push({
          titulo: this.documentoEscolar.titulo,
          archivoDocumento: {
            urlOrigen: this.documentoEscolar.file,
            accion: "agregado",
            estado: true,
          },
        });
        this.cerrarDialogoRegistrarDocumentoEscolar();
      }
    },
    abrirDialogoRegistrarDocumentoEscolar() {
      this.dialogoDocumentoEscolar = true;
    },
    cerrarDialogoRegistrarDocumentoEscolar() {
      this.dialogoDocumentoEscolar = false;
      this.$refs.myVueDropzoneDocumentosEscolares.removeAllFiles();
      this.documentoEscolar = { titulo: "", file: "" };
      this.$v.documentoEscolar.$reset();
    },
    eliminarDocumentoEscolar(indice, item) {
      if (item.archivoDocumento.accion == "agregado") {
        this.fichaIngreso.contenido.ieprocedencia.documentosEscolares.splice(
          indice,
          1
        );
      } else {
        item.archivoDocumento.accion = "eliminado";
        this.fichaIngreso.contenido.ieprocedencia.documentosEscolares.splice(
          indice,
          1,
          item
        );
      }
    },
    /*afterSuccessFirma(file, response){
          this.imagenFirma.modificar.estado = true;
          this.imagenFirma.modificar.file = file;
          console.log(this.imagenFirma.modificar.file);
      },afterRemovedFirma(){
          this.imagenFirma.modificar.estado = true;
          this.imagenFirma.modificar.file = {};
      },*/ afterSuccessDocumentos(
      file,
      response
    ) {
      this.documentoEscolar.file = file;
    },
    afterRemovedDocumentos() {},
    filtrarArchivos(accion, lista) {
      return lista.filter((x) => x.archivoDocumento.accion == accion);
    },
    //Modificacion de  PDF
    async modificarDocumentosEscolares(lista) {
      var promises;
      listaArchivosEliminados = [];
      listaArchivosAñadidos = [];
      listaArchivosOriginales = [];
      var listaArchivosEliminados = this.filtrarArchivos("eliminado", lista);
      var listaArchivosAñadidos = this.filtrarArchivos("agregado", lista);
      var listaArchivosOriginales = this.filtrarArchivos("creado", lista);
      if (listaArchivosEliminados.length != 0) {
        await this.eliminarPdf(
          listaArchivosEliminados.map((x) => {
            return x.archivoDocumento.urlOrigen;
          })
        );
      }
      if (listaArchivosAñadidos.length != 0) {
        promises = listaArchivosAñadidos.map(async (val) => {
          var urlfile = await this.registrarPdf(val.archivoDocumento.urlOrigen);
          return { titulo: val.titulo, url: urlfile };
        });
        listaArchivosAñadidos = await Promise.all(promises);
      }
      if (listaArchivosOriginales.length != 0) {
        listaArchivosOriginales = listaArchivosOriginales.map((x) => {
          return { titulo: x.titulo, url: x.archivoDocumento.urlOrigen };
        });
      }

      return listaArchivosAñadidos.length == 0
        ? listaArchivosOriginales
        : listaArchivosAñadidos.concat(listaArchivosOriginales);
    },
    async eliminarPdf(listaUrls) {
      console.log(listaUrls);
      await axios.post("/Media/archivos/pdf/delete", listaUrls).then((res) => {
        console.log(res.data);
      });
    },
    async registrarPdf(file) {
      var urlFile = "";
      let formData = new FormData();
      formData.append("file", file);
      await axios.post("/Media/archivos/pdf", formData).then((res) => {
        urlFile = res.data;
      });
      return urlFile;
    },
    //Modificacion de Firmas
    async modificaFirma() {
      var url = this.imagenFirma.urlOrigen;
      var urlFile = "";
      let formData = new FormData();
      formData.append("file", this.imagenFirma.modificar.file);
      //var mediabody={file:{File:formData}, urlfirma: this.imagenFirma.urlOrigen }
      await axios
        .put(`/Media/${this.imagenFirma.urlOrigen}`, formData)
        .then((res) => {
          urlFile = res.data;
        });
      return urlFile;
    },
    cerrarDialogo() {
      this.$emit("cerrar-modal-edicion-ficha-ingreso");
      this.step = 1;
      this.$refs.myVueDropzoneDocumentosEscolares.removeAllFiles();
      //this.$refs.myVueDropzoneFirma.removeAllFiles();
      this.observacionAux = "";
      this.documentoEscolar = { titulo: "", file: "" };
      this.$v.$reset();
    }, //modificar ficha
    async modificarFicha() {
      this.$v.fichaIngreso.$touch();
      if (this.$v.fichaIngreso.$invalid) {
        await this.mensaje(
          "error",
          "..Oops",
          "Se encontraron errores en el formulario",
          "<strong>Verifique los campos Ingresados<strong>"
        );
      } else {
        console.log(this.fichaIngreso);
        //var url = await this.registrarFirma(this.fichaIngreso.contenido.firma.urlfirma);
        var fichaIngresoPUT = this.fichaIngreso;
        /*fichaIngresoPUT.contenido.firma.urlfirma =
            this.imagenFirma.modificar.estado==true?
                  await this.modificaFirma():
                  this.imagenFirma.urlOrigen;*/
        fichaIngresoPUT.contenido.ieprocedencia.documentosEscolares = await this.modificarDocumentosEscolares(
          fichaIngresoPUT.contenido.ieprocedencia.documentosEscolares
        );
        //fichaeducativaingreso
        console.log("hola");
        await axios
          .put("/documento/fichaingresoeducativa", fichaIngresoPUT)
          .then((res) => {
            this.replaceFichaIngreso(res.data);
            this.cerrarDialogo();
          })
          .catch((err) => console.log(err));
        await this.mensaje(
          "success",
          "listo",
          "Ficha de Ingreso Educativo Modificada Satisfactoriamente",
          "<strong>Se redirigira a la Interfaz de Gestion<strong>"
        );
      }
    },
    async registrarFirma(file) {
      var urlFile = "";
      let formData = new FormData();
      formData.append("file", file);
      await axios.post("/Media", formData).then((res) => {
        urlFile = res.data;
      });
      return urlFile;
    },
    agregarObservacion() {
      this.$v.observacionAux.$touch();
      if (!this.$v.observacionAux.$invalid) {
        this.fichaIngreso.contenido.observaciones.push(this.observacionAux);
        this.observacionAux = "";
        this.$v.observacionAux.$reset();
      }
    },
    eliminarObservacion(indice) {
      this.fichaIngreso.contenido.observaciones.splice(indice, 1);
    },
    agregarDocEscolar() {
      let docEscolares = this.docEscolar;
      this.fichaIngreso.contenido.documentosescolares.push(docEscolares);
      this.docEscolares = this.fichaIngreso.contenido.documentosescolares;
      this.docEscolar = "";
    },
    eliminarDocEscolar(docEscolar) {
      this.docEscolares.forEach(function(car, index, object) {
        if (car === docEscolar) {
          object.splice(index, 1);
        }
      });
    },
    async mensaje(icono, titulo, texto, footer) {
      await this.$swal({
        icon: icono,
        title: titulo,
        text: texto,
        footer: footer,
      });
    },
    limpiarFichaIngreso() {
      return {
        id: "",
        tipo: "FichaEducativaIngreso",
        historialcontenido: [],
        creadordocumento: "",
        fechacreacion: "",
        area: "educativa",
        fase: "acogida",
        idresidente: "",
        estado: "creado",
        contenido: {
          ieprocedencia: {
            nombre: "",
            tipo: "PRIVADA",
            modalidad: "EBA",
            nivel: "PRIMARIA",
            grado: "1",
            observacion: "",
            direccion: "",
            telefono: "",
            correo: "",
            documentosEscolares: [],
            situacionEscolar: "",
          },
          observaciones: [],
          firma: {
            urlfirma: "",
            nombre: "",
            cargo: "",
          },
          codigoDocumento: "",
        },
      };
    },
  },
  filters: {
    extencionString: (cadena) => {
      return cadena.length > 35 ? `${cadena.substring(0, 34)}...` : cadena;
    },
    numeracionListaString: (index, etiqueta) => {
      return `${etiqueta} ${++index}: `;
    },
    generarAvatar: (datos) => {
      return `${datos.nombre.substring(0, 1)}${datos.apellido.substring(0, 1)}`;
    },
  },
  computed: {
    ...mapGetters(["user"]),
    //cambie la lista de grados segun el nivel seleccionado en el formulario
    itemsGrado() {
      const listaGrados = [
        { value: "1", text: "Primero" },
        { value: "2", text: "Segundo" },
        { value: "3", text: "Tercero" },
        { value: "4", text: "Cuarto" },
        { value: "5", text: "Quinto" },
      ];
      if (this.fichaIngreso.contenido.ieprocedencia.nivel == "PRIMARIA") {
        listaGrados.push({ value: "6", text: "Sexto" });
      }
      this.fichaIngreso.contenido.ieprocedencia.grado = "1";
      return listaGrados;
    },
    errorNombreIE() {
      const errors = [];
      if (!this.$v.fichaIngreso.contenido.ieprocedencia.nombre.$dirty)
        return errors;
      !this.$v.fichaIngreso.contenido.ieprocedencia.nombre.required &&
        errors.push("Debe ingresar un Nombre Obligatoriamente");
      !this.$v.fichaIngreso.contenido.ieprocedencia.nombre.minLength &&
        errors.push("El nombre debe poseer al menos 5 caracteres");
      !this.$v.fichaIngreso.contenido.ieprocedencia.nombre.maxLength &&
        errors.push("El nombre no debe poseer mas de 50 caracteres ");
      return errors;
    },
    errorTelefono() {
      const errors = [];
      if (!this.$v.fichaIngreso.contenido.ieprocedencia.telefono.$dirty)
        return errors;
      !this.$v.fichaIngreso.contenido.ieprocedencia.telefono.required &&
        errors.push("Debe ingresar un Telefono Obligatoriamente");
      !this.$v.fichaIngreso.contenido.ieprocedencia.telefono.numeric &&
        errors.push("Debe Ingresar solo caracteres Numericos");
      !this.$v.fichaIngreso.contenido.ieprocedencia.telefono.length &&
        errors.push("El telefono debe poseer 9 Caracteres Obligatoriamente");
      return errors;
    },
    errorCorreo() {
      const errors = [];
      if (!this.$v.fichaIngreso.contenido.ieprocedencia.correo.$dirty)
        return errors;
      !this.$v.fichaIngreso.contenido.ieprocedencia.correo.required &&
        errors.push("Debe Ingresar el e-mail obligatoriamente");
      !this.$v.fichaIngreso.contenido.ieprocedencia.correo.email &&
        errors.push("Debe poseer el formato sample@domain.something");
      return errors;
    },
    errorObservacion() {
      const errors = [];
      if (!this.$v.fichaIngreso.contenido.ieprocedencia.observacion.$dirty)
        return errors;
      !this.$v.fichaIngreso.contenido.ieprocedencia.observacion.required &&
        errors.push("Debe Ingresar una Observacion Obligatoriamente");
      !this.$v.fichaIngreso.contenido.ieprocedencia.observacion.minLength &&
        errors.push("La Observacion debe tener al menos 10 caracteres");
      !this.$v.fichaIngreso.contenido.ieprocedencia.observacion.maxLength &&
        errors.push("La Observacion debe tener 200 caracteres como maximo");
      return errors;
    },
    errorSituacionEscolar() {
      const errors = [];
      if (!this.$v.fichaIngreso.contenido.ieprocedencia.situacionEscolar.$dirty)
        return errors;
      !this.$v.fichaIngreso.contenido.ieprocedencia.situacionEscolar.required &&
        errors.push("Debe Ingresar una Situacion Obligatoriamente");
      !this.$v.fichaIngreso.contenido.ieprocedencia.situacionEscolar
        .minLength &&
        errors.push("La Situacion debe tener al menos 10 caracteres");
      !this.$v.fichaIngreso.contenido.ieprocedencia.situacionEscolar
        .maxLength &&
        errors.push("La Situacion debe tener 200 caracteres como maximo");
      return errors;
    },
    errorDireccion() {
      const errors = [];
      if (!this.$v.fichaIngreso.contenido.ieprocedencia.direccion.$dirty)
        return errors;
      !this.$v.fichaIngreso.contenido.ieprocedencia.direccion.required &&
        errors.push("Debe Ingresar una direccion Obligatoriamente");
      !this.$v.fichaIngreso.contenido.ieprocedencia.direccion.minLength &&
        errors.push("La direccion debe tener al menos 10 caracteres");
      !this.$v.fichaIngreso.contenido.ieprocedencia.direccion.maxLength &&
        errors.push("La direccion debe tener 100 caracteres como maximo");
      return errors;
    },
    errorModalidad() {
      const errors = [];
      if (!this.$v.fichaIngreso.contenido.ieprocedencia.modalidad.$dirty)
        return errors;
      !this.$v.fichaIngreso.contenido.ieprocedencia.modalidad.required &&
        errors.push("Debe Ingresar una modalidad Obligatoriamente");
      return errors;
    },
    errorTipo() {
      const errors = [];
      if (!this.$v.fichaIngreso.contenido.ieprocedencia.tipo.$dirty)
        return errors;
      !this.$v.fichaIngreso.contenido.ieprocedencia.tipo.required &&
        errors.push("Debe Ingresar un tipo Obligatoriamente");
      return errors;
    },
    errorNivel() {
      const errors = [];
      if (!this.$v.fichaIngreso.contenido.ieprocedencia.nivel.$dirty)
        return errors;
      !this.$v.fichaIngreso.contenido.ieprocedencia.nivel.required &&
        errors.push("Debe Seleccionar un Nivel Obligatoriamente");
      return errors;
    },
    errorGrado() {
      const errors = [];
      if (!this.$v.fichaIngreso.contenido.ieprocedencia.grado.$dirty)
        return errors;
      !this.$v.fichaIngreso.contenido.ieprocedencia.grado.required &&
        errors.push("Debe Seleccionar un Grado Obligatoriamente");
      return errors;
    },
    errorTituloDocumentoEscolar() {
      const errors = [];
      if (!this.$v.documentoEscolar.titulo.$dirty) return errors;
      !this.$v.documentoEscolar.titulo.required &&
        errors.push("Debe Ingresar un titulo Obligatoriamente");
      !this.$v.documentoEscolar.titulo.minLength &&
        errors.push("El titulo debe poseer al menos 10 caracteres");
      !this.$v.documentoEscolar.titulo.maxLength &&
        errors.push("El titulo no puede poseer mas de 50 caracteres");
      return errors;
    },
    errorFileDocumentoEscolar() {
      return this.$v.documentoEscolar.file.required == false &&
        this.$v.documentoEscolar.file.$dirty == true
        ? true
        : false;
    },
    errorObservacionAux() {
      const errors = [];
      if (!this.$v.observacionAux.$dirty) return errors;
      !this.$v.observacionAux.required &&
        errors.push("Debe Ingresar una Observacion Obligatoriamente");
      !this.$v.observacionAux.minLength &&
        errors.push("La observacion debe poseer al menos 10 caracteres");
      !this.$v.observacionAux.maxLength &&
        errors.push("La observacion no puede poseer mas de 300 caracteres");
      return errors;
    },
    errorObservaciones() {
      return this.$v.fichaIngreso.contenido.observaciones.required == false &&
        this.$v.fichaIngreso.contenido.observaciones.$dirty == true
        ? true
        : false;
    },
    errorFirma() {
      return this.$v.fichaIngreso.contenido.firma.urlfirma.required == false &&
        this.$v.fichaIngreso.contenido.firma.urlfirma.$dirty == true
        ? true
        : false;
    },
    errorResidente() {
      const errors = [];
      if (!this.$v.fichaIngreso.idresidente.$dirty) return errors;
      !this.$v.fichaIngreso.idresidente.required &&
        errors.push("Debe Seleccionar un residente Obligatoriamente");
      return errors;
    },
    errorFirma() {
      if (
        this.imagenFirma.modificar.estado == true &&
        Object.entries(this.imagenFirma.modificar.file).length === 0
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
  validations() {
    const length = (value) => value.length == 9;
    return {
      fichaIngreso: {
        idresidente: { required },
        contenido: {
          ieprocedencia: {
            nombre: {
              required,
              minLength: minLength(5),
              maxLength: maxLength(50),
            },
            tipo: { required },
            modalidad: { required },
            nivel: { required },
            grado: { required },
            observacion: {
              required,
              minLength: minLength(10),
              maxLength: maxLength(200),
            },
            direccion: {
              required,
              minLength: minLength(10),
              maxLength: maxLength(100),
            },
            telefono: { required, length, numeric },
            correo: { required, email },
            situacionEscolar: {
              required,
              minLength: minLength(10),
              maxLength: maxLength(200),
            },
          },
          observaciones: {
            required,
          } /*
              firma: {
                 urlfirma:{
                  required,
                }
              }*/,
        },
      },
      documentoEscolar: {
        titulo: {
          required,
          minLength: minLength(10),
          maxLength: maxLength(50),
        },
        file: { required },
      },
      observacionAux: {
        required,
        minLength: minLength(10),
        maxLength: maxLength(300),
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
