<template>
  <div class="layout-px-spacing">
    <form enctype="multipart/form-data" @submit.prevent="handleUpdate">
      <div id="card_1" class="col-lg-12 layout-spacing layout-top-spacing">
        <div class="statbox widget box box-shadow">
          <div class="widget-content widget-content-area">
            <div class="row mb-4">
              <div
                v-if="user.user_type == 'superAdmin' || user.user_type == 'branchManager'"
                class="col-xl-12 col-md-12 col-sm-12 col-12"
              >
                <div class="d-flex align-items-start justify-content-between">
                  <h4>Edit Agent Information</h4>
                  <router-link :to="{ name: 'Agents' }">
                    <button class="btn btn-info mb-2 mr-4 btn-rounded inline-flex">
                      View Agent
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
              <div v-if="user.user_type == 'superAdmin'" class="col">
                <div class="form-group mb-4">
                  <label for="exampleFormControlInput1">Agent for Branch</label>
                  <select
                    v-model="branch_id"
                    class="form-control"
                    @change="selectBranch($event.target.value)"
                  >
                    <option disabled value="">Select a Branch</option>
                    <option v-for="branch in branches" :key="branch.id" :value="branch.id">
                      {{ branch.branch_name }}
                    </option>
                  </select>
                  <small v-if="errors.branch_id" id="sh-text1" class="form-text text-danger">{{
                    errors.branch_id[0]
                  }}</small>
                </div>
              </div>
              <div class="col">
                <div class="form-group mb-4">
                  <label for="exampleFormControlInput1">Company Name</label>
                  <input v-model="agent_name" type="text" class="form-control" />
                  <small v-if="errors.agent_name" id="sh-text1" class="form-text text-danger">{{
                    errors.agent_name[0]
                  }}</small>
                </div>
              </div>
              <div class="col">
                <div class="form-group mb-4">
                  <label for="exampleFormControlInput1">Phone</label>
                  <input v-model="agent_phone" type="text" class="form-control" />
                  <small v-if="errors.agent_phone" id="sh-text1" class="form-text text-danger">{{
                    errors.agent_phone[0]
                  }}</small>
                </div>
              </div>
              <div class="col">
                <div class="form-group mb-4">
                  <label for="exampleFormControlInput1">Email</label>
                  <input v-model="agent_email" type="email" class="form-control" />
                  <small v-if="errors.agent_email" id="sh-text1" class="form-text text-danger">{{
                    errors.agent_email[0]
                  }}</small>
                </div>
              </div>
            </div>
            <div class="row mb-4">
              <div class="col">
                <div class="form-group mb-4">
                  <label for="exampleFormControlInput1">Country</label>
                  <select v-model="country" class="form-control">
                    <option disabled value="">Select Country</option>
                    <option v-for="countri in countries" :key="countri.id" :value="countri.id">
                      {{ countri.name }}
                    </option>
                  </select>
                  <small v-if="errors.country" id="sh-text1" class="form-text text-danger">{{
                    errors.country[0]
                  }}</small>
                </div>
              </div>

              <div class="col">
                <div class="form-group mb-4">
                  <label for="exampleFormControlInput1">City</label>
                  <input v-model="city" type="text" class="form-control" />
                  <small v-if="errors.city" id="sh-text1" class="form-text text-danger">{{
                    errors.city[0]
                  }}</small>
                </div>
              </div>
              <div class="col">
                <div class="form-group mb-4">
                  <label for="exampleFormControlInput1">State</label>
                  <input v-model="state" type="text" class="form-control" />
                  <small v-if="errors.state" id="sh-text1" class="form-text text-danger">{{
                    errors.state[0]
                  }}</small>
                </div>
              </div>
            </div>
            <div class="row mb-4 d-flex align-items-center">
              <div class="col col-md-6">
                <div class="form-group mb-4">
                  <label for="exampleFormControlTextarea1">Address in Details</label>
                  <textarea
                    id="exampleFormControlTextarea1"
                    v-model="address"
                    class="form-control"
                    rows="3"
                    spellcheck="false"
                  ></textarea>
                  <small v-if="errors.address" id="sh-text1" class="form-text text-danger">{{
                    errors.address[0]
                  }}</small>
                </div>
              </div>
              <div class="col col-md-2">
                <label for="exampleFormControlTextarea1">Set a Color</label>
                <input v-model="agent_bg_color" style="cursor: pointer" type="color" class="ml-3" />
                <small v-if="errors.agent_bg_color" id="sh-text1" class="form-text text-danger">{{
                  errors.agent_bg_color[0]
                }}</small>
              </div>
              <div class="col col-md-4">
                <div class="row d-flex align-items-center">
                  <div class="col col-md-8">
                    <div class="form-group mb-4">
                      <label>Upload Agent Picture</label>
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
                    <div v-if="logo" class="office-logo">
                      <img alt="agent Logo" :src="baseURL + logo" />
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
                <h4>Agent Information</h4>
                <br />
              </div>
              <div class="col">
                <div class="form-group mb-4">
                  <label for="personName">Person Name</label>
                  <input id="personName" v-model="person_name" type="text" class="form-control" />
                  <small v-if="errors.person_name" id="sh-text1" class="form-text text-danger">{{
                    errors.person_name[0]
                  }}</small>
                </div>
              </div>
              <div class="col">
                <div class="form-group mb-4">
                  <label for="exampleFormControlInput1">Phone</label>
                  <input v-model="person_phone" type="text" class="form-control" />
                  <small v-if="errors.agent_phone" id="sh-text1" class="form-text text-danger">{{
                    errors.agent_phone[0]
                  }}</small>
                </div>
              </div>
              <div class="col">
                <div class="form-group mb-4">
                  <label for="exampleFormControlInput1">Email</label>
                  <input v-model="person_email" type="email" class="form-control" />
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
                  <input v-model="alternative_contact" type="text" class="form-control" />
                  <small
                    v-if="errors.alternative_contact"
                    id="sh-text1"
                    class="form-text text-danger"
                    >{{ errors.alternative_contact[0] }}</small
                  >
                </div>
              </div>

              <div class="col">
                <div class="form-group mb-4">
                  <label for="exampleFormControlInput1">NID or Passport Number</label>
                  <input v-model="nid_or_passport" type="text" class="form-control" />
                  <small
                    v-if="errors.nid_or_passport"
                    id="sh-text1"
                    class="form-text text-danger"
                    >{{ errors.nid_or_passport[0] }}</small
                  >
                </div>
              </div>
              <div class="col">
                <div class="form-group mb-4">
                  <label for="exampleFormControlInput1">Nationality</label>
                  <input v-model="nationality" type="text" class="form-control" />
                  <small v-if="errors.nationality" id="sh-text1" class="form-text text-danger">{{
                    errors.nationality[0]
                  }}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div id="card_1" class="col-lg-12 layout-spacing layout-top-spacing">
        <div class="statbox widget box box-shadow">
          <div class="widget-content widget-content-area">
            <div class="row mb-4">
              <div class="col-xl-12 col-md-12 col-sm-12 col-12">
                <h4>Agent Login Information</h4>
                <br />
              </div>
              <div class="col">
                <div class="form-group mb-4">
                  <label for="personName">Person Name</label>
                  <input
                    id="personName"
                    v-model="name"
                    type="text"
                    class="form-control"
                  />
                  <small
                    v-if="errors.name"
                    id="sh-text1"
                    class="form-text text-danger"
                    >{{ errors.name[0] }}</small
                  >
                </div>
              </div>
              <div class="col">
                <div class="form-group mb-4">
                  <label for="email">Email</label>
                  <input v-model="email" type="email" class="form-control" />
                  <small
                    v-if="errors.email"
                    id="sh-text1"
                    class="form-text text-danger"
                    >{{ errors.email[0] }}</small
                  >
                </div>
              </div>
              <div class="col">
                <div class="form-group mb-4">
                  <label for="password">Password</label>
                  <input
                    v-model="password"
                    type="password"
                    class="form-control"
                  />
                  <small
                    v-if="errors.password"
                    id="sh-text1"
                    class="form-text text-danger"
                    >{{ errors.password[0] }}</small
                  >
                </div>
              </div>

              <div class="col">
                <div class="form-group mb-4">
                  <label for="password">Confirm Password</label>
                  <input
                    v-model="password_confirmation"
                    type="password"
                    class="form-control"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> -->

      <div id="card_1" class="col-lg-12 layout-spacing layout-top-spacing">
        <div class="statbox widget box box-shadow">
          <div class="widget-content widget-content-area">
            <div class="row">
              <div class="col text-right">
                <div class="row">
                  <div class="col">
                    <router-link :to="{ name: 'Agents' }">
                      <button type="submit" class="btn btn-warning mr-2 btn-lg">Cancel</button>
                    </router-link>
                    <button type="submit" class="btn btn-primary mr-2 btn-lg">Submit</button>
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
import Request from '../../apis/Request'
import baseURL from '../../apis/baseURL'

export default {
  name: 'AddAgent',
  components: { Loader },
  data() {
    return {
      agent_id: '',
      branch_id: '',
      agent_name: '',
      agent_phone: '',
      agent_email: '',
      country: '',
      city: '',
      state: '',
      address: '',
      agent_bg_color: '#e2a03f',
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
      countries: [],
      additionals: [
        {
          additional: '',
        },
      ],

      errors: {},
      isLoading: false,
      branches: [],
      check_agent_id: '',
    }
  },
  computed: {
    ...mapGetters(['user', 'pendingStatus']),
    ...mapState(['baseURL']),
  },

  async mounted() {
    this.isLoading = true
    this.$store.dispatch('baseurl', baseURL.baseURL)
    let slug = this.$route.params.slug
    await Request.GET_REQ(`/agent/${slug}`)
      .then((res) => {
        this.check_agent_id = res.data.id
      })
      .catch((err) => {
        Notify(err.res.data)
      })

    if (
      this.user.user_type === 'superAdmin' ||
      this.user.user_type === 'branchManager' ||
      this.user.agent_id == this.check_agent_id
    ) {
      this.getAgent()
      Request.GET_REQ('/branches')
        .then((res) => {
          this.branches = res.data
          this.isLoading = false
        })
        .catch((err) => {
          this.errors = err.res.data.errors
        })
      Request.GET_REQ('/countries').then((res) => {
        this.countries = res.data
      })
    } else {
      this.$router.push({ name: 'NotFound' })
    }
  },

  methods: {
    getAgent() {
      let slug = this.$route.params.slug
      Request.GET_REQ(`/agent/${slug}`)
        .then((res) => {
          this.agent_id = res.data.id
          this.address = res.data.address
          this.alternative_contact = res.data.alternative_contact
          this.branch_id = res.data.branch_id
          this.city = res.data.city
          this.country = res.data.country
          this.agent_bg_color = res.data.agent_bg_color
          this.agent_email = res.data.agent_email
          this.agent_name = res.data.agent_name
          this.agent_phone = res.data.agent_phone
          this.nationality = res.data.nationality
          this.nid_or_passport = res.data.nid_or_passport
          this.person_email = res.data.person_email
          this.person_name = res.data.person_name
          this.person_phone = res.data.person_phone
          this.additionals = res.data.additionals
          this.state = res.data.state
          this.logo = res.data.logo
        })
        .catch((err) => {
          this.errors = err.res.data.errors
        })
    },
    handleUpdate() {
      this.isLoading = true
      let user = this.$store.state.user
      let slug = this.$route.params.slug
      let data = {
        branch_id: this.branch_id || user.branch_id,
        agent_name: this.agent_name,
        agent_id: this.agent_id,
        agent_phone: this.agent_phone,
        agent_email: this.agent_email,
        country: this.country,
        city: this.city,
        state: this.state,
        address: this.address,
        agent_bg_color: this.agent_bg_color,
        person_name: this.person_name,
        person_phone: this.person_phone,
        person_email: this.person_email,
        alternative_contact: this.alternative_contact,
        nid_or_passport: this.nid_or_passport,
        nationality: this.nationality,
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.password_confirmation,
        logo: this.logo,
        additionals: this.additionals,
      }

      Request.POST_REQ(data, `/update-agent/${slug}`)
        .then(() => {
          this.isLoading = false
          // this.resetForm();
          this.$store.dispatch('baseurl', baseURL.baseURL)
          this.$router.push({ name: 'Agents' })
          Notify.success('The Agent Successfully Created')
        })
        .catch((err) => {
          this.errors = err.response.data.errors
          this.isLoading = false

          Notify.error(this.errors.branch_id && this.errors.branch_id[0])
          Notify.error(this.errors.agent_email && this.errors.agent_email[0])
          Notify.error(this.errors.agent_name && this.errors.agent_name[0])
          Notify.error(this.errors.agent_phone && this.errors.agent_phone[0])
          Notify.error(this.errors.city && this.errors.city[0])
          Notify.error(this.errors.country && this.errors.country[0])
          Notify.error(this.errors.address && this.errors.address[0])
          Notify.error(this.errors.agent_bg_color && this.errors.agent_bg_color[0])
          Notify.error(this.errors.state && this.errors.state[0])
          Notify.error(this.errors.nationality && this.errors.nationality[0])
          Notify.error(this.errors.nid_or_passport && this.errors.nid_or_passport[0])
          Notify.error(this.errors.logo && this.errors.logo[0])
          Notify.error(this.errors.person_email && this.errors.person_email[0])
          Notify.error(this.errors.person_name && this.errors.person_name[0])
          Notify.error(this.errors.person_phone && this.errors.person_phone[0])
          Notify.error(this.errors.alternative_contact && this.errors.alternative_contact[0])
          Notify.error(this.errors.email && this.errors.email[0])
          Notify.error(this.errors.name && this.errors.name[0])
          Notify.error(this.errors.password && this.errors.password[0])
        })
    },
    onFileChange(event) {
      this.$store.dispatch('baseurl', '')
      this.logo = null
      let file = event.target.files[0]
      if (file.size > 1048770) {
        Notify.warning('File is not bigger than 2 MB')
      } else {
        let reader = new FileReader()
        reader.onload = (event) => {
          this.logo = event.target.result
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
    selectBranch(val) {
      this.branch_id = Number(val)
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
