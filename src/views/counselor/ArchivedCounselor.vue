<template>
  <div class="layout-px-spacing layout-top-spacing">
    <div
      v-if="(user && user.user_type == 'superAdmin') || (user && user.user_type == 'branchManager')"
      class="text-right"
    >
      <router-link :to="{ name: 'Add_Counselor' }">
        <button class="btn btn-info btn-rounded mb-2 mr-4 inline-flex items-center">
          Add Counselor
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
            <div class="col">
              <h5 class="badge badge-primary">Total Counselor: {{ counselors.length }}</h5>
            </div>
          </div>
          <div class="row">
            <h3 v-show="counselors.length == 0" class="text-danger p-3">
              No Archived Counselors Are Available !
            </h3>

            <div v-for="counselor in counselors" :key="counselor.id" class="col col-md-4 mb-4">
              <div class="card component-card_4">
                <div :class="[counselor.id==return_counselor_id ? 'card-bg-color':'']" class="card-body">
                  <div class="user-info">
                    <div class="d-flex align-items-start justify-content-between pl-4">
                      <div class="logo-title-wrap">
                        <img
                          v-if="counselor.photo"
                          :src="baseURL + `/${counselor.photo}`"
                          class=""
                          :alt="counselor.slug"
                        />
                        <img v-else src="@/assets/img/no-image.png" class="" alt="..." />
                      </div>
                      <div class="action-wrap d-flex align-items-center justify-content-between">
                        <span class="badge badge-pill badge-warning custom-btn-branch">
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
                        </span>

                        <router-link
                          v-if="
                            (user && user.user_type == 'superAdmin') ||
                            (user && user.user_type == 'branchManager') ||
                            (user && user.counselor_id === counselor.id)
                          "
                          :to="{
                            name: 'EditCounselor',
                            params: { slug: counselor.slug },
                          }"
                        >
                        </router-link>
                        <label
                          v-if="user.user_type == 'superAdmin' || user.user_type == 'branchManager'"
                          class="switch s-icons s-outline s-outline-success mr-2"
                        >
                          <input
                            type="checkbox"
                            :checked="counselor && parseInt(counselor.status) === 1 ? true : false"
                            @change="activeStatus(counselor.id)"
                          />
                          <span class="slider round"></span>
                        </label>
                      </div>
                    </div>

                    <div class="card-info-lists px-4">
                      <div class="title-subtitle-wrap mt-4">
                        <h3 class="card-user_name">
                          {{ counselor.counselor_name }}
                        </h3>
                        <!--<p class="card-user_occupation">
                          {{ counselor.country && counselor.country.name }}
                        </p>-->
                        <p class="card-user_occupation">
                          {{ counselor.branch && counselor.branch.branch_name }}
                        </p>
                      </div>

                      <ul class="list-group custom-list-group-branch">
                        <li
                          class="list-group-item d-flex justify-content-between align-items-center"
                        >
                          <h6 class="count-primary">Total Assigned Leads</h6>
                          <span class="badge badge-primary">{{
                            counselor.assigned_leads_count
                          }}</span>
                        </li>
                        <li
                          class="list-group-item d-flex justify-content-between align-items-center"
                        >
                          <h6 class="count-info">Today Assigned Leads</h6>
                          <span class="badge badge-info">{{
                            counselor.today_assign_leads_count
                          }}</span>
                        </li>

                        <li
                          class="list-group-item d-flex justify-content-between align-items-center"
                        >
                          <h6 class="count-secondary">Last 7 Days Assigned Leads</h6>
                          <span class="badge badge-secondary">{{
                            counselor.last_week_assigned_leads_count
                          }}</span>
                        </li>
                        <li
                          class="list-group-item d-flex justify-content-between align-items-center"
                        >
                          <h6 class="count-danger">Counselor Application</h6>
                          <span class="badge badge-danger">{{
                            counselor.counselor_app_leads_count
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
                <base-pagination v-model="page" :links="pageLinks" @paginate="fetchPrimary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed,reactive } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import Request from '../../apis/Request'
import Notify from '../../helpers/Notify'
import useVuelidate from '@vuelidate/core';
import { required, alpha, email, maxLength, minLength, helpers, sameAs, numeric  } from '@vuelidate/validators';

const store = useStore()
const route = useRoute()
const router = useRouter()
const user = computed(() => store.getters.user)
const baseURL = computed(() => store.getters.baseURL)

const counselors = ref([])
const pageLinks = ref([])
const return_counselor_id = ref('')
const page = ref(route.query.page ? route.query.page : 1)
const total_counselors = ref(0)
const isLoading = ref(false)
const isPending = ref(false)

//methods
async function fetchPrimary() {
  isLoading.value = true
  await store.dispatch('user')
  try {
    const res = await Request.GET_REQ(`/deleted-counselors?page=${page.value}`)
    console.log(res.data)
    counselors.value = res.data.result.val.data
    pageLinks.value = res.data.result.val.links
    total_counselors.value = res.data.result.val.total
    return_counselor_id.value = res.data.result.counselor_id
    isLoading.value = false
  } catch (error) {
    Notify.error(error.message)
    isLoading.value = false
  }
}

async function activeStatus(id) {
  try {
    const res = await Request.GET_REQ(`/roll-back-counselor/${id}`)    
    fetchPrimary()
    Notify.success(res.data)
  } catch (err) {
    err && Notify.error(err.response.data.errors)
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
      border-radius: 5px;
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