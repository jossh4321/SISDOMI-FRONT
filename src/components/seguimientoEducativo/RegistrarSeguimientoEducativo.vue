<template>
  <v-card>
    <v-card-title class="justify-center">Registrar Seguimiento Educativo</v-card-title>
    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step editable step="1">
          Datos Generales
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step editable step="2">
          Datos Especificos
        </v-stepper-step>

      </v-stepper-header>
         <v-stepper-items>
            <!--CONTIENE LOS STEPPERS CREADOS ARRIBA EN ESTE CASO SON TRES-->
            <v-stepper-content step="1"
              ><!--CONTIENE LOS STEPPERS 1 -->
              <div class="container-user">
                  <form>
                        <v-autocomplete
                            v-model="seguimiento.idresidente"
                            :items="listaresidentes"
                            filled
                            chips
                            dense
                            outlined
                            color="#009900"
                            label="Usuaria CAR"
                            item-text="nombre"
                            item-value="id"
                            
                          >
                            <template v-slot:selection="data">
                              <v-chip
                                v-bind="data.attrs"
                                :input-value="data.selected"
                                style="margin-top:5px"
                              >
                                <v-avatar left color="#b3b3ff" size="24">
                                  <span style="font-size:12px">UE</span>
                                </v-avatar>
                                {{ data.item.nombre + " " + data.item.apellido }}
                              </v-chip>
                            </template>
                            <template v-slot:item="data">
                              <template>
                                <v-list-item-avatar>
                                  <v-avatar left color="#b3b3ff" size="24">
                                    <span style="font-size:12px">US</span>
                                  </v-avatar>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                  <v-list-item-title
                                    >Nombre completo: {{ data.item.nombre }}
                                    {{ data.item.apellido }}
                                  </v-list-item-title>
                                  <v-list-item-subtitle
                                    >Nro. Documento:
                                    {{ data.item.numerodocumento }}</v-list-item-subtitle
                                  >
                                </v-list-item-content>
                              </template>
                            </template>
                          </v-autocomplete>
                      <v-text-field
                        v-model="seguimiento.contenido.modalidad"
                        label="Modalidad"
                        outlined
                        readonly
                        color="#009900"
                      ></v-text-field>
                      <v-text-field
                        v-model="seguimiento.contenido.nivel"
                        label="Nivel"
                        outlined
                        readonly
                        color="#009900"
                      ></v-text-field>
                      <v-text-field
                        v-model="seguimiento.contenido.grado"
                        label="Grado"
                        outlined
                        readonly
                        color="#009900"
                      ></v-text-field>
                      <v-text-field
                        v-model="seguimiento.contenido.añoescolar"
                        label="Año Escolar"
                        outlined
                        readonly
                        color="#009900"
                      ></v-text-field>





                    <!--Botones de card -->
                      <v-row>
                        <v-col>
                          <v-btn block @click="step = 2" color="success">
                            <v-icon left>mdi-page-next-outline</v-icon>
                            <span>Continuar</span>
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
          <!--CONTIENE LOS STEPPERS 2 -->
            <v-stepper-content step="2">
              <div class="container-user">
                  <form>






                    <!--Botones de card -->
                      <v-row>
                        <v-col>
                          <v-btn block @click="step = 1" color="success">
                            <v-icon left>mdi-page-next-outline</v-icon>
                            <span>Continuar</span>
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


import axios from "axios";
export default {
name:'RegistrarSeguimientoEducativo',
props:["listaresidentes"],
data(){
  return{
    residente:{},
    step: 1,

    seguimiento:{
      id:"",
      tipo:"",
      historialcontenido:[],
      creadordocumento:"",
      fechacreacion:"",
      area:"",
      fase:"",
      idresidente:"",
      estado:"",
      contenido:{},
    }
  }
},
methods:{
      cerrarDialogo(){
        this.$emit("close-dialog-save");
      },
      //guarda los residentes en un objeto
      async guardarResidente(){
      this.residente= await this.obtenerResidentes();
      },
      //obtener todos los residentes
    async obtenerResidentes() {
      await axios
        .get("/residente/all")
        .then((res) => {
          var info = {};
          info = res.data;
          console.log(res.data)
          for (var x=0;x<res.data.length;x++){
              info[x].fechaIngreso = res.data[x].fechaIngreso.split("T")[0];
          }
          
         
        })
        .catch((err) => console.log(err));
    },
  },
  async created(){
    this.guardarResidente();
  }
  
}
</script>

<style>

</style>