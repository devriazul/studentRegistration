<template>
  <div class="layout-px-spacing">
    <form enctype="multipart/form-data" @submit.prevent="handleSubmit">
      <div class="row align-items-center">
        <div id="card_1" class="col-lg-6 offset-lg-3 layout-spacing layout-top-spacing">
          <div class="statbox widget box box-shadow">
            <div class="widget-content widget-content-area">
              <div class="col" v-if="user.user_type != 'superAdmin'">
                <div class="form-group mb-4">
                  <label for="old_password">Old Password</label>
                  <input
                    id="old_password"
                    v-model="old_password"
                    type="password"
                    class="form-control"
                  />
                </div>
              </div>
              <div class="col">
                <div class="form-group mb-4">
                  <label for="password">New Password</label>
                  <input id="password" v-model="password" type="password" class="form-control" />
                </div>
              </div>
              <div class="col">
                <div class="form-group mb-4">
                  <label for="password_confirmation">Confirm Password</label>
                  <input
                    id="password_confirmation"
                    v-model="password_confirmation"
                    type="password"
                    class="form-control"
                  />
                </div>
              </div>
              <div class="col">
                <button type="button" class="btn btn-warning btn-sm mr-2">
                  <router-link :to="{ name: 'Home' }">Cancel</router-link>
                </button>
                <button type="submit" class="btn btn-primary btn-sm mr-2">Update</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import Request from '@/apis/Request'
import Notify from '../helpers/Notify'

const store = useStore()
const router = useRouter()
const route = useRoute()

const user = computed(() => store.getters.user)

const password = ref('')
const old_password = ref('')
const password_confirmation = ref('')
const errors = ref({})
const isLoading = ref(false)

async function fetchPrimary() {
  isLoading.value = true
  await store.dispatch('user')
  const id = route.params.id
  if (user.value.user_type === 'superAdmin' || user.value.id == id) {
    await router.push({ name: 'Change_Password' })
    isLoading.value = false
  } else {
    await router.push({ name: 'NotFound' })
    isLoading.value = false
  }
}

async function handleSubmit() {
  const data = {
    password: password.value,
    password_confirmation: password_confirmation.value,
    old_password: old_password.value,
  }
  try {
    const res = await Request.POST_REQ(data, `/change-password/${user.value.id}`)
    Notify.success(res.data.message)
    await store.dispatch('userLogout')
    await router.push({ name: 'Login' })
  } catch (error) {
    errors.value = error.response.data.errors
    Notify.error(error.message)
  }
}

//primary fetching
await fetchPrimary()
</script>
