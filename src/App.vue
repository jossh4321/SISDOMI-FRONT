<template>
  <router-view></router-view>
</template>

<script>
import Principal from '@/views/Layout/Principal.vue';
//hola
export default {
  name: 'App',

  components: {
    appPrincipal: Principal,
  },

  data: () => ({
    //
  }),
};
</script>
