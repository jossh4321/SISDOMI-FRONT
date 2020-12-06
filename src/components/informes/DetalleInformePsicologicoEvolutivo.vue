<template>
    <v-card>
      <v-card-title class="justify-center">{{ titulo }}</v-card-title>
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
        <!-- fdsfs -->
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
                    v-model="informe.fechacreacion"
                    label="Fecha de Evaluación"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    color="#009900"
                  ></v-text-field>
                </template>
              </v-menu>
                <v-textarea
                  v-model="informe.contenido.observacionesgenerales"
                  label="Observaciones generales de conducta"
                  auto-grow
                  outlined
                  readonly
                  rows="2"
                  row-height="40"
                  color="#009900"
                  shaped
                ></v-textarea>

                <v-card
                  style="margin-bottom:5%;padding-bottom:1%;background-color:#EAEAEA"
                >
                  <v-card
                    elevation="0"
                    style="background-color:#EAEAEA"
                    height="70"
                  >
                  <v-card-title>
                    Pruebas Psicologicas Aplicadas
                  </v-card-title>
                  </v-card>

                  <v-card
                    tile
                    elevation="0"
                    color="#FAFAFA"
                    style="margin:5px"
                    height="60"
                    v-for="prueba in informe.contenido.pruebasaplicadas"
                    :key="prueba"
                  >
                    <v-row style="margin-left:10px;heigh:100%" align="center">
                      <v-col :cols="8" align="left">
                        <span>{{ prueba }}</span>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-card>

                <v-textarea
                  v-model="informe.contenido.interpretacionresultados"
                  label="Interpretación de resultados"
                  auto-grow
                  outlined
                  readonly
                  rows="2"
                  row-height="40"
                  color="#009900"
                  shaped
                ></v-textarea>
                <v-textarea
                  v-model="informe.contenido.diagnostico"
                  label="Diagnostico Psicologico"
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
                  style="margin-top:1%;margin-bottom:5%;padding-bottom:1%;background-color:#EAEAEA"
                >
                  <v-card
                    elevation="0"
                    style="background-color:#EAEAEA"
                    height="70"
                  >
                  <v-card-title>
                    Conclusiones
                  </v-card-title>
                  </v-card>

                  <v-card
                    tile
                    elevation="0"
                    color="#FAFAFA"
                    style="margin:5px"
                    height="60"
                    v-for="conclusion in informe.contenido.conclusiones"
                    :key="conclusion"
                  >
                    <v-row style="margin-left:10px;heigh:100%" align="center">
                      <v-col :cols="8" align="left">
                        <span>{{ conclusion }}</span>
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
                  height="50"
                >
                  <v-card-title>
                    Recomendaciones
                  </v-card-title>
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

                <v-card
                  style="margin-top:30px;padding:5px 5px;background-color:#EAEAEA"
                >
                    <v-card
                    elevation="0"
                    style="background-color:#EAEAEA"
                    height="50"
                    >
                    <v-card-title>
                        Anexos
                    </v-card-title>
                    </v-card>
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
                          <span style="font-size:18px">
                            {{ item.titulo }}</span
                          >
                        </article>
                      </v-col>
                      <v-col :cols="4" align="center">
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
                              <iframe
                              :src= pdf
                              width=100% height=600></iframe>
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
                  height="50"
                >
                  <v-card-title>
                    Firmas
                  </v-card-title>
                </v-card>
                <v-card
                  color="#FAFAFA"
                  style="margin-top:5px"
                  height="60"
                  v-for="(item, index) in informe.contenido.firmas"
                  :key="index"
                >
                  <v-row style="margin-left:10px;heigh:100%" align="center">
                    <v-col :cols="8">
                      <article>
                        <img
                          style="margin-right:5px;width:6% "
                          src="https://www.flaticon.es/svg/static/icons/svg/996/996443.svg"
                          alt="imagen usuario"
                        />
                        <span style="font-size:18px">
                          {{ item.nombre }} - {{ item.cargo }}</span
                        >
                      </article>
                    </v-col>
                    <v-col :cols="4" align="center">
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
                              v-if="imagen.includes('http')"
                              width="100%"
                              height="100%"
                              :src="imagen"
                              alt=""
                            />
                            <img
                              v-else
                              width="100%"
                              height="100%"
                              :src="'data:image/jpeg;base64,' + imagen"
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
import moment from "moment";

export default {
  props: ["informe", "titulo"],
  data() {
    return {
      datemenu: false,
      dialogVistaPreviaFirma: false,
      dialogVistaPreviaAnexos: false,
      step: 1,
      recomendacion: "",
      recomendaciones: [],
      urlfirma: "",
      firmas: { urlfirma: "", nombre: "", cargo: "" },
      imagen: "",
      pdf: "",
      residente: "",
      pruebas:[],
      prueba:"",
      conclusion:"",
      conclusiones:[],
    };
  },
  async created() {
    this.obtenerResidente()
  },
  methods: {
    cerrarDialogo() {
      this.$emit("close-dialog-detail");
    },
    async obtenerResidente() {
      await axios
        .get("/residente/id?id=" + this.informe.idresidente)
        .then((x) => {
          this.residente = x.data.nombre + " " + x.data.apellido;
        })
        .catch((err) => console.log(err));
    },
    verFirma(index) {
      console.log(this.informe.contenido.firmas[index].urlfirma);
      this.imagen = this.informe.contenido.firmas[index].urlfirma;
      this.dialogVistaPreviaFirma = true;
    },
    cerrarVistaPreviaFirma() {
      this.dialogVistaPreviaFirma = false;
    },
    verAnexo(index) {
      this.pdf = this.informe.contenido.anexos[index].url;
      console.log(this.pdf),
      this.dialogVistaPreviaAnexos = true;
    },
    cerrarVistaPreviaAnexo() {
      this.dialogVistaPreviaAnexos = false;
    },
   
  },
};
</script>

<style scoped>
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
.divider-custom {
  margin-top: 7px;
  margin-bottom: 7px;
}

.inputTextField {
  border-color: green;
}
</style>
