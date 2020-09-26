<template>
  <v-card class="elevation-0">
    <v-card-title><h4>Notificaciones</h4></v-card-title>
    <v-divider></v-divider>
    <v-card-text class="pa-0">
      <v-list two-line class="pa-0"> 
          <template v-for="(item, index) in items">
              <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>
              <v-divider v-else-if="item.divider" :key="index"></v-divider>
              <v-list-item v-else :key="item.title">
                  <v-list-item-avatar :color="item.color">
                      <v-icon dark>{{ item.icon }}</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                      <v-list-item-subtitle v-html="item.title"></v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action class="caption">
                      {{ item.itemLabel }}
                  </v-list-item-action>
              </v-list-item>
          </template>
      </v-list>
      <v-divider></v-divider>
      <v-btn block text class="ma-0">All</v-btn>
      <v-divider></v-divider>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
    name: 'notification-list',
    data: ()=> {
        return {
            items: [{
                title: 'Nuevo usuario registrado',
                color: 'light-green',
                icon: 'account_circle',
                itemLabel: 'Justo ahora'
            }]
        }
    }
};
</script>

<style>
</style>