<template>
  <v-card>
    <v-card-title class="justify-center"
      >Modificar Informe Educativo Evolutivo</v-card-title
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
      <!-- fdsfs -->
      <v-stepper-items>
        <v-stepper-content step="1">
          <div class="container-user">
            <form>
              <v-card class="subcard card-padre" style="margin-bottom:20px">
                <v-card
                  class="subcard"
                  style="margin-bottom:7px"
                  color="#e6f3ff"
                >
                  <span>
                    Residente: {{ this.residenteDocumento.nombre }}
                    {{ this.residenteDocumento.apellido }}
                  </span>
                </v-card>
                <v-card class="subcard" color="#e6f3ff">
                  <span>
                    Fecha de Ingreso:
                    {{ this.residenteDocumento.fechaingreso | formatoFecha }}
                  </span>
                </v-card>
              </v-card>
              <v-text-field
                v-model="informe.contenido.iereinsersion.nombre"
                label="Instirución Educativa"
                outlined
                @input="$v.informe.contenido.iereinsersion.nombre.$touch()"
                @blur="$v.informe.contenido.iereinsersion.nombre.$touch()"
                :error-messages="errorNombreIE"
                color="#009900"
              ></v-text-field>
              <v-row>
                <v-col cols="12" md="4">
                  <v-select
                    label="Modalidad"
                    v-model="informe.contenido.iereinsersion.modalidad"
                    :items="itemsModalidad"
                    color="#009900"
                    :item-text="itemsModalidad.text"
                    :item-value="itemsModalidad.value"
                    @input="
                      $v.informe.contenido.iereinsersion.modalidad.$touch()
                    "
                    @blur="
                      $v.informe.contenido.iereinsersion.modalidad.$touch()
                    "
                    :error-messages="errorModalidadIE"
                    outlined
                  ></v-select>
                </v-col>
                <v-col cols="12" md="4">
                  <v-select
                    label="Nivel Educativo"
                    v-model="informe.contenido.iereinsersion.nivel"
                    :items="itemsNivel"
                    color="#009900"
                    :item-text="itemsNivel.text"
                    :item-value="itemsNivel.value"
                    @input="$v.informe.contenido.iereinsersion.nivel.$touch()"
                    @blur="$v.informe.contenido.iereinsersion.nivel.$touch()"
                    :error-messages="errorNivelIE"
                    outlined
                  ></v-select>
                </v-col>
                <v-col cols="12" md="4">
                  <v-select
                    label="Grado"
                    v-model="informe.contenido.iereinsersion.grado"
                    :items="itemsGrado"
                    color="#009900"
                    :item-text="itemsGrado.text"
                    :item-value="itemsGrado.value"
                    @input="$v.informe.contenido.iereinsersion.grado.$touch()"
                    @blur="$v.informe.contenido.iereinsersion.grado.$touch()"
                    :error-messages="errorGradoIE"
                    outlined
                  ></v-select>
                </v-col>
              </v-row>
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
                        @input="$v.logro.$touch()"
                        @blur="$v.logro.$touch()"
                        :error-messages="errorLogro"
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
                  <v-btn color="warning" block @click="actualizarInforme()">
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
    <v-dialog width="450px" v-model="cargaRegistro" persistent>
      <v-card height="300px">
        <v-card-title class="justify-center"
          >Actualizando el Informe Educativo Evolutivo</v-card-title
        >
        <div>
          <v-progress-circular
            style="display: block;margin:40px auto;"
            :size="90"
            :width="9"
            color="purple"
            indeterminate
          ></v-progress-circular>
        </div>
        <v-card-subtitle
          class="justify-center"
          style="font-weight:bold;text-align:center"
          >En unos momentos finalizaremos...</v-card-subtitle
        >
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
function esTexto(value) {
  return /^[A-Za-z\sáéíóúÁÉÍÓÚñÑ]+$/.test(value);
}
function esParrafo(value) {
  return /^[A-Za-z\d\s.,;°"“()áéíóúÁÉÍÓÚñÑ]+$/.test(value);
}
export default {
  props: ["residenteDocumento"],
  components: {
    vueDropzone: vue2Dropzone,
  },
  data() {
    return {
      usua:"",
      itemsModalidad: [
        { value: "EBA", text: "Educacion Basica Alternativa" },
        { value: "EBE", text: "Educacion Basica Especial" },
        { value: "EBR", text: "Educacion Basica Regular" },
      ],
      itemsNivel: [
        { value: "PRIMARIA", text: "Nivel Primaria" },
        { value: "SECUNDARIA", text: "Nivel Secundaria" },
      ],
      fileList: [],
      datemenu: false,
      step: 1,
      dialogVistaPreviaAnexos: false,
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 250,
        maxFilesize: 3.0,
        maxFiles: 1,
        acceptedFiles: ".pdf",
        headers: { "My-Awesome-Header": "header value" },
        addRemoveLinks: true,
        dictDefaultMessage:
          "Seleccione un archivo anexo de su dispositivo o arrástrelo aquí",
      },
      logro: "",
      logros: [],
      recomendacion: "",
      recomendaciones: [],
      imagen: "",
      pdf: "",
      residente: "",
      usuario: "",
      cargo: "",
      firma: "",
      informeid: "",
      informe: {
        id: "",
        tipo: "",
        historialcontenido: [],
        creadordocumento: "",
        fechacreacion: null,
        area: "",
        fase: "",
        idresidente: "",
        estado: "",
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
          codigodocumento: "",
        },
      },
      cargaRegistro: false,
    };
  },
  filters: {
    formatoFecha: (fecha) => {
      var formato = moment(fecha);
      return formato.format("llll");
    },
  },
  async created() {
    await this.obtenerInformeId();
    this.informe = await this.loadInformeModificacion(this.informeid);
    this.cargarLogros();
    this.cargarRecomendaciones();
    this.obtenerResidente();
    this.obtenerCreador();
  },
  methods: {
    ...mapMutations(["replaceInforme"]),

    async obtenerInformeId() {
      await axios
        .get(
          "/documento/InformeEducativoEvolutivo/residente/" +
            this.residenteDocumento.id
        )
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
          this.usua = x.data;
        })
        .catch((err) => console.log(err));
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
      console.log(this.informe.contenido.anexos);
    },
    async actualizarInforme() {
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
        this.cargaRegistro = true;
        var urlPDF = await this.generarPDF();
        this.informe.historialcontenido.push({
          url: urlPDF.substring(51),
        });
        await axios
          .put("/informe/informeee", this.informe)
          .then((res) => {
            this.informe = res.data;
            var resi = this.residenteDocumento;
            var info = {
              id: res.data.id,
              tipo: res.data.tipo.replace(/([a-z])([A-Z])/g, "$1 $2"),
              codigodocumento: res.data.contenido.codigodocumento,
              nombrecompleto: resi.nombre + " " + resi.apellido,
            };
            this.cargaRegistro = false;
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
    async obtenerResidente() {
      await axios
        .get("/residente/id?id=" + this.informe.idresidente)
        .then((x) => {
          this.residente = x.data.nombre + " " + x.data.apellido;
        })
        .catch((err) => console.log(err));
    },
    agregarLogros() {
      this.$v.logro.$touch();
      if (!this.$v.logro.$invalid) {
        let logros = this.logro;
        this.informe.contenido.logroalcanzado.push(logros);
        this.logros = this.informe.contenido.logroalcanzado;
        this.logro = "";
        this.$v.logro.$reset();
      }
    },
    eliminarLogros(logro) {
      this.logros.forEach(function(car, index, object) {
        if (car === logro) {
          object.splice(index, 1);
        }
      });
    },
    cargarLogros() {
      this.logros = this.informe.contenido.logroalcanzado;
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
    cargarRecomendaciones() {
      this.recomendaciones = this.informe.contenido.recomendaciones;
    },
    async mensaje(icono, titulo, texto, footer) {
      await this.$swal({
        icon: icono,
        title: titulo,
        text: texto,
        footer: footer,
      });
    },
    eliminarAnexo(index) {
      this.informe.contenido.anexos.splice(index, 1);
    },
    verAnexo(index) {
      this.pdf = this.informe.contenido.anexos[index].url;
      console.log(this.pdf), (this.dialogVistaPreviaAnexos = true);
    },
    cerrarVistaPreviaAnexo() {
      this.dialogVistaPreviaAnexos = false;
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
    async generarPDF(){
        var doc = new jsPDF();
        var pageSize = doc.internal.pageSize;
        var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
        var pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
        var logo = 'data:image/png;base64,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';
        doc.addImage(logo, 'JPEG', 20, 20, 73, 20);
        doc.autoTable({
          theme: 'plain',
          margin: {
            top: 20,
            left: 25,
            right: 25,
          },
          body: [
            [""],[""],[""],[""],
            [{ content: 'INFORME EDUCATIVO EVOLUTIVO',styles: { halign: 'center', fontStyle:'bold', fontSize: 12 } }],
            [{ content: 'I. DATOS GENERALES: ', styles: { fontStyle:'bold', fontSize: 11 } }],
            [{ content: 'Apellidos y Nombres: '+ this.residenteDocumento.apellido +" "+this.residenteDocumento.nombre, styles: { fontStyle:'normal', fontSize: 11, cellPadding: {left: 7} } }],
            [{ content: 'Edad: '+this.residenteEdad() +' años'+'          DNI: ' + this.residenteDocumento.numerodocumento ,styles: { fontStyle:'normal', fontSize: 11, cellPadding: {left: 7} } }],
            [{ content: 'Lugar y Fecha de Nacimiento: ' + this.residenteDocumento.lugarnacimiento + " " + this.convertirFechas(this.residenteDocumento.fechanacimiento), styles: { fontStyle:'normal', fontSize: 11, cellPadding: {left: 7}} }],
            [{ content: 'Fecha de Ingreso al CAR: '+ this.convertirFechas(this.residenteDocumento.fechaingreso),styles: { fontStyle:'normal', fontSize: 11, cellPadding: {left: 7} } }],
            [{ content: 'Juzgado de procedencia: '+this.residenteDocumento.juzgadoprocedencia+'          Nº de Expediente: ' + await this.obtenerExpediente() ,styles: { fontStyle:'normal', fontSize: 11, cellPadding: {left: 7} } }],
            [{ content: 'Fecha de Informe: '+ new Date().toLocaleDateString(),styles: { fontStyle:'normal', fontSize: 11, cellPadding: {left: 7} } }],
            [{ content: '--------------------------------------------------------------------------------------------------------------------------',styles: { fontStyle:'bold', fontSize: 11 } }],
            [{ content: 'II. REINSERSION / INSERSION EDUCATIVA:', styles: { fontStyle:'bold', fontSize: 11 } }],
            [{ content: 'Institución Educativa: '+ this.informe.contenido.iereinsersion.nombre, styles: { fontStyle:'normal', fontSize: 11, cellPadding: {left: 7} } }],
            [{ content: 'Modalidad: ' + this.informe.contenido.iereinsersion.modalidad+ '          Nivel: ' + this.informe.contenido.iereinsersion.nivel+'          Grado: ' + this.informe.contenido.iereinsersion.grado,styles: { fontStyle:'normal', fontSize: 11, cellPadding: {left: 7} } }],
            [{ content: 'III. ANTECEDENTES:', styles: { fontStyle:'bold', fontSize: 11 } }],
            [{ content: this.informe.contenido.antecedentes,styles: { fontStyle:'normal', fontSize: 11, cellPadding: {left: 7} } }],
            [{ content: 'IV. SITUACIÓN EDUCATIVA ACTUAL:', styles: { fontStyle:'bold', fontSize: 11 } }],
            [{ content: this.informe.contenido.situacionactual,styles: { fontStyle:'normal', fontSize: 11, cellPadding: {left: 7} } }],
            [{ content: 'V. LOGROS ALCANZADOS:', styles: { fontStyle:'bold', fontSize: 11 } }],
            [{ content: this.logrosPdf(),styles: { fontStyle:'normal', fontSize: 11, cellPadding: {left: 7} } }],
            [{ content: 'VI. RECOMENDACIONES:', styles: { fontStyle:'bold', fontSize: 11 } }],
            [{ content: this.recomendacionesPdf(),styles: { fontStyle:'normal', fontSize: 11, cellPadding: {left: 7} } }],
          ],
          didDrawPage: function (data) {
            // Footer
            var str = "Página " + doc.internal.getNumberOfPages()
            doc.setFontSize(10);
            doc.text(str, pageWidth / 2, pageHeight - 10, 'center'); //23
          },
          
        });
        /* No permite acceso F
        var image = getBase64Image(document.getElementById("imageid"));
        console.log(image);  */ 
        if (doc.autoTableEndPosY() + 34 < pageHeight - 23) {
          //doc.addImage(imgData, 'JPEG', (pageWidth / 2) - 27, doc.autoTableEndPosY() + 1, 55, 35);
          doc.setFontSize(10);
          doc.setFontType('bold');
          doc.text("---------------------------------------", pageWidth / 2, doc.autoTableEndPosY() + 24, 'center');
          doc.text(this.usua.datos.nombre + " " + this.usua.datos.apellido, pageWidth / 2, doc.autoTableEndPosY() + 29, 'center');
          doc.text(this.usua.rol.nombre, pageWidth / 2, doc.autoTableEndPosY() + 34, 'center');
        } else {
          doc.addPage();
        // Footer
          var str = "Página " + doc.internal.getNumberOfPages()
          doc.setFontSize(10);
          doc.text(str, pageWidth / 2, pageHeight - 10, 'center');
          //doc.addImage(imgData, 'JPEG', (pageWidth / 2) - 27, 37, 55, 35);
          doc.setFontSize(10);
          doc.setFontType('bold');
          doc.text("---------------------------------------", pageWidth / 2, 46, 'center');
          doc.text(this.usua.datos.nombre + " " + this.usua.datos.apellido, pageWidth / 2, 51, 'center');
          doc.text(this.usua.rol.nombre, pageWidth / 2, 56, 'center');
        }
        return doc.output('datauristring');
      },
      logrosPdf(){
        var observaciones = "";
        this.informe.contenido.logroalcanzado.forEach(element => 
          observaciones += "- "+ element + "\n"
        );
        return observaciones
      },
      recomendacionesPdf(){
        var observaciones = "";
        this.informe.contenido.recomendaciones.forEach(element => 
          observaciones += "- "+ element + "\n"
        );
        return observaciones
      },
      convertirFechas(fechaConvertir){
        var fecha = new Date(fechaConvertir);
        return fecha.toLocaleDateString();
      },
      residenteEdad(){
        var hoy = new Date();
        var cumpleanos = new Date(this.residenteDocumento.fechanacimiento);
        var edad = hoy.getFullYear() - cumpleanos.getFullYear();
        var m = hoy.getMonth() - cumpleanos.getMonth();
        if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
          edad--;
        }
        return edad;
      },
      async obtenerExpediente(){
        var codigoExpediente = "";
        await axios
          .get("/expediente/idresidente?idresidente="+this.residenteDocumento.id)
          .then((res) => {
            codigoExpediente = res.data.numeroexpediente;
          })
          .catch((err) => console.log(err));
        return codigoExpediente;
      }
  },
  computed: {
    verifyColor() {
      return "red";
    },
    itemsGrado() {
      const listaGrados = [
        { value: "1", text: "Primero" },
        { value: "2", text: "Segundo" },
        { value: "3", text: "Tercero" },
        { value: "4", text: "Cuarto" },
        { value: "5", text: "Quinto" },
      ];
      if (this.informe.contenido.iereinsersion.nivel == "PRIMARIA") {
        listaGrados.push({ value: "6", text: "Sexto" });
      }
      this.informe.contenido.iereinsersion.grado = "1";
      return listaGrados;
    },
    errorNombreIE() {
      const errors = [];
      if (!this.$v.informe.contenido.iereinsersion.nombre.$dirty) return errors;
      !this.$v.informe.contenido.iereinsersion.nombre.required &&
        errors.push("Debe ingresar el nombre de la Institución Educativa");
      !this.$v.informe.contenido.iereinsersion.nombre.esParrafo &&
        errors.push(
          "El nombre de la institucion educativa no debe contener caracteres especiales"
        );
      return errors;
    },
    errorModalidadIE() {
      const errors = [];
      if (!this.$v.informe.contenido.iereinsersion.modalidad.$dirty)
        return errors;
      !this.$v.informe.contenido.iereinsersion.modalidad.required &&
        errors.push("Debe ingresar la modalidad");
      !this.$v.informe.contenido.iereinsersion.modalidad.esTexto &&
        errors.push(
          "La modalidad de la institucion educativa no debe contener caracteres especiales"
        );
      return errors;
    },
    errorNivelIE() {
      const errors = [];
      if (!this.$v.informe.contenido.iereinsersion.nivel.$dirty) return errors;
      !this.$v.informe.contenido.iereinsersion.nivel.required &&
        errors.push("Debe ingresar el nivel");
      !this.$v.informe.contenido.iereinsersion.nivel.esParrafo &&
        errors.push(
          "El nivel de la institucion educativa no debe contener caracteres especiales"
        );
      return errors;
    },
    errorGradoIE() {
      const errors = [];
      if (!this.$v.informe.contenido.iereinsersion.grado.$dirty) return errors;
      !this.$v.informe.contenido.iereinsersion.grado.required &&
        errors.push("Debe ingresar el grado");
      !this.$v.informe.contenido.iereinsersion.grado.esParrafo &&
        errors.push(
          "El grado de la institucion educativa no debe contener caracteres especiales"
        );
      return errors;
    },
    errorAntecedentes() {
      const errors = [];
      if (!this.$v.informe.contenido.antecedentes.$dirty) return errors;
      !this.$v.informe.contenido.antecedentes.required &&
        errors.push("Debe ingresar un antecedente");
      !this.$v.informe.contenido.antecedentes.esParrafo &&
        errors.push("El antecedente no debe contener caracteres especiales");
      return errors;
    },
    errorSituacionEducativa() {
      const errors = [];
      if (!this.$v.informe.contenido.situacionactual.$dirty) return errors;
      !this.$v.informe.contenido.situacionactual.required &&
        errors.push("Debe ingresar la situación actual");
      !this.$v.informe.contenido.situacionactual.esParrafo &&
        errors.push(
          "La situacion actual no debe contener caracteres especiales"
        );
      return errors;
    },
    errorResidente() {
      const errors = [];
      if (!this.$v.informe.idresidente.$dirty) return errors;
      !this.$v.informe.idresidente.required &&
        errors.push("Debe seleccionar un residente obligatoriamente");
      return errors;
    } /*
    errorEvaluador() {
      const errors = [];
      if (!this.$v.informe.contenido.evaluador.$dirty) return errors;
      !this.$v.informe.contenido.evaluador.required &&
        errors.push("Debe seleccionar un educador obligatoriamente");
      return errors;
    },*/,
    errorLogro() {
      const errors = [];
      if (!this.$v.logro.$dirty) return errors;
      !this.$v.logro.required &&
        errors.push("Debe registrar el logro obligatoriamente");
      !this.$v.logro.esParrafo &&
        errors.push("El logro no debe contener caracteres especiales");
      return errors;
    },
    errorRecomendacion() {
      const errors = [];
      if (!this.$v.recomendacion.$dirty) return errors;
      !this.$v.recomendacion.required &&
        errors.push("Debe registrar la recomendacion obligatoriamente");
      !this.$v.recomendacion.esParrafo &&
        errors.push("La recomendacion no debe contener caracteres especiales");
      return errors;
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
        contenido: {
          antecedentes: {
            required,
            esParrafo,
          },
          situacionactual: {
            required,
            esParrafo,
          } /*
          evaluador:{
            required,
          },*/,
          iereinsersion: {
            nombre: {
              required,
              esParrafo,
            },
            modalidad: {
              required,
              esTexto,
            },
            nivel: {
              required,
              esParrafo,
            },
            grado: {
              required,
              esParrafo,
            },
          },
        },
      },
      logro: {
        required,
        esParrafo,
      },
      recomendacion: {
        required,
        esParrafo,
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
