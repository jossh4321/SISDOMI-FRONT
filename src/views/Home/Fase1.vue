<template>
  <div>
    <v-app-bar color="deep-purple accent-4" dense dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Tratamiento - Fase 1</v-toolbar-title>

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
          <v-card-title>Residentes actuales en la Fase 1</v-card-title>
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
              <v-col>
                <v-hover v-slot="{ hover }">
                  <v-card
                    class="pa-4 mx-auto rounded-xl"
                    :class="{ 'on-hover': hover }"
                    max-width="200"
                    max-height="250"
                    @click.native="abrirProgresoFase1(0)"
                    style="cursor: pointer;"
                    rounded-pill
                  >
                    <v-img
                      src="../../assets/static/residente_hombre.png"
                      height="150px"
                      class="pa-4 mx-auto rounded-xl"
                    ></v-img>

                    <v-card-title class="justify-center" style="font-size: 15px;text-align: center;word-break: normal;">Pepito Garcia García Candela</v-card-title>
                  </v-card>
                </v-hover>
              </v-col>

              <v-col>
                <v-hover v-slot="{ hover }">
                  <v-card
                    class="pa-4 mx-auto rounded-xl"
                    :class="{ 'on-hover': hover }"
                    max-width="200"
                    max-height="250"
                    @click.native="abrirVista()"
                    style="cursor: pointer;"
                    rounded-pill
                  >
                    <v-img
                      src="../../assets/static/residente_mujer.png"
                      height="150px"
                      class="pa-4 mx-auto rounded-xl"
                    ></v-img>

                    <v-card-title class="justify-center" style="font-size: 15px;text-align: center;word-break: normal;">Pepito2 Garcia2 García2 Candela2</v-card-title>
                  </v-card>
                </v-hover>
              </v-col>

              <v-col>
                <v-hover v-slot="{ hover }">
                  <v-card
                    class="pa-4 mx-auto rounded-xl"
                    :class="{ 'on-hover': hover }"
                    max-width="200"
                    max-height="250"
                    @click.native="abrirVista()"
                    style="cursor: pointer;"
                    rounded-pill
                  >
                    <v-img
                      src="../../assets/static/residente_mujer.png"
                      height="150px"
                      class="pa-4 mx-auto rounded-xl"
                    ></v-img>

                    <v-card-title class="justify-center" style="font-size: 15px;text-align: center;word-break: normal;">Pepito3 Garcia3 García3 Candel3a</v-card-title>
                  </v-card>
                </v-hover>
              </v-col>

              <v-col>
                <v-hover v-slot="{ hover }">
                  <v-card
                    class="pa-4 mx-auto rounded-xl"
                    :class="{ 'on-hover': hover }"
                    max-width="200"
                    max-height="250"
                    @click.native="abrirVista()"
                    style="cursor: pointer;"
                    rounded-pill
                  >
                    <v-img
                      src="../../assets/static/residente_mujer.png"
                      height="150px"
                      class="pa-4 mx-auto rounded-xl"
                    ></v-img>

                    <v-card-title class="justify-center" style="font-size: 15px;text-align: center;word-break: normal;">Pepito4 Garcia4 García4 Candela4</v-card-title>
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
            <v-list-item-title>Acerca de la Fase 1</v-list-item-title>
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
      group: null
    };
  },
  watch: {
    group() {
      this.drawer = false;
    }
  },
  created() {},
  methods: {
    toogleDrawer() {
      this.$store.commit("toggleDrawer");
    },
    abrirProgresoFase1(id) {
      console.log("Detalles de la fase 1");
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