<template>
  <v-card>
    <v-card-title class="justify-center">Registrar Seguimiento Educativo</v-card-title>
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
                      <v-text-field
                        v-model="seguimiento.contenido.modalidad"
                        label="Modalidad"
                        outlined
                        
                        color="#009900"
                      ></v-text-field>
                      <v-text-field
                        v-model="seguimiento.contenido.nivel"
                        label="Nivel"
                        outlined
                        
                        color="#009900"
                      ></v-text-field>
                      <v-text-field
                        v-model="seguimiento.contenido.grado"
                        label="Grado"
                        outlined
                        
                        color="#009900"
                      ></v-text-field>
                      <v-text-field
                        v-model="seguimiento.contenido.añoescolar"
                        label="Año Escolar"
                        outlined
                        color="#009900"
                      ></v-text-field>
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
                                v-for="(item, index) in seguimiento.contenido.firmas"
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
                                  <v-col :cols="4">
                                    <article>
                                          <v-img style="display:block"
                                            height="70"
                                          width="170"
                                            :src="'data:image/jpeg;base64,' +  item.urlfirma"
                                          ></v-img>
                                    </article>
                                  </v-col>
                                  <v-col align="right">
                                    <div style="margin-right:20px">
                                 <!--  <v-btn
                                        style="margin-right:10px"
                                        fab
                                        x-small
                                        dark
                                        color="#126BB5"
                                      >
                                        <v-icon dark>
                                          mdi-pencil
                                        </v-icon>
                                      </v-btn>  -->
                                      
                                    </div>
                                  </v-col>
                                </v-row>
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
                                      @click="dialog = false"
                                    >
                                      Cerrar
                                    </v-btn>
                                
                                  </v-card-actions>
                                </v-card>
                              </v-dialog>
                            </v-row>
                          
              
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
                     <!--IMAGENES DE  FIRMA -->
                    
                    <!--Botones de card -->
                      <v-row>
                        <v-col>
                          <v-btn block @click="step = 1" color="success">
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
import { required, minLength, email, helpers } from "vuelidate/lib/validators";
import moment from "moment";
export default {
name:'RegistrarSeguimientoEducativo',
props:["listaresidentes"],
components:{
    vueDropzone: vue2Dropzone,
},
data(){
  return{
    dialog:false, // dialogo firma
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


      //separacion
         firma:{urlfirma:"",nombre:"",cargo:""},
    seguimiento:{
      id:"",
      tipo:"",
      historialcontenido:[],
      creadordocumento:"",
      fechacreacion:"",
      area:"",
      fase:"",
      idresidente:"",
      estado:"",
      contenido:{
           modalidad:"",
           nivel:"",
           grado:"",
           añoescolar:"",
           trimestre:[],
           firmas:[],
           codigodocumento:""
      },
    }
  }
},
methods:{
      cerrarDialogo(){
         this.step = 1;
        this.$emit("close-dialog-save");
       
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
    ///metodo para agregar firma residente
    guardarFirma(){
   let firmad = {urlfirma:this.firma.urlfirma,nombre:this.firma.nombre,cargo:this.firma.cargo};

   this.seguimiento.contenido.firmas.push(firmad);
   console.log(this.seguimiento.contenido.firmad);
   this.$refs.myVueDropzone.removeAllFiles();

   this.firma.urlfirma="";
   this.firma.nombre="";
   this.firma.cargo="";
    },
    
     
    
    
  },
  
  }
 
  

</script>

<style>

</style>