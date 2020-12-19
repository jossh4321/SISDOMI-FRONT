<template>
  <div>
    <v-card class="card">
      <v-card-title>BIENVENIDO A SISCAR</v-card-title>
      <v-container>
        <v-row>
          <v-col>
            <v-hover
              v-slot="{ hover }"
            >
              <v-card 
                class="pa-4 mx-auto rounded-xl"
                :class="{ 'on-hover': hover }"
                max-width="300" 
                @click.native="abrirVista()" 
                style="cursor: pointer;"
                rounded-pill
                >
                <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="200px" class="pa-4 mx-auto rounded-xl"></v-img>

                <v-card-title class="justify-center">Tratamiento</v-card-title>

                <!-- :elevation="hover ? 16 : 2"
                  <v-card-subtitle>1,000 miles of wonder</v-card-subtitle>

                <v-card-actions>
                  <v-btn color="orange lighten-2" text>Explore</v-btn>

                  <v-spacer></v-spacer>

                  <v-btn icon @click="show = !show">
                    <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                  </v-btn>
                </v-card-actions>

                <v-expand-transition>
                  <div v-show="show">
                    <v-divider></v-divider>

                    <v-card-text>I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.</v-card-text>
                  </div>
                </v-expand-transition> -->
              </v-card>
            </v-hover>
          </v-col>

          <v-col>
            <v-hover
              v-slot="{ hover }"
            >
              <v-card 
                class="pa-4 mx-auto rounded-xl"
                :class="{ 'on-hover': hover }"
                max-width="300" 
                @click.native="abrirVista()" 
                style="cursor: pointer;"
                rounded-pill
                >
                <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="200px" class="pa-4 mx-auto rounded-xl"></v-img>

                <v-card-title class="justify-center">Tratamiento</v-card-title>
              </v-card>
            </v-hover>
          </v-col>

          <v-col>
            <v-hover
              v-slot="{ hover }"
            >
              <v-card 
                class="pa-4 mx-auto rounded-xl"
                :class="{ 'on-hover': hover }"
                max-width="300" 
                @click.native="abrirVista()" 
                style="cursor: pointer;"
                rounded-pill
                >
                <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="200px" class="pa-4 mx-auto rounded-xl"></v-img>

                <v-card-title class="justify-center">Tratamiento</v-card-title>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld
  },
  methods: {
    abrirVista() {
      console.log("llega");
    },
  }
};
</script>

<style lang="scss" scoped>
.home {
  height: 100vh;
}
.card {
  margin: 20px;
}
.on-hover{
  background-color: white;
}
.on-hover:hover {
  box-shadow: 20px 20px 40px 0px rgba(0, 0, 0, 0.5);
  transition: height 0.3s, box-shadow 0.3s;
  transform-origin: center center;
  animation: scale 500ms ease-in-out forwards;
  background-color: #ff695b;
  transition: background-color 500ms ease-in-out;
}
@keyframes scale {
  to {
    transform: scale(1.2);
  }
}
</style>
