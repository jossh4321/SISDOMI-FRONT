<template>
<v-dialog v-model="show" max-width="65%">
    <v-card >
      <v-card-title class="justify-center">Resgistrar Ficha de Ingreso Educativa</v-card-title>
      <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step 
          editable
          step="1"
        >
        Residente
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step
          editable
          step="2"
        >
        Institución Educativa
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step
          editable
          step="3"
        >
        Encargado
        </v-stepper-step>
      </v-stepper-header>    
      <v-stepper-items>
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

                <v-row>
                    <v-col>
                      <v-select              
                        :items="itemNivel"
                        v-model="itemNivel.value"
                        label="Nivel"            
                        outlined      
                        dense       
                      ></v-select>
                    </v-col>
                    <v-col>
                      <v-select              
                        :items="itemGrado"
                        v-model="itemGrado.value"
                        label="Grado"            
                        outlined      
                        dense       
                      ></v-select>
                    </v-col>
                </v-row>

             
                    <v-textarea
                            label="Situación Académica"
                            v-model="fichaIngreso.situacionescolar"   
                            color="#009900"
                        ></v-textarea>
                

                
                    <v-textarea
                            label="Observacion"
                            v-model="fichaIngreso.observacion"
                            color="#009900"
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
                          v-model="docEscolar"
                          label="Documentos Escolares"
                          color="#009900"
                        ></v-text-field>
                      </v-col>
                      <v-col :cols="4" align="right">
                        <v-btn
                          fab
                          small
                          dark
                          color="green"
                          @click="agregarDocEscolar"
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
                    v-for="docEscolar in docEscolares"
                    :key="docEscolar"
                  >
                    <v-row style="margin-left:10px;heigh:100%" align="center">
                      <v-col :cols="8" align="left">
                        <span>{{ docEscolar }}</span>
                      </v-col>
                      <v-col :cols="4" align="right">
                        <div style="margin-right:20px">
                          <v-btn
                            fab
                            x-small
                            dark
                            color="red"
                            @click="eliminarDocEscolar(docEscolar)"
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
                    :options="dropzoneOptions3"
                  >
                  </vue-dropzone>
                </div>

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

               <v-row>
                    <v-col>
                      <v-select              
                        :items="itemModalidad"
                        v-model="itemModalidad.value"
                        label="Tipo"            
                        outlined      
                        dense       
                      ></v-select>
                    </v-col>
                    <v-col>
                      <v-autocomplete
                        label="Modalidad"            
                        outlined      
                        dense       
                      ></v-autocomplete>
                    </v-col>
                </v-row>

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
          <div  class="container-user">
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
                    ref="myVueDropzone2"
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
                        <v-btn block @click="registrarFicha" color="success">
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


export default {
        
    props:["listaresidentes","visible","residenteSeleccionado"],
    components: {
      vueDropzone: vue2Dropzone,
    },
    ...mapMutations(["setFichaIngreso","addFichaIngreso"]),
    data() {
        return {
          itemModalidad: [
            { value: '1', text: 'Público'},
            { value: '2', text: 'Privado'},
            { value: '3', text: 'Nacional'}
          ],

          itemNivel: [
            { value: '1', text: 'Primaria'},
            { value: '2', text: 'Secundaria'},
            { value: '3', text: 'Estudio Superior'}
          ],

          itemGrado: [
            { value: '1', text: '1'},
            { value: '2', text: '2'},
            { value: '3', text: '3'},
            { value: '4', text: '4'},
            { value: '5', text: '5'}
          ],

          itemSexo: [
            { value: '1', text: 'Femenino'},
            { value: '2', text: 'Masculino'}
          ],
          
          dialogVistaPreviaFirma: false,
          datemenu: false,
          step: 1,
          dropzoneOptions: {
            url: "https://httpbin.org/post",
            thumbnailWidth: 250,
            maxFilesize: 10.0,
            maxFiles: 10,
            acceptedFiles: ".pdf",
            headers: { "My-Awesome-Header": "header value" },
            addRemoveLinks: true,
            dictDefaultMessage:
              "Seleccione una observacion de su dispositivo o arrástrela aquí",
          },
         dropzoneOptions2: {
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
          conclusion: "",
          conclusiones: [],
          
          firmas: { urlfirma: "", nombre: "", cargo: "" },
           imagen: "",

          fichaIngreso: {
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
              ieprocedencia:{
                nombre: "",
                tipo: "",
                modalidad: "",
                nivel: "",
                grado: "",
                observacion: "",
                direccion: "",
                telefono: "",
                correo: "",
                documentosescolares: [],
                situacionescolar: ""
              },
              responsableturno: "",
              conclusiones:[],
              firmas:[],
              codigodocumento: "",
            },
          },
         

        }
        
    },
    async created() {
      this.conclusiones = "";
      this.conclusion = "";
      this.docEscolar = "";
      this.docEscolares = "";
    },
    methods:{
        cerrarDialogo(){     
            this.step = 1;       
            this.$emit("close-dialog-fichaIngreso");
        }, 
        afterSuccess2(file, response) {
      console.log(file);
      this.firmas.urlfirma = file.dataURL.split(",")[1];
      //this.$v.firma.urlfirma.$model = file.dataURL.split(",")[1];
      //console.log(file.dataURL.split(",")[1]);
    },
    
    afterRemoved2(file, error, xhr) {
      this.firmas.urlfirma = "";
      
    },
    afterSuccess(file, response) {
      // console.log(file);
      // console.log(file.dataURL);
      // console.log(this.$refs.myVueDropzone);

      this.fileList.push(file);
    },
    afterRemoved(file, error, xhr) {
      this.this.fichaIngreso.contenido.documentosescolares = "";
      
    },
    
    async sendPDFFiles() {
      let listaanexos = this.fileList;
      for (let index = 0; index < this.fileList.length; index++) {
        let formData = new FormData();
        formData.append("file", this.fileList[index]);
        await axios
          .post("/Media/archivos/pdf", formData)
          .then((res) => {
            listaanexos[index] = res.data;
          })
          .catch((err) => console.log(err));
      }
      this.fichaIngreso.contenido.documentosescolares = listaanexos;
      console.log(listaanexos);
    },


        async rFichaIngresoE(){
            
            await axios.post("Documento/all/fichaingresoeducativacrear")
              .then(res => {
                  this.fichaIngreso=res.data;
              this.rFichaIngresoE(res.data);
              this.addFichaIngreso(this.fichaIngreso)
            }).catch(err => console.log(err));
            
        },
        async  registrarFicha(){
          console.log(this.fichaIngreso)      
        },
        agregarConclusion() {
          let conclusiones = this.conclusion;
          this.fichaIngreso.contenido.conclusiones.push(conclusiones);
          this.conclusiones = this.fichaIngreso.contenido.conclusiones;
          this.conclusion = "";
        },
        eliminarConclusion(conclusion) {
          // this.fichaIngreso.contenido.conclusiones.splice(conclusion, 1);
          this.conclusiones.forEach(function(car, index, object) {
            if (car === conclusion) {
              object.splice(index, 1);
            }
          });
        },
        agregarDocEscolar(){
          let docEscolares = this.docEscolar;
          this.fichaIngreso.contenido.documentosescolares.push(docEscolares);
          this.docEscolares = this.fichaIngreso.contenido.documentosescolares;
          this.docEscolar = "";
        },
        eliminarDocEscolar(docEscolar){
          this.docEscolares.forEach(function(car, index, object) {
            if (car === docEscolar) {
              object.splice(index, 1);
            }
          });
        }, 
        agregarFirma() {
          let firmad = {
            urlfirma: this.firmas.urlfirma,
            nombre: this.firmas.nombre,
            cargo: this.firmas.cargo,
          };
          this.fichaIngreso.contenido.firmas.push(firmad);
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
        fichaIngreso: {
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
              ieprocedencia:{
                nombre: "",
                tipo: "",
                modalidad: "",
                nivel: "",
                grado: "",
                observacion: "",
                direccion: "",
                telefono: "",
                correo: "",
                documentosescolares: [],
                situacionescolar: ""
              },
              responsableturno: "",
              conclusiones: [],
              firmas: [],
              codigodocumento: "",
            },
          },
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
