<template>
  <v-card>
    <v-card-title class="justify-center">Modificar Informe Educativo Final</v-card-title>
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
                          <v-card class="subcard"  style="margin-bottom:7px" color="#e6f3ff">
                              <span>
                                Residente: {{this.residenteDocumento.nombre}} {{this.residenteDocumento.apellido}}
                              </span>
                          </v-card >
                          <v-card class="subcard" color="#e6f3ff">
                            <span>
                              Fecha de Ingreso: {{ this.residenteDocumento.fechaingreso | formatoFecha}}
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
                          @input="$v.informe.contenido.iereinsersion.modalidad.$touch()"
                          @blur="$v.informe.contenido.iereinsersion.modalidad.$touch()"
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
                          <span style="font-size:18px">
                            {{ item.titulo }}</span
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
                              <iframe
                              :src= pdf
                              width=100% height=600></iframe>
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
      itemsModalidad: [
        { value: 'EBA', text: 'Educacion Basica Alternativa'},
        { value: 'EBE', text: 'Educacion Basica Especial'},
        { value: 'EBR', text: 'Educacion Basica Regular'}
      ],
      itemsNivel: [
        { value: 'PRIMARIA', text: 'Nivel Primaria'},
        { value: 'SECUNDARIA', text: 'Nivel Secundaria'},
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
      cargo:"",
      firma:"",
      informeid:"",
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
            grado: ""
          },
          anexos: [],
          codigodocumento: "",
          fechaevaluacion: ""
        }
      },
      
    };
  },
  filters: {
    formatoFecha: (fecha) =>{
            var formato = moment(fecha);
            return formato.format("llll");
    }
  },
  async created() {
    await this.obtenerInformeId();
    this.informe = await this.loadInformeModificacion(this.informeid);
    this.cargarLogros();    
    this.cargarRecomendaciones();
    this.obtenerResidente();
    this.obtenerCreador()    
  },
  methods: {
    ...mapMutations(["replaceInforme"]),
    
    async obtenerInformeId() {
      await axios
        .get("/documento/InformeEducativoFinal/residente/"+this.residenteDocumento.id)
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
        await axios
          .put("/informe/informeee", this.informe)
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
      console.log(this.pdf),
      this.dialogVistaPreviaAnexos = true;
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
  },
  computed: {
    verifyColor() {
      return "red";
    },
    itemsGrado(){
         const listaGrados = [{value:"1",text: "Primero"},{value:"2",text: "Segundo"},{value:"3",text: "Tercero"},
           {value:"4",text: "Cuarto"},{value:"5",text: "Quinto"}];
           if(this.informe.contenido.iereinsersion.nivel == 'PRIMARIA'){ 
             listaGrados.push({value:"6",text: "Sexto"})}
           this.informe.contenido.iereinsersion.grado = "1";
          return listaGrados;
    },
    errorNombreIE() {
      const errors = [];
      if (!this.$v.informe.contenido.iereinsersion.nombre.$dirty) return errors;
      !this.$v.informe.contenido.iereinsersion.nombre.required &&
        errors.push("Debe ingresar el nombre de la Institución Educativa");
      !this.$v.informe.contenido.iereinsersion.nombre.esParrafo &&
        errors.push("El nombre de la institucion educativa no debe contener caracteres especiales");
      return errors;
    },
    errorModalidadIE() {
      const errors = [];
      if (!this.$v.informe.contenido.iereinsersion.modalidad.$dirty)
        return errors;
      !this.$v.informe.contenido.iereinsersion.modalidad.required &&
        errors.push("Debe ingresar la modalidad");
      !this.$v.informe.contenido.iereinsersion.modalidad.esTexto &&
        errors.push("La modalidad de la institucion educativa no debe contener caracteres especiales");
      return errors;
    },
    errorNivelIE() {
      const errors = [];
      if (!this.$v.informe.contenido.iereinsersion.nivel.$dirty) return errors;
      !this.$v.informe.contenido.iereinsersion.nivel.required &&
        errors.push("Debe ingresar el nivel");
      !this.$v.informe.contenido.iereinsersion.nivel.esParrafo &&
        errors.push("El nivel de la institucion educativa no debe contener caracteres especiales");
      return errors;
    },
    errorGradoIE() {
      const errors = [];
      if (!this.$v.informe.contenido.iereinsersion.grado.$dirty) return errors;
      !this.$v.informe.contenido.iereinsersion.grado.required &&
        errors.push("Debe ingresar el grado");
      !this.$v.informe.contenido.iereinsersion.grado.esParrafo &&
        errors.push("El grado de la institucion educativa no debe contener caracteres especiales");
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
        errors.push("La situacion actual no debe contener caracteres especiales");
      return errors;
    },
    errorResidente() {
      const errors = [];
      if (!this.$v.informe.idresidente.$dirty) return errors;
      !this.$v.informe.idresidente.required &&
        errors.push("Debe seleccionar un residente obligatoriamente");
      return errors;
    },/*
    errorEvaluador() {
      const errors = [];
      if (!this.$v.informe.contenido.evaluador.$dirty) return errors;
      !this.$v.informe.contenido.evaluador.required &&
        errors.push("Debe seleccionar un educador obligatoriamente");
      return errors;
    },*/
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
    errorLogro() {
      const errors = [];
      if (!this.$v.logro.$dirty) return errors;
      !this.$v.logro.required &&
        errors.push("Debe registrar el logro obligatoriamente");
      !this.$v.logro.esParrafo &&
        errors.push(
          "El logro no debe contener caracteres especiales"
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
          },/*
          evaluador:{
            required,
          },*/
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
          fechaevaluacion: {
              required,
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
