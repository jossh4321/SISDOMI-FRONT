<template>
    <v-card>
      <v-card-title class="justify-center">{{titulo}}</v-card-title>
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
                    v-model="residente"
                    label="Usuaria CAR"
                    outlined
                    readonly
                    color="#009900"
                ></v-text-field>
                <v-text-field
                    v-model="educador"
                    label="Educador Responsable"
                    outlined
                    readonly
                    color="#009900"
                ></v-text-field>  
                <v-text-field
                    v-model="informe.contenido.iereinsersion.nombre"
                    label="Instirución Educativa"
                    outlined
                    readonly
                    color="#009900"
                ></v-text-field>
        <v-row>
          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="informe.contenido.iereinsersion.modalidad"
              label="Modalidad"
              outlined
              readonly
              color="#009900"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="informe.contenido.iereinsersion.nivel"
              label="Nivel Educativo"
              outlined
              readonly
              color="#009900"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="informe.contenido.iereinsersion.grado"
              label="Grado"
              outlined
              readonly
              color="#009900"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-textarea
          v-model="informe.contenido.antecedentes"        
          label="Antecedentes"
          auto-grow
          outlined
          readonly
          rows="2"
          row-height="40"                    
          color="#009900"
          shaped
        ></v-textarea>
        <v-textarea
          v-model="informe.contenido.situacionactual"        
          label="Situación Educativa Actual"
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
                <v-card
                  style="margin-top:1%;margin-bottom:1%;padding-bottom:1%;background-color:#EAEAEA"
                >
                  <v-card
                    elevation="0"
                    style="background-color:#EAEAEA"
                    height="70"
                  >
                    <v-row style="margin:1%;heigh:100%" align="center">
                      <v-col :cols="8" align="left">
                        <v-text-field
                          disabled
                          label="Logros alcanzados"
                          color="#009900"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-card>

                  <v-card
                    tile
                    elevation="0"
                    color="#FAFAFA"
                    style="margin:5px"
                    height="60"
                    v-for="logro in informe.contenido.logroalcanzado"
                    :key="logro"
                  >
                    <v-row style="margin-left:10px;heigh:100%" align="center">
                      <v-col :cols="8" align="left">
                        <span>{{ logro }}</span>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-card>
                <v-card
                  style="margin-top:1%;margin-bottom:1%;padding-bottom:1%;background-color:#EAEAEA"
                >
                  <v-card
                    elevation="0"
                    style="background-color:#EAEAEA"
                    height="70"
                  >
                    <v-row style="margin:1%;heigh:100%" align="center">
                      <v-col :cols="8" align="left">
                        <v-text-field
                          disabled
                          label="Recomendaciones"
                          color="#009900"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-card>

                  <v-card
                    tile
                    elevation="0"
                    color="#FAFAFA"
                    style="margin:5px"
                    height="60"
                    v-for="recomendacion in informe.contenido.recomendaciones"
                    :key="recomendacion"
                  >
                    <v-row style="margin-left:10px;heigh:100%" align="center">
                      <v-col :cols="8" align="left">
                        <span>{{ recomendacion }}</span>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-card>
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
    name:"DetalleInformeEducativoEvolutivo",
    props:["informe","titulo"],
    data () {
      return {                
        datemenu: false,
        step:1,
        residente:"",
        educador:"",
        logro:"",
        recomendacion:"",
      }
    },
    async created() {
      this.obtenerResidente();
      this.obtenerEducador();
    },
    methods:{
        cerrarDialogo(){
            this.$emit("close-dialog-detail");
        },
        async obtenerResidente(){
          await axios.get("/residente/id?id="+this.informe.idresidente)
                  .then( x => {
                            this.residente = x.data.nombre + " " +x.data.apellido;
                  }).catch(err => console.log(err));
        },
        async obtenerEducador(){
          await axios.get("/usuario/id?id="+this.informe.creadordocumento)
            .then(res => {
                    this.educador = res.data.datos.nombre + " "+res.data.datos.apellido;
            }).catch(err => console.log(err));
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