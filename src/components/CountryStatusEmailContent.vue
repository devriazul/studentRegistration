<template>
  <div
    id="countryStatusEmailModal"
    class="modal fade"
    tabindex="-1"
    role="dialog"
    aria-labelledby="countryStatusEmailModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg" role="document">
      <form @submit.prevent="contentEdit ? handleUpdateContent() : handleSubmitContent()">
        <div class="modal-content">
          <div class="modal-header">
            <h5 id="countryStatusEmailModalLabel" class="modal-title">Status Email Content</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-x"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <div class="d-flex align-items-center justify-content-between">
                <label style="display: block; text-align: left"
                  >Write the Status Notification Content here</label
                >
              </div>

              <textarea
                v-model="status_email_content"
                class="form-control"
                cols="30"
                rows="5"
              ></textarea>
              <small
                v-if="errors.status_email_content"
                id="sh-text1"
                class="form-text text-danger"
                >{{ errors.status_email_content[0] }}</small
              >
            </div>
          </div>
          <div class="modal-footer text-left">
            <button class="btn btn-sm" data-dismiss="modal">Cancel</button>
            <button type="submit" class="btn btn-sm btn-info">
              Save
              <span v-if="lazyLoadAssign">
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
                  class="feather feather-loader spin mr-2"
                >
                  <line x1="12" y1="2" x2="12" y2="6"></line>
                  <line x1="12" y1="18" x2="12" y2="22"></line>
                  <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                  <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                  <line x1="2" y1="12" x2="6" y2="12"></line>
                  <line x1="18" y1="12" x2="22" y2="12"></line>
                  <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                  <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                </svg>
              </span>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Request from '../apis/Request'
import Notify from '../helpers/Notify'
export default {
  name: 'CountryStatusEmail',
  props: {
    statusId: {
      type: Number,
      required: true,
    },
    countryId: {
      type: Number,
      required: true,
    },
  },
  emits: ['closeContentModal'],
  data() {
    return {
      status_email_content: '',
      contentEdit: false,
      errors: {},
    }
  },
  watch: {
    statusId: {
      handler() {
        Request.GET_REQ(`/status-email-content/${this.statusId}`)
          .then((res) => {
            this.status_email_content = res.data.status_email_content
            if (res.data.status_email_content) {
              this.contentEdit = true
            } else {
              this.contentEdit = false
            }
          })
          .catch((err) => {
            this.errors = err.response.data.errors
          })
      },
    },
  },
  methods: {
    handleSubmitContent() {
      const data = {
        status_email_content: this.status_email_content,
        country_status_id: this.statusId,
        country_id: this.countryId,
      }

      Request.POST_REQ(data, `/add-status-email-content`)
        .then(() => {
          this.editProcess = false
          this.$emit('closeContentModal')
          Notify.success('Content Successfully Saved')
          //   this.status_email_content = "";
        })
        .catch((err) => {
          this.errors = err.response.data.errors
        })
    },

    handleUpdateContent() {
      const data = {
        status_email_content: this.status_email_content,
        country_status_id: this.statusId,
        country_id: this.countryId,
      }

      Request.POST_REQ(data, `/update-status-email-content/${this.statusId}`)
        .then(() => {
          this.editProcess = false
          this.$emit('closeContentModal')
          Notify.success('Content Successfully Updated.')
          //   this.status_email_content = "";
        })
        .catch((err) => {
          this.errors = err.response.data.errors
        })
    },

    editEmailContent() {
      this.contentEdit = true
    },
  },
}
</script>
