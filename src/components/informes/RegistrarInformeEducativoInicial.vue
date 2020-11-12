<template>
  <v-dialog v-model="show" max-width="50%">
    <v-card>
      <v-card-title class="justify-center"
        >Registro de Informe Educativo Inicial</v-card-title
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
                        <span style="font-size:12px">RT</span>
                      </v-avatar>
                      {{ data.item.nombre }}
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
                  item-value="rol"
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
                    <v-btn block @click="show = false" color="primary">
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
                      <v-col :cols="3" align="left">
                        <v-text-field
                          v-model="firmas.nombre"
                          label="Nombre"
                          color="#009900"
                        ></v-text-field>
                      </v-col>
                      <v-col :cols="3" align="left">
                        <v-text-field
                          v-model="firmas.cargo"
                          label="Cargo"
                          color="#009900"
                        ></v-text-field>
                      </v-col>
                      <v-col :cols="3" align="left">    
                                       
                          
                      </v-col>
                      <v-col :cols="3" align="right">
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
                      <v-col :cols="3">
                        <article>
                          <img
                            style="margin-right:5px;width:6% "
                            src="https://www.flaticon.es/svg/static/icons/svg/996/996443.svg"
                            alt="imagen usuario"
                          />
                          <span style="font-size:18px"> {{ item.nombre }}</span>
                        </article>
                      </v-col>
                      <v-col :cols="3">
                        <article>
                          <img
                            style="margin-right:10px;width:8%"
                            src="https://www.flaticon.es/svg/static/icons/svg/633/633544.svg"
                            alt="imagen telefono"
                          />
                          <span style="font-size:18px">{{ item.cargo }}</span>
                        </article>
                      </v-col>
                      <v-col :cols="3">
                        <article>
                          <img
                            style="margin-right:10px;width:8%"
                            src="https://www.flaticon.es/svg/static/icons/svg/633/633544.svg"
                            alt="imagen telefono"
                          />
                          <span style="font-size:18px">{{
                            item.urlfirma
                          }}</span>
                        </article>
                      </v-col>

                      <v-col :cols="3" align="right">
                        <div style="margin-right:20px">
                          <v-btn
                            fab
                            x-small
                            dark
                            color="red"
                            @click="eliminarFirma"
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
import { mapMutations, mapState } from "vuex";
import { required, minLength, email, helpers } from "vuelidate/lib/validators";
import moment from "moment";

export default {
  props: ["listaresidentes", "listaeducadores", "visible"],
  components: {
    vueDropzone: vue2Dropzone,
  },
  ...mapMutations(["addInforme"]),
  data() {
    return {
      datemenu: false,
      step: 1,
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 250,
        maxFilesize: 10.0,
        maxFiles: 1,
        acceptedFiles: ".pdf",
        headers: { "My-Awesome-Header": "header value" },
        addRemoveLinks: true,
        dictDefaultMessage:
          "Seleccione un archivo de su dispositivo o arrástrela aquí",
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
      conclusion: "",
      conclusiones: [],
      firmas: { urlfirma: "", nombre: "", cargo: "" },
      informe: {
        id: "",
        tipo: "InformeEducativoInicial",
        historialcontenido: [],
        creadordocumento: "",
        fechacreacion: "",
        area: "educativa",
        fase: "acogida",
        idresidente: "",
        estado: "creado",
        contenido: {
          situacionacademica: "",
          analisisacademico: "",
          conclusiones: [],
          anexos: [],
          firmas: [
            {
              urlfirma: "",
              nombre: "",
              cargo: "",
            },
          ],
          codigodocumento: "",
          lugarevaluacion: "",
        },
      },
    };
  },
  async created() {
    this.conclusiones = "";
    this.conclusion = "";
  },
  methods: {
    async registrarInforme() {
      console.log(this.informe);
      this.$v.$touch();
      if (this.$v.$invalid) {
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
          .post("/informe/informeei", this.informe)
          .then((res) => {
            this.informe = res.data;
            this.addInforme(this.informe);
            this.cerrarDialogo();
            show = false;
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
    resetInformeValidationState() {
      this.$refs.myVueDropzone.removeAllFiles();
      this.$v.informe.$reset();
    },
    async mensaje(icono, titulo, texto, footer) {
      await this.$swal({
        icon: icono,
        title: titulo,
        text: texto,
        footer: footer,
      });
    },
    cerrarDialogo() {
      this.informe = this.limpiarInforme();
      this.step = 1;
      this.$emit("close-dialog-save");
    },
    agregarConclusion() {
      let conclusiones = this.conclusion;
      this.informe.contenido.conclusiones.push(conclusiones);
      this.conclusiones = this.informe.contenido.conclusiones;
      this.conclusion = "";
    },
    eliminarConclusion(conclusion) {
      // this.informe.contenido.conclusiones.splice(conclusion, 1);
      this.conclusiones.splice(conclusion, 1);
    },
    agregarFirma() {
      let firmas = {
        urlfirma:  this.firmas.urlfirma,
        nombre: this.firmas.nombre,
        cargo: this.firmas.cargo,
      };
      console.log("firmas");
      console.log(firmas);
      this.informe.contenido.firmas.push(firmas);
      console.log("this.informe.contenido.firmas");
      console.log(this.informe.contenido.firmas);
      this.firmas.urlfirma = "";
      this.firmas.nombre = "";
      this.firmas.cargo = "";
    },
    eliminarFirma(index) {
      this.informe.contenido.firmas.splice(index, 1);
    },
    afterSuccess(file, response) {
      console.log(file);
      console.log(file.dataURL);
      console.log(this.$refs.myVueDropzone);
      //this.informe.contenido.anexos = file.dataURL.split(",")[1];
      //this.$v.usuario.datos.imagen.$model = file.dataURL.split(",")[1];
      //console.log(file.dataURL.split(",")[1]);
    },
    afterRemoved(file, error, xhr) {
      this.informe.contenido.anexos = "";
      this.$v.informe.contenido.anexos.$model = "";
    },
    afterSuccess2(file, response) {      
      console.log(file.dataURL);
      this.firmas.urlfirma = file.dataURL.split(",")[1];
      // this.informe.contenido.firmas.urlfirma = file.dataURL.split(",")[1];
      // this.$v.informe.contenido.firmas.urlfirma.$model = file.dataURL.split(",")[1];
      //console.log(file.dataURL.split(",")[1]);
    },
    afterRemoved2(file, error, xhr) {
       this.firmas.urlfirma =""
      this.informe.contenido.firmas.urlfirma = "";
      this.$v.informe.contenido.firmas.urlfirma.$model = "";
    },
    limpiarInforme() {
      return {
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
            firmas: [
              {
                urlfirma: "",
                nombre: "",
                cargo: "",
              },
            ],
            codigodocumento: "",
          },
        },
      };
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
      return errors;
    },
    errorAnalisisAcademico() {
      const errors = [];
      if (!this.$v.informe.contenido.analisisacademico.$dirty) return errors;
      !this.$v.informe.contenido.analisisacademico.required &&
        errors.push("Debe ingresar el análisis académico obligatoriamente");
      !this.$v.informe.contenido.analisisacademico.minLength &&
        errors.push("El análisis académico debe tener al menos 100 caracteres");
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
        fechacreacion: {
          required,
        },
        contenido: {
          lugarevaluacion: {
            required,
            minLength: minLength(10),
          },
          situacionacademica: {
            required,
            minLength: minLength(100),
          },
          analisisacademico: {
            required,
            minLength: minLength(100),
          },
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
