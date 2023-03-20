<template>
  <div class="layout-px-spacing layout-top-spacing">
    <div v-if="user && user.user_type == 'superAdmin'" class="text-right">
      <router-link :to="{ name: 'AddBranch' }">
        <button class="btn btn-info btn-rounded mb-2 mr-4 inline-flex">
          Add Branch
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-plus-circle"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="16" />
            <line x1="8" y1="12" x2="16" y2="12" />
          </svg>
        </button>
      </router-link>
    </div>
    <div id="card_1" class="col-lg-12 layout-spacing layout-top-spacing">
      <div class="statbox widget box box-shadow">
        <div class="widget-content widget-content-area">
          <div class="row">
            <div v-for="branch in branches" :key="branch.id" class="col col-md-4 mb-4">
              <div class="card component-card_4">
                <div :class="[branch.id==return_branch_id ? 'card-bg-color':'']" class="card-body">
                  <div class="user-info">
                    <div class="d-flex align-items-start justify-content-between pl-4">
                      <div class="logo-title-wrap">
                        <img
                          v-if="branch.flag"
                          :src="baseURL+'/'+branch.flag"
                          class=""
                          alt="..."
                        />
                        <img v-else src="@/assets/logo.png" class="" alt="..." />
                      </div>
                      <div class="action-wrap d-flex align-items-center justify-content-between">
                        <span class="badge badge-pill badge-warning custom-btn-branch">
                          <FeeatherEyeSvg />
                        </span>

                        <router-link
                          v-if="
                            (user && user.user_type == 'superAdmin') ||
                            (user && user.branch_id === branch.id)
                          "
                          :to="{
                            name: 'EditBranch',
                            params: { slug: branch.slug },
                          }"
                        >
                          <span class="badge badge-pill badge-secondary custom-btn-branch">
                            <FeatherEdit3Svg />
                          </span>
                        </router-link>
                        <label
                          v-if="user && user.user_type == 'superAdmin'"
                          class="switch s-icons s-outline s-outline-success mr-2"
                        >
                          <input
                            type="checkbox"
                            :checked="branch && parseInt(branch.status) === 1 ? true : false"
                            @change="status(branch.id)"
                          />
                          <span class="slider round"></span>
                        </label>
                      </div>
                    </div>

                    <div class="card-info-lists px-4">
                      <div class="title-subtitle-wrap mt-4">
                        <h3 class="card-user_name">{{ branch.branch_name }}</h3>
                        <p class="card-user_occupation">
                          {{ branch.country && branch.country.name }}
                        </p>
                      </div>

                      <ul class="list-group custom-list-group-branch">
                        <li
                          class="list-group-item d-flex justify-content-between align-items-center"
                        >
                          <h6 class="count-primary">Total Leads</h6>
                          <span class="badge badge-primary">{{ branch.total_leads_count }}</span>
                        </li>
                        <li
                          class="list-group-item d-flex justify-content-between align-items-center"
                        >
                          <h6 class="count-info">Today Leads</h6>
                          <span class="badge badge-info">{{ branch.today_leads_count }}</span>
                        </li>

                        <li
                          class="list-group-item d-flex justify-content-between align-items-center"
                        >
                          <h6 class="count-success">Total Counselor</h6>
                          <span class="badge badge-success">{{
                            branch.total_counselors_count
                          }}</span>
                        </li>
                        <li
                          class="list-group-item d-flex justify-content-between align-items-center"
                        >
                          <h6 class="count-warning">Total Front Office</h6>
                          <span class="badge badge-warning">{{
                            branch.total_front_offices_count
                          }}</span>
                        </li>
                        <li
                          class="list-group-item d-flex justify-content-between align-items-center"
                        >
                          <h6 class="count-danger">Total Application</h6>
                          <span class="badge badge-danger">{{ branch.total_app_leads_count }}</span>
                        </li>
                        <li
                          class="list-group-item d-flex justify-content-between align-items-center"
                        >
                          <h6 class="count-secondary">Last 7 Days Leads</h6>
                          <span class="badge badge-secondary">{{
                            branch.last_week_leads_count
                          }}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col col-md-12">
              <div class="lms-pagination">
                <base-pagination v-model="page" :links="pageLinks" @paginate="getBranches" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, computed } from 'vue'
import { useEmitter } from '@/composables/useEmitter'
import FeatherEdit3Svg from '@/svg/FeatherEdit3Svg.vue'
import FeeatherEyeSvg from '@/svg/FeeatherEyeSvg.vue'

import { useStore } from 'vuex'
import Notify from '../../helpers/Notify'
import Request from '../../apis/Request'
import { useRoute } from 'vue-router'

const store = useStore()
const baseURL = ref(store.state.baseURL)
const emitter = useEmitter()
const user = computed(() => store.getters.user)

const route = useRoute()
const pageLinks = ref([])
const page = ref(route.query.page ? route.query.page : 1)

const form = reactive({
  country: '',
  branch_name: '',
})
const branches = ref([])
const errors = ref({})
const isLoading = ref(false)
const return_branch_id = ref('')

async function fetchPrimary() {
  isLoading.value = true
  await getBranches()
  emitter.on('branch-reload', async () => {
    await getBranches()
  })
}

//methods
async function getBranches() {
  try {
    const res = await Request.GET_REQ(`/branch-list?page=${page.value}`)
    branches.value = res.data.result.val.data
    pageLinks.value = res.data.result.val.links
    return_branch_id.value = res.data.result.branch_id
    isLoading.value = false
    console.log(user)
  } catch (error) {
    errors.value = error.res.data.errors
  }
}
async function status(id) {
  try {
    const res = await Request.GET_REQ(`/branch-change-status/${id}`)
    //emitter.emit('branch-reload')
    Notify.success(res.data)
    getBranches()
  } catch (error) {
    errors.value = error.res.data.errors
  }
}

await fetchPrimary()
</script>
<style scoped lang="scss">
.component-card_4 {
  width: auto;
  .user-info {
    width: 100%;
    padding: 5px 0 20px 0px;
  }
  .logo-title-wrap {
    img {
      border-radius: unset;
      height: 80px;
    }
  }
  .custom-btn-branch {
    margin-bottom: 0.5rem;
    margin-right: 0.5rem;
    cursor: pointer;
  }
  .custom-list-group-branch .list-group-item {
    background: transparent;
    padding: 0;
    border: unset;
    position: relative;
    margin: 7px 0;

    &::before {
      position: absolute;
      content: '';
      width: 100%;
      height: 1px;
      background: #e0e6ed;
      left: 0;
      bottom: -7px;
    }
    &::last-child::before {
      background: transparent !important;
      content: unset;
    }
    h6 {
      margin: 0;
      position: relative;
      padding-left: 20px;
      font-size: 14px;

      &::before {
        position: absolute;
        content: '';
        width: 16px;
        height: 16px;
        left: 0;
        border-radius: 3px;
      }
    }
    h6.count-primary {
      &::before {
        background: #1b55e2;
      }
    }
    h6.count-info {
      &::before {
        background: #2196f3;
      }
    }
    h6.count-success {
      &::before {
        background: #8dbf42;
      }
    }
    h6.count-warning {
      &::before {
        background: #e2a03f;
      }
    }
    h6.count-danger {
      &::before {
        background: #e7515a;
      }
    }
    h6.count-secondary {
      &::before {
        background: #5c1ac3;
      }
    }
  }
  .card-user_name {
    font-size: 24px;
  }
}

body.dark .component-card_4 {
  .custom-list-group-branch .list-group-item {
    &::before {
      background: #1b2e4b;
    }
  }
}

ul.list-group.custom-list-group-branch li:last-child:before {
  background: transparent !important;
}

.card-bg-color {
  background-color: #1f2d3a;
}
</style>
