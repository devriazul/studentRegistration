<template>
  <div class="container-fluid error-content error404 text-center">
    <div class="">
      <h1 class="error-number">404</h1>
      <p class="mini-text">Ooops!</p>
      <p class="error-text mb-4 mt-1">The page you requested was not found!</p>

      <router-link to="/dashboard" class="btn btn-primary mt-5">Go Back</router-link>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
export default {
  computed: {
    ...mapGetters(['user', 'pendingStatus']),
    ...mapState(['baseURL']),
  },
}
</script>
<style scoped>
/* @import "/assets/css/pages/error/style-400.css"; */
</style>
