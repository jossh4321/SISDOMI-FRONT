<template>
  <v-card>
    <v-card-title class="justify-center">Fases del Residente</v-card-title>
    <v-card style="padding: 15px 20px">
      <div class="container-user">
        <v-row style="margin-left:2px">
          <v-col cols="12">
            <v-card-text style="margin-top:10px;padding:0px 0px">
              <p class="textos" style="font-size:18px">Nombre del Residente: {{nombreResidente}}</p>
              <p class="textos" style="font-size:18px">Fase actual: {{datosfase.progreso[datosfase.progreso.length-1].fase}}</p>
            </v-card-text>
            <v-divider class="mt-4"></v-divider>
          </v-col>
          <v-col cols="8">
            <v-row
              class="my-1"
              align="center"
            >
              <v-col cols="12">
                <p class="textos textoGrueso">Documentos necesarios para promover al residente</p>
              </v-col>
              <strong class="mx-4 success--text text--darken-2">
                Documentos Completados: {{ completedTasks }}
              </strong>

              <v-divider vertical></v-divider>

              <strong class="mx-4 text--darken-2" :class="[(remainingTasks!=0) ? 'error--text' : 'info--text']">
                Documentos Faltantes: {{ remainingTasks }}
              </strong>
            </v-row>
            <v-divider class="mt-4"></v-divider>
          </v-col>
          
          <v-col cols="4">
            <v-progress-circular
              :rotate="-90"
              :size="90"
              :width="9"
              color="green"
              :value="progressOne"
              class="mr-2"
            >{{progressOne}}<span style="font-size:12px">%</span></v-progress-circular>
          </v-col>
          <v-col cols="8">
            <v-row
              class="my-1"
              align="center"
            >
              <v-col cols="12">
                <p class="textos textoGrueso">Total de documentos educativos</p>
              </v-col>
              <strong class="mx-4 success--text text--darken-2">
                Total de documentos completados: {{ totalTasksCompleted }}
              </strong>
              <v-divider vertical></v-divider>
              <strong class="mx-4 text--darken-2" :class="[(totalTasksRemaining!=0) ? 'error--text' : 'info--text']">
                Total de documentos faltantes: {{ totalTasksRemaining }}
              </strong>
            </v-row>
          </v-col>
          <v-col cols="4">
            <v-progress-circular
                style="margin:0px;padding:0px"
                :rotate="-90"
                :size="90"
                :width="9"
                color="green"
                :value="progressTwo"
                class="mr-2"
              >{{progressTwo}}<span style="font-size:12px">%</span></v-progress-circular>
          </v-col>
        </v-row>
        <v-divider class="mx-4"></v-divider>
        <v-container fluid>
          <v-row dense v-for="(fase,j) in datosfase.progreso" :key="j">
            <v-col cols="12">
              <p class="textos textoGrueso">Documentos de la Fase {{fase.fase}}</p>
            </v-col>
            <v-col
              v-for="(item,i) in fase.educativa.documentos"
              :key="i"
              cols="3"
              style="margin-bottom:20px"
            >
              <v-card width="220px">
                <v-img
                  src="https://www.flaticon.com/svg/static/icons/svg/1037/1037308.svg"
                  class="white--text align-end"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  height="170px"
                  contain
                >
                  <v-card-title v-text="item.tipo"></v-card-title>
                </v-img>

                <v-card-actions style="padding:11px 12px">
                  <v-spacer></v-spacer>
                  <div v-if="item.estado=='Completo'">
                    <span class="textos" style="margin-right:7px">{{item.estado}}</span>
                    <v-icon>mdi-check</v-icon>
                  </div>
                  <div v-else>
                    <span class="textos" style="color:red;margin-right:7px">{{item.estado}}</span>
                    <v-icon color="red">mdi-close</v-icon>
                  </div>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="blue darken-1"
              dark
              large
              @click="cerrarDialogo()"
            >
              Cerrar
            </v-btn>
        </v-card-actions>
      </div>
    </v-card>
  </v-card>
</template>

<script>
export default {
  name: "PromoverResidente",
  props: ["datosfase", "nombreResidente","dialogofase"],
  data(){
    return{

    }
  },
  watch:{
    dialogofase: function(dialogofase){
      if(dialogofase){
        this.darFormatoTipo();
      }
    }
  },
  methods:{
    cerrarDialogo() {
      this.$emit("close-dialog-fases");
    },
    capitalize(word) {
      return word[0].toUpperCase() + word.slice(1);
    },
    darFormatoTipo(){
      for (let i = 0; i < this.datosfase.progreso.length; i++){
        for (let j = 0; j < this.datosfase.progreso[i].educativa.documentos.length; j++){
          this.datosfase.progreso[i].educativa.documentos[j].tipo = this.datosfase.progreso[i].educativa.documentos[j].tipo.split(/(?=[A-Z])/)
          this.datosfase.progreso[i].educativa.documentos[j].tipo = this.datosfase.progreso[i].educativa.documentos[j].tipo.join(' ');
          this.datosfase.progreso[i].educativa.documentos[j].estado = this.capitalize(this.datosfase.progreso[i].educativa.documentos[j].estado)
        }
      }
    },
    obtenerTotalDocumentosEducativos(){
      var total=0;
      for(let i = 0; i < this.datosfase.progreso.length; i++){
        var numero = this.datosfase.progreso[i].educativa.documentos.length;
        total = total + numero;
      }
      return total
    }
  },
  computed:{
    completedTasks () {
      return this.datosfase.progreso[this.datosfase.progreso.length-1].educativa.documentos.filter(documento => documento.estado!=="Pendiente").length
    },
    progressOne () {
      var retorno = Math.round(this.completedTasks/this.datosfase.progreso[this.datosfase.progreso.length-1].educativa.documentos.length * 100)
      return retorno
    },
    progressTwo () {
      var total = this.obtenerTotalDocumentosEducativos();
      var retorno = Math.round(this.totalTasksCompleted/total * 100);
      return retorno
    },
    remainingTasks () {
      return this.datosfase.progreso[this.datosfase.progreso.length-1].educativa.documentos.length - this.completedTasks
    },
    totalTasksCompleted () {
      var retorno=0;
      for (let i = 0; i < this.datosfase.progreso.length; i++){
        var numero = this.datosfase.progreso[i].educativa.documentos.filter(documento => documento.estado!=="Pendiente").length 
        retorno = retorno + numero
      }
      return retorno
    },
    totalTasksRemaining () {
      var completados = this.totalTasksCompleted;
      var total = this.obtenerTotalDocumentosEducativos();
      return total - completados
    }
  },
  created(){
    this.darFormatoTipo();
  }
}
</script>

<style scoped>
.textos{
  font-family: "Roboto", sans-serif;
  line-height: 1.5;
}
.textoGrueso{
  font-size:20px;
  font-weight:bold;
}
.sinFaltantes{
  color:blue !important
}
</style>