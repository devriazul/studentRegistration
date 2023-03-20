<template>
  <div id="card_1" class="col-lg-12 layout-spacing layout-top-spacing">
    <div class="statbox widget box box-shadow">
      <div class="widget-content widget-content-area">
        <div class="row mb-4">
          <div id="manage_app_process" class="col-xl-12 col-md-12 col-sm-12 col-12">
            <h4>Manage Application Process</h4>
            <br />
            <div v-if="editProcess == true" class="row">
              <div class="col-md-9">
                <div class="form-group d-flex align-items-center">
                  <input v-model="process_name" type="text" class="form-control" />
                  <input v-model="status_color" style="cursor: pointer" type="color" class="ml-3" />
                </div>
              </div>
              <div class="col-md-3">
                <button class="btn btn-secondary mt-1" @click="updateStatus">Update</button>
              </div>
            </div>
          </div>
          <div class="col col-md-12">
            <div id="tableSimple" class="col-lg-12 col-12 p-0">
              <div class="table-responsive">
                <table class="table table-bordered mb-4">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Process Name</th>
                      <th>Process Color</th>
                      <th>Created At</th>
                      <th>Publish</th>
                      <th>Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(status, index) in statuses" :key="index">
                      <td>{{ index + 1 }}</td>
                      <td>
                        <p>
                          {{ status.status_name }}
                        </p>
                      </td>
                      <td>
                        <span
                          :style="{ background: status.status_color }"
                          style="width: 30px; height: 30px; display: block"
                        ></span>
                      </td>
                      <td>{{ status.status_date }}</td>
                      <td>
                        <label class="switch s-icons s-outline s-outline-success mr-2">
                          <input
                            type="checkbox"
                            :checked="status.publish !== 1 ? checked : ''"
                            @change="processStatus(status.id)"
                          />
                          <span class="slider round"></span>
                        </label>
                      </td>
                      <td>
                        <span :class="status.publish == 1 ? 'text-success' : 'text-danger'">{{
                          status.publish == 1 ? 'Active' : 'Deactive'
                        }}</span>
                      </td>
                      <td>
                        <span class="mr-2" @click="editEmailStatus(status.id)">
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
                            class="feather feather-mail custom-edit-icon"
                            data-v-0920824e=""
                          >
                            <path
                              d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                              data-v-0920824e=""
                            ></path>
                            <polyline points="22,6 12,13 2,6" data-v-0920824e=""></polyline>
                          </svg>
                        </span>
                        <span @click="editStatus(status.id, $event)">
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
                            class="feather feather-edit-3 icon custom-edit-icon"
                          >
                            <path d="M12 20h9"></path>
                            <path
                              d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"
                            ></path>
                          </svg>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <CountryStatusEmailContent
            :status-id="statusId"
            :country-id="countryId"
            @closeContentModal="closeContentModal"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Request from '../apis/Request'
import Notify from '../helpers/Notify'
import CountryStatusEmailContent from './CountryStatusEmailContent.vue'
export default {
  components: { CountryStatusEmailContent },
  props: {
    statuses: {
      type: Array,
      required: true,
    },
    countryId: {
      type: Number,
      required: true,
    },
  },
  emits: ['realodList', 'realodStatus'],
  data() {
    return {
      process_name: '',
      status_color: '',
      process_id: '',
      editProcess: false,
      status_publish: '',
      statusId: '',
    }
  },
  methods: {
    editEmailStatus(statusId) {
      $('#countryStatusEmailModal').modal('show')
      this.statusId = statusId
    },
    closeContentModal() {
      $('#countryStatusEmailModal').modal('hide')
    },
    editStatus(id) {
      this.editProcess = true
      Request.GET_REQ(`/edit-country-status/${id}`)
        .then((res) => {
          this.process_name = res.data.status_name
          this.status_color = res.data.status_color
          this.process_id = res.data.id
          let mange_app = document.getElementById('manage_app_process')
          mange_app.scrollIntoView({ behavior: 'smooth', block: 'start' })
        })
        .catch((err) => {
          Notify(err.res.data)
        })
    },
    updateStatus() {
      const data = {
        status_name: this.process_name,
        status_color: this.status_color,
        id: this.process_id,
      }

      Request.POST_REQ(data, `/update-country-status/${this.process_id}`)
        .then(() => {
          this.editProcess = false
          Notify.success('Process Status Successfully Updated')
          this.$emit('realodList')
          this.process_name = ''
          this.process_id = ''
        })
        .catch((err) => {
          Notify(err.res.data)
        })
    },
    processStatus(id) {
      Request.GET_REQ(`/country-status-is-publish/${id}`)
        .then(() => {
          this.$emit('realodStatus', this.countryId)
        })
        .catch((err) => {
          Notify(err.res.data)
        })
    },
  },
}
</script>
<style lang="scss">
.custom-edit-icon {
  cursor: pointer;
}
input[type='color'] {
  -webkit-appearance: none;
  border: none;
  width: 32px;
  height: 32px;
}
input[type='color']::-webkit-color-swatch-wrapper {
  padding: 0;
}
input[type='color']::-webkit-color-swatch {
  border: none;
}
</style>
