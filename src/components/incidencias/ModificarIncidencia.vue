<template>
    <v-card style="width:inherit">
    <v-card-title class="justify-center">Modificacion de Incedencias</v-card-title>
    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step editable step="1"> Introduccion </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step editable step="2"> Hechos e Incidencia </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step editable step="3">Firma e Involucrados</v-stepper-step>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content step="1">
          <div class="container-user">
            <form style="padding:5px">
              <v-text-field
                v-model="incidencia.titulo"
                label="Ingrese un Encabezado"
                outlined
                color="#009900"
                @input="$v.incidencia.titulo.$touch()"
                @blur="$v.incidencia.titulo.$touch()"
                :error-messages="errorTitulo"
              ></v-text-field>
                <v-textarea
                v-model="incidencia.descripcion"
                label="Ingrese una descripcion"
                outlined
                auto-grow
                rows="4"
                color="#009900"
                row-height="35"
                @input="$v.incidencia.descripcion.$touch()"
                @blur="$v.incidencia.descripcion.$touch()"
                :error-messages="errorDescripcion"
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
                    v-model="incidencia.fecha"
                    label="Fecha de lo Ocurrido"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    @input="$v.incidencia.fecha.$touch()"
                    @blur="$v.incidencia.fecha.$touch()"
                    :error-messages="errorFecha"
                    color="#009900"
                    outlined
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="incidencia.fecha"
                  @input="datemenu = false"
                  locale="es-es"
                ></v-date-picker>
              </v-menu>
                <v-menu
                    ref="menu"
                    v-model="timemenu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="incidencia.hora"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                >
                    <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                        v-model="incidencia.hora"
                        label="Hora de lo ocurrido"
                        prepend-icon="mdi-clock-outline"
                        readonly
                        v-bind="attrs"
                        outlined
                        v-on="on"
                        color="success"
                        @input="$v.incidencia.hora.$touch()"
                        @blur="$v.incidencia.hora.$touch()"
                        :error-messages="errorHora"
                    ></v-text-field>
                    </template>
                    <v-time-picker
                    v-if="timemenu"
                    v-model="incidencia.hora"
                    full-width
                    @click:minute="$refs.menu.save(incidencia.hora)"
                    ></v-time-picker>
                </v-menu>
              <v-row>
                <v-col>
                  <v-btn block @click="step = 2" color="success">
                    <v-icon left>mdi-page-next-outline</v-icon>
                    <span>Continuar</span>
                  </v-btn>
                </v-col>
                <v-col>
                  <v-btn block color="primary" @click="cerrarDialogo()">
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
            <form style="padding:5px">
                        <!--Lista de Observaciones -->
                        <v-card>
                            <v-card-title>Registro de Observaciones</v-card-title>
                            <v-container grid-list-md text-xs-center>
                            <v-layout row wrap>
                            <v-flex xs10>

                                 <v-textarea
                                    v-model="observacionesAux"
                                    label="Ingrese la observacion"
                                    outlined
                                    auto-grow
                                    rows="4"
                                    color="#009900"
                                    row-height="35"
                                    @input="$v.observacionesAux.$touch()"
                                    @blur="$v.observacionesAux.$touch()"
                                    :error-messages="errorObservacionAux"
                                    ></v-textarea>

                            </v-flex>
                            <v-flex xs2>
                                 <v-btn
                                    class="mx-2"
                                    fab
                                    dark
                                    color="success"
                                    @click="addObservacion"
                                    >
                                    <v-icon dark>
                                        mdi-plus
                                    </v-icon>
                                    </v-btn>
                            </v-flex>
                            </v-layout>
                        </v-container>
                        <v-list flat>
                            <v-list-item
                            v-for="(item, i) in incidencia.observaciones"
                            :key="i" class="item-list"
                            >
                                <v-list-item-icon>
                                <v-icon
                                @click="deleteItemObservacion(i)"
                                left
                                color="red"
                                >mdi-minus-circle</v-icon
                                >
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title >{{i | numeracionListaString("Observacion")}}  {{item | extencionString }}</v-list-item-title>
                                </v-list-item-content>
                            
                            </v-list-item>
                        </v-list>
                              <v-card v-if="errorObservaciones" color="red">
                                <v-card-text class="text-center" style="color: white"
                                  >Debe Ingresar 1 Observacion como minimo</v-card-text>
                              </v-card>
                        </v-card>
                        <!---->
                        <!--Lista de Incidencias-->
                        <v-card>
                            <v-card-title>Registro de Incidencias</v-card-title>
                            <v-container grid-list-md text-xs-center>
                                <v-layout row wrap>
                                <v-flex xs10>
                                   <v-textarea
                                    v-model="incidenciasAux"
                                    label="Ingrese la Incidencias"
                                    outlined
                                    auto-grow
                                    rows="4"
                                    color="#009900"
                                    row-height="35"
                                    @input="$v.incidenciasAux.$touch()"
                                    @blur="$v.incidenciasAux.$touch()"
                                    :error-messages="errorIncidenciaAux"
                                    ></v-textarea>
                                </v-flex>
                                <v-flex xs2>
                                    <v-btn
                                        class="mx-2"
                                        fab
                                        dark
                                        color="success"
                                        @click="addSubIncidencia"
                                        >
                                        <v-icon dark>
                                            mdi-plus
                                        </v-icon>
                                        </v-btn>
                                </v-flex>
                                </v-layout>
                            </v-container>

                            <v-list flat>
                                <v-list-item
                                v-for="(item, i) in incidencia.incidencias"
                                :key="i" class="item-list"
                                >
                                    <v-list-item-icon>
                                    <v-icon
                                    @click="deleteItemIncidencia(i)"
                                    left
                                    color="red"
                                    >mdi-minus-circle</v-icon
                                    >
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>{{i | numeracionListaString("Incidencia")}}  {{item | extencionString }}</v-list-item-title>
                                    </v-list-item-content>
                                
                                </v-list-item>
                            </v-list>
                            <v-card v-if="errorIncidencias" color="red">
                                <v-card-text class="text-center" style="color: white"
                                    >Debe Ingresar 1 Incidencia como minimo</v-card-text>
                            </v-card>
                        </v-card>
                        <!---->

                <v-divider class="divider-custom"></v-divider>
                 <v-row>
                  <v-col>
                    <v-btn block @click="step = 3" color="success">
                      <v-icon left>mdi-page-next-outline</v-icon>
                      <span>Continuar</span>
                    </v-btn>
                  </v-col>
                  <v-col>
                    <v-btn block color="primary" @click="cerrarDialogo()">
                      <v-icon left>mdi-close-outline</v-icon>
                      <span>Cerrar</span>
                    </v-btn>
                  </v-col>
                </v-row>
            </form>
          </div>
        </v-stepper-content>
        <v-stepper-content step="3">
            <div class="container-user">
              <form style="padding:5px">
                  <v-autocomplete
                            filled
                            chips
                            color="success"
                            label="Residentes Involucrados"
                            outlined
                            v-model="incidencia.residentes"
                            :loading="loadingSearch"
                            :search-input.sync="searchResidente"
                            :items="listResidentes"
                            item-text="residente"
                            item-value="id"
                            multiple
                            hide-no-data
                            cache-items
                            @input="$v.incidencia.residentes.$touch()"
                            @blur="$v.incidencia.residentes.$touch()"
                            :error-messages="errorResidente"
                            >
                          <template v-slot:item="item">
                              <v-row @click="clearAfterSelect">
                                <v-col cols="1">
                                      <v-list-item-avatar
                                      color="primary"
                                      class="headline font-weight-light white--text"
                                    >
                                      {{ item.item.residente.charAt(0) }}
                                    </v-list-item-avatar>
                                </v-col>
                                <v-col cols="11">
                                    <v-list-item-content style="margin-left:10px">
                                      <v-list-item-title>
                                        {{ item.item.residente }}
                                      </v-list-item-title>
                                      <v-list-item-subtitle>
                                        DNI: {{ item.item.numeroDocumento }}
                                      </v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-col>
                              </v-row>
                            </template>
                        </v-autocomplete>

                        <v-card class="subcard">
                          <v-card-title>Datos del Informante</v-card-title>
                          <v-card class="subcard"  style="margin-bottom:7px" color="#e6f3ff">
                              <v-text-field
                                  v-model="incidencia.firma.nombre"
                                  label="Autor del Informe de Incidencia"
                                  outlined
                                  color="info"
                                  readonly
                                ></v-text-field>
                          </v-card >
                               <v-card class="subcard" color="#e6f3ff">
                                   <v-text-field
                                    v-model="incidencia.firma.cargo"
                                    label="Autor del Informe de Incidencia"
                                    outlined
                                    color="info"
                                    readonly
                                  ></v-text-field>
                               </v-card>
                        </v-card>
                        <div style="margin-top:10px">
                          <vue-dropzone
                            ref="myVueDropzone"
                            @vdropzone-success="afterSuccess"
                            @vdropzone-removed-file="afterRemoved"
                            @vdropzone-mounted="mounteddropzone"
                            id="dropzone"
                            :options="dropzoneOptions"
                          >
                          </vue-dropzone>
                       
                        <v-card v-if="errorFirma" class="error-card" color="red">
                          <v-card-text class="text-center" style="color: white"
                            >Debe Subir una firma obligatoriamente
                            </v-card-text
                          >
                        </v-card>
                        </div>
                         <v-divider class="divider-custom"></v-divider>
                          <v-row>
                            <v-col>
                              <v-btn block @click="modificarIncidencia()" color="warning">
                                <v-icon left>mdi-content-save-all-outline</v-icon>
                                <span>Modificar Incidencia</span>
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
import Vuelidate from 'vuelidate'
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import { mapMutations, mapState, mapGetters} from "vuex";
import { required, minLength, maxLength} from "vuelidate/lib/validators";
import moment from "moment";
export default {
   components: {
    vueDropzone: vue2Dropzone,
    },props:["incidencia","listResidentesSelected"],
    data(){
        return{
            timemenu:false,
            datemenu: false,
            step: 1,
            dropzoneOptions: {
            url: "https://httpbin.org/post",
            thumbnailWidth: 250,
            maxFilesize: 3.0,
            maxFiles: 1,
            acceptedFiles: ".jpg, .png, .jpeg",
            headers: { "My-Awesome-Header": "header value" },
            addRemoveLinks: true,
            dictDefaultMessage:
                "Seleccione una Imagen de su Dispositivo o Arrastrela Aqui",
            },observacionesAux:"",
            incidenciasAux:"",
            searchResidente:null,
            loadingSearch:false,
            listResidentes: this.listResidentesSelected,
            imagenFirma:{urlOrigen: this.incidencia.firma.urlfirma,
                        modificar:{estado:false,file:{}}}
      }
    },watch:{
        async searchResidente(value){
         if(value == null || value.trim() == ""){
            return ;
          }
          this.loadingSearch = true;
          await axios.get("/residente/nombre/"+value)
                .then((res) => {
                    let residenteMap = res.data.map(
                      (res)=>{
                        return this.convertItemToResidente(res);
                      });      
                    this.listResidentes = residenteMap;
                    this.loadingSearch = false;
                  }).catch((error)=> {
                    console.error(error);
                  });
        }
    },created(){
    },methods:{
        ...mapMutations(["replaceIncidencia"]),
        convertItemToResidente(item){
              return {
                residente: item.nombre+" "+item.apellido,
                id:item.id,
                numeroDocumento: item.numeroDocumento
              }
        },mounteddropzone(){
          console.log("hola");
            var file = { size: 123, name: "Firma del Documento", type: "image/jpg" };
            this.$refs.myVueDropzone.manuallyAddFile(file, this.incidencia.firma.urlfirma,null,null,true);
          },
        clearAfterSelect(){
          this.searchResidente = "";
        },
        afterRemoved(file, error, xhr) {
          this.imagenFirma.modificar.estado = true;
          this.imagenFirma.modificar.file = {};
        },
        afterSuccess(file, response) {
          this.imagenFirma.modificar.estado = true;
          this.imagenFirma.modificar.file = file;
          console.log(this.imagenFirma.modificar.file);
        },
        eliminar (item) {
            const index = this.incidencia.residentes.indexOf(item.id);
            if (index >= 0) this.incidencia.residentes.splice(index, 1);
        }, 
        addObservacion() {
           this.$v.observacionesAux.$touch();
            if (this.observacionesAux != "" && !this.$v.observacionesAux.$invalid) {
                this.incidencia.observaciones.push(this.observacionesAux);
                this.observacionesAux = "";
                this.$v.observacionesAux.$reset();
            }
        },addSubIncidencia() {
          this.$v.incidenciasAux.$touch();
            if (this.incidenciasAux != "" && !this.$v.incidenciasAux.$invalid) {
                this.incidencia.incidencias.push(this.incidenciasAux);
                this.incidenciasAux = "";
                this.$v.incidenciasAux.$reset();
            }
        },deleteItemObservacion(index) {
            this.incidencia.observaciones.splice(index, 1);
        },deleteItemIncidencia(index) {
            this.incidencia.incidencias.splice(index, 1);
        },async modificarIncidencia(){
          this.$v.incidencia.$touch();
          if(this.$v.incidencia.$invalid || this.errorFirma == true){
              await this.mensaje(
                "error",
                "..Oops",
                "Se encontraron errores en el formulario",
                "<strong>Verifique los campos Ingresados<strong>"
              );
          }else{
            var incidenciaPUT = this.incidencia;
            incidenciaPUT.firma.urlfirma = 
                  this.imagenFirma.modificar.estado==true?
                  await this.modificaFirma():
                  this.imagenFirma.urlOrigen;
            var fecha = new Date(this.incidencia.fecha);
            fecha.setHours(this.incidencia.hora.split(":")[0]);
            fecha.setMinutes(this.incidencia.hora.split(":")[1]);
            incidenciaPUT["fecha"] = fecha.toISOString();
            //this.incidencia.usuario = this.user.id;
            await axios
              .put("/incidencia",incidenciaPUT)
              .then((res) =>{
                 this.replaceIncidencia(res.data);
                 this.cerrarDialogo();
              }).catch(err => console.log(err));
               await this.mensaje(
                  "success",
                  "listo",
                  "Usuario modificado Satisfactoriamente",
                  "<strong>Se redirigira a la Interfaz de Gestion<strong>"
                );
          }
        },async modificaFirma(){
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
          this.step = 1;
          this.$emit("close-dialog-edit-incidencia");
          this.reiniciarCampos();
          this.reiniciarValidaciones();
        },async mensaje(icono, titulo, texto, footer) {
            await this.$swal({
              icon: icono,
              title: titulo,
              text: texto,
              footer: footer,
            });
          },reiniciarValidaciones(){
              this.$v.incidencia.$reset();
              this.$v.observacionesAux.$reset();
              this.$v.incidenciasAux.$reset();
          },reiniciarCampos(){
              this.$refs.myVueDropzone.removeAllFiles();
              this.observacionesAux = "";
              this.incidenciasAux="";
          }
    },computed:{
      //Validacion de Titulo
        ...mapState(["incidencias"]),
         ...mapGetters(["user"]),
         errorTitulo() {
          const errors = [];
          if (!this.$v.incidencia.titulo.$dirty) return errors;
          !this.$v.incidencia.titulo.required &&
            errors.push("Debe ingresar un Titulo Obligatoriamente");
          !this.$v.incidencia.titulo.minLength &&
            errors.push("El Titulo debe tener al menos 5 caracteres");
          !this.$v.incidencia.titulo.maxLength &&
            errors.push("El Titulo debe tener 30 caracteres como maximo");
          return errors;
        },
      //Validacion de Descripcion
        errorDescripcion() {
          const errors = [];
          if (!this.$v.incidencia.descripcion.$dirty) return errors;
          !this.$v.incidencia.descripcion.required &&
            errors.push("Debe ingresar una Descripcion Obligatoriamente");
          !this.$v.incidencia.descripcion.minLength &&
            errors.push("La Descripcion debe tener al menos 5 caracteres");
            !this.$v.incidencia.descripcion.maxLength &&
            errors.push("La Descripcion debe tener 1000 caracteres como maximo");
          return errors;
        },
      //Validacion de Fecha
      errorFecha() {
        const errors = [];
        if (!this.$v.incidencia.fecha.$dirty) return errors;
        !this.$v.incidencia.fecha.required &&
          errors.push("Debe Ingresar una Fecha Obligatoriamente");
       //validacion personalizada de la fecha
        var dateselected = moment(this.incidencia.fecha);
        var maxdate = moment();

        //comparando si la fecha es igual o menor a la actual
        (dateselected.isAfter(maxdate)) &&
          errors.push("La Fecha seleccionada debe ser igual o anterior a la actual");

        //comparando si la fecha es mayor a la fecha actual menos 30 dias
        //la fecha no puedes ser muy anterior a la actual
        (dateselected.isBefore(maxdate.subtract(30, 'days')))
        && errors.push("La Fecha seleccionada debe ser de hace 30 dias como maximo");
        return errors;
      },//Validacion de Hora
      errorHora() {
        const errors = [];
        if (!this.$v.incidencia.hora.$dirty) return errors;
        !this.$v.incidencia.hora.required &&
          errors.push("Debe Ingresar una Hora Obligatoriamente");
        return errors;
      },
      errorFirma() {
        if(this.imagenFirma.modificar.estado == true &&
        Object.entries(this.imagenFirma.modificar.file).length === 0){return true}
         else {return false}
      },

      errorResidente() {
        const errors = [];
        if (!this.$v.incidencia.residentes.$dirty) return errors;
        !this.$v.incidencia.residentes.required &&
          errors.push("Debe Ingresar al menos 1 residente");
        return errors;
      },
      //Validacion de Observacion para el campo de texto
      errorObservacionAux(){
        const errors = [];
        if (!this.$v.observacionesAux.$dirty) return errors;
        !this.$v.observacionesAux.required &&
          errors.push("Debe Ingresar una Observacion Obligatoriamente");
        !this.$v.observacionesAux.minLength &&
          errors.push("La Observacion debe tener al menos 5 caracteres");
        !this.$v.observacionesAux.maxLength &&
          errors.push("La Observacion debe tener 400 caracteres como maximo");
        return errors;
      },
      //Validacion de Incidencia para el campo de texto
      errorIncidenciaAux(){
        const errors = [];
        if (!this.$v.incidenciasAux.$dirty) return errors;
        !this.$v.incidenciasAux.required &&
          errors.push("Debe Ingresar una Incidencia Obligatoriamente");
        !this.$v.incidenciasAux.minLength &&
          errors.push("La Incidencia debe tener al menos 5 caracteres");
        !this.$v.incidenciasAux.maxLength &&
          errors.push("La Incidencia debe tener 400 caracteres como maximo");
        return errors;
      },
      errorObservaciones() {
      return this.$v.incidencia.observaciones.required == false &&
        this.$v.incidencia.observaciones.$dirty == true
        ? true
        : false;
      },
      errorIncidencias() {
      return this.$v.incidencia.incidencias.required == false &&
        this.$v.incidencia.incidencias.$dirty == true
        ? true
        : false;
      },
    },filters:{
        avatarResidente: (residente)=>{
            return residente.substring(0, 2);
        },numeracionListaString: (index, etiqueta)=>{
           return `${etiqueta} ${++index}: `;
        },extencionString: (cadena)=>{
          return cadena.length > 35? `${cadena.substring(0,34)}...` : cadena;
        }
    },validations(){
        return {
           incidencia: {
              titulo:{
                 required,
                 minLength: minLength(5),
                 maxLength: maxLength(30)
              },descripcion:{
                  required,
                 minLength: minLength(5),
                 maxLength: maxLength(1000)
              },observaciones:{
                required,
                $each:{
                  required,
                  $each:{
                    required,
                    minLength: minLength(5),
                    maxLength: maxLength(400)
                  }
                }
              },incidencias:{
                  required,
                  $each:{
                    required,
                    minLength: minLength(5),
                    maxLength: maxLength(400)
                  }
              },residentes:{
                  required
              },fecha:{
                  required
              },hora:{
                required
              }
           },
           observacionesAux:{
            required,
            minLength: minLength(5),
            maxLength: maxLength(400)
           },
           incidenciasAux:{
            required,
            minLength: minLength(5),
            maxLength: maxLength(400)
           }
        }
    }
}
</script>
<style >
    .text-size{
        font-size: 1rem;
    }
    .text-size-selected{
        font-size: 0.9rem;
    }
    .item-list{
        border: 2.5px solid #bbb;
        border-radius: 5px;
        margin-top: 5px;
        margin: 5px 7px 0px 7px;
    }
    .subcard{
      padding: 10px;
    }
    .error-card{
      border-radius: 0px 0px 7px 7px;
    }
</style>