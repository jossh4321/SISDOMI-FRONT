<template>
  <v-app-bar color="primary" fixed dark app>
    <v-toolbar-title class="ml-0 pl-3">
      <v-app-bar-nav-icon @click.stop="toogleDrawer"></v-app-bar-nav-icon>
    </v-toolbar-title>
    <v-text-field
      flat
      solo-inverted
      prepend-icon="search"
      label="Search"
      class="hidden-sm-and-down mt-7"
    >
    </v-text-field>
    <v-spacer></v-spacer>
    <v-btn icon @click="handleFullScreen">
      <v-icon>fullscreen</v-icon>
    </v-btn>
    <v-menu
      offset-y
      origin="center center"
      class="elevation-1"
      :nudge-right="140"
      :nudge-bottom="14"
      transition="scale-transition"
      max-width="380px"
    >
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <div v-if="datosNotificacion!=null">
            <v-badge color="red" overlap>
              <template v-slot:badge>
                <span v-if="datosNotificacion!=null" class="d-block span-alert">{{datosNotificacion.contadorNotificaciones}}</span>
              </template>
              <v-icon medium>notifications</v-icon>
            </v-badge>
          </div>
        </v-btn>
      </template>
      <NotificationList v-if="datosNotificacion!=null" :datosNotificacion="datosNotificacion"></NotificationList>
    </v-menu>
    <v-menu
      offset-y
      origin="center center"
      :nudge-right="140"
      :nudge-bottom="10"
      transition="scale-transition"
    >
      <template v-slot:activator="{ on }">
        <v-btn icon large text v-on="on">
          <v-avatar size="30">
            <img :src="User.imagen" :alt="User.nombre"  />
          </v-avatar>
        </v-btn>
      </template>
      <v-list class="pa-0">
        <v-list-item
          v-for="(item, index) in items"
          :to="!item.href ? { name: item.name } : null"
          :href="item.href"
          @click="item.click"
          ripple="ripple"
          :disabled="item.disabled"
          :target="item.target"
          ref="noopener"
          :key="index"
        >
          <v-list-item-action v-if="item.icon">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import axios from "axios";
import Util from "../../util/index";
import NotificationList from "@/views/Notifications/NotificationList.vue";
import { mapActions, mapGetters } from 'vuex';

export default {
  name: "app-toolbar",
  data: function() {
    return {
      datosNotificacion:null,
      items: [
        {
          icon: "account_circle",
          href: "#",
          title: "Perfil",
          click: (e) => {
           //
           this.$router.push('/dashboard/ModificarPerfil')
            
           
          },
        },
        {
          icon: "settings",
          href: "#",
          title: "Configuración",
          click: (e) => {
            console.log(e);
          },
        },
        {
          icon: "fullscreen_exit",
          href: "#",
          title: "Salir",
          click: this.handleLogout
        },
      ],
    };
  },
  methods: {
    toogleDrawer() {
      this.$store.commit("toggleDrawer");
    },
    handleFullScreen() {
      Util.toggleFullScreen();
    },
    handleLogout() {
      this.logOut();
    },
    async obtenerNotificaciones() {
      await axios
        .get(`/Notificacion/${this.user.id}`)
        .then((res) => {
          for (let i = 0; i < res.data.listaNotificaciones.length; i++) {
            res.data.listaNotificaciones[i].fechaemision = res.data.listaNotificaciones[i].fechaemision.split("T")[0];
            
          }
          var info = res.data
          
          this.datosNotificacion = info
        })
        .catch((err) => console.log(err));
    },
    ...mapActions(['logOut'])
  },
  computed: {
    ...mapGetters(['user']),
    User() {
      return this.user ? this.user.datos: { 
         imagen: "",
         nombre: ""
       };
    }
  },
  components: {
    NotificationList,
  },
  async created(){
    console.log(this.user.id);
    await this.obtenerNotificaciones();
    console.log(this.datosNotificacion);
  }
};
</script>

<style lang="scss" scoped>
.span-alert {
  margin-top: 2px !important;
}
</style>