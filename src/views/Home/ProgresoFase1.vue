<template >
  <div>
    <template v-if="cargaProgreso == false">
      <v-card
        elevation="3"
        outlined
        class="card"
        height="700px"
        style="text-align: center; height: 700px; padding-top: 30px;"
      >
        <div class="progress">
          <v-progress-circular size="80" width="10" color="red" indeterminate></v-progress-circular>
        </div>
        <v-card-title class="justify-center" style="margin-top:20px;color:red">Cargando Datos...</v-card-title>
      </v-card>
    </template>
    <template v-else>
      <v-app-bar color="primary accent-4" dense dark>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <span>
          <v-chip
            class="ma-2"
            color="white"
            label
            text-color="green"
            @click="navegarto('/dashboard/Home')"
          >
            <v-icon left>mdi-home</v-icon>Menú principal
          </v-chip>>
          <v-chip
            class="ma-2"
            color="white"
            label
            text-color="primary"
            @click="navegarto('/dashboard/Tratamiento')"
          >
            <v-icon left>mdi-label</v-icon>Tratamiento
          </v-chip>>
          <v-chip
            class="ma-2"
            color="white"
            label
            text-color="primary"
            @click="navegarto('/dashboard/Fase1')"
          >
            <v-icon left>mdi-check</v-icon>Fase 1
          </v-chip>>
          <v-chip class="ma-2" color="white" outlined pill>
            <v-icon left>mdi-account-circle</v-icon>
            {{ residente.nombre }} {{ residente.apellido }}
          </v-chip>
        </span>
        <v-spacer></v-spacer>
      </v-app-bar>

      <v-sheet class="overflow-hidden">
        <v-container class="fill-height">
          <v-card class="card">
            <v-card-title
              class="justify-center"
            >Datos generales del residente {{ residente.nombre }} {{ residente.nombre }}</v-card-title>

            <VisualizadorResidente :residente="residente"></VisualizadorResidente>

            <v-card style="padding: 15px 20px; margin: 20px;">
              <div class="container-user">
                <v-card style="padding:1%" elevation="0">
                  <v-card-text>
                    <v-row style="margin-left:2px">
                      <v-col cols="8">
                        <v-row
                          class="my-1"
                          align="center"
                        >
                          <v-col cols="12">
                            <div class="text--primary" style="font-size: 25px">
                              Documentos necesarios para promover al residente
                            </div>
                          </v-col>
                          <strong class="mx-4 success--text text--darken-2">
                            Documentos Completados: {{ obtenerDocumentosCompletos  }}
                          </strong>

                          <v-divider vertical></v-divider>

                          <strong class="mx-4 text--darken-2" :class="[(4!=0) ? 'error--text' : 'info--text']"> <!-- remainingTasks -->
                            Documentos Faltantes: {{ obtenerDocumentosFaltantes }} <!-- remainingTasks -->
                          </strong>
                        </v-row>
                        <v-divider class="mt-4"></v-divider>
                      </v-col>
                      
                      <v-col cols="4">
                        <v-progress-circular
                          :rotate="-90"
                          :size="90"
                          :width="9"
                          color="green"
                          :value="progressOne"
                          class="mr-2"
                        >{{progressOne}}<span style="font-size:12px">%</span></v-progress-circular>  <!-- progressOne -->
                      </v-col>
                      
                    </v-row>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn 
                      dark color="success"
                      v-if="fase.educativa.estado != 'incompleto'"
                      @click="registrarDocumentoTransicionFase()"
                      >
                      <span>Realizar promoción</span>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </div>
            </v-card>

            <v-card class="card" style="margin: 20px">
              <v-card-title class="justify-center">Progreso de Fase 1</v-card-title>
              <v-timeline align-top :dense="$vuetify.breakpoint.smAndDown">
                <v-timeline-item
                  v-for="(documento,i) in fase.educativa.documentos"
                  :key="i"
                  :color="obtenerColorTimeLineItem(documento)"
                  icon="mdi-buffer"
                >
                  <v-card :class="obtenerClaseTimeLineItem(documento)" dark>
                    <v-card-title
                      class="justify-center"
                      style="font-size: 15px;text-align: center;word-break: normal; padding-bottom: 0;"
                    >{{titulosDoc[documento.tipo].titulo}}</v-card-title>
                    <template v-if="documento.indice == 'anterior'">
                      <v-row>
                        <v-col cols="12" xs="12" sm="6" md="6">
                        <div style="padding:5px">
                            <v-btn color="warning" rounded block>
                              <v-icon left>mdi-folder-edit</v-icon>Modificar
                            </v-btn>
                        </div>
                      </v-col>
                      <v-col cols="12" xs="12" sm="6" md="6">
                         <div style="padding:5px">
                            <v-btn color="info" rounded block>
                          <v-icon left>mdi-information</v-icon>Ver Detalle
                        </v-btn>
                         </div>
                      </v-col>
                      </v-row>
                      
                    </template>
                    <template v-else-if="documento.indice == 'actual'">
                      <v-col cols="12">
                        <v-btn
                          color="success"
                          block
                          rounded
                          @click="abrirDialogoRegistroDocumento(titulosDoc[documento.tipo].registrar)"
                        >
                          <v-icon left>mdi-book-plus</v-icon>
                          <span>Registrar</span>
                        </v-btn>
                      </v-col>
                    </template>
                    <template v-else>
                      <v-col cols="12">
                        <div class="docs-siguiente">
                          <span>Proximo a Registrar</span>
                        </div>
                      </v-col>
                    </template>
                  </v-card>
                </v-timeline-item>
              </v-timeline>
            </v-card>
          </v-card>
        </v-container>
      </v-sheet>
      <v-navigation-drawer v-model="drawer" absolute temporary>
        <v-list nav dense>
          <v-list-item-group active-class="deep-purple--text text--accent-4">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="title">Lista de Residentes</v-list-item-title>
                <v-list-item-subtitle>Actualmente en la fase 1</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>
            <v-list-item v-for="residente in residentesFase" :key="residente.id" link>
              <v-list-item-icon>
                <v-icon>mdi-account-multiple</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ residente.nombre }} {{residente.apellido}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
      <!--Dialogo de Registro de Fichas de Ingreso-->
      <v-dialog v-model="dialogoRegistroDocumentos" persistent max-width="850px">
        <v-component
          :is="selectorRegistro"
          :residente="residente"
          @cerrar-modal-docf1="cerrarDialogoRegistroDocF1"
          @actualizar-progreso-fase1="actualizarProgreso"
        ></v-component>
      </v-dialog>
      <!--Dialogo de Fase-->
      <v-dialog persistent v-model="dialogopromocion" max-width="1000px">
        <RegistrarPromocionFase2
          :residente="residenteProm"
          @close-dialog-promocion="cerrarDialogoPromocion"
        ></RegistrarPromocionFase2>
      </v-dialog>
    </template>
  </div>
</template>
<script>
import VisualizadorResidente from "@/components/residentes/VisualizadorResidente.vue";
import RegistrarFichaIngresoEducativa from "@/components/DocumentosInterfazTratamiento/Fase I/Educativa/RegistrarFichaEducativaIngreso.vue";
import RegistrarInformeEducativoInicial from "@/components/DocumentosInterfazTratamiento/Fase I/Educativa/RegistrarInformeEducativoInicial.vue";
import RegistrarPlanIntervencionEducativoIndividual from "@/components/DocumentosInterfazTratamiento/Fase I/Educativa/RegistrarPlanIntervencionIndividualEducativo.vue";
import RegistrarInformeSeguimientoEducativo from "@/components/DocumentosInterfazTratamiento/Fase I/Educativa/RegistrarInformeSeguimientoEducativo.vue";
import RegistrarPromocionFase2 from "@/components/DocumentosInterfazTratamiento/Fase I/RegistrarPromocionFase2.vue";
import {mapMutations, mapState} from "vuex";
import axios from "axios";
export default {
  name: "ProgresoResidenteF1",
  components: {
    VisualizadorResidente,
    RegistrarFichaIngresoEducativa,
    RegistrarInformeEducativoInicial,
    RegistrarPlanIntervencionEducativoIndividual,
    RegistrarInformeSeguimientoEducativo,
    RegistrarPromocionFase2
  },
  data() {
    return {
      drawer: false,
      residente: "",
      residenteProm: {},
      residentesFase: [],
      cargaProgreso: false,
      selectorRegistro: "",
      dialogoRegistroDocumentos: false,
      dialogopromocion: false,
      titulosDoc: {
        FichaEducativaIngreso: {
          titulo: "Ficha Educativa de Ingreso",
          registrar: "RegistrarFichaIngresoEducativa",
          modificar: "",
          visualizar: ""
        },
        InformeEducativoInicial: {
          titulo: "Informe Educativo Inicial",
          registrar: "RegistrarInformeEducativoInicial",
          modificar: "",
          visualizar: ""
        },
        PlanIntervencionIndividualEducativo: {
          titulo: "Plan de Intervencion Educativo Individual",
          registrar: "RegistrarPlanIntervencionEducativoIndividual",
          modificar: "",
          visualizar: ""
        },
        InformeSeguimientoEducativo: {
          titulo: "Informe de Seguimiento Educativo",
          registrar: "RegistrarInformeSeguimientoEducativo",
          modificar: "",
          visualizar: ""
        }
      }
    };
  },
  async created() {
    var miruta = "/residente/progreso/" + this.$route.params.id;
    await axios
      .get("/residente/all/fase/1")
      .then(res => {
        this.residentesFase = res.data;
        //console.log(res.data);
      })
      .catch(err => console.log(err));
    await axios
      .get(miruta)
      .then(res => {
        this.residente = res.data;
        this.residente.id = this.$route.params.id;
        console.log(res.data);
      })
      .catch(err => console.log(err));
    this.setFase(this.obtenerSecuenciaDocumentos()[0]);
    this.cargaProgreso = true;
    console.log("LISTA FASES");
    console.log(this.fase);
  },
  methods: {
    ...mapMutations(["setFase"]),
    obtenerSecuenciaDocumentos() {
      var residenteFaseDoc = this.residente;
      var listaFases = residenteFaseDoc.fases.progreso;
      var faseResidenteActual =
        residenteFaseDoc.progreso[residenteFaseDoc.progreso.length - 1];
      var flag = false;
      listaFases = listaFases.map(fase => {
        if (faseResidenteActual.fase == fase.fase) {
          fase["status"] = "actual";
          fase.educativa.documentos = this.obtenerEstadoDocumentosFaseArea(
            fase.educativa.documentos
          );
          fase.social.documentos = this.obtenerEstadoDocumentosFaseArea(
            fase.social.documentos
          );
          fase.psicologica.documentos = this.obtenerEstadoDocumentosFaseArea(
            fase.psicologica.documentos
          );
        } else if (faseResidenteActual.fase > fase.fase) {
          fase["status"] = "anterior";
        } else {
          fase["status"] = "posterior";
        }
        return fase;
      });
      return listaFases;
    },async actualizarProgreso(){
       var miruta = "/residente/progreso/" + this.residente.id;
       await axios
        .get(miruta)
        .then(res => {
          this.residente = res.data;
          this.residente.id = this.$route.params.id;
          console.log(res.data);
        })
        .catch(err => console.log(err));
        this.setFase(this.obtenerSecuenciaDocumentos()[0]);
    },obtenerEstadoDocumentosFaseArea(listaDocumentos) {
      var flag = false;
      listaDocumentos = listaDocumentos.map(val => {
        if (val.estado.toLowerCase() == "pendiente" && flag == false) {
          val["indice"] = "actual";
          flag = true;
        } else if (val.estado.toLowerCase() == "completo") {
          val["indice"] = "anterior";
        } else {
          val["indice"] = "posterior";
        }
        return val;
      });
      return listaDocumentos;
    },
    obtenerClaseTimeLineItem(documento) {
      return documento.indice == "anterior"
        ? "success"
        : documento.indice == "actual"
        ? "warning"
        : "info";
    },
    obtenerColorTimeLineItem(documento) {
      return documento.indice == "anterior"
        ? "success"
        : documento.indice == "actual"
        ? "warning"
        : "info";
    },
    abrirDialogoRegistroDocumento(componente) {
      this.selectorRegistro = componente;
      this.dialogoRegistroDocumentos = true;
    },
    cerrarDialogoRegistroDocF1() {
      this.dialogoRegistroDocumentos = false;
      this.selectorRegistro = "";
    },
    cerrarDialogoPromocion() {
      this.dialogopromocion = false;
    },
    navegarto(ruta) {
      this.$router.push(ruta);
    },
    async registrarDocumentoTransicionFase() {
      this.residenteProm = await this.loadResidenteDetalle(this.residente.id);
      this.dialogopromocion = true;
    },

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
  },
  computed: {
    ...mapState(['fase']),
    obtenerDocumentosCompletos () {
      var numero = this.fase.educativa.documentos.filter(documento => documento.estado !== "Pendiente" ).length;
      return numero;
    },
    obtenerDocumentosFaltantes () {
      var numero = this.fase.educativa.documentos.filter(documento => documento.estado === "Pendiente" ).length;
      return numero;
    },

    progressOne () {
      var retorno = Math.round(this.obtenerDocumentosCompletos/this.fase.educativa.documentos.length * 100)
      return retorno
    },
  },
  filters: {}
};
</script>
<style scoped>
.card-item {
  padding: 7px;
  margin: 5px;
  border: none;
  border-radius: none;
}
.fase-superada {
  border: 2.6px solid #003300;
  border-radius: 20px;
  padding: 7px;
  width: 90%;
  color: #003300;
  font-weight: bold;
  text-align: center;
  background-color: #00b300;
}
.fase-actual {
  border: 2.6px solid #000033;
  border-radius: 20px;
  padding: 7px;
  width: 90%;
  color: #000033;
  font-weight: bold;
  text-align: center;
  background-color: #1a1aff;
}
.fase-proxima {
  border: 2.6px solid #331a00;
  border-radius: 20px;
  padding: 7px;
  width: 90%;
  color: #331a00;
  font-weight: bold;
  text-align: center;
  background-color: #ffff00;
}
.docs-siguiente {
  color: white;
  border-radius: 5px;
  border: 3px white solid;
  text-align: center;
  font-weight: bold;
}
.fondoverde {
  background-color: green;
}
.fondobeige {
  background-color: #ffd35c;
}
.fondoazul {
  background-color: cornflowerblue;
}
</style>