<template>
  <div class="map-loading-wrapper">
    <div v-if="mapLoading" class="map-loading">
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-loader spin mr-2"
        >
          <line x1="12" y1="2" x2="12" y2="6"></line>
          <line x1="12" y1="18" x2="12" y2="22"></line>
          <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
          <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
          <line x1="2" y1="12" x2="6" y2="12"></line>
          <line x1="18" y1="12" x2="22" y2="12"></line>
          <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
          <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
        </svg>
      </span>
    </div>
    <div class="form-group">
      <select
        v-model="country_name"
        class="form-control"
        @change="onChangeCountryData($event.target.value)"
      >
        <option value="" disabled>Search Country</option>
        <option v-for="country in total_countries" :key="country.id" :value="country.id">
          {{ country.country.name }}
        </option>
      </select>
    </div>
    <apexchart width="600" type="polarArea" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script>
import Request from '../../apis/Request'
import Notify from '../../helpers/Notify'
export default {
  data: function () {
    return {
      series: [],
      chartOptions: {
        chart: {
          type: 'polarArea',
        },
        stroke: {
          colors: ['#fff'],
        },
        fill: {
          opacity: 0.9,
          colors: [],
        },
        colors: [],
        labels: [],
      },
      labelsData: [],
      countData: [],
      bgColor: [],
      total_countries: [],
      country_name: '',
      selectcountryId: 1,
      mapLoading: false,
      isChanged: false,
    }
  },
  async created() {
    await this.getCountryData()
    await this.totalCountry()
  },
  methods: {
    getCountryData() {
      this.mapLoading = true
      this.series = []
      this.chartOptions.labels = []
      Request.GET_REQ(`/country-application-leads-reports/${this.selectcountryId}`)
        .then((res) => {
          for (let i = 0; i < res.data.length; i++) {
            const item = res.data[i]
            this.chartOptions.labels.push(item.status_name)
            this.chartOptions.fill.colors.push(item.status_color)
            this.chartOptions.colors.push(item.status_color)
            this.series.push(item.status_leads && item.status_leads.length)
            this.mapLoading = false
          }
        })
        .catch((err) => {
          Notify(err.res.data)
        })
    },
    totalCountry() {
      this.isLoading = true
      Request.GET_REQ('/total-represent-countries')
        .then((res) => {
          this.total_country = res.data.length
          this.total_countries = res.data
          this.isLoading = false
        })
        .catch((err) => {
          this.errors = err.res.data.errors
        })
    },
    async onChangeCountryData(countryId) {
      this.series = []
      this.chartOptions.labels = []
      this.chartOptions.fill.colors = []
      this.chartOptions.colors = []
      this.selectcountryId = countryId
      this.mapLoading = true
      await Request.GET_REQ(`/country-application-leads-reports/${this.selectcountryId}`)
        .then((res) => {
          for (let i = 0; i < res.data.length; i++) {
            const item = res.data[i]
            this.chartOptions.labels.push(item.status_name)
            this.chartOptions.fill.colors.push(item.status_color)
            this.chartOptions.colors.push(item.status_color)
            this.series.push(item.status_leads.length)
          }
          this.chartOptions = {
            ...this.chartOptions,
            ...{
              chart: {
                type: 'polarArea',
              },
            },
          }
          this.mapLoading = false
        })
        .catch((err) => {
          Notify(err.res.data)
        })
    },
  },
}
</script>

<style lang="scss">
.map-loading {
  position: absolute;
  background: #fdfdfe;
  width: 100%;
  height: 100%;
  z-index: 1;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
