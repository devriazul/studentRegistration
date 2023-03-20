<template>
  <div style="position: fixed; bottom: 0px; right: 12px; z-index: 11111">
    <div
      class="toast toast-info followup-notification slideInUp hide"
      role="alert"
      data-autohide="false"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="toast-header">
        <strong class="mr-auto">Follow Up Reminder</strong>
        <small class="meta-time">{{
          dateTime(followUpReminder.check_date_time && followUpReminder.check_date_time)
        }}</small>
        <button
          type="button"
          class="ml-2 mb-1 close"
          data-dismiss="toast"
          aria-label="Close"
          @click="clearNotifyEmit"
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div class="toast-body">
        <h6>
          You have a Follow Up:
          {{ dateTime(followUpReminder.check_date_time && followUpReminder.check_date_time) }}
        </h6>
        <div class="meeting-info-notifier">
          <div class="mt-info-box">
            <small>Student Name: </small>
            <small>{{ followUpReminder.student_name }}</small>
          </div>
          <div class="mt-info-box">
            <small>Student Email: </small>
            <small>{{ followUpReminder.student_email }}</small>
          </div>
          <div class="mt-info-box">
            <small>Student Phone: </small>
            <small>{{ followUpReminder.student_phone }}</small>
          </div>

          <div class="mt-info-box">
            <small>Followup Creator: </small>
            <small
              >{{ followUpReminder.created_by }}
              {{ followUpReminder.user_id === user.id ? '(me)' : '' }}</small
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
export default {
  props: {
    followUpReminder: {
      type: Object,
      required: false,
      default() {
        return {}
      },
    },
  },
  emits: ['clearFollowUpNotify'],
  computed: {
    ...mapGetters(['user', 'pendingStatus']),
  },
  methods: {
    dateTime(value) {
      // return moment(value).format("MMMM Do YYYY, h:mm:ss a");
      return moment(value).calendar()
    },
    clearNotifyEmit() {
      this.$emit('clearFollowUpNotify')
    },
  },
}
</script>

<style lang="scss" scoped>
.followup-notification {
  background: #3b3f5c;
  border: 0;
  .toast-header {
    background: #d82800;
  }
  h6 {
    color: #3cffdb;
  }
  strong {
    font-size: 14px;
  }
  .meeting-info-notifier {
    border: 1px solid #dddddd24;
    padding: 3px;
  }
  .mt-info-box {
    border-bottom: 1px solid #dddddd24;
    &:last-child {
      border: none;
    }
  }
}
</style>
