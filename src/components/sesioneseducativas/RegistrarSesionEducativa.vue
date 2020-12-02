<template>
  <v-card>
    <v-card-title class="justify-center">Registro de Sesion de Educativa</v-card-title>
    <v-card>
      <v-stepper v-model="step">
        <v-stepper-header>
          <v-stepper-step :complete="step > 1" step="1">
            Registro de Sesion
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="2">
            Agregar participantes
            <small>(Opcional)</small>
          </v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content step="1">
            <div class="container-user">
              <form>
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="sesioneducativa.titulo"
                      label="Titulo de Sesion"
                      color="#009900"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="sesioneducativa.area"
                      label="Area correspondiente"
                      color="#009900"
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
                      color="#009900"
                      prepend-icon="mdi-calendar"
                      v-bind="attrs"
                      v-on="on"
                      label="Fecha de creación de la Sesion Educativa"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="sesioneducativa.fechaCreacion"
                    @input="menu2 = false"
                    locale="es-es"
                  ></v-date-picker>
                </v-menu>
                <v-btn @click="step=2" style="margin-top:1%" dark color="blue">
                  <v-icon left>mdi-plus</v-icon>
                  <span>Agregar Participantes</span>
                </v-btn>
              </form>
            </div>
          </v-stepper-content>
          <v-stepper-content step="2">
            <v-card>
              <v-card-title class="justify-center">Registro de Sesion Educativa</v-card-title>
              <v-card >
                <form>
                  <v-row>
                    <v-col cols="7">
                      <v-row no-gutters>
                        <v-col cols="5">
                          <v-select
                            style="margin-top:3%;margin-right:6%"
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
                        <v-col cols="7">
                          <v-autocomplete
                            style="margin-top:2%"
                            :items="residentes"
                            v-model="ParticipanteSesion.idparticipante"
                            filled
                            chips
                            dense
                            outlined
                            color="#009900"
                            label="Seleccione un Residente"
                            :item-text="select.value"
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
                                {{ data.item.nombre }} {{ data.item.apellido }} 
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
                        </v-col>
                      </v-row>
                      <v-text-field
                        v-model="ParticipanteSesion.grado"
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
                    <v-row no-gutters>
                      <v-col :cols="11" align="center">
                        <div>
                          <vue-dropzone
                            style="max-width:100%;max-height: 100%;padding:0%"
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
                  <v-btn style="margin-bottom:2%" block @click="agregarParticipante()" dark color="blue">
                    <v-icon left>mdi-plus</v-icon>
                    <span >Agregar Participante</span>
                  </v-btn>
                  <v-card v-if="sesioneducativa.contenido.participantes.length!=0" outlined elevation="1" color="#F0F0F0">
                    <v-card-title>Participantes Agregados</v-card-title>
                    <v-card  elevation="0" style="padding:0% 2%;margin-bottom:2%" color="#F0F0F0">
                      <v-expansion-panels focusable>
                        <v-expansion-panel
                          v-for="(item,i) in sesioneducativa.contenido.participantes"
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
                            <v-btn
                              style="margin-left:2%"
                              dark
                              color="red"
                              @click="eliminarParticipante(encontrarResidentePorId(item.idparticipante),item.idparticipante)"
                            >
                              <v-icon dark>
                                mdi-delete
                              </v-icon>
                              <span style="margin-left:2%">Quitar Participante</span>
                            </v-btn>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                        <p style="color:grey;margin-top:2%;margin-bottom:0%" >Encontrados: {{sesioneducativa.contenido.participantes.length}}</p>
                      </v-expansion-panels>
                    </v-card>
                  </v-card>
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
          </v-stepper-content>
          <v-card-actions style="padding:1% 3%">
            <v-row>
              <v-col cols="6">
                <v-btn @click="registrarResidente()" block color="success">
                  <v-icon left>done</v-icon>
                  <span>Registrar</span>
                </v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn block @click="cerrarTodo()" color="primary">
                  <v-icon left>mdi-close-outline</v-icon>
                  <span>Cancelar</span>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-stepper-items>
      </v-stepper>
    </v-card>
  </v-card>
</template>

<script>
import axios from "axios";
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import { mapMutations, mapState, mapGetters } from "vuex";
import { required, minLength, email, helpers } from "vuelidate/lib/validators";
export default {
  name:"RegistrarSesionEducativa",
  props:["visible","dialogoregistro"],
  components: {
    vueDropzone: vue2Dropzone,
  },
  data(){
    return{
      select: { value: "1", text: "Nombre" },
      items: [
        { value: "nombre", text: 'Nombre'},
        { value: "apellido", text: 'Apellido'},
        { value: "numeroDocumento", text: 'Numero Documento'},
      ],
      datemenu:false,
      datemenu2:false,
      dialogVistaPreviaFirma:false,
      imagen:"",
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
      residenteArray:[],
      sesioneducativa:{
        titulo:"",
        idCreador: "",
        fechaCreacion:"",
        area:"",
        contenido:{
          participantes:[]
        },
        tipo:"Sesion Educativa", //Tipo por defecto
      },
      ParticipanteSesion:{
        idparticipante:"",
        grado:"",
        fecha:"",
        firma:"",
        observaciones:"",
        datemenu2:false,
      },
      step:1,
      datemenu: false,
    }
  },
  watch:{
    dialogoregistro: async function(dialogoregistro){
      if(dialogoregistro){
        this.residenteArray = this.residentes;
        console.log("Residentes filtrados finales")
        console.log(this.residentes);
      }
    }
  },
  methods:{
    ...mapMutations(["setResidentes","addSesionesEducativas"]),
    limpiar(){
      this.sesioneducativa.titulo="";
      this.sesioneducativa.area="";
      this.sesioneducativa.fechaCreacion="";
      this.sesioneducativa.contenido.participantes=[];
      this.step=1
    },
    ...mapMutations(["replaceSesionesEducativas"]),
    afterSuccess(file, response) {
      this.ParticipanteSesion.firma = file.dataURL.split(",")[1];
      console.log("this.ParticipanteSesion.firma LLENADO");
    },
    afterRemoved(file, error, xhr) {
      this.ParticipanteSesion.firma = "";
    },
    agregarParticipante(){
      this.sesioneducativa.contenido.participantes.push(this.ParticipanteSesion);
      this.ParticipanteSesion = this.limpiarParticipanteAgregado();
      this.$refs.myVueDropzone.removeAllFiles();
      this.filtrarParticipantesInterno()
      console.log("Residentes filtrados finales")
      console.log(this.residentes);
      
    },
    eliminarParticipante(item, id){
      var index =  this.sesioneducativa.contenido.participantes.findIndex(function(o){
        return o.idparticipante === id;
      })
      if (index !== -1) { 
        this.sesioneducativa.contenido.participantes.splice(index, 1);
        this.residentes.push(item);
      }
      console.log("Residentes filtrados finales")
      console.log(this.residentes);
    },
    verFirma(id) {
      this.sesioneducativa.contenido.participantes.forEach((part)=>{
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
      this.residenteArray.forEach((residente)=>{
        if(residente.id === id){
          //LOS RETURN DENTRO DE UN FOREACH NO FUNCIONAN :D
          nombreCompletoResidente = residente.nombre + ' ' + residente.apellido;
        }
      })
      return nombreCompletoResidente;

    },
    encontrarResidentePorId(id){
      var residenteObject = {};
      this.residenteArray.forEach((residente)=>{
        if(residente.id === id){
          //LOS RETURN DENTRO DE UN FOREACH NO FUNCIONAN :D
          residenteObject = {
            id: residente.id,
            nombre: residente.nombre,
            apellido: residente.apellido,
            numeroDocumento: residente.numeroDocumento
          }
        }
      })
      return residenteObject;
    },
    filtrarParticipantesInterno(){
      var arrayResidente=this.residentes;
      var arrayParticipante=this.sesioneducativa.contenido.participantes;

      var retorno = arrayResidente.filter(comparer(arrayParticipante));
      function comparer(participantes){
        return function(residente){
          return participantes.filter(function(participante){
            return participante.idparticipante == residente.id
          }).length == 0;
        }
      }
      console.log("Filtrados:");
      console.log(retorno);
      this.setResidentes(retorno);
    },
    /*
    //Funcion para cerrar solo el presente modal.
    //No utilizado
    cerrarModal() {
      this.show = false;
      this.limpiar();
    },*/
    cerrarTodo() {
      this.$emit("close-dialog-dontsave");
      this.limpiar();
      this.ParticipanteSesion = this.limpiarParticipanteAgregado();
      this.show = false
    },
    fechaActual(){
      //Retorna la fecha actual en formato YYYY/MM/DD
      //No se está usando
      var f = new Date();
      return f.getFullYear() + "/" + (f.getMonth() +1) + "/"+ f.getDate();
    },
    async obtenerResidentes() {
      await axios
        .get("/residente/all")
        .then((res) => {
          var info = {};
          info = res.data;
          for (var x=0;x<res.data.length;x++){
              info[x].fechaIngreso = res.data[x].fechaIngreso.split("T")[0];
          }
          
          this.setResidentes(info);
          console.log("infooo");
          console.log(info);
        })
        .catch((err) => console.log(err));
    },
    async registrarResidente() {
      await axios
        .post("/SesionesEducativas", this.sesioneducativa)
        .then((res) => {
          var info ={
            id: res.data.id,
            titulo: res.data.titulo,
            fechaCreacion: res.data.fechaCreacion.split("T")[0],
            area: res.data.area,
            tipo: res.data.tipo,
            idCreador: res.data.idCreador
          }
          this.addSesionesEducativas(info);
          this.limpiar();
          this.cerrarTodo();
        })
        .catch((err) => console.log(err));
    },
  },
  computed:{
    ...mapState(["residentes"]),
    ...mapGetters(["user"]),
    show: {
      get() {
        return this.visible;
      },
      set(value) {
        if (!value) {
          this.$emit("close");
        }
      },
    },
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
  async created(){
    await this.obtenerResidentes();
    console.log("Residentes filtrados finales")
    console.log(this.residentes);
    this.residenteArray = this.residentes;
    this.sesioneducativa.idCreador = this.user.id;
  }
}
</script>

<style>

</style>