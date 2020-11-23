<template>
  <router-view></router-view>
</template>

<script>
import Principal from '@/views/Layout/Principal.vue';
import { mapActions } from 'vuex';

export default {
  name: 'App',

  components: {
    appPrincipal: Principal,
  },
  methods: {
    ...mapActions(['tryAutoLogin'])
  },
  data: () => ({
    //
  }),
  created() {
    this.tryAutoLogin();
  }
};
</script>
