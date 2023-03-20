<template>
  <div class="layout-px-spacing layout-top-spacing">
    <div
      v-if="(user && user.user_type == 'superAdmin') || (user && user.user_type == 'branchManager')"
      class="text-right"
    >
      <router-link :to="{ name: 'Add_Front_Office' }">
        <button class="btn btn-info mb-2 mr-4 btn-rounded inline-flex">
          Add Front Office
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
            <div v-if="front_offices.length == 0">
              <h4>No Data</h4>
            </div>
            <div
              v-for="frontOffice in front_offices"
              :key="frontOffice.id"
              class="col col-md-4 mb-4"
            >
              <div class="card component-card_4">
                <div class="card-body">
                  <div class="user-info">
                    <div class="d-flex align-items-start justify-content-between pl-4">
                      <div class="logo-title-wrap">
                        <img
                          v-if="frontOffice.logo"
                          :src="baseURL + `${frontOffice.logo}`"
                          class=""
                          alt="..."
                        />
                        <img v-else src="@/assets/logo.png" class="" alt="..." />
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
                          v-if="user.user_type == 'superAdmin' || user.user_type == 'branchManager'"
                          :to="{
                            name: 'Edit_Front_Offices',
                            params: { slug: frontOffice.slug },
                          }"
                        >
                          <span class="badge badge-pill badge-secondary custom-btn-branch">
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
                              class="feather feather-edit-3"
                            >
                              <path d="M12 20h9"></path>
                              <path
                                d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"
                              ></path>
                            </svg>
                          </span>
                        </router-link>
                        <label
                          v-if="user.user_type == 'superAdmin' || user.user_type == 'branchManager'"
                          class="switch s-icons s-outline s-outline-success mr-2"
                        >
                          <input
                            type="checkbox"
                            :checked="frontOffice && +frontOffice.status !== 1 ? checked : ''"
                            @change="activeStatus(+frontOffice.id)"
                          />
                          <span class="slider round"></span>
                        </label>
                      </div>
                    </div>

                    <div class="card-info-lists px-4">
                      <div class="title-subtitle-wrap mt-4">
                        <h3 class="card-user_name">
                          {{ frontOffice.front_office_name }}
                        </h3>
                        <p class="card-user_occupation">
                          {{ frontOffice.branch && frontOffice.branch.branch_name }}
                        </p>
                      </div>

                      <ul class="list-group custom-list-group-branch">
                        <li
                          class="list-group-item d-flex justify-content-between align-items-center"
                        >
                          <h6 class="count-primary">Email</h6>
                          <span class="badge">{{ frontOffice.front_office_email }}</span>
                        </li>

                        <li
                          class="list-group-item d-flex justify-content-between align-items-center"
                        >
                          <h6 class="count-primary">Phone</h6>
                          <span class="badge">{{ frontOffice.front_office_phone }}</span>
                        </li>
                        <li
                          class="list-group-item d-flex justify-content-between align-items-center"
                        >
                          <h6 class="count-primary">Country</h6>
                          <span class="badge">{{ frontOffice.country?.name }}</span>
                        </li>

                        <li
                          class="list-group-item d-flex justify-content-between align-items-center"
                        >
                          <h6 class="count-primary">City</h6>
                          <span class="badge">{{ frontOffice.city }}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

import Request from '../../apis/Request'
import Notify from '../../helpers/Notify'

const store = useStore()
const user = computed(() => store.getters.user)

const front_offices = ref([])
const errors = ref({})
const isLoading = ref(false)
const loaduser = ref({})

//methods
async function fetchPrimary() {
  await store.dispatch('user')
  loaduser.value = user.value
  isLoading.value = true
  await getFrontOffices()
}

async function getFrontOffices() {
  let branchId = loaduser.value.branch_id
  if (loaduser.value.user_type === 'superAdmin') {
    try {
      const res = await Request.GET_REQ('/front-offices')
      front_offices.value = res.data
      isLoading.value = false
    } catch (error) {
      errors.value = error.res.data.errors
    }
  } else if (
    loaduser.value.user_type === 'branchManager' ||
    loaduser.value.user_type === 'counselor'
  ) {
    try {
      const res = await Request.GET_REQ(`/front-offices/${branchId}`)
      front_offices.value = res.data
      isLoading.value = false
    } catch (error) {
      errors.value = error.res.data.errors
    }
  }
}
function activeStatus(id) {
  Request.GET_REQ(`/front-office-status/${id}`)
    .then(() => {
      Notify.success('Front Office Status updated...')
    })
    .catch((err) => {
      err && Notify.error(err.response.data.errors)
    })
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
</style>
