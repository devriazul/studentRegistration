<template>
  <div>
    <div class="layout-px-spacing">
      <div id="card_1" class="col-lg-12 layout-spacing layout-top-spacing">
        <div class="statbox widget box box-shadow">
          <div class="widget-content widget-content-area">
            <div class="row">
              <div class="col-md-4">
                <h6 class="pb-3 text-center">Leads & Application</h6>
                <branch-chart :theme-mode-data="themeModeData" />
              </div>
              <div class="col-md-7 offset-md-1">
                <h6 class="pb-3 text-center">Monthly Leads & Application</h6>
                <monthly-leads-chart :theme-mode-data="themeModeData" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="layout-px-spacing">
      <div id="card_1" class="col-lg-12 layout-spacing layout-top-spacing">
        <div class="statbox widget box box-shadow">
          <div class="widget-content widget-content-area">
            <div class="row">
              <div class="col-md-5">
                <last-10-days-leads :theme-mode-data="themeModeData" />
              </div>
              <div class="col-md-6 offset-md-1">
                <country-application-leads :theme-mode-data="themeModeData" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import BranchChart from '../../components/chart/branch-chart/BranchChart.vue'
import { useStore } from 'vuex'
import MonthlyLeadsChart from '@/components/chart/branch-chart/MonthlyLeadsChart.vue'
import CountryApplicationLeads from '../../components/chart/branch-chart/CountryApplicationLeads.vue'
import Last10DaysLeads from '../../components/chart/branch-chart/Last10DaysLeads.vue'

const store = useStore()
const user = computed(() => store.getters.user)

defineProps({
  themeModeData: {
    type: Boolean,
    required: true,
  },
})
</script>
