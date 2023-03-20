<template>
  <div class="form-container">
    <div class="form-form">
      <div class="form-form-wrap">
        <div class="form-container">
          <div class="form-content">
            <div class="form-header">
              <img src="@/assets/img/logo.webp" />
              <h1 class="">Welcome Back!</h1>
              <h5 v-if="errors.active" class="text-danger">
                {{ errors.active[0] }}
              </h5>
            </div>
            <form class="text-left" @submit.prevent="handleSubmit">
              <div class="form">
                <div id="username-field" class="field-wrapper input">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-user"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <input
                    id="username"
                    v-model="form.email"
                    name="username"
                    type="email"
                    class="form-control"
                    placeholder="Email"
                  />
                  <span v-if="errors.email" class="text-danger">{{ errors.email[0] }}</span>
                </div>

                <div id="password-field" class="field-wrapper input mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-lock"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  <input
                    id="password"
                    v-model="form.password"
                    name="password"
                    type="password"
                    class="form-control"
                    placeholder="Password"
                  />
                  <span v-if="errors.password" class="text-danger">{{ errors.password[0] }}</span>
                </div>

                <div class="d-sm-flex justify-content-between">
                  <div class="field-wrapper toggle-pass">
                    <p class="d-inline-block">Show Password</p>
                    <label class="switch s-primary">
                      <input id="toggle-password" type="checkbox" class="d-none" />
                      <span class="slider round"></span>
                    </label>
                  </div>
                  <div class="field-wrapper">
                    <button
                      type="submit"
                      class="btn btn-primary !inline-flex items-center justify-center space-x-2"
                      :disabled="isPending"
                    >
                      <span v-if="!isPending">Log In </span>
                      <span v-else>...</span>
                    </button>
                  </div>
                </div>
              </div>
            </form>
            <p class="terms-conditions">
              © 2020 All Rights Reserved.
              <a href="//digital-planet.co.uk" target="_blank">Digital Planet</a>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="form-image">
      <div class="l-image"></div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useLocalStorage } from '@vueuse/core'
import User from '@/apis/User'
import Notify from '@/helpers/Notify'
const router = useRouter()
const store = useStore()
const form = reactive({
  email: '',
  password: '',
  device_name: 'browser',
})
const errors = ref([])
const isPending = ref(false)
//methods
async function handleSubmit() {
  isPending.value = true
  errors.value = []
  try {
    const res = await User.login(form)
    localStorage.setItem('auth', 'true')
    let userInfo = res.data
    userInfo = { ...userInfo, auth: true }
    localStorage.setItem('user', JSON.stringify(userInfo))
    // user.value = userInfo
    await store.dispatch('user', res.data)
    await store.dispatch('branch')
    await store.dispatch('isLoggedin', true)
    // emitter.emit("loginBranch");
    // $router.push({ name: "Dashbaord" });
    await router.push({ name: 'Dashbaord' })
  } catch (err) {
    if (err.response.status === 422) {
      errors.value = err.response.data.errors
    }
    if (err.response.status === 500) {
      errors.value = err.response.data.errors
      Notify.error('server error!')
    }
  } finally {
    isPending.value = false
  }
}
</script>

<style lang="scss">
.form-header {
  display: flex;
  align-items: center;
  flex-direction: column;

  img {
    padding-bottom: 50px;
  }
  h1 {
    color: #a0b5d1;
    padding-bottom: 40px;
  }
}
</style>
