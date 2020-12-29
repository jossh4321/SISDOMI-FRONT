<template>
  <v-app id="login" class="primary">
    <v-main>
      <v-container fluid fill-height>
        <v-row align="center" justify="center">
          <v-col xl="12" sm="8" md="4" lg="4">
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="d-flex column align-center">
                  <img
                    src="../../assets/static/m.png"
                    alt="SISDOMI"
                    width="120"
                    height="120"
                  />
                  <h1 class="flex my-4 text--primary">SISDOMI</h1>
                </div>
                <v-form>
                  <v-text-field
                    append-icon="person"
                    label="Usuario"
                    type="text"
                    v-model="model.username"
                    :error-messages="usernameErrors"
                    @input="$v.model.username.$touch()"
                    @blur="$v.model.username.$touch()"
                    :required="true"
                  ></v-text-field>
                  <v-text-field
                    append-icon="lock"
                    label="Contraseña"
                    id="password"
                    type="password"
                    v-model="model.password"
                    :error-messages="passwordErrors"
                    @input="$v.model.password.$touch()"
                    @blur="$v.model.password.$touch()"
                    :required="true"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                  <v-btn block color="primary"
                   @click="logIn(model)" 
                   :loading="loading"
                   type="submit"
                   :disabled="$v.$invalid"
                   >Iniciar Sesión</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios';
import { mapActions, mapGetters } from 'vuex';
import { required } from 'vuelidate/lib/validators';

export default {
    name: 'login',
    data: ()=> {
        return {
            model: {
                username: '',
                password: ''
            }
        }
    },
    
    validations:{
        model:{
          username:{
            required
          },
          password:{
            required
          }
        }
    },

    methods: {
       ...mapActions(['logIn']),
    },
    computed: {
      ...mapGetters(['loading']),
      usernameErrors(){
         const errors = []
          if (!this.$v.model.username.$dirty) {
            return errors
          }
          !this.$v.model.username.required && errors.push('El campo de usuario no puede estar en blanco')
          return errors
      },
      passwordErrors(){
         const errors = []
          if (!this.$v.model.password.$dirty) {
            return errors
          }
          !this.$v.model.password.required && errors.push('El campo de contrasena no puede estar en blanco')
          return errors
      },
      //submit: function() {
      //if (this.$v.$invalid) return;
      //alert('Gracias!');
    //}
    }
};
</script>

<style lang="scss">
#login {
  height: 50%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  z-index: 0;
  background-color: #EC242C;
}

.swal2-container {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif!important;
}
</style>