<template>
  <div>
    <v-card class="card pa-4 mx-auto">
      <v-card-title class="justify-center" style="font-size: 35px"
        >BIENVENIDO A SISCAR</v-card-title
      >
      <v-container>
        <v-row v-if="user != undefined">
          <VisualizadorUsuario :usuario="user"></VisualizadorUsuario>
        </v-row>
        <v-row>
          <v-col
            v-for="opcion in listaOpciones"
            :key="opcion.id"
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
                @click.native="abrirVista(opcion.interfazUrl)"
                style="cursor: pointer"
              >
                <v-img
                  :src="opcion.imagenUrl"
                  height="200px"
                  class="pa-4 mx-auto"
                ></v-img>

                <v-card-title class="justify-center">{{
                  opcion.titulo
                }}</v-card-title>
                <v-card-text style="text-align: justify">
                  {{ opcion.descripcion }}
                </v-card-text>
                <v-btn block class="my-button" color="success">
                  <v-icon left dark @click.native="imprimir()">
                    {{ opcion.boton.icono }}
                  </v-icon>
                  {{ opcion.boton.texto }}
                </v-btn>
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
import VisualizadorUsuario from "@/components/usuarios/VisualizadorUsuario.vue"
import HelloWorld from "@/components/HelloWorld.vue";
import {mapGetters} from "vuex";
export default {
  name: "Home",
  data() {
    return {
      listaOpciones: [
        {
          id: 1,
          imagenUrl: "https://www.qullana.com/E_LOLFGRAPH/static/Resources/imagenes/completed_task__monochromatic.png",
          titulo: "Tratamiento Integral",
          descripcion:
            "Interfaz de Gestión especializada en el control, seguimineto , investigacion y registro de datos relacionados con los usuarios del CAR",
          interfazUrl: "/dashboard/Tratamiento",
          boton: { texto: "Realizar Tratamiento", icono: "mdi-check-circle" },
        },
        {
          id: 2,
          imagenUrl: "https://www.qullana.com/E_LOLFGRAPH/static/Resources/imagenes/user_group_monochromatic.png",
          titulo: "Residentes",
          descripcion:
            "Interfaz de Gestión de los residentes del CAR",
          interfazUrl: "/dashboard/home/residentes",
          boton: { texto: "Ver residentes", icono: "mdi-cloud-upload" },
        },
        {
          id: 3,
          imagenUrl: "https://www.qullana.com/E_LOLFGRAPH/static/Resources/imagenes/personal_data__monochromatic.png",
          titulo: "Documentos",
          descripcion:
            "Interfaz de Gestión de los documentos relacionados a los residentes del CAR",
          interfazUrl: "/dashboard/Tratamiento",
          boton: { texto: "Ver documentos", icono: "mdi-cloud-upload" },
        },
        {
          id: 4,
          imagenUrl: "https://www.qullana.com/E_LOLFGRAPH/static/Resources/imagenes/data_analytics__monochromatic.png",
          titulo: "Consultar estadísticas",
          descripcion:
            "Interfaz consultar el progreso de los residentes mediante gráficos estadísticos",
          interfazUrl: "/dashboard/estadisticas",
          boton: { texto: "Ver estadísticas", icono: "mdi-cloud-upload" },
        },
      ],
    };
  },
  components: {
    HelloWorld,
    VisualizadorUsuario
  },
  created(){
    
  },
  computed:{
       ...mapGetters(["user"]),
  },
  methods: {
     imprimir(){
        console.log(this.user);
     },
    abrirVista(urlInterfaz) {
      this.$router.push(urlInterfaz);
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  height: 100vh;
}
.card {
  margin: 20px;
}
.my-button {
  border-radius: 5px 5px 5px 5px;
  font-size: 12px;
}
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


@keyframes scale {
  to {
    transform: scale(1.01);
  }
}
</style>
