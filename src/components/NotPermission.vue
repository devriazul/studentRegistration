<template>
  <div v-if="pendingStatus || isLoading">
    <Loader />
  </div>
  <div class="container-fluid error-content error404 text-center">
    <div class="">
      <br />
      <h1 class="error-number">You Do Not Have Permission Access This Page.</h1>
      <p class="mini-text">Ooops!</p>
      <p class="error-text mb-4 mt-1">The page you requested was not found!</p>
      <router-link to="/dashboard" class="btn btn-primary mt-5">Go Back</router-link>
    </div>
  </div>
</template>
<script>
import Loader from '@/components/Loader.vue'

import { mapGetters, mapState } from 'vuex'
export default {
  components: { Loader },
  computed: {
    ...mapGetters(['user', 'pendingStatus']),
    ...mapState(['baseURL']),
  },
}
</script>
<style scoped>
/* @import "/assets/css/pages/error/style-400.css"; */
.error-number {
  color: red;
}
</style>
