<template>
<v-card>
    <v-card-title class="justify-center">Registrar Ficha Diagnostico Educativo</v-card-title>
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
                            v-model="fichaEvaluacion.idresidente"
                            :items="listaresidentes"
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
                          <v-autocomplete
                              :items="listaeducadores"
                              filled
                              chips
                              dense
                              outlined
                              v-model="fichaEvaluacion.contenido.evaluador"
                              color="#009900"
                              label="Educador responsable"
                              item-text="usuario"
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
                                  {{ data.item.datos.nombre + " " +  data.item.datos.apellido  }}
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
                              v-model="fichaEvaluacion.contenido.ultimaie"
                              label="Ultima Institucion Educacion"
                              outlined
                              
                              color="#009900"
                            ></v-text-field>
                             <v-text-field
                              v-model="fichaEvaluacion.contenido.tipoie"
                              label="Tipo de Institucion Educacion"
                              outlined
                              
                              color="#009900"
                            ></v-text-field>
                            <v-text-field
                              v-model="fichaEvaluacion.contenido.modalidad"
                              label="Modalidad"
                              outlined
                              
                              color="#009900"
                            ></v-text-field>
                            <v-text-field
                              v-model="fichaEvaluacion.contenido.nivel"
                              label="Nivel"
                              outlined
                              
                              color="#009900"
                            ></v-text-field>
                            <v-text-field
                              v-model="fichaEvaluacion.contenido.grado"
                              label="Grado"
                              outlined
                              
                              color="#009900"
                            ></v-text-field>

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
                               v-model="firma.cargo"
                                label="Cargo"
                                outlined  
                                color="#009900"
                                ></v-text-field>
                                <v-text-field
                               v-model="firma.nombre"
                                label="Nombre"
                                outlined  
                                
                                color="#009900" 
                                ></v-text-field>
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
                       
                              <v-btn color="success" @click="guardarFirma">
                                      añadir
                              </v-btn>
                             
                              <v-divider class="divider-custom"></v-divider>
                              <!-- cuadros de textofin -->

                          <v-card
                              style="margin-top:30px;left-top:30px;padding:5px 5px;background-color:#EAEAEA"
                            >
                              <v-card-title style="font-size:22px;padding: 10px 10px;"
                                >Firma de creador(es) de documento</v-card-title
                              >
                              <!-- Cabecera -->
                              <v-card
                              elevation="0"
                              color="#EAEAEA"
                              style="margin-top:5px; margin-bottom:15px"
                              height="30"
                              >
                              
                                <v-row style="margin-left:10px;heigh:100%" align="center">
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
                                  <v-col align="right">
                                  </v-col>
                                </v-row>
                              </v-card>
                              <!-- Cuerpo -->
                              <v-card
                                tile
                                elevation="0"
                                color="#FAFAFA"
                                style="margin-top:5px"
                                height="80"
                                v-for="(item, index) in fichaEvaluacion.contenido.firmas"
                                :key="index"
                              >
                                <v-row style="margin-left:10px;heigh:100%;" align="center">
                                  <v-col :cols="4">
                                    <article>
                                      <span style="font-size:16px">{{item.cargo}}</span>
                                    </article>
                                  </v-col>
                                  <v-col :cols="4">
                                    <article>
                                      <span style="font-size:16px">{{item.nombre}}</span>
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
                                </v-row>
                              </v-card>
                            </v-card>
              <!--fin-->
                    <!-- -->

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
                                >Estudios |Nivel - Observaciones|</v-card-title
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
                          color="#009900"
                          
                        ></v-text-field>
                      </v-col>
                      <v-col :cols="4" align="left">
                        <v-text-field
                          v-model="estudio.observaciones"
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
                    height="60"
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
                            {{ item.nivel }} -> {{ item.observaciones }}</span
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
                                >Aspectos |Tipo  - Descripcion|</v-card-title
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
                          label="Nivel"
                          color="#009900"
                          
                        ></v-text-field>
                      </v-col>
                      <v-col :cols="4" align="left">
                        <v-text-field
                          v-model="aspectos.descripcion"
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
                    height="60"
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
                          <v-btn block @click="registrarFichaEvaluacion" color="success">
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
        </v-stepper-items>
     </v-stepper>
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
export default {
  name:"RegistrarFichaDiagnosticoEducativo",
  props:["listaresidentes","listaeducadores"],
components:{
    vueDropzone: vue2Dropzone,
},
  data(){
    return{
     step:1,
     dialog:false, // dialogo firma
     dialogVistaPreviaFirma: false,
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

     fichaEvaluacion:{
        id:"",
        tipo:"FichaEvaluacionDiagnosticoEducativo",
        historialcontenido:"",
        creadordocumento:"",
        fechacreacion:"",
        area:"educativa",
        fase:"acogida",
        estado:"creacion",
        contenido:{
          ultimaie:"",
          tipoie:"",
          modalidad:"",
          nivel:"",
          grado:"",
          estudios:[],
          aspectos:[],
          firmas:[],
          codigodocumento:"",
          evaluador:""
        },
        idresidente:""
     }
    }
  },
    methods:{
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
      registrarFichaEvaluacion(){
        this.fichaEvaluacion.creadordocumento = this.user.id;
        console.log(this.fichaEvaluacion)
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
     
   let estudio = {nivel:this.estudio.nivel,observaciones:this.estudio.observaciones};

   this.fichaEvaluacion.contenido.estudios.push(estudio);
   console.log(this.fichaEvaluacion.contenido.estudios);


   this.estudio.nivel="";
   this.estudio.observaciones="";
 
   
   
    },
    eliminarEstudio(index) {
      this.fichaEvaluacion.contenido.estudios.splice(index, 1);
    },
     guardarAspecto(){
     
   let aspecto = {tipo:this.aspectos.tipo,descripcion:this.aspectos.descripcion};

   this.fichaEvaluacion.contenido.aspectos.push(aspecto);
   console.log(this.fichaEvaluacion.contenido.aspectos);


   this.aspectos.tipo="";
   this.aspectos.descripcion="";
 
   
   
    },
    eliminarAspecto(index) {
      this.fichaEvaluacion.contenido.aspectos.splice(index, 1);
    },
  },
  computed:{
    ...mapGetters(["user"]),
  }

}
</script>

<style>

</style>