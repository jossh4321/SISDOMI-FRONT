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
          </v-chip>>
          <v-chip class="ma-2" color="white" outlined pill>
            <v-icon left>mdi-label</v-icon>Residentes
          </v-chip>
        </span>
        <v-spacer></v-spacer>
      </v-app-bar>

      <v-sheet class="overflow-hidden">
        <v-container class="fill-height">
          <v-card class="card">
            <v-card-title>Residentes
              <v-spacer></v-spacer>
              <v-dialog persistent v-model="dialogoregistro" max-width="880px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="success"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon left>mdi-account-multiple-plus-outline</v-icon>
                  <span>Registrar nuevo Residente</span>
                </v-btn>
              </template>
              <RegistrarResidente
                @close-dialog-save="closeDialogRegistrar()"
              ></RegistrarResidente>
            </v-dialog>
            </v-card-title>
            <v-container>
              <template v-if="!listaCompleta">
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
              <template v-else-if="listaCompleta && listaResidentes.length == 0">
                <v-alert
                  text
                  outlined
                  border="left"
                  color="deep-orange"
                  width="97%"
                  class="ml-3"
                  icon="info"
                >No se ha encontrado residentes en esta fase</v-alert>
              </template>
              <template v-else>
                <v-data-iterator
                  :items="listaResidentes"
                  :items-per-page.sync="itemsPerPage"
                  :search="search"
                  :sort-by="sortBy.toLowerCase()"
                  :sort-desc="sortDesc"
                  hide-default-footer
                  :page="page"
                >
                  <template v-slot:header="props">
                    <v-toolbar dark color="red darken-1" class="mb-1">
                      <v-text-field
                        v-model="search"
                        clearable
                        flat
                        solo-inverted
                        hide-details
                        prepend-inner-icon="mdi-magnify"
                        label="Escriba algo"
                      ></v-text-field>
                      <template v-if="$vuetify.breakpoint.mdAndUp">
                        <v-spacer></v-spacer>
                        <v-select
                          v-model="sortBy"
                          flat
                          solo-inverted
                          hide-details
                          :items="keys"
                          :item-text="keys.text"
                          :item-value="keys.value"
                          prepend-inner-icon="mdi-magnify"
                          label="Filtrar por"
                        ></v-select>
                        <v-spacer></v-spacer>
                      </template>
                    </v-toolbar>
                    <v-row>
                      <v-spacer></v-spacer>
                      <v-chip
                        color="success"
                        dark
                      >Se han encontrado {{ props.pagination.itemsLength }} residentes</v-chip>
                      <v-spacer></v-spacer>
                    </v-row>
                  </template>

                  <template v-slot:default="props">
                    <v-row>
                      <v-col
                        v-for="residente in props.items"
                        :key="residente.id"
                        xs="12"
                        sm="6"
                        md="6"
                        lg="4"
                        xl="4"
                      >
                        <v-hover v-slot="{ hover }">
                          <v-card
                            class="pa-4 mx-auto"
                            :class="{ 'on-hover': hover }"
                            max-width="90%"
                            style="cursor: pointer"
                          >
                            <v-img
                              src="../../assets/static/residente_hombre.png"
                              max-width="90%"
                              max-height="250"
                              class="mx-auto"
                              v-if="residente.sexo == 'Masculino'"
                              style="margin-left: 20%!important; margin-right: 20%!important;"
                            ></v-img>
                            <v-img
                              src="../../assets/static/residente_mujer.png"
                              max-width="90%"
                              max-height="250"
                              class="mx-auto"
                              v-else-if="residente.sexo == 'Femenino'"
                              style="margin-left: 20%!important; margin-right: 20%!important;"
                            ></v-img>

                            <v-card-title
                              class="justify-center"
                              style="font-size: 13px;text-align: center;word-break: normal; padding-bottom: 0;"
                            >{{residente.nombreCompleto}}</v-card-title>
                            <v-card-title
                              class="justify-center"
                              style="font-size: 12px;text-align: center;word-break: normal; padding: 0;"
                            >{{residente.tipoDocumento}} - {{residente.numeroDocumento}}</v-card-title>
                            <v-card-title
                              class="justify-center"
                              style="font-size: 12px;text-align: center;word-break: normal; padding: 0;"
                            >Fecha Ingreso: {{ residente.fechaIngreso }}</v-card-title>
                            <v-card-title
                              class="justify-center"
                              style="font-size: 12px;text-align: center;word-break: normal; padding: 0;"
                            >Fase actual: {{ residente.faseActual }}</v-card-title>

                            <v-row>
                              <v-col>
                                <v-btn block class="my-button" color="warning"
                                  @click="abrirModificarRes(residente.id)">
                                  <v-icon left dark>mdi-cloud-upload</v-icon>Editar
                                </v-btn>
                              </v-col>
                              <v-col>
                                <v-btn block class="my-button" color="info"
                                  @click="abrirVerRes(residente.id)">
                                  <v-icon left dark>mdi-cloud-upload</v-icon>Ver
                                </v-btn>
                              </v-col>
                            </v-row>
                            <v-row>
                              <v-col>
                                <v-btn block class="my-button" color="success"
                                  @click="abrirProgresoRes(residente.id)">
                                  <v-icon left dark>mdi-cloud-upload</v-icon>Ver Progreso
                                </v-btn>
                              </v-col>
                              <v-col>
                                <v-btn 
                                  block
                                  class="my-button" 
                                  color="info"
                                  @click="abrirExpedienteRes(residente.id)">
                                  <v-icon left dark>mdi-cloud-upload</v-icon>Ver Expediente
                                </v-btn>
                              </v-col>
                            </v-row>
                          </v-card>
                        </v-hover>
                      </v-col>
                    </v-row>
                  </template>
                  <template v-slot:footer="props">
                    <v-row class="mt-2" align="center" justify="center" style="padding-left: 20px">
                      <span class="grey--text">Residentes por página</span>
                      <v-menu offset-y>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn dark text color="green" class="ml-2" v-bind="attrs" v-on="on">
                            {{ itemsPerPage }}
                            <v-icon>mdi-chevron-down</v-icon>
                          </v-btn>
                        </template>
                        <v-list>
                          <v-list-item
                            v-for="(number, index) in itemsPerPageArray"
                            :key="index"
                            @click="updateItemsPerPage(number)"
                          >
                            <v-list-item-title>{{ number }}</v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-menu>

                      <v-spacer></v-spacer>

                      <div style="padding-right: 20px">
                        <span class="mr-4 grey--text">Página {{ page }} de {{ numeroPaginas(props.pagination.itemsLength) }}</span>
                        <v-btn fab dark color="green" class="mr-1" @click="formerPage">
                          <v-icon>mdi-chevron-left</v-icon>
                        </v-btn>
                        <v-btn fab dark color="green" class="ml-1" @click="nextPage">
                          <v-icon>mdi-chevron-right</v-icon>
                        </v-btn>
                      </div>
                    </v-row>
                  </template>
                </v-data-iterator>
              </template>
            </v-container>
          </v-card>
        </v-container>
      </v-sheet>
      <!--Dialogo de Modificar Residente-->
      <v-dialog persistent v-model="dialogoModificarResidente" max-width="1000px">
        <ActualizarResidente
          v-if="dialogoModificarResidente"
          :idresidente="idresidente"
          @close-dialog-save="cerrarDialogoModificarResidente"
        ></ActualizarResidente>
      </v-dialog>
      <!--Dialogo de Detalle Residente-->
      <v-dialog persistent v-model="dialogoVerResidente" max-width="1000px">
        <VerResidente
          v-if="dialogoVerResidente"
          :idresidente="idresidente"
          @close-dialog-save="cerrarDialogoVerResidente"
        ></VerResidente>
      </v-dialog>
    </template>
  </div>
</template>

<script>
import RegistrarResidente from "@/components/ResidentesInterfaz/RegistrarResidente.vue";
import ActualizarResidente from "@/components/ResidentesInterfaz/ActualizarResidente.vue";
import VerResidente from "@/components/ResidentesInterfaz/VerResidente.vue";
import axios from "axios";
import moment from "moment";
import { mapMutations, mapState } from "vuex";

export default {
  components: {
    RegistrarResidente,
    ActualizarResidente,
    VerResidente,
  },
  data() {
    return {
      itemsPerPageArray: [6, 12, 18],
      idresidente:"",
      search: "",
      numeroPaginacion: 1,
      dialogoModificarResidente: false,
      dialogoVerResidente:false,
      page: 1,
      itemsPerPage: 6,
      showInfo: true,
      drawer: false,
      group: null,
      isfiltrado: false,
      listaCompleta: true,
      searchResidente: null,
      listaResidentes: [],
      listResidentes: [],
      resi: {},
      filter: {},
      sortDesc: false,
      dialogoregistro: false,
      sortBy: "nombreCompleto",
      keys: [
            { value: "nombreCompleto", text: 'Nombre completo'},
            { value: "nroDocumento", text: 'Nro. documento'},
            { value: "fechaIngreso", text: 'Fecha ingreso'},
            { value: "faseActual", text: 'Fase actual'},
      ],
    };
  },
  watch: {
    group() {
      this.drawer = false;
    },
    searchResidente(value) {
      if (value == null) {
        this.residente = {
          residente: "",
          id: "",
          numeroDocumento: "",
          fechaIngreso: "",
          faseAct: ""
        };
      }

      if (this.listResidentes.length > 0) {
        return;
      }
      if (this.loadingSearch) {
        return;
      }

      this.loadingSearch = true;

      axios
        .get("/residente/all")
        .then(res => {
          let residentesMap = res.data.map(function(res) {
            return {
              residente: res.nombre + " " + res.apellido,
              id: res.id,
              numeroDocumento: res.tipoDocumento + ": " + res.numeroDocumento
            };
          });

          this.listResidentes = residentesMap;

          this.loadingSearch = false;
        })
        .catch(error => {
          console.error(error);
        });
    },
    resi(ahora, antes) {
      this.listaCompleta = false;
      if (ahora === undefined) {
        axios
          .get("/residente/all")
          .then(res => {
            this.listaResidentes = res.data;
            this.isfiltrado = false;
            this.listaCompleta = true;
            //this.loadingSearch = false;
          })
          .catch(error => {
            console.error(error);
          });
      } else {
        if (this.isfiltrado) {
          axios
            .get("/residente/all")
            .then(res => {
              //para los cards
              this.listaResidentes = res.data;
              this.listaResidentes = this.listaResidentes.filter(
                el => el.id == ahora.id
              );
              this.isfiltrado = true;
              this.listaCompleta = true;
            })
            .catch(error => {
              console.error(error);
            });
        } else {
          this.listaResidentes = this.listaResidentes.filter(
            el => el.id == ahora.id
          );
          this.isfiltrado = true;
          this.listaCompleta = true;
        }
      }
    }
  },
  async created() {
    var listado = [];
    await axios
      .get("/residente/all")
      .then(res => {
        //para los cards
        res.data.forEach(element => {
          var fecha = moment(element.fechaIngreso);
          element.fechaIngreso = fecha.format("DD-MM-YYYY");
          element.nombreCompleto = element.nombre + " " + element.apellido;
          element.faseActual =
            element.progreso[element.progreso.length - 1].nombre;
        });
        this.listaResidentes = res.data;
        this.setResidentes(this.listaResidentes); 
        listado = this.listaResidentes;
        let residentesMap = listado.map(function(res) {
          return {
            residente: res.nombre + " " + res.apellido,
            id: res.id,
            numeroDocumento: res.tipoDocumento + ": " + res.numeroDocumento
          };
        });
        console.log(residentesMap);
        this.listResidentes = residentesMap;
        this.showInfo = false;
        //this.loadingSearch = false;
      })
      .catch(error => {
        console.error(error);
      });
  },
  methods: {
    ...mapMutations(["setResidentes"]),
    closeDialogRegistrar() {
      this.dialogoregistro = false;
    },
    toogleDrawer() {
      this.$store.commit("toggleDrawer");
    },
    cerrarDialogoModificarResidente() {
      this.dialogoModificarResidente = false;
    },
    cerrarDialogoVerResidente() {
      this.dialogoVerResidente = false;
    },
    abrirProgresoFase1(id) {
      var rutacompleta = "/dashboard/ProgresoF1Residente/" + id;
      this.$router.push(rutacompleta);
      /*poner la ruta de colombo
      this.$router.push({
        name: '/dashboard/Fase1',
        params: { idresidente: id}
      })*/
    },
    navegarto(ruta) {
      this.$router.push(ruta);
    },
    nextPage() {
      if (this.page + 1 <= this.numeroPaginacion) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
      if (this.page > 1) {
        this.page = 1;
      }
    },
    abrirExpedienteRes(id) {
      var rutacompleta = "/dashboard/expediente/" + id;
      this.$router.push(rutacompleta);
    },
    abrirProgresoRes(id) {
      var rutacompleta = "/dashboard/progresoEducativo/" + id;
      this.$router.push(rutacompleta);
    },
    abrirModificarRes(id) {
      this.idresidente = id;
      this.dialogoModificarResidente = true;
    },
    abrirVerRes(id) {
      this.idresidente = id;
      this.dialogoVerResidente = true;
    },
    numeroPaginas(numero) {
      this.numeroPaginacion = Math.ceil(numero / this.itemsPerPage);
      return this.numeroPaginacion;
    }
  },

  computed: {
    numberOfPages(numero) {
      return Math.ceil(numero / this.itemsPerPage);
    }
  }
};
</script>
<style scoped>
.on-hover {
  background-color: white;
}
.on-hover:hover {
  box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.5);
  transition: height 0.3s, box-shadow 0.3s;
  transform-origin: center center;
  animation: scale 300ms ease-in-out forwards;
  background-color: #d3f1ec;
  transition: background-color 300ms ease-in-out;
}
.textsearch {
  background-color: #ff695b;
}
@keyframes scale {
  to {
    transform: scale(1.01);
  }
}
</style>