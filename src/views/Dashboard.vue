<template>
  <div>
    <div v-if="user && user.user_type === 'superAdmin'" class="layout-px-spacing">
      <div id="card_1" class="col-lg-12 layout-spacing layout-top-spacing">
        <div class="statbox widget box box-shadow">
          <div class="widget-content widget-content-area">
            <div class="row">
              <div class="col-md-4">
                <h6 class="pb-3 text-center">Branch Leads</h6>
                <branch-chart :theme-mode-data="themeModeData" />
              </div>
              <div class="col-md-4">
                <monthly-leads-chart :theme-mode-data="themeModeData" />
              </div>

              <div class="col-md-4">
                <h6 class="pb-3 text-center">Branch Application Leads</h6>
                <monthly-application-leads-chart :theme-mode-data="themeModeData" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="card_1" class="col-lg-12 layout-spacing layout-top-spacing">
        <div class="statbox widget box box-shadow">
          <div class="widget-content widget-content-area">
            <div class="row">
              <div class="col-md-6">
                <country-application-leads :theme-mode-data="themeModeData" />
              </div>
              <div class="col-md-6">
                <div class="row">
                  <div class="col-md-10">
                    <last-10-days-leads :theme-mode-data="themeModeData" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="user && user.user_type === 'branchManager'">
      <BranchDahsboard :theme-mode-data="themeModeData" />
    </div>

    <div v-if="user && user.user_type === 'counselor'">
      <CounselorDahsboard :theme-mode-data="themeModeData" />
    </div>

    <div v-if="user && user.user_type === 'frontOfficer'">
      <frontOfficerDahsboard :theme-mode-data="themeModeData" />
    </div>
    <div v-if="user && user.user_type === 'agent'">
      <AgentDahsboard :theme-mode-data="themeModeData" />
    </div>
  </div>
</template>
<script setup>
import { ref, computed, defineAsyncComponent } from 'vue'
import { useStore } from 'vuex'
const BranchChart = defineAsyncComponent(() => import('@/components/chart/BranchChart.vue'))
const MonthlyLeadsChart = defineAsyncComponent(() =>
  import('@/components/chart/MonthlyLeadsChart.vue')
)
const MonthlyApplicationLeadsChart = defineAsyncComponent(() =>
  import('@/components/chart/MonthlyApplicationLeadsChart.vue')
)
const CountryApplicationLeads = defineAsyncComponent(() =>
  import('@/components/chart/branch-chart/CountryApplicationLeads.vue')
)
const BranchDahsboard = defineAsyncComponent(() => import('@/views/branch/BranchDashboard.vue'))
const Last10DaysLeads = defineAsyncComponent(() => import('@/components/chart/Last10DaysLeads.vue'))
const CounselorDahsboard = defineAsyncComponent(() =>
  import('@/views/counselor/CounselorDashboard.vue')
)
const frontOfficerDahsboard = defineAsyncComponent(() =>
  import('@/views/front-office/FrontOfficerDashboard.vue')
)
const AgentDahsboard = defineAsyncComponent(() => import('@/views/agent/AgentDashboard.vue'))

const store = useStore()
const user = computed(() => store.getters.user)
defineProps({
  themeModeData: {
    type: Boolean,
    required: true,
  },
})

const isPending = ref(false)
//methods
async function fetchPrimary() {
  isPending.value = false
}

await fetchPrimary()
</script>
<style scoped lang="scss">
.component-card_1 {
  width: auto;
}
</style>
<!-- <template>
  <div>Hello</div>
</template>
<script setup>
</script> -->