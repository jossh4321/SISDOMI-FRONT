<template>
  <v-card>
    <v-card-title class="justify-center">Promover Residente</v-card-title>
    <v-card style="padding: 15px 20px">
      <div class="container-user">
        <v-expansion-panels focusable>
          <v-expansion-panel no-gutters>
            <v-card style="border: 1px solid #c1c1c1">
              <v-expansion-panel-header>Datos Referenciales del residente</v-expansion-panel-header>
              <v-expansion-panel-content>
                  <form style="margin-top:15px">
                    <v-row  no-gutters>
                      <v-col>
                        <v-text-field 
                          style="margin-left:7%"
                          v-model="residente.nombre"
                          label="Nombres"
                          readonly
                          color="#009900"
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <v-text-field
                          style="margin-left:7%"
                          v-model="residente.apellido"
                          label="Apellidos"
                          readonly
                          color="#009900"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row  no-gutters>
                      <v-col>
                        <v-text-field
                          style="margin-left:7%"
                          v-model="residente.sexo"
                          label="Sexo"
                          readonly
                          color="#009900"
                        ></v-text-field>
                      </v-col>
                      <v-col>
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
                              style="margin-left:7%"
                              v-model="residente.fechaNacimiento"
                              label="Fecha de Nacimiento"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                              color="#009900"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="residente.fechaNacimiento"
                            readonly
                            @input="menu2 = false"
                            locale="es-es"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-col>
                        <v-select
                          style="margin-top:8%;margin-left:7%"
                          :items="['DNI', 'Pasaporte', 'Carnet Extranjeria', 'dni']"
                          label="Tipo de Documento"
                          dense
                          readonly
                          color="#009900"
                          v-model="residente.tipoDocumento"
                        ></v-select>
                      </v-col>
                    </v-row>
                    <v-row no-gutters>
                      <v-col cols="4">
                        <v-text-field
                          style="margin-left:7%"
                          v-model="residente.numeroDocumento"
                          label="Numero de Documento"
                          readonly
                          color="#009900"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="8">
                        <v-text-field
                          style="margin-left:7%"
                          v-model="residente.lugarNacimiento"
                          label="Lugar de Nacimiento"
                          readonly
                          color="#009900"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </form>                   
              </v-expansion-panel-content>
            </v-card>
          </v-expansion-panel>
        </v-expansion-panels>
        <v-card style="padding:1%" elevation="0">
          <form>
            <v-text-field 
              v-model="documentoFase.contenido.observacion"
              style="margin-top:2%"
              label="Observaciones"
              color="#009900"
            ></v-text-field>
            <v-select
              v-model="documentoFase.contenido.nuevafase"
              :items="items"
              label="Tipo de Documento"
              dense
              color="#009900"
            ></v-select>
            <v-card style="margin-top:10px;padding:5px 5px;background-color:#EAEAEA">
              <v-card-actions>Agregar Firma del Residente</v-card-actions>
              <v-row>
                <v-col :cols="12" align="right">
                  <div style="padding:1%">
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
              <v-card-actions>
                <v-btn
                  dark
                  color="blue"
                  @click="verFirma()"
                >
                  <v-icon dark>
                    mdi-draw
                  </v-icon>
                  <span style="margin-left:2%">Visualizar Firma</span>
                </v-btn>
              </v-card-actions>
            </v-card>               
            <v-card-actions style="margin-top:5%">
              <v-btn
                dark
                color="success"
                @click="registrarDocumentoTransicionFase()"
              >
                <span>Registrar</span>
              </v-btn>
              <v-btn
                color="red"
                dark
                @click="cerrarDialogo()"
              >
                Cerrar
              </v-btn>
            </v-card-actions>
          </form>
        </v-card>
      </div>
    </v-card>
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
        <div >
          <v-card-actions >
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click="cerrarVistaPreviaFirma()"
            >
              Cerrar
            </v-btn>
            
          </v-card-actions>
        </div>
      </v-card>
    </v-dialog>

  </v-card>
</template>

<script>
const m = moment();
import axios from "axios";
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import { mapMutations, mapState, mapGetters } from "vuex";
import { required, minLength, email, helpers } from "vuelidate/lib/validators";
import moment from "moment";
export default {
  name: "PromoverResidente",
  props: ["residente"],
  components: {
    vueDropzone: vue2Dropzone,
  },
  data() {
    return {
      items:['Fase 1', 'Fase 2', 'Fase 3'],
      documentoFase:{
        id:"",
        tipo:"Transicion de Fase",
        historialcontenido:[],
        creadordocumento:"",
        fechacreacion: moment().format('L'),
        area:"", // Enviando vacío
        fase:"", // Enviando vacío
        idresidente:"",
        estado:"creado",
        contenido:{
          firma:"",
          observacion:"",
          nuevafase:""
        }
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
      imagen:"",
      dialogVistaPreviaFirma:false,
      dialog: false,
      dialog1: false,
      datemenu: false,
      datemenu: false, ///fecha de nacimiento
      datemenu1: false, ///fecha ingreso
      datemenu2: false, ///MODAL fecha ingreso
      datemenu3: false, ///MODAL fecha finalizacion
      step: 1,
    };
  },
  methods: {
    moment: function () {
    return moment();
    },
    cerrarDialogo() {
      this.$emit("close-dialog-promover");
    },
    convertDateFormat(string) {
        var date = string.split('/');
        return date[2] + '-' + date[1] + '-' + date[0];
    },
    // agregarFirma(id) {
    //   this.documentoFase.contenido.firma = this.urlfirma;
    //   this.urlfirma = "";
    //   this.botonCambiarFirma = true;
    //   this.$refs["myVueDropzone"+id][0].removeAllFiles();
    // },
    // eliminarFirma(id) {
    //   this.participantesFiltrados.forEach((part)=>{
    //     if(part.idparticipante ===id){
    //       part.firma= "";
    //     }
    //   })
    // },
    verFirma(){
      this.imagen = this.documentoFase.contenido.firma;
      console.log("imagen: "  + this.imagen);
      this.dialogVistaPreviaFirma = true;
    },
    cerrarVistaPreviaFirma() {
      this.dialogVistaPreviaFirma = false;
    },
    afterSuccess2(file, response) {
      // this.urlfirma = file.dataURL.split(",")[1];
      // console.log(this.urlfirma);
      this.documentoFase.contenido.firma = file.dataURL.split(",")[1];
      console.log(this.documentoFase.contenido.firma);
      console.log("urlfirma llenada");
      //this.botonCambiarFirma = false;
    },
    afterRemoved2(file, error, xhr) {
      // this.urlfirma = "";
      this.documentoFase.contenido.firma = "";
    },
    limpiar(){
      this.$refs.myVueDropzone.removeAllFiles();
    },
    async registrarDocumentoTransicionFase() {
      this.documentoFase.fechacreacion = this.convertDateFormat(this.documentoFase.fechacreacion)
      this.documentoFase.idresidente = this.residente.id
      this.documentoFase.creadordocumento = this.user.id
      console.log(this.user.id)
      console.log(this.documentoFase.creadordocumento)
      //this.limpiar();
      // await axios
      //   .post("/SesionesEducativas", this.sesioneducativa)
      //   .then((res) => {
      //     var info ={
      //       id: res.data.id,
      //       titulo: res.data.titulo,
      //       contenido:res.data.contenido,
      //       fechaCreacion: res.data.fechaCreacion.split("T")[0],
      //       area: res.data.area,
      //       tipo: res.data.tipo,
      //       idCreador: res.data.idCreador,
      //       datoscreador:{
      //         usuario: this.user.usuario
      //       }
      //     }
      //     console.log("Registrado xd")
      //     console.log(info)
      //     this.addSesionesEducativas(info);
      //     this.limpiar();
      //     this.cerrarTodo();
      //   })
      //   .catch((err) => console.log(err));
      // },
    }
  },
  computed:{
    ...mapGetters(["user"]),
  },
};
</script>

<style scoped>
div.btn__content {
  padding: 0;
}
div.card__actions .btn {
  min-width: 0;
}
</style>
