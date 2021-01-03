<template>
  <v-card>
    <v-card-title class="justify-center">Registrar Residente</v-card-title>
    <v-card-text>
      <v-stepper v-model="step">
        <v-stepper-header>
          <v-stepper-step editable step="1">Datos Generales</v-stepper-step>

          <v-divider></v-divider>
          <v-stepper-step editable step="2">Datos Especificos</v-stepper-step>
        </v-stepper-header>
        <!--COMIENZA LA PLANTILLA DEL STEPER -->
        <v-stepper-items>
          <v-stepper-content step="1">
            <div class="container-user">
              <form style="margin-top: 15px">
                <!--aQUI ESTARA LO Q  CONTENDRA -->
                <v-text-field
                  v-model.trim="residente.nombre"
                  label="Ingrese el nombre"
                  outlined
                  color="#009900"
                  @input="$v.residente.nombre.$touch()"
                  @blur="$v.residente.nombre.$touch()"
                  :error-messages="errorNombre"
                ></v-text-field>
                <v-text-field
                  v-model.trim="residente.apellido"
                  label="Ingrese el apellido"
                  outlined
                  color="#009900"
                  @input="$v.residente.apellido.$touch()"
                  @blur="$v.residente.apellido.$touch()"
                  :error-messages="errorApellido"
                ></v-text-field>
                <v-row>
                  <v-col>
                    <v-select
                      :items="['Masculino', 'Femenino']"
                      label="Ingrese el Sexo"
                      outlined
                      v-model="residente.sexo"
                      @input="$v.residente.sexo.$touch()"
                      @blur="$v.residente.sexo.$touch()"
                      :error-messages="errorTipoSexo"
                      color="#009900"
                    ></v-select>
                  </v-col>
                  <v-col>
                    <v-menu
                      v-model="menu2"
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
                          v-bind="attrs"
                          v-on="on"
                          outlined
                          @input="$v.residente.fechaNacimiento.$touch()"
                          @blur="$v.residente.fechaNacimiento.$touch()"
                          :error-messages="errorFechaNacimiento"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="residente.fechaNacimiento"
                        @input="menu2 = false"
                        locale="es-es"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-select
                      :items="['DNI', 'Pasaporte', 'Carnet Extranjeria']"
                      label="Ingrese el Tipo de Documento"
                      outlined
                      v-model="residente.tipoDocumento"
                      @input="$v.residente.tipoDocumento.$touch()"
                      @blur="$v.residente.tipoDocumento.$touch()"
                      :error-messages="errorTipoDocumento"
                      color="#009900"
                    ></v-select>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="residente.numeroDocumento"
                      outlined
                      @input="$v.residente.numeroDocumento.$touch()"
                      @blur="$v.residente.numeroDocumento.$touch()"
                      :error-messages="errorNumeroDocumento"
                      label="Ingrese el n°documento"
                      color="#009900"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-text-field
                  v-model="residente.lugarNacimiento"
                  outlined
                  label="Ingrese el Lugar de Nacimiento"
                  color="#009900"
                  @input="$v.residente.lugarNacimiento.$touch()"
                  @blur="$v.residente.lugarNacimiento.$touch()"
                  :error-messages="errorLugarNacimiento"
                ></v-text-field>

                <v-card style="padding:5px;margin:40px 0 18px 0;background-color:#EAEAEA">
                  <v-card-title>
                    <v-row>
                      <v-col :cols="8">Telefono de referencia</v-col>
                      <v-col :cols="4" align="right">
                        <v-btn
                          fab
                          small
                          dark
                          color="green"
                          @click="dialogTelefonoReferencial = true"
                        >
                          <v-icon dark>mdi-plus</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card-title>
                  <template v-if="residente.telefonosReferencia.length <= 0">
                    <v-alert
                      text
                      outlined
                      border="left"
                      color="deep-orange"
                      width="97%"
                      class="ml-3"
                      icon="info"
                    >No ha registrado ningún telefono de referencia</v-alert>
                  </template>
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
                    <v-row style="margin-left:10px;heigh:100%" align="center">
                      <v-col :cols="5">
                        <article>
                          <img
                            style="margin-right:5px;width:6% "
                            src="https://www.flaticon.es/svg/static/icons/svg/996/996443.svg"
                            alt="imagen usuario"
                          />
                          <span style="font-size:18px">
                            {{ item.referentefamiliar }} -
                            {{ item.parentesco }}
                          </span>
                        </article>
                      </v-col>
                      <v-col :cols="3">
                        <article>
                          <img
                            style="margin-right:10px;width:8%"
                            src="https://www.flaticon.es/svg/static/icons/svg/633/633544.svg"
                            alt="imagen telefono"
                          />
                          <span style="font-size:18px">
                            {{
                            item.numero
                            }}
                          </span>
                        </article>
                      </v-col>
                      <v-col :cols="4" align="right">
                        <div style="margin-right:20px">
                          <v-btn fab x-small dark color="red" @click="eliminarTelefono(item.index)">
                            <v-icon dark>mdi-minus</v-icon>
                          </v-btn>
                        </div>
                      </v-col>
                    </v-row>
                  </v-card>
                  <v-card v-if="errorTelefonosReferenciales" color="red">
                    <v-card-text class="text-center" style="color: white">
                      Debe Ingresar un Telefono de referencia
                      Obligatoriamente
                    </v-card-text>
                  </v-card>
                </v-card>
                <v-row justify="center">
                  <v-dialog v-model="dialogTelefonoReferencial" persistent max-width="600px">
                    <v-card>
                      <v-card-title>
                        <span class="headline">Registrar Telefono</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field
                                v-model="telefonos.referenteFamiliar"
                                label="Referente Familiar"
                                color="#009900"
                                @input="$v.telefonos.referenteFamiliar.$touch()"
                                @blur="$v.telefonos.referenteFamiliar.$touch()"
                                :error-messages="errorReferenteFamiliar"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-combobox
                                v-model="telefonos.parentesco"
                                :items="itemParentesco"
                                label="Parentesco"
                                @input="$v.telefonos.parentesco.$touch()"
                                @blur="$v.telefonos.parentesco.$touch()"
                                :error-messages="errorParentesco"
                              ></v-combobox>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field
                                v-model="telefonos.numero"
                                label="Número Telefonico"
                                color="#009900"
                                @input="$v.telefonos.numero.$touch()"
                                @blur="$v.telefonos.numero.$touch()"
                                :error-messages="errorTelefono"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="red" @click="cerrarTelefonosReferencia()">Cerrar</v-btn>
                        <v-btn color="success" @click="guardarTelefono">Añadir</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-row>
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
          <v-stepper-content step="2">
            <div class="container-user">
              <form>
                <!--aQUI ESTARA LO Q  CONTENDRA -->
                <h4>Ubigeo</h4>
                <v-row>
                  <v-col>
                    <v-autocomplete
                      :items="this.departamentos"
                      filled
                      dense
                      v-model="idDepartamento"
                      outlined
                      color="#009900"
                      label="Departamento"
                      item-text="nombreDepartamento"
                      item-value="idDepartamento"
                      @change="obtenerProvincias()"
                      @input="$v.idDepartamento.$touch()"
                      @blur="$v.idDepartamento.$touch()"
                      :error-messages="errorDepartamento"
                    ></v-autocomplete>
                  </v-col>
                  <v-col>
                    <v-autocomplete
                      :items="this.provincias"
                      filled
                      dense
                      outlined
                      color="#009900"
                      label="Provincia"
                      v-model="idProvincia"
                      item-text="nombreProvincia"
                      item-value="idProvincia"
                      @change="obtenerDistritos()"
                      @input="$v.idProvincia.$touch()"
                      @blur="$v.idProvincia.$touch()"
                      :error-messages="errorProvincia"
                    ></v-autocomplete>
                  </v-col>
                  <v-col>
                    <v-autocomplete
                      :items="this.distritos"
                      filled
                      dense
                      outlined
                      color="#009900"
                      label="Distrito"
                      v-model="residente.ubigeo"
                      @input="$v.residente.ubigeo.$touch()"
                      @blur="$v.residente.ubigeo.$touch()"
                      :error-messages="errorDistrito"
                      item-text="nombreDistrito"
                      item-value="idDistrito"
                    ></v-autocomplete>
                  </v-col>
                </v-row>

                <v-text-field
                  v-model="residente.juzgadoProcedencia"
                  outlined
                  @input="$v.residente.juzgadoProcedencia.$touch()"
                  @blur="$v.residente.juzgadoProcedencia.$touch()"
                  :error-messages="errorJuzgadoProcedencia"
                  label="Ingrese el Juzgado de Procedencia"
                  color="#009900"
                ></v-text-field>

                <v-row>
                  <v-col>
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
                          @input="$v.residente.fechaIngreso.$touch()"
                          @blur="$v.residente.fechaIngreso.$touch()"
                          :error-messages="errorFechaIngreso"
                          color="#009900"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="residente.fechaIngreso"
                        @input="datemenu1 = false"
                        locale="es-es"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="residente.estado"
                      outlined
                      readonly
                      @input="$v.residente.estado.$touch()"
                      @blur="$v.residente.estado.$touch()"
                      :error-messages="errorEstado"
                      label="Ingrese el Estado"
                      color="#009900"
                    ></v-text-field>
                    <!-- <v-select
                      :items="['En tratamiento']"
                      v-model="residente.estado"
                      outlined
                      @input="$v.residente.estado.$touch()"
                      @blur="$v.residente.estado.$touch()"
                      :error-messages="errorEstado"
                      label="Ingrese el Estado"
                      color="#009900"
                    ></v-select>-->
                  </v-col>
                </v-row>

                <v-textarea
                  v-model="residente.motivoIngreso"
                  outlined
                  @input="$v.residente.motivoIngreso.$touch()"
                  @blur="$v.residente.motivoIngreso.$touch()"
                  label="Ingrese el Motivo de Ingreso"
                  color="#009900"
                ></v-textarea>

                <v-select
                  :items="itemsFaseInicial"
                  label="Seleccione la fase inicial"
                  outlined
                  @change="RefrescarProgreso"
                  color="#009900" 
                ></v-select>

                <v-card style="margin-bottom: 20px;width:100%;padding:5px 5px;background-color:#EAEAEA">
                  <v-card-title
                    style="font-size:22px;padding: 10px 10px;"
                  >Progreso de fase inicial</v-card-title>
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
                      <v-col align="right"></v-col>
                    </v-row>
                  </v-card>
                  <!-- Cuerpo -->
                  <template v-if="residente.progreso.length > 0">
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
                            <span style="font-size:16px">
                              Nº{{ item.fase }} -
                              {{ item.nombre }}
                            </span>
                          </article>
                        </v-col>
                        <v-col :cols="3">
                          <article>
                            <span style="font-size:16px">
                              {{
                              convertDateFormat(item.fechaingreso)
                              }}
                            </span>
                          </article>
                        </v-col>
                        <v-col :cols="3">
                          <article>
                            <span style="font-size:16px">
                              {{
                              convertDateFormat(
                              item.fechafinalizacion
                              )
                              }}
                              <span
                                v-if="
                                            comprobarPrevicion(
                                              item.fechafinalizacion
                                            )
                                          "
                                style="margin-left:5px"
                              >(previsto)</span>
                            </span>
                          </article>
                        </v-col>
                        <v-col :cols="2">
                          <article>
                            <span style="font-size:16px">
                              {{
                              item.estado
                              }}
                            </span>
                          </article>
                        </v-col>
                        <v-col align="right">
                          <div style="margin-right:20px">
                            <v-btn
                              @click="eliminarProgreso(item.index)"
                              fab
                              x-small
                              dark
                              color="red"
                            >
                              <v-icon dark>mdi-minus</v-icon>
                            </v-btn>
                          </div>
                        </v-col>
                      </v-row>
                    </v-card>
                  </template>
                  <v-card v-if="errorFasesProgreso" color="red">
                    <v-card-text class="text-center" style="color: white">
                      Debe Ingresar la fase inicial de la residente
                      Obligatoriamente
                    </v-card-text>
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
                    <v-btn block @click="registrarResidente()" color="success">
                      <v-icon left>mdi-content-save-all-outline</v-icon>
                      <span>Registrar Residente</span>
                    </v-btn>
                  </v-col>
                </v-row>
              </form>
            </div>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-card-text>
  </v-card>
</template>

<script>
const m = moment();
import axios from "axios";
import Vuelidate from "vuelidate";
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import { mapMutations, mapState } from "vuex";
import {
  required,
  minLength,
  maxLength,
  email,
  helpers,
  numeric
} from "vuelidate/lib/validators";
import moment from "moment";
export default {
  data() {
    return {
      dialogTelefonoReferencial: false, ///abrir modal de numeros
      dialogProgresoFase: false, ///abrir modal de progreso
      datemenu: false, ///fecha de nacimiento
      datemenu1: false, ///fecha ingreso
      datemenu2: false, ///MODAL fecha ingreso
      datemenu3: false, ///MODAL fecha finalizacion
      step: 1,
      menu2: false,
      checkboxFechaFinalizacion: false,
      telefonos: { numero: "", referentefamiliar: "", parentesco: "" },
      itemsFaseInicial: [
          { text: 'Fase 1', value: 1 },
          { text: 'Fase 2', value: 2 },
          { text: 'Fase 3', value: 3 }
      ],
      progreso: {
        fase: { nombre: "Acogida", fase: 1 },
        fechaingreso: "",
        fechafinalizacion: "",
        estado: {}
      },
      itemFase: [
        { text: "Acogida", value: { nombre: "Acogida", fase: 1 } },
        { text: "Desarrollo", value: { nombre: "Desarrollo", fase: 2 } },
        { text: "Reinsercion", value: { nombre: "Reinsercion", fase: 4 } },
        { text: "Seguimiento", value: { nombre: "Seguimiento", fase: 3 } }
      ],
      itemEstado: [
        { text: "Inicio", value: { nombre: "Inicio", previcion: true } },
        { text: "Progreso", value: { nombre: "Progreso", previcion: true } },
        {
          text: "Finalizado",
          value: { nombre: "Finalizado", previcion: false }
        },
        {
          text: "En adopcion",
          value: { nombre: "En adopcion", previcion: true }
        }
      ],
      itemParentesco: ["Madre", "Padre", "Tio(a)", "Hermano(a)"],
      miFase: { nombre: "Acogida", fase: 1 },
      residente: {
        id: "",
        nombre: "",
        apellido: "",
        tipoDocumento: "",
        numeroDocumento: "",
        lugarNacimiento: "",
        ubigeo: "",
        juzgadoProcedencia: "",
        fechaNacimiento: "",
        sexo: "",
        telefonosReferencia: [],
        fechaIngreso: "",
        motivoIngreso: "",
        progreso: [],
        estado: "En tratamiento"
      },
      departamentos: [],
      provincias: [],
      distritos: [],
      idDepartamento: "",
      idProvincia: "",
      idDistrito: ""
    };
  },
  async created() {
    this.obtenerDepartamentos();
  },
  watch: {
    verificarPrevicion() {}
  },
  methods: {
    ...mapMutations(["setResidentes", "addResidente"]),
    obtenerFechaIniFin: function(prog) {
      var miprogreso = prog;
      var fechaingreso = miprogreso.fechaingreso;
      var fecha = "";
      if (miprogreso.fase.fase === 2) {
        fecha = moment(fechaingreso).add(1, "year").calendar();
      } else if (miprogreso.fase.fase === 3) {
        fecha = moment(fechaingreso).add(6, "month").calendar();
      } else {
        fecha = moment(fechaingreso).add(1, "year").calendar();
      }
      var date = fecha.split("/");
      miprogreso.fechafinalizacion = date[2] + "-" + date[1] + "-" + date[0];
      return miprogreso;
    },
    RefrescarProgreso(item) {
      if (item === 1) {
        this.residente.progreso = [];

        var fechaingreso = new Date();
        var fecha = "";
        if (miprogreso.fase.fase === 2) {
          fecha = moment(fechaingreso).add(1, "year").calendar();
        } else if (miprogreso.fase.fase === 3) {
          fecha = moment(fechaingreso).add(6, "month").calendar();
        } else {
          fecha = moment(fechaingreso).add(1, "year").calendar();
        }
        var date = fecha.split("/");
        miprogreso.fechafinalizacion = date[2] + "-" + date[1] + "-" + date[0];

        var prog1 = {
          fase: { nombre: "acogida", fase: 1 },
          fechaingreso: new Date(),
          fechafinalizacion: "",
          estado: "inicio"
        };
        
        let progreso = {
          fase: 1,
          nombre: "acogida",
          fechaingreso: prog1.fechaingreso,
          fechafinalizacion: this.prog1.fechafinalizacion,
          estado: this.prog1.estado.nombre.toLowerCase()
        };
        console.log(progreso);

        this.residente.progreso.push(progreso);
        console.log(this.residente.progreso);
      } else if (item === 2) {
        this.residente.progreso = [];
        //fase 1
        var prog1 = {
          fase: { nombre: "acogida", fase: 1 },
          fechaingreso: new Date(),
          fechafinalizacion: new Date(),
          estado: "omitido"
        };
        let progreso = {
          fase: prog1.fase.fase,
          nombre: prog1.fase.nombre.toLowerCase(),
          fechaingreso: prog1.fechaingreso,
          fechafinalizacion: prog1.fechafinalizacion,
          estado: prog1.estado.nombre.toLowerCase()
        };
        this.residente.progreso.push(progreso);

        //fase 2
        var prog2 = {
          fase: { nombre: "desarrollo", fase: 2 },
          fechaingreso: new Date(),
          fechafinalizacion: "",
          estado: "inicio"
        };
        prog2 = this.obtenerFechaIniFin(prog2);
        let progreso2 = {
          fase: prog2.fase.fase,
          nombre: prog2.fase.nombre.toLowerCase(),
          fechaingreso: prog2.fechaingreso,
          fechafinalizacion: prog2.fechafinalizacion,
          estado: prog2.estado.nombre.toLowerCase()
        };
        this.residente.progreso.push(progreso2);
        
      } else if (item === 3) {
        this.residente.progreso = [];

        //fase 1
        var prog1 = {
          fase: { nombre: "acogida", fase: 1 },
          fechaingreso: new Date(),
          fechafinalizacion: new Date(),
          estado: "omitido"
        };
        let progreso = {
          fase: prog1.fase.fase,
          nombre: prog1.fase.nombre.toLowerCase(),
          fechaingreso: prog1.fechaingreso,
          fechafinalizacion: prog1.fechafinalizacion,
          estado: prog1.estado.nombre.toLowerCase()
        };
        this.residente.progreso.push(progreso);
        
        //fase 2
        var prog2 = {
          fase: { nombre: "desarrollo", fase: 2 },
          fechaingreso: new Date(),
          fechafinalizacion: new Date(),
          estado: "omitido"
        };
        let progreso2 = {
          fase: prog2.fase.fase,
          nombre: prog2.fase.nombre.toLowerCase(),
          fechaingreso: prog2.fechaingreso,
          fechafinalizacion: prog2.fechafinalizacion,
          estado: prog2.estado.nombre.toLowerCase()
        };
        this.residente.progreso.push(progreso2);

        //fase 3
        var prog3 = {
          fase: { nombre: "reinsercion", fase: 3 },
          fechaingreso: new Date(),
          fechafinalizacion: "",
          estado: "inicio"
        };
        prog3 = this.obtenerFechaIniFin(prog3);
        let progreso3 = {
          fase: prog3.fase.fase,
          nombre: prog3.fase.nombre.toLowerCase(),
          fechaingreso: prog3.fechaingreso,
          fechafinalizacion: prog3.fechafinalizacion,
          estado: prog3.estado.nombre.toLowerCase()
        };
        this.residente.progreso.push(progreso3);
      }
    },
    moment: function() {
      return moment();
    },
    comprobarPrevicion(string) {
      var fechafinalizacion = string.split("T");

      var fechaActual = moment().format();
      fechaActual = fechaActual.split("T");

      var booleano = moment(fechafinalizacion[0]).isAfter(fechaActual[0]);
      // console.log("fechafinalizacion: "+ fechafinalizacion[0]);
      // console.log("fechaActual: "+fechaActual[0]);
      // console.log(booleano);
      return booleano;
    },
    testing3() {
      this.$v.$touch();
    },
    ///CERRAR DIALOGO
    cerrarDialogo() {
      this.usuario = this.limpiarResidente();
      this.$v.residente.$reset();
      this.step = 1;
      this.$emit("close-dialog-save");
    },
    //metodo limpiar residente
    limpiarResidente() {
      return {
        residente: {
          id: "",
          nombre: "",
          apellido: "",
          tipoDocumento: "",
          numeroDocumento: "",
          lugarNacimiento: "",
          ubigeo: "",
          juzgadoProcedencia: "",
          fechaNacimiento: "",
          sexo: "",
          telefonosReferencia: [],
          fechaIngreso: "",
          motivoIngreso: "",
          progreso: [],
          estado: ""
        }
      };
      ///funcion mensaje para mostrar el mensaje de error
    },
    async mensaje(icono, titulo, texto, footer) {
      await this.$swal({
        icon: icono,
        title: titulo,
        text: texto,
        footer: footer
      });
    },
    guardarTelefonosReferencia() {
      this.$v.residente.telefonosReferencia.$touch();
      if (!this.$v.residente.telefonosReferencia.$invalid) {
        this.$v.telefonos.$reset();
        this.dialogTelefonoReferencial = false;
      }
    },
    cerrarTelefonosReferencia() {
      this.$v.residente.telefonosReferencia.$reset();
      this.$v.telefonos.$reset();
      this.dialogTelefonoReferencial = false;
    },
    ////GUARDAR TELEFONO REFERENTE ///
    guardarTelefono() {
      this.$v.telefonos.$touch();
      if (
        !this.$v.telefonos.$invalid &&
        this.residente.telefonosReferencia.length <= 3
      ) {
        let telefonos = {
          numero: this.telefonos.numero,
          referentefamiliar: this.telefonos.referenteFamiliar,
          parentesco: this.telefonos.parentesco
        }; //creamos variables

        this.residente.telefonosReferencia.push(telefonos); //añadimos al arreglo principal

        this.telefonos.numero = "";
        this.telefonos.referenteFamiliar = "";
        this.telefonos.parentesco = "";
        !this.$v.telefonos.$reset();
        this.cerrarTelefonosReferencia();
      }
    },
    eliminarTelefono(index) {
      this.residente.telefonosReferencia.splice(index, 1); ////eliminar elementos de un arreglo el primer numero es para que elimine la posicion  , el segundo es para ver la cantidad de elementos  a eliminar  en este caso 1
    }, ////GUARDAR PROGRESO DEL modal ///

    guardarProgreso() {
      if (!this.checkboxFechaFinalizacion) {
        var fechaingreso = this.progreso.fechaingreso;
        var fecha = "";
        if (this.progreso.fase.fase === 2) {
          fecha = moment(fechaingreso)
            .add(1, "year")
            .calendar();
        } else if (this.progreso.fase.fase === 3) {
          fecha = moment(fechaingreso)
            .add(6, "month")
            .calendar();
        } else {
          fecha = moment(fechaingreso)
            .add(1, "year")
            .calendar();
        }
        console.log("entra: " + fechaingreso);
        console.log("sale: " + fecha);
        var date = fecha.split("/");
        this.progreso.fechafinalizacion =
          date[2] + "-" + date[1] + "-" + date[0];
      }
      this.$v.progreso.$touch();
      if (!this.$v.progreso.$invalid) {
        let progreso = {
          fase: this.progreso.fase.fase,
          nombre: this.progreso.fase.nombre.toLowerCase(),
          fechaingreso: this.progreso.fechaingreso,
          fechafinalizacion: this.progreso.fechafinalizacion,
          estado: this.progreso.estado.nombre.toLowerCase()
        }; //creamos variables
        this.residente.progreso.push(progreso); //añadimos al arreglo principal
        ///LIMPIAMOS LOS CAMPOS//
        this.progreso.fase = { nombre: "Acogida", fase: 1 };
        this.progreso.estado = "";
        this.progreso.fechafinalizacion = "";
        this.progreso.fechaingreso = "";
        //reiniciamos el estado de la validacion
        this.$v.progreso.$reset();
      } else {
        console.log("algo  mal");
      }
    },
    guardarFasesResidente() {
      this.$v.residente.progreso.$touch();
      if (!this.$v.residente.progreso.$invalid) {
        this.$v.progreso.$reset();
        this.dialogProgresoFase = false;
      }
    },
    cerrarFaseResidente() {
      this.$v.residente.progreso.$reset();
      this.$v.progreso.$reset();
      this.dialogProgresoFase = false;
    },
    eliminarProgreso(index) {
      this.residente.progreso.splice(index, 1); ////eliminar elementos de un arreglo el primer numero es para que elimine la posicion  , el segundo es para ver la cantidad de elementos  a eliminar  en este caso 1
    },
    ////////////HACER LA CONSULTA CON LA API  REGISTRAR
    async registrarResidente() {
      this.$v.residente.$touch();
      if (this.$v.residente.$invalid) {
        this.mensaje(
          "error",
          "..Oops",
          "Se encontraron errores en el formulario",
          "<strong>Verifique los campos Ingresados<strong>"
        );
      } else {
        this.residente.idcreador = "";
        this.residente.observaciones = "";
        this.residente.firma = {
          urlfirma: "",
          nombre: "",
          cargo: ""
        };
        console.log(this.residente);
        await axios
          .post("/Residente", this.residente)
          .then(res => {
            var info = {
              apellido: res.data.apellido,
              estado: res.data.estado,
              fechaIngreso: res.data.fechaIngreso.split("T")[0],
              fechaNacimiento: res.data.fechaNacimiento.split("T")[0],
              id: res.data.id,
              juzgadoProcedencia: res.data.juzgadoProcedencia,
              lugarNacimiento: res.data.lugarNacimiento,
              motivoIngreso: res.data.motivoIngreso,
              nombre: res.data.nombre,
              numeroDocumento: res.data.numeroDocumento,
              progreso: res.data.progreso,
              sexo: res.data.sexo,
              telefonosReferencia: res.data.telefonosReferencia,
              tipoDocumento: res.data.tipoDocumento,
              ubigeo: res.data.ubigeo
            };
            this.addResidente(info);
            this.cerrarDialogo();
          })
          .catch(err => console.log(err));
        await this.mensaje(
          "success",
          "listo",
          "Regidente registrado Satisfactoriamente",
          "<strong>Se redirigira a la Interfaz de Gestion<strong>"
        );
      }
    },
    convertDateFormat(string) {
      var dateMongo = string.split("T");
      var date = dateMongo[0].split("-");
      return date[2] + "/" + date[1] + "/" + date[0];
    },
    async obtenerDepartamentos() {
      await axios
        .get("/ubigeo/allDepartamentos")
        .then(res => {
          var info = {};
          info = res.data;
          this.departamentos = res.data;
        })
        .catch(err => console.log(err));
    },
    async obtenerProvincias() {
      await axios
        .get(`/ubigeo/provincias/departamento/${this.idDepartamento}`)
        .then(res => {
          var info = {};
          info = res.data;
          this.provincias = res.data;
        })
        .catch(err => console.log(err));
    },
    async obtenerDistritos() {
      await axios
        .get(`/ubigeo/distritos/provincia/${this.idProvincia}`)
        .then(res => {
          var info = {};
          info = res.data;
          this.distritos = res.data;
        })
        .catch(err => console.log(err));
    }
  },
  computed: {
    ///validaciones
    ...mapState(["residentes"]),
    verifyColor() {
      return "red";
    },
    verificarPrevicion() {
      if (this.progreso.estado.previcion === false) {
        this.checkboxFechaFinalizacion = true;
      } else {
        this.checkboxFechaFinalizacion = false;
      }
    },
    errorNombre() {
      const errors = [];
      if (!this.$v.residente.nombre.$dirty) return errors;
      !this.$v.residente.nombre.required &&
        errors.push("Debe ingresar un Nombre Obligatoriamente");
      !this.$v.residente.nombre.minLength &&
        errors.push("El Nombre debe tener al menos 3 caracteres");
      return errors;
    },
    errorApellido() {
      const errors = [];
      if (!this.$v.residente.apellido.$dirty) return errors;
      !this.$v.residente.apellido.required &&
        errors.push("Debe ingresar un Apellido Obligatoriamente");
      !this.$v.residente.apellido.minLength &&
        errors.push("El apellido debe tener al menos 3 caracteres");
      return errors;
    },

    errorTipoDocumento() {
      const errors = [];
      if (!this.$v.residente.tipoDocumento.$dirty) return errors;
      !this.$v.residente.tipoDocumento.required &&
        errors.push("Debe seleccionar el Tipo de Documento Obligatoriamente");
      return errors;
    },
    errorNumeroDocumento() {
      const errors = [];
      if (!this.$v.residente.numeroDocumento.$dirty) return errors;
      !this.$v.residente.numeroDocumento.required &&
        errors.push("Debe ingresar el Numero de Documento Obligatoriamente");
      !this.residente.tipoDocumento != "" &&
        errors.push("Debe seleccionar el Tipo de Documento Inicialmente");
      if (this.residente.tipoDocumento == "DNI") {
        !/^[0-9]{8}$/.test(this.residente.numeroDocumento) != false &&
          errors.push("El Numero de DNI debe poseer 8 digitos numericos");
      }
      if (this.residente.tipoDocumento == "Pasaporte") {
        !/^(?!^0+$)[a-zA-Z0-9]{3,20}$/.test(this.residente.numeroDocumento) !=
          false &&
          errors.push(
            "El Numero de Pasaporte debe poseer de 3 a 20 caracteres alfanumericos"
          );
      }
      if (this.residente.tipoDocumento == "Carnet Extranjeria") {
        !/^[0-9]{9}$/.test(this.residente.numeroDocumento) != false &&
          errors.push(
            "El Numero del Carnet de Extranjeria debe poseer 9 digitos numericos"
          );
      }
      return errors;
    },
    errorLugarNacimiento() {
      const errors = [];
      if (!this.$v.residente.lugarNacimiento.$dirty) return errors;
      !this.$v.residente.lugarNacimiento.required &&
        errors.push("Debe ingresar un Lugar de Nacimiento Obligatoriamente");
      !this.$v.residente.lugarNacimiento.minLength &&
        errors.push("El Lugar de Nacimiento debe tener al menos 3 caracteres");
      return errors;
    },
    errorDepartamento() {
      const errors = [];
      if (!this.$v.idDepartamento.$dirty) return errors;
      !this.$v.idDepartamento.required &&
        errors.push("Debe seleccionar el departamento obligatoriamente");
      return errors;
    },
    errorProvincia() {
      const errors = [];
      if (!this.$v.idProvincia.$dirty) return errors;
      !this.$v.idProvincia.required &&
        errors.push("Debe seleccionar la provincia obligatoriamente");
      return errors;
    },
    errorDistrito() {
      const errors = [];
      if (!this.$v.residente.ubigeo.$dirty) return errors;
      !this.$v.residente.ubigeo.required &&
        errors.push("Debe seleccionar el distrito obligatoriamente");
      return errors;
    },
    errorJuzgadoProcedencia() {
      const errors = [];
      if (!this.$v.residente.juzgadoProcedencia.$dirty) return errors;
      !this.$v.residente.juzgadoProcedencia.required &&
        errors.push("Debe ingresar un Juzgado de Procedencia Obligatoriamente");
      !this.$v.residente.juzgadoProcedencia.minLength &&
        errors.push(
          "El Juzgado de Procedencia debe tener al menos 3 caracteres"
        );
      return errors;
    },
    errorFechaNacimiento() {
      const errors = [];
      if (!this.$v.residente.fechaNacimiento.$dirty) return errors;
      !this.$v.residente.fechaNacimiento.required &&
        errors.push("Debe Ingresar una Fecha de Nacimiento Obligatoriamente");
      //validating whether the user are an adult
      var dateselected = new Date(this.residente.fechaNacimiento);
      var maxdate = new Date();
      maxdate.setFullYear(maxdate.getFullYear() - 12);
      !(dateselected.getTime() <= maxdate.getTime()) &&
        errors.push("El residente debe tener por lo menos 12 años");

      return errors;
    },
    errorTipoSexo() {
      const errors = [];
      if (!this.$v.residente.sexo.$dirty) return errors;
      !this.$v.residente.sexo.required &&
        errors.push("Debe seleccionar un Sexo");
      return errors;
    },
    errorEstado() {
      const errors = [];
      if (!this.$v.residente.estado.$dirty) return errors;
      !this.$v.residente.estado.required &&
        errors.push("Debe ingresar el  Estado Obligatoriamente");
      !this.$v.residente.estado &&
        errors.push("El Estado debe tener al menos 3 caracteres");
      return errors;
    },
    errorFechaIngreso() {
      const errors = [];
      if (!this.$v.residente.fechaIngreso.$dirty) return errors;
      !this.$v.residente.fechaIngreso.required &&
        errors.push("Debe Ingresar una Fecha de Nacimiento Obligatoriamente");
      //validating whether the user are an adult
      var dateselected = new Date(this.residente.fechaIngreso);
      var maxdate = new Date();
      maxdate.setFullYear(maxdate.getFullYear());
      !(dateselected.getTime() <= maxdate.getTime()) &&
        errors.push("La fecha debe ser de hoy");

      return errors;
    },
    //Validaciones Telefono
    errorReferenteFamiliar() {
      const errors = [];
      if (!this.$v.telefonos.referenteFamiliar.$dirty) return errors;
      !this.$v.telefonos.referenteFamiliar.required &&
        errors.push("Debe ingresar un Referente Familiar Obligatoriamente");
      !this.$v.telefonos.referenteFamiliar.minLength &&
        errors.push("El Referente Familiar deben tener al menos 3 caracteres");
      return errors;
    },
    errorParentesco() {
      const errors = [];
      if (!this.$v.telefonos.parentesco.$dirty) return errors;
      !this.$v.telefonos.parentesco.required &&
        errors.push("Debe ingresar el parentesco obligatoriamente");
      return errors;
    },
    errorTelefono() {
      const errors = [];
      if (!this.$v.telefonos.numero.$dirty) return errors;
      !this.$v.telefonos.numero.required &&
        errors.push("Debe ingresar un Numero Obligatoriamente");
      !this.$v.telefonos.numero.minLength &&
        errors.push("El telefono debe tener 9 caracteres");
      !this.$v.telefonos.numero.maxLength &&
        errors.push("El telefono debe tener 9 caracteres");
      !this.$v.telefonos.numero.numeric &&
        errors.push("Debe Ingresar valores Numericos");
      return errors;
    },
    errorTelefonosReferenciales() {
      return this.$v.residente.telefonosReferencia.required == false &&
        this.$v.residente.telefonosReferencia.$dirty == true
        ? true
        : false;
    },
    //Validaciones del Progreso
    errorFase() {
      const errors = [];
      if (!this.$v.progreso.fase.$dirty) return errors;
      !this.$v.progreso.fase.required &&
        errors.push("Debe seleccionar una fase Obligatoriamente");
      return errors;
    },
    errorFechaIngresoProgreso() {
      const errors = [];
      if (!this.$v.progreso.fechaingreso.$dirty) return errors;
      !this.$v.progreso.fechaingreso.required &&
        errors.push("Debe Ingresar una fecha de Inicio Obligatoriamente");
      return errors;
    },
    errorFechaFinalizacionProgreso() {
      const errors = [];
      if (!this.$v.progreso.fechafinalizacion.$dirty) return errors;
      !this.$v.progreso.fechafinalizacion.required &&
        errors.push("Debe Ingresar una fecha de Inicio Obligatoriamente");
      return errors;
    },
    errorEstadoProgreso() {
      const errors = [];
      if (!this.$v.progreso.estado.$dirty) return errors;
      !this.$v.progreso.estado.required &&
        errors.push("Debe Seleccionar un Estado Obligatoriamente");
      return errors;
    },
    errorFasesProgreso() {
      return this.$v.residente.progreso.required == false &&
        this.$v.residente.progreso.$dirty == true
        ? true
        : false;
    }
  },
  validations() {
    return {
      residente: {
        nombre: {
          required,
          minLength: minLength(3)
        },
        apellido: {
          required,
          minLength: minLength(3)
        },
        tipoDocumento: {
          required
        },
        numeroDocumento: {
          required
        },
        lugarNacimiento: {
          required,
          minLength: minLength(4)
        },
        ubigeo: {
          required
        },
        juzgadoProcedencia: {
          required,
          minLength: minLength(3)
        },
        fechaNacimiento: {
          required
        },
        sexo: {
          required
        },
        telefonosReferencia: {
          required,
          //minLength: minLength(1),
          $each: {
            numero: {
              required,
              minLength: minLength(9)
            },
            referentefamiliar: {
              required,
              minLength: minLength(4)
            },
            parentesco: {
              required
            }
          }
        },
        fechaIngreso: {
          required
        },
        motivoIngreso: {},
        progreso: {
          required,
          //minLength: minLength(1),
          $each: {
            fase: {
              required
            },
            fechaingreso: {
              required
            },
            fechafinalizacion: {
              required
            },
            estado: {
              required
            }
          }
        },
        estado: {
          required,
          minLength: minLength(4)
        }
      },
      telefonos: {
        numero: {
          required,
          minLength: minLength(9),
          maxLength: maxLength(9),
          numeric
        },
        referenteFamiliar: {
          required,
          minLength: minLength(4)
        },
        parentesco: {
          required
        }
      },
      progreso: {
        fase: { required },
        fechaingreso: { required },
        fechafinalizacion: { required },
        estado: { required }
      },
      idDepartamento: {
        required
      },
      idProvincia: {
        required
      }
    };
  }
};
</script>

<style>
.swal2-container {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif !important;
}
</style>
