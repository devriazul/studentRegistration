<template>
  <div class="form-container">
    <div class="form-form">
      <div class="form-form-wrap">
        <div class="form-container">
          <div class="form-content">
            <h1 class="">
              Get started with a <br />
              free account
            </h1>
            <p class="signup-link">Already have an account? <a href="auth_login.html">Log in</a></p>
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
                    id="name"
                    v-model="name"
                    name="name"
                    type="text"
                    class="form-control"
                    placeholder="Username"
                  />
                  <span v-if="error.name" class="text-danger">{{ error.name[0] }}</span>
                </div>
                <div id="email-field" class="field-wrapper input">
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
                    class="feather feather-at-sign"
                  >
                    <circle cx="12" cy="12" r="4"></circle>
                    <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"></path>
                  </svg>
                  <input id="email" v-model="email" name="email" type="text" placeholder="Email" />
                  <span v-if="error.email" class="text-danger">{{ error.email[0] }}</span>
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
                    v-model="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                  />
                  <span v-if="error.password" class="text-danger">{{ error.password[0] }}</span>
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
                    id="password_confirmation"
                    v-model="password_confirmation"
                    name="password_confirmation"
                    type="password"
                    placeholder="Confirm Password"
                  />
                </div>
                <div class="field-wrapper terms_condition">
                  <div class="n-chk new-checkbox checkbox-outline-primary">
                    <label class="new-control new-checkbox checkbox-outline-primary">
                      <input type="checkbox" class="new-control-input" />
                      <span class="new-control-indicator"></span
                      ><span
                        >I agree to the
                        <a href="javascript:void(0);"> terms and conditions </a></span
                      >
                    </label>
                  </div>
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
                    <button type="submit" class="btn btn-primary" value="">Get Started!</button>
                  </div>
                </div>
              </div>
            </form>
            <p class="terms-conditions">
              © 2020 All Rights Reserved. <a href="#">Digital Planet</a>
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

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import User from '../../apis/User'
export default {
  setup() {
    const router = useRouter()
    const name = ref('')
    const email = ref('')
    const password = ref('')
    const password_confirmation = ref('')
    let error = ref('')
    let isPending = ref(false)

    const handleSubmit = () => {
      isPending.value = true
      const form = {
        name: name.value,
        email: email.value,
        password: password.value,
        password_confirmation: password_confirmation.value,
      }

      User.register(form)
        .then((res) => {
          if (res.status === 200) {
            isPending.value = false
            router.push({ name: 'Login' })
          }
        })
        .catch((err) => {
          if (err.response.status === 422) {
            isPending.value = false
            error.value = err.response.data.errors
          }
        })
    }

    return {
      name,
      email,
      password,
      handleSubmit,
      password_confirmation,
      error,
      isPending,
    }
  },
}
</script>
