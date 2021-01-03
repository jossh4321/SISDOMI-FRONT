<template>
  <v-card >
    <v-card-title class="justify-center">Detalle de Acta</v-card-title>

    <v-stepper v-model="step">
    <v-stepper-header>
      <v-stepper-step
        editable
        step="1"
      >
        Datos Generales
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
        editable
        step="2"
      >
        Datos de Cuenta
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <div class="container-user">
      <form>
        <v-text-field
           v-model="actaexternamiento.tipo"
          label="Ingrese el tipo"
          outlined
          readonly
          color="#009900"
        ></v-text-field>
        <v-text-field
          v-model="actaexternamiento.fechacreacion"
          label="Ingrese fechacreacion"
          outlined
          readonly
          color="#009900"
        ></v-text-field>
                      
       
        <v-text-field
          v-model="actaexternamiento.area"
          label="Ingrese el area"
          outlined
          readonly
          color="#009900"
        ></v-text-field>
        <v-textarea
          v-model="actaexternamiento.fase"
          label="Ingrese la fase"
          auto-grow
          outlined
          rows="2"
          row-height="25"
          readonly
          color="#009900"
          shaped
        ></v-textarea>
      
        
       
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
      <v-stepper-content step="2">
        <div  class="container-user">
      <form>
      <!--  <v-text-field
          v-model="actaexternamiento.contenido.responsable"
          label="Ingrese el nombre de residente"
          outlined
          readonly
          class="inputTextField"
          color="#009900"
        ></v-text-field>-->
        
        <v-text-field
          v-model="actaexternamiento.contenido.entidaddisposicion"
          label="Ingrese nueva entidad disposicion"
          outlined
          readonly
          class="inputTextField"
          color="#009900"
        ></v-text-field>

        <v-text-field
         v-model="actaexternamiento.contenido.numeroresolucion"
          label="Ingrese nuevo numero resolucion"
          outlined
          readonly
          class="inputTextField"
          color="#009900"
        ></v-text-field>

        <v-text-field
           v-model="actaexternamiento.contenido.numerooficio"
          label="Ingrese nuevo numero oficio"
          outlined
          readonly
          class="inputTextField"
          color="#009900"
        ></v-text-field>
          
       <v-text-field
          v-model="actaexternamiento.contenido.observaciones"
          label="Ingrese nuevas observaciones"
          outlined
          readonly
          class="inputTextField"
          color="#009900"
        ></v-text-field>
           
        
        <v-select
        v-model="actaexternamiento.estado"
          :items="['creado', 'modificado']"
          label="Ingrese el Estado"
          dense
          outlined
          readonly
          color="#009900"
        ></v-select>

         <v-card
                  style="margin-top:30px;padding:5px 5px;background-color:#EAEAEA"
                >
                <v-card class="subcard">
                          <v-card-title>Datos del Usuario</v-card-title>
                          <v-card class="subcard"  style="margin-bottom:7px" color="#e6f3ff">
                              <v-text-field
                                  v-model="this.user.usuario"
                                  label="Autor del Informe de Incidencia"
                                  outlined
                                  color="info"
                                  readonly
                                ></v-text-field>
                          </v-card >
                               <v-card class="subcard" color="#e6f3ff">
                                   <v-text-field
                                    v-model="this.user.rol.nombre"
                                    label="Cargo del Autor"
                                    outlined
                                    color="info"
                                    readonly
                                  ></v-text-field>
                               </v-card>
                        </v-card>
                  <v-row>
                    <v-col :cols="12" align="center">
                      <div>

                        <v-card-text>
                              <img
                                width="240"
                                height="170"
                                :src="this.user.datos.firma"
                                alt=""
                              />
                        </v-card-text>
                      </div>
                    </v-col>
                  </v-row>
                </v-card>

        
       
          <v-divider class="divider-custom"></v-divider>
        <v-row>
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
import axios from 'axios';
import { mapMutations, mapState, mapGetters} from "vuex";
import moment from 'moment'
export default {
    name:"VisualizarActa",
   props:["actaexternamiento"],
   components: {
  },
  data() {
    return {
      datemenu: false,
      step:1
    };
  },async created(){
    console.log(this.actaexternamiento);
    this.actaexternamiento.fechacreacion = this.actaexternamiento.fechacreacion.split( "T" )
  },
  
  mounted(){
  },
  methods:{
    cerrarDialogo(){
      this.$emit("close-dialog-detail");
    }
  },
  watch:{
  },
  computed:{
    ...mapGetters(["user"]),
  },
};
</script>
<style  scoped>
.container-user {
  margin: 15px;
}

.dropzone-custom-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.dropzone-custom-title {
  margin-top: 0;
  color: #00b782;
}

.subtitle {
  color: #314b5f;
}
.divider-custom{
  margin-top:7px;
  margin-bottom:7px
}

.inputTextField{
  border-color: green;
}
</style>