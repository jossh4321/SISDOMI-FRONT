<template>
  <v-card>
    <v-card-title class="justify-center"
      >Detalle de Informe Social Inicial</v-card-title
    >
    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step editable step="1">
          Datos Generales
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step editable step="2">
          Descripción de la situación
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step editable step="3">
          Análisis y diagnóstico
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
                v-model="motivoIngreso"
                label="Motivo de ingreso"
                outlined
                readonly
                color="#009900"
              ></v-text-field>
              <!-- <v-text-field
                v-model="evaluador"
                label="Evaluador"
                outlined
                readonly
                color="#009900"
              ></v-text-field> -->
              <v-textarea
                v-model="informe.contenido.antecedentes"
                label="Antecedentes"
                outlined
                color="#009900"
                rows="1"
                readonly
                auto-grow
              ></v-textarea>

              <v-card style="padding:5px 5px;background-color:#EAEAEA">
                <v-card-title>
                  <v-row>
                    <v-col :cols="8">
                      Composición Familiar
                    </v-col>
                    <v-col :cols="4" align="right">
                      <v-dialog
                        v-model="dialogAgregarFamiliar"
                        persistent
                        max-width="600px"
                      >
                        <v-card align="center">
                          <v-card-title>
                            <span class="headline">Datos familiar</span>
                          </v-card-title>
                          <v-card-text>
                            <v-textarea
                              label="Nro. Documento"
                              v-model="familiar.numerodocumento"
                              outlined
                              color="#009900"
                              rows="1"
                              auto-grow
                              readonly
                            >
                            </v-textarea>
                            <v-textarea
                              label="Nombres"
                              v-model="familiar.nombre"
                              outlined
                              color="#009900"
                              rows="1"
                              auto-grow
                              readonly
                            >
                            </v-textarea>
                            <v-textarea
                              label="Apellidos"
                              v-model="familiar.apellido"
                              outlined
                              color="#009900"
                              rows="1"
                              auto-grow
                              readonly
                            >
                            </v-textarea>
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
                                >
                                </v-textarea>
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
                                >
                                </v-textarea>
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
                                >
                                </v-textarea>
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
                                >
                                </v-textarea>
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
                                >
                                </v-textarea>
                              </v-col>
                            </v-row>

                            <v-textarea
                              label="Observaciones"
                              v-model="familiar.observaciones"
                              outlined
                              color="#009900"
                              rows="1"
                              auto-grow
                              readonly
                            >
                            </v-textarea>
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              color="blue darken-1"
                              text
                              @click="cerrarAgregarFamiliar()"
                            >
                              Cerrar
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-col>
                  </v-row>
                </v-card-title>

                <v-card-text style="background-color:#FAFAFA">
                  <v-row>
                    <v-col><h3>Nombre</h3></v-col>
                    <v-col><h3>Parentesco</h3></v-col>
                    <v-col><h3>Nro. Documento</h3></v-col>
                    <v-col><h3>Acciones</h3></v-col>
                  </v-row>
                  <div
                    v-for="(item, index) in informe.contenido.familiares"
                    :key="index"
                  >
                    <v-row>
                      <v-col>{{ item.nombre }} {{ item.apellido }}</v-col>
                      <v-col>{{ item.parentesco }}</v-col>
                      <v-col>{{ item.numerodocumento }}</v-col>
                      <v-col>
                        <v-row style="padding:0;margin:0">
                          <v-col style="padding:0;margin:0">
                            <v-btn
                              fab
                              x-small
                              dark
                              color="blue"
                              @click="modalConsultar(index)"
                            >
                              <v-icon dark>
                                mdi-eye
                              </v-icon>
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
              <v-textarea
                v-model="informe.contenido.situacionvivienda"
                label="Descripción de la vivienda"
                outlined
                color="#009900"
                rows="1"
                auto-grow
                readonly
              ></v-textarea>
              <v-textarea
                v-model="informe.contenido.situacioneconomica"
                label="Descripción de la situacion económica"
                outlined
                color="#009900"
                rows="1"
                auto-grow
                readonly
              ></v-textarea>
              <v-textarea
                v-model="informe.contenido.situacionsalud"
                label="Descripción de la situacion de salud"
                outlined
                color="#009900"
                rows="1"
                auto-grow
                readonly
              ></v-textarea>
              <v-textarea
                v-model="informe.contenido.educacion"
                label="Descripción de la situacion educativa"
                outlined
                color="#009900"
                rows="1"
                auto-grow
                readonly
              ></v-textarea>
              <v-textarea
                v-model="informe.contenido.situacionactual"
                label="Descripción de la situacion social"
                outlined
                color="#009900"
                rows="1"
                auto-grow
                readonly
              ></v-textarea>
              <v-row>
                <v-col>
                  <v-btn block @click="step = 3" color="success">
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
        <v-stepper-content step="3">
          <div class="container-user">
            <form>
              <v-textarea
                v-model="informe.contenido.diagnosticosocial"
                label="Diagnóstico social"
                outlined
                color="#009900"
                rows="1"
                auto-grow
                readonly
              ></v-textarea>

              <v-card
                style="margin-top:1%;margin-bottom:1%;padding-bottom:1%;background-color:#EAEAEA"
              >
                <v-card-title>Recomendaciones</v-card-title>
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

              <v-card
                style="margin-top:30px;padding:5px 5px;background-color:#EAEAEA"
              >
                <v-card-title>Anexos</v-card-title>
                <v-card
                  color="#FAFAFA"
                  style="margin-top:5px"
                  height="60"
                  v-for="(item, index) in informe.contenido.anexos"
                  :key="index"
                >
                  <v-row style="margin-left:10px;heigh:100%" align="center">
                    <v-col :cols="8">
                      <article>
                        <img
                          style="margin-right:5px;width:6% "
                          src="https://www.flaticon.es/svg/static/icons/svg/2991/2991112.svg"
                          alt="imagen documento"
                        />
                        <span style="font-size:18px"> {{ item.titulo }}</span>
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
                          @click="verAnexo(index)"
                        >
                          <img
                            style="width:25% "
                            src="https://www.flaticon.es/svg/static/icons/svg/709/709612.svg"
                            alt="visualizar"
                          />
                        </v-btn>
                      </template>
                    </v-col>                   
                  </v-row>
                </v-card>
              </v-card>

              <v-dialog
                v-model="dialogVistaPreviaAnexos"
                persistent
                max-width="600px"
              >
                <v-card align="center">
                  <v-card-title>
                    <span class="headline">Vista previa</span>
                  </v-card-title>
                  <v-card-text>
                    <iframe :src="pdf" width="100%" height="600"></iframe>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="cerrarVistaPreviaAnexo()"
                    >
                      Cerrar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

              <v-card
                  style="margin-top:30px;padding:5px 5px;background-color:#EAEAEA"
                >
                  <v-card
                    elevation="0"
                    style="background-color:#EAEAEA"
                    height="70"
                  >
                    <v-row style="margin:1%;heigh:100%" align="center">
                      <v-col :cols="4" align="left">
                        <v-text-field
                          v-model="this.usuario"
                          label="Nombre"
                          color="#009900"
                          readonly
                        ></v-text-field>
                      </v-col>
                      <v-col :cols="4" align="left">
                        <v-text-field
                          v-model="this.cargo"
                          label="Cargo"
                          color="#009900"
                          readonly
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-card>
                  <v-row>
                    <v-col :cols="12" align="center">
                      <div>
                        <v-card-text>
                              <img
                                width="240"
                                height="170"
                                :src="this.firma"
                                alt=""
                              />
                        </v-card-text>
                      </div>
                    </v-col>
                  </v-row>
                </v-card>
              <v-row>
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
import { mapMutations, mapState } from "vuex";
import { required, minLength, email, helpers } from "vuelidate/lib/validators";
import moment from "moment";

export default {
  props: ["informe", "visible"],
  data() {
    return {
      step: 1,
      residente: "",
      //evaluador: "",
      motivoIngreso: "",
      usuario: "",
      cargo:"",
      firma:"",
      familiar: {
        nombre: "",
        apellido: "",
        numerodocumento: "",
        parentesco: "",
        edad: "",
        estadocivil: "",
        gradoinstruccion: "",
        ocupacion: "",
        observaciones: "",
      },
      dialogAgregarFamiliar: false,
      accion: "registrar",
      indice: "",
      recomendacion: "",
      recomendaciones: [],
      dialogVistaPreviaAnexos: false,
      fileList: [],
      pdf: "",
    };
  },
  async created() {
    this.obtenerResidente();
    //this.obtenerEvaluador();
    this.obtenerCreador();
  },
  methods: {
    ...mapMutations(["addInforme"]),
    async obtenerResidente() {
      await axios
        .get("/residente/id?id=" + this.informe.idresidente)
        .then((x) => {
          this.residente = x.data.nombre + " " + x.data.apellido;
          this.motivoIngreso = x.data.motivoIngreso;
        })
        .catch((err) => console.log(err));
    },
    async obtenerCreador() {
      await axios
        .get("/usuario/rol/permiso?id=" + this.informe.creadordocumento)
        .then((x) => {
          this.usuario = x.data.datos.nombre + " " + x.data.datos.apellido;
          this.cargo = x.data.rol.nombre;
          this.firma = x.data.datos.firma;
        })
        .catch((err) => console.log(err));
    },/*
    async obtenerEvaluador() {
      await axios
        .get("/usuario/id?id=" + this.informe.contenido.evaluador)
        .then((res) => {                    
          this.evaluador = res.data.datos.nombre + " " + res.data.datos.apellido;
        })
        .catch((err) => console.log(err));        
    },*/
    resetInformeValidationState() {
      this.$refs.myVueDropzone.removeAllFiles();
      this.$v.informe.$reset();
    },
    cerrarAgregarFamiliar() {
      this.dialogAgregarFamiliar = false;

      //limpiarTodo
      this.familiar.nombre = "";
      this.familiar.apellido = "";
      this.familiar.parentesco = "";
      this.familiar.edad = "";
      this.familiar.estadocivil = "";
      this.familiar.gradoinstruccion = "";
      this.familiar.ocupacion = "";
      this.familiar.observaciones = "";
      this.familiar.numerodocumento = "";
    },
    modalConsultar(index) {
      this.accion = "consultar";
      this.dialogAgregarFamiliar = true;
      this.familiar.nombre = this.informe.contenido.familiares[index].nombre;
      this.familiar.apellido = this.informe.contenido.familiares[
        index
      ].apellido;
      this.familiar.parentesco = this.informe.contenido.familiares[
        index
      ].parentesco;
      this.familiar.edad = this.informe.contenido.familiares[index].edad;
      this.familiar.estadocivil = this.informe.contenido.familiares[
        index
      ].estadocivil;
      this.familiar.gradoinstruccion = this.informe.contenido.familiares[
        index
      ].gradoinstruccion;
      this.familiar.ocupacion = this.informe.contenido.familiares[
        index
      ].ocupacion;
      this.familiar.observaciones = this.informe.contenido.familiares[
        index
      ].observaciones;
      this.familiar.numerodocumento = this.informe.contenido.familiares[
        index
      ].numerodocumento;
    },
    cerrarDialogo() {
      this.$emit("close-dialog-detail");
    },
    verAnexo(index) {
      this.pdf = this.informe.contenido.anexos[index].url;
      console.log(this.pdf), (this.dialogVistaPreviaAnexos = true);
    },
    cerrarVistaPreviaAnexo() {
      this.dialogVistaPreviaAnexos = false;
    },
  },
  computed: {
    show: {
      get() {
        return this.visible;
      },
      set(value) {
        if (!value) {
          this.$emit("close");
        }
      },
    },
    isDisabled() {
      return true;
    },
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
</style>

