<template>
  <v-dialog v-model="show" max-width="50%">
    <v-card>
      <v-card-title class="justify-center"
        >Registro de Informe Psicológico Inicial</v-card-title
      >
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
        <v-stepper-items>
          <v-stepper-content step="1">
            <div class="container-user">
              <form>
                <v-autocomplete
                  :items="listaresidentes"
                  v-model="informe.idresidente"
                  filled
                  chips
                  dense
                  outlined
                  color="#009900"
                  label="Usuaria CAR"
                  item-text="nombre"
                  item-value="id"
                  @input="$v.informe.idresidente.$touch()"
                  @blur="$v.informe.idresidente.$touch()"
                  :error-messages="errorResidente"
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
                      {{ data.item.nombre }} {{ data.item.apellido }}
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

                <v-autocomplete
                  :items="listapsicologos"
                  filled
                  chips
                  dense
                  outlined
                  v-model="informe.contenido.evaluador"
                  color="#009900"
                  label="Evaluador"
                  item-text="usuario"
                  item-value="id"
                  :error-messages="errorEvaluador"
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
                      {{ data.item.datos.nombre }}
                      {{ data.item.datos.apellido }}
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
                            data.item.datos.numerodocumento
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
                      v-model="informe.contenido.fechaevaluacion"
                      label="Fecha de Evaluación"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      color="#009900"
                      @input="$v.informe.contenido.fechaevaluacion.$touch()"
                      @blur="$v.informe.contenido.fechaevaluacion.$touch()"
                      :error-messages="errorFechaEvaluacion"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="informe.contenido.fechaevaluacion"
                    @input="menu2 = false"
                    locale="es-es"
                  ></v-date-picker>
                </v-menu>

                <v-textarea
                  label="Antecedentes"
                  v-model="informe.contenido.antecedentes"
                  auto-grow
                  outlined
                  rows="2"
                  row-height="25"
                  color="#009900"
                  shaped
                  @input="$v.informe.contenido.antecedentes.$touch()"
                  @blur="$v.informe.contenido.antecedentes.$touch()"
                  :error-messages="errorAntecedentes"
                ></v-textarea>

                <v-textarea
                  label="Contexto psicológico"
                  v-model="informe.contenido.contextopsicologico"
                  auto-grow
                  outlined
                  rows="2"
                  row-height="25"
                  color="#009900"
                  shaped
                  @input="$v.informe.contenido.contextopsicologico.$touch()"
                  @blur="$v.informe.contenido.contextopsicologico.$touch()"
                  :error-messages="errorContextoPsicologico"
                ></v-textarea>

                <v-textarea
                  label="Análisis de estado psicológico actual"
                  v-model="informe.contenido.analisisactual"
                  auto-grow
                  outlined
                  rows="2"
                  row-height="25"
                  color="#009900"
                  shaped
                  @input="$v.informe.contenido.analisisactual.$touch()"
                  @blur="$v.informe.contenido.analisisactual.$touch()"
                  :error-messages="errorAnalisisActual"
                ></v-textarea>

                <v-card
                  style="margin-top:1%;margin-bottom:1%;padding-bottom:1%;background-color:#EAEAEA"
                >
                  <v-card
                    elevation="0"
                    style="background-color:#EAEAEA"
                    height="70"
                  >
                    <v-row style="margin:1%;heigh:100%" align="center">
                      <v-col :cols="8" align="left">
                        <v-text-field
                          v-model="transtorno"
                          label="Transtornos posibles"
                          color="#009900"
                          @input="$v.transtorno.$touch()"
                          @blur="$v.transtorno.$touch()"
                          :error-messages="errorTranstorno"
                        ></v-text-field>
                      </v-col>
                      <v-col :cols="4" align="right">
                        <v-btn
                          fab
                          small
                          dark
                          color="green"
                          @click="agregarTranstorno()"
                        >
                          <v-icon dark>
                            mdi-plus
                          </v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card>

                  <v-card
                    tile
                    elevation="0"
                    color="#FAFAFA"
                    style="margin:5px"
                    height="60"
                    v-for="transtorno in transtornos"
                    :key="transtorno"
                  >
                    <v-row style="margin-left:10px;heigh:100%" align="center">
                      <v-col :cols="8" align="left">
                        <span>{{ transtorno }}</span>
                      </v-col>
                      <v-col :cols="4" align="right">
                        <div style="margin-right:20px">
                          <v-btn
                            fab
                            x-small
                            dark
                            color="red"
                            @click="eliminarTranstorno(transtorno)"
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
                  style="margin-top:1%;margin-bottom:1%;padding-bottom:1%;background-color:#EAEAEA"
                >
                  <v-card
                    elevation="0"
                    style="background-color:#EAEAEA"
                    height="70"
                  >
                    <v-row style="margin:1%;heigh:100%" align="center">
                      <v-col :cols="8" align="left">
                        <v-text-field
                          v-model="conclusion"
                          label="Conclusiones"
                          color="#009900"
                          @input="$v.conclusion.$touch()"
                          @blur="$v.conclusion.$touch()"
                          :error-messages="errorConclusion"
                        ></v-text-field>
                      </v-col>
                      <v-col :cols="4" align="right">
                        <v-btn
                          fab
                          small
                          dark
                          color="green"
                          @click="agregarConclusion"
                        >
                          <v-icon dark>
                            mdi-plus
                          </v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card>

                  <v-card
                    tile
                    elevation="0"
                    color="#FAFAFA"
                    style="margin:5px"
                    height="60"
                    v-for="conclusion in conclusiones"
                    :key="conclusion"
                  >
                    <v-row style="margin-left:10px;heigh:100%" align="center">
                      <v-col :cols="8" align="left">
                        <span>{{ conclusion }}</span>
                      </v-col>
                      <v-col :cols="4" align="right">
                        <div style="margin-right:20px">
                          <v-btn
                            fab
                            x-small
                            dark
                            color="red"
                            @click="eliminarConclusion(conclusion)"
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

                <v-card
                  style="margin-top:1%;margin-bottom:1%;padding-bottom:1%;background-color:#EAEAEA"
                >
                  <v-card
                    elevation="0"
                    style="background-color:#EAEAEA"
                    height="70"
                  >
                    <v-row style="margin:1%;heigh:100%" align="center">
                      <v-col :cols="8" align="left">
                        <v-text-field
                          v-model="recomendacion"
                          label="Recomendaciones"
                          color="#009900"
                          @input="$v.recomendacion.$touch()"
                          @blur="$v.recomendacion.$touch()"
                          :error-messages="errorRecomendacion"
                        ></v-text-field>
                      </v-col>
                      <v-col :cols="4" align="right">
                        <v-btn
                          fab
                          small
                          dark
                          color="green"
                          @click="agregarRecomendacion"
                        >
                          <v-icon dark>
                            mdi-plus
                          </v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card>

                  <v-card
                    tile
                    elevation="0"
                    color="#FAFAFA"
                    style="margin:5px"
                    height="60"
                    v-for="recomendacion in recomendaciones"
                    :key="recomendacion"
                  >
                    <v-row style="margin-left:10px;heigh:100%" align="center">
                      <v-col :cols="8" align="left">
                        <span>{{ recomendacion }}</span>
                      </v-col>
                      <v-col :cols="4" align="right">
                        <div style="margin-right:20px">
                          <v-btn
                            fab
                            x-small
                            dark
                            color="red"
                            @click="eliminarRecomendacion(recomendacion)"
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
                          v-model="this.user.usuario"
                          label="Nombre"
                          color="#009900"
                          readonly
                        ></v-text-field>
                      </v-col>
                      <v-col :cols="4" align="left">
                        <v-text-field
                          v-model="this.user.rol.nombre"
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
                                :src="this.user.datos.firma"
                                alt=""
                              />
                        </v-card-text>
                      </div>
                    </v-col>
                  </v-row>
                </v-card>

                <v-row>
                  <v-col>
                    <v-btn block color="success" @click="registrarInforme">
                      <v-icon left>mdi-content-save-all-outline</v-icon>
                      <span>Registrar Informe</span>
                    </v-btn>
                  </v-col>
                  <v-col>
                    <v-btn block @click="show = false" color="primary">
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
  </v-dialog>
</template>
<script>
import axios from "axios";
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import { mapMutations, mapState } from "vuex";
import {
  required,
  minLength,
  email,
  helpers,
  numeric,
  between,
} from "vuelidate/lib/validators";
import moment from "moment";
import { mapGetters } from "vuex";

function esTexto(value) {
  return /^[A-Za-z\sáéíóúÁÉÍÓÚñÑ]+$/.test(value);
}

function esParrafo(value) {
  return /^[A-Za-z\d\s.,;°"“()áéíóúÁÉÍÓÚñÑ]+$/.test(value); 
}

export default {
  props: ["listaresidentes", "visible", "listapsicologos"],
  components: {
    vueDropzone: vue2Dropzone,
  },
  data() {
    return {
      step: 1,
      transtorno: "",
      transtornos: [],
      conclusion: "",
      conclusiones: [],
      recomendacion: "",
      recomendaciones: [],
      informe: {
        id: "",
        tipo: "InformePsicologicoInicial",
        historialcontenido: [],
        creadordocumento: "",
        fechacreacion: null,
        area: "psicologica",
        fase: "1",
        idresidente: "",
        estado: "creado",
        contenido: {
          antecedentes: "",
          contextopsicologico: "",
          analisisactual: "",
          transtornos: [],
          recomendaciones: [],
          conclusiones: [],
          codigodocumento: "",
          evaluador: "",
          fechaevaluacion: ""
        },
      },
      datemenu: false,
    };
  },
  methods: {
    ...mapMutations(["addInforme"]),
    async registrarInforme() {
      this.informe.creadordocumento = this.user.id;      
      this.$v.informe.$touch();
      if (this.$v.informe.$invalid) {
        console.log("hay errores");
        this.mensaje(
          "error",
          "..Oops",
          "Se encontraron errores en el formulario",
          "<strong>Verifique los campos Ingresados<strong>"
        );
      } else {
          console.log("no hay errores");          
      await axios
        .post("/informe/informepi", this.informe)
        .then((res) => {
          this.informe = res.data;
          var resi = this.listaresidentes.filter(function(residente) {
            return residente.id == res.data.idresidente;
          });
          console.log(resi);
          var info = {
            id: res.data.id,
            tipo: res.data.tipo.replace(/([a-z])([A-Z])/g, "$1 $2"),
            fechaevaluacion: res.data.contenido.fechaevaluacion.split("T")[0],
            codigodocumento: res.data.contenido.codigodocumento,
            nombrecompleto: resi[0].nombre + " " + resi[0].apellido,
          };
          this.addInforme(info);
          this.cerrarDialogo();
        })
        .catch((err) => console.log(err));
      await this.mensaje(
        "success",
        "Listo",
        "Informe registrado Satisfactoriamente",
        "<strong>Se redirigira a la interfaz de gestión<strong>"
      );
     }
    },
    async mensaje(icono, titulo, texto, footer) {
      await this.$swal({
        icon: icono,
        title: titulo,
        text: texto,
        footer: footer,
      });
    },
    agregarTranstorno() {
      this.$v.transtorno.$touch();
      if (!this.$v.transtorno.$invalid) {
      let transtornos = this.transtorno;
      this.informe.contenido.transtornos.push(transtornos);
      this.transtornos = this.informe.contenido.transtornos;
      this.transtorno = "";
      this.$v.transtorno.$reset();

      }
    },
    eliminarTranstorno(transtorno) {
      this.transtornos.forEach(function(car, index, object) {
        if (car === transtorno) {
          object.splice(index, 1);
        }
      });
    },
    agregarConclusion() {
      this.$v.conclusion.$touch();
      if (!this.$v.conclusion.$invalid) {
        let conclusiones = this.conclusion;
        this.informe.contenido.conclusiones.push(conclusiones);
        this.conclusiones = this.informe.contenido.conclusiones;
        this.conclusion = "";
        this.$v.conclusion.$reset();
      }
    },
    eliminarConclusion(conclusion) {
      this.conclusiones.forEach(function(car, index, object) {
        if (car === conclusion) {
          object.splice(index, 1);
        }
      });
    },
    agregarRecomendacion() {
       this.$v.recomendacion.$touch();
      if (!this.$v.recomendacion.$invalid) {
      let recomendaciones = this.recomendacion;
      this.informe.contenido.recomendaciones.push(recomendaciones);
      this.recomendaciones = this.informe.contenido.recomendaciones;
      this.recomendacion = "";
      this.$v.recomendacion.$reset();
      }
    },
    eliminarRecomendacion(recomendacion) {
      this.recomendaciones.forEach(function(car, index, object) {
        if (car === recomendacion) {
          object.splice(index, 1);
        }
      });
    },
    cerrarDialogo() {
      this.step = 1;
      this.$emit("close");
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
    ...mapGetters(["user"]),
    errorResidente() {
      const errors = [];
      if (!this.$v.informe.idresidente.$dirty) return errors;
      !this.$v.informe.idresidente.required &&
        errors.push("Debe seleccionar un residente obligatoriamente");
      return errors;
    },
    errorEvaluador() {
      const errors = [];
      if (!this.$v.informe.contenido.evaluador.$dirty) return errors;
      !this.$v.informe.contenido.evaluador.required &&
        errors.push("Debe seleccionar un evaluador obligatoriamente");
      return errors;
    },
    errorAntecedentes() {
      const errors = [];
      if (!this.$v.informe.contenido.antecedentes.$dirty) return errors;
      !this.$v.informe.contenido.antecedentes.required &&
        errors.push("Debe completar los antecedentes obligatoriamente.");
      !this.$v.informe.contenido.antecedentes.esParrafo &&
        errors.push("No se aceptan caracteres especiales.");
      return errors;
    },
    errorContextoPsicologico() {
      const errors = [];
      if (!this.$v.informe.contenido.contextopsicologico.$dirty) return errors;
      !this.$v.informe.contenido.contextopsicologico.required &&
        errors.push("Debe completar el contexto psicológico obligatoriamente.");
      !this.$v.informe.contenido.contextopsicologico.esParrafo &&
        errors.push("No se aceptan caracteres especiales.");
      return errors;
    },
    errorAnalisisActual() {
      const errors = [];
      if (!this.$v.informe.contenido.analisisactual.$dirty) return errors;
      !this.$v.informe.contenido.analisisactual.required &&
        errors.push("Debe completar el análisis actual obligatoriamente.");
      !this.$v.informe.contenido.analisisactual.esParrafo &&
        errors.push("No se aceptan caracteres especiales.");
      return errors;
    },
    errorTranstorno() {
      const errors = [];
      if (!this.$v.transtorno.$dirty) return errors;
      !this.$v.transtorno.required &&
        errors.push("Debe registrar el campo obligatoriamente");
      !this.$v.transtorno.esParrafo &&
        errors.push("No se aceptan caracteres especiales.");
      return errors;
    },
    errorRecomendacion() {
      const errors = [];
      if (!this.$v.recomendacion.$dirty) return errors;
      !this.$v.recomendacion.required &&
        errors.push("Debe registrar la recomendación obligatoriamente");
      !this.$v.recomendacion.esParrafo &&
        errors.push("La recomendación no debe contener caracteres especiales.");
      return errors;
    },
    errorConclusion() {
      const errors = [];
      if (!this.$v.conclusion.$dirty) return errors;
      !this.$v.conclusion.required &&
        errors.push("Debe registrar la conclusión obligatoriamente");
      !this.$v.conclusion.esParrafo &&
        errors.push("La conclusión no debe contener caracteres especiales.");
      return errors;
    },
    errorFechaEvaluacion() {
      const errors = [];
      if (!this.$v.informe.contenido.fechaevaluacion.$dirty) return errors;
      !this.$v.informe.contenido.fechaevaluacion.required &&
        errors.push("Debe ingresar la fecha de evaluación obligatoriamente");
      var dateselected = new Date(this.informe.contenido.fechaevaluacion);
      var maxdate = new Date();
      !(dateselected.getTime() <= maxdate.getTime()) &&
        errors.push("La fecha no debe ser mayor a la actual");

      return errors;
    },
  },
    validations() {
      return {
        informe: {
          idresidente: {
            required,
          },          
          contenido: {
            evaluador: {
              required,
            },
            antecedentes: {
              required,
              esParrafo,
            },
            contextopsicologico: {
              required,
              esParrafo,
            },
            analisisactual: {
              required,
              esParrafo,
            },
            fechaevaluacion: {
            required,
            },
          },
        },
        transtorno: {
          required,
          esParrafo,
        },
        recomendacion: {
          required,
          esParrafo,
        },
        conclusion: {
          required,
          esParrafo,
        },
      };
    },  
};
</script>
