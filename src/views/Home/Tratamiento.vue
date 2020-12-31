<template>
  <div>
    <v-app-bar color="primary" dense dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <span> 
      <v-chip
        class="ma-2"
        color="white"
        label
        text-color="green"
        @click="navegarto('/dashboard/Home')"
      >
        <v-icon left>
          mdi-home
        </v-icon>
        Menú principal
      </v-chip>
      >
      <v-chip
        class="ma-2"
        color="white"
        outlined
        pill
      >
        <v-icon left>
          mdi-label
        </v-icon>
        Tratamiento
      </v-chip>
      </span>
      <v-spacer></v-spacer>
      
    </v-app-bar>

    <v-sheet class="overflow-hidden"> <!--  style="position: relative;"  -->
      <v-container class="fill-height">
        <v-card class="card mx-auto" width="100%">
          <v-card-title class="justify-center" 
          style="font-size: 35px">Fases del Tratamiento</v-card-title>
          <v-container>
            <v-row>
              <v-col  v-for="fase in fases"
                      :key="fase.id"
                      xs="12"
                      sm="6"
                      md="6"
                      lg="4"
                      xl="4">
                <v-hover v-slot="{ hover }">
                  <v-card
                    class="pa-4 mx-auto"
                    :class="{ 'on-hover': hover }"
                    max-width="90%"
                    @click.native="abrirFase(fase.id)"
                    style="cursor: pointer"
                  >
                    <v-img
                      :src="fase.imagenUrl"
                      height="200px"
                      class="pa-4 mx-auto"
                    ></v-img>
                    <v-card-title class="justify-center">
                          {{fase.titulo}}
                      </v-card-title>
                       <v-card-text style="text-align: justify">
                  {{ fase.descripcion }}
                </v-card-text>
                <v-btn block class="my-button" color="success">
                  <v-icon left dark @click.native="imprimir()">
                    {{ fase.boton.icono }}
                  </v-icon>
                  {{ fase.boton.texto }}
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
      group: null,
      itemsNavegacion: [
        {
          text: 'Menú principal',
          disabled: false,
          href: '/dashboard/Home',
          style: 'font-size: 25px'
        },
        {
          text: 'Tratamiento',
          disabled: true,
          href: '/dashboard/Tratamiento',
        },
      ],
      fases:[
        {
          id:1,
          titulo: "Fase I: Acogida",
          descripcion:"Se raliza el registro de déficit y fortalezas del niño, niña y adolescente y la evaluación preliminar de sus necesidades de atención e incidendencia.",
          imagenUrl: "https://www.qullana.com/E_LOLFGRAPH/static/Resources/imagenes/step_1.png",
          interfazUrl: "/dashboard/Fase1",
          boton: { texto: "Ir a la Fase I", icono: "mdi-cloud-upload" },
        },{
          id:2,
          titulo: "Fase II: Desarrollo",
          descripcion:"se ejecuta la intervención propiamente dicha, orientada a la reparación emocional y social de los NNA y sus familias, con una duración promedio de doce meses",
          imagenUrl: "https://www.qullana.com/E_LOLFGRAPH/static/Resources/imagenes/step_2.png",
          interfazUrl: "/dashboard/Fase1",
          boton: { texto: "Ir a la Fase II", icono: "mdi-cloud-upload" },
        },{
          id:3,
          titulo: "Fase III: Reinsercion",
          descripcion:"periodo previo a la salida del menor del CAR, sea para reintegrarse con su familia de origen o extensa, para integrarse a una nueva familia (adopción) o para iniciar una vida independiente dada su próxima mayoría de edad.",
          imagenUrl: "https://www.qullana.com/E_LOLFGRAPH/static/Resources/imagenes/step_3.png",
          interfazUrl: "/dashboard/Fase1",
          boton: { texto: "Ir a la Fase III", icono: "mdi-cloud-upload" },
        },{
          id:4,
          titulo: "Fase IV: Seguimiento",
          descripcion:"proceso de intervención en la cual se realizara acciones de seguimiento después del egreso, a fin de contribuir con el mantenimiento de los logros alcanzados y evitar retrocesos que afecten el progreso logrado.",
          imagenUrl: "https://www.qullana.com/E_LOLFGRAPH/static/Resources/imagenes/decision__monochromatic.png",
          interfazUrl: "/dashboard/Fase1",
          boton: { texto: "Ir a la Fase IV", icono: "mdi-cloud-upload" },
        }
      ]
    };
  },
  watch: {
    group() {
      this.drawer = false;
    }
  },
  created() {},
  methods: {
    abrirFase(id) {
      this.$router.push(`/dashboard/Fase${id}`)
    },
    abrirVista() {
      console.log("llego");
    },
    navegarto(ruta){
      this.$router.push(ruta)
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