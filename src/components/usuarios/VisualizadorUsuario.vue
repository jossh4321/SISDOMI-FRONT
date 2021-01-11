<template lang="">
    <v-expansion-panels  class="pa-4 mx-auto" max-width="90%">
            <v-expansion-panel>
              <v-expansion-panel-header disable-icon-rotate>
                <v-row>
                  <v-col xs="12" sm="6"   md="6" lg="3" xl="3">
                    <v-card class="card-item">
                      <span>Usuario: {{usuario.datos.nombre}} {{usuario.datos.apellido}}</span>
                    </v-card>
                  </v-col>
                  <v-col xs="12" sm="6"   md="6" lg="3" xl="3">
                    <v-card class="card-item">
                      <span>{{usuario.datos.tipodocumento}}: {{usuario.datos.numerodocumento}}</span>
                    </v-card>
                  </v-col>
                  <v-col xs="12" sm="6"   md="6" lg="3" xl="3">
                    <v-card class="card-item">
                      <span>Area : {{usuario.rol.area}}</span>
                    </v-card>
                  </v-col>
                  <v-col xs="12" sm="6"   md="6" lg="3" xl="3">
                    <v-card class="card-item">
                      <span>Cargo Actual : {{usuario.rol.nombre}}</span>
                    </v-card>
                  </v-col>
                </v-row>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row>
                  <v-col xs="12" sm="6"   md="6" lg="3" xl="3">
                    <v-card class="card-item">
                      <span>Direccion: {{usuario.datos.direccion}} </span>
                    </v-card>
                  </v-col>
                  <v-col xs="12" sm="6"   md="6" lg="3" xl="3">
                    <v-card class="card-item">
                      <span>E-mail: {{usuario.datos.email}}</span>
                    </v-card>
                  </v-col>
                  <v-col xs="12" sm="6"   md="6" lg="3" xl="3">
                    <v-card class="card-item">
                      <span>Fecha Nac.: {{usuario.datos.fechanacimiento | fomatoFecha}}</span>
                    </v-card>
                  </v-col>
                  <v-col xs="12" sm="6"   md="6" lg="3" xl="3">
                    <v-card class="card-item">
                      <span>Estado Actual : {{usuario.estado}}</span>
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
                                v-for="permiso in usuario.rol.permisos"
                                :key="permiso.id"
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
                                    {{permiso.nombre}}
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
    props:["usuario"],
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