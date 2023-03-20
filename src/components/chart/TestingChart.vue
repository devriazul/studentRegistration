<script>
import { defineComponent } from 'vue'
import { PolarArea } from 'vue3-chart-v2'
import Request from '../../../apis/Request'
import Notify from '../../helpers/Notify'
export default defineComponent({
  name: 'CountryApplicationLeadChart',
  extends: PolarArea,
  props: {
    countryId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      labelsData: [],
      countData: [],
      bgColor: [],
    }
  },
  computed: {
    chartData: function () {
      return this.countData
    },
  },
  watch: {
    countryId: {
      handler() {
        this.getCountryData()
        this.emitter.emit('reloadChart')
      },
    },
  },
  async mounted() {
    await this.getCountryData()
    this.renderPolarChart()
    this.emitter.on('reloadChart', () => {
      this.renderPolarChart()
    })
  },
  methods: {
    renderPolarChart() {
      this.renderChart(
        {
          labels: this.labelsData,
          datasets: [
            {
              label: 'My First Dataset',
              data: this.chartData,
              backgroundColor: this.bgColor,
            },
          ],
        },
        {
          legend: {
            display: true,
            position: 'chartArea',
            align: 'start',
            fullSize: true,
            maxWidth: 40,
            boxWidth: 40,
            padding: 40,
            color: '#ffffff',
          },
        }
      )
    },
    async getCountryData() {
      this.labelsData = []
      this.countData = []
      await Request.GET_REQ(`/country-application-leads-reports/${this.countryId}`)
        .then((res) => {
          for (let i = 0; i < res.data.length; i++) {
            const item = res.data[i]
            this.labelsData.push(item.status_name)
            this.countData.push(item.status_leads.length)
            this.bgColor.push(item.status_color)
          }
        })
        .catch((err) => {
          Notify(err.res.data)
        })
    },
  },
})
</script>
