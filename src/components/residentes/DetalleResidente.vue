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
          label="Nombres:"
          outlined
          readonly
          color="#009900"
        ></v-text-field>
        <v-text-field
          v-model="residente.apellido"
          label="Apellidos:"
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
              v-model="residente.fechanacimiento"
              label="Fecha de Nacimiento"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
              color="#009900"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="residente.fechanacimiento"
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
           v-model="residente.tipodocumento"
        ></v-select>
        <v-text-field
          v-model="residente.numerodocumento"
          label="Ingrese el Numero de Documento"
          outlined
          readonly
          color="#009900"
        ></v-text-field>
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
        v-model="residente.motivoingreso"
        disabled:true
       > </v-textarea>
  
        <v-textarea
        label="No se que campo es"
        v-model="residente.motivoingreso"
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
export default {
name:'DetalleResidente',
 props:["residente"],
data(){
  return{
    
    datemenu: false,
      step:1
  }
},
 methods:{
    cerrarDialogo(){
      this.$emit("close-dialog-detail");
    }
  }
}
</script>


<style>

</style>