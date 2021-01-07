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
          <v-progress-circular
            size="80"
            width="10"
            color="red"
            indeterminate
          ></v-progress-circular>
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
            <v-icon left>
              mdi-home
            </v-icon>
            Menú principal
          </v-chip>
          >
          <v-chip
            class="ma-2"
            color="white"
            label
            text-color="primary"
            @click="navegarto('/dashboard/Documentos')"
          >
            <v-icon left>
              mdi-label
            </v-icon>
            Documentos
          </v-chip>
          >
          <v-chip class="ma-2" color="white" outlined pill>
            <v-icon left>
              mdi-label
            </v-icon>
            Documentos generales
          </v-chip>
        </span>
        <v-spacer></v-spacer>
      </v-app-bar>

      <v-sheet class="overflow-hidden">
        <!--  style="position: relative;"  -->
        <v-container class="fill-height">
          <v-card class="card mx-auto" width="100%">
            <v-card-title class="justify-center" style="font-size: 35px"
              >Fases del Tratamiento</v-card-title
            >
            <v-container>
              <v-row>
                <v-col
                  v-for="fase in fases"
                  :key="fase.id"
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
                      @click.native="abrirFase(fase.interfazUrl)"
                      style="cursor: pointer"
                    >
                      <v-img
                        :src="fase.imagenUrl"
                        height="200px"
                        class="pa-4 mx-auto"
                      ></v-img>
                      <v-card-title class="justify-center">
                        {{ fase.titulo }}
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
          titulo: "Fichas de ingreso",
          descripcion:"Fichas de ingreso",
          imagenUrl: "https://www.qullana.com/E_LOLFGRAPH/static/Resources/imagenes/data_organization_flatline.png",
          interfazUrl: "/dashboard/fichaIngreso",
          boton: { texto: "Acceder", icono: "mdi-cloud-upload" },
        },{
          id:2,
          titulo: "Informes",
          descripcion:"Informes",
          imagenUrl: "https://www.qullana.com/E_LOLFGRAPH/static/Resources/imagenes/data_organization_flatline.png",
          interfazUrl: "/dashboard/informes",
          boton: { texto: "Acceder", icono: "mdi-cloud-upload" },
        },{
          id:3,
          titulo: "Planes de intervención",
          descripcion:"Planes de intervención",
          imagenUrl: "https://www.qullana.com/E_LOLFGRAPH/static/Resources/imagenes/data_organization_flatline.png",
          interfazUrl: "/dashboard/planIntervencion",
          boton: { texto: "Acceder", icono: "mdi-cloud-upload" },
        },{
          id:4,
          titulo: "Seguimientos educativos ",
          descripcion:"Seguimientos educativos ",
          imagenUrl: "https://www.qullana.com/E_LOLFGRAPH/static/Resources/imagenes/data_organization_flatline.png",
          interfazUrl: "/dashboard/seguimientoEducativo",
          boton: { texto: "Acceder", icono: "mdi-cloud-upload" },
        },{
          id:5,
          titulo: "Talleres",
          descripcion:"Talleres",
          imagenUrl: "https://www.qullana.com/E_LOLFGRAPH/static/Resources/imagenes/data_organization_flatline.png",
          interfazUrl: "/dashboard/talleres",
          boton: { texto: "Acceder", icono: "mdi-cloud-upload" },
        },{
          id:6,
          titulo: "Sesiones educativas",
          descripcion:"Sesiones educativas",
          imagenUrl: "https://www.qullana.com/E_LOLFGRAPH/static/Resources/imagenes/data_organization_flatline.png",
          interfazUrl: "/dashboard/sesioneseducativas",
          boton: { texto: "Acceder", icono: "mdi-cloud-upload" },
        },{
          id:7,
          titulo: "Evaluaciones",
          descripcion:"Evaluaciones",
          imagenUrl: "https://www.qullana.com/E_LOLFGRAPH/static/Resources/imagenes/data_organization_flatline.png",
          interfazUrl: "/dashboard/evaluacioneducativa",
          boton: { texto: "Acceder", icono: "mdi-cloud-upload" },
        },{
          id:8,
          titulo: "Actas de externamiento",
          descripcion:"Actas de externamiento",
          imagenUrl: "https://www.qullana.com/E_LOLFGRAPH/static/Resources/imagenes/data_organization_flatline.png",
          interfazUrl: "/dashboard/actas",
          boton: { texto: "Acceder", icono: "mdi-cloud-upload" },
        },{
          id:9,
          titulo: "Incidencias",
          descripcion:"Incidencias",
          imagenUrl: "https://www.qullana.com/E_LOLFGRAPH/static/Resources/imagenes/data_organization_flatline.png",
          interfazUrl: "/dashboard/incidencias",
          boton: { texto: "Acceder", icono: "mdi-cloud-upload" },
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
      this.$router.push(`${id}`)
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