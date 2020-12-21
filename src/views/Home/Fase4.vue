<template>
  <div>
    <template v-if="showInfo">
      <v-card elevation="3" outlined class="card" style="text-align: center; height: 150px; padding-top: 30px;">
        <div class="progress">
          <v-progress-circular size="80" width="10" color="red" indeterminate></v-progress-circular>
        </div>
      </v-card>
    </template>
    <template v-else>
      <v-app-bar color="deep-purple accent-4" dense dark>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>Tratamiento - Fase 4</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-menu left bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item v-for="n in 5" :key="n" @click="() => {}">
              <v-list-item-title>Option {{ n }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>

      <v-sheet class="overflow-hidden">
        <!--  style="position: relative;"  -->
        <v-container class="fill-height">
          <v-card class="card">
            <v-card-title>Residentes actuales en la Fase 4</v-card-title>
            <v-container>
              <v-row>
                <v-col xs="12" sm="12" md="12" lg="12" xl="12">
                  <!-- <v-text-field
                        dark
                        flat
                        solo-inverted
                        prepend-icon="search"
                        label="Buscar residente"
                        class="mt-7 textsearch"
                        >
                        flat
                        solo-inverted
                  </v-text-field>-->
                  <v-autocomplete
                    :items="listResidentes"
                    v-model="resi"
                    :search-input.sync="searchResidente"
                    filled
                    chips
                    outlined
                    color="#009900"
                    label="Busque a un residente"
                    item-text="residente"
                    return-object
                  >
                    <template v-slot:selection="data">
                      <v-chip
                        v-bind="data.attrs"
                        :input-value="data.selected"
                        style="margin-top:5px"
                      >
                        <v-avatar left color="#b3b3ff" size="24">
                          <span style="font-size:12px">{{ data.item.residente.charAt(0) }}</span>
                        </v-avatar>
                        {{ data.item.residente }}
                      </v-chip>
                    </template>
                    <template v-slot:item="data">
                      <template>
                        <v-list-item-avatar>
                          <v-avatar left color="#b3b3ff" size="24">
                            <span style="font-size:12px">{{ data.item.residente.charAt(0) }}</span>
                          </v-avatar>
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-title>
                            Nombre completo: {{ data.item.residente }}
                            {{ data.item.apellido }}
                          </v-list-item-title>
                          <v-list-item-subtitle>
                            Nro. Documento:
                            {{ data.item.numeroDocumento }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </template>
                    </template>
                  </v-autocomplete>
                </v-col>
              </v-row>
              <template v-if="!listaCompleta">
                <v-card elevation="3" outlined class="card" style="text-align: center; height: 150px; padding-top: 30px;">
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
                >
                  No se ha encontrado residentes en esta fase
                </v-alert>
              </template>
              <template v-else>
                <v-row>
                  <v-col
                    v-for="residente in listaResidentes"
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
                        @click.native="abrirProgresoFase4(residente.id)"
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
                        >{{residente.nombre}} {{residente.apellido}}</v-card-title>
                        <v-card-title
                          class="justify-center"
                          style="font-size: 10px;text-align: center;word-break: normal; padding: 0;"
                        >{{residente.tipoDocumento}} - {{residente.numeroDocumento}}</v-card-title>
                        <v-btn block class="my-button" color="success">
                          <v-icon left dark>mdi-cloud-upload</v-icon>Ver progreso
                        </v-btn>
                      </v-card>
                    </v-hover>
                  </v-col>
                </v-row>
              </template>
            </v-container>
          </v-card>
        </v-container>

        <v-navigation-drawer v-model="drawer" absolute temporary>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Acerca de la Fase 4</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list dense>
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-content-save-all-outline</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>Gestionar Talleres</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </v-sheet>
    </template>
  </div>
</template>

<script>
import axios from "axios";

export default {
  components: {},
  data() {
    return {
      showInfo: true,
      drawer: false,
      group: null,
      isfiltrado: false,
      listaCompleta: true,
      searchResidente: null,
      listaResidentes: [],
      listResidentes: [],
      resi: {}
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
          numeroDocumento: ""
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
        .get("/residente/all/fase/4")
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
          .get("/residente/all/fase/4")
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
            .get("/residente/all/fase/4")
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
      .get("/residente/all/fase/4")
      .then(res => {
        //para los cards
        this.listaResidentes = res.data;
        listado = this.listaResidentes;
        let residentesMap = listado.map(function(res) {
          return {
            residente: res.nombre + " " + res.apellido,
            id: res.id,
            numeroDocumento: res.tipoDocumento + ": " + res.numeroDocumento
          };
        });

        this.listResidentes = residentesMap;
        this.showInfo = false;
        //this.loadingSearch = false;
      })
      .catch(error => {
        console.error(error);
      });
  },
  methods: {
    toogleDrawer() {
      this.$store.commit("toggleDrawer");
    },
    abrirProgresoFase4(id) {
      console.log("te llevo al residente con id: " + id)
      /*poner la ruta de colombo
      this.$router.push({
        name: '/dashboard/Fase1',
        params: { idresidente: id}
      })*/
    },
  },

  computed: {}
};
</script>
<style scoped>
.on-hover {
  background-color: white;
}
.on-hover:hover {
  transform-origin: center center;
  animation: scale 500ms ease-in-out forwards;
  background-color: #ff695b;
  transition: background-color 500ms ease-in-out;
}
.textsearch {
  background-color: #ff695b;
}
@keyframes scale {
  to {
    transform: scale(1.1);
  }
}
</style>