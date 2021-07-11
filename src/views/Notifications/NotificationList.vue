<template>
  <v-card class="elevation-0">
    <v-card-title><h4>Notificaciones</h4></v-card-title>
    <v-divider></v-divider>
    <v-card-text class="pa-0">
      <v-list two-line class="pa-0"> 
          <template v-for="(item) in datosNotificacion.listaNotificaciones" >
          <!-- <template v-for="(item, index) in datosNotificacion.listaNotificaciones" > -->
              <!-- <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader> -->
              <!-- <v-divider v-else-if="item.divider" :key="index"></v-divider> -->
              <!-- <v-list-item v-else :key="item.titulo"> -->
              <v-list-item :key="item.titulo">
                  <v-list-item-avatar color="green">
                      <v-icon dark>account_circle</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                      <v-list-item-subtitle v-html="item.titulo"></v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action class="caption">
                      {{ item.fechaemision }}
                  </v-list-item-action>
              </v-list-item>
          </template>
      </v-list>
      <v-divider></v-divider>
      <v-btn block text class="ma-0">Ver Todos</v-btn>
      <v-divider></v-divider>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
    name: 'NotificationList',
    props:["datosNotificacion"],
    data: ()=> {
        return {
            items: [{
                title: 'Nuevo usuario registradsssssssssssssssssssoaaaaaa',
                color: 'light-green',
                icon: 'account_circle',
                itemLabel: 'Justo ahora',
                divider:false
            }]
        }
    }
};
</script>

<style>
</style>