<template>
  <div v-if="pendingStatus || isLoading">
    <Loader />
  </div>
  <div v-else class="layout-px-spacing">
    <div id="card_1" class="col-lg-12 layout-spacing layout-top-spacing">
      <div class="statbox widget box box-shadow">
        <div class="widget-content widget-content-area">
          <div class="row mb-4">
            <div class="col-xl-12 col-md-12 col-sm-12 col-12">
              <div class="d-flex align-items-start justify-content-between">
                <h4>{{ country.country && country.country.name }} - Country Information</h4>
                <router-link :to="{ name: 'Countries' }">
                  <button class="btn btn-info mb-2 mr-4 btn-rounded">
                    View Countries
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
                <label for="exampleFormControlInput1">Country</label>
                <h6>{{ country.country && country.country.name }}</h6>
              </div>
            </div>
            <div class="col">
              <div class="form-group mb-4">
                <label for="exampleFormControlInput1">Monthly Living Cost</label>
                <h6>{{ country.monthly_living_cost }}</h6>
              </div>
            </div>
            <div class="col">
              <div class="row d-flex align-items-center">
                <div class="col col-md-8">
                  <div class="form-group mb-4">
                    <img
                      v-if="country.flag"
                      alt="Country Flag"
                      :src="`${baseURL}${country.flag}`"
                      width="100"
                    />

                    <img v-else alt="Country Flag" src="@/assets/img/no-image.png" width="100" />
                  </div>
                </div>
                <div class="col col-md-4"></div>
              </div>
            </div>
          </div>
          <div class="row mb-4">
            <div class="col">
              <div class="form-group mb-4">
                <label for="exampleFormControlTextarea1">Visa Requirements</label>
                <p>{{ country.visa_requirements }}</p>
              </div>
            </div>

            <div class="col">
              <div class="form-group mb-4">
                <label for="exampleFormControlTextarea1">Part Time Work Details</label>
                <p>{{ country.part_time_work }}</p>
              </div>
            </div>
          </div>
          <div class="row mb-4">
            <div class="col">
              <div class="form-group mb-4">
                <label for="exampleFormControlTextarea1">Accommodation Details</label>
                <p>{{ country.accommodation_details }}</p>
              </div>
            </div>
            <div class="col">
              <div class="form-group mb-4">
                <label for="exampleFormControlTextarea1">Country Benifits</label>
                <p>{{ country.country_benifits }}</p>
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
              <h4>Application Process</h4>
              <br />
            </div>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>
<script>
import Loader from '@/components/Loader.vue'
import { mapGetters, mapState } from 'vuex'
import Request from '../apis/Request'
import Notify from '../helpers/Notify'

export default {
  name: 'AddCountry',
  components: { Loader },
  data() {
    return {
      country: {},
      errors: {},
      isLoading: false,
      countryId: '',
    }
  },
  computed: {
    ...mapGetters(['user', 'pendingStatus']),
    ...mapState(['baseURL']),
  },

  mounted() {
    this.getCountry()
  },

  methods: {
    getCountry() {
      let countryId = this.$route.params.slug
      Request.GET_REQ(`/country-details/${countryId}`)
        .then((res) => {
          this.country = res.data
          this.countryId = res.data.id
        })
        .catch((err) => {
          Notify(err.res.data)
        })
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
  border: 1px solid #1b2e4b;
  border-radius: 5px;
  padding: 5px;
}
.office-logo {
  width: 100%;
  text-align: right;
}
input[type='color'] {
  -webkit-appearance: none;
  border: none;
  width: 32px;
  height: 32px;
}
input[type='color']::-webkit-color-swatch-wrapper {
  padding: 0;
}
input[type='color']::-webkit-color-swatch {
  border: none;
}
</style>
