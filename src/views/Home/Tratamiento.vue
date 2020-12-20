<template>
  <div>
    <v-app-bar color="deep-purple accent-4" dense dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Tratamiento</v-toolbar-title>

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
          <v-card-title>Fases del Tratamiento</v-card-title>
          <v-container>
            <v-row>
              <v-col>
                <v-hover v-slot="{ hover }">
                  <v-card
                    class="pa-4 mx-auto rounded-xl"
                    :class="{ 'on-hover': hover }"
                    max-width="200"
                    max-height="250"
                    @click.native="abrirFase1()"
                    style="cursor: pointer;"
                    rounded-pill
                  >
                    <v-img
                      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                      height="150px"
                      class="pa-4 mx-auto rounded-xl"
                    ></v-img>

                    <v-card-title class="justify-center">Fase 1</v-card-title>
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
                      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                      height="150px"
                      class="pa-4 mx-auto rounded-xl"
                    ></v-img>

                    <v-card-title class="justify-center">Fase 2</v-card-title>
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
                      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                      height="150px"
                      class="pa-4 mx-auto rounded-xl"
                    ></v-img>

                    <v-card-title class="justify-center">Fase 3</v-card-title>
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
                      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                      height="150px"
                      class="pa-4 mx-auto rounded-xl"
                    ></v-img>

                    <v-card-title class="justify-center">Fase 4</v-card-title>
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
            <v-list-item-title>Acerca del tratamiento</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-content-save-all-outline</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Ver Expedientes</v-list-item-title>
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
    abrirFase1() {
      this.$router.push('/dashboard/Fase1')
    },
    abrirVista() {
      console.log("llego");
    }
  },

  computed: {}
};
</script>
<style scoped>
/*.card {
  margin: 20px;
}*/
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