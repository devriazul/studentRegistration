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
          {{ country.country?.name }}
        </option>
      </select>
    </div>
    <apexchart width="600" type="polarArea" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>
<script setup>
import { ref, computed, watch, toRefs } from 'vue'
import { useStore } from 'vuex'
import Request from '@/apis/Request'
import Notify from '../../../helpers/Notify'

const store = useStore()
const user = computed(() => store.getters.user)
const props = defineProps({
  themeModeData: {
    type: Boolean,
    required: true,
  },
})

const { themeModeData } = toRefs(props)
const series = ref([])
const chartOptions = ref({
  chart: {
    type: 'polarArea',
  },
  stroke: {
    colors: ['#ddd'],
  },
  yaxis: {
    show: false,
  },
  fill: {
    opacity: 0.8,
    type: 'gradient',
    colors: [],
  },
  colors: [],
  labels: [],
  legend: {
    labels: {
      colors: themeModeData.value ? '#ebedf2' : '#3b3f5c',
    },
  },
})

const total_countries = ref([])
const total_country = ref(0)
const country_name = ref('')
const selectcountryId = ref(1)
const mapLoading = ref(false)
const isLoading = ref(false)
const errors = ref({})

watch(themeModeData, () => {
  chartOptions.value = {
    ...chartOptions.value,
    ...{
      chart: {
        type: 'polarArea',
      },
      legend: {
        labels: {
          colors: themeModeData.value ? '#ebedf2' : '#3b3f5c',
        },
      },
    },
  }
})

//methods
async function getCountryData() {
  const branchId = user.value.branch_id
  mapLoading.value = true
  series.value = []
  chartOptions.value.labels = []
  try {
    const res = await Request.GET_REQ(
      `/country-application-branch-leads-reports/${selectcountryId.value}/${branchId}`
    )
    for (let i = 0; i < res.data.length; i++) {
      const item = res.data[i]
      chartOptions.value.labels.push(item.status_name)
      chartOptions.value.fill.colors.push(item.status_color)
      chartOptions.value.colors.push(item.status_color)
      series.value.push(item.status_leads_count && parseInt(item.status_leads_count))
      mapLoading.value = false
    }
  } catch (error) {
    Notify(error.res.data)
  }
}
async function totalCountry() {
  isLoading.value = true
  try {
    const res = await Request.GET_REQ('/total-represent-countries')
    total_country.value = res.data.data.length
    total_countries.value = res.data.data
    isLoading.value = false
  } catch (error) {
    errors.value = error.res.data.errors
  }
}
async function onChangeCountryData(countryId) {
  const branchId = user.value?.branch_id
  series.value = []
  chartOptions.value.labels = []
  chartOptions.value.fill.colors = []
  chartOptions.value.colors = []
  selectcountryId.value = countryId
  mapLoading.value = true

  try {
    const res = await Request.GET_REQ(
      `/country-application-branch-leads-reports/${selectcountryId.value}/${branchId}`
    )
    for (let i = 0; i < res.data.length; i++) {
      const item = res.data[i]
      chartOptions.value.labels.push(item.status_name)
      chartOptions.value.fill.colors.push(item.status_color)
      chartOptions.value.colors.push(item.status_color)
      series.value.push(parseInt(item.status_leads_count))
    }
    chartOptions.value = {
      ...chartOptions.value,
      ...{
        chart: {
          type: 'polarArea',
        },
      },
    }
    mapLoading.value = false
  } catch (error) {
    Notify(error.res.data)
  }
}

//created
await getCountryData()
await totalCountry()
</script>

<style lang="scss">
body.dark .map-loading {
  background: #0e1726;
}
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