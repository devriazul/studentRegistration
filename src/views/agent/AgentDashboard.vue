<template>
  <div class="layout-px-spacing">
    <div id="card_1" class="col-lg-12 layout-spacing layout-top-spacing">
      <div class="statbox widget box box-shadow p-4">
        <h3 class="text-center">
          Hi, {{ user.name }} <br />
          Welcome to Application Portal
        </h3>
        <div class="text-center p-4">
          <button class="btn btn-secondary mr-2">
            <router-link to="/agent-leads"> View Applications </router-link>
          </button>
          <button class="btn btn-primary">
            <router-link to="/add-lead"> Add Applications </router-link>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['user', 'pendingStatus']),
  },
}
</script>
