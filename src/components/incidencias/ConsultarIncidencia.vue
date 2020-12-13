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
                readonly
                color="#009900"
              ></v-text-field>
                <v-textarea
                v-model="incidencia.descripcion"
                label="Ingrese una descripcion"
                outlined
                auto-grow
                rows="4"
                readonly
                color="#009900"
                row-height="35"
                ></v-textarea>
                  <v-text-field
                    v-model="incidencia.fecha"
                    label="Fecha de lo Ocurrido"
                    prepend-icon="mdi-calendar"
                    readonly
                    color="#009900"
                    outlined
                  ></v-text-field>
                <v-text-field
                        v-model="incidencia.hora"
                        label="Hora de lo ocurrido"
                        prepend-icon="mdi-clock-outline"
                        readonly
                        outlined
                        color="success"
                ></v-text-field>
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
                        <v-card-title>Observaciones Registradas</v-card-title>
                        <v-list flat>
                            <v-list-item
                            v-for="(item, i) in incidencia.observaciones"
                            :key="i" class="item-list"
                            >
                                <v-list-item-icon>
                                <v-icon
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
                        </v-card>
                        <!---->
                        <!--Lista de Incidencias-->
                        <v-card>
                            <v-card-title>Incidencias Registradas</v-card-title>
                            <v-list flat>
                                <v-list-item
                                v-for="(item, i) in incidencia.incidencias"
                                :key="i" class="item-list"
                                >
                                    <v-list-item-icon>
                                    <v-icon
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
                  <v-card> 
                    <v-card-title>
                      Residentes Involucrados
                    </v-card-title>
                    </v-card>
                   <v-slide-group
                      class="pa-4"
                      active-class="success"
                      show-arrows
                    >
                      <v-slide-item
                        v-for="residente in incidencia.residentes"
                        :key="residente.id"
                      >
                        <v-card
                          style="margin:5px;border: 1px solid;color:black"
                          @click="visualizarDetalleUsuario(residente)"
                        >
                          <v-row>
                            <v-col cols="2">
                              <v-avatar color="#ccc" size="27" style="margin:10px">
                                <span >{{ residente.nombre | avatarResidente }}</span>
                              </v-avatar>
                            </v-col>
                            <v-col cols="10">
                              <div style="margin:10px">{{ residente.nombre }} {{residente.apellido}}</div>
                            </v-col>
                          </v-row>
                        </v-card>
                      </v-slide-item>
                    </v-slide-group>
                    <v-dialog v-model="dialogoDetalleResidente" persistent  max-width="650px">

                        <v-card 
                        
                        style="padding-left:15px;padding-right:15px;width:inherit">
                            <v-card-title>Datos del Residente</v-card-title>
                            <v-form>
                                 <v-card-subtitle>Datos Generales</v-card-subtitle>
                                      <v-card
                                    style="margin:10px;border: 1px solid;color:black">
                                      <v-card-subtitle>Nombres y Apellidos: {{residenteDetalle.nombre}}</v-card-subtitle>
                                  </v-card>
                                  <v-card
                                    style="margin:10px;border: 1px solid;color:black">
                                      <v-card-subtitle>Numero de Documento: {{residenteDetalle.numeroDocumento}}</v-card-subtitle>
                                  </v-card>
                                  <v-card
                                    style="margin:10px;border: 1px solid;color:black">
                                      <v-card-subtitle>Lugar de Nacimiento: {{residenteDetalle.lugarNacimiento}}</v-card-subtitle>
                                  </v-card>
                                  <v-card
                                    style="margin:10px;border: 1px solid;color:black">
                                      <v-card-subtitle>Fecha de Nacimiento: {{residenteDetalle.fechaNacimiento | fomatoFecha}}</v-card-subtitle>
                                  </v-card>
                                  <v-card-subtitle>Datos de Ingreso</v-card-subtitle>
                                  <v-card
                                    style="margin:10px;border: 1px solid;color:black">
                                      <v-card-subtitle>Fecha de Ingreso: {{residenteDetalle.fechaIngreso | fomatoFecha}}</v-card-subtitle>
                                  </v-card>
                                  <v-card
                                    style="margin:10px;border: 1px solid;color:black">
                                      <v-card-subtitle>Motivo de Ingreso: {{residenteDetalle.motivoIngreso}}</v-card-subtitle>
                                  </v-card>
                                  <v-card
                                    style="margin:10px;border: 1px solid;color:black">
                                      <v-card-subtitle>Juzgado de Procedencia: {{residenteDetalle.juzgadoProcedencia}}</v-card-subtitle>
                                  </v-card>
                                  <v-divider class="divider-custom"></v-divider>
                                  <v-row style="margin:10px">
                                    <v-col cols="12">
                                      <v-btn block @click="dialogoDetalleResidente=false" color="primary"
                                              >
                                          <v-icon left>mdi-close-outline</v-icon>
                                          <span>Cerrar</span>
                                        </v-btn>
                                    </v-col>
                                  </v-row>
                            </v-form>
                        </v-card>
                    </v-dialog>
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
                                    label="Cargo del Autor"
                                    outlined
                                    color="info"
                                    readonly
                                  ></v-text-field>
                               </v-card>
                        </v-card>
                        <div style="margin-top:10px">
                          <vue-dropzone
                            ref="myVueDropzone"
                            @vdropzone-mounted="mounteddropzone"
                            id="dropzone"
                            :options="dropzoneOptions"
                          >
                          </vue-dropzone>
                        </div>
                         <v-divider class="divider-custom"></v-divider>
                          <v-row>
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
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import { mapMutations, mapState, mapGetters} from "vuex";
import moment from "moment";
export default {
   components: {
    vueDropzone: vue2Dropzone,
    },props:["incidencia"],
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
            addRemoveLinks: false,
            dictDefaultMessage:
                "Seleccione una Imagen de su Dispositivo o Arrastrela Aqui",
            },observacionesAux:"",
            incidenciasAux:"",
            residenteDetalle:"",
            dialogoDetalleResidente:false
      }
    },watch:{
    },created(){
    },methods:{
        ...mapMutations(["replaceIncidencia"]),
        mounteddropzone(){
          console.log("hola");
            var file = { size: 123, name: "Firma del Documento", type: "image/jpg" };
            this.$refs.myVueDropzone.manuallyAddFile(file, this.incidencia.firma.urlfirma,null,null,true);
          },cerrarDialogo(){
          this.$refs.myVueDropzone.removeAllFiles();
           this.step = 1;
          this.$emit("close-dialog-edit-incidencia");
        },visualizarDetalleUsuario(residente){
            this.residenteDetalle = residente;
            this.dialogoDetalleResidente = true;
        }
    },computed:{
      //Validacion de Titulo
        ...mapState(["incidencias"]),
        ...mapGetters(["user"])
    },filters:{
        avatarResidente: (residente)=>{
            return residente.substring(0, 2);
        },numeracionListaString: (index, etiqueta)=>{
           return `${etiqueta} ${++index}: `;
        },extencionString: (cadena)=>{
          return cadena.length > 35? `${cadena.substring(0,34)}...` : cadena;
        },fomatoFecha: (fecha) =>{
            var formato = moment(fecha);
            return formato.format("llll");
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