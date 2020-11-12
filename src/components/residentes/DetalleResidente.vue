<template>
  <v-card>
    <v-card-title class="justify-center">Detalle de Residente</v-card-title>
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

      <v-stepper-items
        ><!--CONTIENE LOS STEPPERS CREADOS ARRIBA EN ESTE CASO SON TRES-->
        <v-stepper-content step="1"
          ><!--CONTIENE LOS STEPPERS 1 -->
          <div class="container-user">
            <form>
              <v-text-field style="margin-top:5px"
                v-model="residente.nombre"
                label="Nombres"
                outlined
                readonly
                color="#009900"
              ></v-text-field>
              <v-text-field
                v-model="residente.apellido"
                label="Apellidos"
                outlined
                readonly
                color="#009900"
              ></v-text-field>
              <v-text-field
                v-model="residente.sexo"
                label="Sexo"
                outlined
                readonly
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
                    v-model="residente.fechaNacimiento"
                    label="Fecha de Nacimiento"
                    prepend-icon="mdi-calendar"
                    readonly
                    outlined
                    v-bind="attrs"
                    v-on="on"
                    color="#009900"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="residente.fechaNacimiento"
                  @input="menu2 = false"
                  locale="es-es"
                ></v-date-picker>
              </v-menu>
              <v-select
                :items="['DNI', 'Pasaporte', 'Carnet Extranjeria', 'dni']"
                label="Tipo de Documento"
                dense
                outlined
                readonly
                color="#009900"
                v-model="residente.tipoDocumento"
              ></v-select>
              <v-text-field
                v-model="residente.numeroDocumento"
                label="Ingrese el Numero de Documento"
                outlined
                readonly
                color="#009900"
              ></v-text-field>
              <v-text-field
                v-model="residente.lugarNacimiento"
                label="Lugar de Nacimiento"
                outlined
                readonly
                color="#009900"
              ></v-text-field>
              <!--NUMEROS TELEFONO -->
             <v-row justify="center">
                <v-dialog v-model="dialog" persistent max-width="600px">
                  <template v-slot:activator="{ on }">
                    <v-btn color="primary" v-on="on">
                      Ver Telefonos
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="headline">Referente Familiar </span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                      
                          <!--Mostrar Cuadro -->

                          <!--AQUI COMIENZA-->
                          <v-card
                            style="margin-top:30px;padding:5px 5px;background-color:#EAEAEA"
                          >
                            <v-row align="center">
                              <v-col>
                                <v-card-title
                                  style="font-size:22px;padding: 0px 10px;"
                                  >Referentes Familiares</v-card-title
                                >
                              </v-col>
                            </v-row>
                            <v-card
                              tile
                              elevation="0"
                              color="#FAFAFA"
                              style="margin-top:5px"
                              height="60"
                              v-for="(item,
                              index) in residente.telefonosReferencia"
                              :key="index"
                            >
                              <v-row
                                style="margin-left:10px;heigh:100%"
                                align="center"
                              >
                                <v-col :cols="5">
                                  <article>
                                    <img
                                      style="margin-right:5px;width:6% "
                                      src="https://www.flaticon.es/svg/static/icons/svg/996/996443.svg"
                                      alt="imagen usuario"
                                    />
                                    <span style="font-size:18px">
                                      {{ item.referentefamiliar }}</span
                                    >
                                  </article>
                                </v-col>
                                <v-col :cols="3">
                                  <article>
                                    <img
                                      style="margin-right:10px;width:8%"
                                      src="https://www.flaticon.es/svg/static/icons/svg/633/633544.svg"
                                      alt="imagen telefono"
                                    />
                                    <span style="font-size:18px">{{
                                      item.numero
                                    }}</span>
                                  </article>
                                </v-col>
                                <v-col :cols="4" align="right">
                                  <div style="margin-right:20px">
                                    
                                  </div>
                                </v-col>
                              </v-row>
                            </v-card>
                          </v-card>
                          <!-- -->
                        </v-row>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="dialog = false">
                        Cerrar
                      </v-btn>
                      
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>
              <!--FIN NUMEROS TELEFONO -->
              <!--PROGRESO RESIDENTE -->
              




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
        <v-stepper-content step="2"
          ><!--CONTIENE LOS STEPPERS 2 -->
          <div class="container-user">
            <form>
              <v-text-field
                v-model="residente.ubigeo"
                outlined
                readonly
                label="Ingrese el Ubigeo"
                color="#009900"
              ></v-text-field>
              <v-text-field
                v-model="residente.juzgadoProcedencia"
                outlined
                readonly
                label="Ingrese el Juzgado de Procedencia"
                color="#009900"
              ></v-text-field>
              <!--FECHA INGRESO -->
              <v-menu
                v-model="datemenu1"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="residente.fechaIngreso"
                    label="Fecha de Ingreso"
                    prepend-icon="mdi-calendar"
                    readonly
                    outlined
                    v-bind="attrs"
                    v-on="on"

                    color="#009900"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="residente.fechaIngreso"
                  @input="menu2 = false"
                  locale="es-es"
                ></v-date-picker> </v-menu
              ><!--acabo  -->

              <v-textarea
                v-model="residente.motivoIngreso"
                label="Ingrese el Motivo de Ingreso"
                color="#009900"
              ></v-textarea>
              <!--------AQUI esta  EL cuadro de progreso -->
              <v-row justify="center">
                <v-dialog v-model="dialog1" persistent max-width="850px">
                  <template v-slot:activator="{ on }">
                    <v-btn color="primary" v-on="on">
                      Ver Progreso
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="headline"> Progreso</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                      
                         
        
            <v-card
                style="margin-top:10%;width:100%;padding:5px 5px;background-color:#EAEAEA"
              >
                <v-card-title style="font-size:22px;padding: 10px 10px;"
                  >Lista de Progresos de Residente</v-card-title
                >
                <!-- Cabecera -->
                <v-card
                elevation="0"
                color="#EAEAEA"
                style="margin-top:5px; margin-bottom:15px"
                height="30"
                >
                  <v-row style="margin-left:10px;heigh:100%" align="center">
                    <v-col cols="2">
                      <article>
                        <span style="font-size:16px">Fase</span>
                      </article>
                    </v-col>
                    <v-col cols="3">
                      <article>
                        <span style="font-size:16px">Fecha Ingreso</span>
                      </article>
                    </v-col>
                    <v-col cols="3">
                      <article>
                        <span style="font-size:16px">Fecha Finalizacion</span>
                      </article>
                    </v-col>
                    <v-col>
                      <article cols="2">
                        <span style="font-size:16px">Estado</span>
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
                  v-for="(item, index) in residente.progreso"
                  :key="index"
                >
                  <v-row style="margin-left:10px;heigh:100%;" align="center">
                    <v-col :cols="2">
                      <article>
                        <span style="font-size:16px">Nº{{item.fase}} - {{item.nombre}}</span>
                      </article>
                    </v-col>
                    <v-col :cols="3">
                      <article>
                        <span style="font-size:16px">{{moment(item.fechaingreso).format('L')}}</span>
                      </article>
                    </v-col>
                    <v-col :cols="3">
                      <article>
                        <span style="font-size:16px">{{item.fechafinalizacion!=="" ? (moment(item.fechafinalizacion).format('L')): "No finalizado"}}</span>
                      </article>
                    </v-col>
                    <v-col :cols="2">
                      <article>
                        <span style="font-size:16px">{{item.estado}}</span>
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
<!--fin-->
                          

              <!-- -->
                        
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="dialog1 = false"
                      >
                        Cerrar
                      </v-btn>
                  
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>

              <!--Aqui acaba -->
               <v-select
                    :items="['En tratamiento','Finalizado']"
                      v-model="residente.estado"
                    
                    label="Ingrese el Estado"
                     color="#009900"
                 ></v-select>

              <v-row>
                <!-- termina le texto -->
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
const m = moment();
import moment from "moment";
export default {
  name: "DetalleResidente",
  props: ["residente"],
  data() {
    return {
      dialog: false,
      dialog1: false,
      datemenu: false,
      datemenu: false, ///fecha de nacimiento
      datemenu1: false, ///fecha ingreso
      datemenu2: false, ///MODAL fecha ingreso
      datemenu3: false, ///MODAL fecha finalizacion
      step: 1,
    };
  },
  methods: {
    moment: function () {
    return moment();
    },
    cerrarDialogo() {
      this.$emit("close-dialog-detail");
    },
  },
  computed: {},
};
</script>

<style scoped>
div.btn__content {
  padding: 0;
}
div.card__actions .btn {
  min-width: 0;
}
</style>
