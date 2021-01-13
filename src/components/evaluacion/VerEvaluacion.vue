<template>
  <v-card>
    <v-card-title class="justify-center">Detalle de Ficha de Evaluacion y Diagnostico Educativo</v-card-title>
    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step editable step="1">
          Datos Generales
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step editable step="2">
          Datos Especificos
        </v-stepper-step>

      </v-stepper-header>
         <v-stepper-items>
            <!--CONTIENE LOS STEPPERS CREADOS ARRIBA EN ESTE CASO SON TRES-->
            <v-stepper-content step="1"
              ><!--CONTIENE LOS STEPPERS 1 -->
              <div class="container-user">
                <form>
                    <v-row>
                        <v-col>
                            <v-autocomplete
                            v-model="fichaEvaluacion.idresidente"
                            :items="listaresidentes"
                            filled
                            chips
                            dense
                            readonly
                            outlined
                            color="#009900"
                            label="Residente"
                            item-text="nombre"
                            item-value="id"
                           
                          >
                            <template v-slot:selection="data">
                              <v-chip
                                v-bind="data.attrs"
                                :input-value="data.selected"
                                style="margin-top:5px"
                              >
                                <v-avatar left color="#b3b3ff" size="24">
                                  <span style="font-size:12px">UE</span>
                                </v-avatar>
                                {{ data.item.nombre + " " + data.item.apellido }}
                              </v-chip>
                            </template>
                            <template v-slot:item="data">
                              <template>
                                <v-list-item-avatar>
                                  <v-avatar left color="#b3b3ff" size="24">
                                    <span style="font-size:12px">US</span>
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
                        <v-col>
                            <v-text-field
                              v-model="fichaEvaluacion.contenido.ultimaie"
                              label="Ultima Institucion Educacion"
                              outlined
                              readonly
                              color="#009900"
                          ></v-text-field>
                        </v-col>
                    </v-row> 
                    <v-row>
                        <v-col>
                            <v-text-field
                                v-model="fichaEvaluacion.contenido.tipoie"
                                label="Tipo de Institucion Educacion"
                                outlined
                                readonly
                                color="#009900"
                            ></v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field
                                v-model="fichaEvaluacion.contenido.modalidad"
                                label="Modalidad"
                                outlined
                                readonly
                                color="#009900"
                            ></v-text-field>
                        </v-col>
                    </v-row> 

                    <v-row>
                        <v-col>
                            <v-text-field
                                v-model="fichaEvaluacion.contenido.nivel"
                                label="Nivel"
                                outlined
                                readonly
                                color="#009900"
                            ></v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field
                                v-model="fichaEvaluacion.contenido.grado"
                                label="Grado"
                                outlined
                                readonly
                                color="#009900"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                     <!--Botones de card -->
                      <v-row>
                        <v-col>
                          <v-btn block @click="cerrarDialogo()" color="primary">
                            <v-icon left>mdi-close-outline</v-icon>
                            <span>Cerrar</span>
                          </v-btn>
                        </v-col>
                        <v-col>
                          <v-btn block @click="step = 2" color="success">
                            <v-icon left>mdi-page-next-outline</v-icon>
                            <span>Continuar</span>
                          </v-btn>
                        </v-col>
                      </v-row> 
                 </form>
              </div>
            </v-stepper-content>
            <v-stepper-content step="2"
              ><!--CONTIENE LOS STEPPERS 2 -->
              <div class="container-user">
                <form>
                   <!--Comienza el cuadro de Fima -->
            <v-row justify="center">
                <v-dialog v-model="dialog" persistent max-width="850px">
                  <template v-slot:activator="{ on }">
                    <v-btn color="primary" v-on="on">
                      Ver Firma del creador de documento
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="headline"> Firma</span>
                    </v-card-title>
                    <v-card-text>
                    <v-text-field
                        v-model="this.cargo"
                        label="Cargo"
                        outlined  
                        readonly
                        color="#009900"
                    ></v-text-field>
                    <v-text-field
                        v-model="this.usuario"
                        label="Nombre"
                        outlined  
                        readonly 
                        color="#009900"
                    ></v-text-field>
                    <div align="center">
                    <v-card-text>
                        <img
                          width="240"
                          height="170"
                          :src="this.firma"
                          alt=""
                        />
                    </v-card-text>
                    </div> 

            <!-- <v-card
                style="margin-top:30px;left-top:30px;padding:5px 5px;background-color:#EAEAEA"
              >
                <v-card-title style="font-size:22px;padding: 10px 10px;"
                  >Firma del creador de documento</v-card-title
                > -->
                <!-- Cabecera -->
                <!-- <v-card
                elevation="0"
                color="#EAEAEA"
                style="margin-top:5px; margin-bottom:15px"
                height="30"
                >
                  <v-row style="margin-left:10px;heigh:100%" align="center">
                    <v-col cols="4">
                      <article>
                        <span style="font-size:16px">Cargo</span>
                      </article>
                    </v-col>
                    <v-col cols="4">
                      <article>
                        <span style="font-size:16px">Nombre</span>
                      </article>
                    </v-col>
                    <v-col>
                      <article cols="4">
                        <span style="font-size:16px">Firma</span>
                      </article>
                    </v-col>
                    <v-col align="right">
                    </v-col>
                  </v-row>
                </v-card> -->
                <!-- Cuerpo -->
                <!--<v-card
                  tile
                  elevation="0"
                  color="#FAFAFA"
                  style="margin-top:5px"
                  height="80"
                  v-for="(item, index) in seguimiento.contenido.firmas"
                  :key="index"
                >
                  <v-row style="margin-left:10px;heigh:100%;" align="center">
                    <v-col :cols="4">
                      <article>
                        <span style="font-size:16px">{{item.cargo}}</span>
                      </article>
                    </v-col>
                    <v-col :cols="4">
                      <article>
                        <span style="font-size:16px">{{item.nombre}}</span>
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
                              @click="verFirma(index)"
                            >
                              <img
                                style="width:25% "
                                src="https://www.flaticon.es/svg/static/icons/svg/1/1180.svg"
                                alt="firma"
                              />
                            </v-btn>
                          </template>
                      
                    </v-col>
                    <v-col align="right">
                      <div style="margin-right:20px">-->
                   <!--     <v-btn
                          style="margin-right:10px"
                          fab
                          x-small
                          dark
                          color="#126BB5"
                        >
                          <v-icon dark>
                            mdi-pencil
                          </v-icon>
                        </v-btn>  -->
                        
                    <!--  </div>
                    </v-col>
                  </v-row>
                </v-card>
              </v-card> -->
<!--fin-->
                          

              <!-- -->
                        
                    
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="dialog = false"
                      >
                        Cerrar
                      </v-btn>
                  
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>
                <!--Dialogo dse estudiso -->
              <v-card
                  style="margin-top:30px;padding:5px 5px;background-color:#EAEAEA"
                >
                  <v-card
                    elevation="0"
                    style="background-color:#EAEAEA"
                    height="70"
                  >
                  <v-card-title style="font-size:22px;padding: 10px 10px;"
                  >Estudios</v-card-title
                >
                    <v-row style="margin:1%;heigh:100%" align="center">
                      <v-col :cols="4" align="left">
                        <v-text-field
                          v-model="fichaEvaluacion.contenido.grado"
                          label="Nombre"
                          color="#009900"
                        
                        ></v-text-field>
                      </v-col>
                      <v-col :cols="4" align="left">
                        <v-text-field
                          v-model="fichaEvaluacion.contenido.grado"
                          label="Cargo"
                          color="#009900"
                          
                        ></v-text-field>
                      </v-col>
                      
                    </v-row>
                  </v-card>
                  
                  <v-card
                    color="#FAFAFA"
                    style="margin-top:5px"
                    height="60"
                    v-for="(item, index) in fichaEvaluacion.contenido.estudios"
                    :key="index"
                  >
                    <v-row style="margin-left:10px;heigh:100%" align="center">
                      <v-col :cols="8">
                        <article>
                          
                          <span style="font-size:18px">
                            {{ item.nivel }} → {{ item.observaciones}}</span
                          >
                        </article>
                      </v-col>
                      
                       
                     
                     
                    </v-row>
                  </v-card>
                </v-card>
                <!--Dialogo de aspectos -->
                
              <v-card
                  style="margin-top:30px;padding:5px 5px;background-color:#EAEAEA"
                >
                  <v-card
                    elevation="0"
                    style="background-color:#EAEAEA"
                    height="70"
                  >
                  <v-card-title style="font-size:22px;padding: 10px 10px;"
                  >Aspectos</v-card-title
                >
                    <v-row style="margin:1%;heigh:100%" align="center">
                      <v-col :cols="4" align="left">
                        <v-text-field
                          v-model="fichaEvaluacion.contenido.grado"
                          label="Nombre"
                          color="#009900"
                        
                        ></v-text-field>
                      </v-col>
                      <v-col :cols="4" align="left">
                        <v-text-field
                          v-model="fichaEvaluacion.contenido.grado"
                          label="Cargo"
                          color="#009900"
                          
                        ></v-text-field>
                      </v-col>
                      
                    </v-row>
                  </v-card>
                  
                  <v-card
                    color="#FAFAFA"
                    style="margin-top:5px"
                    height="60"
                    v-for="(item, index) in fichaEvaluacion.contenido.aspectos"
                    :key="index"
                  >
                    <v-row style="margin-left:10px;heigh:100%" align="center">
                      <v-col :cols="8">
                        <article>
                          
                          <span style="font-size:18px">
                            {{ item.tipo }} → {{ item.descripcion}}</span
                          >
                        </article>
                      </v-col>
                      
                       
                     
                     
                    </v-row>
                  </v-card>
                </v-card>

                     <!--Botones de card -->
                      <v-row>
                        <v-col>
                          <v-btn block @click="step = 1" color="success">
                            <v-icon left>mdi-page-next-outline</v-icon>
                            <span>Pagina Anterior</span>
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
        </v-stepper-items>
     </v-stepper>
  </v-card>
</template>

<script>

import axios from "axios";
import Vue from 'vue'
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import { mapMutations, mapState } from "vuex";
import { required, minLength,maxLength, email, helpers,numeric } from "vuelidate/lib/validators";
import moment from "moment";
export default {
name:"ConsultarFichaDiagnosticoEducativo",
props:["listaresidentes","listaeducadores","fichaEvaluacion"],
components:{
    vueDropzone: vue2Dropzone,
},
data(){
    return{
      step: 1,
      dialog:false, // dialogo firma
      dialogVistaPreviaFirma: false,
      imagen: "",
    }
      },
 async created() {
      this.obtenerCreador();
  },
    methods:{
      cerrarDialogo(){
         this.step = 1;
        this.$emit("close-dialog-detail");
      },
       cerrarVistaPreviaFirma() {
      this.dialogVistaPreviaFirma = false;
    },
    async obtenerCreador() {
        await axios
        .get("/usuario/rol/permiso?id=" + this.fichaEvaluacion.creadordocumento)
        .then((x) => {
          this.usuario = x.data.datos.nombre + " " + x.data.datos.apellido;
          this.cargo = x.data.rol.nombre;
          this.firma = x.data.datos.firma;
        })
        .catch((err) => console.log(err));
    },
    verFirma(index) {
      console.log(this.fichaEvaluacion.contenido.firmas[index].urlfirma);
      this.imagen = this.fichaEvaluacion.contenido.firmas[index].urlfirma;
      this.dialogVistaPreviaFirma = true;
    },
   
  },
  computed:{}
}
</script>

<style>

</style>


<style>

</style>