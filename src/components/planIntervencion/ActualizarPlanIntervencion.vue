<template>
  <v-card >
    <v-card-title class="justify-center">Visualizar Plan de intervención</v-card-title>
    <v-stepper  v-model="step">
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
+
    </v-stepper-header>
    
       <v-stepper-items>
     <v-stepper-content step="1">
        <div class="container-planI">
      <form>
        <v-text-field

           v-model="planI.nombreplan"
          label="Ingrese el nombre del plan"
          outlined
          readonly
          color="#009900"
        ></v-text-field>

        <v-text-field
          v-model="planI.nombreusuaria"
          label="Ingrese el nombre-dni de la usuaria"
          outlined
          readonly
          color="#009900"
        ></v-text-field>

        <v-text-field
          v-model="planI.objetivogeneral"
          label="Ingrese el objetivo general"
          outlined
          readonly
          color="#009900"
        ></v-text-field>

        <v-menu
          v-model="planI.objetivogeneral"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="residente.fecharegistro"
              label="Fecha Registro"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
              color="#009900"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="residente.fecharegistro"
            @input="menu2 = false"
            locale="es-es"
          ></v-date-picker>
        </v-menu>
       
       
        <v-row>
          <v-col>
            <v-btn block @click="step = 2" color="success">
              <v-icon left>mdi-page-next-outline</v-icon>
              <span>Continuar</span>
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
      <v-stepper-content step="2">
        <div class="container-user">
      <form>
        <v-textarea
        
        v-model="planI.casos_problemas"
         label="Casos/Problemas"
        disabled:true
       > </v-textarea>
  
        <v-textarea
        
        v-model="planI.actividades_estrategias"
        label="Actividades/estrategias"
        disabled:true
       > </v-textarea>

       
        <v-textarea
        
        v-model="planI.indicadores"
        label="Indicadores"
        disabled:true
       > </v-textarea>

       
        <v-textarea
        
        v-model="planI.meta"
        label="Meta"
        disabled:true
       > </v-textarea>
               
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
          <span >Modificar Plan</span>
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
name:'ActualizarPlanI',
 props:["planIntervencion"],
  components: {
     vueDropzone: vue2Dropzone,
  },
data(){
  return{
    
    datemenu: false,
      step:1
  }
},
 methods:{
    cerrarDialogo(){
      this.$emit("close-dialog-detail");
    }
  }
}
</script>

<style scoped>
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