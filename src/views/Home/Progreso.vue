<template >
    <div>
      <template v-if="residente == ''">
      <v-card elevation="3" outlined class="card" height="700px"
       style="text-align: center; height: 700px; padding-top: 30px;">
        <div class="progress">
          <v-progress-circular size="80" width="10" color="red" indeterminate></v-progress-circular>
        </div>
        <v-card-title class="justify-center" style="margin-top:20px;color:red">Cargando Datos...</v-card-title>
      </v-card>
    </template>
    <template v-else>
    
         <v-app-bar
      color="deep-purple"
      dark
    >
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>Progreso del Tratamiento en la Fase I</v-toolbar-title>
      
    </v-app-bar>

      <v-sheet class="overflow-hidden">
        <v-container class="fill-height">
          <v-card class="card">

              <v-card-title class="justify-center"
        >Progreso de {{ residente.nombre }} {{ residente.nombre }}</v-card-title
      >

      <VisualizadorResidente :residente="residente"></VisualizadorResidente>
      <v-expansion-panels focusable class="pa-4 mx-auto" max-width="90%">
        <v-expansion-panel
          v-for="(fase, i) in residente.fases.progreso"
          :key="i"
        >
          <v-expansion-panel-header>
              <v-row>
                  <v-col xs="12" sm="8"   md="8" lg="8" xl="8">
                    <div class="card-item">
                      <span>{{fases[i].titulo}}</span>
                    </div>
                  </v-col>
                  <v-col xs="12" sm="4"   md="4" lg="4" xl="4" padding="auto">
                    <template v-if="estadoFase(fase) == 'superada'">
                      <v-card class="fase-superada">
                        <v-icon color="#003300">
                          mdi-check-decagram
                        </v-icon>
                        <span class="justify-center">
                          Superada
                        </span>
                      </v-card>
                    </template>
                    <template v-else-if="estadoFase(fase) == 'actual'">
                      <v-card class="fase-actual">
                        <v-icon color="#000033">
                          mdi-information
                        </v-icon>
                        <span class="justify-center">
                          Actual
                        </span>
                      </v-card>
                    </template>
                    <template v-else>
                      <v-card class="fase-proxima">
                         <v-icon color="#331a00">
                            mdi-alert-decagram
                          </v-icon>
                        <span class="justify-center">
                          Proxima
                        </span>
                      </v-card>
                    </template>
                  
                  </v-col>
                </v-row>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-card style="margin: 2%">
              <v-card-title class="justify-center"
                >Areas del Equipo Tecnico Multidisciplinario</v-card-title
              >
              <v-expansion-panels>
                <v-expansion-panel>
                  <v-expansion-panel-header>Educativa</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-alert
                      outlined
                      style="margin-top:10px"
                      :type="documentosEducativa.estado == 'Completo'?'success':'warning'"
                      prominent
                      border="left"
                      v-for="(documentosEducativa, i) in fase.educativa
                        .documentos"
                      :key="i"
                    >
                      <v-row align="center">
                        <v-col cols="6">
                          {{ documentosEducativa.tipo }}
                        </v-col>
                        <template
                          v-if="documentosEducativa.estado == 'Completo'"
                        >
                          <v-col cols="3">
                            <v-btn color="warning" rounded block>
                              <v-icon left> mdi-Edit </v-icon>
                              Modificar
                              </v-btn
                            >
                          </v-col>
                          <v-col cols="3">
                            <v-btn color="info" rounded block>
                              <v-icon left> mdi-information</v-icon>
                              Ver</v-btn
                            >
                          </v-col>
                        </template>
                        <template v-else>
                          <v-col cols="6" >
                            <v-btn color="success" block rounded>
                              <v-icon left> mdi-book-plus </v-icon>
                                <span>Registrar</span>
                              </v-btn
                            >
                          </v-col>
                        </template>
                      </v-row>
                    </v-alert>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel>
                  <v-expansion-panel-header>Psicologica</v-expansion-panel-header>
                  <v-expansion-panel-content
                    >
                    <v-alert
                      outlined
                      style="margin-top:10px"
                      :type="documentosPsicologico.estado == 'Completo'?'success':'warning'"
                      prominent
                      border="left"
                      v-for="(documentosPsicologico, i) in fase.psicologica
                        .documentos"
                      :key="i"
                    >
                      <v-row align="center">
                        <v-col cols="6">
                          {{ documentosPsicologico.tipo }}
                        </v-col>
                        <template
                          v-if="documentosPsicologico.estado == 'Completo'"
                        >
                          <v-col cols="3">
                            <v-btn color="warning" rounded block>
                              <v-icon left> mdi-Edit </v-icon>
                              Modificar
                              </v-btn
                            >
                          </v-col>
                          <v-col cols="3">
                            <v-btn color="info" rounded block>
                              <v-icon left> mdi-information</v-icon>
                              Ver</v-btn
                            >
                          </v-col>
                        </template>
                        <template v-else>
                          <v-col cols="6" >
                             <v-btn color="success" block rounded>
                              <v-icon left> mdi-book-plus </v-icon>
                                <span>Registrar</span>
                              </v-btn
                            >
                          </v-col>
                        </template>
                      </v-row>
                    </v-alert>
                    
                    </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel>
                  <v-expansion-panel-header
                    >Social</v-expansion-panel-header
                  >
                  <v-expansion-panel-content
                    >
                    <v-alert
                      outlined
                      style="margin-top:10px"
                      :type="documentosSocial.estado == 'Completo'?'success':'warning'"
                      prominent
                      border="left"
                      v-for="(documentosSocial, i) in fase.social
                        .documentos"
                      :key="i"
                    >
                      <v-row align="center">
                        <v-col cols="6">
                          {{ documentosSocial.tipo }}
                        </v-col>
                        <template
                          v-if="documentosSocial.estado == 'Completo'"
                        >
                          <v-col cols="3">
                            <v-btn color="warning" rounded block>
                              <v-icon left> mdi-Edit </v-icon>
                              Modificar
                              </v-btn
                            >
                          </v-col>
                          <v-col cols="3">
                            <v-btn color="info" rounded block>
                              <v-icon left> mdi-information</v-icon>
                              Ver</v-btn
                            >
                          </v-col>
                        </template>
                        <template v-else>
                          <v-col cols="6" >
                             <v-btn color="success" block rounded>
                              <v-icon left> mdi-book-plus </v-icon>
                                <span>Registrar</span>
                              </v-btn
                            >
                          </v-col>
                        </template>
                      </v-row>
                    </v-alert>
                    
                    </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

          </v-card>
        </v-container>
          <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          active-class="deep-purple--text text--accent-4"
        >
           <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="title">
                Lista de Residentes
              </v-list-item-title>
              <v-list-item-subtitle>
                Actualmente en la fase I
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

      <v-divider></v-divider>
        <v-list-item
          v-for="residente in residentesFase"
          :key="residente.id"
          link
        >
          <v-list-item-icon>
            <v-icon>mdi-account-multiple</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ residente.nombre }} {{residente.apellido}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        </v-list-item-group>
      </v-list>
      
    </v-navigation-drawer>
      </v-sheet>
      
    </template>
    </div>
</template>
<script>
import VisualizadorResidente from "@/components/residentes/VisualizadorResidente.vue";

import axios from "axios";
export default {
  name: "ProgresoResidente",
  components: { VisualizadorResidente },
  data() {
    return {
      drawer: false,
      residente: "",
      residentesFase:[],
      fases: [
        {
          id: 1,
          titulo: "Fase I: Acogida",
          descripcion:
            "Se raliza el registro de déficit y fortalezas del niño, niña y adolescente y la evaluación preliminar de sus necesidades de atención e incidendencia.",
          imagenUrl: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
          interfazUrl: "/dashboard/Fase1",
          boton: { texto: "Ir a la Fase I", icono: "mdi-cloud-upload" },
        },
        {
          id: 2,
          titulo: "Fase II: Desarrollo",
          descripcion:
            "se ejecuta la intervención propiamente dicha, orientada a la reparación emocional y social de los NNA y sus familias, con una duración promedio de doce meses",
          imagenUrl: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
          interfazUrl: "/dashboard/Fase1",
          boton: { texto: "Ir a la Fase II", icono: "mdi-cloud-upload" },
        },
        {
          id: 3,
          titulo: "Fase III: Reinsercion",
          descripcion:
            "periodo previo a la salida del menor del CAR, sea para reintegrarse con su familia de origen o extensa, para integrarse a una nueva familia (adopción) o para iniciar una vida independiente dada su próxima mayoría de edad.",
          imagenUrl: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
          interfazUrl: "/dashboard/Fase1",
          boton: { texto: "Ir a la Fase III", icono: "mdi-cloud-upload" },
        },
        {
          id: 4,
          titulo: "Fase IV: Seguimiento",
          descripcion:
            "proceso de intervención en la cual se realizara acciones de seguimiento después del egreso, a fin de contribuir con el mantenimiento de los logros alcanzados y evitar retrocesos que afecten el progreso logrado.",
          imagenUrl: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
          interfazUrl: "/dashboard/Fase1",
          boton: { texto: "Ir a la Fase IV", icono: "mdi-cloud-upload" },
        },
      ],
    };
  },
  async created() {
    var miruta = "/residente/progreso/" + this.$route.params.id;
    await axios
        .get("/residente/all/fase/1")
        .then(res => {
            this.residentesFase = res.data;
            //console.log(res.data);
        })
        .catch((err) => console.log(err));

    await axios
      .get(miruta)
      .then((res) => {
        
        this.residente = res.data;
        //console.log(this.residente);
      })
      .catch((err) => console.log(err));


  },
  methods: {
     estadoFase(fase){
            var faseActual = this.residente.progreso.length;
            if(fase.fase<faseActual){
                //faseSuperada
                return 'superada';
            }else if(fase.fase == faseActual){
                //faseActual
                return 'actual';
            }else{
                //fase proxima
                return 'proxima';
            }
        }
  },
  computed:{
    
  },
  filters:{
  }
};
</script>
<style scoped>
.card-item {
  padding: 7px;
  margin: 5px;
  border: none;
  border-radius: none;
}
.fase-superada{
  border: 2.6px solid #003300;
  border-radius: 20px;
  padding: 7px;
  width: 90%;
  color:	 #003300;
  font-weight: bold;
  text-align: center;
  background-color: #00b300;
}
.fase-actual{
  border: 2.6px solid #000033;
  border-radius: 20px;
  padding: 7px;
  width: 90%;
  color:	 #000033;
  font-weight: bold;
  text-align: center;
  background-color: #1a1aff;
}
.fase-proxima{
  border: 2.6px solid #331a00;
  border-radius: 20px;
  padding: 7px;
  width: 90%;
  color:	 #331a00;
  font-weight: bold;
  text-align: center;
  background-color: #ffff00;
}
</style>