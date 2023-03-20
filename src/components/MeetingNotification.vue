<template>
  <div style="position: fixed; bottom: 0px; left: 48px; z-index: 9999">
    <div
      class="toast toast-info meeting-notification slideInUp hide"
      role="alert"
      data-autohide="false"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="toast-header">
        <strong class="mr-auto">Meeting Reminder</strong>
        <small class="meta-time">{{
          dateTime(meetingReminder.check_date_time && meetingReminder.check_date_time)
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
          You have a meeting:
          {{ dateTime(meetingReminder.check_date_time && meetingReminder.check_date_time) }}
        </h6>
        <div class="meeting-info-notifier">
          <div class="mt-info-box">
            <small>Student Name: </small>
            <small>{{ meetingReminder.student_name }}</small>
          </div>
          <div class="mt-info-box">
            <small>Student Email: </small>
            <small>{{ meetingReminder.student_email }}</small>
          </div>
          <div class="mt-info-box">
            <small>Student Phone: </small>
            <small>{{ meetingReminder.person_phone }}</small>
          </div>

          <div class="mt-info-box">
            <small>Counselor Name: </small>
            <small
              >{{ meetingReminder.counselor_name }}
              {{ meetingReminder.counselor_id === user.counselor_id ? '(me)' : '' }}</small
            >
          </div>

          <div class="mt-info-box">
            <small>Counselor Email: </small>
            <small>{{ meetingReminder.counselor_email }}</small>
          </div>

          <div class="mt-info-box">
            <small>Meeting Created By: </small>
            <small>{{ meetingReminder.created_by }}</small>
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
    meetingReminder: {
      type: Object,
      required: false,
      default() {
        return {}
      },
    },
  },
  emits: ['clearMeetingNotify'],
  computed: {
    ...mapGetters(['user', 'pendingStatus']),
  },
  methods: {
    dateTime(value) {
      // return moment(value).format("MMMM Do YYYY, h:mm:ss a");
      return moment(value).calendar()
    },
    clearNotifyEmit() {
      this.$emit('clearMeetingNotify')
    },
  },
}
</script>

<style lang="scss" scoped>
.meeting-notification {
  background: #3b3f5c;
  border: 0;
  .toast-header {
    background: #d8008c;
  }
  h6 {
    color: #fff93c;
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
