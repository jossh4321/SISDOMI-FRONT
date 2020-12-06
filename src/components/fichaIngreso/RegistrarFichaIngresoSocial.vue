<template>
<v-dialog v-model="show" max-width="65%">
    <v-card >
      <v-card-title class="justify-center">Resgistrar Ficha de Ingreso Social</v-card-title>
      <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step 
          editable
          step="1"
        >
        Residente y Familia
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step
          editable
          step="2"
        >
        Vivienda
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step
          editable
          step="3"
        >
        Económico y Legal
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step
          editable
          step="4"
        >
        Encargado
        </v-stepper-step>
      </v-stepper-header>    
      <v-stepper-items>
        <!--Residente y Familiares-->
        <v-stepper-content step="1">
          <div class="container-user">
            <form>
                <v-autocomplete              
                  :items="listaresidentes"
                  filled
                  chips
                  dense
                  outlined  
                  v-model="fichaIngreso.idresidente"        
                  color="#009900"
                  label="Residente"
                  item-text="nombre"
                  item-value="residenteSeleccionado"                            
                >

                <template v-slot:selection="data">
                    <v-chip
                        v-bind="data.attrs"
                        :input-value="data.selected"
                        style="margin-top:5px"
                    >
                        <v-avatar left color="#b3b3ff"  size="24">
                        <span style="font-size:12px">RT</span>
                        </v-avatar>
                        {{ data.item.nombre }}
                    </v-chip>
                </template>
                  
                <template v-slot:item="data">
                    <v-list-item-avatar>
                        <v-avatar left color="#b3b3ff"  size="24">
                            <span style="font-size:12px">UC</span>
                        </v-avatar>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title>Nombre completo: {{ data.item.nombre }} {{data.item.apellido}} </v-list-item-title>
                        <v-list-item-subtitle>Nro. Documento: {{data.item.numerodocumento}}</v-list-item-subtitle>                    
                    </v-list-item-content>
                </template>
                </v-autocomplete>
                
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
                          v-model="motivoIngreso"
                          label="Motivo Ingreso"
                          color="#009900"
                        ></v-text-field>
                      </v-col>
                      <v-col :cols="4" align="right">
                        <v-btn
                          fab
                          small
                          dark
                          color="green"
                          @click="agregarMotivoIngreso"
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
                    v-for="motivoIngreso in motivosIngreso"
                    :key="motivoIngreso"
                  >
                    <v-row style="margin-left:10px;heigh:100%" align="center">
                      <v-col :cols="8" align="left">
                        <span>{{ motivoIngreso }}</span>
                      </v-col>
                      <v-col :cols="4" align="right">
                        <div style="margin-right:20px">
                          <v-btn
                            fab
                            x-small
                            dark
                            color="red"
                            @click="eliminarMotivoIngreso(motivoIngreso)"
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
                    :options="dropzoneOptions_MotivoIngreso"
                  >
                  </vue-dropzone>
                </div>
                
                <v-row>
                    <v-col>
                      <v-select              
                        :items="itemFamilias"
                        v-model="itemFamilias.value"
                        label="Tipo de familia"            
                        outlined      
                        dense       
                      ></v-select>
                    </v-col>
                    <v-col>
                      <v-text-field
                        label="Problemática familiar"
                        auto-grow
                        outlined        
                        color="#009900"
                        shaped
                      ></v-text-field> 
                    </v-col>
                </v-row>

                <v-row>
                    <v-col>
                        <v-btn block @click="show=false" color="primary">
                            <v-icon left>mdi-close-outline</v-icon>
                            <span>Cerrar</span>
                        </v-btn>
                    </v-col>
                    <v-col>
                        <v-btn block color= yellow>
                            <v-icon left>mdi-page-next-outline</v-icon>
                            <span>Datos del Residente</span>
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

        <v-stepper-content step="2">
          <div class="container-user">
            <form>
                <v-text-field
                  label="Nombre de Institución Educativa"
                  auto-grow
                  outlined        
                  color="#009900"
                  shaped
                ></v-text-field> 

               

                <v-text-field
                  label="Dirección"
                  auto-grow
                  outlined        
                  color="#009900"
                  shaped
                ></v-text-field> 


                 <v-row>
                    <v-col>
                      <v-text-field
                        label="Celular/Telefono"
                        auto-grow
                        outlined        
                        color="#009900"
                        shaped
                      ></v-text-field> 
                    </v-col>
                    <v-col>
                      <v-text-field
                        label="Correo"
                        auto-grow
                        outlined        
                        color="#009900"
                        shaped
                      ></v-text-field> 
                    </v-col>
                </v-row>

                

                <v-row>
                    <v-col>
                        <v-btn block @click="show=false" color="primary">
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
                <v-text-field
                  label="Nombre de Institución Educativa"
                  auto-grow
                  outlined        
                  color="#009900"
                  shaped
                ></v-text-field> 

               

                <v-text-field
                  label="Dirección"
                  auto-grow
                  outlined        
                  color="#009900"
                  shaped
                ></v-text-field> 


                 <v-row>
                    <v-col>
                      <v-text-field
                        label="Celular/Telefono"
                        auto-grow
                        outlined        
                        color="#009900"
                        shaped
                      ></v-text-field> 
                    </v-col>
                    <v-col>
                      <v-text-field
                        label="Correo"
                        auto-grow
                        outlined        
                        color="#009900"
                        shaped
                      ></v-text-field> 
                    </v-col>
                </v-row>

                

                <v-row>
                    <v-col>
                        <v-btn block @click="show=false" color="primary">
                            <v-icon left>mdi-close-outline</v-icon>
                            <span>Cerrar</span>
                        </v-btn>
                    </v-col>
                    <v-col>
                        <v-btn block @click="step = 4" color="success">
                            <v-icon left>mdi-page-next-outline</v-icon>
                            <span>Continuar</span>
                        </v-btn>
                    </v-col>
                </v-row>
            </form>
          </div>
        </v-stepper-content>

        <v-stepper-content step="4">
          <div  class="container-user">
            <form> 
                

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
                          :options="dropzoneOptions_Firmas"
                        >
                        </vue-dropzone>
                      </div>
                    </v-col>
                  </v-row>
                  <v-card
                    color="#FAFAFA"
                    style="margin-top:5px"
                    height="60"
                    v-for="(item, index) in fichaIngreso.contenido.firmas"
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
                        <v-btn block @click="show=false" color="primary">
                            <v-icon left>mdi-close-outline</v-icon>
                            <span>Cerrar</span>
                        </v-btn>
                    </v-col>
                    <v-col>
                        <v-btn block @click="registrarfichaIngreso" color="success">
                            <v-icon left>mdi-content-save-all-outline</v-icon>
                            <span >Registrar Ficha de Ingreso</span>
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

import axios from 'axios';
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import {mapMutations, mapState} from "vuex";
import { required, minLength,email,helpers } from 'vuelidate/lib/validators'
import moment from 'moment'
import RegistrarInformeEducativoEvolutivoVue from '../informes/RegistrarInformeEducativoEvolutivo.vue';

export default {
        
    props:["listaresidentes","visible","listaeducadores"],
    ...mapMutations(["setFichaIngreso","addFichaIngreso"]),
    data() {
        return {
            itemFamilias: [
                { value: '1', text: 'Nuclear'},
                { value: '2', text: 'Extensa'},
                { value: '3', text: 'Monoparental'},
                { value: '4', text: 'Homoparental'},
                { value: '5', text: 'Desintegrada'},
                { value: '6', text: 'Reconstruida'},
                { value: '7', text: 'Acogida'}
            ],

            dialogVistaPreviaFirma: false,
            dialogoVistaFamiliares : false,
            datemenu: false,
            step: 1,

            dropzoneOptions_MotivoIngreso: {
              url: "https://httpbin.org/post",
              thumbnailWidth: 250,
              maxFilesize: 10.0,
              maxFiles: 10,
              acceptedFiles: ".pdf",
              headers: { "My-Awesome-Header": "header value" },
              addRemoveLinks: true,
              dictDefaultMessage:
                "Seleccione un motivo de ingreso de su dispositivo o arrástrela aquí",
            },
            dropzoneOptions_Familiares: {
              url: "https://httpbin.org/post",
              thumbnailWidth: 250,
              maxFilesize: 10.0,
              maxFiles: 10,
              acceptedFiles: ".pdf",
              headers: { "My-Awesome-Header": "header value" },
              addRemoveLinks: true,
              dictDefaultMessage:
                "Aquí se observarán a familiares registrados",
            },
            dropzoneOptions_Habitantes: {
              url: "https://httpbin.org/post",
              thumbnailWidth: 250,
              maxFilesize: 10.0,
              maxFiles: 10,
              acceptedFiles: ".pdf",
              headers: { "My-Awesome-Header": "header value" },
              addRemoveLinks: true,
              dictDefaultMessage:
                "Aquí se observarán a familiares registrados",
            },
            dropzoneOptions_Servicios: {
              url: "https://httpbin.org/post",
              thumbnailWidth: 250,
              maxFilesize: 10.0,
              maxFiles: 10,
              acceptedFiles: ".pdf",
              headers: { "My-Awesome-Header": "header value" },
              addRemoveLinks: true,
              dictDefaultMessage:
                "Aquí se observarán los servicios registrados",
            },
            dropzoneOptions_Ingresos: {
              url: "https://httpbin.org/post",
              thumbnailWidth: 250,
              maxFilesize: 10.0,
              maxFiles: 10,
              acceptedFiles: ".pdf",
              headers: { "My-Awesome-Header": "header value" },
              addRemoveLinks: true,
              dictDefaultMessage:
                "Aquí se observarán los ingresos registrados",
            },
            dropzoneOptions_Egresos: {
              url: "https://httpbin.org/post",
              thumbnailWidth: 250,
              maxFilesize: 10.0,
              maxFiles: 10,
              acceptedFiles: ".pdf",
              headers: { "My-Awesome-Header": "header value" },
              addRemoveLinks: true,
              dictDefaultMessage:
                "Aquí se observarán los egresos registrados",
            },
            dropzoneOptions_Penales: {
              url: "https://httpbin.org/post",
              thumbnailWidth: 250,
              maxFilesize: 10.0,
              maxFiles: 10,
              acceptedFiles: ".pdf",
              headers: { "My-Awesome-Header": "header value" },
              addRemoveLinks: true,
              dictDefaultMessage:
                "Aquí se observarán los registros penales",
            },
            dropzoneOptions_Firmas: {
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
            
            motivoIngreso: "",
            motivosIngreso: [],
            
            familiar : "",
            familiares : { 
              nombreCompleto : "",
              parentezco : "",
              edad : "",
              estadoCivil : "",
              gradoInstruccion : "",
              ocupacion : "",
              observacion : ""
            },

            habitante: "",
            habitantes: [],

            servicio: "",
            servicios: { servicio: "", tipo: "" },

            ingreso: "",
            ingresos: [],

            egreso: "",
            egresos: [],

            penal: "",
            penales: { familiar: "", motivo: "" },

            urlfirma: "",
            firmas: { urlfirma: "", nombre: "", cargo: "" },

            fichaIngreso:{
                id:"",
                tipo:"FichaSocialIngreso",
                historialcontenido:[],
                creadordocumento:"",
                fechacreacion:"",
                area:"Social",
                fase:"acogida",
                idresidente:"",
                estado:"creado",
                contenido:{
                    familiar:{
                        motivoingreso:[],
                        familiares:[],
                        tipofamilia:"",
                        problematicafam:"" 
                    },
                    vivienda:{
                        ubicacion:"",
                        descripcionubicacion:"",
                        habitantes:[],
                        habitacionesdormir:"",
                        tipopropiedad:"",
                        tipo:"",
                        material:"",
                        tipopiso:"",
                        tipotecho:"",
                        servicios:[], 
                    },
                    economico:{
                        condicionlaboral:"",
                        ocupacion:"",
                        ingresos:[],
                        egresos:[],
                        observacion:""
                    },
                    salud:"",
                    legal:{
                        penales:[],
                        apoyolocal:"",
                    },
                    diagnosticosocial:"",
                    planintervencion:"",
                    firmas:[],
                    codigodocumento:""
                    }
            },
            imagen: "",
        }
    },
    async created() {
      this.motivosIngreso = "";
      this.motivoIngreso = "";
      this.habitantes = "";
      this.habitante = "";
      this.ingresos = "";
      this.ingreso = "";
      this.egresos = "";
      this.egreso = "";
    },

    methods:{
        cerrarDialogo(){     
            this.step = 1;       
            this.$emit("close-dialog-fichaIngreso");
        }, 
        async rFichaIngresoS(){

           await axios.get("Documento/all/fichaingresosocialcrear")
            .then(res => {
              //console.log( "porfavor" )
              this.fichaIngreso=res.data;
              this.rFichaIngresoS(res.data);
              this.addFichaIngreso(this.fichaIngreso)
            }).catch(err => console.log(err));            
    
        }, afterSuccess(file, response) {
      
    },
    afterRemoved(file, error, xhr) {
     
      
    },

        agregarMotivoIngreso() {
          let motivosIngreso = this.motivoIngreso;
          this.fichaIngreso.contenido.motivoingreso.push(motivosIngreso);
          this.motivosIngreso = this.fichaIngreso.contenido.motivoingreso;
          this.motivoIngreso = "";
        },
        eliminarMotivoIngreso(motivoIngreso) {
          this.motivosIngreso.forEach(function(car, index, object) {
            if (car === motivoIngreso) {
              object.splice(index, 1);
            }
          });
        },

        agregarHabitante() {
          let habitantes = this.habitante;
          this.fichaIngreso.contenido.habitantes.push(habitantes);
          this.habitantes = this.fichaIngreso.contenido.habitantes;
          this.habitante = "";
        },
        eliminarHabitante(habitante) {
          this.habitantes.forEach(function(car, index, object) {
            if (car === habitante) {
              object.splice(index, 1);
            }
          });
        },

        agregarIngreso() {
          let ingresos = this.ingreso;
          this.fichaIngreso.contenido.ingresos.push(ingresos);
          this.ingresos = this.fichaIngreso.contenido.ingresos;
          this.ingreso = "";
        },
        eliminarIngreso(ingreso) {
          this.ingresos.forEach(function(car, index, object) {
            if (car === ingreso) {
              object.splice(index, 1);
            }
          });
        },

        agregarEgreso() {
          let egresos = this.egreso;
          this.fichaIngreso.contenido.egresos.push(egresos);
          this.egresos = this.fichaIngreso.contenido.egresos;
          this.egreso = "";
        },
        eliminarEgreso(egreso) {
          this.egresos.forEach(function(car, index, object) {
            if (car === egreso) {
              object.splice(index, 1);
            }
          });
        },

        agregarFamiliar() {
          let familiares = { 
              nombreCompleto : this.familiares.nombreCompleto,
              parentezco : this.familiares.parentezco,
              edad : this.familiares.edad,
              estadoCivil : this.familiares.estadoCivil,
              gradoInstruccion : this.familiares.gradoInstruccion,
              ocupacion : this.familiares.ocupacion,
              observacion : this.familiares.observacion
          };
          this.fichaIngreso.contenido.familiares.push(familiares);
          this.$refs.myVueDropzone.removeAllFiles();

          this.familiares.nombreCompleto = "";
          this.familiares.parentezco= "";
          this.familiares.edad= "";
          this.familiares.estadoCivil= "";
          this.familiares.gradoInstruccion= "";
          this.familiares.ocupacion= "";
          this.familiares.observacion= "";
        },
        eliminarFamiliar(index) {
          this.fichaIngreso.contenido.familiares.splice(index, 1);
        },
        verDatosFamiliar(index) {
          this.familiares = { 
              nombreCompleto : this.fichaIngreso.contenido.familiares[index].nombreCompleto,
              parentezco : this.fichaIngreso.contenido.familiares[index].parentezco,
              edad : this.fichaIngreso.contenido.familiares[index].edad,
              estadoCivil : this.fichaIngreso.contenido.familiares[index].estadoCivil,
              gradoInstruccion : this.fichaIngreso.contenido.familiares[index].gradoInstruccion,
              ocupacion : this.fichaIngreso.contenido.familiares[index].ocupacion,
              observacion : this.fichaIngreso.contenido.familiares[index].observacion
            },
          this.dialogoVistaFamiliares = true;
        },
        cerrarVistaDatosFamiliar() {
          this.dialogoVistaFamiliares = false;
        },

        agregarServicio() {
          let servicios = { 
            servicio: servicios.servicio, 
            tipo: servicios.tipo,
          };
          this.fichaIngreso.contenido.servicios.push(servicios);
          this.$refs.myVueDropzone.removeAllFiles();

          this.servicios.servicio = "";
          this.servicios.tipo = "";
        },
        eliminarServicio(index) {
          this.fichaIngreso.contenido.servicios.splice(index, 1);
        },

        agregarPenal() {
          let penales = { 
            familiar: penales.familiar, 
            motivo: penales.motivo,
          };
          this.fichaIngreso.contenido.penales.push(penales);
          this.$refs.myVueDropzone.removeAllFiles();

          this.penales.familiar = "";
          this.penales.motivo = "";
        },
        eliminarPenal(index) {
          this.fichaIngreso.contenido.penales.splice(index, 1);
        },

        agregarFirma() {
          let firmas = {
            urlfirma: this.urlfirma,
            nombre: this.firmas.nombre,
            cargo: this.firmas.cargo,
          };
          this.fichaIngreso.contenido.firmas.push(firmas);
          this.$refs.myVueDropzone.removeAllFiles();

          this.urlfirma = "";
          this.firmas.nombre = "";
          this.firmas.cargo = "";
        },
        eliminarFirma(index) {
          this.fichaIngreso.contenido.firmas.splice(index, 1);
        },
        verFirma(index) {
          console.log(this.fichaIngreso.contenido.firmas[index].urlfirma);
          this.imagen = this.fichaIngreso.contenido.firmas[index].urlfirma;
          this.dialogVistaPreviaFirma = true;
        },
        cerrarVistaPreviaFirma() {
          this.dialogVistaPreviaFirma = false;
        },


        agregarFirma() {
          let firmas = {
            urlfirma: this.urlfirma,
            nombre: this.firmas.nombre,
            cargo: this.firmas.cargo,
          };
          this.fichaIngreso.contenido.firmas.push(firmas);
          this.$refs.myVueDropzone.removeAllFiles();

          this.urlfirma = "";
          this.firmas.nombre = "";
          this.firmas.cargo = "";
        },
        eliminarFirma(index) {
          this.fichaIngreso.contenido.firmas.splice(index, 1);
        },
        verFirma(index) {
          console.log(this.fichaIngreso.contenido.firmas[index].urlfirma);
          this.imagen = this.fichaIngreso.contenido.firmas[index].urlfirma;
          this.dialogVistaPreviaFirma = true;
        },
        cerrarVistaPreviaFirma() {
          this.dialogVistaPreviaFirma = false;
        },



      }, async mensaje(icono,titulo,texto,footer){
      await this.$swal({
        icon: icono,
        title: titulo,
        text: texto,
        footer:footer
      });
    },

    limpiarFichaIngreso() {
      return {
        fichaIngreso:{
          id:"",
          tipo:"FichaSocialIngreso",
          historialcontenido:[],
          creadordocumento:"",
          fechacreacion:"",
          area:"Social",
          fase:"acogida",
          idresidente:"",
          estado:"creado",
          contenido:{
            familiar:{
                motivoingreso:[],
                familiares:[],
                tipofamilia:"",
                problematicafam:"" 
            },
            vivienda:{
                ubicacion:"",
                descripcionubicacion:"",
                habitantes:[],
                habitacionesdormir:"",
                tipopropiedad:"",
                tipo:"",
                material:"",
                tipopiso:"",
                tipotecho:"",
                servicios:[], 
            },
            economico:{
                condicionlaboral:"",
                ocupacion:"",
                ingresos:[],
                egresos:[],
                observacion:""
            },
            salud:"",
            legal:{
                penales:[],
                apoyolocal:"",
            },
            diagnosticosocial:"",
            planintervencion:"",
            firmas:[],
            codigodocumento:""
          }
        }
      };
    },

    computed: {
    show: {
      get () {
        return this.visible
      },
      set (value) {
        if (!value) {
          this.$emit('close-dialog-fichaIngreso')
        }
      }
    }
  }
}

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