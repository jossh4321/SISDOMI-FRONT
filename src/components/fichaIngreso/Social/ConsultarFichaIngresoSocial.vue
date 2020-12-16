<template>
  <v-card>
    <v-card-title class="justify-center">Modificar Ficha de Ingreso Social</v-card-title>
    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step editable step="1">Residente y Familia</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step editable step="2">Vivienda</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step editable step="3">Económico y Salud</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step editable step="4">Legal</v-stepper-step>
      </v-stepper-header>
      <v-stepper-items>
        <!--Residente y Familiares-->
        <v-stepper-content step="1">
          <div class="container-user">
            <form style="margin-top: 10px;">
              <v-card style="margin-top:30px;padding:5px 5px;background-color:#EAEAEA">  
                <v-card-title>
                      Residentes Registrado
                </v-card-title>
                <v-card style="margin:10px;padding:10px" height="100px">
                  <v-row>
                    <v-col cols="6">
                      <v-text-field
                                    :value="obtenerResidente"
                                    label="Nombre del Residente"
                                    outlined
                                    color="info"
                                    readonly
                                  ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                                    :value="obtenerIdentificacion"
                                    label="Identificacion del Residente"
                                    outlined
                                    color="info"
                                    readonly
                                  ></v-text-field>
                    </v-col>
                    <v-col cols="2"></v-col>
                  </v-row>
                </v-card>
              </v-card>
              <v-row>
                <v-col>
                  <v-select
                    :items="itemFamilias"
                    v-model="fichaIngreso.contenido.familiar.tipofamilia"
                    label="Tipo de familia"
                    outlined
                    readonly
                  ></v-select>
                </v-col>
                <v-col>
                  <v-textarea
                    label="Problemática familiar"
                    v-model.trim="fichaIngreso.contenido.familiar.problematicafam"
                    outlined
                    color="#009900"
                    rows="1"
                    auto-grow
                    readonly
                  ></v-textarea>
                </v-col>
              </v-row>

              <v-card
                style="margin-top:1%;margin-bottom:1%;padding-bottom: 15px;background-color:#EAEAEA"
                >
                <v-chip
                  class="ma-2"
                  color="green"
                  text-color="white"
                >Motivo de ingreso</v-chip>
                <v-card
                  tile
                  elevation="0"
                  color="#FAFAFA"
                  style="margin:5px; margin-top: 20px;"
                  height="60"
                  v-for="(item, index) in fichaIngreso.contenido.familiar.motivoingreso"
                  :key="index"
                  >
                  <v-row style="margin-left:10px;heigh:100%" align="center">
                    <v-col :cols="10" align="left">
                      <span>Motivo de ingreso: {{ item }}</span>
                    </v-col>
                  </v-row>
                </v-card>
              </v-card>

              <v-card style="padding:5px;margin:40px 0 18px 0;background-color:#EAEAEA">
                <v-card-title>
                  <v-row>
                    <v-col :cols="8">Composición Familiar</v-col>
                    <v-col :cols="4" align="right">
                      <v-dialog v-model="dialogAgregarFamiliar" persistent max-width="600px">
                        <v-card align="center">
                          <v-card-title>
                            <span class="headline">Datos familiar</span>
                          </v-card-title>
                          <v-card-text>
                            <v-textarea
                              label="Nombres"
                              v-model="familiar.nombre"
                              outlined
                              color="#009900"
                              rows="1"
                              auto-grow
                              readonly
                            ></v-textarea>
                            <v-textarea
                              label="Apellidos"
                              v-model="familiar.apellido"
                              outlined
                              color="#009900"
                              rows="1"
                              auto-grow
                              readonly
                            ></v-textarea>
                            <v-row>
                              <v-col>
                                <v-textarea
                                  label="Nro. Documento"
                                  v-model="familiar.numerodocumento"
                                  outlined
                                  color="#009900"
                                  rows="1"
                                  auto-grow
                                  readonly
                                ></v-textarea>
                              </v-col>
                              <v-col>
                                <v-textarea
                                  label="Edad"
                                  v-model="familiar.edad"
                                  outlined
                                  color="#009900"
                                  rows="1"
                                  auto-grow
                                  readonly
                                ></v-textarea>
                              </v-col>
                            </v-row>
                            <v-row>
                              <v-col>
                                <v-textarea
                                  label="Parentesco"
                                  v-model="familiar.parentesco"
                                  outlined
                                  color="#009900"
                                  rows="1"
                                  auto-grow
                                  readonly
                                ></v-textarea>
                              </v-col>
                              <v-col>
                                <v-textarea
                                  label="Grado instrucción"
                                  v-model="familiar.gradoinstruccion"
                                  outlined
                                  color="#009900"
                                  rows="1"
                                  auto-grow
                                  readonly
                                ></v-textarea>
                              </v-col>
                            </v-row>
                            <v-row>
                              <v-col>
                                <v-textarea
                                  label="Ocupación"
                                  v-model="familiar.ocupacion"
                                  outlined
                                  color="#009900"
                                  rows="1"
                                  auto-grow
                                  readonly
                                ></v-textarea>
                              </v-col>
                              <v-col>
                                <v-textarea
                                  label="Estado civil"
                                  v-model="familiar.estadocivil"
                                  outlined
                                  color="#009900"
                                  rows="1"
                                  auto-grow
                                  readonly
                                ></v-textarea>
                              </v-col>
                            </v-row>

                            <v-textarea
                              label="Observaciones"
                              v-model="familiar.observaciones"
                              outlined
                              color="#009900"
                              rows="1"
                              auto-grow
                            ></v-textarea>
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="error" @click="cerrarAgregarFamiliar()">
                              <v-icon left class="mr-0 icon-plan">mdi-close</v-icon>Cerrar
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-col>
                  </v-row>
                </v-card-title>

                <v-card-text style="background-color:#FAFAFA">
                  <v-row>
                    <v-col>
                      <h3>Nombre</h3>
                    </v-col>
                    <v-col>
                      <h3>Parentesco</h3>
                    </v-col>
                    <v-col>
                      <h3>Acciones</h3>
                    </v-col>
                  </v-row>
                  <div
                    v-for="(item, index) in fichaIngreso.contenido.familiar.familiares"
                    :key="index"
                    >
                    <v-row>
                      <v-col>{{ item.nombre }} {{ item.apellido }}</v-col>
                      <v-col>{{ item.parentesco }}</v-col>
                      <v-col>
                        <v-row style="padding:0;margin:0">
                          <v-col style="padding:0;margin:0">
                            <v-btn fab x-small dark color="blue" @click="modalConsultar(index)">
                              <v-icon dark>mdi-eye</v-icon>
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                  </div>
                </v-card-text>
              </v-card>

              <v-row>
                <v-col>
                  <v-btn block @click="cerrarDialogo" color="primary">
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
              <v-row>
                <v-col>
                  <v-textarea
                    label="Ubicación"
                    v-model.trim="fichaIngreso.contenido.vivienda.ubicacion"
                    outlined
                    color="#009900"
                    rows="1"
                    auto-grow
                    readonly
                  ></v-textarea>
                </v-col>
                <v-col>
                  <v-textarea
                    label="Descripción Ubicación"
                    v-model.trim="fichaIngreso.contenido.vivienda.descripcionubicacion"
                    outlined
                    color="#009900"
                    rows="1"
                    auto-grow
                    readonly
                  ></v-textarea>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-textarea
                    label="Habitaciones disponibles"
                    v-model.trim="fichaIngreso.contenido.vivienda.habitacionesdormir"
                    outlined
                    color="#009900"
                    rows="1"
                    auto-grow
                    readonly
                  ></v-textarea>
                </v-col>
                <v-col>
                  <v-textarea
                    label="Tipo propiedad"
                    v-model.trim="fichaIngreso.contenido.vivienda.tipopropiedad"
                    outlined
                    color="#009900"
                    rows="1"
                    auto-grow
                    readonly
                  ></v-textarea>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-textarea
                    label="Tipo de vivienda"
                    v-model.trim="fichaIngreso.contenido.vivienda.tipo"
                    outlined
                    color="#009900"
                    rows="1"
                    auto-grow
                    readonly
                  ></v-textarea>
                </v-col>
                <v-col>
                  <v-textarea
                    label="Material de la vivienda"
                    v-model.trim="fichaIngreso.contenido.vivienda.material"
                    outlined
                    color="#009900"
                    rows="1"
                    auto-grow
                    readonly
                  ></v-textarea>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-textarea
                    label="Tipo del piso"
                    v-model.trim="fichaIngreso.contenido.vivienda.tipopiso"
                    outlined
                    color="#009900"
                    rows="1"
                    auto-grow
                    readonly
                  ></v-textarea>
                </v-col>
                <v-col>
                  <v-textarea
                    label="Tipo del techo"
                    v-model.trim="fichaIngreso.contenido.vivienda.tipotecho"
                    outlined
                    color="#009900"
                    rows="1"
                    auto-grow
                    readonly
                  ></v-textarea>
                </v-col>
              </v-row>

              <v-card
                style="margin-top:1%;margin-bottom:1%;padding-bottom: 15px;background-color:#EAEAEA"
                >
                <v-chip
                  class="ma-2"
                  color="green"
                  text-color="white"
                >Habitantes de la vivienda</v-chip>
                <v-card
                  tile
                  elevation="0"
                  color="#FAFAFA"
                  style="margin:5px; margin-top: 20px;"
                  height="60"
                  v-for="(item, index) in fichaIngreso.contenido.vivienda.habitantes"
                  :key="index"
                >
                  <v-row style="margin-left:10px;heigh:100%" align="center">
                    <v-col :cols="10" align="left">
                      <span>{{ item }}</span>
                    </v-col>
                  </v-row>
                </v-card>
              </v-card>

              <v-card style="margin-top:30px;padding:5px 5px;padding-bottom:15px;background-color:#EAEAEA">
                <v-chip
                  class="ma-2"
                  color="green"
                  text-color="white"
                >Servicios</v-chip>
                <v-card
                  color="#FAFAFA"
                  style="margin-top:5px; margin-top: 20px;"
                  height="60"
                  v-for="(item, index) in fichaIngreso.contenido.vivienda.servicios"
                  :key="index"
                >
                  <v-row style="margin-left:10px;heigh:100%" align="center">
                    <v-col :cols="10">
                      <span style="font-size:18px">Servicio: {{ item.servicio }} - Tipo: {{ item.tipo }}</span>
                    </v-col>
                  </v-row>
                </v-card>
              </v-card>

              <v-row>
                <v-col>
                  <v-btn block @click="cerrarDialogo" color="primary">
                    <v-icon left>mdi-close-outline</v-icon>
                    <span>Cerrar</span>
                  </v-btn>
                </v-col>
                <v-col>
                  <v-btn block @click="step = 3" color="success">
                    <v-icon left>mdi-page-next-outline</v-icon>
                    <span>Continuar</span>
                  </v-btn>
                </v-col>
              </v-row>
            </form>
          </div>
        </v-stepper-content>

        <v-stepper-content step="3">
          <div class="container-user">
            <form>
              <v-row>
                <v-col>
                  <v-textarea
                    label="Condición laboral"
                    v-model.trim="fichaIngreso.contenido.economico.condicionlaboral"
                    outlined
                    color="#009900"
                    rows="1"
                    auto-grow
                    readonly
                  ></v-textarea>
                </v-col>
                <v-col>
                  <v-textarea
                    label="Ocupación"
                    v-model.trim="fichaIngreso.contenido.economico.ocupacion"
                    outlined
                    color="#009900"
                    rows="1"
                    auto-grow
                    readonly
                  ></v-textarea>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-textarea
                    label="Observacion (Opcional)"
                    v-model.trim="fichaIngreso.contenido.economico.observacion"
                    outlined
                    color="#009900"
                    rows="1"
                    auto-grow
                    readonly
                  ></v-textarea>
                </v-col>
                <v-col>
                  <v-textarea
                    label="Salud"
                    v-model.trim="fichaIngreso.contenido.salud"
                    outlined
                    color="#009900"
                    rows="1"
                    auto-grow
                    readonly
                  ></v-textarea>
                </v-col>
              </v-row>

              <v-card
                style="margin-top:1%;margin-bottom:1%;padding-bottom: 15px;background-color:#EAEAEA"
              >
                <v-chip
                  class="ma-2"
                  color="green"
                  text-color="white"
                >Ingresos</v-chip>

                <v-card
                  tile
                  elevation="0"
                  color="#FAFAFA"
                  style="margin:5px"
                  height="60"
                  v-for="(item, index) in fichaIngreso.contenido.economico.ingresos"
                  :key="index"
                >
                  <v-row style="margin-left:10px;heigh:100%" align="center">
                    <v-col :cols="10" align="left">
                      <span>{{ item }}</span>
                    </v-col>
                  </v-row>
                </v-card>
              </v-card>

            <v-card
              style="margin-top:1%;margin-bottom:1%;padding-bottom: 15px;background-color:#EAEAEA"
              >
              <v-chip
                  class="ma-2"
                  color="green"
                  text-color="white"
                >Egresos</v-chip>
              <v-card
                tile
                elevation="0"
                color="#FAFAFA"
                style="margin:5px"
                height="60"
                v-for="(item, index) in fichaIngreso.contenido.economico.egresos"
                :key="index"
              >
                <v-row style="margin-left:10px;heigh:100%" align="center">
                  <v-col :cols="10" align="left">
                    <span>{{ item }}</span>
                  </v-col>
                </v-row>
              </v-card>
              </v-card>

              <v-row>
                <v-col>
                  <v-btn block @click="cerrarDialogo" color="primary">
                    <v-icon left>mdi-close-outline</v-icon>
                    <span>Cerrar</span>
                  </v-btn>
                </v-col>
                <v-col>
                  <v-btn block @click="step = 4" color="success">
                    <v-icon left>mdi-page-next-outline</v-icon>
                    <span>Continuar</span>
                  </v-btn>
                </v-col>
              </v-row>
            </form>
          </div>
        </v-stepper-content>

        <v-stepper-content step="4">
          <div class="container-user">
            <form style="margin-top: 10px;">
              <v-textarea
                label="Recibe o recibio apoyo de redes locales"
                v-model.trim="fichaIngreso.contenido.legal.apoyolocal"
                outlined
                color="#009900"
                rows="1"
                auto-grow
                readonly
              ></v-textarea>

              <v-row>
                <v-col>
                  <v-textarea
                    label="Diagnóstico Social"
                    v-model.trim="fichaIngreso.contenido.diagnosticosocial"
                    outlined
                    color="#009900"
                    rows="1"
                    auto-grow
                    shaped
                    readonly
                  ></v-textarea>
                </v-col>
                <v-col>
                  <v-textarea
                    label="Plan de intervención"
                    v-model.trim="fichaIngreso.contenido.planintervencion"
                    outlined
                    color="#009900"
                    rows="1"
                    auto-grow
                    shaped
                    readonly
                  ></v-textarea>
                </v-col>
              </v-row>

              <v-card style="margin-top:30px;padding:5px 5px;padding-bottom:15px;background-color:#EAEAEA">
                <v-chip
                  class="ma-2"
                  color="green"
                  text-color="white"
                >Antecedentes penales en familares del residente</v-chip>
                <v-card
                  color="#FAFAFA"
                  style="margin-top:5px"
                  height="60"
                  v-for="(item, index) in fichaIngreso.contenido.legal.penales"
                  :key="index"
                >
                  <v-row style="margin-left:10px;heigh:100%" align="center">
                    <v-col :cols="10">
                      <span style="font-size:18px">Familiar: {{ item.familiar }} - Motivo: {{ item.motivo }}</span>
                    </v-col>
                    <v-col :cols="2" align="right">
                    </v-col>
                  </v-row>
                </v-card>
              </v-card>

              <v-card
                    style="margin-top:30px;padding:5px 5px;background-color:#EAEAEA"
                  >
                  <v-card class="subcard">
                          <v-card-title>Datos del Informante</v-card-title>
                          <v-card class="subcard"  style="margin-bottom:7px" color="#e6f3ff">
                              <v-text-field
                                  v-model="this.fichaIngreso.contenido.firma.nombre"
                                  label="Autor de la ficha de ingreso"
                                  outlined
                                  color="info"
                                  readonly
                                ></v-text-field>
                          </v-card >
                               <v-card class="subcard" color="#e6f3ff">
                                   <v-text-field
                                    v-model="this.fichaIngreso.contenido.firma.cargo"
                                    label="Cargo del Autor"
                                    outlined
                                    color="info"
                                    readonly
                                  ></v-text-field>
                               </v-card>
                        </v-card>
                  <v-row>
                    <v-col :cols="12" align="left">
                      <div>
                         <img
                           width="100%"
                           height="100%"
                           :src="this.fichaIngreso.contenido.firma.urlfirma"
                           alt=""
                           />
                      </div>
                    </v-col>
                  </v-row>
                </v-card>

              <v-row>
                <v-col>
                  <v-btn block @click="cerrarDialogo" color="primary">
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
import { mapMutations, mapState } from "vuex";
import moment from "moment";

import { mapGetters } from "vuex";

export default {
  props:["listaresidentes","listaeducadores","fichaIngreso"],
  data() {
    return {
      //modal composicion familiar
      accion: "registrar",
      dialogAgregarFamiliar: false,
      familiar: {
        nombre: "",
        apellido: "",
        numerodocumento: "",
        parentesco: "",
        edad: "",
        estadocivil: "",
        gradoinstruccion: "",
        ocupacion: "",
        observaciones: ""
      },
      //fin modal composicion familiar
      itemFamilias: [
        { value: "Nuclear", text: "Nuclear" },
        { value: "Extensa", text: "Extensa" },
        { value: "Monoparental", text: "Monoparental" },
        { value: "Homoparental", text: "Homoparental" },
        { value: "Desintegrada", text: "Desintegrada" },
        { value: "Reconstruida", text: "Reconstruida" },
        { value: "Acogida", text: "Acogida" }
      ],

      dialogVistaPreviaFirma: false,
      datemenu: false,
      step: 1,

      motivoIngreso: "",
      motivosIngreso: [],

      habitante: "",
      habitantes: [],

      servicio: { servicio: "", tipo: "" },
      servicios: [],

      ingreso: "",
      ingresos: [],

      egreso: "",
      egresos: [],

      penal: { familiar: "", motivo: "" },
      penales: [],

      urlfirma: "",
      firmas: { urlfirma: "", nombre: "", cargo: "" },

      imagen: ""
    };
  },

  methods: {
    ...mapMutations(["replaceFichaIngreso"]),
    cerrarDialogo(){     
      this.$emit("cerrar-modal-detalle-ficha-ingreso");
      this.step = 1;
      this.limpiarCampos();
    },
    //Del modal de composicion familiar
    cerrarAgregarFamiliar() {
      this.dialogAgregarFamiliar = false;

      this.familiar.nombre = "";
      this.familiar.apellido = "";
      this.familiar.parentesco = "";
      this.familiar.edad = "";
      this.familiar.estadocivil = "";
      this.familiar.gradoinstruccion = "";
      this.familiar.ocupacion = "";
      this.familiar.observaciones = "";
      this.familiar.numerodocumento = "";

      this.$v.familiar.$reset();
    },
    modalConsultar(index) {
      this.accion = "consultar";
      this.dialogAgregarFamiliar = true;
      this.familiar.nombre = this.fichaIngreso.contenido.familiar.familiares[
        index
      ].nombre;
      this.familiar.apellido = this.fichaIngreso.contenido.familiar.familiares[
        index
      ].apellido;
      this.familiar.parentesco = this.fichaIngreso.contenido.familiar.familiares[
        index
      ].parentesco;
      this.familiar.edad = this.fichaIngreso.contenido.familiar.familiares[
        index
      ].edad;
      this.familiar.estadocivil = this.fichaIngreso.contenido.familiar.familiares[
        index
      ].estadocivil;
      this.familiar.gradoinstruccion = this.fichaIngreso.contenido.familiar.familiares[
        index
      ].gradoinstruccion;
      this.familiar.ocupacion = this.fichaIngreso.contenido.familiar.familiares[
        index
      ].ocupacion;
      this.familiar.observaciones = this.fichaIngreso.contenido.familiar.familiares[
        index
      ].observaciones;
      this.familiar.numerodocumento = this.fichaIngreso.contenido.familiar.familiares[
        index
      ].numerodocumento;
    },
    
    limpiarCampos() {
      this.motivosIngreso = "";
      this.motivoIngreso = "";
      this.habitantes = "";
      this.habitante = "";
      this.ingresos = "";
      this.ingreso = "";
      this.egresos = "";
      this.egreso = "";
    }
  },

  computed: {
    isDisabled() {
      if (this.accion == "consultar") {
        return true;
      } else {
        return false;
      }
    },
    obtenerResidente(){
          return `${this.fichaIngreso.residente.nombre} ${this.fichaIngreso.residente.apellido}`
      },obtenerIdentificacion(){
          return `${this.fichaIngreso.residente.tipoDocumento}: ${this.fichaIngreso.residente.numeroDocumento}`
      }
  },
};
</script>

<style scoped>
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

    .v-dialog {
    max-width: 85%;
    }
</style>