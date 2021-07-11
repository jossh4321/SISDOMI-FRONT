<template lang="">
    <v-expansion-panels  class="pa-4 mx-auto" max-width="90%">
            <v-expansion-panel>
              <v-expansion-panel-header disable-icon-rotate>
                <v-row>
                  <v-col xs="12" sm="6"   md="6" lg="3" xl="3">
                    <v-card class="card-item">
                      <span>Residente: {{residente.nombre}} {{residente.apellido}}</span>
                    </v-card>
                  </v-col>
                  <v-col xs="12" sm="6"   md="6" lg="3" xl="3">
                    <v-card class="card-item">
                      <span>{{residente.tipodocumento}}: {{residente.numerodocumento}}</span>
                    </v-card>
                  </v-col>
                  <v-col xs="12" sm="6"   md="6" lg="3" xl="3">
                    <v-card class="card-item">
                      <span>Lugar Nac.: {{residente.lugarnacimiento}}</span>
                    </v-card>
                  </v-col>
                  <v-col xs="12" sm="6"   md="6" lg="3" xl="3">
                    <v-card class="card-item">
                      <span>Fecha Nac.: {{residente.fechanacimiento | fomatoFecha}}</span>
                    </v-card>
                  </v-col>
                </v-row>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row>
                  <v-col xs="12" sm="6"   md="6" lg="3" xl="3">
                    <v-card class="card-item">
                      <span>Jusgado Procedencia: {{residente.juzgadoprocedencia}}</span>
                    </v-card>
                  </v-col>
                  <v-col xs="12" sm="6"   md="6" lg="3" xl="3">
                    <v-card class="card-item">
                      <span>Estado Actual: {{residente.estado}}</span>
                    </v-card>
                  </v-col>
                  <v-col xs="12" sm="6"   md="6" lg="3" xl="3">
                    <v-card class="card-item">
                      <span>Sexo: {{residente.sexo}}</span>
                    </v-card>
                  </v-col>
                  <v-col xs="12" sm="6"   md="6" lg="3" xl="3">
                    <v-card class="card-item">
                      <span>Fase Actual: {{residente.progreso[residente.progreso.length-1].nombre}}</span>
                    </v-card>
                  </v-col>
                  <v-col xs="12" sm="6"   md="6" lg="3" xl="3">
                    <v-card class="card-item">
                      <span>Estado de la Fase: {{residente.progreso[residente.progreso.length-1].estado}}</span>
                    </v-card>
                  </v-col>
                  <v-col xs="12" sm="6"   md="6" lg="3" xl="3">
                    <v-card class="card-item">
                      <span>Fecha de Ingreso: {{residente.progreso[residente.progreso.length-1].fechaingreso | fomatoFecha}}</span>
                    </v-card>
                  </v-col>
                  <v-col xs="12" sm="6"   md="6" lg="3" xl="3">
                    <v-card class="card-item">
                      <span>Fecha de Fin (prevista): {{residente.progreso[residente.progreso.length-1].fechafinalizacion | fomatoFecha}}</span>
                    </v-card>
                  </v-col>
                  <v-col xs="12" sm="12"   md="12" lg="12" xl="12">
                    <v-card class="card-item">
                      <span>Motivo Ingreso: {{residente.motivoingreso}}</span>
                    </v-card>
                  </v-col>
                   <v-col xs="12" sm="12"   md="12" lg="12" xl="12">
                    <v-card class="card-item">
                      <v-sheet
                            class="mx-auto"
                            max-width="90%"
                        >
                            <v-slide-group
                            multiple
                            show-arrows
                            >
                            <v-slide-item
                                v-for="(numeros,i) in residente.telefonosreferencias"
                                :key="i"
                                v-slot="{ active, toggle }"
                            >
                                <v-btn
                                class="mx-2"
                                :input-value="active"
                                active-class="purple white--text"
                                depressed
                                rounded
                                @click="toggle"
                                >
                                <v-icon left dark>
                                    mdi-cloud-upload
                                </v-icon>
                                    {{numeros.referentefamiliar}}({{numeros.parentesco}}): {{numeros.numero}}
                                </v-btn>
                            </v-slide-item>
                            </v-slide-group>
                        </v-sheet>
                    </v-card>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
</template>
<script>
import moment from "moment";
export default {
    props:["residente"],
    data(){
            return {

            }
    },filters:{
        fomatoFecha: (fecha) =>{
            var formato = moment(fecha);
            return formato.format("llll");
        }
    }
}
</script>
<style scoped>
    .card-item{
        border: 2.5px solid #bbb;
        border-radius: 5px;
        padding: 10px;
}
</style>