<template>
    <v-card>
      <v-card-title class="justify-center">Detalle del Informe Educativo Inicial</v-card-title>
      <v-stepper v-model="step">
        <v-stepper-header>
          <v-stepper-step editable step="1">
            Datos Generales
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step editable step="2">
            Análisis y Diagnóstico
          </v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content step="1">
            <div class="container-user">
              <form>
                <v-text-field
                    v-model="informe.idresidente"
                    label="Usuaria CAR"
                    outlined
                    readonly
                    color="#009900"
                ></v-text-field>
                <v-text-field
                    v-model="informe.creadordocumento"
                    label="Educador Responsable"
                    outlined
                    readonly
                    color="#009900"
                ></v-text-field>  
                <v-textarea
                  label="Lugar de Evaluación"
                  v-model="informe.contenido.lugarevaluacion"
                  auto-grow
                  outlined
                  rows="2"
                  row-height="25"
                  color="#009900"
                  shaped
                  readonly
                ></v-textarea>

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
                      v-model="informe.fechacreacion"
                      label="Fecha de Evaluación"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      color="#009900"
                    ></v-text-field>
                  </template>
                </v-menu>

                <v-textarea
                  label="Situación Académica"
                  v-model="informe.contenido.situacionacademica"
                  auto-grow
                  outlined
                  rows="2"
                  row-height="40"
                  color="#009900"
                  shaped
                  readonly
                ></v-textarea>

                <v-textarea
                  label="Análisis Académico y de comportamiento"
                  v-model="informe.contenido.analisisacademico"
                  auto-grow
                  outlined
                  readonly
                  rows="2"
                  row-height="40"
                  color="#009900"
                  shaped
                ></v-textarea>
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
import axios from 'axios';
import { mapMutations, mapState} from "vuex";
import moment from 'moment'
export default {
    name:"DetalleInformeEducativoInicial",
    props:["informe"],
    data () {
      return {                
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

<style  scoped>
.container-user {
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