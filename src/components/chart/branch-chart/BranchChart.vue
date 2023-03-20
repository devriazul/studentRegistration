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
    <apexchart width="450" type="pie" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script>
import Request from '@/apis/Request'
import { mapGetters } from 'vuex'
import Notify from '../../../helpers/Notify'
export default {
  props: {
    themeModeData: {
      type: Boolean,
      required: true,
    },
  },
  data: function () {
    return {
      series: [],
      chartOptions: {
        chart: {
          type: 'pie',
        },
        stroke: {
          colors: ['#fff'],
        },
        fill: {
          opacity: 0.8,
          type: 'gradient',
          colors: ['#2196F3', '#FF9800'],
        },
        legend: {
          position: 'bottom',
          labels: {
            colors: this.themeModeData ? '#ebedf2' : '#3b3f5c',
          },
        },
        colors: ['#2196F3', '#FF9800'],
        labels: ['Leads', 'Application Leads'],
      },
      mapLoading: false,
    }
  },
  computed: {
    ...mapGetters(['user', 'pendingStatus']),
  },
  watch: {
    themeModeData: {
      handler() {
        this.chartOptions = {
          ...this.chartOptions,
          ...{
            chart: {
              type: 'pie',
            },
            legend: {
              labels: {
                colors: this.themeModeData ? '#ebedf2' : '#3b3f5c',
              },
            },
          },
        }
      },
    },
  },
  async created() {
    await this.getData()
  },
  methods: {
    async getData() {
      const branchId = this.user.branch_id
      this.mapLoading = true
      await Request.GET_REQ(`/own-branch/${branchId}`)
        .then((res) => {
          for (let i = 0; i < res.data.length; i++) {
            const item = res.data[i]
            // this.chartOptions.labels.push(item.branch_name);
            this.series.push(parseInt(item.total_general_leads_count))
            this.series.push(parseInt(item.total_app_leads_count))
            this.chartOptions.colors.push(item.branch_bg_color)
            this.chartOptions.fill.colors.push(item.branch_bg_color)
            this.mapLoading = false
          }
          // this.series.push(res.data[0].total_leads.length);
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
