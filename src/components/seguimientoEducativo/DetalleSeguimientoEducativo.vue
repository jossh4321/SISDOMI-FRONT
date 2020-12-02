<template>
  <v-card>
    <v-card-title class="justify-center">Detalle de Seguimiento Educativo</v-card-title>
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
               <v-autocomplete
                            v-model="seguimiento.idresidente"
                            :items="listaresidentes"
                            filled
                            chips
                            disabled
                            dense
                            outlined
                            color="#009900"
                            label="Usuaria CAR"
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
                 <!-- autocomplete de  educadores-->
                        <v-autocomplete
                              :items="listaeducadores"
                              filled
                              chips
                              dense
                              disabled
                              outlined
                              v-model="seguimiento.creadordocumento"
                              color="#009900"
                              label="Educador responsable"
                              item-text="usuario"
                              item-value="id"
                            
                              
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
                                  {{ data.item.datos.nombre  + " " +  data.item.datos.apellido }}
                                </v-chip>
                              </template>
                              <template v-slot:item="data">
                                <template>
                                  <v-list-item-avatar>
                                    <v-avatar left color="#b3b3ff" size="24">
                                      <span style="font-size:12px">UC</span>
                                    </v-avatar>
                                  </v-list-item-avatar>
                                  <v-list-item-content>
                                    <v-list-item-title
                                      >Nombre completo: {{ data.item.datos.nombre }}
                                      {{ data.item.datos.apellido }}
                                    </v-list-item-title>
                                    <v-list-item-subtitle
                                      >Nro. Documento:
                                      {{
                                        data.item.datos.numeroDocumento
                                      }}</v-list-item-subtitle
                                    >
                                  </v-list-item-content>
                                </template>
                              </template>
                          </v-autocomplete>
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
                      v-model="seguimiento.fechacreacion"
                      label="Fecha de Evaluación"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      color="#009900"
                      disabled
                      
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="seguimiento.fechacreacion"
                    @input="menu2 = false"
                    locale="es-es"
                  ></v-date-picker>
                </v-menu>       
              <v-text-field
                v-model="seguimiento.contenido.modalidad"
                label="Modalidad"
                outlined
                readonly
                color="#009900"
              ></v-text-field>
              <v-text-field
                v-model="seguimiento.contenido.nivel"
                label="Nivel"
                outlined
                readonly
                color="#009900"
              ></v-text-field>
              <v-text-field
                v-model="seguimiento.contenido.grado"
                label="Grado"
                outlined
                readonly
                color="#009900"
              ></v-text-field>
              <v-text-field
                v-model="seguimiento.contenido.añoescolar"
                label="Año Escolar"
                outlined
                readonly
                color="#009900"
              ></v-text-field>
              <!--Comienza el cuadro de Fima -->
            <v-row justify="center">
                <v-dialog v-model="dialog" persistent max-width="850px">
                  <template v-slot:activator="{ on }">
                    <v-btn color="primary" v-on="on">
                      Ver Firma de creador(es) de documento
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="headline"> Firma</span>
                    </v-card-title>
                    <v-card-text>

            <v-card
                style="margin-top:30px;left-top:30px;padding:5px 5px;background-color:#EAEAEA"
              >
                <v-card-title style="font-size:22px;padding: 10px 10px;"
                  >Firma de creador(es) de documento</v-card-title
                >
                <!-- Cabecera -->
                <v-card
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
                </v-card>
                <!-- Cuerpo -->
                <v-card
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
                      <div style="margin-right:20px">
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
                        
                      </div>
                    </v-col>
                  </v-row>
                </v-card>
              </v-card>
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
             
              <!--Botones de card -->
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
         <!--CONTIENE el step´per 2 -->
        <v-stepper-content step="2"
          ><!--CONTIENE LOS STEPPERS 1 -->
          <div class="container-user">
            <form>
             <v-card
                style="margin-top:30px;left-top:30px;padding:5px 5px;background-color:#FFBAB0"
              >
                <v-card-title style="font-size:22px;padding: 10px 10px;"
                  >Notas de Trimestre</v-card-title
                >
                <!-- Cabecera -->
                <v-card
                elevation="0"
                color="#FFBAB0"
                style="margin-top:5px; margin-bottom:15px"
                height="30"
                >
                  <v-row style="margin-left:10px;heigh:100%" align="center">
                    <v-col cols="2">
                      <article>
                        <span style="font-size:16px">Orden</span>
                      </article>
                    </v-col>
                    <v-col cols="3">
                      <article>
                        <span style="font-size:16px">Analisis Educativo</span>
                      </article>
                    </v-col>
                    <v-col>
                      <article cols="3">
                        <span style="font-size:16px">Recomendaciones</span>
                      </article>
                    </v-col>
                    <v-col>
                      <article cols="3">
                        <span style="font-size:16px">Ver Calificaciones</span>
                      </article>
                    </v-col>
                    <v-col align="right">
                    </v-col>
                  </v-row>
                </v-card>
                <!-- Cuerpo -->
                <v-card
                  tile
                  elevation="0"
                  color="#FAFAFA"
                  style="margin-top:5px"
                  height="50"
                  v-for="(item, index) in seguimiento.contenido.trimestre"
                  :key="index"
                >
                  <v-row style="margin-left:5px;heigh:100%;" align="center">
                    <v-col :cols="2">
                      <article>
                        <span style="font-size:16px">{{item.orden}}</span>
                      </article>
                    </v-col>
                    <v-col :cols="3">
                      <article>
                        <span style="font-size:16px">{{item.analisiseducativo}}</span>
                      </article>
                    </v-col>
                    <v-col :cols="3">
                       <span style="font-size:16px">{{item.recomendaciones}}</span>
                    </v-col>
                    
                    <v-col :cols="3">
                      <div style="margin-right:20px">
                        <!--card de  notas (conbinacion fuerte)-->
               
                       <v-btn
                          style="margin-right:15px;margin-top:-5px"
                          dark
                          color="#2E9CCF"
                          @click="abrirDialogoNotas(item.puntajes)"
                        >
                          Ver Notas
                        </v-btn>  
          <!--Card de  trimestre --> 
          <v-row justify="center">
                <v-dialog v-model="dialog1" persistent max-width="850px">
                  <v-card>
                    <v-card-title>
                      <span class="headline"> Calificaciones</span>
                    </v-card-title>
                    <v-card-text>
            <v-card align="center" elevation="0">
            <v-card
                style="margin-top:30px;left-top:10px;padding:5px -15px;width:50%;background-color:#4ABBEF"
                
              >
                <v-card-title style="font-size:22px;padding: 10px 10px;"
                  >Notas del trimestre</v-card-title
                >
                <!-- Cabecera -->
                <v-card
                elevation="0"
                color="#4ABBEF"
                style="margin-top:5px; margin-bottom:15px"
                height="30"
                >
                  <v-row style="margin-left:10px;heigh:100%" align="center">
                    <v-col cols="4">
                      <article>
                        <span style="font-size:16px">Curso</span>
                      </article>
                    </v-col>
                    <v-col cols="4">
                      <article>
                        <span style="font-size:16px">Nota</span>
                      </article>
                    </v-col>
                    
                    <v-col align="right">
                    </v-col>
                  </v-row>
                </v-card>
                <!-- Cuerpo -->
                <v-card
                  tile
                  elevation="0"
                  color="#FAFAFA"
                  style="margin-top:5px"
                  height="50"
                  v-for="(item, index) in notas"
                  :key="index"
                  
                >
                  <v-row style="margin-left:10px;heigh:100%;" align="center">
                    <v-col :cols="4">
                      <article>
                        <span style="font-size:16px">{{item.area}}</span>
                      </article>
                    </v-col>
                    <v-col :cols="4">
                      <article>
                        <span style="font-size:16px">{{item.promedio}}</span>
                      </article>
                    </v-col>
                    <v-col align="right">
                      <div style="margin-right:20px">
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
                        
                      </div>
                    </v-col>
                  </v-row>
               
                </v-card>
              </v-card>
              </v-card>
              
<!--fin-->
                          

              <!-- -->
                        
                    
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="dialog1 = false;"
                      >
                        Cerrar
                      </v-btn>
                  
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>
                      </div>
                    </v-col>
                  </v-row>
                </v-card>
              </v-card>
                        <v-dialog
                                  v-model="dialogVistaPreviaFirma"
                                  persistent
                                  max-width="600px"
                                >
                                  <v-card align="center">
                                    <v-card-title>
                                      <span class="headline">Vista previa</span>
                                    </v-card-title>
                                    <v-card-text>
                                      <img
                                        width="100%"
                                        height="100%"
                                        :src="imagen"
                                        alt=""
                                      />
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


              <!--Botones de card -->
              <v-row>
                <v-col>
                  <v-btn block @click="step = 1" color="success">
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
  </v-stepper-items>
    </v-stepper>
  </v-card>
</template> 

<script>
import axios from 'axios';

export default {
  
name:'DetalleSeguimientoEducativo',
props: ["seguimiento","residente","listaresidentes","listaeducadores"],
data(){
  return{
    dialog: false,//dialogo de ver firma
    dialog1:false,//dialogo de ver notas
    datemenu: false,
     imagen: "",
    step: 1,
    notas:[],
    educador:"",
    dialogVistaPreviaFirma: false,
    
    
  }
  },
  methods:{
      cerrarDialogo(){
        this.step=1;
        this.$emit("close-dialog-detail");
      },
      abrirDialogoNotas(notas){
        this.notas=notas;
        this.dialog1=true;
        console.log(this.notas)
      },
       verFirma(index) {
      console.log(this.seguimiento.contenido.firmas[index].urlfirma);
      this.imagen = this.seguimiento.contenido.firmas[index].urlfirma;
      this.dialogVistaPreviaFirma = true;
    },
    cerrarVistaPreviaFirma() {
      this.dialogVistaPreviaFirma = false;
    },
},



}

</script>

<style>

</style>