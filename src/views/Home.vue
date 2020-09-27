<template>
  <div class="d-flex justify-center align-center home">
    <div>
      Vista de prueba
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>

<style lang="scss" scoped>
    .home {
      height: 100vh;
    }
</style>
