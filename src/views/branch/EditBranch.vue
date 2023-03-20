<template>
  <div class="layout-px-spacing">
    <form enctype="multipart/form-data" @submit.prevent="handleUpdate">
      <div id="card_1" class="col-lg-12 layout-spacing layout-top-spacing">
        <div class="statbox widget box box-shadow">
          <div class="widget-content widget-content-area">
            <div class="row mb-4">
              <div class="col-xl-12 col-md-12 col-sm-12 col-12">
                <div class="d-flex align-items-start justify-content-between">
                  <h4>Edit Branch Information</h4>
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
            <div class="row mb-4 align-items-center">
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
                      <div class="custom-file-container__image-preview"></div>
                    </div>
                  </div>
                  <div class="col col-md-4">
                    <div v-if="get_flag" class="office-logo">
                      <img alt="Branch Logo" :src="baseURL +'/'+ get_flag" />
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
                      v-model="input.additional_info"
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
                <h4>Edit Branch Manager Information</h4>
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
                    <div v-if="get_logo" class="office-logo">
                      <img alt="Branch Logo" :src="site_url + get_logo" />
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
            <div class="row">
              <div class="col text-right">
                <div class="row">
                  <div class="col">
                    <button type="button" class="btn btn-warning mr-2 btn-lg">Cancel</button>
                    <button :disabled="isPending || v$.$invalid" class="btn btn-primary btn-lg mr-2">
                      <span v-if="!isPending">Update</span>
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
import { mapGetters, mapState } from 'vuex'
import Notify from '../../helpers/Notify'
import baseURL from '../../apis/baseURL'
import Request from '../../apis/Request'
import { ref,computed,reactive } from 'vue'
import { useStore } from 'vuex'
import useVuelidate from '@vuelidate/core';
import { required, alpha, email, maxLength, minLength, helpers, sameAs, numeric  } from '@vuelidate/validators';

export default {
  name: 'AddBranch',
  components: { Loader },

  data() {
    return {
      logo: '',
      flag: '',
      get_logo:'',
      get_flag:'',
      branch_id:'',
      additionals: [
        {
          additional_info: '',
        },
      ],
      errors: {},
      isLoading: false,
      countries: [],
      check_branch_id: '',
      isPending:false,
    }
  },
  setup(){
    const store = useStore()
    const baseURL = ref(store.state.baseURL)
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
    })
    const rules = computed(() =>{
      return {
          branch_name: {
            required: helpers.withMessage("Branch Name Is Requires!", required),
          },
          branch_phone: {
            required: helpers.withMessage("Branch Phone Is Requires!", required),
            numeric: helpers.withMessage("Branch Phone Must be Number!", numeric),
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
              numeric: helpers.withMessage("Person Phone Must be Number!", numeric),
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
    ...mapState(['baseURL']),
  },

  async mounted() {
    this.isLoading = true
    let slug = this.$route.params.slug
    await this.$store.dispatch('baseurl', baseURL.baseURL)

    await Request.GET_REQ(`/edit-branch/${slug}`)
      .then((res) => {
        this.check_branch_id = res.data.id
      })
      .catch((err) => {
        Notify(err.res.data)
      })

    if (this.user.user_type === 'superAdmin' || this.user.branch_id == this.check_branch_id) {
      Request.GET_REQ('/get-all-countries').then((res) => {
        this.countries = res.data
      })

      Request.GET_REQ(`/edit-branch/${slug}`)
        .then((res) => {
          this.isLoading = false
          ;(this.branch_id = res.data.id),
            (this.stateset.branch_name = res.data.branch_name),
            (this.stateset.branch_phone = res.data.branch_phone),
            (this.stateset.branch_email = res.data.branch_email),
            (this.stateset.country = res.data.country),
            (this.stateset.city = res.data.city),
            (this.stateset.state = res.data.state),
            (this.stateset.address = res.data.address),
            (this.stateset.branch_bg_color = res.data.branch_bg_color),
            (this.stateset.person_name = res.data.person_name),
            (this.stateset.person_phone = res.data.person_phone),
            (this.stateset.person_email = res.data.person_email),
            (this.stateset.alternative_contact = res.data.alternative_contact),
            (this.stateset.nid_or_passport = res.data.nid_or_passport),
            (this.stateset.nationality = res.data.nationality),
            (this.get_logo = res.data.logo),
            (this.get_flag = res.data.flag)
          this.additionals = res.data.branch_additional_info
        })
        .catch((err) => {
          this.isLoading = false
          Notify(err.res.data)
        })
    } else {
      this.$router.push({ name: 'Branches' })
    }
  },

  methods: {
    handleUpdate() {
      let slug = this.$route.params.slug
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
      data.append('logo',this.logo)
      data.append('flag',this.flag)
      data.append('additionals',JSON.stringify(this.additionals))
      
      Request.POST_REQ(data, `/update-branch/${slug}`)
        .then(() => {
          this.isLoading = false
          this.isPending = false
          this.$store.dispatch('baseurl', baseURL.baseURL)
          this.$router.push({ name: 'Branches' })
          Notify.success('The Branch Successfully Updated')
        })
        .catch((err) => {
          console.log(err)
          this.errors = err.response.data.errors
          this.isLoading = false
          this.isPending = false
          this.$externalResults = err.response.data.errors
          window.scrollTo(0, 0)
          Notify.error(this.errors.branch_email && this.errors.branch_email[0])
          Notify.error(this.errors.branch_bg_color && this.errors.branch_bg_color[0])
          Notify.error(this.errors.person_email && this.errors.person_email[0])
          Notify.error(this.errors.email && this.errors.email[0])
        })
    },
    onFileChange(event) {
      this.$store.dispatch('baseurl', '')
      this.logo = null
      let file = event.target.files[0]
      if (file.size > 1048770) {
        Notify.warning('File should less than 2mb')
      } else {
        this.logo = event.target.files[0]
      }
    },
    onFileChangeFlag(event) {
      this.$store.dispatch('', '')
      const file = event.target.files[0]
      if (file.size > 1048770) {
        Notify.warning('File size not bigger than 2 MB')
      }else{
        this.flag = event.target.files[0]
      }
    },
    add() {
      this.additionals.push({ additional_info: '' })
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
