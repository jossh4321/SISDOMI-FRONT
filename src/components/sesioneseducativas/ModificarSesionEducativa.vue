<template>
  <v-card>
    <v-card-title class="justify-center">Sesiones Educativas</v-card-title>
    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step editable step="1">Datos de la Sesión Educativa</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step editable step="2">Participantes de la Sesión Educativa</v-stepper-step>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content step="1">
          <!--Div que contendrá todos los datos de una sola sesion educativa-->
          <v-card class="container-user">
            <div style="margin-top:5px">
              <form>
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="sesioneducativa.titulo"
                      color="#009900"
                      label="Titulo de Sesión"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="sesioneducativa.area"
                      color="#009900"
                      label="Area correspondiente"
                    ></v-text-field>
                  </v-col>
                </v-row>
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
                      v-model="sesioneducativa.fechaCreacion"
                      style="margin-top:5px"
                      color="#009900"
                      prepend-icon="mdi-calendar"
                      v-bind="attrs"
                      v-on="on"
                      label="Fecha de Realización de Sesion de Aprendizaje"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="sesioneducativa.fechaCreacion"
                    @input="menu = false"
                    locale="es-es"
                  ></v-date-picker>
                </v-menu>
              </form>
            </div>
          </v-card>
        </v-stepper-content>
        <v-stepper-content step="2">
          <v-card>
            <v-row>
              <v-col>
                <v-select
                  v-model="select"
                  :items="items"
                  item-text="text"
                  item-value="value"
                  label="Filtrar por:"
                  return-object
                  outlined
                  dense
                ></v-select> 
              </v-col>
              <v-col>
                <v-text-field
                  v-model="search"
                  label="Buscar..."
                  outlined
                  clearable
                  type="text"
                  dense
                ></v-text-field>
              </v-col>
              <v-col>
                <v-btn @click="filtradoSearch(datoSesion.contenido.participantes, select)" small fab dark color="blue">
                  <v-icon center>mdi-magnify</v-icon>
                </v-btn>
              </v-col>
            </v-row>

            <v-expansion-panels focusable>
              <v-expansion-panel
                v-for="(item,i) in participantesFiltrados"
                :key="i"
              >
                <v-card outlined tile>
                  <v-expansion-panel-header>
                    <v-row no-gutters>
                      <v-col cols="6">
                        <v-avatar left color="#81C3F8" size="24" style="margin-right:8px">
                          <span style="font-size:10px">PR</span>
                        </v-avatar>
                        <span :class="[(select.value==='1') ? 'resaltado' : '']">{{item.datosresidente.nombre + " "}}</span>
                        <span :class="[(select.value==='2') ? 'resaltado' : '']">{{item.datosresidente.apellido}}</span>
                      </v-col>
                      <v-col cols="6">No. Doc:<span :class="[(select.value==='3') ? 'resaltado' : '']">{{" "+ item.datosresidente.numerodocumento}}</span></v-col>
                    </v-row>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <form>
                      <v-card elevation="0">
                        <v-text-field
                            v-model="item.grado"
                            style="margin-top:2%"
                            color="#009900"
                            label="Grado"
                        ></v-text-field>
                        <v-menu
                          v-model="item.datemenu"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="item.fecha"
                              style="margin-top:5px"
                              color="#009900"
                              prepend-icon="mdi-calendar"
                              v-bind="attrs"
                              v-on="on"
                              label="Fecha de asistencia"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="item.fecha"
                            @input="menu2 = false"
                            locale="es-es"
                          ></v-date-picker>
                        </v-menu>
                        <!-- empieza firmas -->
                        <v-card style="margin-top:10px;padding:5px 5px;background-color:#EAEAEA">
                          <v-card-actions>
                            <v-btn
                              :disabled="botonCambiarFirma"
                              :dark="!botonCambiarFirma"
                              color="green"
                              @click="agregarFirma(item.idparticipante)"
                            >
                              <span v-if="item.firma!=''">Cambiar Firma</span>
                              <span v-else>Añadir Firma</span>
                            </v-btn>
                          </v-card-actions>
                          <v-row>
                            <v-col :cols="12" align="right">
                              <div style="padding:1%">
                                <vue-dropzone
                                  :ref="'myVueDropzone'+item.idparticipante"
                                  @vdropzone-success="afterSuccess2"
                                  @vdropzone-removed-file="afterRemoved2"
                                  id="dropzone2"
                                  :options="dropzoneOptions2"
                                >
                                </vue-dropzone>
                              </div>
                            </v-col>
                          </v-row>
                          <v-card-actions>
                            <v-btn
                              dark
                              color="blue"
                              @click="verFirma(item.idparticipante)"
                            >
                              <v-icon dark>
                                mdi-draw
                              </v-icon>
                              <span style="margin-left:2%">Visualizar Firma</span>
                            </v-btn>
                            <v-btn
                              dark
                              color="red"
                              @click="eliminarFirma(item.idparticipante)"
                            >
                              <v-icon dark>
                                mdi-delete
                              </v-icon>
                              <span style="margin-left:2%">Eliminar Firma</span>
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                        <!-- acaba firmas -->
                        <!-- <v-text-field
                            v-model="item.firma"
                            style="margin-top_5px"
                            :readonly="!edicion"
                            color="#009900"
                            label="Firma (enlace)"
                        ></v-text-field> -->
                        <v-text-field
                            v-model="item.observaciones"
                            style="margin-top:3%"
                            color="#009900"
                            label="Observaciones"
                        ></v-text-field>
                        <v-card-actions align="right">
                          <v-row
                            align="center"
                            justify="end"
                          >
                            <v-btn dark color="red">
                              <v-icon left>mdi-delete</v-icon>
                              <span>Eliminar Participante</span>
                            </v-btn>
                          </v-row>
                        </v-card-actions>
                      </v-card>
                    </form>
                  </v-expansion-panel-content>
                </v-card>
              </v-expansion-panel>
              <p style="color:grey;margin-top:2%;margin-bottom:0%" >Encontrados: {{numeroEcontrados(participantesFiltrados)}}</p>
            </v-expansion-panels>
            <v-card-actions style="margin-top:2%">
              <v-btn @click="GuardarEdicionSesionEducativa()" color="success">
                <v-icon left>mdi-page-next-outline</v-icon>
                <span>Guardar</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-stepper-content>  
        <v-spacer></v-spacer>
        <v-card-actions style="padding:2% 3%">
          <v-btn block color="red"  dark @click="cerrarDialogo()">
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-stepper-items>
    </v-stepper>
    <v-dialog
      v-model="dialogVistaPreviaFirma"
      persistent
      max-width="600px"
    >
      <v-card align="center">
        <v-card-title>
          <span class="headline">Vista previa</span>
        </v-card-title >
        <v-card-text v-if="imagen!=''">
          <img
            v-if="imagen.includes('http')"
            width="100%"
            height="100%"
            :src="imagen"
            alt=""
          />
          <img
            v-else
            width="100%"
            height="100%"
            :src="'data:image/jpeg;base64,' + imagen"
            alt=""
          />
        </v-card-text>
        <v-card-text v-else>
          <v-card-text style="font-size:18px">No tiene firma registrada</v-card-text>
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
  </v-card>
</template>

<script>
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import { required, minLength, email, helpers } from "vuelidate/lib/validators";
import axios from "axios";
import moment from "moment";
export default {
  name: "ModificarSesionEducativa",
  props: ["sesioneducativa","datoSesion","dialogomodificar"],
  components: {
    vueDropzone: vue2Dropzone,
  },
  data(){
    return{
      select: { value: "1", text: "Nombre" },
      items: [
        { value: "1", text: 'Nombre'},
        { value: "2", text: 'Apellido'},
        { value: "3", text: 'Numero Documento'},
      ],
      participantesFiltrados: [],
      search:"",
      urlfirma:"",
      botonGuardarSesionEducativa:false,
      botonCambiarFirma:true,
      step:1,
      dialogVistaPreviaFirma:false,
      imagen:"",
      datemenu: false,
      sesioneducativaMod:{
        titulo:"",
        idCreador:"",
        fechaCreacion: "",
        area:"",
        contenido:{
          participantes:[]
        },
        tipo: "Sesion Educativa"
      },
      participanteMod:{
        idparticipante:"",
        grado:"",
        fecha: "",
        firma:"",
        observaciones:""
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
    }
  },
  watch:{
    search: function(search){
      this.filtradoSearch(this.datoSesion.contenido.participantes, search)
      
        
    },
    participantesFiltrados:async function(){
      if(this.numeroEcontrados(this.participantesFiltrados)===0){
        this.participantesFiltrados = await this.datoSesion.contenido.participantes;
        this.participantesFiltrados.forEach((part)=>{
          part.datemenu=false;
        })
      }
    },
    dialogomodificar: async function(dialogomodificar){
      this.participantesFiltrados = await this.datoSesion.contenido.participantes;
      console.log(dialogomodificar)
    }
  },
  methods:{
    cerrarDialogo() {
      this.$emit("close-dialog-edit");
      this.step=1;
      this.participantesFiltrados = [];
      this.select= { value: "1", text: "Nombre" };
      this.search="";
      console.log(this.participantesFiltrados);
    },
    filtradoSearch(array, string){
      if(this.select.value==="1"){
        this.participantesFiltrados = array.filter(partic => partic.datosresidente.nombre.includes(string));
      }
      else if(this.select.value==="2"){
        this.participantesFiltrados = array.filter(partic => partic.datosresidente.apellido.includes(string));
      }
      else if(this.select.value==="3"){
        this.participantesFiltrados = array.filter(partic => partic.datosresidente.numerodocumento.includes(string));
      }
      if(this.participantesFiltrados.length===0){
        console.log("No se encontró al participante")
      }

    },
    numeroEcontrados(array){
      return array.length;
    },

    agregarFirma(id) {
      this.participantesFiltrados.forEach((part)=>{
        if(part.idparticipante ===id){
          part.firma= this.urlfirma;
          this.urlfirma = "";
          this.botonCambiarFirma = true;
          this.$refs["myVueDropzone"+id][0].removeAllFiles();
        }
      })
    },
    eliminarFirma(id) {
      this.participantesFiltrados.forEach((part)=>{
        if(part.idparticipante ===id){
          part.firma= "";
        }
      })
    },
    verFirma(id) {
      this.participantesFiltrados.forEach((part)=>{
        if(part.idparticipante ===id){
          console.log(part.firma);
          this.imagen = part.firma;
          console.log("imagen: "  + this.imagen);
          this.dialogVistaPreviaFirma = true;
        }
      })
    },
    cerrarVistaPreviaFirma() {
      this.dialogVistaPreviaFirma = false;
    },
    afterSuccess2(file, response) {
      this.urlfirma = file.dataURL.split(",")[1];
      console.log(this.urlfirma);
      console.log("urlfirma llenada");
      this.botonCambiarFirma = false;
    },
    afterRemoved2(file, error, xhr) {
      this.urlfirma = "";
    },
  },
  async mounted() {
    this.participantesFiltrados = await this.datoSesion.contenido.participantes;
  },

}
</script>

<style scoped>
.resaltado{
  font-weight: 500;
}
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