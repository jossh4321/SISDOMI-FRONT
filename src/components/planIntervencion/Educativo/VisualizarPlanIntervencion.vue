<template>
    <v-card>
    <v-card-title class="justify-center">Visualizar Plan de intervención</v-card-title>

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
        Aspectos de intervención
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <div class="container-planI">
      <form>
        <v-text-field
          v-model="plan.tipo"
          label="Ingrese el nombre del plan"
          outlined
          color="#009900"
          disabled
        ></v-text-field>

        <v-text-field
          v-model="plan.contenido.firmas.nombre"
          label="Ingrese el nombre-dni de la usuaria"
          outlined
          color="#009900"
          disabled
        ></v-text-field>

        <v-text-field
          v-model="plan.contenido.objetivoGeneral"
          label="Ingrese el objetivo general"
          outlined
          color="#009900"
          disabled
        ></v-text-field>

        <v-textarea
          v-model="plan.contenido.objetivoEspecificos"
          label="Ingrese los objetivos específicos"
          auto-grow
          outlined
          rows="2"
          row-height="25"
          color="#009900"
          shaped
          disabled
        ></v-textarea>

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
        <v-textarea
          v-model="plan.fase"
          label="Casos/Problemas"
          auto-grow
          outlined
          rows="2"
          row-height="25"
          color="#009900"
          shaped
          disabled
        ></v-textarea>

        <v-textarea
         v-model="plan.contenido.estrategias"
          label="Actividades/estrategias"
          auto-grow
          outlined
          rows="2"
          row-height="25"
          color="#009900"
          shaped
          disabled
        ></v-textarea>

        <v-textarea
          v-model="plan.contenido.indicadores"
          label="Indicadores"
          auto-grow
          outlined
          rows="2"
          row-height="25"
          color="#009900"
          shaped
          disabled
        ></v-textarea>

        <v-textarea
         v-model="plan.contenido.metas"
          label = "Meta"
          auto-grow
          outlined
          rows="2"
          row-height="25"
          color="#009900"
          shaped
          disabled
        ></v-textarea>

        <div>
          <vue-dropzone ref="myVueDropzone"
            
            @vdropzone-success="afterSuccess"
            @vdropzone-removed-file="afterRemoved"
            id="dropzone" :options="dropzoneOptions" 
            
            >
          </vue-dropzone>
        </div>
        <v-divider class="divider-custom"></v-divider>
            <v-btn block @click="cerrarDialogo()" color="primary">
              <v-icon left>mdi-close-outline</v-icon>
              <span>Cerrar</span>
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
  props:["plan"],
   components: {
     vueDropzone: vue2Dropzone
  },
  data() {
      return {
       datemenu: false,
     /* planI: {
        nombreusuaria:"Xiomara Paredes Guerra",
        nombreplan:"PlanI_Edu_Xiomara_1",
        objetivogeneral:"Realizar un adecuado plan de intervención",
        objetivoespecifico:"Responde a Plan de seguimiento",
        casos_problemas:"1. Reinserción escolar.\n 2. No quiere participar en nivelación de matemática.\n 3. Retraso escolar.\n 4. Bajo rendimiento.\n 5. Problema de aprendizaje.",
        actividades_estrategias:"1. Solicitar constancia de vacante.\n 2. Entrevista personal.",
        indicadores:"1. Matricula en la I.E.\n 2.Participa en la nivelación escolar.",
        meta:"Lograr nivelación en el grado correspondiente del área de matemática.",
      },*/
      datemenu: false,
      step:1,
      dropzoneOptions: {
        url: "",
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
   cerrarDialogo(){
      this.$emit("close-dialog-detail");
    },
   
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
.container-planI {
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