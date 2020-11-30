<template>
  <v-card>
    <v-card-title class="justify-center">Registro de Sesion Educativa</v-card-title>
    <v-card style="padding: 15px 20px">
      <form>
        <v-row>
          <v-col cols="7">
            <v-autocomplete
              style="margin-top:2%"
              :items="listaresidentes"
              v-model="ParticipanteSesion.idparticipante"
              filled
              chips
              dense
              outlined
              color="#009900"
              label="Seleccione un Residente"
              item-text="nombre"
              item-value="id"
              @input="$v.ParticipanteSesion.idparticipante.$touch()"
              @blur="$v.ParticipanteSesion.idparticipante.$touch()"
              :error-messages="errorResidente"
            >
              <template v-slot:selection="data">
                <v-chip
                  v-bind="data.attrs"
                  :input-value="data.selected"
                  style="margin-top:5px"
                >
                  <v-avatar left color="#b3b3ff" size="24">
                    <span style="font-size:12px">RT</span>
                  </v-avatar>
                  {{ data.item.nombre }}
                </v-chip>
              </template>
              <template v-slot:item="data">
                <template>
                  <v-list-item-avatar>
                    <v-avatar left color="#b3b3ff" size="24">
                      <span style="font-size:12px">RE</span>
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
              v-model="ParticipanteSesion.grado"
              color="#009900"
              label="Grado"
            ></v-text-field>
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
                  v-model="ParticipanteSesion.fecha"
                  style="margin-top:5px"
                  color="#009900"
                  prepend-icon="mdi-calendar"
                  v-bind="attrs"
                  v-on="on"
                  label="Fecha de Realización de Sesion de Aprendizaje"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="ParticipanteSesion.fecha"
                @input="menu = false"
                locale="es-es"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="5">
          <v-row>
            <v-col :cols="11" align="center">
              <div>
                <vue-dropzone
                  style="max-width:90%;max-height: 80%;padding:0%"
                  ref="myVueDropzone"
                  @vdropzone-success="afterSuccess"
                  @vdropzone-removed-file="afterRemoved"
                  id="dropzone2"
                  :options="dropzoneOptions"
                >
                </vue-dropzone>
              </div>
            </v-col>
          </v-row>
          </v-col>
        </v-row>
        <v-text-field
          v-model="ParticipanteSesion.observaciones"
          color="#009900"
          label="Observaciones"
        ></v-text-field>
        <v-btn style="margin-bottom:2%" block @click="agregarParticipante()" color="success">
          <v-icon left>mdi-plus</v-icon>
          <span >Agregar Participante</span>
        </v-btn>
        <v-card v-if="participantes.length!=0" outlined elevation="1" color="#F0F0F0">
          <v-card-title>Participantes Agregados</v-card-title>
          <v-card  elevation="0" style="padding:0% 2%;margin-bottom:2%" color="#F0F0F0">
            <v-expansion-panels focusable>
              <v-expansion-panel
                v-for="(item,i) in participantes"
                :key="i"
              >
                <v-expansion-panel-header>{{encontrarNombrePorId(item.idparticipante)}}</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-text-field
                    style="margin-top:20px;"
                    v-model="item.grado"
                    color="#009900"
                    label="Grado"
                  ></v-text-field>
                  <v-menu
                    v-model="item.datemenu2"
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
                        label="Fecha de Realización de Sesion de Aprendizaje"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="item.fecha"
                      @input="menu2 = false"
                      locale="es-es"
                    ></v-date-picker>
                  </v-menu>
                  <v-text-field
                    v-model="item.observaciones"
                    color="#009900"
                    label="Observaciones"
                  ></v-text-field>
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
                </v-expansion-panel-content>
              </v-expansion-panel>
              <p style="color:grey;margin-top:2%;margin-bottom:0%" >Encontrados: {{participantes.length}}</p>
            </v-expansion-panels>
          </v-card>
        </v-card>
        <v-row>
          <v-col>
            <v-btn block @click="cerrarDialogo()" color="primary">
              <v-icon left>mdi-close-outline</v-icon>
              <span>Cerrar</span>
            </v-btn>
          </v-col>
          <v-col>
            <v-btn @click="modificarSesionEducativa()" block color="success">
              <v-icon left>done</v-icon>
              <span>Guardar Participantes agregados</span>
            </v-btn>
          </v-col>
        </v-row>
      </form>
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
  </v-card>
</template>

<script>
import axios from "axios";
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import { mapMutations, mapState } from "vuex";
import { required, minLength, email, helpers } from "vuelidate/lib/validators";
export default {
  props:["sesioneducativa","listaresidentes"],
  components: {
    vueDropzone: vue2Dropzone,
  },
  data() {
    return{
      datemenu:false,
      dialogVistaPreviaFirma:false,
      imagen:"",
      residente:{},
      participantes:[],
      ParticipanteSesion:{
        idparticipante:"",
        grado:"",
        fecha:"",
        firma:"",
        observaciones:"",
        datemenu2:false,
      },
      dropzoneOptions: {
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
  methods:{
    ...mapMutations(["replaceSesionesEducativas"]),
    cerrarDialogo() {
      this.$emit("close-dialog-participantes");
    },
    afterSuccess(file, response) {
      this.ParticipanteSesion.firma = file.dataURL.split(",")[1];
      console.log(this.ParticipanteSesion.firma);
      console.log("this.ParticipanteSesion.firma LLENADO");
    },
    afterRemoved(file, error, xhr) {
      this.ParticipanteSesion.firma = "";
    },
    agregarParticipante(){
      this.participantes.push(this.ParticipanteSesion);
      this.ParticipanteSesion = this.limpiarParticipanteAgregado();
      this.$refs.myVueDropzone.removeAllFiles();
    },
    verFirma(id) {
      this.participantes.forEach((part)=>{
        if(part.idparticipante ===id){
          // console.log(part.firma);
          this.imagen = part.firma;
          console.log("imagen: "  + this.imagen);
          this.dialogVistaPreviaFirma = true;
        }
      })
    },
    cerrarVistaPreviaFirma() {
      this.dialogVistaPreviaFirma = false;
    },
    limpiarParticipanteAgregado(){
      return{
        idparticipante:"",
        grado:"",
        fecha:"",
        firma:"",
        observaciones:"",
        datemenu2:false,
      }
    },
    encontrarNombrePorId(id){
      var nombreCompletoResidente = "";
      this.listaresidentes.forEach((residente)=>{
        if(residente.id === id){
          //LOS RETURN DENTRO DE UN FOREACH NO FUNCIONAN :D
          nombreCompletoResidente = residente.nombre + ' ' + residente.apellido;
        }
      })
      return nombreCompletoResidente;

    },
    async modificarSesionEducativa(){
      let participanteSemiListo = this.participantes.map(function(res){
        return {
            idparticipante:res.idparticipante,
            grado:res.grado,
            fecha:res.fecha,
            firma:res.firma,
            observaciones:res.observaciones,
        }
      });
      console.log(participanteSemiListo)
      console.log(this.sesioneducativa.contenido.participantes)
      this.sesioneducativa.contenido.participantes = this.sesioneducativa.contenido.participantes.concat(participanteSemiListo);
      console.log(this.sesioneducativa);
      var info = "";
      await axios
        .put("/SesionesEducativas", this.sesioneducativa)
        .then((res) => {
          info = res.data
          this.replaceSesionesEducativas(info);
          this.cerrarDialogo();
        })
        .catch((err) => {console.log(info);console.log(err)});
    },
  },
  computed:{
    errorResidente() {
      const errors = [];
      if (!this.$v.ParticipanteSesion.idparticipante.$dirty) return errors;
      !this.$v.ParticipanteSesion.idparticipante.required &&
        errors.push("Debe seleccionar un residente obligatoriamente");
      return errors;
    },
  },
  validations(){
    return{
      ParticipanteSesion:{
        idparticipante: {
          required,
        }
      },
    }
  },
  created(){
    console.log("Componente Participante creado")
  }
}
</script>

<style>
.v-application .primary--text{
    color: var(--v-success-darken1) !important;
    caret-color: var(--v-success-lighten1) !important;
}
</style>