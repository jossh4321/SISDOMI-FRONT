<template>
<v-card>
    <v-card-title class="justify-center">Nueva Ficha de Evaluacion y Diagnostico Educativo</v-card-title>
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
                  <v-row>
                        <v-col>
                          <v-autocomplete
                            v-model="fichaEvaluacion.idresidente"
                            :items="listaresidentes"
                            outlined
                            color="#009900"
                            label="Residente"
                            item-text="nombre"
                            item-value="id"
                            @input="$v.fichaEvaluacion.idresidente.$touch()"
                            @blur="$v.fichaEvaluacion.idresidente.$touch()"
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
                        </v-col>
                        <v-col>
                          <v-text-field
                              v-model="fichaEvaluacion.contenido.ultimaie"
                              label="Ultima Institucion Educacion"
                              outlined
                              
                              color="#009900"
                          ></v-text-field>
                        </v-col>
                  </v-row>
                  <v-row>
                        <v-col>
                            <v-select
                              label="Tipo de Institucion Educacion"
                              v-model="fichaEvaluacion.contenido.tipoie"
                              :items="itemTipoIE"
                              color="#009900"
                              :item-text="itemTipoIE.text"
                              :item-value="itemTipoIE.value"
                              @input="$v.fichaEvaluacion.contenido.tipoie.$touch()"
                              @blur="$v.fichaEvaluacion.contenido.tipoie.$touch()"
                              :error-messages="errorTipoIE"
                              outlined
                            ></v-select>
                        </v-col>
                        <v-col>
                            <v-select
                              label="Modalidad"
                              v-model="fichaEvaluacion.contenido.modalidad"
                              :items="itemsModalidad"
                              color="#009900"
                              :item-text="itemsModalidad.text"
                              :item-value="itemsModalidad.value"
                              @input="$v.fichaEvaluacion.contenido.modalidad.$touch()"
                              @blur="$v.fichaEvaluacion.contenido.modalidad.$touch()"
                              :error-messages="errorModalidad"
                              outlined
                            ></v-select>
                        </v-col>
                  </v-row>
                  <v-row>
                        <v-col>
                            <v-select
                            label="Nivel"
                            v-model="fichaEvaluacion.contenido.nivel"
                            :items="itemsNivel"
                            color="#009900"
                            :item-text="itemsNivel.text"
                            :item-value="itemsNivel.value"
                            @input="$v.fichaEvaluacion.contenido.nivel.$touch()"
                            @blur="$v.fichaEvaluacion.contenido.nivel.$touch()"
                            :error-messages="errorNivel"
                            outlined
                            ></v-select>
                        </v-col>
                        <v-col>
                            <v-select
                            label="Grado"
                            v-model="fichaEvaluacion.contenido.grado"
                            :items="itemsGrado"
                            color="#009900"
                            :item-text="itemsGrado.text"
                            :item-value="itemsGrado.value"
                            @input="$v.fichaEvaluacion.contenido.grado.$touch()"
                            @blur="$v.fichaEvaluacion.contenido.grado.$touch()"
                            :error-messages="errorGrado"
                            outlined
                            ></v-select>
                        </v-col>
                  </v-row>

                     <!--Botones de card -->
                     <v-row>
                        <v-col>
                          <v-btn block @click="cerrarDialogo()" color="primary">
                            <v-icon left>mdi-close-outline</v-icon>
                            <span>Cerrar</span>
                          </v-btn>
                        </v-col>
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
            <v-stepper-content step="2"
              ><!--CONTIENE LOS STEPPERS 2 -->
              <div class="container-user">
                 <form>
                     <!--Comienza el cuadro de Fima -->
                            <v-row justify="center">
                              <v-dialog v-model="dialog" persistent max-width="850px">
                                <template v-slot:activator="{ on }">
                                  <v-btn color="primary" v-on="on">
                                    Ver Firma de creador(es) de documento
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

                                  </v-card-text>
                                  <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="dialog=false">
                                      Cerrar
                                    </v-btn>
                                    
                                
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
                <!--Registro de estudios -->
                 <v-card
                  style="margin-top:30px;padding:5px 5px;background-color:#EAEAEA"
                >
                <v-card-title style="font-size:22px;padding: 10px 10px;"
                                >Estudios</v-card-title
                              >
                  <v-card
                    elevation="0"
                    style="background-color:#EAEAEA"
                    height="70"
                  >
                    <v-row style="margin:1%;heigh:100%" align="center">
                      <v-col :cols="4" align="left">
                        <v-text-field
                          v-model="estudio.nivel"
                          label="Nivel"
                          @input="$v.estudio.nivel.$touch()"
                          @blur="$v.estudio.nivel.$touch()"
                          :error-messages="errorEstudioNivel"
                          color="#009900"
                          
                        ></v-text-field>
                      </v-col>
                      <v-col :cols="4" align="left">
                        <v-text-field
                          v-model="estudio.observaciones"
                           @input="$v.estudio.observaciones.$touch()"
                          @blur="$v.estudio.observaciones.$touch()"
                          :error-messages="errorEstudioObservaciones"
                          label="Observaciones"
                          color="#009900"
                          
                        ></v-text-field>
                      </v-col>
                      <v-col :cols="4" align="right">
                        <v-btn
                          fab
                          small
                          dark
                          color="green"
                          @click="guardarEstudios"
                        >
                          <v-icon dark>
                            mdi-plus
                          </v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card>
                  <v-row>
                  
                   
                  </v-row>
                  <v-card
                    color="#FAFAFA"
                    style="margin-top:5px"
                    height="100"
                    v-for="(item, index) in fichaEvaluacion.contenido.estudios"
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
                            {{ item.nivel }}   ->   {{ item.observaciones }}</span
                          >
                        </article>
                      </v-col>
                      <v-col :cols="2" align="center">
                        <template>
                           
                          </template>
                      </v-col>
                      <v-col :cols="2" align="right">
                        <div style="margin-right:20px">
                          <v-btn
                            fab
                            x-small
                            dark
                            color="red"
                            @click="eliminarEstudio(index)"
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
                 <!--Registro de aspectos -->
                 <v-card
                  style="margin-top:30px;padding:5px 5px;background-color:#EAEAEA"
                >
                <v-card-title style="font-size:22px;padding: 10px 10px;"
                                >Aspectos</v-card-title
                              >
                  <v-card
                    elevation="0"
                    style="background-color:#EAEAEA"
                    height="70"
                  >
                    <v-row style="margin:1%;heigh:100%" align="center">
                      <v-col :cols="4" align="left">
                        <v-text-field
                          v-model="aspectos.tipo"
                          @input="$v.aspectos.tipo.$touch()"
                          @blur="$v.aspectos.tipo.$touch()"
                          :error-messages="errorAspectoTipo"
                          label="Tipo"
                          color="#009900"
                          
                          
                        ></v-text-field>
                      </v-col>
                      <v-col :cols="4" align="left">
                        <v-text-field
                          v-model="aspectos.descripcion"
                          @input="$v.aspectos.descripcion.$touch()"
                          @blur="$v.aspectos.descripcion.$touch()"
                          :error-messages="errorAspectoDescripcion"
                          label="Descripcion"
                          color="#009900"
                          
                          
                        ></v-text-field>
                      </v-col>
                      <v-col :cols="4" align="right">
                        <v-btn
                          fab
                          small
                          dark
                          color="green"
                          @click="guardarAspecto"
                        >
                          <v-icon dark>
                            mdi-plus
                          </v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card>
                  <v-row>
                  
                   
                  </v-row>
                  <v-card
                    color="#FAFAFA"
                    style="margin-top:5px"
                    height="100"
                    v-for="(item, index) in fichaEvaluacion.contenido.aspectos"
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
                            {{ item.tipo }} -> {{ item.descripcion }}</span
                          >
                        </article>
                      </v-col>
                      <v-col :cols="2" align="center">
                        <template>
                           
                          </template>
                      </v-col>
                      <v-col :cols="2" align="right">
                        <div style="margin-right:20px">
                          <v-btn
                            fab
                            x-small
                            dark
                            color="red"
                            @click="eliminarAspecto(index)"
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
                     <!--Botones de card -->
                      <v-row>
                        <v-col>
                          <v-btn block @click="cerrarDialogo()" color="primary">
                            <v-icon left>mdi-close-outline</v-icon>
                            <span>Cerrar</span>
                          </v-btn>
                        </v-col>
                        <v-col>
                          <v-btn block @click="registrarFichaEvaluacion" color="success">
                            <v-icon left>mdi-page-next-outline</v-icon>
                            <span>Registrar Ficha de Evaluacion Educativa</span>
                          </v-btn>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          
                        </v-col>
                        <v-col>
                          
                        </v-col>
                      </v-row> 
                </form>
              </div>
            </v-stepper-content>
        </v-stepper-items>
     </v-stepper>
     <v-dialog width="450px" v-model="cargaRegistro" persistent>
        <v-card height="300px">
          <v-card-title class="justify-center">Registrando el seguimiento educativo</v-card-title>
          <div>
              <v-progress-circular
              style="display: block;margin:40px auto;"
              :size="90"
              :width="9"
              color="purple"
              indeterminate
            ></v-progress-circular>
          </div>
           <v-card-subtitle class="justify-center" style="font-weight:bold;text-align:center">En unos momentos finalizaremos...</v-card-subtitle>
        </v-card>
      </v-dialog>       
  </v-card>
</template>

<script>
import axios from "axios";
import Vue from 'vue'
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import { mapMutations, mapState } from "vuex";
import { required, minLength,maxLength, email, helpers,numeric } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
import moment from "moment";
function esTexto(value) {
  return /^[A-Za-z\sáéíóúÁÉÍÓÚñÑ]+$/.test(value);
}
function esParrafo(value) {
  return /^[A-Za-z\d\s.,;°"“()áéíóúÁÉÍÓÚñÑ]+$/.test(value);
}
export default {
  name:"RegistrarFichaDiagnosticoEducativo",
  props:["listaresidentes","listaeducadores"],
components:{
    vueDropzone: vue2Dropzone,
},
  data(){
    return{
      datemenu: false,
     step:1,
     dialog:false, // dialogo firma
     dialogVistaPreviaFirma: false,
     cargaRegistro:false,
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
      }, dropzoneOptions2: {
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
      firma:{urlfirma:"",nombre:"",cargo:""},
      imagen:"",
      estudio:{nivel:"",observaciones:""},
      aspectos:{tipo:"",descripcion:""},
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
      itemTipoIE:[
        {value:"Estatal",text:"Estatal"},
        {value:"Particular",text:"Particular"},

      ],
     fichaEvaluacion:{
        id:"",
        tipo:"FichaEvaluacionDiagnosticoEducativo",
        historialcontenido:[],
        creadordocumento:"",
        fechacreacion:null,
        area:"educativa",
        fase:"1",
        estado:"creacion",
        contenido:{
          ultimaie:"",
          tipoie:"",
          modalidad:"",
          nivel:"",
          grado:"",
          estudios:[],
          aspectos:[],
          codigodocumento:"",
          
        },
        idresidente:""
     }
    }
  },
    methods:{
      ...mapMutations(["addEvaluacion"]),
      cerrarDialogo(){
         this.step = 1;
        this.$emit("close-dialog-save");
       
      },
       cerrarVistaPreviaFirma() {
      this.dialogVistaPreviaFirma = false;
    },
      afterSuccess(file, response) {
      console.log(file);
      this.firma.urlfirma = file.dataURL.split(",")[1];
      //this.$v.firma.urlfirma.$model = file.dataURL.split(",")[1];
      //console.log(file.dataURL.split(",")[1]);
    },
    
    afterRemoved(file, error, xhr) {
      this.firma.urlfirma = "";
      
    },
   
    async mensaje(icono, titulo, texto, footer) {
      await this.$swal({
        icon: icono,
        title: titulo,
        text: texto,
        footer: footer,
      });
    },
        async registrarFichaEvaluacion(){
        this.fichaEvaluacion.creadordocumento = this.user.id;
        console.log(this.fichaEvaluacion);
        this.$v.fichaEvaluacion.$touch();
      if (this.$v.fichaEvaluacion.$invalid) {
        console.log("hay errores");
        this.mensaje(
          "error",
          "..Oops",
          "Se encontraron errores en el formulario",
          "<strong>Verifique los campos Ingresados<strong>"
        );
      } else {
         this.cargaRegistro = true;
        await axios
          .post("/EvaluacionDiagnosticoEducativo/fichaEvaluacionDE", this.fichaEvaluacion)
          .then((res) => {
            this.addEvaluacion(res.data);
            this.cargaRegistro = false;
            this.$emit("cargarSeguimiento");
            this.cerrarDialogo();
          })
          .catch((err) => console.log(err));
        await this.mensaje(
          "success",
          "listo",
          "Ficha Diagnostico Evaluacion Educativa registrado Satisfactoriamente",
          "<strong>Se redirigira a la Interfaz de Gestion<strong>",      
        );
       
      }
  },  
       ///metodo para agregar firma residente
    guardarFirma(){
     
   let firmad = {urlfirma:this.firma.urlfirma,nombre:this.firma.nombre,cargo:this.firma.cargo};

   this.fichaEvaluacion.contenido.firmas.push(firmad);
   console.log(this.fichaEvaluacion.contenido.firmad);
   this.$refs.myVueDropzone.removeAllFiles();

   this.firma.urlfirma="";
   this.firma.nombre="";
   this.firma.cargo="";
   
   
    },
    eliminarFirma(index) {
      this.fichaEvaluacion.contenido.firmas.splice(index, 1);
    },
    verFirma(index) {
      console.log(this.fichaEvaluacion.contenido.firmas[index].urlfirma);
      this.imagen = this.fichaEvaluacion.contenido.firmas[index].urlfirma;
      this.dialogVistaPreviaFirma = true;
    }, 
    guardarEstudios(){
     this.$v.estudio.$touch();
      if (!this.$v.estudio.$invalid) {
   let estudio = {nivel:this.estudio.nivel,observaciones:this.estudio.observaciones};

   this.fichaEvaluacion.contenido.estudios.push(estudio);
   console.log(this.fichaEvaluacion.contenido.estudios);


   this.estudio.nivel="";
   this.estudio.observaciones="";
 
      }
   this.$v.estudio.$reset();
    },
    eliminarEstudio(index) {
      this.fichaEvaluacion.contenido.estudios.splice(index, 1);
    },
     guardarAspecto(){
       this.$v.aspectos.$touch();
      if (!this.$v.aspectos.$invalid) {
     
   let aspecto = {tipo:this.aspectos.tipo,descripcion:this.aspectos.descripcion};

   this.fichaEvaluacion.contenido.aspectos.push(aspecto);
   console.log(this.fichaEvaluacion.contenido.aspectos);


   this.aspectos.tipo="";
   this.aspectos.descripcion="";
 
      }
    this.$v.aspectos.$reset();
    },
    eliminarAspecto(index) {
      this.fichaEvaluacion.contenido.aspectos.splice(index, 1);
    },
  },
  computed:{
    ...mapGetters(["user"]),
     itemsGrado() {
      const listaGrados = [
        { value: "1", text: "Primero" },
        { value: "2", text: "Segundo" },
        { value: "3", text: "Tercero" },
        { value: "4", text: "Cuarto" },
        { value: "5", text: "Quinto" },
      ];
      if (this.fichaEvaluacion.contenido.nivel == "PRIMARIA") {
        listaGrados.push({ value: "6", text: "Sexto" });
      }
      this.fichaEvaluacion.contenido.grado = "1";
      return listaGrados;
    },
     errorModalidad() {
      const errors = [];
      if (!this.$v.fichaEvaluacion.contenido.modalidad.$dirty) return errors;
      !this.$v.fichaEvaluacion.contenido.modalidad.required &&
        errors.push("Debe Ingresar una modalidad Obligatoriamente");
      return errors;
    },
    errorGrado() {
      const errors = [];
      if (!this.$v.fichaEvaluacion.contenido.grado.$dirty) return errors;
      !this.$v.fichaEvaluacion.contenido.grado.required &&
        errors.push("Debe Seleccionar un Grado Obligatoriamente");
      return errors;
    },
    errorTipoIE() {
      const errors = [];
      if (!this.$v.fichaEvaluacion.contenido.tipoie.$dirty) return errors;
      !this.$v.fichaEvaluacion.contenido.tipoie.required &&
        errors.push("Debe Ingresar una Tipo de Institucion Educativa Obligatoriamente");
      return errors;
    },
    errorNivel() {
      const errors = [];
      if (!this.$v.fichaEvaluacion.contenido.nivel.$dirty) return errors;
      !this.$v.fichaEvaluacion.contenido.nivel.required &&
        errors.push("Debe Seleccionar un Nivel Obligatoriamente");
      return errors;
    },
    errorResidente() {
      const errors = [];
      if (!this.$v.fichaEvaluacion.idresidente.$dirty) return errors;
      !this.$v.fichaEvaluacion.idresidente.required &&
        errors.push("Debe seleccionar un residente obligatoriamente");
      return errors;
    },
    errorEstudioNivel() {
      const errors = [];
      if (!this.$v.estudio.nivel.$dirty) return errors;
      !this.$v.estudio.nivel.required &&
        errors.push("Debe registrar un nivel obligatoriamente");
      !this.$v.estudio.nivel.esParrafo &&
        errors.push(
          "el nivel no debe contener caracteres especiales"
        );
      return errors;
    },
    errorEstudioObservaciones() {
      const errors = [];
      if (!this.$v.estudio.observaciones.$dirty) return errors;
      !this.$v.estudio.observaciones.required &&
        errors.push("Debe ingresar una observacion obligatoriamente");
      !this.$v.estudio.observaciones.esParrafo &&
        errors.push(
          "La observacion no debe contener caracteres especiales"
        );
      return errors;
    },
    errorAspectoTipo() {
      const errors = [];
      if (!this.$v.aspectos.tipo.$dirty) return errors;
      !this.$v.aspectos.tipo.required &&
        errors.push("Debe registrar un tipo obligatoriamente");
      !this.$v.aspectos.tipo.esParrafo &&
        errors.push(
          "El tipo no debe contener caracteres especiales"
        );
      return errors;
    },
    errorAspectoDescripcion() {
      const errors = [];
      if (!this.$v.aspectos.descripcion.$dirty) return errors;
      !this.$v.aspectos.descripcion.required &&
        errors.push("Debe ingresar una descripcion obligatoriamente");
      !this.$v.aspectos.descripcion.esParrafo &&
        errors.push(
          "La descripcion no debe contener caracteres especiales"
        );
      return errors;
    },
  
  },
  validations(){
    return{
    fichaEvaluacion:{
        historialcontenido:[],
        creadordocumento:{
          //required
        },
        contenido:{
          ultimaie:{
            required,
          },
          tipoie:{
            required,
          },
          modalidad:
          {
            required,
          },
          nivel:{
            required,
          },
          grado:{
            required,
          },
        
          
        },
        idresidente:{
          required,
        },
     },
     estudio:{
       nivel:{
        required,
        esParrafo,
       },
       observaciones:{
         required,
        esParrafo,
       }
     },
     aspectos:{
       tipo:{
         required,
        esParrafo,
        },
       descripcion:{
         required,
        esParrafo,
       }
     }
    }
  }

}
</script>



<style>

</style>