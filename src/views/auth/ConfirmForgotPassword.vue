<template>
  <div class="form-container">
    <div class="form-form">
      <div class="form-form-wrap">
        <div class="form-container">
          <div class="form-content">
            <div class="form-header">
              <img src="@/assets/img/logo.webp" />
              <h1 class="">Reset Password Page!</h1>
            </div>
            <form class="text-left" @submit.prevent="handleSubmit">
              <div class="form">
                <div class="field-wrapper input">
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
                  <input type="hidden" name="token" v-model="token"/>
                  <input
                    id="password"
                    v-model="form.password"
                    name="password"
                    type="password"
                    class="form-control"
                    placeholder="Password"
                  />
                  <span class="form-text text-danger" v-if="v$.password.$error">
                    {{ v$.password.$errors[0].$message }}
                  </span>
                  
                </div>
                <div class="field-wrapper input">
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
                    id="confirm_password"
                    v-model="form.confirm_password"
                    name="confirm_password"
                    type="password"
                    class="form-control"
                    placeholder="Password"
                  />
                  <span class="form-text text-danger" v-if="v$.confirm_password.$error">
                    {{ v$.confirm_password.$errors[0].$message }}
                  </span>
                  
                  <span v-if="errorMsg" class="text-danger">{{ errorMsg }}</span>
                  <span v-if="successMsg" class="text-success">{{ successMsg }}</span>
                </div>
                <div class="d-sm-flex justify-content-between">
                  <div class="field-wrapper toggle-pass">
                  </div>
                  <div class="field-wrapper">
                    <button
                      type="submit"
                      class="btn btn-primary !inline-flex items-center justify-center space-x-2"
                      :disabled="isPending"
                    >
                      <span v-if="!isPending">Reset Password</span>
                      <span v-else>...</span>
                    </button>
                  </div>
                </div><br>
                <div class="text-center forgot-password-css">
                  Already Have Account <a href="https://staging.theleadlibrary.com/login" >Go To Login</a>
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
import { ref, computed, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import User from '@/apis/User'
import Notify from '@/helpers/Notify'
import Request from '../../apis/Request'
import useVuelidate from '@vuelidate/core'
import {
  required,
  email,
  helpers,
  sameAs,
} from '@vuelidate/validators'

const route = useRoute()
const router = useRouter()
const store = useStore()
const token = ref('')
const errorMsg = ref('')
const successMsg = ref('')
const errors = ref({})
const $externalResults = ref({})
const form = reactive({
  password: '',
  confirm_password:'',
})
const rules = computed(() => {
  return {
    password: {
      required: helpers.withMessage('Password field is required!', required),
      
    },
    confirm_password: {
      required: helpers.withMessage('Confirm Password field is required!', required),
      sameAs: helpers.withMessage(
        'Password and Confirmed Password Must be Same!',
        sameAs(form.password)
      ),
    },
    
  }
})
const v$ = useVuelidate(rules, form, { errors, $autoDirty: true, $lazy: false })

const isPending = ref(false)
//methods
async function handleSubmit() {
  v$.value.$validate()
  if (!v$.value.$error) {
    isPending.value = true
    let data = new FormData()
    data.append('password',form.password)
    data.append('confirm_password',form.confirm_password)
    data.append('token',token.value)
    Request.POST_REQ(data, '/reset-password-confirm')
    .then((res)=>{
      console.log(res)
      if(res.data.result.key==200){
        isPending.value = false
        form.password = null
        form.confirm_password = null
        successMsg.value = res.data.result.val
        Notify.success('Successfully Change the Password. Goto Login!')
      }
      if(res.data.result.key==101){
        isPending.value = false
        errorMsg.value = res.data.result.val
      }
      
    })
    .catch((err) => {
      console.log(err)
      isPending.value = false
      errors.value = err.response.data.errors
      Notify.error(errors.value)
    })
  }
  
}
async function fetchPrimary(){
    console.log('called')
    let slug = route.params.id
    token.value = slug
    console.log(token.value)
}
await fetchPrimary()
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
