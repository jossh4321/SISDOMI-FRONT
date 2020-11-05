<template>
  <v-card >
    <v-card-title class="justify-center">Consultar Ficha Educativa</v-card-title>
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
        Ficha Educativa
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <div class="container-user">
      <form>
        <v-text-field
           v-model="residente.nombre"
          label="Ingrese los Nombres"
          outlined
          readonly
          color="#009900"
        ></v-text-field>
        <v-text-field
          v-model="residente.apellido"
          label="Ingrese los Apellidos"
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
          :items="['DNI', 'Pasaporte', 'Carnet Extranjeria']"
          label="Ingrese el Tipo de Documento"
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
      <v-stepper-content step="2">
        <div  class="container-user">
      <form>
        <v-text-field
          v-model="documentoeducativo.nombre"
          label="Nombre del colegio"
          outlined
          readonly
          class="inputTextField"
          color="#009900"

        ></v-text-field>
             <v-text-field
          v-model="documentoeducativo.nivel"
          label="Nivel"
          outlined
          readonly
          class="inputTextField"
          color="#009900"
        ></v-text-field>
        <v-text-field
          v-model="documentoeducativo.nombre"
          label="Grado"
          outlined
          readonly
          class="inputTextField"
          color="#009900"

        ></v-text-field>

        <v-select
        v-model="documentoeducativo.estado"
          :items="['presencial', 'virtual']"
          label="Modalidad"
          dense
          outlined
          readonly
          color="#009900"
        ></v-select>
          <v-card style="margin:5px; padding:5px;border:1px solid #b3b3b3;">
            <v-row>
              <v-col >
                <v-card-subtitle>Imagen del Perfil de {{usuario.datos.nombre}}</v-card-subtitle>
              </v-col>
            </v-row>
            <v-row>
              <v-col
              >
                <v-img style="display:block"
                      height="170"
                    width="170"
                      :src="usuario.datos.imagen"
                    ></v-img>
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

export default {
name:'ConsultarFichaIngreso',
 props:["Documento"],
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