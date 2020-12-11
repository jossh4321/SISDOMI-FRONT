<template>
  <v-card>
    <v-card-title class="justify-center">Agregar Participantes</v-card-title>
    <v-card style="padding: 15px 20px">
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
                      {{ data.item.nombre }} {{data.item.apellido}}
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
              @input="$v.ParticipanteSesion.grado.$touch()"
              @blur="$v.ParticipanteSesion.grado.$touch()"
              :error-messages="errorGrado"
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
                  @input="$v.ParticipanteSesion.fecha.$touch()"
                  @blur="$v.ParticipanteSesion.fecha.$touch()"
                  :error-messages="errorFechaRealizacion"
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
          @input="$v.ParticipanteSesion.observaciones.$touch()"
          @blur="$v.ParticipanteSesion.observaciones.$touch()"
          :error-messages="errorObservaciones"
        ></v-text-field>
        <v-btn style="margin-top: 2%;margin-bottom:2%" block @click="agregarParticipante()" dark color="blue">
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
            <v-btn @click="modificarSesionEducativa()" :disabled="evaluarArregloParticipantes()" :dark="!evaluarArregloParticipantes()" block color="success">
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
function esTexto(value) {
  return /^[A-Za-z\sáéíóúÁÉÍÓÚñÑ]+$/.test(value); 
}
//Para oraciones o parrafos
function esParrafo(value) {
  return /^[A-Za-z\d\s.,;°"“()áéíóúÁÉÍÓÚñÑ]+$/.test(value); 
}
export default {
  props:["sesioneducativa","dialogoparticipante"],
  components: {
    vueDropzone: vue2Dropzone,
  },
  data() {
    return{
      select: { value: "1", text: "Nombre" },
      items: [
        { value: "nombre", text: 'Nombre'},
        { value: "apellido", text: 'Apellido'},
        { value: "numeroDocumento", text: 'Numero Documento'},
      ],
      datemenu:false,
      dialogVistaPreviaFirma:false,
      imagen:"",
      nombreCreador:"",
      residente:{},
      residenteArray:[],
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
  watch:{
    dialogoparticipante: async function(dialogoparticipante){
      if(dialogoparticipante){
        await this.obtenerResidentes();
        this.filtrarParticipantes();
        this.residenteArray = this.residentes;
        console.log("Residentes filtrados finales")
        console.log(this.residentes);
      }
    }
  },
  methods:{
    ...mapMutations(["replaceSesionesEducativas","setResidentes"]),
    async mensaje(icono, titulo, texto, footer) {
      await this.$swal({
        icon: icono,
        title: titulo,
        text: texto,
        footer: footer,
      });
    },
    cerrarDialogo() {
      this.$emit("close-dialog-participantes");
      this.participantes=[];
      this.ParticipanteSesion = this.limpiarParticipanteAgregado();
      this.$refs.myVueDropzone.removeAllFiles();
      
    },
    afterSuccess(file, response) {
      this.ParticipanteSesion.firma = file.dataURL.split(",")[1];
      console.log("this.ParticipanteSesion.firma LLENADO");
    },
    afterRemoved(file, error, xhr) {
      this.ParticipanteSesion.firma = "";
    },
    agregarParticipante(){
      this.$v.ParticipanteSesion.$touch();
      if(!this.$v.ParticipanteSesion.$invalid){
        this.participantes.push(this.ParticipanteSesion);
        this.ParticipanteSesion = this.limpiarParticipanteAgregado();
        this.$refs.myVueDropzone.removeAllFiles();
        this.filtrarParticipantesInterno()
        console.log("Residentes filtrados finales")
        console.log(this.residentes);
        this.$v.ParticipanteSesion.$reset();
      }
    },
    eliminarParticipante(item,id){
      var index =  this.participantes.findIndex(function(o){
        return o.idparticipante === id;
      })
      if (index !== -1) { 
        this.participantes.splice(index, 1);
        //this.sesioneducativa.contenido.participantes.splice(index, 1);
        this.residentes.push(item);
      }
      console.log("Residentes filtrados finales")
      console.log(this.residentes);
      
    },
    evaluarArregloParticipantes(){
      if(this.participantes.length===0) {return true}
      else{ return false}
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
      var arrayParticipante=this.participantes;

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



      // var arrayResidente=this.residentes;
      // var arrayParticipante=this.sesioneducativa.contenido.participantes;
      // var retorno = [];
      // for(var x=0;arrayResidente<=arrayResidente.length-1;x++){
      //   for(var y=0;arrayParticipante<=arrayParticipante.length-1;y++){
      //     if(arrayParticipante[y].idparticipante !== arrayResidente[x].id ){
      //       retorno.push(residente[x]);
      //     }
      //   }
      // }
      // console.log("Retorno de filtro")
      // console.log(retorno)
      // //this.setResidentes(retorno);
    },
    filtrarParticipantes(){
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



      // var arrayResidente=this.residentes;
      // var arrayParticipante=this.sesioneducativa.contenido.participantes;
      // var retorno = [];
      // for(var x=0;arrayResidente<=arrayResidente.length-1;x++){
      //   for(var y=0;arrayParticipante<=arrayParticipante.length-1;y++){
      //     if(arrayParticipante[y].idparticipante !== arrayResidente[x].id ){
      //       retorno.push(residente[x]);
      //     }
      //   }
      // }
      // console.log("Retorno de filtro")
      // console.log(retorno)
      // //this.setResidentes(retorno);
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
      await axios
        .put("/SesionesEducativas", this.sesioneducativa)
        .then((res) => {
          var info ={
            id: res.data.id,
            titulo: res.data.titulo,
            fechaCreacion: res.data.fechaCreacion.split("T")[0],
            area: res.data.area,
            tipo: res.data.tipo,
            idCreador: res.data.idCreador,
            datoscreador:{
              usuario: this.nombreCreador
            }
          }
          console.log("Modificado xd")
          console.log(info);
          this.replaceSesionesEducativas(info);
          this.cerrarDialogo();
        })
        .catch((err) => {console.log(err)})
        await this.mensaje(
          "success",
          "Listo",
          "Participantes Agregados Satisfactoriamente",
          "<strong>Se redirigira a la interfaz de Gestión<strong>"
        );

    },
    //Lista de Residentes para agregar participantes
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
          // console.log("Residentes:");
          // console.log(info);
        })
        .catch((err) => console.log(err));
    },
  },
  computed:{
    ...mapState(["residentes"]),
    errorResidente() {
      const errors = [];
      if (!this.$v.ParticipanteSesion.idparticipante.$dirty) return errors;
      !this.$v.ParticipanteSesion.idparticipante.required &&
        errors.push("Debe seleccionar un residente obligatoriamente");
      return errors;
    },
    errorGrado() {
      const errors = [];
      if (!this.$v.ParticipanteSesion.grado.$dirty) return errors;
      !this.$v.ParticipanteSesion.grado.required &&
        errors.push("Debe escribir un grado obligatoriamente");
      !this.$v.ParticipanteSesion.grado.esParrafo &&
        errors.push("El grado no puede contener caracteres especiales");
      return errors;
    },
    errorObservaciones() {
      const errors = [];
      if (!this.$v.ParticipanteSesion.observaciones.$dirty) return errors;
      !this.$v.ParticipanteSesion.observaciones.required &&
        errors.push("Debe escribir un observacion obligatoriamente");
      !this.$v.ParticipanteSesion.observaciones.esParrafo &&
        errors.push("Las observaciones no deben contener caracteres especiales");
      return errors;
    },
    errorFechaRealizacion() {
      const errors = [];
      if (!this.$v.ParticipanteSesion.fecha.$dirty) return errors;
      !this.$v.ParticipanteSesion.fecha.required &&
        errors.push("Debe ingresar la fecha de creacion obligatoriamente");
      //validating whether the user are an adult
      var dateselected = new Date(this.ParticipanteSesion.fecha);
      var maxdate = new Date();
      !(dateselected.getTime() > maxdate.getTime()) &&
        errors.push("La fecha no debe ser menor a la actual");

      return errors;
    },
  },
  validations(){
    const validacionfecha = (value)=>{
      var dateselected = new Date(this.ParticipanteSesion.fecha);
      var maxdate = new Date();
      return (dateselected.getTime() > maxdate.getTime()) 
    };
    return{
      ParticipanteSesion:{
        idparticipante: {
          required,
        },
        grado: {
          required,
          esParrafo
        },
        fecha: {
          required,
          validacionfecha
        },
        firma: {
        },
        observaciones: {
          required,
          esParrafo
        }
      },
    }
  },
  async created(){
    await this.obtenerResidentes();
    //Filtrar a los participantes ya agregados previamente
    this.filtrarParticipantes()
    console.log("Residentes filtrados finales")
    console.log(this.residentes);
    this.residenteArray = this.residentes;
    this.nombreCreador = this.sesioneducativa.datoscreador
  },
}
</script>

<style>
.v-application .primary--text{
    color: var(--v-success-darken1) !important;
    caret-color: var(--v-success-lighten1) !important;
}
</style>