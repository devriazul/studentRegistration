<template>
  <div style="position: absolute; top: 70px; right: 22px; z-index: 9999">
    <div
      class="toast toast-primary toast-custom-notification fade hide"
      role="alert"
      data-autohide="false"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="toast-header">
        <strong class="mr-auto">New Notification</strong>
        <small class="meta-time">{{
          dateTime(notification.notification && notification.notification.created_at)
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
      <!-- eslint-disable vue/no-v-html -->
      <div
        v-if="notification.notification && notification.notification.info_text"
        class="toast-body"
        v-html="notification.notification && notification.notification.info_text"
      ></div>

      <div v-if="newLead" class="toast-body">
        {{ newLead }}
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    notification: {
      type: Object,
      required: false,
      default() {
        return {}
      },
    },
    newLead: {
      type: String,
      required: true,
    },
  },
  emits: ['clearNotify'],
  methods: {
    dateTime(value) {
      // return moment(value).format("MMMM Do YYYY, h:mm:ss a");
      return moment(value).calendar()
    },
    clearNotifyEmit() {
      this.$emit('clearNotify')
    },
  },
}
</script>
