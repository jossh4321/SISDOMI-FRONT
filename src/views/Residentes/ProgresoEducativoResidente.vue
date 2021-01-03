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
          <v-progress-circular size="80" width="10" color="red" indeterminate></v-progress-circular>
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
            <v-icon left>mdi-home</v-icon>Menú principal
          </v-chip>
          <v-chip
            class="ma-2"
            color="white"
            label
            text-color="primary"
            @click="navegarto('/dashboard/home/residentes')"
          >
            <v-icon left>mdi-check</v-icon>Residentes
          </v-chip>>
          <v-chip class="ma-2" color="white" outlined pill>
            <v-icon left>mdi-label</v-icon>Progreso Educativo del residente {{ residente.nombre }} {{ residente.apellido }}
          </v-chip>
        </span>
        <v-spacer></v-spacer>
      </v-app-bar>
      <v-sheet class="overflow-hidden">
        <v-container class="fill-height">
          <v-card class="card">
            <v-card-title
              class="justify-center"
            >Datos generales del residente {{ residente.nombre }} {{ residente.apellido }}</v-card-title>
            <VisualizadorResidente :residente="residente"></VisualizadorResidente>
            <v-card style="padding: 15px 20px; margin: 20px;">
                <v-stepper v-model="step">
                    <v-stepper-header>
                        <v-stepper-step editable step="1">
                            Area Educativa
                        </v-stepper-step>
                        <v-divider></v-divider>
                        <v-stepper-step editable step="2">
                            Area Social
                        </v-stepper-step>
                        <v-divider></v-divider>
                        <v-stepper-step editable step="3">
                            Area Psicologica
                        </v-stepper-step>
                    </v-stepper-header>
                    <v-stepper-items>
                    </v-stepper-items>
                </v-stepper>
            </v-card>
          </v-card>
        </v-container>   
      </v-sheet>
    </template>          
    </div>
</template>
<script>
import axios from "axios";
import VisualizadorResidente from "@/components/residentes/VisualizadorResidente.vue";
export default {
    components: {
        VisualizadorResidente,
    },
    data() {
        return {
           showInfo: true,
           step:1,
           residente: "", 
        }
    },
    async created(){
        var miruta = "/residente/progreso/" + this.$route.params.idresidente;
        await axios
            .get(miruta)
            .then(res => {
            this.residente = res.data;
            this.residente.id = this.$route.params.idresidente;
            console.log(res.data);
            })
            .catch(err => console.log(err));
        this.showInfo = false;
    },
    methods:{
        navegarto(ruta) {
            this.$router.push(ruta);
        },
    }
};
</script>