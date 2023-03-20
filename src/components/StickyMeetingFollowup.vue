<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        class="fixed top-4 left-4 z-[101] h-screen w-1/2 overflow-hidden rounded-md bg-black/[0.7]"
        v-if="modelValue"
      >
        <div class="meeting-followup-header d-flex justify-content-between align-items-center p-1">
          <div class="sticky-mf-head-title">
            <h5 class="p-2 text-lg">Today Meeting & Followup</h5>
          </div>
          <div
            class="group inline-grid h-8 w-8 place-items-center rounded-full bg-red-500 hover:bg-white"
            @click="closeMDrawer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="h-4 w-4 stroke-white group-hover:stroke-red-500"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </div>
        </div>
        <div class="sticky-mf-wrapper-body">
          <div class="mf-tab-area">
            <ul id="justifyTab" class="nav nav-tabs nav-fill mb-3 mt-3" role="tablist">
              <li class="nav-item">
                <a
                  id="justify-home-tab"
                  class="nav-link active"
                  data-toggle="tab"
                  href="#justify-home"
                  role="tab"
                  aria-controls="justify-home"
                  aria-selected="true"
                  >Follow Up</a
                >
              </li>
              <li class="nav-item">
                <a
                  id="justify-profile-tab"
                  class="nav-link"
                  data-toggle="tab"
                  href="#justify-profile"
                  role="tab"
                  aria-controls="justify-profile"
                  aria-selected="false"
                  >Meeting</a
                >
              </li>
            </ul>

            <div id="justifyTabContent" class="tab-content">
              <div
                id="justify-home"
                class="tab-pane fade show active"
                role="tabpanel"
                aria-labelledby="justify-home-tab"
              >
                <div class="follow-up-tab">
                  <div class="table-responsive">
                    <table class="table-bordered table">
                      <thead>
                        <tr>
                          <th>St.Name</th>
                          <th>Student Email</th>
                          <th>Time</th>
                          <th v-if="user && user.user_type === 'superAdmin'">Branch</th>
                          <th
                            v-if="
                              (user && user.user_type === 'superAdmin') ||
                              (user && user.user_type === 'branchManager')
                            "
                          >
                            Counselor
                          </th>
                          <th class="text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="followUpList in followUpLists" :key="followUpList.id">
                          <td>
                            {{
                              followUpList.lead && followUpList.lead.first_name + ' ' + last_name
                            }}
                          </td>
                          <td>
                            {{ followUpList.lead && followUpList.lead.email }}
                          </td>
                          <td>
                            {{ mCalender(followUpList && followUpList.follow_up_date_time) }}
                          </td>

                          <td v-if="user && user.user_type === 'superAdmin'">
                            {{ followUpList.branch && followUpList.branch.branch_name }}
                          </td>
                          <td
                            v-if="
                              (user && user.user_type === 'superAdmin') ||
                              (user && user.user_type === 'branchManager')
                            "
                          >
                            {{ followUpList.user && followUpList.user.name }}
                          </td>

                          <td class="text-center">
                            <span
                              :class="
                                followUpList.is_follow_up_done ? 'text-success' : 'text-danger'
                              "
                              >{{ followUpList.is_follow_up_done ? 'Done' : 'Not Done' }}</span
                            >
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div
                id="justify-profile"
                class="tab-pane fade"
                role="tabpanel"
                aria-labelledby="justify-profile-tab"
              >
                <div class="meeting-tab">
                  <div class="table-responsive">
                    <table class="table-bordered table">
                      <thead>
                        <tr>
                          <th>St.Name</th>
                          <th>Student Email</th>
                          <th>Time</th>
                          <th v-if="user && user.user_type === 'superAdmin'">Branch</th>
                          <th
                            v-if="
                              (user && user.user_type === 'superAdmin') ||
                              (user && user.user_type === 'branchManager')
                            "
                          >
                            Counselor
                          </th>
                          <th class="text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="meetingList in meetingLists" :key="meetingList.id">
                          <td>
                            {{
                              meetingList.get_lead &&
                              meetingList.get_lead.first_name + ' ' + last_name
                            }}
                          </td>
                          <td>
                            {{ meetingList.get_lead && meetingList.get_lead.email }}
                          </td>
                          <td>
                            {{ mCalender(meetingList && meetingList.meeting_date_time) }}
                          </td>

                          <td v-if="user && user.user_type === 'superAdmin'">
                            {{ meetingList.get_branch && meetingList.get_branch.branch_name }}
                          </td>
                          <td
                            v-if="
                              (user && user.user_type === 'superAdmin') ||
                              (user && user.user_type === 'branchManager')
                            "
                          >
                            {{
                              meetingList.get_counselor && meetingList.get_counselor.counselor_name
                            }}
                          </td>

                          <td class="text-center">
                            <span
                              :class="meetingList.is_meeting_done ? 'text-success' : 'text-danger'"
                              >{{
                                meetingList && meetingList.is_meeting_done ? 'Done' : 'Not Done'
                              }}</span
                            >
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import moment from 'moment'

defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
})
const emit = defineEmits(['update:modelValue'])

const store = useStore()
const user = computed(() => store.getters.user)
const followUpLists = computed(() => store.getters.followUpLists)
const meetingLists = computed(() => store.getters.meetingLists)

const meetingFollowupActive = ref(false)

//methods
function activeDrawer() {
  meetingFollowupActive.value = !meetingFollowupActive.value
}
function closeMDrawer() {
  emit('update:modelValue', false)
}

function mCalender(value) {
  return moment(value).calendar()
}
</script>
<style lang="scss" scoped>
body.dark .sticky-meeting-followup-drawer {
  background: #050718;
}
.sticky-meeting-followup-drawer {
  background: #ebebeb;
  width: 800px;
  position: fixed;
  z-index: 500;
  top: 11%;
  left: -100%;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
}
.sticky-meeting-followup-drawer.show {
  visibility: visible;
  transform: translateX(0);
  left: 3%;
}
.meeting-followup-header {
  background: #007bff;
}

.sticky-mf-wrapper-body {
  /* table td {
    word-break: break-all;
  } */
  .nav-tabs .nav-item.show .nav-link,
  .nav-tabs .nav-link.active {
    color: #ffffff;
    background-color: #00d68d;
    border-color: #00d68d #00d68d #fff;
    font-weight: bold;
    font-size: 18px;
  }
  .nav-tabs .nav-link:focus,
  .nav-tabs .nav-link:hover {
    border-color: transparent;
  }
}

body.dark .table {
  background-color: transparent;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0.5;
  transform: translateX(-800px);
}
</style>
