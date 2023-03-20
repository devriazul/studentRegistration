<template>
  <div class="layout-px-spacing layout-top-spacing">
    <div
      v-if="(user && user.user_type == 'superAdmin') || (user && user.user_type == 'branchManager')"
      class="text-right"
    >
      <router-link :to="{ name: 'Add_Agent' }">
        <button class="btn btn-info mb-2 mr-4 btn-rounded inline-flex">
          Add Agent
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
            <div v-for="agent in agents" :key="agent.id" class="col col-md-4 mb-4">
              <div class="card component-card_4">
                <div class="card-body">
                  <div class="user-info">
                    <div class="d-flex align-items-start justify-content-between pl-4">
                      <div class="logo-title-wrap">
                        <img
                          v-if="agent.logo"
                          :src="baseURL + `${agent.logo}`"
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
                          v-if="
                            (user && user.user_type == 'superAdmin') ||
                            (user && user.user_type == 'branchManager')
                          "
                          :to="{
                            name: 'Edit_Agent',
                            params: { slug: agent && agent.slug },
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
                          v-if="
                            (user && user.user_type == 'superAdmin') ||
                            (user && user.user_type == 'branchManager')
                          "
                          class="switch s-icons s-outline s-outline-success mr-2"
                        >
                          <input
                            type="checkbox"
                            :checked="agent && +agent.status != 1 ? checked : ''"
                            @change="activeStatus(agent.id)"
                          />
                          <span class="slider round"></span>
                        </label>
                      </div>
                    </div>

                    <div class="card-info-lists px-4">
                      <div class="title-subtitle-wrap mt-4">
                        <h3 class="card-user_name">
                          {{ agent && agent.person_name }}
                        </h3>
                        <p class="card-user_occupation">
                          {{ agent.branch && agent.branch.branch_name }}
                        </p>
                      </div>

                      <ul class="list-group custom-list-group-branch">
                        <li
                          class="list-group-item d-flex justify-content-between align-items-center"
                        >
                          <h6 class="count-primary">Company</h6>
                          <span class="badge">{{ agent && agent.agent_name }}</span>
                        </li>
                        <li
                          class="list-group-item d-flex justify-content-between align-items-center"
                        >
                          <h6 class="count-primary">Email</h6>
                          <span class="badge">{{ agent && agent.agent_email }}</span>
                        </li>

                        <li
                          class="list-group-item d-flex justify-content-between align-items-center"
                        >
                          <h6 class="count-primary">Phone</h6>
                          <span class="badge">{{ agent && agent.agent_phone }}</span>
                        </li>
                        <li
                          class="list-group-item d-flex justify-content-between align-items-center"
                        >
                          <h6 class="count-primary">Country</h6>
                          <span class="badge">{{ agent.country && agent.country.name }}</span>
                        </li>

                        <li
                          class="list-group-item d-flex justify-content-between align-items-center"
                        >
                          <h6 class="count-primary">City</h6>
                          <span class="badge">{{ agent && agent.city }}</span>
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
<script>
import Loader from '@/components/Loader.vue'

import { mapGetters, mapState } from 'vuex'

import Request from '../../apis/Request'
import Notify from '../../helpers/Notify'
export default {
  components: { Loader },
  data() {
    return {
      form: {
        country: '',
        branch_name: '',
      },
      agents: [],
      errors: {},
      isLoading: false,
      loaduser: {},
    }
  },
  computed: {
    ...mapGetters(['user', 'pendingStatus']),
    ...mapState(['baseURL']),
  },
  async mounted() {
    await this.$store.dispatch('user')
    let user = this.$store.getters.user
    this.loaduser = user
    this.isLoading = true
    this.getAgents()
  },
  methods: {
    getAgents() {
      let branchId = this.loaduser.branch_id
      if (this.loaduser.user_type === 'superAdmin') {
        Request.GET_REQ('/agents')
          .then((res) => {
            this.agents = res.data
            this.isLoading = false
          })
          .catch((err) => {
            this.errors = err.res.data.errors
          })
      } else if (
        this.loaduser.user_type === 'branchManager' ||
        this.loaduser.user_type === 'counselor'
      ) {
        Request.GET_REQ(`/agents/${branchId}`)
          .then((res) => {
            this.agents = res.data
            this.isLoading = false
          })
          .catch((err) => {
            this.errors = err.res.data.errors
          })
      }
    },
    activeStatus(id) {
      Request.GET_REQ(`/agent-change-status/${id}`)
        .then(() => {
          this.emitter.emit('reload')
          Notify.success('Front Office Status updated...')
        })
        .catch((err) => {
          this.err && Notify.error(err.response.data.errors)
        })
    },
  },
}
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
