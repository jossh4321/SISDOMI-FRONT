<template>
  <v-card>
    <v-card-title class="justify-center">Registrar Plan de Intervención Individual</v-card-title>
    <v-card-text>
      <v-stepper v-model="step">
        <v-stepper-header>
          <v-stepper-step editable step="1">Datos Generales</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step editable step="2">Aspectos de intervención</v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <div class="container-planI">
              <form>
                <v-card class="subcard card-padre" style="margin-bottom:20px">
                  <v-card class="subcard" style="margin-bottom:7px" color="#e6f3ff">
                    <span>Residente: {{this.residente.nombre}} {{this.residente.apellido}}</span>
                  </v-card>
                  <v-card class="subcard" color="#e6f3ff">
                    <span>Fecha de Ingreso: {{ this.residente.fechaingreso | fomatoFecha}}</span>
                  </v-card>
                </v-card>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model.trim="planI.contenido.titulo"
                      label="Ingrese el nombre del plan"
                      outlined
                      readonly
                      color="#009900"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model.trim="planI.contenido.car"
                      label="Ingrese el nombre del CAR"
                      @input="$v.planI.contenido.car.$touch()"
                      @blur="$v.planI.contenido.car.$touch()"
                      :error-messages="errorCar"
                      outlined
                      color="#009900"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      type="number"
                      v-model.number="planI.contenido.trimestre"
                      label="Ingrese el trimestre"
                      @input="$v.planI.contenido.trimestre.$touch()"
                      @blur="$v.planI.contenido.trimestre.$touch()"
                      :error-messages="errorTrimestre"
                      outlined
                      color="#009900"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model.trim="planI.contenido.objetivoGeneral"
                      label="Ingrese el objetivo general"
                      @input="$v.planI.contenido.objetivoGeneral.$touch()"
                      @blur="$v.planI.contenido.objetivoGeneral.$touch()"
                      :error-messages="errorGeneral"
                      outlined
                      color="#009900"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <div class="w-100 d-flex">
                      <v-text-field
                        v-model.trim="objetivoespecificoAux"
                        label="Objetivo específico"
                        @input="$v.objetivoespecificoAux.$touch()"
                        @blur="$v.objetivoespecificoAux.$touch()"
                        :error-messages="errorObjetivoEspecifico"
                        outlined
                        color="#009900"
                      ></v-text-field>
                      <v-btn class="ml-2" fab color="success" @click="addObjEspecifico">
                        <v-icon>mdi-plus</v-icon>
                      </v-btn>
                    </div>
                    <div>
                      <h4
                        v-if="$v.planI.contenido.objetivoEspecificos.$error"
                        class="red--text"
                      >Debe tener como mínimo un objetivo específico registrado</h4>
                    </div>
                    <registro-multiple
                      name="Objetivos específicos"
                      :items="planI.contenido.objetivoEspecificos"
                    ></registro-multiple>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-btn color="error" elevation="2" block @click="cerrarDialogo">
                      <v-icon left>mdi-close-outline</v-icon>Cerrar
                    </v-btn>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-btn color="success" elevation="2" @click="step = 2" block>
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
                  <v-col cols="12" sm="12" md="12">
                    <div class="w-100 d-flex">
                      <v-text-field
                        v-model.trim="aspectoAux"
                        label="Aspectos de Intervención"
                        @input="$v.aspectoAux.$touch()"
                        @blur="$v.aspectoAux.$touch()"
                        :error-messages="errorAspecto"
                        outlined
                        color="#009900"
                      ></v-text-field>
                      <v-btn class="ml-2" fab color="success" @click="addAspecto">
                        <v-icon>mdi-plus</v-icon>
                      </v-btn>
                    </div>
                    <div>
                      <h4 class="red--text" v-if="$v.planI.contenido.aspectosIntervencion.$error">
                        Debe tener como mínimo un aspecto de intervención
                        registrado
                      </h4>
                    </div>
                    <registro-multiple
                      name="Aspectos de Intervenciones"
                      :items="planI.contenido.aspectosIntervencion"
                    ></registro-multiple>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <div class="w-100 d-flex">
                      <v-text-field
                        v-model.trim="actividadAux"
                        label="Actividad/Estrategia"
                        @input="$v.actividadAux.$touch()"
                        @blur="$v.actividadAux.$touch()"
                        :error-messages="errorActividad"
                        outlined
                        color="#009900"
                      ></v-text-field>
                      <v-btn class="ml-2" fab color="success" @click="addActividad">
                        <v-icon>mdi-plus</v-icon>
                      </v-btn>
                    </div>
                    <div>
                      <h4 class="red--text" v-if="$v.planI.contenido.estrategias.$error">
                        Debe tener como mínimo una actividad/estrategia
                        registrado
                      </h4>
                    </div>
                    <registro-multiple
                      name="Actividades/Estrategias"
                      :items="planI.contenido.estrategias"
                    ></registro-multiple>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <div class="w-100 d-flex">
                      <v-text-field
                        v-model.trim="indicadorAux"
                        label="Indicador"
                        @input="$v.indicadorAux.$touch()"
                        @blur="$v.indicadorAux.$touch()"
                        :error-messages="errorIndicador"
                        outlined
                        color="#009900"
                      ></v-text-field>
                      <v-btn class="ml-2" fab color="success" @click="addIndicador">
                        <v-icon>mdi-plus</v-icon>
                      </v-btn>
                    </div>
                    <div>
                      <h4
                        class="red--text"
                        v-if="$v.planI.contenido.indicadores.$error"
                      >Debe tener como mínimo un indicador registrado</h4>
                    </div>
                    <registro-multiple name="Indicadores" :items="planI.contenido.indicadores"></registro-multiple>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <div class="w-100 d-flex">
                      <v-text-field
                        v-model.trim="metaAux"
                        label="Meta"
                        @input="$v.metaAux.$touch()"
                        @blur="$v.metaAux.$touch()"
                        :error-messages="errorMeta"
                        outlined
                        color="#009900"
                      ></v-text-field>
                      <v-btn class="ml-2" fab color="success" @click="addMeta">
                        <v-icon>mdi-plus</v-icon>
                      </v-btn>
                    </div>
                    <div>
                      <h4
                        class="red--text"
                        v-if="$v.planI.contenido.metas.$error"
                      >Debe tener como mínimo una meta registrada</h4>
                    </div>
                    <registro-multiple name="Metas" :items="planI.contenido.metas"></registro-multiple>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <div>
                      <v-card-text>
                        <img width="240" height="170" :src="this.user.datos.firma" alt />
                      </v-card-text>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-btn color="error" elevation="2" block @click="cerrarDialogo">
                      <v-icon left>mdi-close-outline</v-icon>Cerrar
                    </v-btn>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-btn block color="success" elevation="2" @click="registrarPlan">
                      <v-icon left>mdi-content-save-all-outline</v-icon>
                      <span>Finalizar</span>
                    </v-btn>
                  </v-col>
                </v-row>
              </form>
            </div>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
      <v-dialog width="450px" v-model="cargaRegistro" persistent>
        <v-card height="300px">
          <v-card-title class="justify-center">Registrando el plan de intervención</v-card-title>
          <div>
              <v-progress-circular
              style="display: block;margin:40px auto;"
              :size="90"
              :width="9"
              color="red"
              indeterminate
            ></v-progress-circular>
          </div>
           <v-card-subtitle class="justify-center" style="font-weight:bold;text-align:center">En unos momentos finalizaremos...</v-card-subtitle>
        </v-card>
      </v-dialog>
    </v-card-text>
  </v-card>
</template>
<script>
import axios from "axios";
import { mapMutations, mapState, mapGetters } from "vuex";
import { required, minLength, between } from "vuelidate/lib/validators";
import RegistroMultiple from "@/components/planIntervencion/General/RegistroMultiple.vue";
import moment from 'moment'

export default {
  props:["residente"],
  components: {
    RegistroMultiple
  },
  data() {
    return {
      planI: {
        id: "",
        tipo: "PlanIntervencionIndividualEducativo",
        historialcontenido: [],
        fechacreacion: null,
        area: "educativa",
        idresidente: "",
        fase: "2",
        estado: "creado",
        creadordocumento: "",
        contenido: {
          car: "",
          edad: 0,
          trimestre: 1,
          objetivoGeneral: "",
          objetivoEspecificos: [],
          aspectosIntervencion: [],
          estrategias: [],
          indicadores: [],
          metas: [],
          titulo: "Plan de Intervención Individual",
          codigoDocumento: ""
        }
      },
      datemenu: false,
      step: 1,
      objetivoespecificoAux: "",
      aspectoAux: "",
      actividadAux: "",
      indicadorAux: "",
      metaAux: "",
      cargaRegistro: false,
    };
  },
  validations() {
    return {
      objetivoespecificoAux: {
        minLength: minLength(10)
      },
      aspectoAux: {
        minLength: minLength(10)
      },
      actividadAux: {
        minLength: minLength(10)
      },
      indicadorAux: {
        minLength: minLength(10)
      },
      metaAux: {
        minLength: minLength(10)
      },
      planI: {
        contenido: {
          car: {
            required,
            minLength: minLength(3)
          },
          trimestre: {
            required,
            between: between(1, 4)
          },
          objetivoGeneral: {
            required
          },
          objetivoEspecificos: {
            required,
            minLength: minLength(1)
          },
          aspectosIntervencion: {
            required,
            minLength: minLength(1)
          },
          estrategias: {
            required,
            minLength: minLength(1)
          },
          indicadores: {
            required,
            minLength: minLength(1)
          },
          metas: {
            required,
            minLength: minLength(1)
          },
          titulo: {
            required,
            minLength: minLength(4)
          }
        }
      }
    };
  },
  methods: {
    async registrarPlan() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.mensaje(
          "error",
          "..Oops",
          "Se encontraron errores en el formulario",
          "<strong>Verifique los campos Ingresados<strong>",
          false
        );
      } else {
        this.cargaRegistro = true;
        this.planI.creadordocumento = this.user.id;

        this.planI.idresidente = this.residente.id;
        var urlPDF = this.generarPDF();
        this.planI.historialcontenido.push({
            url: urlPDF.substring(51),
        });
        let planIntervencionIndividual = {
          idresidente: this.residente.id,
          planintervencionindividual: this.planI,
        };

        console.log(planIntervencionIndividual);
        //this.cargaRegistro = false;

        await axios
          .post("/PlanIntervencion/educativo", planIntervencionIndividual)
          .then(res => {
            this.$emit("actualizar-progreso-fase1");
            this.cargaRegistro = false;
            this.cerrarDialogo();
          })
          .catch(err => console.log(err));

        this.mensaje(
                "success",
                "Listo",
                "Plan registrado Satisfactoriamente",
                "<strong>Volviendo al progreso<strong>",
                true
              );
      }
    },
    mensaje(icono, titulo, texto, footer, valid) {
      this.$swal({
        icon: icono,
        title: titulo,
        text: texto,
        footer: footer
      });
    },
    addObjEspecifico() {
      if (
        this.objetivoespecificoAux != "" &&
        !this.$v.objetivoespecificoAux.$invalid
      ) {
        this.planI.contenido.objetivoEspecificos.push(
          this.objetivoespecificoAux
        );
        this.objetivoespecificoAux = "";
      }
    },
    addAspecto() {
      if (this.aspectoAux != "" && !this.$v.aspectoAux.$invalid) {
        this.planI.contenido.aspectosIntervencion.push(this.aspectoAux);
        this.aspectoAux = "";
      }
    },
    addActividad() {
      if (this.actividadAux != "" && !this.$v.actividadAux.$invalid) {
        this.planI.contenido.estrategias.push(this.actividadAux);
        this.actividadAux = "";
      }
    },
    addIndicador() {
      if (this.indicadorAux != "" && !this.$v.indicadorAux.$invalid) {
        this.planI.contenido.indicadores.push(this.indicadorAux);
        this.indicadorAux = "";
      }
    },
    addMeta() {
      if (this.metaAux != "" && !this.$v.metaAux.$invalid) {
        this.planI.contenido.metas.push(this.metaAux);
        this.metaAux = "";
      }
    },
    cerrarDialogo(){
      this.$emit("cerrar-modal-docf1");
      this.step = 1;
      //this.observacionAux="";
      //this.fichaIngreso = this.limpiarFichaIngreso();
      //this.documentoEscolar ={titulo:"",file:""};
      this.$v.$reset();
    },
    generarPDF(){
        var doc = new jsPDF('l');
        var pageSize = doc.internal.pageSize;
        var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
        var pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
        doc.setFontSize(12);
        doc.text(this.planI.contenido.titulo, pageWidth / 2, 20, 'center');
        doc.setFontSize(10);
        doc.text("CAR: DOMI", 25, 28);
        doc.text("Apellidos y Nombres: " + this.residente.apellido +" "+this.residente.nombre+'          Edad: '+this.residenteEdad(), 25, 33);
        doc.text("Trimestre: " + this.planI.contenido.trimestre, 25, 38);
        doc.autoTable({
          theme: 'grid',
          margin: {
            top: 45,
            left: 25,
            right: 25,
          },
          head: [
           [{ content: 'Objetivo General: '+this.planI.contenido.objetivoGeneral + "\n" + "Plan de seguimiento", colSpan: 5,styles: { fillColor: [231, 76, 60]}}]
          ],
          body:[
            [{ content:"Objetivo específicos",styles: { halign: 'center'}}, 
            { content:"Casos / Problemas" + "\n" +"(aspectos de intervención)",styles: { halign: 'center'}}, 
            { content:"Actividades/ estrategias",styles: { halign: 'center'}},
            { content:"Indicadores",styles: { halign: 'center'}},
            { content:"Meta",styles: { halign: 'center'}},],
            [this.objetivosEspecificosPdf(),this.aspectosInterventcionPdf(),this.actividadesPdf(),this.indicadoresPdf(),this.metasPdf()]
          ]
        });
        /* No permite acceso F
        var image = getBase64Image(document.getElementById("imageid"));
        console.log(image);  */ 
        if (doc.autoTableEndPosY() + 34 < pageHeight - 23) {
          //doc.addImage(imgData, 'JPEG', (pageWidth / 2) - 27, doc.autoTableEndPosY() + 1, 55, 35);
          doc.setFontSize(10);
          doc.setFontType('bold');
          doc.text("---------------------------------------", pageWidth / 2, doc.autoTableEndPosY() + 24, 'center');
          doc.text(this.user.datos.nombre + " " + this.user.datos.apellido, pageWidth / 2, doc.autoTableEndPosY() + 29, 'center');
          doc.text(this.user.rol.nombre, pageWidth / 2, doc.autoTableEndPosY() + 34, 'center');
        } else {
          doc.addPage();
          doc.setFontSize(10);
          //doc.addImage(imgData, 'JPEG', (pageWidth / 2) - 27, 37, 55, 35);
          doc.setFontSize(10);
          doc.setFontType('bold');
          doc.text("---------------------------------------", pageWidth / 2, 46, 'center');
          doc.text(this.user.datos.nombre + " " + this.user.datos.apellido, pageWidth / 2, 51, 'center');
          doc.text(this.user.rol.nombre, pageWidth / 2, 56, 'center');
        }
        return doc.output('datauristring');
      },
      residenteEdad(){
        var hoy = new Date();
        var cumpleanos = new Date(this.residente.fechanacimiento);
        var edad = hoy.getFullYear() - cumpleanos.getFullYear();
        var m = hoy.getMonth() - cumpleanos.getMonth();
        if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
          edad--;
        }
        return edad;
      },
      objetivosEspecificosPdf(){
        var observaciones = "";
        this.planI.contenido.objetivoEspecificos.forEach(element => 
          observaciones += "- "+ element + "\n"+ "\n"
        );
        return observaciones
      },
      aspectosInterventcionPdf(){
        var observaciones = "";
        this.planI.contenido.aspectosIntervencion.forEach(element => 
          observaciones += "- "+ element + "\n"+ "\n"
        );
        return observaciones
      },
      actividadesPdf(){
        var observaciones = "";
        this.planI.contenido.estrategias.forEach(element => 
          observaciones += "- "+ element + "\n"+ "\n"
        );
        return observaciones
      },
      indicadoresPdf(){
        var observaciones = "";
        this.planI.contenido.indicadores.forEach(element => 
          observaciones += "- "+ element + "\n"+ "\n"
        );
        return observaciones
      },
      metasPdf(){
        var observaciones = "";
        this.planI.contenido.metas.forEach(element => 
          observaciones += "- "+ element + "\n"+ "\n"
        );
        return observaciones
      }   
  },
  computed: {
    ...mapGetters(["user"]),
    verifyColor() {
      return "red";
    },
    errorObjetivoEspecifico() {
      const errors = [];

      if (!this.$v.objetivoespecificoAux.$dirty) {
        return errors;
      }

      if (!this.$v.objetivoespecificoAux.minLength) {
        errors.push("Debe ingresar como mínimo 10 caracteres");
      }

      return errors;
    },
    errorAspecto() {
      const errors = [];

      if (!this.$v.aspectoAux.$dirty) {
        return errors;
      }

      if (!this.$v.aspectoAux.minLength) {
        errors.push("Debe ingresar como mínimo 10 caracteres");
      }

      return errors;
    },
    errorActividad() {
      const errors = [];

      if (!this.$v.actividadAux.$dirty) {
        return errors;
      }

      if (!this.$v.actividadAux.minLength) {
        errors.push("Debe ingresar como mínimo 10 caracteres");
      }

      return errors;
    },
    errorIndicador() {
      const errors = [];

      if (!this.$v.indicadorAux.$dirty) {
        return errors;
      }

      if (!this.$v.indicadorAux.minLength) {
        errors.push("Debe ingresar como mínimo 10 caracteres");
      }

      return errors;
    },
    errorMeta() {
      const errors = [];

      if (!this.$v.metaAux.$dirty) {
        return errors;
      }

      if (!this.$v.metaAux.minLength) {
        errors.push("Debe ingresar como mínimo 10 caracteres");
      }

      return errors;
    },
    errorTitulo() {
      const errors = [];
      if (!this.$v.planI.contenido.titulo.$dirty) return errors;
      !this.$v.planI.contenido.titulo.required &&
        errors.push("Debe ingresar un nombre de plan obligatoriamente");
      !this.$v.planI.contenido.titulo.minLength &&
        errors.push("El nombre de plan debe poseer al menos 4 caracteres");
      return errors;
    },
    errorCar() {
      const errors = [];
      if (!this.$v.planI.contenido.car.$dirty) return errors;
      !this.$v.planI.contenido.car.required &&
        errors.push("Debe ingresar un CAR obligatoriamente");
      return errors;
    },
    errorTrimestre() {
      const errors = [];
      if (!this.$v.planI.contenido.trimestre.$dirty) return errors;
      !this.$v.planI.contenido.trimestre.required &&
        errors.push("Debe ingresar el trimestre obligatoriamente");
      !this.$v.planI.contenido.trimestre.between &&
        errors.push("el trimestre debe estar comprendido desde 1 hasta 4");
      return errors;
    },
    errorGeneral() {
      const errors = [];
      if (!this.$v.planI.contenido.objetivoGeneral.$dirty) return errors;
      !this.$v.planI.contenido.objetivoGeneral.required &&
        errors.push("Debe ingresar un objetivo general obligatoriamente");
      return errors;
    },
    errorEspecificos() {
      const errors = [];
      if (!this.$v.planI.contenido.objetivoEspecificos.$dirty) {
        return errors;
      }
      if (!this.$v.planI.contenido.objetivoEspecificos.required) {
        errors.push("Los objetivos específicos son requeridos");
      }

      if (!this.$v.planI.contenido.objetivoEspecificos.minLength) {
        errors.push("Se debe registrar un objetivo específico como mínimo");
      }

      return errors;
    },
    errorAspectos() {
      const errors = [];
      if (!this.$v.planI.contenido.aspectosIntervencion.$dirty) {
        return errors;
      }
      if (!this.$v.planI.contenido.aspectosIntervencion.required) {
        errors.push("Los aspectos de intervención son requeridos");
      }
      if (!this.$v.planI.contenido.aspectosIntervencion.minLength) {
        errors.push("Se debe registrar un aspecto de intervención como mínimo");
      }

      return errors;
    },
    errorEstrategias() {
      const errors = [];
      if (!this.$v.planI.contenido.estrategias.$dirty) {
        return errors;
      }
      if (!this.$v.planI.contenido.estrategias.required) {
        errors.push("Las estrategias son requeridas");
      }
      if (!this.$v.planI.contenido.estrategias.minLength) {
        errors.push("Se debe registrar una estrategia como mínimo");
      }
      return errors;
    },
    errorIndicadores() {
      const errors = [];
      if (!this.$v.planI.contenido.indicadores.$dirty) {
        return errors;
      }
      if (!this.$v.planI.contenido.indicadores.required) {
        errors.push("Los indicadores son requeridos");
      }
      if (!this.$v.planI.contenido.indicadores.minLength) {
        errors.push("Se debe registrar un indicador como mínimo");
      }
      return errors;
    },
    errorMetas() {
      const errors = [];
      if (!this.$v.planI.contenido.metas.$dirty) {
        return errors;
      }
      if (!this.$v.planI.contenido.metas.required) {
        errors.push("Las metas son requeridas");
      }
      if (!this.$v.planI.contenido.metas.minLength) {
        errors.push("Se debe registrar una meta como mínimo");
      }

      return errors;
    }
  },
  filters:{
        extencionString: (cadena)=>{
          return cadena.length > 35? `${cadena.substring(0,34)}...` : cadena;
        },numeracionListaString: (index, etiqueta)=>{
           return `${etiqueta} ${++index}: `;
        },generarAvatar:(datos)=>{
          return `${datos.nombre.substring(0,1)}${datos.apellido.substring(0,1)}`;
        },fomatoFecha: (fecha) =>{
            var formato = moment(fecha);
            return formato.format("llll");
        }
    },
  created() {
    //Calculo de edad
    var hoy = new Date();
    var cumpleanos = new Date(this.residente.fechanacimiento);
    this.planI.contenido.edad = hoy.getFullYear() - cumpleanos.getFullYear();
    this.planI.contenido.titulo = this.planI.contenido.titulo + " " + this.residente.nombre + " " + this.residente.apellido;

    this.objetivoespecificoAux = "";
    this.aspectoAux = "";
    this.actividadAux = "";
    this.indicadorAux = "";
    this.metaAux = "";
  }
};
</script>
<style  scoped>
.container-planI {
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
.w-100 {
  width: 100% !important;
}
</style>