<template>
  <div class="layout-px-spacing">
    <form enctype="multipart/form-data" @submit.prevent="handleSubmit">
      <div id="card_1" class="col-lg-12 layout-spacing layout-top-spacing">
        <div class="statbox widget box box-shadow">
          <div class="widget-content widget-content-area">
            <div class="row mb-4">
              <div class="col-xl-12 col-md-12 col-sm-12 col-12">
                <div class="d-flex align-items-start justify-content-between">
                  <h4>Branch Information</h4>
                  <router-link :to="{ name: 'Branches' }">
                    <button class="btn btn-info mb-2 mr-4 btn-rounded inline-flex">
                      View Branches
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-eye"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    </button>
                  </router-link>
                </div>

                <br />
              </div>
              <div class="col">
                <div class="form-group mb-4">
                  <label for="exampleFormControlInput1">Branch Name</label>
                  <input v-model="stateset.branch_name" type="text" class="form-control" />
                  <span class="form-text text-danger" v-if="v$.branch_name.$error">
                      {{ v$.branch_name.$errors[0].$message }}
                  </span>
                </div>
              </div>
              <div class="col">
                <div class="form-group mb-4">
                  <label for="exampleFormControlInput1">Phone</label>
                  <input v-model="stateset.branch_phone" type="text" class="form-control" />
                  <span class="form-text text-danger" v-if="v$.branch_phone.$error">
                      {{ v$.branch_phone.$errors[0].$message }}
                  </span>
                </div>
              </div>
              <div class="col">
                <div class="form-group mb-4">
                  <label for="exampleFormControlInput1">Email</label>
                  <input v-model="stateset.branch_email" type="email" class="form-control" />
                  <span class="form-text text-danger" v-if="v$.branch_email.$error">
                      {{ v$.branch_email.$errors[0].$message }}
                  </span>
                  <small v-if="errors.branch_email" id="sh-text1" class="form-text text-danger">{{
                    errors.branch_email[0]
                  }}</small>
                </div>
              </div>
            </div>
            <div class="row mb-4">
              <div class="col">
                <div class="form-group mb-4">
                  <label for="exampleFormControlInput1">Country</label>
                  <select
                    v-model="stateset.country"
                    class="form-control"
                    @change="selectCounttry($event.target.value)"
                  >
                    <option disabled value="">Select Country</option>
                    <option v-for="countri in countries" :key="countri.id" :value="countri.id">
                      {{ countri.name }}
                    </option>
                  </select>
                  <span class="form-text text-danger" v-if="v$.country.$error">
                      {{ v$.country.$errors[0].$message }}
                  </span>
                </div>
              </div>

              <div class="col">
                <div class="form-group mb-4">
                  <label for="exampleFormControlInput1">City</label>
                  <input v-model="stateset.city" type="text" class="form-control" />
                  <span class="form-text text-danger" v-if="v$.city.$error">
                      {{ v$.city.$errors[0].$message }}
                  </span>
                </div>
              </div>
              <div class="col">
                <div class="form-group mb-4">
                  <label for="exampleFormControlInput1">State</label>
                  <input v-model="stateset.state" type="text" class="form-control" />
                  <span class="form-text text-danger" v-if="v$.state.$error">
                      {{ v$.state.$errors[0].$message }}
                  </span>
                </div>
              </div>
            </div>
            <div class="row mb-4 d-flex align-items-center">
              <div class="col col-md-6">
                <div class="form-group mb-4">
                  <label for="exampleFormControlTextarea1">Address in Details</label>
                  <textarea
                    id="exampleFormControlTextarea1"
                    v-model="stateset.address"
                    class="form-control"
                    rows="3"
                    spellcheck="false"
                  ></textarea>
                  <span class="form-text text-danger" v-if="v$.address.$error">
                      {{ v$.address.$errors[0].$message }}
                  </span>
                </div>
              </div>
              <div class="col col-md-2">
                <label for="exampleFormControlTextarea1">Set a Color</label>
                <input
                  v-model="stateset.branch_bg_color"
                  style="cursor: pointer"
                  type="color"
                  class="ml-3"
                />
                <span class="form-text text-danger" v-if="v$.branch_bg_color.$error">
                    {{ v$.branch_bg_color.$errors[0].$message }}
                </span>
                <small v-if="errors.branch_bg_color" id="sh-text1" class="form-text text-danger">{{
                    errors.branch_bg_color[0]
                  }}</small>
              </div>
              <div class="col col-md-4">
                <div class="row d-flex align-items-center">
                  <div class="col col-md-8">
                    <div class="form-group mb-4">
                      <label>Upload Country Flag or Logo</label>
                      <label class="custom-file-container__custom-file">
                        <input
                          type="file"
                          class="form-control-file"
                          accept="image/*"
                          @change="onFileChangeFlag"
                        />
                      </label>
                      <span class="form-text text-danger" v-if="v$.flag.$error">
                          {{ v$.flag.$errors[0].$message }}
                      </span>
                      <div class="custom-file-container__image-preview"></div>
                    </div>
                  </div>
                  <div class="col col-md-4">
                    <div v-if="set_flag" class="office-logo">
                      <img alt="Branch flag" :src="set_flag" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mb-4">
              <div class="col col-md-12">
                <div
                  v-for="(input, index) in additionals"
                  :key="index"
                  class="form-group mb-4 d-flex align-items-center align-self-center"
                >
                  <div class="col col-md-8 pl-0">
                    <label for="exampleFormControlTextarea1">Additional Information</label>
                    <textarea
                      id="exampleFormControlTextarea1"
                      v-model="input.additional"
                      class="form-control"
                      rows="3"
                      spellcheck="false"
                    ></textarea>
                  </div>
                  <div class="row ml-4">
                    <div v-show="index == additionals.length - 1">
                      <button class="btn btn-warning mb-2 mr-2 btn-rounded" @click.prevent="add">
                        Add More
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
                          class="feather feather-plus-circle"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <line x1="12" y1="8" x2="12" y2="16" />
                          <line x1="8" y1="12" x2="16" y2="12" />
                        </svg>
                      </button>
                    </div>
                    <div v-show="index || (!index && additionals.length > 1)">
                      <button class="btn btn-danger mb-2 mr-2 btn-rounded" @click.prevent="remove">
                        Remove
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
                          class="feather feather-x-circle"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="15" y1="9" x2="9" y2="15"></line>
                          <line x1="9" y1="9" x2="15" y2="15"></line>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="card_1" class="col-lg-12 layout-spacing layout-top-spacing">
        <div class="statbox widget box box-shadow">
          <div class="widget-content widget-content-area">
            <div class="row mb-4">
              <div class="col-xl-12 col-md-12 col-sm-12 col-12">
                <h4>Branch Manager Information</h4>
                <br />
              </div>
              <div class="col">
                <div class="form-group mb-4">
                  <label for="personName">Person Name</label>
                  <input id="personName" v-model="stateset.person_name" type="text" class="form-control" />
                  <span class="form-text text-danger" v-if="v$.person_name.$error">
                      {{ v$.person_name.$errors[0].$message }}
                  </span>
                </div>
              </div>
              <div class="col">
                <div class="form-group mb-4">
                  <label for="exampleFormControlInput1">Phone</label>
                  <input v-model="stateset.person_phone" type="text" class="form-control" />
                  <span class="form-text text-danger" v-if="v$.person_phone.$error">
                      {{ v$.person_phone.$errors[0].$message }}
                  </span>
                </div>
              </div>
              <div class="col">
                <div class="form-group mb-4">
                  <label for="exampleFormControlInput1">Email</label>
                  <input v-model="stateset.person_email" type="email" class="form-control" />
                  <span class="form-text text-danger" v-if="v$.person_email.$error">
                      {{ v$.person_email.$errors[0].$message }}
                  </span>
                  <small v-if="errors.person_email" id="sh-text1" class="form-text text-danger">{{
                    errors.person_email[0]
                  }}</small>
                </div>
              </div>
            </div>
            <div class="row mb-4">
              <div class="col">
                <div class="form-group mb-4">
                  <label for="exampleFormControlInput1">Alternative Person Contact</label>
                  <input v-model="stateset.alternative_contact" type="text" class="form-control" />
                  <span class="form-text text-danger" v-if="v$.alternative_contact.$error">
                      {{ v$.alternative_contact.$errors[0].$message }}
                  </span>
                </div>
              </div>

              <div class="col">
                <div class="form-group mb-4">
                  <label for="exampleFormControlInput1">NID or Passport Number</label>
                  <input v-model="stateset.nid_or_passport" type="text" class="form-control" />
                  <span class="form-text text-danger" v-if="v$.nid_or_passport.$error">
                      {{ v$.nid_or_passport.$errors[0].$message }}
                  </span>
                </div>
              </div>
              <div class="col">
                <div class="form-group mb-4">
                  <label for="exampleFormControlInput1">Nationality</label>
                  <input v-model="stateset.nationality" type="text" class="form-control" />
                  <span class="form-text text-danger" v-if="v$.nationality.$error">
                      {{ v$.nationality.$errors[0].$message }}
                  </span>
                </div>
              </div>
            </div>
            <div class="row mb-4">
              <div class="col col-md-4">
                <div class="row d-flex align-items-center">
                  <div class="col col-md-8">
                    <div class="form-group mb-4">
                      <label>Branch Manager Photo</label>
                      <label class="custom-file-container__custom-file">
                        <input
                          type="file"
                          class="form-control-file"
                          accept="image/*"
                          @change="onFileChange"
                        />
                      </label>
                      <div class="custom-file-container__image-preview"></div>
                    </div>
                  </div>
                  <div class="col col-md-4">
                    <div v-if="set_logo" class="office-logo">
                      <img alt="Branch Logo" :src="set_logo" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="card_1" class="col-lg-12 layout-spacing layout-top-spacing">
        <div class="statbox widget box box-shadow">
          <div class="widget-content widget-content-area">
            <div class="row mb-4">
              <div class="col-xl-12 col-md-12 col-sm-12 col-12">
                <h4>Branch Login Information</h4>
                <br />
              </div>
              <div class="col">
                <div class="form-group mb-4">
                  <label for="personName">Person Name</label>
                  <input id="personName" v-model="stateset.name" type="text" class="form-control" />
                  <span class="form-text text-danger" v-if="v$.name.$error">
                      {{ v$.name.$errors[0].$message }}
                  </span>
                </div>
              </div>
              <div class="col">
                <div class="form-group mb-4">
                  <label for="email">Email</label>
                  <input v-model="stateset.email" type="email" class="form-control" />
                  <span class="form-text text-danger" v-if="v$.email.$error">
                      {{ v$.email.$errors[0].$message }}
                  </span>
                  <small v-if="errors.email" id="sh-text1" class="form-text text-danger">{{
                    errors.email[0]
                  }}</small>
                </div>
              </div>
              <div class="col">
                <div class="form-group mb-4">
                  <label for="password">Password</label>
                  <input v-model="stateset.password" type="password" class="form-control" />
                  <span class="form-text text-danger" v-if="v$.password.$error">
                      {{ v$.password.$errors[0].$message }}
                  </span>
                </div>
              </div>

              <div class="col">
                <div class="form-group mb-4">
                  <label for="password">Confirm Password</label>
                  <input v-model="stateset.password_confirmation" type="password" class="form-control" />
                  <span class="form-text text-danger" v-if="v$.password_confirmation.$error">
                      {{ v$.password_confirmation.$errors[0].$message }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="card_1" class="col-lg-12 layout-spacing layout-top-spacing">
        <div class="statbox widget box box-shadow">
          <div class="widget-content widget-content-area">
            <div class="row">
              <div class="col text-right">
                <div class="row">
                  <div class="col">
                    <router-link :to="{ name: 'Branches' }">
                      <button type="submit" class="btn btn-warning mr-2 btn-lg">Cancel</button>
                    </router-link>
                    <button :disabled="isPending || v$.$invalid" class="btn btn-primary btn-lg mr-2">
                      <span v-if="!isPending">Submit</span>
                      <span v-else>wait..</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import Loader from '@/components/Loader.vue'
import { mapGetters,useStore } from 'vuex'
import Notify from '../../helpers/Notify'
import Request from '../../apis/Request'
import { ref,computed,reactive } from 'vue'
import useVuelidate from '@vuelidate/core';
import { required, alpha, email, maxLength, minLength, helpers, sameAs, numeric  } from '@vuelidate/validators';

export default {
  name: 'AddBranch',
  components: { Loader },
  data() {
    return {
      countries: [],
      additionals: [
        {
          additional: '',
        },
      ],

      errors: {},
      isLoading: false,
      set_flag:'',
      set_logo:'',
      isPending:false,
    }
  },
  setup(){
    const store = useStore()
    const baseURL = computed(() => store.getters.baseURL)
    const $externalResults = ref({})
    const stateset = reactive({
      branch_name: '',
      branch_phone: '',
      branch_email: '',
      country: '',
      city: '',
      state: '',
      address: '',
      branch_bg_color: '#e2a03f',
      person_name: '',
      person_phone: '',
      person_email: '',
      alternative_contact: '',
      nid_or_passport: '',
      nationality: '',
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      logo: '',
      flag: '',
    })
    const rules = computed(() =>{
      return {
          branch_name: {
            required: helpers.withMessage("Branch Name Is Requires!", required),
          },
          branch_phone: {
            required: helpers.withMessage("Branch Phone Is Requires!", required),
            minLength:helpers.withMessage("Branch Phone field must be contain 6 charecters!", minLength(6)),
            maxLength:helpers.withMessage("Branch Phone field contain not more than 20 charecters!", maxLength(20))
          },
          branch_email: {
              required: helpers.withMessage("Branch Email field is required!", required),
              email: helpers.withMessage("Branch Email field must be valid email address!", email) ,
          },
          country: {
              required: helpers.withMessage("Please Select Country!", required),
          },
          city: {
              required: helpers.withMessage("City Field Is Required!", required),
          },
          state: {
              required: helpers.withMessage("State Field Is Required!", required),
          },
          address: {
              required: helpers.withMessage("Address Field Is Required!", required),
          },
          branch_bg_color: {
              required: helpers.withMessage("Please Select Branch Bg Color!", required),
          },
          person_name: {
              required: helpers.withMessage("Person Name Is Required!", required),
          },
          person_phone: {
              required: helpers.withMessage("Person Phone Is Required!", required),
              minLength:helpers.withMessage("Person Phone field must be contain 6 charecters!", minLength(6)),
              maxLength:helpers.withMessage("Person Phone field contain not more than 20 charecters!", maxLength(20))
          },
          person_email: {
              required: helpers.withMessage("Person Email Is Required!", required),
              email: helpers.withMessage("Person Email field must be valid email address!", email) ,
          },
          alternative_contact: {
              required: helpers.withMessage("Alternative Contact Is Required!", required),
          },
          nid_or_passport: {
              required: helpers.withMessage("Nid or Passport Is Required!", required),
          },
          nationality: {
              required: helpers.withMessage("Nationality Field Is Required!", required),
          },
          flag: {
              required: helpers.withMessage("Please Select Flag!", required),
          },
          name: {
              required: helpers.withMessage("Name is Required!", required),
              maxLength:helpers.withMessage("Name field contain not more than 20 charecters!", maxLength(20))
          },
          email: {
              required: helpers.withMessage("Email is Required!", required),
              email: helpers.withMessage("Email field must be valid email address!", email) ,
              maxLength:helpers.withMessage("Email field contain not more than 64 charecters!", maxLength(64))
          },
          password:{
              required:helpers.withMessage("Password field is required!", required),
              minLength:helpers.withMessage("Password field must be contain 6 charecters!", minLength(6)),
              maxLength:helpers.withMessage("Password field contain 64 charecters!", maxLength(64))
          },
          password_confirmation:{
              required:helpers.withMessage("Confirmation Password field is required!", required),
              minLength:helpers.withMessage("Confirmation Password field must be contain 6 charecters!", minLength(6)),
              sameAsPassword:helpers.withMessage("Password and Confirmation Password must be Same",sameAs(stateset.password))
          },
          
      }
    })
    const v$ = useVuelidate(rules,stateset, { $externalResults, $autoDirty: true, $lazy: false })
    return {
        stateset,
        v$,
    }
  },
  computed: {
    ...mapGetters(['user', 'pendingStatus']),
  },

  mounted() {
    Request.GET_REQ('/get-all-countries').then((res) => {
      this.countries = res.data
    })
  },

  methods: {
    handleSubmit() {
      this.v$.$validate()
      if(!this.v$.$error){
        this.isLoading = true
        this.isPending = true
        let data = new FormData()
        data.append('branch_name',this.stateset.branch_name)
        data.append('branch_phone',this.stateset.branch_phone)
        data.append('branch_email',this.stateset.branch_email)
        data.append('country',this.stateset.country)
        data.append('city',this.stateset.city)
        data.append('state',this.stateset.state)
        data.append('address',this.stateset.address)
        data.append('branch_bg_color',this.stateset.branch_bg_color)
        data.append('person_name',this.stateset.person_name)
        data.append('person_phone',this.stateset.person_phone)
        data.append('person_email',this.stateset.person_email)
        data.append('alternative_contact',this.stateset.alternative_contact)
        data.append('nid_or_passport',this.stateset.nid_or_passport)
        data.append('nationality',this.stateset.nationality)
        data.append('logo',this.stateset.logo)
        data.append('flag',this.stateset.flag)
        data.append('name',this.stateset.name)
        data.append('email',this.stateset.email)
        data.append('password',this.stateset.password)
        data.append('password_confirmation',this.stateset.password_confirmation)
        data.append('additionals',JSON.stringify(this.additionals))

        Request.POST_REQ(data, '/add-branch')
        .then(() => {
          this.isLoading = false
          this.isPending = false
          // this.resetForm();
          this.$router.push({ name: 'Branches' })
          Notify.success('The Branch Successfully Created')
        })
        .catch((err) => {
          console.log(err)
          this.errors = err.response.data.errors
          this.isLoading = false
          this.isPending = false
          this.$externalResults = err.response.data.errors
          Notify.error(this.$externalResults)
          window.scrollTo(0, 0)
          Notify.error(this.errors.branch_email && this.errors.branch_email[0])
          Notify.error(this.errors.branch_bg_color && this.errors.branch_bg_color[0])
          Notify.error(this.errors.person_email && this.errors.person_email[0])
          Notify.error(this.errors.email && this.errors.email[0])
        })
      }else{
        window.scrollTo(0,0)
      }
      
    },
    onFileChange(event) {
      let file = event.target.files[0]
      if (file.size > 1048770) {
        Notify.warning('File is not bigger than 2MB')
      } else {
        let file = event.target.files[0]
        this.stateset.logo = event.target.files[0]
        let reader = new FileReader()
        reader.onload = (event) => {
          this.set_logo = event.target.result
        }
        reader.readAsDataURL(file)
      }
    },
    onFileChangeFlag(event) {
      const file = event.target.files[0]
      if (file.size > 1048770) {
        Notify.warning('File size not bigger than 2 MB')
      }else{
        let file = event.target.files[0]
        this.stateset.flag = event.target.files[0]
        let reader = new FileReader()
        reader.onload = (event) => {
          this.set_flag = event.target.result
        }
        reader.readAsDataURL(file)
      }
    },
    add() {
      this.additionals.push({ additional: '' })
    },
    remove(index) {
      this.additionals.splice(index, 1)
    },
    selectCounttry(countryId) {
      this.country = countryId
    },
  },
}
</script>
<style scoped lang="scss">
.component-card_1 {
  width: auto;
}
body.dark .office-logo img {
  border: 1px solid #1b2e4b;
}
.office-logo img {
  width: 100px;
  border: 1px solid #bfc9d4;
  border-radius: 5px;
  padding: 5px;
}
.office-logo {
  width: 100%;
  text-align: right;
}
</style>
