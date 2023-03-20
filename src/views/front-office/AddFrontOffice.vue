<template>
  <div class="layout-px-spacing">
    <form enctype="multipart/form-data" @submit.prevent="handleSubmit">
      <div id="card_1" class="col-lg-12 layout-spacing layout-top-spacing">
        <div class="statbox widget box box-shadow">
          <div class="widget-content widget-content-area">
            <div class="row mb-4">
              <div class="col-xl-12 col-md-12 col-sm-12 col-12">
                <div class="d-flex align-items-start justify-content-between">
                  <h4>Front Office Information</h4>
                  <router-link :to="{ name: 'Front_Offices' }">
                    <button class="btn btn-info btn-rounded mb-2 mr-4 inline-flex">
                      View Front Office
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
                  <label for="exampleFormControlInput1">Front Office for Branch</label>
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
                  <label for="exampleFormControlInput1">Front Office Name</label>
                  <input v-model="front_office_name" type="text" class="form-control" />
                  <small
                    v-if="errors.front_office_name"
                    id="sh-text1"
                    class="form-text text-danger"
                    >{{ errors.front_office_name[0] }}</small
                  >
                </div>
              </div>
              <div class="col">
                <div class="form-group mb-4">
                  <label for="exampleFormControlInput1">Phone</label>
                  <input v-model="front_office_phone" type="text" class="form-control" />
                  <small
                    v-if="errors.front_office_phone"
                    id="sh-text1"
                    class="form-text text-danger"
                    >{{ errors.front_office_phone[0] }}</small
                  >
                </div>
              </div>
              <div class="col">
                <div class="form-group mb-4">
                  <label for="exampleFormControlInput1">Email</label>
                  <input v-model="front_office_email" type="email" class="form-control" />
                  <small
                    v-if="errors.front_office_email"
                    id="sh-text1"
                    class="form-text text-danger"
                    >{{ errors.front_office_email[0] }}</small
                  >
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
            <div class="row d-flex align-items-center mb-4">
              <div class="col col-md-6">
                <div class="form-group mb-4">
                  <label for="address">Address in Details</label>
                  <textarea
                    id="address"
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
                <label for="front_office_bg_color">Set a Color</label>
                <input
                  v-model="front_office_bg_color"
                  style="cursor: pointer"
                  type="color"
                  class="ml-3"
                />
                <small
                  v-if="errors.front_office_bg_color"
                  id="sh-text1"
                  class="form-text text-danger"
                  >{{ errors.front_office_bg_color[0] }}</small
                >
              </div>
              <div class="col col-md-4">
                <div class="row d-flex align-items-center">
                  <div class="col col-md-8">
                    <div class="form-group mb-4">
                      <label>Upload Front Officer Picture</label>
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
                      <img alt="front_office Logo" :src="logo" />
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
                  class="form-group d-flex align-items-center align-self-center mb-4"
                >
                  <div class="col col-md-8 pl-0">
                    <label for="exampleFormControlTextarea1">Additional Information</label>
                    <textarea
                      id="input.additional"
                      v-model="input.additional"
                      class="form-control"
                      rows="3"
                      spellcheck="false"
                    ></textarea>
                  </div>
                  <div class="row ml-4">
                    <div v-show="index == additionals.length - 1">
                      <button
                        class="btn btn-warning btn-rounded mb-2 mr-2 inline-flex"
                        @click.prevent="add"
                      >
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
                      <button class="btn btn-danger btn-rounded mb-2 mr-2" @click.prevent="remove">
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
                <h4>Front Officer Information</h4>
                <br />
              </div>
              <div class="col">
                <div class="form-group mb-4">
                  <label for="officer.personName">Person Name</label>
                  <input
                    id="officer.personName"
                    v-model="person_name"
                    type="text"
                    class="form-control"
                  />
                  <small v-if="errors.person_name" id="sh-text1" class="form-text text-danger">{{
                    errors.person_name[0]
                  }}</small>
                </div>
              </div>
              <div class="col">
                <div class="form-group mb-4">
                  <label for="exampleFormControlInput1">Phone</label>
                  <input v-model="person_phone" type="text" class="form-control" />
                  <small
                    v-if="errors.front_office_phone"
                    id="sh-text1"
                    class="form-text text-danger"
                    >{{ errors.front_office_phone[0] }}</small
                  >
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
      <div id="card_1" class="col-lg-12 layout-spacing layout-top-spacing">
        <div class="statbox widget box box-shadow">
          <div class="widget-content widget-content-area">
            <div class="row mb-4">
              <div class="col-xl-12 col-md-12 col-sm-12 col-12">
                <h4>Front Office Login Information</h4>
                <br />
              </div>
              <div class="col">
                <div class="form-group mb-4">
                  <label for="personName">Person Name</label>
                  <input id="personName" v-model="name" type="text" class="form-control" />
                  <small v-if="errors.name" id="sh-text1" class="form-text text-danger">{{
                    errors.name[0]
                  }}</small>
                </div>
              </div>
              <div class="col">
                <div class="form-group mb-4">
                  <label for="email">Email</label>
                  <input v-model="email" type="email" class="form-control" />
                  <small v-if="errors.email" id="sh-text1" class="form-text text-danger">{{
                    errors.email[0]
                  }}</small>
                </div>
              </div>
              <div class="col">
                <div class="form-group mb-4">
                  <label for="password">Password</label>
                  <input v-model="password" type="password" class="form-control" />
                  <small v-if="errors.password" id="sh-text1" class="form-text text-danger">{{
                    errors.password[0]
                  }}</small>
                </div>
              </div>

              <div class="col">
                <div class="form-group mb-4">
                  <label for="password">Confirm Password</label>
                  <input v-model="password_confirmation" type="password" class="form-control" />
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
                    <router-link :to="{ name: 'Add_Front_Office' }">
                      <button type="submit" class="btn btn-warning btn-lg mr-2">Cancel</button>
                    </router-link>
                    <button type="submit" class="btn btn-primary btn-lg mr-2">Submit</button>
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
<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Notify from '../../helpers/Notify'
import Request from '../../apis/Request'

const store = useStore()
const router = useRouter()
const user = computed(() => store.getters.user)

const branch_id = ref('')
const front_office_name = ref('')
const front_office_phone = ref('')
const front_office_email = ref('')
const country = ref('')
const city = ref('')
const state = ref('')
const address = ref('')
const front_office_bg_color = ref('#e2a03f')
const person_name = ref('')
const person_phone = ref('')
const person_email = ref('')
const alternative_contact = ref('')
const nid_or_passport = ref('')
const nationality = ref('')
const name = ref('')
const email = ref('')
const password = ref('')
const password_confirmation = ref('')
const logo = ref('')
const countries = ref([])
const additionals = ref([
  {
    additional: '',
  },
])

const errors = ref({})
const isLoading = ref(false)
const branches = ref([])

//methods
async function fetchPrimary() {
  await store.dispatch('user')
  try {
    const res = await Request.GET_REQ('/branches')
    branches.value = res.data
    isLoading.value = false
  } catch (error) {
    errors.value = error.res.data.errors
  }

  try {
    const res = await Request.GET_REQ('/countries')
    countries.value = res.data
  } catch (error) {
    errors.value = error.res.data.errors
  }
}

function handleSubmit() {
  isLoading.value = true
  // let user = $store.state.user;

  let data = {
    branch_id: branch_id.value || user.value.branch_id,
    front_office_name: front_office_name.value,
    front_office_phone: front_office_phone.value,
    front_office_email: front_office_email.value,
    country: country.value,
    city: city.value,
    state: state.value,
    address: address.value,
    front_office_bg_color: front_office_bg_color.value,
    person_name: person_name.value,
    person_phone: person_phone.value,
    person_email: person_email.value,
    alternative_contact: alternative_contact.value,
    nid_or_passport: nid_or_passport.value,
    nationality: nationality.value,
    name: name.value,
    email: email.value,
    password: password.value,
    password_confirmation: password_confirmation.value,
    logo: logo.value,
    additionals: additionals.value,
  }

  Request.POST_REQ(data, '/add-front-office')
    .then(() => {
      isLoading.value = false
      // resetForm();
      router.push({ name: 'Front_Offices' })
      Notify.success('The front office Successfully Created')
    })
    .catch((err) => {
      errors.value = err.response.data.errors
      isLoading.value = false

      Notify.error(errors.value.branch_id && errors.value.branch_id[0])
      Notify.error(errors.value.front_office_email && errors.value.front_office_email[0])
      Notify.error(errors.value.front_office_name && errors.value.front_office_name[0])
      Notify.error(errors.value.front_office_phone && errors.value.front_office_phone[0])
      Notify.error(errors.value.city && errors.value.city[0])
      Notify.error(errors.value.country && errors.value.country[0])
      Notify.error(errors.value.address && errors.value.address[0])
      Notify.error(errors.value.front_office_bg_color && errors.value.front_office_bg_color[0])
      Notify.error(errors.value.state && errors.value.state[0])
      Notify.error(errors.value.nationality && errors.value.nationality[0])
      Notify.error(errors.value.nid_or_passport && errors.value.nid_or_passport[0])
      Notify.error(errors.value.logo && errors.value.logo[0])
      Notify.error(errors.value.person_email && errors.value.person_email[0])
      Notify.error(errors.value.person_name && errors.value.person_name[0])
      Notify.error(errors.value.person_phone && errors.value.person_phone[0])
      Notify.error(errors.value.alternative_contact && errors.value.alternative_contact[0])
      Notify.error(errors.value.email && errors.value.email[0])
      Notify.error(errors.value.name && errors.value.name[0])
      Notify.error(errors.value.password && errors.value.password[0])
    })
}
function onFileChange(event) {
  let file = event.target.files[0]
  if (file.size > 1048770) {
    Notify.warning('file is bigger than 2mb')
  } else {
    let reader = new FileReader()
    reader.onload = (event) => {
      logo.value = event.target.result
    }
    reader.readAsDataURL(file)
  }
}
function add() {
  additionals.value.push({ additional: '' })
}
function remove(index) {
  additionals.value.splice(index, 1)
}
function selectBranch(val) {
  branch_id.value = Number(val)
}

await fetchPrimary()
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
