<template>
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
              <v-card> 
                <v-card-title>
                      Residentes Registrado
                </v-card-title>
                <v-card style="margin:10px">
                  <v-row>
                    <v-col cols="5">
                      <v-text-field
                                    :value="obtenerResidente"
                                    label="Nombre del Residente"
                                    outlined
                                    color="info"
                                    readonly
                                  ></v-text-field>
                    </v-col>
                    <v-col cols="5">
                      <v-text-field
                                    :value="obtenerIdentificacion"
                                    label="Identificacion del Residente"
                                    outlined
                                    color="info"
                                    readonly
                                  ></v-text-field>
                    </v-col>
                    <v-col cols="2"></v-col>
                  </v-row>
                </v-card>
              </v-card>

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
                        <v-avatar left color="#b3b3ff"  size="24">
                        <span style="font-size:12px">RT</span>
                        </v-avatar>
                        {{ data.item.nombre  + " " + data.item.apellido}}
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
                        <v-list-item-subtitle>Nro. Documento: {{data.item.numeroDocumento}}</v-list-item-subtitle>                    
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
                        @input="$v.fichaIngreso.contenido.ieprocedencia.nivel.$touch()"
                        @blur="$v.fichaIngreso.contenido.ieprocedencia.nivel.$touch()"
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
                          @input="$v.fichaIngreso.contenido.ieprocedencia.grado.$touch()"
                          @blur="$v.fichaIngreso.contenido.ieprocedencia.grado.$touch()"
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
                      @input="$v.fichaIngreso.contenido.ieprocedencia.situacionEscolar.$touch()"
                      @blur="$v.fichaIngreso.contenido.ieprocedencia.situacionEscolar.$touch()"
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
                      @input="$v.fichaIngreso.contenido.ieprocedencia.observacion.$touch()"
                      @blur="$v.fichaIngreso.contenido.ieprocedencia.observacion.$touch()"
                      :error-messages="errorObservacion"
                      shaped
                    ></v-textarea>


                <!--Documentos Escolares-->
                <v-card
                  style="margin-top:1%;margin-bottom:1%;padding-bottom:1%;background-color:#EAEAEA"
                >
                  <v-row>
                    <v-col cols="11"> <v-card-title>Documentos Escolares (Opcional)</v-card-title></v-col>
                    <v-col cols="1">
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
                  
                  <template v-if="fichaIngreso.contenido.ieprocedencia.documentosEscolares == 0">
                    <v-card style="margin:10px">
                        <v-card-title>No hay Documentos Escolares Añadidos</v-card-title>
                    </v-card>
                  </template>
                  <template v-else>
                    <v-card style="margin:10px">
                       <v-card v-for="(item,i) in fichaIngreso.contenido.ieprocedencia.documentosEscolares"
                          :key="i" style="margin:5px">
                        <v-list-item v-if="item.archivoDocumento != undefined && item.archivoDocumento.accion != 'eliminado'">
                          <v-list-item-content>
                            <v-list-item-title>{{item.titulo}}</v-list-item-title>
                          </v-list-item-content>
                          <v-list-item-icon>
                            <v-btn
                            rounded
                            color="primary"
                            @click="eliminarDocumentoEscolar(i,item)"
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
                  <v-dialog v-model="dialogoDocumentoEscolar" width="600px" persistent eager>
                      <v-card style="padding:20px">
                         <v-card-title>Registro de Documentos Escolares</v-card-title>
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
                                <v-btn block @click="cerrarDialogoRegistrarDocumentoEscolar"
                                 color="primary">
                                    <v-icon left>mdi-close-outline</v-icon>
                                    <span>Cerrar</span>
                                </v-btn>
                              </v-col>
                              <v-col cols="6">
                                <v-btn block @click="agregarDocumentoEscolar"
                                 color="success">
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
                          @input="$v.fichaIngreso.contenido.ieprocedencia.tipo.$touch()"
                          @blur="$v.fichaIngreso.contenido.ieprocedencia.tipo.$touch()"
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
                          @input="$v.fichaIngreso.contenido.ieprocedencia.modalidad.$touch()"
                          @blur="$v.fichaIngreso.contenido.ieprocedencia.modalidad.$touch()"
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
                  @input="$v.fichaIngreso.contenido.ieprocedencia.direccion.$touch()"
                  @blur="$v.fichaIngreso.contenido.ieprocedencia.direccion.$touch()"
                ></v-text-field> 
                 <v-row>
                    <v-col>
                      <v-text-field
                        label="Celular/Telefono"
                        v-model="fichaIngreso.contenido.ieprocedencia.telefono"
                        :error-messages="errorTelefono"
                        @input="$v.fichaIngreso.contenido.ieprocedencia.telefono.$touch()"
                        @blur="$v.fichaIngreso.contenido.ieprocedencia.telefono.$touch()"
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
                        @input="$v.fichaIngreso.contenido.ieprocedencia.correo.$touch()"
                        @blur="$v.fichaIngreso.contenido.ieprocedencia.correo.$touch()"
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
          <div  class="container-user">
            <form> 

                 <v-autocomplete        
                      style="margin-top:10px"      
                      :items="listaeducadores"
                      chips
                      dense
                      outlined  
                      v-model="fichaIngreso.contenido.responsableTurno"        
                      color="#009900"
                      label="Responsable de turno"
                      item-value="id"
                      item-text="datos.nombre"
                      @input="$v.fichaIngreso.contenido.responsableTurno.$touch()"
                      @blur="$v.fichaIngreso.contenido.responsableTurno.$touch()"
                      :error-messages="errorResponsableTurno"                            
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
                            {{ data.item.datos.nombre  + " " + data.item.datos.apellido}}
                        </v-chip>
                    </template>
                      
                    <template v-slot:item="data">
                        <v-list-item-avatar>
                            <v-avatar left color="#b3b3ff"  size="24">
                                <span style="font-size:12px">{{data.item.datos | generarAvatar}}</span>
                            </v-avatar>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title>Nombre completo: {{ data.item.datos.nombre }} {{data.item.datos.apellido}} </v-list-item-title>
                            <v-list-item-subtitle>Nro. Documento: {{data.item.datos.numerodocumento}}</v-list-item-subtitle>                    
                        </v-list-item-content>
                    </template>
                    </v-autocomplete> 

                <v-card
                  style="padding:10px;background-color:#EAEAEA"
                >
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
                    v-for="(observacion,i) in fichaIngreso.contenido.observaciones"
                    :key="i"
                  >
                        <v-row align="center">
                          <v-col :cols="10" align="left">
                            <span>{{i | numeracionListaString("Observacion")}}  {{ observacion | extencionString}}</span>
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
                            </v-card-text
                          >
                  </v-card>
                <v-card
                  style="margin-top:30px;padding:5px 5px;background-color:#EAEAEA"
                >
                <v-card class="subcard">
                          <v-card-title>Datos del Informante</v-card-title>
                          <v-card class="subcard"  style="margin-bottom:7px" color="#e6f3ff">
                              <v-text-field
                                  v-model="this.user.usuario"
                                  label="Autor del Informe de Incidencia"
                                  outlined
                                  color="info"
                                  readonly
                                ></v-text-field>
                          </v-card >
                               <v-card class="subcard" color="#e6f3ff">
                                   <v-text-field
                                    v-model="this.user.rol.nombre"
                                    label="Cargo del Autor"
                                    outlined
                                    color="info"
                                    readonly
                                  ></v-text-field>
                               </v-card>
                        </v-card>
                  <v-row>
                    <v-col :cols="12" align="left">
                      <div>
                        <vue-dropzone
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
                        </v-card>
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
                            <span >Modificar Ficha de Ingreso</span>
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
    props:[/*"listaresidentes","listaeducadores",*/"fichaIngreso"],
    components: {
      vueDropzone: vue2Dropzone,
    },data() {
        return {
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
         documentoEscolar:{
           titulo:"",
           file:""
         },dialogoDocumentoEscolar:false,
         observacionAux:"",
         step:1,
         imagenFirma:{urlOrigen: this.fichaIngreso.contenido.firma.urlfirma,
                        modificar:{estado:false,file:{}}},
        }
      },
    async created() {
      console.log("Se creo la instancia");
      this.fichaIngreso.contenido.ieprocedencia.documentosEscolares = this.fichaIngreso.contenido.ieprocedencia.documentosEscolares.map(
        (val)=>{
            return {
              titulo: val.titulo,
              archivoDocumento:{
                urlOrigen: val.url,
                accion:"creado",
                //cuando no es un archivo modificado
                estado:false
              }
            }
        });

    },
    methods:{
      ...mapMutations(["replaceFichaIngreso"]),
     mounteddropzone(){
            var file = { size: 123, name: "Firma del Documento", type: "image/jpg" };
            this.$refs.myVueDropzoneFirma.manuallyAddFile(file, this.fichaIngreso.contenido.firma.urlfirma,null,null,true);
          },
      verificarAccion(accion){
          if(accion != "eliminado" || accion != undefined){
            return true;
          }else{return false}
      },
      agregarDocumentoEscolar(){
        this.$v.documentoEscolar.$touch();
          if(!this.$v.documentoEscolar.$invalid){
            this.fichaIngreso.contenido.ieprocedencia.documentosEscolares.push(
              {titulo:this.documentoEscolar.titulo,
                archivoDocumento:{
                  urlOrigen: this.documentoEscolar.file,
                  accion:"agregado",
                  estado:true
                }});
            this.cerrarDialogoRegistrarDocumentoEscolar()
          }
      },
      abrirDialogoRegistrarDocumentoEscolar(){
        this.dialogoDocumentoEscolar=true;
      },cerrarDialogoRegistrarDocumentoEscolar(){
          this.dialogoDocumentoEscolar=false;
          this.$refs.myVueDropzoneDocumentosEscolares.removeAllFiles();
          this.documentoEscolar = {titulo:"",file:""}
          this.$v.documentoEscolar.$reset();
      },eliminarDocumentoEscolar(indice,item){
          if(item.archivoDocumento.accion == "agregado"){
            this.fichaIngreso.contenido
              .ieprocedencia.documentosEscolares
              .splice(indice,1);
          }else{
            item.archivoDocumento.accion="eliminado";
            this.fichaIngreso.contenido
              .ieprocedencia.documentosEscolares
              .splice(indice,1,item);
          }
      },afterSuccessFirma(file, response){
          this.imagenFirma.modificar.estado = true;
          this.imagenFirma.modificar.file = file;
          console.log(this.imagenFirma.modificar.file);
      },afterRemovedFirma(){
          this.imagenFirma.modificar.estado = true;
          this.imagenFirma.modificar.file = {};
      },afterSuccessDocumentos(file, response){
             this.documentoEscolar.file = file;
      },afterRemovedDocumentos(){

      },
      filtrarArchivos(accion,lista){
        return lista.filter(x => x.archivoDocumento.accion == accion);
      },
      //Modificacion de  PDF
      async modificarDocumentosEscolares(lista){
          var promises;
          listaArchivosEliminados=[];listaArchivosAñadidos=[];listaArchivosOriginales=[]
          var listaArchivosEliminados = this.filtrarArchivos("eliminado",lista);
          var listaArchivosAñadidos   = this.filtrarArchivos("agregado",lista);
          var listaArchivosOriginales = this.filtrarArchivos("creado",lista);
          if(listaArchivosEliminados.length != 0 ){
                await this.eliminarPdf(listaArchivosEliminados.map(x => {return x.archivoDocumento.urlOrigen}));
           }
          if(listaArchivosAñadidos.length != 0){
                promises = listaArchivosAñadidos
                .map( async val=>{
                  var urlfile = await this.registrarPdf(val.archivoDocumento.urlOrigen);
                  return {titulo:val.titulo, url:urlfile};
                });
                listaArchivosAñadidos = await Promise.all(promises);
           }
           if(listaArchivosOriginales.length != 0){
             listaArchivosOriginales = listaArchivosOriginales.map(x=>{
               return {titulo:x.titulo, url:x.archivoDocumento.urlOrigen}
             })
           }
           
          return listaArchivosAñadidos.length == 0? listaArchivosOriginales:
                  listaArchivosAñadidos.concat(listaArchivosOriginales);
      },async eliminarPdf(listaUrls){
        console.log(listaUrls)
            await axios.post("/Media/archivos/pdf/delete", listaUrls)
                      .then((res) => {
                          console.log(res.data);
                      });
      }
      ,async registrarPdf(file){
          var urlFile = "";
          let formData = new FormData();
          formData.append("file",file);
            await axios.post("/Media/archivos/pdf",formData)
                      .then((res)=> {
                        urlFile = res.data;
                      });
            return urlFile;
        },
        //Modificacion de Firmas
        async modificaFirma(){
          var url = this.imagenFirma.urlOrigen;
          var urlFile = "";
          let formData = new FormData();
          formData.append("file",this.imagenFirma.modificar.file);
          //var mediabody={file:{File:formData}, urlfirma: this.imagenFirma.urlOrigen }
            await axios.put(`/Media/${this.imagenFirma.urlOrigen}`,formData)
                       .then((res)=> {
                            urlFile = res.data;
                      });
            return urlFile;
        },cerrarDialogo(){     
            this.$emit("cerrar-modal-detalle-ficha-ingreso");
            this.step = 1;
            this.$refs.myVueDropzoneDocumentosEscolares.removeAllFiles();    
            this.$refs.myVueDropzoneFirma.removeAllFiles();
        }
      }, 
     filters:{
        extencionString: (cadena)=>{
          return cadena.length > 35? `${cadena.substring(0,34)}...` : cadena;
        },numeracionListaString: (index, etiqueta)=>{
           return `${etiqueta} ${++index}: `;
        },generarAvatar:(datos)=>{
          return `${datos.nombre.substring(0,1)}${datos.apellido.substring(0,1)}`;
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
</style>
