<template>
  <v-card >
    <v-card-title class="justify-center">Detalle de Residente</v-card-title>
    <v-stepper  v-model="step">
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
        Area Psicologica
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
        editable
        step="3"
      >
        Area Educativa
      </v-stepper-step>
    </v-stepper-header>
    
       <v-stepper-items><!--CONTIENE LOS STEPPERS CREADOS ARRIBA EN ESTE CASO SON TRES-->
     <v-stepper-content step="1"><!--CONTIENE LOS STEPPERS 1 -->
        <div class="container-user">
      <form>

        <v-text-field
           v-model="residente.nombre"
          label="Nombres"
          outlined
          readonly
          color="#009900"
        ></v-text-field>
        <v-text-field
          v-model="residente.apellido"
          label="Apellidos"
          outlined
          readonly
          color="#009900"
        ></v-text-field>
        <v-text-field
           v-model="residente.sexo"
          label="Sexo"
          outlined
          readonly
          color="#009900"
        ></v-text-field>

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
              v-model="residente.fechaNacimiento"
              label="Fecha de Nacimiento"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
              color="#009900"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="residente.fechaNacimiento"
            @input="menu2 = false"
            locale="es-es"
          ></v-date-picker>
        </v-menu>
        <v-select
          :items="['DNI', 'Pasaporte', 'Carnet Extranjeria','dni']"
          label="Tipo de Documento"
          dense
          outlined
          readonly
          color="#009900"
           v-model="residente.tipoDocumento"
        ></v-select>
        <v-text-field
          v-model="residente.numeroDocumento"
          label="Ingrese el Numero de Documento"
          outlined
          readonly
          color="#009900"
        ></v-text-field>
        <v-text-field
           v-model="residente.lugarNacimiento"
           
          label="Lugar de Nacimiento"
          outlined
          readonly
          color="#009900"
        ></v-text-field>
<!--NUMEROS TELEFONO -->
        
<!-- Opcion 1 -->
        <v-item-group multiple>
          
          <v-item
            v-for="(item ,index) in residente.telefonosReferencia" :key="index"
          >
          <div>
           <v-card  color="#F0F0F0" >
              <v-row>
                <v-col > 
                  <v-card
                    active-class="purple--text"
                    color="#FADC05"
                    height="30"
                  >
                  <span style="font-size:18px">
                  {{ item.referentefamiliar}}
                  </span>
                  </v-card>
                </v-col>
                <v-col>
                  <v-card
                    active-class="purple--text"
                    color="#8ACBFE"
                    height="30"
                  >
                  <span style="font-size:18px">
                  {{ item.numero}}
                  </span>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>
            
            <hr>
            </div>
          </v-item>
        </v-item-group>
<!--FIN -->

<!-- Opcion 2 -->
      <v-card style="margin-top:30px;padding:5px 5px;background-color:#EAEAEA">
          <v-row align="center">
            <v-col>
              <v-card-title style="font-size:22px;padding: 0px 10px;" >Referentes Familiares</v-card-title>
            </v-col>
            <v-col align="right">
              <v-btn style="margin-right:10px;"
                    dark
                    color="green"
                    >Agregar
                    </v-btn>
            </v-col>
          </v-row>
          <v-card 
            tile
            elevation="0"
            color="#FAFAFA" 
            style="margin-top:5px" 
            height="60"
            v-for="(item ,index) in residente.telefonosReferencia" :key="index"
          >

            <v-row style="margin-left:10px;heigh:100%" align="center">
              <v-col :cols="5">
                <article>
                    <img style="margin-right:5px;width:6% " src="https://www.flaticon.es/svg/static/icons/svg/996/996443.svg" alt="imagen usuario">
                    <span style="font-size:18px" > {{ item.referentefamiliar}}</span>
                </article>
                  
              </v-col>
              <v-col :cols="3">
                <article>
                    <img style="margin-right:10px;width:8%" src="https://www.flaticon.es/svg/static/icons/svg/633/633544.svg" alt="imagen telefono">
                    <span style="font-size:18px">{{ item.numero}}</span>
                </article>
              </v-col>
              <v-col :cols="4" align="right"> 
                <div style="margin-right:20px">
                    <v-btn style="margin-right:10px"
                    fab
                    x-small
                    dark
                    color="#126BB5"
                    >
                      <v-icon dark>
                        mdi-pencil
                      </v-icon>
                    </v-btn>
                    <v-btn 
                    fab
                    x-small
                    dark
                    color="red"
                    >
                      <v-icon dark>
                        mdi-minus
                      </v-icon>
                    </v-btn>
                </div>
              </v-col>
            </v-row>       
          </v-card>
      </v-card>


<!--FIN -->
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
      <v-stepper-content step="2"><!--CONTIENE LOS STEPPERS 2 -->
        <div class="container-user">
      <form>
        <v-textarea
        label="Motivo de Ingreso"
        v-model="residente.motivoIngreso"
        disabled:true
       > </v-textarea>
  
        <v-textarea
        label="Diagnostico Psicologico"
        v-model="residente.motivoIngreso"
        disabled:true
       > </v-textarea>
        
     
        <v-row> <!-- termina le texto -->
          <v-col>
            <v-btn block @click="step = 3" color="success">
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
      <v-stepper-content step="3"><!--CONTIENE LOS STEPPERS 3 -->
        <div class="container-user">
      <form>
        <v-text-field

           v-model="residente.nombre"
          label="Modalidad:"
          outlined
          readonly
          color="#009900"
        ></v-text-field>
        <v-text-field
          v-model="residente.apellido"
          label="Nivel:"
          outlined
          readonly
          color="#009900"
        ></v-text-field>
        <v-text-field
          v-model="residente.apellido"
          label="Grado:"
          outlined
          readonly
          color="#009900"
        ></v-text-field>
        
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
import moment from 'moment'
export default {
name:'DetalleResidente',
 props:["residente"],
data(){
  return{
    
    datemenu: false,
      step:1,
     
   
     
  }
},
 methods:{
    cerrarDialogo(){
      this.$emit("close-dialog-detail");  
    },
   
  },
  computed:{
    
  }
}
</script>


<style scoped>
div.btn__content {
  padding: 0;
}
div.card__actions .btn {
  min-width: 0;
}
</style>