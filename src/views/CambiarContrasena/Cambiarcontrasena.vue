<template>
  <div id="app">
    <label>Contrasena Actual</label>
    <v-text-field type="password" v-model="actualpassword"
                          :error-messages="actualpasswordError"
                          @input="$v.actualpassword.$touch()"
                          @blur="$v.actualpassword.$touch()"
                          :required="true"></v-text-field>
    <password-meter :password="actualpassword" />
    <label>Contrasena Nueva</label>
    <v-text-field type="password" v-model="nuevapassword"
                          :error-messages="nuevapasswordError"
                          @input="$v.nuevapassword.$touch()"
                          @blur="$v.nuevapassword.$touch()"
                          :required="true"></v-text-field>
    <password-meter :password="nuevapassword" />
    <label>Confirmar Contrasena Nueva</label>
    <v-text-field type="password" v-model="confpassword"
                          :error-messages="confpasswordError"
                          @input="$v.confpassword.$touch()"
                          @blur="$v.confpassword.$touch()"
                          :required="true"></v-text-field>
    <password-meter :password="confpassword" />
    <br />
    <v-btn block color="primary" @click="verificarContrasena()">Aceptar</v-btn>
  </div>
</template>

<script>
import axios from 'axios';
import PasswordMeter from "vue-simple-password-meter";
import { mapGetters, mapActions, mapMutations, mapState } from "vuex";
//import Swal from 'sweetalert2/dist/sweetalert2.js'
//import 'sweetalert2/src/sweetalert2.scss'
import { required } from 'vuelidate/lib/validators';

export default {
  name: "App",
  components: {
    PasswordMeter,
  },
  data() {
    return {
      actualpassword: null,
      nuevapassword: null,
      confpassword: null,
    };
  },

  validations:{
          actualpassword:{
            required
          },
          nuevapassword:{
            required
          },
          confpassword:{
            required
          }
  },
  methods: {
    ...mapActions(["fetchUser"]),

    async verificarContrasena() {
      //console.log(this.user)
      //let claveactual = this.actualpassword
      if(this.actualpassword === ""){
          this.mensaje(
          "error",
          "Campo Contraseña Actual no debe estar vacio",
          "Colocar contrasena Actual"
        );
      }
      else if (this.actualpassword !== this.user.clave) {
        this.mensaje(
          "error",
          "Contrasenas Actual ingresada es incorrecta",
          "Verificar contrasena ingresada"
        );
      } else if (this.nuevapassword === this.actualpassword) {
        this.mensaje(
          "error",
          "Contrasena debe ser diferente a la actual",
          "Verificar contrasena ingresada"
        );
      } else if (this.nuevapassword !== this.confpassword) {
        this.mensaje(
          "error",
          "Contrasenas son distintas",
          "Verificar contrasena"
        );
      }else{
        await axios
          .put("/usuario/clave?id="+this.user.id+"&nuevacontrasena="+this.nuevapassword,this.user)
                .then(res => {
                     this.mensaje("success","Listo","Contraseña del Usuario modificado Satisfactoriamente")
                }).catch(err => console.log(err));
          await this.mensaje('success','Listo','Contraseña Actualizada Satisfactoriamente',"<strong>Se redirigira a la Interfaz de Gestion<strong>");
      }
    },

    mensaje(icono, titulo, texto) {
      this.$swal({
        icon: icono,
        title: titulo,
        text: texto,
      });
    },
  },
  computed: {
    ...mapGetters(["user"]),
    actualpasswordError(){
         const errors = []
          if (!this.$v.actualpassword.$dirty) {
            return errors
          }
          !this.$v.actualpassword.required && errors.push('El campo de contrasena actual no puede estar en blanco')
          return errors
      },
      nuevapasswordError(){
         const errors = []
          if (!this.$v.nuevapassword.$dirty) {
            return errors
          }
          !this.$v.nuevapassword.required && errors.push('El campo de contrasena nueva no puede estar en blanco')
          return errors
      },
      confpasswordError(){
         const errors = []
          if (!this.$v.confpassword.$dirty) {
            return errors
          }
          !this.$v.confpassword.required && errors.push('El campo de contrasena confirmar no puede estar en blanco')
          return errors
      },
  }

};
</script>

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  max-width: 400px;
  margin: 40px auto;
}

input {
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}
</style>