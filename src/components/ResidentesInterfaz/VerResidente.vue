<template>
  <v-card>
    <v-card-title class="justify-center">Ver Residentes</v-card-title>
    <v-card-text>
    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step editable step="1"> Datos Generales </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step editable step="2"> Datos Especificos </v-stepper-step>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content step="1">
          <div class="container-user">
            <form style="margin-top: 15px">
                <v-text-field
                  v-model.trim="residente.nombre"
                  label="Ingrese el nombre"
                  outlined
                  color="#009900"
                  readonly
                ></v-text-field>
                <v-text-field
                  v-model.trim="residente.apellido"
                  label="Ingrese el apellido"
                  outlined
                  color="#009900"
                  readonly
                ></v-text-field>
               <v-row>
                  <v-col>
                    <v-select
                      :items="['Masculino', 'Femenino']"
                      label="Ingrese el Sexo"
                      outlined
                      v-model="residente.sexo"
                      readonly
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
                        ></v-text-field>
                      </template>
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
                      readonly
                      color="#009900"
                    ></v-select>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="residente.numeroDocumento"
                      outlined
                      readonly
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
                  readonly
                ></v-text-field>
              <!--NUMEROS TELEFONO -->
                <v-card style="padding:5px;margin:40px 0 18px 0;background-color:#EAEAEA">
                  <v-card-title>
                    <v-row>
                      <v-col :cols="8">Telefono de referencia</v-col>
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
                    >No se ha registrado ningún telefono de referencia</v-alert>
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
                    </v-row>
                  </v-card>
                </v-card>
              <!--FIN NUMEROS TELEFONO -->
              <!--PROGRESO RESIDENTE -->
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
                    readonly
                  >
                  </v-autocomplete>
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
                    readonly
                  >
                  </v-autocomplete>
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
                    readonly
                    item-text="nombreDistrito"
                    item-value="idDistrito"
                  >
                  </v-autocomplete>
                </v-col>
              </v-row>

              <v-text-field
                  v-model="residente.juzgadoProcedencia"
                  outlined
                  readonly
                  label="Ingrese el Juzgado de Procedencia"
                  color="#009900"
              ></v-text-field>
              <!--FECHA INGRESO -->
                <v-row>
                  <v-col>
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
                    v-model="residente.fechaIngreso"
                    label="Fecha de Ingreso"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    color="#009900"
                  ></v-text-field>
                </template>
              </v-menu>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="residente.estado"
                      outlined
                      readonly
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
                <!--acabo  -->

              <v-textarea
                v-model="residente.motivoIngreso"
                readonly
                label="Ingrese el Motivo de Ingreso"
                color="#009900"
              ></v-textarea>
                <v-select
                  v-model="numerofase"
                  :items="itemsFaseInicial"
                  label="Fase actual"
                  outlined
                  readonly
                  color="#009900" 
                ></v-select>    
              <!--------AQUI esta  EL cuadro de progreso -->
                <v-card style="margin-bottom: 20px;width:100%;padding:5px 5px;background-color:#EAEAEA">
                  <v-card-title
                    style="font-size:22px;padding: 10px 10px;"
                  >Progreso de fase</v-card-title>
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
                              {{ item.fechaingreso }}
                            </span>
                          </article>
                        </v-col>
                        <v-col :cols="3">
                          <article>
                            <span style="font-size:16px">
                              {{ item.fechafinalizacion }}
                              <span
                                v-if=" comprobarPrevicion( item.fechafinalizacion ) "
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
                      </v-row>
                    </v-card>
                  </template>
                </v-card>
              <!--Aqui acaba -->
              <v-row>
                <!-- termina le texto -->
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
import moment from "moment";
export default {
  props: ["idresidente"],
  data() {
    return {
      numerofase: 1,
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
    this.residente = await this.loadResidenteDetalle(this.idresidente);
    await this.obtenerUbigeo();    
    await this.obtenerDepartamentos();
    this.numerofase = this.residente.progreso[this.residente.progreso.length - 1].fase;
    for (var i = 0; i < this.residente.progreso.length; i++) {
       this.residente.progreso[i].fechaingreso = this.residente.progreso[i].fechaingreso.split("T")[0];
       this.residente.progreso[i].fechafinalizacion = this.residente.progreso[i].fechafinalizacion.split("T")[0];
    }; 
    console.log(this.numerofase);
  },
   watch: {
    verificarPrevicion() {}
  },
  methods: {
    async loadResidenteDetalle(idresidente) {
      var user = {};
      await axios
        .get("/residente/id?id=" + idresidente)
        .then((res) => {
          console.log(res);
          user = res.data;
          user.fechaNacimiento = user.fechaNacimiento.split("T")[0];
          user.fechaIngreso = user.fechaIngreso.split("T")[0];
        })
        .catch((err) => console.log(err));
      console.log(user);     
      return user;
    },
    async obtenerDepartamentos() {
      await axios
        .get("/ubigeo/allDepartamentos")
        .then((res) => {
          var info = {};
          info = res.data;
          this.departamentos = res.data;
          console.log("departamentos");
          console.log(this.departamentos);
          this.obtenerProvincias();
        })
        .catch((err) => console.log(err));
    },
    async obtenerProvincias() {
      await axios
        .get(`/ubigeo/provincias/departamento/${this.idDepartamento}`)
        .then((res) => {
          var info = {};
          info = res.data;
          console.log(res.data);
          this.provincias = res.data;
          this.obtenerDistritos();
        })
        .catch((err) => console.log(err));
    },
    async obtenerDistritos() {
      await axios
        .get(`/ubigeo/distritos/provincia/${this.idProvincia}`)
        .then((res) => {
          var info = {};
          info = res.data;
          this.distritos = res.data;
        })
        .catch((err) => console.log(err));
    },    
    async obtenerUbigeo() {
      console.log("distrito");
      console.log(this.residente.ubigeo);
      await axios
        .get(`/ubigeo/idDistrito?idDistrito=${this.residente.ubigeo}`)
        .then((res) => {
          var info = {};
          info = res.data;
          this.distrito = res.data;
          console.log(this.distrito);
          this.residente.ubigeo = res.data.idDistrito;
          this.idDepartamento = res.data.idDepartamento;
          this.idProvincia = res.data.idProvincia;
          this.obtenerProvincia();
        })
        .catch((err) => console.log(err));
      return true;
    },
    async obtenerProvincia() {
      await axios
        .get(`/ubigeo/idProvincia?idProvincia=${this.idProvincia}`)
        .then((res) => {
          var info = {};
          info = res.data;
          this.provincia = res.data;
          console.log(this.provincia);
        })
        .catch((err) => console.log(err));
    },
    comprobarPrevicion(fechafinalizacion) {
      //var fechafinalizacion = string.split("T");

      var fechaActual = moment().format();
      fechaActual = fechaActual.split("T");

      //var booleano = moment(fechafinalizacion[0]).isAfter(fechaActual[0]);
      var booleano = moment(fechafinalizacion).isAfter(fechaActual[0]);
      return booleano;
    },
    cerrarDialogo() {
      this.step = 1;
      this.$emit("close-dialog-save");
    },
    //metodo limpiar residente
    guardarTelefonosReferencia() {
      this.$v.residente.telefonosReferencia.$touch();
      if (!this.$v.residente.telefonosReferencia.$invalid) {
        this.$v.telefonos.$reset();
      }
    },
    cerrarTelefonosReferencia() {
      this.$v.residente.telefonosReferencia.$reset();
      this.$v.telefonos.$reset();
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
  },
  computed: {
    verificarPrevicion() {
      if (this.progreso.estado.previcion === false) {
        this.checkboxFechaFinalizacion = true;
      } else {
        this.checkboxFechaFinalizacion = false;
      }
    },
  },
}
</script>
<style>
.swal2-container {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif !important;
}
</style>