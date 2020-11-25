<template>
    <v-card style="width:inherit">
    <v-card-title class="justify-center">Registro de Usuarios</v-card-title>
    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step editable step="1"> Introduccion </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step editable step="2"> Hechos e Involucrados </v-stepper-step>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content step="1">
          <div class="container-user">
            <form style="padding:5px">
              <v-text-field
                v-model="incidencia.titulo"
                label="Ingrese un Encabezado"
                outlined
                color="#009900"
              ></v-text-field>
                <v-textarea
                v-model="incidencia.descripcion"
                label="Ingrese una descripcion"
                outlined
                auto-grow
                rows="4"
                row-height="35"
                ></v-textarea>
              <v-menu
                v-model="datemenu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="incidencia.fecha"
                    label="Fecha de lo Ocurrido"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    color="#009900"
                    outlined
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="incidencia.fecha"
                  @input="datemenu = false"
                  locale="es-es"
                ></v-date-picker>
              </v-menu>
                <v-menu
                    ref="menu"
                    v-model="timemenu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="incidencia.hora"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                >
                    <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                        v-model="incidencia.hora"
                        label="Hora de lo ocurrido"
                        prepend-icon="mdi-clock-outline"
                        readonly
                        v-bind="attrs"
                        outlined
                        v-on="on"
                    ></v-text-field>
                    </template>
                    <v-time-picker
                    v-if="timemenu"
                    v-model="incidencia.hora"
                    full-width
                    @click:minute="$refs.menu.save(incidencia.hora)"
                    ></v-time-picker>
                </v-menu>
              <v-row>
                <v-col>
                  <v-btn block @click="step = 2" color="success">
                    <v-icon left>mdi-page-next-outline</v-icon>
                    <span>Continuar</span>
                  </v-btn>
                </v-col>
                <v-col>
                  <v-btn block color="primary">
                    <v-icon left>mdi-close-outline</v-icon>
                    <span>Cerrar</span>
                  </v-btn>
                </v-col>
              </v-row>
            </form>
          </div>
        </v-stepper-content>
        <v-stepper-content step="2">
          <div class="container-user">
            <form style="padding:5px">
                        <v-autocomplete
                            v-model="incidencia.residentes"
                            :items="listaresidentes"
                            filled
                            chips
                            color="blue-grey lighten-2"
                            label="Residentes Involucrados"
                            item-text="nombre"
                            item-value="id"
                            outlined
                            multiple
                            >
                            <template v-slot:selection="data">
                                <v-chip
                                v-bind="data.attrs"
                                :input-value="data.selected"
                                close
                                @click="data.select"
                                @click:close="eliminar(data.item)"
                                >
                                <v-avatar color="success"  size="30" left>
                                    <span class="white--text text-size-selected">
                                        {{data.item.nombre | avatarResidente}}
                                    </span>
                                </v-avatar>
                                {{ data.item.nombre }}
                                </v-chip>
                            </template>
                            <template v-slot:item="data">
                                <template>
                                <v-list-item-avatar color="success" size="30" left>
                                    <span class="white--text text-size">
                                        {{data.item.nombre | avatarResidente}}
                                    </span>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title v-html="data.item.nombre"></v-list-item-title>
                                </v-list-item-content>
                                </template>
                            </template>
                        </v-autocomplete>
                        <!--Lista de Observaciones -->
                         <v-container grid-list-md text-xs-center>
                            <v-layout row wrap>
                            <v-flex xs10>
                                <v-text-field
                                v-model.trim="observacionesAux"
                                label="Ingrese las Observaciones"
                                outlined
                                color="#009900"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs2>
                                 <v-btn
                                    class="mx-2"
                                    fab
                                    dark
                                    color="success"
                                    @click="addObservacion"
                                    >
                                    <v-icon dark>
                                        mdi-plus
                                    </v-icon>
                                    </v-btn>
                            </v-flex>
                            </v-layout>
                        </v-container>

                        <v-list flat>
                            <v-list-item
                            v-for="(item, i) in incidencia.observaciones"
                            :key="i" class="item-list"
                            >
                                <v-list-item-icon>
                                <v-icon
                                @click="deleteItemObservacion(i)"
                                left
                                color="red"
                                >mdi-minus-circle</v-icon
                                >
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title v-text="item"></v-list-item-title>
                                </v-list-item-content>
                            
                            </v-list-item>
                        </v-list>
                        <!---->
                        <!--Lista de Incidencias-->
                         <v-container grid-list-md text-xs-center>
                            <v-layout row wrap>
                            <v-flex xs10>
                                <v-text-field
                                v-model.trim="incidenciasAux"
                                label="Ingrese las Incidencias"
                                outlined
                                color="#009900"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs2>
                                 <v-btn
                                    class="mx-2"
                                    fab
                                    dark
                                    color="success"
                                    @click="addIncidencia"
                                    >
                                    <v-icon dark>
                                        mdi-plus
                                    </v-icon>
                                    </v-btn>
                            </v-flex>
                            </v-layout>
                        </v-container>

                        <v-list flat>
                            <v-list-item
                            v-for="(item, i) in incidencia.incidencias"
                            :key="i" class="item-list"
                            >
                                <v-list-item-icon>
                                <v-icon
                                @click="deleteItemIncidencia(i)"
                                left
                                color="red"
                                >mdi-minus-circle</v-icon
                                >
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title v-text="item"></v-list-item-title>
                                </v-list-item-content>
                            
                            </v-list-item>
                        </v-list>
                        <!---->

                <v-divider class="divider-custom"></v-divider>
              <v-row>
                <v-col>
                  <v-btn block @click="registrarIncidencia" color="success">
                    <v-icon left>mdi-content-save-all-outline</v-icon>
                    <span>Registrar Incidencia</span>
                  </v-btn>
                </v-col>
                <v-col>
                  <v-btn block @click="cerrarDialogo()" color="primary">
                    <v-icon left>mdi-close-outline</v-icon>
                    <span>Cerrar</span>
                  </v-btn>
                </v-col>
              </v-row>
            </form>
          </div>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-card>
</template>
<script>
export default {
    data(){
        return{
        timemenu:false,
        datemenu: false,
        step: 1,
        incidencia: {
             fecha:"",
             hora:"",
             titulo:"",
             descripcion:"",
             incidencias:[],
             observaciones:[],
             residentes:[]
            },
        listaresidentes:[
            {id:"000",nombre:"Marta Chavez"},
            {id:"001",nombre:"Jose Mulder"},
            {id:"002",nombre:"Manuel Merino"},
        ],
        observacionesAux:"",
        incidenciasAux:""
        }
    },methods:{
         eliminar (item) {
            const index = this.incidencia.residentes.indexOf(item.id);
            if (index >= 0) this.incidencia.residentes.splice(index, 1);
        }, addObservacion() {
            if (this.observacionesAux != "") {
                this.incidencia.observaciones.push(this.observacionesAux);
                this.observacionesAux = "";
            }
        },addIncidencia() {
            if (this.incidenciasAux != "") {
                this.incidencia.incidencias.push(this.incidenciasAux);
                this.incidenciasAux = "";
            }
        },deleteItemObservacion(index) {
            this.incidencia.observaciones.splice(index, 1);
        },deleteItemIncidencia(index) {
            this.incidencia.incidencias.splice(index, 1);
        },registrarIncidencia(){
          console.log(this.incidencia);
        },cerrarDialogo(){
          this.$emit("close-dialog-save-incidencia");
        }
    },computed:{

    },filters:{
        avatarResidente: (residente)=>{
            return residente.substring(0, 2);
        }
    }
}
</script>
<style >
    .text-size{
        font-size: 1rem;
    }
    .text-size-selected{
        font-size: 0.9rem;
    }
    .item-list{
        border: 2.5px solid #bbb;
        border-radius: 5px;
        margin-top: 5px;
    }
</style>