<template>
  <v-card>
    <v-card-title class="justify-center">Registro de Sesion Educativa</v-card-title>
    <v-card style="padding: 15px 20px">
      <form>
        <v-autocomplete
          :items="listaresidentes"
          v-model="sesion.idresidente"
          filled
          chips
          dense
          outlined
          color="#009900"
          label="Seleccione un Residente"
          item-text="nombre"
          item-value="id"
          @input="$v.sesion.idresidente.$touch()"
          @blur="$v.sesion.idresidente.$touch()"
          :error-messages="errorResidente"
        >
          <template v-slot:selection="data">
            <v-chip
              v-bind="data.attrs"
              :input-value="data.selected"
              style="margin-top:5px"
            >
              <v-avatar left color="#b3b3ff" size="24">
                <span style="font-size:12px">RT</span>
              </v-avatar>
              {{ data.item.nombre }}
            </v-chip>
          </template>
          <template v-slot:item="data">
            <template>
              <v-list-item-avatar>
                <v-avatar left color="#b3b3ff" size="24">
                  <span style="font-size:12px">RE</span>
                </v-avatar>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title
                  >Nombre completo: {{ data.item.nombre }}
                  {{ data.item.apellido }}
                </v-list-item-title>
                <v-list-item-subtitle
                  >Nro. Documento:
                  {{ data.item.numeroDocumento }}</v-list-item-subtitle
                >
              </v-list-item-content>
            </template>
          </template>
        </v-autocomplete>
        <v-row>
          <v-col>
            <v-btn block @click="cerrarDialogo()" color="primary">
              <v-icon left>mdi-close-outline</v-icon>
              <span>Cerrar</span>
            </v-btn>
          </v-col>
          <v-col>
            <v-btn block color="success">
              <v-icon left>done</v-icon>
              <span >Continuar</span>
            </v-btn>
          </v-col>
        </v-row>
      </form>
    </v-card>
  </v-card>
</template>

<script>
import axios from "axios";
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import { mapMutations, mapState } from "vuex";
import { required, minLength, email, helpers } from "vuelidate/lib/validators";
export default {
  props:["sesioneducativa","listaresidentes"],
  data() {
    return{
      residente:{},
      sesion:{
        idresidente:"",
      },
    }
  },
  methods:{
    cerrarDialogo() {
      this.$emit("close-dialog-participantes");
    },
    async abrirDialogo(tipoSesion) {
      this.residente = await this.loadResidenteDetalle(this.sesion.idresidente)
      console.log(this.tipoSesion);
      console.log("Residente:"+residente);
      
    },
    async loadResidenteDetalle(idresidente) {
      var user = {};
      await axios
        .get("/residente/id?id=" + idresidente)
        .then((res) => {
          console.log(res);
          user = res.data;
          user.fechaNacimiento = user.fechaNacimiento.split("T")[0];
          user.fechaIngreso = user.fechaIngreso.split("T")[0];
        })
        .catch((err) => console.log(err));
      console.log(user);
      return user;
    },
  },
  computed:{
    errorResidente() {
      const errors = [];
      if (!this.$v.sesion.idresidente.$dirty) return errors;
      !this.$v.sesion.idresidente.required &&
        errors.push("Debe seleccionar un residente obligatoriamente");
      return errors;
    },
  },
  validations(){
    return{
      sesion:{
        idresidente: {
          required,
        }
      },
    }
  },
  created(){
    console.log("Componente Participante creado")
  }
}
</script>

<style>
.v-application .primary--text{
    color: var(--v-success-darken1) !important;
    caret-color: var(--v-success-lighten1) !important;
}
</style>