<template>
  <v-card>
    <v-card-title class="justify-center">Fases del Residente</v-card-title>
    <v-card style="padding: 15px 20px">
      <div class="container-user">
        <v-card-text>
          <p class="textos" style="font-size:18px">Nombre del Residente: {{nombreResidente}}</p>
          <p class="textos" style="font-size:18px">Fase actual: {{datosfase.progreso[datosfase.progreso.length-1].fase}}</p>
        </v-card-text>
        <v-divider class="mx-4"></v-divider>
        <v-container fluid>
          <v-row dense v-for="(fase,j) in datosfase.progreso" :key="j">
            <v-col cols="12">
              <p class="textos" style="font-size:20px;font-weight:bold">Documentos de la Fase {{fase.fase}}</p>
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
    }
  },
  created(){
    this.darFormatoTipo();
  }
}
</script>

<style>
.textos{
  font-family: "Roboto", sans-serif;
  line-height: 1.5;
}
</style>