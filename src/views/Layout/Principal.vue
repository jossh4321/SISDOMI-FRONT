<template>
  <div id="pagePrincipal">
     <template>
         <v-app id="inspire" class="app">
             <app-drawer class="app--drawer"></app-drawer>
             <app-toolbar class="app--toolbar"></app-toolbar>
             <v-main>

                 <div class="page-wrapper">
                     <router-view></router-view>
                 </div>
                 <v-footer height="auto" class="white pa-3 app--footer">
                     <span class="caption">&copy; {{ new Date().getFullYear() }}</span>
                     <v-spacer></v-spacer>
                     <span class="caption mr-1">Hecho por la Universidad Ricardo Palma</span>
                     <v-icon color="pink" small>favorite</v-icon>
                 </v-footer>
             </v-main>
         </v-app>
     </template>
  </div>
</template>

<script>
import Drawer from '@/views/Layout/Drawer.vue';
import Toolbar from '@/views/Layout/Toolbar.vue';

export default {
    name: "AppPrincipal",
    components: {
        appDrawer: Drawer,
        appToolbar: Toolbar
    }
}
</script>

<style lang="scss" scoped>

    .page-wrapper {
        min-height: calc(100vh - 64px - 50px - 81px);
        margin-bottom: 50px;
    }

    .app--footer {
        position: absolute;
        bottom: 0;
        width: 100%;
    }
</style>