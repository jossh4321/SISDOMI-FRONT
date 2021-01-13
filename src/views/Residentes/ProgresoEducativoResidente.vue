<template>
    <div>
    <template v-if="showInfo">
      <v-card
        elevation="3"
        outlined
        class="card"
        style="text-align: center; height: 150px; padding-top: 30px;"
      >
        <div class="progress">
          <v-progress-circular size="80" width="10" color="red" indeterminate></v-progress-circular>
        </div>
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
          </v-chip>
          <v-chip
            class="ma-2"
            color="white"
            label
            text-color="primary"
            @click="navegarto('/dashboard/home/residentes')"
          >
            <v-icon left>mdi-check</v-icon>Residentes
          </v-chip>>
          <v-chip class="ma-2" color="white" outlined pill>
            <v-icon left>mdi-label</v-icon>Progreso del residente {{ residente.nombre }} {{ residente.apellido }}
          </v-chip>
        </span>
        <v-spacer></v-spacer>
      </v-app-bar>
      <v-sheet class="overflow-hidden">
        <v-container class="fill-height">
          <v-card class="card">
            <v-card-title
              class="justify-center"
            >Datos generales del residente {{ residente.nombre }} {{ residente.apellido }}</v-card-title>
            <VisualizadorResidente :residente="residente"></VisualizadorResidente>
                <v-stepper v-model="step" style="padding: 15px 20px; margin: 20px;">
                    <v-stepper-header>
                        <v-stepper-step editable step="1">
                            Área Educativa
                        </v-stepper-step>
                        <v-divider></v-divider>
                        <v-stepper-step editable step="2">
                            Área Social
                        </v-stepper-step>
                        <v-divider></v-divider>
                        <v-stepper-step editable step="3">
                            Área Psicológica
                        </v-stepper-step>
                    </v-stepper-header>
                    <v-stepper-items>
                      <v-stepper-content step="1">
                        <v-expansion-panels focusable>
                          <v-expansion-panel
                          v-for="(fase,i) in listFases"
                          :key="i">
                            <v-expansion-panel-header disable-icon-rotate>
                              Fase {{ i+1 }}
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                              <v-card class="card" style="margin: 20px">
                                <v-timeline align-top :dense="$vuetify.breakpoint.smAndDown">
                                  <v-timeline-item
                                    v-for="(documento,j) in fase.educativa.documentos"
                                    :key="j"
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
                                      <div style="padding:5px" >
                                        <v-btn color="info" rounded block
                                          @click="abrirDialogoVisualizarDocumento(titulosDoc[documento.tipo].visualizar)">
                                          <v-icon left>mdi-information</v-icon>Ver Detalle
                                        </v-btn>
                                      </div>
                                    </v-col>
                                    <v-col cols="12" xs="12" sm="6" md="6">
                                       <div style="padding:5px">
                                          <v-btn color="warning" rounded block
                                              @click="verPDF(titulosDoc[documento.tipo].visualizar,fase.fase)">
                                              <v-icon left>mdi-folder-edit</v-icon>Ver pdf
                                          </v-btn>
                                        </div>
                                    </v-col>
                                  </v-row>
                                </template>
                                <template v-else>
                                  <v-col cols="12">
                                    <div class="docs-siguiente">
                                      <span>Próximo a Registrar</span>
                                    </div>
                                  </v-col>
                                </template>
                                </v-card>
                              </v-timeline-item>
                            </v-timeline>
                            </v-card>
                            </v-expansion-panel-content>
                          </v-expansion-panel>
                        </v-expansion-panels>
                      </v-stepper-content>
                      <v-stepper-content step="2">
                        <v-expansion-panels focusable>
                          <v-expansion-panel>
                            <v-expansion-panel-header disable-icon-rotate>
                              Fase 1
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                            </v-expansion-panel-content>
                          </v-expansion-panel>
                          <v-expansion-panel>
                            <v-expansion-panel-header disable-icon-rotate>
                              Fase 2
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                            </v-expansion-panel-content>
                          </v-expansion-panel>
                          <v-expansion-panel>
                            <v-expansion-panel-header disable-icon-rotate>
                              Fase 3
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                            </v-expansion-panel-content>
                          </v-expansion-panel>
                          <v-expansion-panel>
                            <v-expansion-panel-header disable-icon-rotate>
                              Fase 4
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                            </v-expansion-panel-content>
                          </v-expansion-panel>
                        </v-expansion-panels>
                      </v-stepper-content>
                      <v-stepper-content step="3">
                        <v-expansion-panels focusable>
                          <v-expansion-panel>
                            <v-expansion-panel-header disable-icon-rotate>
                              Fase 1
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                            </v-expansion-panel-content>
                          </v-expansion-panel>
                          <v-expansion-panel>
                            <v-expansion-panel-header disable-icon-rotate>
                              Fase 2
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                            </v-expansion-panel-content>
                          </v-expansion-panel>
                          <v-expansion-panel>
                            <v-expansion-panel-header disable-icon-rotate>
                              Fase 3
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                            </v-expansion-panel-content>
                          </v-expansion-panel>
                          <v-expansion-panel>
                            <v-expansion-panel-header disable-icon-rotate>
                              Fase 4
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                            </v-expansion-panel-content>
                          </v-expansion-panel>
                        </v-expansion-panels>
                      </v-stepper-content>  
                    </v-stepper-items>
                </v-stepper>
          </v-card>
        </v-container>   
      </v-sheet>
      <!--Dialogo de Visualizar de Documentos-->
      <v-dialog v-model="dialogoDetalleDocumentos" persistent max-width="850px">
        <v-component
          :is="visualizarRegistro"
          :residente="residente"
          @cerrar-modal-docf1="cerrarDialogoVisualizarDocF1"
        ></v-component>
      </v-dialog>
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
    </template>          
    </div>
</template>
<script>
import VisualizarFichaEducativaIngreso from "@/components/DocumentosInterfazTratamiento/Fase I/Educativa/VisualizarFichaIngresoEducativa.vue";
import VisualizarInformeEducativoInicial from "@/components/DocumentosInterfazTratamiento/Fase I/Educativa/VisualizarInformeEducativoInicial.vue";
import VisualizarPlanIntervencionIndividualEducativo from "@/components/DocumentosInterfazTratamiento/Fase I/Educativa/VisualizarPlanIntervencionEducativoIndividual.vue";
import VisualizarInformeSeguimientoEducativo from "@/components/DocumentosInterfazTratamiento/Fase I/Educativa/VisualizarInformeSeguimientoEducativo.vue";
import VisualizarInformeEducativoEvolutivo from "@/components/DocumentosInterfazTratamiento/Fase 2/Educativa/InformeEvolutivo/VisualizarInformeEducativoEvolutivo.vue";
import VisualizarInformeEducativoFinal from "@/components/DocumentosInterfazTratamiento/Fase 3/Educativa/VisualizarInformeEducativoFinal.vue";
import axios from "axios";
import VisualizadorResidente from "@/components/residentes/VisualizadorResidente.vue";
export default {
    components: {
        VisualizadorResidente,
        VisualizarFichaEducativaIngreso,
        VisualizarInformeEducativoInicial,
        VisualizarPlanIntervencionIndividualEducativo,
        VisualizarInformeSeguimientoEducativo,
        VisualizarInformeEducativoEvolutivo,
        VisualizarInformeEducativoFinal,
    },
    data() {
        return {
           showInfo: true,
           step:1,
           residente: "",
           pdf:"",
           visualizarRegistro:"",
           dialogoDetalleDocumentos : false,
           dialogVistaPreviaAnexos: false,
           listFases:"",
           titulosDoc: {
            FichaEducativaIngreso: {
              titulo: "Ficha Educativa de Ingreso",
              visualizar: "VisualizarFichaEducativaIngreso"
            },
            InformeEducativoInicial: {
              titulo: "Informe Educativo Inicial",
              visualizar: "VisualizarInformeEducativoInicial"
            },
            PlanIntervencionIndividualEducativo: {
              titulo: "Plan de Intervención Educativo Individual",
              visualizar: "VisualizarPlanIntervencionIndividualEducativo"
            },
            InformeSeguimientoEducativo: {
              titulo: "Informe de Seguimiento Educativo",
              visualizar: "VisualizarInformeSeguimientoEducativo"
            },
            InformeEducativoEvolutivo: {
              titulo: "Informe Educativo Evolutivo",
              visualizar: "VisualizarInformeEducativoEvolutivo"
            },
            InformeEducativoFinal: {
              titulo: "Informe Educativo Final",
              visualizar: "VisualizarInformeEducativoFinal"
            },
          } 
        }
    },
    async created(){
        var miruta = "/residente/progreso/" + this.$route.params.idresidente;
        await axios
            .get(miruta)
            .then(res => {
            this.residente = res.data;
            this.residente.id = this.$route.params.idresidente;
            })
            .catch(err => console.log(err));
        this.listFases = this.obtenerSecuenciaDocumentos();
        console.log(this.listFases);
        this.showInfo = false;
    },
    methods:{
      navegarto(ruta) {
        this.$router.push(ruta);
      },
      async verPDF(documento, fase){
        console.log(fase);
        var nombreDocumento = documento.substring(10);
        var stringFase = fase.toString();
        await axios
        .get("/documento/"+nombreDocumento+"/residente/"+this.residente.id)
        .then((x) => {
          for(var i = 0; i < x.data.length; i++){
            if(stringFase = x.data[i].fase){
              this.pdf = x.data[i].historialcontenido[x.data[i].historialcontenido.length - 1].url;
            }
          }
        })
        .catch((err) => console.log(err));
        this.dialogVistaPreviaAnexos = true;
      },
      cerrarVistaPreviaAnexo() {
        this.dialogVistaPreviaAnexos = false;
      },
      abrirDialogoVisualizarDocumento(componente) {
        this.visualizarRegistro = componente;
        this.dialogoDetalleDocumentos = true;
      },
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
            fase.educativa.documentos = this.obtenerEstadoDocumentosFaseArea(
              fase.educativa.documentos
            );
            fase.social.documentos = this.obtenerEstadoDocumentosFaseArea(
              fase.social.documentos
            );
            fase.psicologica.documentos = this.obtenerEstadoDocumentosFaseArea(
              fase.psicologica.documentos
            );
          } else {
            fase["status"] = "posterior";
          }
          return fase;
        });
        return listaFases;
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
      obtenerColorTimeLineItem(documento) {
        return documento.indice == "anterior"
          ? "success"
          : documento.indice == "actual"
          ? "warning"
          : "info";
      },
      obtenerClaseTimeLineItem(documento) {
        return documento.indice == "anterior"
          ? "success"
          : documento.indice == "actual"
          ? "warning"
          : "info";
      },
      cerrarDialogoVisualizarDocF1() {
        this.dialogoDetalleDocumentos = false;
        this.visualizarRegistro = "";
      },
    },
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