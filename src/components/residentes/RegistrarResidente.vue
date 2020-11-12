<template>
  <v-card>
    <v-card-title class="justify-center">Registro de Residentes</v-card-title>

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
      <!--COMIENZA LA PLANTILLA DEL STEPER -->
      <v-stepper-items>
        <v-stepper-content step="1">
          <div class="container-user">
            <form>
              <!--aQUI ESTARA LO Q  CONTENDRA -->

              <v-text-field
                v-model="residente.nombre"
                @input="$v.residente.nombre.$touch()"
                @blur="$v.residente.nombre.$touch()"
                :error-messages="errorNombre"
                label="Ingrese el nombre"
                color="#009900"
              ></v-text-field>
              <v-text-field
                v-model="residente.apellido"
                @input="$v.residente.apellido.$touch()"
                @blur="$v.residente.apellido.$touch()"
                :error-messages="errorApellido"
                label="Ingrese el apellido"
                color="#009900"
              ></v-text-field>
              <v-select
                :items="['Masculino', 'Femenino', 'mucho']"
                label="Ingrese el Sexo"
                dense
                outlined
                v-model="residente.sexo"
                @input="$v.residente.sexo.$touch()"
                @blur="$v.residente.sexo.$touch()"
                :error-messages="errorTipoSexo"
                color="#009900"
              ></v-select>
              <!--  Fecha nacimeinto-->
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
                    v-bind="attrs"
                    v-on="on"
                    @input="$v.residente.fechaNacimiento.$touch()"
                    @blur="$v.residente.fechaNacimiento.$touch()"
                    :error-messages="errorFechaNacimiento"
                    color="#009900"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="residente.fechaNacimiento"
                  @input="menu2 = false"
                  locale="es-es"
                ></v-date-picker> </v-menu
              ><!--  -->
              <v-select
                :items="['DNI', 'Pasaporte', 'Carnet Extranjeria']"
                label="Ingrese el Tipo de Documento"
                dense
                outlined
                v-model="residente.tipoDocumento"
                @input="$v.residente.tipoDocumento.$touch()"
                @blur="$v.residente.tipoDocumento.$touch()"
                :error-messages="errorTipoDocumento"
                color="#009900"
              ></v-select>
              <v-text-field
                v-model="residente.numeroDocumento"
                @input="$v.residente.numeroDocumento.$touch()"
                @blur="$v.residente.numeroDocumento.$touch()"
                :error-messages="errorNumeroDocumento"
                label="Ingrese el  N°documento"
                color="#009900"
              ></v-text-field>
              <v-text-field
                v-model="residente.lugarNacimiento"
                @input="$v.residente.lugarNacimiento.$touch()"
                @blur="$v.residente.lugarNacimiento.$touch()"
                :error-messages="errorLugarNacimiento"
                label="Ingrese el Lugar de Nacimiento"
                color="#009900"
              ></v-text-field>
              <!--Formulario para agregar telefonos -->
              <v-row justify="center">
                <v-dialog v-model="dialog" persistent max-width="600px">
                  <template v-slot:activator="{ on }">
                    <v-btn color="primary" v-on="on">
                      Registrar Telefono
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="headline">Registrar Telefonos</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="telefonos.numero"
                              label="Ingrese el Referente Familiar"
                              color="#009900"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="telefonos.referenteFamiliar"
                              label="Ingrese el numero"
                              color="#009900"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-btn color="success" @click="guardarTelefono">
                              añadir
                            </v-btn>
                          </v-col>
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
                                    <v-btn
                                      fab
                                      x-small
                                      dark
                                      color="red"
                                      @click="eliminarTelefono(item.index)"
                                    >
                                      <v-icon dark>
                                        mdi-minus
                                      </v-icon>
                                    </v-btn>
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
                      <v-btn color="blue darken-1" text @click="dialog = false">
                        Guardar
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>
              <!--botones -->
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
              <!--aQUI ESTARA LO Q  CONTENDRA -->
              <v-text-field
                v-model="residente.ubigeo"
                @input="$v.residente.ubigeo.$touch()"
                @blur="$v.residente.ubigeo.$touch()"
                :error-messages="errorUbigeo"
                label="Ingrese el Ubigeo"
                color="#009900"
              ></v-text-field>
              <v-text-field
                v-model="residente.juzgadoProcedencia"
                @input="$v.residente.juzgadoProcedencia.$touch()"
                @blur="$v.residente.juzgadoProcedencia.$touch()"
                :error-messages="errorJuzgadoProcedencia"
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
                  @input="menu2 = false"
                  locale="es-es"
                ></v-date-picker> </v-menu
              ><!--acabo  -->

              <v-textarea
                v-model="residente.motivoIngreso"
                @input="$v.residente.motivoIngreso.$touch()"
                @blur="$v.residente.motivoIngreso.$touch()"
                label="Ingrese el Motivo de Ingreso"
                color="#009900"
              ></v-textarea>

              <!--------AQUI esta  EL cuadro de progreso -->
              <v-row justify="center">
                <v-dialog v-model="dialog1" persistent max-width="850px">
                  <template v-slot:activator="{ on }">
                    <v-btn color="primary" v-on="on">
                      Registrar Progreso
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="headline">Registrar Progreso</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
<<<<<<< HEAD
                      
                         
                           <v-select
                                
                                :items="itemFase"
                                label="Ingrese  la fase"
                                dense
                                outlined
                                v-model="miFase"
                                color="#009900"
                                
                           ></v-select>

                            <v-select
                                :items="['Inicio','Progreso','Finalizado','En   adopcion']"
                                label="Ingrese el estado"
                                dense
                                outlined
                                v-model="progreso.estado"
                                color="#009900"
                            ></v-select>
                           
                            <br>
=======
                        <v-row>
                          <v-text-field
                            v-model="progreso.fase"
                            label="Ingrese la fase"
                            color="#009900"
                          ></v-text-field>

                          <v-text-field
                            v-model="progreso.estado"
                            label="Ingrese el Estado"
                            color="#009900"
                          ></v-text-field>

>>>>>>> 45736b904582e6b14c5f16e37807161644279166
                          <!--AQUI COMIENZAN LAS FECHAS INGRESO -->
                          <v-menu
                            v-model="datemenu2"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="progreso.fechaingreso"
                                label="Fecha de Ingreso"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                color="#009900"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="progreso.fechaingreso"
                              @input="menu2 = false"
                              locale="es-es"
                            ></v-date-picker>
                          </v-menu>
                          <!--acabo  -->
                          <!--FECHA INGRESO -->
                          <v-menu
                            v-model="datemenu3"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="progreso.fechafinalizacion"
                                label="Fecha de finalizacion"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                color="#009900"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="progreso.fechafinalizacion"
                              @input="menu2 = false"
                              locale="es-es"
                            ></v-date-picker>
                          </v-menu>
                          <!--acabo  -->

                          <v-col cols="12" sm="6" md="4">
                            <v-btn color="success" @click="guardarProgreso">
                              añadir
                            </v-btn>
                          </v-col>
                          <!--En esta parte se muestra Mostrar Cuadro -->
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
                        <v-btn
                        @click="eliminarProgreso(item.index)"
                        fab x-small 
                        dark
                         color="red"  > 
                          <v-icon dark>
                            mdi-minus
                          </v-icon>
                        </v-btn>
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
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="dialog1 = false"
                      >
                        Guardar
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>

              <!--Aqui acaba -->
              <v-text-field
                v-model="residente.estado"
                @input="$v.residente.estado.$touch()"
                @blur="$v.residente.estado.$touch()"
                :error-messages="errorEstado"
                label="Ingrese el Estado"
                color="#009900"
              ></v-text-field>

              <!--botones -->
              <v-row>
                <v-col>
                  <v-btn block @click="registrarResidente" color="success">
                    <v-icon left>mdi-content-save-all-outline</v-icon>
                    <span>Registrar Residente</span>
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
import axios from "axios";
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import { mapMutations, mapState } from "vuex";
import { required, minLength, email, helpers } from "vuelidate/lib/validators";
import moment from "moment";
export default {
  data() {
    return {
      dialog: false, ///abrir modal de numeros
      dialog1: false, ///abrir modal de progreso
      datemenu: false, ///fecha de nacimiento
      datemenu1: false, ///fecha ingreso
      datemenu2: false, ///MODAL fecha ingreso
      datemenu3: false, ///MODAL fecha finalizacion
      step: 1,

      telefonos: { numero: "", referentefamiliar: "" },
      progreso: {
        fase: "",
        fechaingreso: "",
        fechafinalizacion: "",
        estado: "",
      },
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
        telefonosReferencia: [
          {
            numero: "",
            referentefamiliar: "",
          },
        ],
        fechaIngreso: "",
        motivoIngreso: "",
        progreso: [
          {
            fase: 0,
            fechaingreso: "",
            fechafinalizacion: "",
            estado: "",
          },
        ],
        estado: "",
      },
    };
  },
  created() {},
  methods: {
    ...mapMutations(["setResidentes", "addResidente"]),
    //METODO MEMENT
    moment: function () {
    return moment();
    },
    ///CERRAR DIALOGO
    cerrarDialogo() {
      this.usuario = this.limpiarResidente();
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
          fechaNacimiento: Date,
          sexo: "",
          telefonosReferencia: [
            {
              numero: "",
              referentefamiliar: "",
            },
          ],
          fechaIngreso: Date,
          motivoIngreso: "",
          progreso: [
            {
              fase: 0,
              fechaingreso: Date,
              fechafinalizacion: Date,
              estado: "",
            },
          ],
          estado: "",
        },
      };
      ///funcion mensaje para mostrar el mensaje de error
    },
    async mensaje(icono, titulo, texto, footer) {
      await this.$swal({
        icon: icono,
        title: titulo,
        text: texto,
        footer: footer,
      });
    },
    ////GUARDAR TELEFONO REFERENTE ///
    guardarTelefono() {
      let telefonos = {
        numero: this.telefonos.numero,
        referentefamiliar: this.telefonos.referenteFamiliar,
      }; //creamos variables
      this.residente.telefonosReferencia.push(telefonos); //añadimos al arreglo principal
      ///LIMPIAMOS LOS CAMPOS//
      console.log(this.residente.telefonosReferencia);
      this.telefonos.numero = "";
      this.telefonos.referenteFamiliar = "";
    },
    eliminarTelefono(index) {
      this.residente.telefonosReferencia.splice(index, 1); ////eliminar elementos de un arreglo el primer numero es para que elimine la posicion  , el segundo es para ver la cantidad de elementos  a eliminar  en este caso 1
    }, ////GUARDAR PROGRESO DEL modal ///
    guardarProgreso() {
      let progreso = {
        fase: this.progreso.fase,
        fechaingreso: this.progreso.fechaingreso,
        fechafinalizacion: this.progreso.fechafinalizacion,
        estado: this.progreso.estado,
      }; //creamos variables
      console.log(this.residente);

      this.residente.progreso.push(progreso); //añadimos al arreglo principal
      ///LIMPIAMOS LOS CAMPOS//
      console.log(this.residente.progreso);
      this.progreso.fase = "";
      this.progreso.estado = "";
    },
    eliminarProgreso(index) {
      this.residente.progreso.splice(index, 1); ////eliminar elementos de un arreglo el primer numero es para que elimine la posicion  , el segundo es para ver la cantidad de elementos  a eliminar  en este caso 1
    },
    ////////////HACER LA CONSULTA CON LA API  REGISTRAR
    async registrarResidente() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log("hay errores");
        this.mensaje(
          "error",
          "..Oops",
          "Se encontraron errores en el formulario",
          "<strong>Verifique los campos Ingresados<strong>"
        );
      } else {
        console.log("no hay errores");
        console.warn(this.residente);
        await axios
          .post("/Residente", this.residente)
          .then((res) => {
            this.residente = res.data;
            this.addResidente(this.residente);
            this.cerrarDialogo();
          })
          .catch((err) => console.log(err));
        await this.mensaje(
          "success",
          "listo",
          "Usuario registrado Satisfactoriamente",
          "<strong>Se redirigira a la Interfaz de Gestion<strong>"
        );
      }
    },
  },

  computed: {
    ///validaciones
    ...mapState(["residentes"]),
    verifyColor() {
      return "red";
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
    errorUbigeo() {
      const errors = [];
      if (!this.$v.residente.ubigeo.$dirty) return errors;
      !this.$v.residente.ubigeo.required &&
        errors.push("Debe ingresar un Lugar de Nacimiento Obligatoriamente");
      !this.$v.residente.ubigeo.minLength &&
        errors.push("El Lugar de Nacimiento debe tener al menos 3 caracteres");
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
      maxdate.setFullYear(maxdate.getFullYear() - 18);
      !(dateselected.getTime() <= maxdate.getTime()) &&
        errors.push("El usuario debe ser mayor de edad");

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
  },
  validations() {
    return {
      residente: {
        nombre: {
          required,
          minLength: minLength(3),
        },
        apellido: {
          required,
          minLength: minLength(3),
        },
        tipoDocumento: {
          required,
        },
        numeroDocumento: {
          required,
        },
        lugarNacimiento: {
          required,
          minLength: minLength(4),
        },
        ubigeo: {
          required,
          minLength: minLength(4),
        },
        juzgadoProcedencia: {
          required,
          minLength: minLength(4),
        },
        fechaNacimiento: {
          required,
        },
        sexo: {
          required,
        },
        telefonosReferencia: [
          {
            numero: {
              required,
              minLength: minLength(9),
            },
            referentefamiliar: {
              required,
              minLength: minLength(4),
            },
          },
        ],
        fechaIngreso: {
          required,
        },
        motivoIngreso: {},
        progreso: [],
        estado: {
          required,
          minLength: minLength(4),
        },
      },
    };
  },
};
</script>

<style></style>
