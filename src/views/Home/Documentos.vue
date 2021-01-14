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
        <v-chip class="ma-2" color="white" outlined pill>
          <v-icon left>
            mdi-label
          </v-icon>
          Documentos
        </v-chip>
      </span>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-sheet class="overflow-hidden">
      <!--  style="position: relative;"  -->
      <v-container class="fill-height">
        <v-card class="card mx-auto" width="100%">
          <v-card-title class="justify-center" style="font-size: 35px"
            >Documentos</v-card-title
          >
          <v-container>
            <v-row>
              <v-col                
                v-for="documento in documentos"
                :key="documento.id"
                xs="12"
                sm="6"
                md="6"
                lg="6"
                xl="6"               
              >
                <v-hover v-slot="{ hover }">
                  <v-card
                    class="pa-4 mx-auto"
                    :class="{ 'on-hover': hover }"
                    max-width="90%"
                    @click.native="abrirDocumento(documento.ruta)"
                    style="cursor: pointer"
                  >
                    <v-img
                      :src="documento.imagenUrl"
                      height="200px"
                      class="pa-4 mx-auto"
                    ></v-img>
                    <v-card-title class="justify-center">
                      {{ documento.titulo }}
                    </v-card-title>
                    <v-card-text style="text-align: justify">
                      {{ documento.descripcion }}
                    </v-card-text>
                    <v-btn block class="my-button" color="success">
                      <v-icon left dark @click.native="imprimir()">
                        {{ documento.boton.icono }}
                      </v-icon>
                      {{ documento.boton.texto }}
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
          text: "Menú principal",
          disabled: false,
          href: "/dashboard/Home",
          style: "font-size: 25px",
        },
        {
          text: "Documentos",
          disabled: true,
          href: "/dashboard/Documentos",
        },
      ],
      documentos: [
        {
          id: 1,
          ruta: "General",
          titulo: "Documentos generales",
          descripcion: "Gestión de los principales documentos del CAR.",
          imagenUrl:
            "https://www.qullana.com/E_LOLFGRAPH/static/Resources/imagenes/note_taking_monochromatic.png",
          interfazUrl: "/dashboard/Fase1",
          boton: { texto: "Acceder", icono: "mdi-cloud-upload" },
        },
        // {
        //   id: 2,
        //   ruta: "Educativo",
        //   titulo: "Documentos educativos",
        //   descripcion:
        //     "Descripción sobre los documentos educativos",
        //   imagenUrl:
        //     "https://www.qullana.com/E_LOLFGRAPH/static/Resources/imagenes/teacher_monochromatic.png",
        //   interfazUrl: "/dashboard/Fase1",
        //   boton: { texto: "Acceder", icono: "mdi-cloud-upload" },
        // },
        // {
        //   id: 3,
        //   ruta: "Psicologico",
        //   titulo: "Documentos psicológicos",
        //   descripcion:
        //     "Descripción sobre los documentos psicológicos",
        //   imagenUrl:
        //     "https://www.qullana.com/E_LOLFGRAPH/static/Resources/imagenes/quality_check_monochromatic.png",
        //   interfazUrl: "/dashboard/Fase1",
        //   boton: { texto: "Acceder", icono: "mdi-cloud-upload" },
        // },
        // {
        //   id: 4,
        //   ruta: "Social",
        //   titulo: "Documentos sociales",
        //   descripcion:
        //     "Descripción sobre los documentos sociales",
        //   imagenUrl:
        //     "https://www.qullana.com/E_LOLFGRAPH/static/Resources/imagenes/brainstorming_session__monochromatic.png",
        //   interfazUrl: "/dashboard/Fase1",
        //   boton: { texto: "Acceder", icono: "mdi-cloud-upload" },
        // },
      ],
    };
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
  created() {},
  methods: {
    abrirDocumento(id) {        
      this.$router.push(`/dashboard/Documento${id}`);
    },
    abrirVista() {
      console.log("llego");
    },
    navegarto(ruta) {
      this.$router.push(ruta);
    },
  },

  computed: {},
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
@keyframes scale {
  to {
    transform: scale(1.01);
  }
}
</style>
