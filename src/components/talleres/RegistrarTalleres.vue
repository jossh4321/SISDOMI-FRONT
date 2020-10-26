<template>
    <v-card>
    <v-card-title class="justify-center">Registrar Talleres</v-card-title>

    <v-stepper v-model="step">
    <v-stepper-header>
      <v-stepper-step
        editable
        step="1"
      >
        Datos Generales
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
        editable
        step="2"
      >
        Asistencia de tutores futuros
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <div class="container-taller">
      <form>
        <v-text-field
          v-model="taller.nombreTaller"
          label="Ingrese el nombre del taller"
          outlined
          color="#009900"
        ></v-text-field>

        <v-text-field
          v-model="taller.nombreusuaria"
          label="Ingrese el nombre-dni de la usuaria"
          outlined
          color="#009900"
        ></v-text-field>

        <v-text-field
          v-model="taller.descripcion"
          label="Ingrese la descripción"
          outlined
          color="#009900"
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
              v-model="taller.fechaTaller"
              label="Fecha del Taller"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
              @input="$v.taller.fechaTaller.$touch()"
              @blur="$v.taller.fechaTaller.$touch()"
              color="#009900"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="taller.fechaTaller"
            @input="menu2 = false"
            locale="es-es"
          ></v-date-picker>
        </v-menu>
        
        <br />

        <v-text-field
          v-model="taller.horaInicioTaller"
          label="Ingrese la hora de inicio del taller"
          outlined
          color="#009900"
        ></v-text-field>
        <!--<v-time-picker format="ampm"></v-time-picker>-->


        <v-text-field
          v-model="taller.horaFinTaller"
          label="Ingrese la hora de fin del taller"
          outlined
          color="#009900"
        ></v-text-field>

        <v-btn block @click="step = 2" color="primary">
          <v-icon left>mdi-page-next-outline</v-icon>
          <span>Continuar</span>
        </v-btn>
      </form>
    </div>
      </v-stepper-content>
      <v-stepper-content step="2">
        <div  class="container-user">
      <form>
        <br />
        
        <div>
          <vue-dropzone ref="myVueDropzone"
            @vdropzone-success="afterSuccess"
            @vdropzone-removed-file="afterRemoved"
            id="dropzone" :options="dropzoneOptions" >
          </vue-dropzone>
        </div>
        <v-divider class="divider-custom"></v-divider>

        <v-btn block color="accent">
          <v-icon left>mdi-mdi-content-save-all-outline</v-icon>
          <span >Registrar Taller</span>
        </v-btn>
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
export default {
   components: {
     vueDropzone: vue2Dropzone,
  },
  data() {
      return {
      taller: {
        nombreusuaria:"Xiomara Paredes Guerra",
        nombreTaller:"Taller_Edu_Xiomara_1",
        descripcion:"Taller que ayudará en la fomración de la usuaria",
        fechaTaller:"15/12/2020",
        horaInicioTaller:"15:00",
        horaFinTaller:"17:00",
        tutores:[
            ""
        ],
      },
      datemenu: false,
      step:1,
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 250,
        maxFilesize: 3.0,
        maxFiles:1,
        acceptedFiles:".jpg",
        headers: { "My-Awesome-Header": "header value" },
        addRemoveLinks: true,
         dictDefaultMessage: "Seleccione la firma del responsable o Arrastrela Aqui"
      },
    };
  },methods:{
    afterSuccess(file,response){
       this.usuario.datos.imagen = file.dataURL;
       this.$v.usuario.datos.imagen.$model = file.dataURL;
    },afterRemoved(file, error, xhr){
      this.usuario.datos.imagen = "";
       this.$v.usuario.datos.imagen.$model = "";
    }
    ,mensaje(icono,titulo,texto,footer){
      this.$swal({
        icon: icono,
        title: titulo,
        text: texto,
        footer:footer
      });
    }
  },
  computed:{

  }

}
</script>
<style  scoped>
.container-taller {
  margin: 15px;
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

.subtitle {
  color: #314b5f;
}
.divider-custom{
  margin-top:7px;
  margin-bottom:7px
}

.inputTextField{
  border-color: green;
}
</style>