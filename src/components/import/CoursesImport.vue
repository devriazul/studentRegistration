<template>
  <div v-if="pendingStatus || isLoading">
    <Loader />
  </div>
  <div v-else class="layout-px-spacing">
    <form enctype="multipart/form-data" @submit.prevent="handleSubmit">
      <div id="card_1" class="col-lg-12 layout-spacing layout-top-spacing">
        <div class="statbox widget box box-shadow">
          <div class="widget-content widget-content-area">
            <div class="row mb-4">
              <div class="col-xl-12 col-md-12 col-sm-12 col-12">
                <div class="d-flex align-items-start justify-content-between">
                  <h4>Import Courses</h4>
                  <router-link :to="{ name: 'Courses' }">
                    <button class="btn btn-info mb-2 mr-4 btn-rounded">
                      View Courses
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
                    </button>
                  </router-link>
                </div>

                <br />
              </div>
              <div class="col">
                <div class="row d-flex align-items-center">
                  <div class="col col-md-6 offset-md-3 text-center">
                    <div class="form-group mb-4 text-center custom-file-import">
                      <div class="p-4" @click="clickFile">
                        <h4>Upload File</h4>
                        <span v-if="!isImportLoading">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="50"
                            height="50"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="feather feather-upload-cloud"
                          >
                            <polyline points="16 16 12 12 8 16"></polyline>
                            <line x1="12" y1="12" x2="12" y2="21"></line>
                            <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
                            <polyline points="16 16 12 12 8 16"></polyline>
                          </svg>
                        </span>

                        <span v-if="isImportLoading">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="50"
                            height="50"
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
                          <small>Please Wait...</small>
                        </span>
                        <strong>{{ file.name }}</strong>
                        <small v-if="fileError.file" id="sh-text1" class="form-text text-danger">{{
                          fileError.file[0]
                        }}</small>
                      </div>

                      <input
                        ref="fileUpload"
                        type="file"
                        class="form-control-file"
                        hidden
                        @change="onFileChange"
                      />
                    </div>
                    <strong v-if="importSuccess" class="text-success text-center"
                      >Your file Successfully Uploaded. Check your Data.</strong
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="row text-center">
              <div class="col custom-import-btn">
                <router-link :to="{ name: 'Institutes' }">
                  <button type="submit" class="btn btn-warning mr-2 btn-sm">Cancel</button>
                </router-link>
                <button type="submit" class="btn btn-primary mr-2 btn-sm">Import</button>
              </div>
            </div>
            <div v-if="errors.length >= 0" class="row mt-4">
              <h4 class="text-danger pb-2">
                You have some errors Please check below the errors and try it again.
              </h4>
              <div class="table-responsive text-center custom-error-table">
                <table class="table table-bordered mb-4">
                  <thead>
                    <tr>
                      <th>Field Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="error in errors" :key="error.id">
                      <td>
                        {{ error && error.errorInfo[2].replace(/-/g, ' ') }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div v-if="sheetErrors.length >= 0" class="row mt-4">
              <h4 class="text-danger pb-2">
                You have some errors Please check below the errors and try it again.
              </h4>
              <div class="table-responsive text-center custom-error-table">
                <table class="table table-bordered mb-4">
                  <thead>
                    <tr>
                      <th>Row ID</th>
                      <th>Field Name</th>
                      <th>Error</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="sheetError in sheetErrors" :key="sheetError.id">
                      <td>{{ sheetError && sheetError.row }}</td>
                      <td>
                        {{ sheetError && sheetError.attribute.replace(/_/g, ' ') }}
                      </td>
                      <td>
                        {{ sheetError && sheetError.errors[0].replace(/_/g, ' ') }}
                      </td>
                      <td>
                        {{ sheetError && sheetError.values.institute_name }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import Loader from '@/components/Loader.vue'
import Request from '@/apis/Request'
import { mapGetters } from 'vuex'
import Notify from '../../helpers/Notify'

export default {
  name: 'ImportCourses',
  components: { Loader },
  data() {
    return {
      file: '',
      testFile: '',
      errors: {},
      isLoading: false,
      isImportLoading: false,
      importSuccess: false,
      sheetErrors: {},
      fileError: {},
    }
  },
  computed: {
    ...mapGetters(['user', 'pendingStatus']),
  },
  methods: {
    handleSubmit() {
      this.isImportLoading = true
      let formData = new FormData()
      formData.append('file', this.file)
      Request.POST_REQ(formData, '/import-courses')

        .then((res) => {
          this.isImportLoading = false
          if (res.status === 200) {
            this.importSuccess = true
            this.fileError = false
            this.sheetErrors = {}
            Notify.success('Your File Successfully Imported')
          }
        })
        .catch((error) => {
          this.isImportLoading = false
          this.importSuccess = false
          const hasFailure = error.response.data.Failure
          const hasError = error.response.data.Errors
          const hasRequired = error.response.data.errors
          if (hasFailure) {
            this.sheetErrors = error.response.data.Failure
          }
          if (hasError) {
            this.errors = error.response.data.Errors
          }
          if (hasRequired) {
            this.fileError = error.response.data.errors
          }
        })
    },
    clickFile() {
      this.$refs.fileUpload.click()
    },
    onFileChange(event) {
      this.file = event.target.files[0]
      if (this.file) {
        this.fileError = false
      }
    },
  },
}
</script>

<style lang="scss">
body.dark .custom-error-table .table {
  background: red !important;
  td {
    color: #ffffff;
  }
}
.custom-error-table .table {
  background: red !important;
  td {
    color: #ffffff;
  }
}
.custom-file-import {
  border: 1px solid #ddd;
  border-radius: 15px;
  &:hover {
    background-color: #ddd;
  }
  cursor: pointer;
  label {
    font-size: 24px;
  }
  span {
    width: 100%;
    padding: 15px 0;
    display: block;
  }
  strong {
    width: 100%;
    display: block;
    color: #2196f3;
  }
  small {
    display: block;
    color: red;
    font-size: 14px;
    padding-top: 15px;
  }
}

body.dark .custom-file-import {
  border: 1px solid #191e3a;
  background-color: #060819;
  &:hover {
    background-color: #1a1b24;
  }
}
.custom-import-btn {
  button {
    text-transform: uppercase;
    font-size: 14px;
    letter-spacing: 1px;
    font-weight: bold;
  }
}
</style>
