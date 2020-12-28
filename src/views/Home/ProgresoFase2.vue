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
            @click="navegarto('/dashboard/Fase2')"
          >
            <v-icon left>mdi-check</v-icon>Fase 2
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

            <v-card class="card" style="margin: 20px">
                <v-card-title
                    class="justify-center"
                    >Progreso de Fase 2</v-card-title>
                <v-timeline align-top :dense="$vuetify.breakpoint.smAndDown">
                    <v-timeline-item
                        :color="listaFases[1].educativa.documentos[0].estado == 'Completo' ? 'success' : listaFases[1].educativa.documentos[0].indice == 'actual' ? 'warning' : 'info'"
                        icon="mdi-buffer"
                    >
                        <v-card :class="[listaFases[1].educativa.documentos[0].estado == 'Completo' ? 'fondoverde' : listaFases[1].educativa.documentos[0].indice == 'actual' ? 'fondobeige' : 'fondoazul']" dark>
                        <v-card-title
                        class="justify-center"
                        style="font-size: 15px;text-align: center;word-break: normal; padding-bottom: 0;"
                        >Plan de intervención Individual Educativo</v-card-title>

                        <!-- <v-btn
                          v-if="listaFases[1].educativa.documentos[0].estado == 'Completo'"
                          block color="success" style="min-width: 180px!important; margin: 0 auto; margin-top: 20px;">
                            <v-icon left dark>mdi-checkbox-marked-circle</v-icon>Registrar
                        </v-btn>

                        <v-btn
                          v-else
                          block color="success" style="min-width: 180px!important; margin: 0 auto; margin-top: 20px;">
                            <v-icon left dark>mdi-checkbox-marked-circle</v-icon>Registrar
                        </v-btn> -->

                        <template
                          v-if="listaFases[1].educativa.documentos[0].indice == 'anterior'"
                        >
                          <v-col cols="3">
                            <v-btn color="warning" rounded block>
                              <v-icon left> mdi-Edit </v-icon>
                              Modificar
                              </v-btn
                            >
                          </v-col>
                          <v-col cols="3">
                            <v-btn color="info" rounded block>
                              <v-icon left> mdi-information</v-icon>
                              Ver</v-btn
                            >
                          </v-col>
                        </template>
                        <template 
                          v-else-if="listaFases[1].educativa.documentos[0].indice == 'actual'"
                          >
                          <v-col cols="6" >
                            <v-btn color="success" block rounded>
                              <v-icon left> mdi-book-plus </v-icon>
                                <span>Registrar</span>
                              </v-btn
                            >
                          </v-col>
                        </template>
                        <template v-else>
                          <v-col cols="6" >
                            <div class="docs-siguiente">
                              <span>Proximo a Registrar</span>
                            </div>
                          </v-col>
                        </template>
                        </v-card>
                    </v-timeline-item>

                    <v-timeline-item
                        :color="listaFases[1].educativa.documentos[1].estado == 'Completo' ? 'success' : listaFases[1].educativa.documentos[1].indice == 'actual' ? 'warning' : 'info'"
                        icon="mdi-buffer"
                    >
                        <v-card :class="[listaFases[1].educativa.documentos[1].estado == 'Completo' ? 'fondoverde' : listaFases[1].educativa.documentos[1].indice == 'actual' ? 'fondobeige' : 'fondoazul']" dark>
                        <v-card-title
                        class="justify-center"
                        style="font-size: 15px;text-align: center;word-break: normal; padding-bottom: 0;"
                        >Informe Educativo Evolutivo</v-card-title>

                        <template
                          v-if="listaFases[1].educativa.documentos[1].indice == 'anterior'"
                        >
                          <v-col cols="3">
                            <v-btn color="warning" rounded block>
                              <v-icon left> mdi-Edit </v-icon>
                              Modificar
                              </v-btn
                            >
                          </v-col>
                          <v-col cols="3">
                            <v-btn color="info" rounded block>
                              <v-icon left> mdi-information</v-icon>
                              Ver</v-btn
                            >
                          </v-col>
                        </template>
                        <template 
                          v-else-if="listaFases[1].educativa.documentos[1].indice == 'actual'"
                          >
                          <v-col cols="6" >
                            <v-btn color="success" block rounded>
                              <v-icon left> mdi-book-plus </v-icon>
                                <span>Registrar</span>
                              </v-btn
                            >
                          </v-col>
                        </template>
                        <template v-else>
                          <v-col cols="6" >
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

          <!-- <v-row>
            <v-col xs="12" sm="6" md="6" lg="4" xl="4">
              <v-card
                class="pa-4 mx-auto"
                :class="[listaFases[1].educativa.documentos[0].estado == 'Completo' ? 'fondoverde' : 'fondobeige']"
                max-width="90%"
                style="cursor: pointer"
              >
                <v-card-title
                  class="justify-center"
                  style="font-size: 13px;text-align: center;word-break: normal; padding-bottom: 0;"
                ></v-card-title>
                <v-card-title
                  class="justify-center"
                  style="font-size: 10px;text-align: center;word-break: normal; padding: 0;"
                >Plan de intervencion individual educativo</v-card-title>
                <v-btn block class="my-button" color="success">
                  <v-icon left dark>mdi-checkbox-marked-circle</v-icon>Registrar
                </v-btn>
              </v-card>
            </v-col>
          </v-row> -->
        </v-container>
      </v-sheet>
      <v-navigation-drawer v-model="drawer" absolute temporary>
        <v-list nav dense>
          <v-list-item-group active-class="deep-purple--text text--accent-4">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="title">Lista de Residentes</v-list-item-title>
                <v-list-item-subtitle>Actualmente en la fase 2</v-list-item-subtitle>
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
    </template>
  </div>
</template>
<script>
import VisualizadorResidente from "@/components/residentes/VisualizadorResidente.vue";

import axios from "axios";
export default {
  name: "ProgresoResidente",
  components: { VisualizadorResidente },
  data() {
    return {
      drawer: false,
      residente: "",
      residentesFase: [],
      listaFases: [],
      cargaProgreso: false,
      fases: [
        {
          id: 1,
          titulo: "Fase I: Acogida",
          descripcion:
            "Se raliza el registro de déficit y fortalezas del niño, niña y adolescente y la evaluación preliminar de sus necesidades de atención e incidendencia.",
          imagenUrl: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
          interfazUrl: "/dashboard/Fase1",
          boton: { texto: "Ir a la Fase I", icono: "mdi-cloud-upload" }
        },
        {
          id: 2,
          titulo: "Fase II: Desarrollo",
          descripcion:
            "se ejecuta la intervención propiamente dicha, orientada a la reparación emocional y social de los NNA y sus familias, con una duración promedio de doce meses",
          imagenUrl: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
          interfazUrl: "/dashboard/Fase1",
          boton: { texto: "Ir a la Fase II", icono: "mdi-cloud-upload" }
        }
      ]
    };
  },
  async created() {
    var miruta = "/residente/progreso/" + this.$route.params.id;
    await axios
      .get("/residente/all/fase/2")
      .then(res => {
        this.residentesFase = res.data;
        //console.log(res.data);
      })
      .catch(err => console.log(err));
    await axios
      .get(miruta)
      .then(res => {
        this.residente = res.data;
        console.log("Dats compltos");
        console.log(this.residente);
      })
      .catch(err => console.log(err));
    this.listaFases = this.obtenerSecuenciaDocumentos();
    this.cargaProgreso = true;
    console.log("LSITA FASES");
    console.log(this.listaFases);
  },
  methods: {
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
    },
    obtenerEstadoDocumentosFaseArea(listaDocumentos) {
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
    estadoFase(fase) {
      var faseActual = this.residente.progreso.length;
      if (fase.fase < faseActual) {
        //faseSuperada
        return "superada";
      } else if (fase.fase == faseActual) {
        //faseActual
        return "actual";
      } else {
        //fase proxima
        return "proxima";
      }
    },
    obtenerTipoAlertDocumento(documento) {
      if (documento.indice == "actual") {
        return "warning";
      } else if (documento.indice == "anterior") {
        return "success";
      } else return "info";
    },
    navegarto(ruta) {
      this.$router.push(ruta);
    }
  },
  computed: {},
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