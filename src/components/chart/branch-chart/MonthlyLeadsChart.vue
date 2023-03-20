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
    <div id="chart">
      <apexchart type="bar" height="400" :options="chartOptions" :series="series"></apexchart>
    </div>
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
  emits: ['pendingStatus'],
  data: function () {
    return {
      series: [
        {
          name: 'Monthly Leads',
          data: [],
        },
        {
          name: 'Monthly Application Leads',
          data: [],
        },
      ],
      chartOptions: {
        chart: {
          type: 'bar',
          height: 350,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded',
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent'],
        },
        xaxis: {
          labels: {
            style: {
              colors: this.themeModeData ? '#ebedf2' : '#3b3f5c',
            },
          },
          categories: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ],
        },
        yaxis: {
          labels: {
            style: {
              colors: this.themeModeData ? '#ebedf2' : '#3b3f5c',
            },
          },
          title: {
            text: 'Leads & Application Leads',
            style: {
              color: this.themeModeData ? '#ebedf2' : '#3b3f5c',
            },
          },
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val + ' Leads'
            },
          },
        },
        legend: {
          labels: {
            colors: this.themeModeData ? '#ebedf2' : '#3b3f5c',
            // colors: "red"
          },
        },
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
              type: 'bar',
            },
            xaxis: {
              labels: {
                style: {
                  colors: this.themeModeData ? '#ebedf2' : '#3b3f5c',
                },
              },
            },
            yaxis: {
              labels: {
                style: {
                  colors: this.themeModeData ? '#ebedf2' : '#3b3f5c',
                },
              },
              title: {
                text: 'Leads & Application Leads',
                style: {
                  color: this.themeModeData ? '#ebedf2' : '#3b3f5c',
                },
              },
            },

            legend: {
              labels: {
                colors: this.themeModeData ? '#ebedf2' : '#3b3f5c',
                // colors: "red"
              },
            },
          },
        }
      },
    },
  },
  async mounted() {
    await this.getMonthlyLeads()
    await this.getMonthlyAppsLeads()
  },
  methods: {
    async getMonthlyLeads() {
      this.mapLoading = true
      await Request.GET_REQ(`/branch-monthly-leads-reports/${this.user.branch_id}`)
        .then((res) => {
          for (let i = 0; i < res.data.length; i++) {
            const item = res.data[i]
            this.series[0].data.push(item)
            this.$emit('pendingStatus', false)
            this.mapLoading = false
          }
        })
        .catch((err) => {
          Notify(err.res.data)
        })
    },
    async getMonthlyAppsLeads() {
      const branchId = this.user && this.user.branch_id
      await Request.GET_REQ(`/branch-monthly-application-leads-reports/${branchId}`)
        .then((res) => {
          for (let i = 0; i < res.data.length; i++) {
            const item = res.data[i]
            this.series[1].data.push(item)
          }
        })
        .catch((err) => {
          Notify(err.res.data)
        })
    },
  },
}
</script>
