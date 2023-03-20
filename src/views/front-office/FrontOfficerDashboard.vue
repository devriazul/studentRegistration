<template>
  <div class="layout-px-spacing">
    <div id="card_1" class="col-lg-12 layout-spacing layout-top-spacing">
      <div class="statbox widget box box-shadow p-4">
        <h3 class="text-center">
          Hi, {{ user && user.name }} <br />
          Welcome to Application Portal
        </h3>
        <div class="p-4 text-center">
          <button class="btn btn-secondary mr-2">
            <router-link to="/leads"> View Leads </router-link>
          </button>
          <button class="btn btn-primary">
            <router-link to="/add-lead"> Add Lead </router-link>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const user = computed(() => store.getters.user)
</script>
