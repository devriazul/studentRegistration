<template>
  <div class="layout-px-spacing">
    <form enctype="multipart/form-data" @submit.prevent="handleSubmit">
      <div id="card_1" class="col-lg-12 layout-spacing layout-top-spacing">
        <div class="statbox widget box box-shadow">
          <div class="widget-content widget-content-area">
            <div class="row mb-4">
              <div class="col-xl-12 col-md-12 col-sm-12 col-12">
                <div class="d-flex align-items-start justify-content-between">
                  <h4>Counselor Information</h4>
                  <router-link :to="{ name: 'Counselors' }">
                    <button class="btn btn-info btn-rounded mb-2 mr-4 inline-flex items-center">
                      View Counselors
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
                  <label for="exampleFormControlInput1">Couselor for Branch</label>
                  <select v-model="branch_id" class="form-control">
                    <option disabled value="">Select a Branch</option>
                    <option v-for="branch in branches" :key="branch.id" :value="branch.id">
                      {{ branch.branch_name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col">
                <div class="form-group mb-4">
                  <label for="exampleFormControlInput1">Counselor Name</label>
                  <input v-model="counselor_name" type="text" class="form-control" />
                  <small v-if="errors.counselor_name" id="sh-text1" class="form-text text-danger">{{
                    errors.counselor_name[0]
                  }}</small>
                </div>
              </div>
              <div class="col">
                <div class="form-group mb-4">
                  <label for="exampleFormControlInput1">Counselor Phone</label>
                  <input v-model="counselor_phone" type="text" class="form-control" />
                  <small
                    v-if="errors.counselor_phone"
                    id="sh-text1"
                    class="form-text text-danger"
                    >{{ errors.counselor_phone[0] }}</small
                  >
                </div>
              </div>
              <div class="col">
                <div class="form-group mb-4">
                  <label for="exampleFormControlInput1">Counselor Email</label>
                  <input v-model="counselor_email" type="email" class="form-control" />
                  <small
                    v-if="errors.counselor_email"
                    id="sh-text1"
                    class="form-text text-danger"
                    >{{ errors.counselor_email[0] }}</small
                  >
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
                  <label for="exampleFormControlInput1">National ID or Passport</label>
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
            <div class="row mb-4">
              <div class="col col-md-8">
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
              <div class="col col-md-4">
                <div class="row d-flex align-items-center">
                  <div class="col col-md-8">
                    <div class="form-group mb-4">
                      <label>Upload Counselor Photo</label>
                      <label class="custom-file-container__custom-file">
                        <input
                          type="file"
                          class="form-control-file"
                          accept="image/*"
                          @change="onFileChange"
                        />
                      </label>
                      <small v-if="errors.photo" id="sh-text1" class="form-text text-danger">{{
                        errors.photo[0]
                      }}</small>
                      <div class="custom-file-container__image-preview"></div>
                    </div>
                  </div>
                  <div class="col col-md-4">
                    <div v-if="photo" class="office-photo">
                      <img alt="Counselor photo" :src="photo" />
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
                <h4>Counselor Login Information</h4>
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
                    <button type="button" class="btn btn-warning btn-lg mr-2">Cancel</button>

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
const counselor_name = ref('')
const counselor_phone = ref('')
const counselor_email = ref('')
const country = ref('')
const city = ref('')
const state = ref('')
const address = ref('')
const alternative_contact = ref('')
const nid_or_passport = ref('')
const nationality = ref('')
const name = ref('')
const email = ref('')
const password = ref('')
const password_confirmation = ref('')
const photo = ref('')
const errors = ref({})
const isLoading = ref(false)
const countries = ref([])
const branches = ref([])

//methods
async function fetchPrimary() {
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
  let data = {
    branch_id: branch_id.value || user.value.branch_id,
    counselor_name: counselor_name.value,
    counselor_phone: counselor_phone.value,
    counselor_email: counselor_email.value,
    country: country.value,
    city: city.value,
    state: state.value,
    address: address.value,
    alternative_contact: alternative_contact.value,
    nid_or_passport: nid_or_passport.value,
    nationality: nationality.value,
    name: name.value,
    email: email.value,
    password: password.value,
    password_confirmation: password_confirmation.value,
    photo: photo.value,
  }
  Request.POST_REQ(data, '/add-counselor')
    .then(() => {
      isLoading.value = false
      // resetForm();
      router.push({ name: 'Counselors' })
      Notify.success('The Counselor Successfully Created')
    })
    .catch((err) => {
      errors.value = err.response.data.errors
      isLoading.value = false

      if (errors.value) {
        Notify.error(errors.value.counselor_email && errors.value.counselor_email[0])
        Notify.error(errors.value.counselor_name && errors.value.counselor_name[0])
        Notify.error(errors.value.counselor_phone && errors.value.counselor_phone[0])
        Notify.error(errors.value.city && errors.value.city[0])
        Notify.error(errors.value.country && errors.value.country[0])
        Notify.error(errors.value.address && errors.value.address[0])
        Notify.error(errors.value.state && errors.value.state[0])
        Notify.error(errors.value.nationality && errors.value.nationality[0])
        Notify.error(errors.value.nid_or_passport && errors.value.nid_or_passport[0])
        Notify.error(errors.value.photo && errors.value.photo[0])
        Notify.error(errors.value.alternative_contact && errors.value.alternative_contact[0])
        Notify.error(errors.value.email && errors.value.email[0])
        Notify.error(errors.value.name && errors.value.name[0])
        Notify.error(errors.value.password && errors.value.password[0])
      }
    })
}
function onFileChange(event) {
  let file = event.target.files[0]
  if (file.size > 1048770) {
    Notify.warning('File size not bigger than 2MB')
  } else {
    let reader = new FileReader()
    reader.onload = (event) => {
      photo.value = event.target.result
    }
    reader.readAsDataURL(file)
  }
}

await fetchPrimary()
</script>
<style scoped lang="scss">
.component-card_1 {
  width: auto;
}
body.dark .office-photo img {
  border: 1px solid #1b2e4b;
}
.office-photo img {
  width: 100px;
  border: 1px solid #bfc9d4;
  border-radius: 5px;
  padding: 5px;
}
.office-photo {
  width: 100%;
  text-align: right;
}
</style>
