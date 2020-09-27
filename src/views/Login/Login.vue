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
                  ></v-text-field>
                  <v-text-field
                    append-icon="lock"
                    label="Contraseña"
                    id="password"
                    type="password"
                    v-model="model.password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                  <v-btn block color="primary" @click="login" :loading="loading">Iniciar Sesión</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
    name: 'login',
    data: ()=> {
        return {
            loading: false,
            model: {
                username: 'josue_colombo@gmail.com',
                password: 'password'
            }
        }
    },
    methods: {
        login() {
            this.loading = true;
            setTimeout(() => {
                this.$router.push('/dashboard');
            }, 1000);
        }
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
</style>