<template>
  <h6 class="text-center">Last 10 days Leads</h6>
  <div id="chart">
    <apexchart type="bar" height="400" :options="chartOptions" :series="series"></apexchart>
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
      series: [
        {
          data: [],
        },
      ],
      chartOptions: {
        chart: {
          type: 'bar',
          width: 200,
          height: 35,
        },
        plotOptions: {
          bar: {
            columnWidth: '80%',
          },
        },
        labels: [],
        xaxis: {
          labels: {
            style: {
              colors: this.themeModeData ? '#ebedf2' : '#3b3f5c',
            },
          },
          crosshairs: {
            width: 1,
          },
        },
        yaxis: {
          labels: {
            style: {
              colors: this.themeModeData ? '#ebedf2' : '#3b3f5c',
            },
          },
        },
        tooltip: {
          fixed: {
            enabled: false,
          },
          x: {
            show: false,
          },
          y: {
            title: {
              formatter: function () {
                return ' Leads'
              },
            },
          },
          marker: {
            show: false,
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
    await this.getMonthlyAppsLeads()
  },
  methods: {
    async getMonthlyAppsLeads() {
      const branchId = this.user.branch_id
      await Request.GET_REQ(`/last10-days-branch-leads-reports/${branchId}`)
        .then((res) => {
          for (let i = 0; i < Object.keys(res.data).length; i++) {
            const keyNames = Object.keys(res.data)[i]
            this.chartOptions.labels.push(keyNames)
          }
          for (let i = 0; i < Object.values(res.data).length; i++) {
            const item = Object.values(res.data)[i]
            this.series[0].data.push(parseInt(item))
          }
        })
        .catch((err) => {
          Notify(err.res.data)
        })
    },
  },
}
</script>
