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
                      :readonly="!edicion"
                      color="#009900"
                      label="Titulo de Sesión"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="sesioneducativa.area"
                      :readonly="!edicion"
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
                      style="margin-top_5px"
                      :readonly="!edicion"
                      color="#009900"
                      prepend-icon="mdi-calendar"
                      v-bind="attrs"
                      v-on="on"
                      label="Fecha de Realización de Sesion de Aprendizaje"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="sesioneducativa.fechaCreacion"
                    :readonly="!edicion"
                    @input="menu2 = false"
                    locale="es-es"
                  ></v-date-picker>
                </v-menu>
              </form>
            </div>
            <v-card-actions v-if="!edicion">
              <v-btn @click="activarEdicionSesionEducativa()" color="warning">
                <v-icon left>mdi-book-outline</v-icon>
                <span>Modificar</span>
              </v-btn>
            </v-card-actions >
            <v-card-actions v-else>
              <v-btn @click="step=2" color="success">
                <v-icon left>mdi-page-next-outline</v-icon>
                <span>Continuar</span>
              </v-btn>
              <v-btn @click="CancelarEdicionSesionEducativa()"  dark color="red">
                <span>Cancelar</span>
              </v-btn>
            </v-card-actions>
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
                            style="margin-top_5px"
                            :readonly="!edicion"
                            color="#009900"
                            label="Grado"
                        ></v-text-field>
                        <v-menu
                          v-model="datemenu2"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="item.fecha"
                              style="margin-top_5px"
                              :readonly="!edicion"
                              color="#009900"
                              prepend-icon="mdi-calendar"
                              v-bind="attrs"
                              v-on="on"
                              label="Fecha de asistencia"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="item.fecha"
                            :readonly="!edicion"
                            @input="menu2 = false"
                            locale="es-es"
                          ></v-date-picker>
                        </v-menu>
                        <!-- empieza firmas -->
                        <v-card
                          style="margin-top:30px;padding:5px 5px;background-color:#EAEAEA"
                        >
                          <v-btn
                            small
                            dark
                            color="green"
                            @click="agregarFirma(item.idparticipante)"
                          >
                            <span v-if="item.firma!=''">Cambiar Firma</span>
                            <span v-else>Añadir Firma</span>
                          </v-btn>
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
                                    {{ item.datosresidente.nombre }} {{ item.datosresidente.apellido }}</span
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
                                      @click="verFirma(item.idparticipante)"
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
                                    @click="eliminarFirma(item.idparticipante)"
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
                        <!-- acaba firmas -->

                        <v-text-field
                            v-model="item.firma"
                            style="margin-top_5px"
                            :readonly="!edicion"
                            color="#009900"
                            label="Firma (enlace)"
                        ></v-text-field>
                        <v-text-field
                            v-model="item.observaciones"
                            style="margin-top_5px"
                            :readonly="!edicion"
                            color="#009900"
                            label="Observaciones"
                        ></v-text-field>
                        <v-card-actions v-if="edicion" align="right">
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
            <v-card-actions v-if="!edicion" style="margin-top:2%">
              <v-btn @click="activarEdicionSesionEducativa()" color="warning">
                <v-icon left>mdi-book-outline</v-icon>
                <span>Modificar</span>
              </v-btn>
            </v-card-actions >
            <v-card-actions v-else style="margin-top:2%">
              <v-btn @click="GuardarEdicionSesionEducativa()" color="success">
                <v-icon left>mdi-page-next-outline</v-icon>
                <span>Guardar</span>
              </v-btn>
              <v-btn @click="CancelarEdicionSesionEducativa()"  dark color="red">
                <span>Cancelar</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-stepper-content>  
        <v-spacer></v-spacer>
        <v-card-actions style="padding:2% 3%">
          <v-btn :disabled="edicion" block color="red"  :dark="!edicion" @click="cerrarDialogo()">
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-stepper-items>
    </v-stepper>
  </v-card>
</template>

<script>
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import { required, minLength, email, helpers } from "vuelidate/lib/validators";
import axios from "axios";
import moment from "moment";
export default {
  name: "DetalleSesionEducativa",
  props: ["sesioneducativa"],
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
      edicion:false,
      botonGuardarSesionEducativa:false,
      step:1,
      dialogVistaPreviaFirma:false,
      imagen:"",
      datemenu: false,
      datemenu2: false,
      datoSesion:{},
      sesioneducativaMod:{
        titulo:"",
        idCreador:"",
        fechaCreacion: new Date(),
        area:"",
        contenido:{
          participantes:[]
        },
        tipo: "Sesion Educativa"
      },
      participanteMod:{
        idparticipante:"",
        grado:"",
        fecha: new Date(),
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
        }
    }
  },
  methods:{
    cerrarDialogo() {
      this.$emit("close-dialog-detail");
      this.step=1;
      this.participantesFiltrados = this.datoSesion.contenido.participantes;
      this.select= { value: "1", text: "Nombre" };
      this.search="";
    },
    activarEdicionSesionEducativa(){
      this.edicion = true;
    },
    GuardarEdicionSesionEducativa(){
      this.edicion = false;
      //Petición post para guardar edicion de sesion
    },
    CancelarEdicionSesionEducativa(){
      this.edicion = false;
      //Cancelar edicion de Reforzamiento
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
          //this.$refs.myVueDropzone.removeAllFiles();
          this.urlfirma = "";
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
          console.log(part.firma);
          console.log(part.firma);
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
    },
    afterRemoved2(file, error, xhr) {
      this.urlfirma = "";
    },


    //Obtener datos de una sesión por id
    async obtenerSesionEducativaDTO(idsesion) {
      var user = {};
      await axios
        .get("/SesionesEducativas/allsesiondto/id?id=" + idsesion)
        .then((res) => {
          user = res.data;
          user.fechacreacion = user.fechacreacion.split("T")[0];
          for (var x=0;x<user.contenido.participantes.length;x++){
              user.contenido.participantes[x].fecha = user.contenido.participantes[x].fecha.split("T")[0];
          }
        })
        .catch((err) => console.log(err));
      console.log("Sesion educativa DTO:");
      console.log(user);
      return user;
    },
  },
  async created() {
    this.datoSesion= await this.obtenerSesionEducativaDTO(this.sesioneducativa.id);
    this.participantesFiltrados = await this.datoSesion.contenido.participantes;
    
  }

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