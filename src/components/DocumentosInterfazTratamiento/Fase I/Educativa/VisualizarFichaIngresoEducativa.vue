<template>
    <v-card >
      <v-card-title class="justify-center">Visualizar Ficha de Ingreso Educativa</v-card-title>
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
              <v-card class="subcard card-padre">
                          <v-card class="subcard"  style="margin-bottom:7px" color="#e6f3ff">
                              <span>
                                Residente: {{this.residente.nombre}} {{this.residente.apellido}}
                              </span>
                          </v-card >
                          <v-card class="subcard" color="#e6f3ff">
                            <span>
                              Fecha de Ingreso: {{ this.residente.fechaingreso | fomatoFecha}}
                            </span>
                          </v-card>
              </v-card>                 
                <v-row>
                    <v-col>
                      <v-select     
                        label="Nivel"
                        v-model="fichaIngreso.contenido.ieprocedencia.nivel"
                        :items="itemsNivel"
                        color="#009900"
                        :item-text="itemsNivel.text"
                        :item-value="itemsNivel.value"
                        outlined
                        readonly
                      ></v-select>
                    </v-col>
                    <v-col>
                      <v-select
                          label="Grado"
                          v-model="fichaIngreso.contenido.ieprocedencia.grado"
                          :items="itemGrado"
                          color="#009900"
                          :item-text="itemGrado.text"
                          :item-value="itemGrado.value"
                          outlined
                          readonly
                        ></v-select>
                    </v-col>
                </v-row>
                    <v-textarea
                      label="Situacion Academica"
                      v-model="fichaIngreso.contenido.ieprocedencia.situacionescolar"   
                      color="#009900"
                      outlined
                      rows="4"
                      row-height="30"
                      shaped
                      readonly
                    ></v-textarea>
                    <v-textarea
                      label="Observacion de la Institucion"
                      v-model="fichaIngreso.contenido.ieprocedencia.observacion"   
                      color="#009900"
                      outlined
                      rows="4"
                      row-height="30"
                      shaped
                      readonly
                    ></v-textarea>


                <!--Documentos Escolares-->
                <v-card
                  style="margin-top:1%;margin-bottom:1%;padding-bottom:1%;background-color:#EAEAEA"
                >
                  <v-row>
                    <v-col cols="12"> <v-card-title>Documentos Escolares (Opcional)</v-card-title></v-col>
                    </v-row>
                  
                  <template v-if="fichaIngreso.contenido.ieprocedencia.documentosescolares == 0">
                    <v-card style="margin:10px">
                        <v-card-title>No hay Documentos Escolares Añadidos</v-card-title>
                    </v-card>
                  </template>
                  <template v-else>
                    <v-card style="margin:10px">
                       <v-card v-for="(item,i) in fichaIngreso.contenido.ieprocedencia.documentosescolares"
                          :key="i" style="margin:5px">
                        <v-list-item>
                          <v-list-item-content>
                            <v-list-item-title>{{item.titulo}}</v-list-item-title>
                          </v-list-item-content>
                          <v-list-item-icon>
                            <v-btn
                            rounded
                            color="info"
                            @click="verDocumentoEscolar(item)"
                          >
                            <v-icon left>
                              mdi-eye-outline
                            </v-icon>
                            Detalle
                          </v-btn>
                          </v-list-item-icon>
                        </v-list-item>
                      </v-card>
                    </v-card>
                    
                  </template>
                  <v-dialog v-model="dialogoDocumentoEscolar" width="600px" persistent>
                      <v-card style="padding:20px">
                         <v-card-title>Detalle del Documento Escolar</v-card-title>
                         <v-form>
                            <v-text-field
                              label="Titulo del Documento"
                              :value="documentoEscolar.titulo"
                              color="success"
                              readonly
                              outlined
                            ></v-text-field>
                              <v-card style="border:1px solid black; margin-bottom:10px">
                                <v-card-subtitle>Documento Registrado</v-card-subtitle>
                              </v-card>
                            <iframe :src="documentoEscolar.url" width="100%" height="450px">
                              </iframe>
                            <v-row>
                              <v-col cols="12">
                                <v-btn block @click="cerrarDialogoRegistrarDocumentoEscolar"
                                 color="primary">
                                    <v-icon left>mdi-close-outline</v-icon>
                                    <span>Cerrar</span>
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
                          outlined
                          readonly
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
                          outlined
                          readonly
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
                  readonly
                ></v-text-field> 
                 <v-row>
                    <v-col>
                      <v-text-field
                        label="Celular/Telefono"
                        v-model="fichaIngreso.contenido.ieprocedencia.telefono"
                        auto-grow
                        outlined        
                        color="#009900"
                        shaped
                        readonly
                      ></v-text-field> 
                    </v-col>
                    <v-col>
                      <v-text-field
                        label="Correo"
                        v-model="fichaIngreso.contenido.ieprocedencia.correo"
                        auto-grow
                        outlined        
                        color="#009900"
                        shaped
                        readonly
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
          <div  class="container-user">
            <form>
                <v-card
                  style="padding:10px;background-color:#EAEAEA"
                >
                  <v-card-title>Observaciones Registradas</v-card-title>
                  <v-card
                    elevation="0"
                    color="#FAFAFA"
                    style="margin:5px;padding:5px"
                    height="60"
                    v-for="(observacion,i) in fichaIngreso.contenido.observaciones"
                    :key="i"
                  >
                        <v-row align="center">
                          <v-col :cols="12" align="left">
                            <span>{{i | numeracionListaString("Observacion")}}  {{ observacion | extencionString}}</span>
                          </v-col>
                        </v-row>
                  </v-card>
                </v-card>
                <v-card
                  style="margin-top:30px;padding:5px 5px;background-color:#EAEAEA"
                >
                <v-card class="subcard">
                          <v-card-title>Datos del Informante</v-card-title>
                          <v-card class="subcard"  style="margin-bottom:7px" color="#e6f3ff">
                              <v-text-field
                                  v-model="this.usuario"
                                  label="Autor del Informe de Incidencia"
                                  outlined
                                  color="info"
                                  readonly
                                ></v-text-field>
                          </v-card >
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
                        </vue-dropzone> -->
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
              </v-row>
            </form>     
          </div>
        </v-stepper-content>
      </v-stepper-items>
      </v-stepper>        
    </v-card>
</template>
<script> 

import axios from 'axios';
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import {mapMutations, mapState, mapGetters} from "vuex";
import { required, minLength,maxLength,email,helpers,numeric } from 'vuelidate/lib/validators'
import Vuelidate from 'vuelidate'
import moment from 'moment'


export default {
    props: ["residente"],
    components: {
      vueDropzone: vue2Dropzone,
    },data() {
        return {
          fichaIngresoid: "",
      fichaIngreso: {
        id: "",
        tipo: "",
        historialcontenido: [],
        creadordocumento: "",
        fechacreacion: null,
        area: "",
        fase: "",
        idresidente: this.residente.id,
        estado: "",
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
          documentosEscolares: [],
            situacionEscolar: ""
          },
          observaciones:[],
          codigoDocumento: "",
        },
      },          
          itemsModalidad: [
            { value: 'EBA', text: 'Educacion Basica Alternativa'},
            { value: 'EBE', text: 'Educacion Basica Especial'},
            { value: 'EBR', text: 'Educacion Basica Regular'}
          ],
          itemsNivel: [
            { value: 'PRIMARIA', text: 'Nivel Primaria'},
            { value: 'SECUNDARIA', text: 'Nivel Secundaria'},
            //{ value: 'SUPERIOR', text: 'Estudio Superior'}
          ],itemsTipo: [
            { value: 'PRIVADA', text: 'Institucion Privada'},
            { value: 'ESTATAL', text: 'Institcuion Estatal'}
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
         dropzoneOptionsFirma: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 250,
        maxFilesize: 3.0,
        maxFiles: 1,
        acceptedFiles: ".jpg, .png, jpeg",
        headers: { "My-Awesome-Header": "header value" },
        addRemoveLinks: false,
        dictDefaultMessage:
          "Seleccione una Imagen de su Dispositivo o Arrastrela Aqui",
      },
         documentoEscolar:{
         },dialogoDocumentoEscolar:false,
         observacionAux:"",
         step:1,
         imagenFirma:{urlOrigen: "",
                        modificar:{estado:false,file:{}}},        
        usuario: "",
        cargo:"",
        firma:"",
        }
      },
    async created() {  
      await this.obtenerFichaIngresoId();
      await this.obtenerfichaIngreso(this.fichaIngresoid);         
      await this.obtenerCreador();
    },
    methods:{
      ...mapMutations(["replaceFichaIngreso"]),
     async obtenerFichaIngresoId() {
      await axios
        .get("/documento/FichaEducativaIngreso/residente/"+this.residente.id)
        .then((x) => {
          this.fichaIngresoid = x.data[0].id;
        })
        .catch((err) => console.log(err));
    },
    async obtenerfichaIngreso(id) {
      await axios
        .get(`/Documento/fichaingreso/detalle/${id}`)
        .then((res) => {
          //console.log( "porfavor" )
          this.fichaIngreso = res.data;
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    },
      async obtenerCreador() {
        await axios
        .get("/usuario/rol/permiso?id=" + this.fichaIngreso.creadorDocumento.id)
        .then((x) => {
          this.usuario = x.data.datos.nombre + " " + x.data.datos.apellido;
          this.cargo = x.data.rol.nombre;
          this.firma = x.data.datos.firma;
        })
        .catch((err) => console.log(err));
      },
      verificarAccion(accion){
          if(accion != "eliminado" || accion != undefined){
            return true;
          }else{return false}
      },cerrarDialogoRegistrarDocumentoEscolar(){
          this.dialogoDocumentoEscolar=false;
          this.documentoEscolar = {titulo:"",file:""}
      },verDocumentoEscolar(item){
          this.documentoEscolar = item;
          this.dialogoDocumentoEscolar=true;
      },/*afterSuccessFirma(file, response){
          this.imagenFirma.modificar.estado = true;
          this.imagenFirma.modificar.file = file;
          console.log(this.imagenFirma.modificar.file);
      },afterRemovedFirma(){
          this.imagenFirma.modificar.estado = true;
          this.imagenFirma.modificar.file = {};
      },*/afterSuccessDocumentos(file, response){
             this.documentoEscolar.file = file;
      },afterRemovedDocumentos(){

      },
      filtrarArchivos(accion,lista){
        return lista.filter(x => x.archivoDocumento.accion == accion);
      },cerrarDialogo(){     
            this.$emit("cerrar-modal-docf1");
            this.step = 1;
            //this.$refs.myVueDropzoneFirma.removeAllFiles();
        }
      }, 
     filters:{
        extencionString: (cadena)=>{
          return cadena.length > 35? `${cadena.substring(0,34)}...` : cadena;
        },numeracionListaString: (index, etiqueta)=>{
           return `${etiqueta} ${++index}: `;
        },generarAvatar:(datos)=>{
          return `${datos.nombre.substring(0,1)}${datos.apellido.substring(0,1)}`;
        },fomatoFecha: (fecha) =>{
            var formato = moment(fecha);
            return formato.format("llll");
        }
    },computed: {
      ...mapGetters(["user"]),
      obtenerResidente(){
          return `${this.fichaIngreso.residente.nombre} ${this.fichaIngreso.residente.apellido}`
      },obtenerIdentificacion(){
          return `${this.fichaIngreso.residente.tipoDocumento}: ${this.fichaIngreso.residente.numeroDocumento}`
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
div.select__selection--disabled{
  color:black !important;
}
</style>
