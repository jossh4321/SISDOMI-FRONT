<template>
  <div>
    <v-app-bar color="deep-purple accent-4" dense dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Tratamiento - Fase 2</v-toolbar-title>

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
    <v-sheet class="overflow-hidden"> <!--  style="position: relative;"  -->
      <v-container class="fill-height">
        <v-card class="card">
          <v-card-title>Residentes actuales en la Fase 2</v-card-title>
          <v-container>
            <v-text-field
                flat
                solo-inverted
                prepend-icon="search"
                label="Search"
                class="hidden-sm-and-down mt-7"
                >
            </v-text-field>

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
                    @click.native="verDetalleResidente(residente.id)"
                    style="cursor: pointer"
                  >
                    <v-img
                      src="../../assets/static/residente_hombre.png"
                      max-width="250"
                      max-height="250"
                      class="ml-auto mr-auto ml-sm-3 mr-sm-0"
                      v-if="residente.sexo == 'Masculino'"
                      style="margin-left: 20%!important; margin-right: 20%!important;"
                    ></v-img>
                    <v-img
                      src="../../assets/static/residente_mujer.png"
                      max-width="250"
                      max-height="250"
                      class="ml-auto mr-auto ml-sm-3 mr-sm-0"
                      v-else-if="residente.sexo == 'Femenino'"
                      style="margin-left: 20%!important; margin-right: 20%!important;"
                    ></v-img>

                    <v-card-title class="justify-center" style="font-size: 13px;text-align: center;word-break: normal; padding-bottom: 0;">{{residente.nombre}} {{residente.apellido}}</v-card-title>
                    <v-card-title class="justify-center" style="font-size: 10px;text-align: center;word-break: normal; padding: 0;">{{residente.tipoDocumento}} - {{residente.numeroDocumento}}</v-card-title>
                    <v-btn block class="my-button" color="success">
                      <v-icon left dark>
                        mdi-cloud-upload
                      </v-icon>
                      Ver progreso
                    </v-btn>
                  </v-card>
                </v-hover>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-container>

      <v-navigation-drawer v-model="drawer" absolute temporary>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Acerca de la Fase 2</v-list-item-title>
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
  </div>
</template>

<script>
import axios from "axios";

export default {
  components: {},
  data() {
    return {
      drawer: false,
      group: null,
      listaResidentes: []
    };
  },
  watch: {
    group() {
      this.drawer = false;
    }
  },
  created() {
    axios
        .get("/residente/all/fase/2")
        .then((res) => {

          this.listaResidentes = res.data;

          //this.loadingSearch = false;
        })
        .catch((error) => {
          console.error(error);
        });      
  },
  methods: {
    toogleDrawer() {
      this.$store.commit("toggleDrawer");
    },
    abrirProgresoFase2(id) {
      console.log("Detalles de la fase 2");
    },
    abrirVista() {
      console.log("llego");
    }
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
@keyframes scale {
  to {
    transform: scale(1.1);
  }
}
</style>