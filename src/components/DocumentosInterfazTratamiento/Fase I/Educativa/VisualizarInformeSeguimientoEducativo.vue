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
              <v-card class="subcard card-padre" style="margin-bottom:20px">
                          <v-card class="subcard"  style="margin-bottom:7px" color="#e6f3ff">
                              <span>
                                Residente: {{this.residente.nombre}} {{this.residente.apellido}}
                              </span>
                          </v-card >
                          <v-card class="subcard" color="#e6f3ff">
                            <span>
                              Fecha de Ingreso: {{ this.residente.fechaingreso | fomatoFecha}}
                            </span>
                          </v-card>
                  </v-card>      
              <v-select
                          label="Modalidad"
                          v-model="seguimiento.contenido.modalidad"
                          :items="itemsModalidad"
                          color="#009900"
                          :item-text="itemsModalidad.text"
                          :item-value="itemsModalidad.value"
                          readonly
                          outlined
                        ></v-select>
                                 <v-select     
                        label="Nivel"
                        v-model="seguimiento.contenido.nivel"
                        :items="itemsNivel"
                        color="#009900"
                        :item-text="itemsNivel.text"
                        :item-value="itemsNivel.value"
                        readonly
                        outlined
                      ></v-select>
                      <v-select
                          label="Grado"
                          v-model="seguimiento.contenido.grado"
                          :items="itemsGrado"
                          color="#009900"
                          :item-text="itemsGrado.text"
                          :item-value="itemsGrado.value"
                          readonly
                          outlined
                        ></v-select>
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
                  height="80"
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
                    <v-col cols="6">
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
                  height="60"
                  v-for="(item, index) in notas"
                  :key="index"
                  
                >
                  <v-row style="margin-left:10px;heigh:100%;" align="center">
                    <v-col :cols="6" >
                      <article>
                        <span style="font-size:16px">{{item.area}}</span>
                      </article>
                    </v-col>
                    <v-col :cols="4" >
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
                       <!-- <v-dialog
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
                        </v-dialog> -->


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
import moment from "moment";
export default {
  
name:'DetalleSeguimientoEducativo',
props:["residente"],
data(){
  return{
    segumientoid: "",
      seguimiento:{
        id: "",
        tipo: "",
        historialcontenido: [],
        creadordocumento: "",
        fechacreacion: "",
        area: "",
        fase: "",
        idresidente: "",
        estado: "",
        contenido: {
          modalidad: "",
          nivel: "",
          grado: "",
          añoescolar: "",
          trimestre: [],
          //firmas: [],
          codigodocumento: "",
        },
      },
    itemsModalidad: [
            { value: 'EBA', text: 'Educacion Basica Alternativa'},
            { value: 'EBE', text: 'Educacion Basica Especial'},
            { value: 'EBR', text: 'Educacion Basica Regular'}
          ],
          itemsNivel: [
            { value: 'PRIMARIA', text: 'Nivel Primaria'},
            { value: 'SECUNDARIA', text: 'Nivel Secundaria'},
            //{ value: 'SUPERIOR', text: 'Estudio Superior'}
          ],
          itemGrado: [
            { value: '1', text: '1'},
            { value: '2', text: '2'},
            { value: '3', text: '3'},
            { value: '4', text: '4'},
            { value: '5', text: '5'}
          ],
    dialog: false,//dialogo de ver firma
    dialog1:false,//dialogo de ver notas
    datemenu: false,
     imagen: "",
    step: 1,
    notas:[],
    educador:"",
    dialogVistaPreviaFirma: false,
    usuario: "",
    cargo:"",
    firma:"",
  }
  },
  filters: {
    fomatoFecha: (fecha) =>{
            var formato = moment(fecha);
            return formato.format("llll");
    }
  },
  async created() {
    await this.obtenerSeguimientoId();
    this.seguimiento = await this.loadSeguimientoDetalle(this.segumientoid);
    await this.obtenerCreador();
  },
  methods:{
      cerrarDialogo(){
        this.step=1;
        this.$emit("cerrar-modal-docf1");
      },
      async obtenerSeguimientoId() {
      await axios
        .get("/documento/InformeSeguimientoEducativo/residente/"+this.residente.id)
        .then((x) => {
          this.segumientoid = x.data[0].id;
        })
        .catch((err) => console.log(err));
    },
    async loadSeguimientoDetalle(idseguimiento) {
      var user = {};
      await axios
        .get("/SeguimientoEducativo/id?id=" + idseguimiento)
        .then((res) => {
          console.log(res);
          user = res.data;
          user.fechacreacion = user.fechacreacion.split("T")[0];
        })
        .catch((err) => console.log(err));
      console.log(user);
      return user;
    },
      async obtenerCreador() {
        await axios
        .get("/usuario/rol/permiso?id=" + this.seguimiento.creadordocumento)
        .then((x) => {
          this.usuario = x.data.datos.nombre + " " + x.data.datos.apellido;
          this.cargo = x.data.rol.nombre;
          this.firma = x.data.datos.firma;
        })
        .catch((err) => console.log(err));
    },
      abrirDialogoNotas(notas){
        this.notas=notas;
        this.dialog1=true;
        console.log(this.notas)
      },
       /*verFirma(index) {
      console.log(this.seguimiento.contenido.firmas[index].urlfirma);
      this.imagen = this.seguimiento.contenido.firmas[index].urlfirma;
      this.dialogVistaPreviaFirma = true;
    },
    cerrarVistaPreviaFirma() {
      this.dialogVistaPreviaFirma = false;
    },*/
},
computed: {
     itemsGrado(){
         const listaGrados = [{value:"1",text: "Primero"},{value:"2",text: "Segundo"},{value:"3",text: "Tercero"},
           {value:"4",text: "Cuarto"},{value:"5",text: "Quinto"}];
           if(this.seguimiento.contenido.nivel == 'PRIMARIA'){ 
             listaGrados.push({value:"6",text: "Sexto"})}
           this.seguimiento.contenido.grado = "1";
          return listaGrados;
      },
}

}

</script>

<style>

</style>