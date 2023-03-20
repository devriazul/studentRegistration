<template>
  <div
    id="my-appointment"
    class="modal fade bd-example-modal-xl"
    tabindex="-1"
    role="dialog"
    aria-labelledby="myExtraLargeModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-2xl" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <div class="rightside">
            <div>
              <h1 class="text-xl">My Appointment</h1>

              <div>
                <input v-model="appointmentId" type="hidden" class="inputbox" required />
                <p class="expcvv_text">Date</p>
                <input v-model="appointmentDate" type="datetime-local" class="inputbox" required />                 
              </div>
              <p></p>
               <div class="modal-footer">
             <button :disabled="isPending" @click="upDateAppointment()" class="b button"><i class="flaticon-cancel-12"></i>
              <span v-if="!isPending">Confirm</span>
              <span v-else>wait...</span>
              </button>
        </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    id="create-lead"
    class="modal fade bd-example-modal-xl"
    tabindex="-1"
    role="dialog"
    aria-labelledby="myExtraLargeModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-2xl" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <div class="rightside">
            <div>
              <h1 class="lead-confirmation text-xl">Are you Sure to Create New Lead With This Book Appointment Information? </h1>

              <div>
                <input v-model="appointmentId" type="hidden" class="inputbox" required />
              </div>
              <p></p>
               <div class="modal-footer">
             <button :disabled="isPending" @click="createLeadPost()" class="b button"><i class="flaticon-cancel-12"></i>
              <span v-if="!isPending">Create New Lead</span>
              <span v-else>wait...</span>
              </button>
        </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div id="card_1" class="col-lg-12 layout-spacing layout-top-spacing">
    <div class="statbox widget box box-shadow">
      <div class="widget-content widget-content-area">
                <div class="row">
          <div class="col col-md-12">
            <div id="tableSimple" class="col-lg-12 col-12 p-0">
              <div class="table-responsive">
                <table id="manage_app_process" class="table-bordered mb-4 table">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Appointmen Reason</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Make Lead</th>
                      <th>Is Done</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="dark:bg-transparent" :class="[appointment.id==return_app_id ? 'tr-bg':'']" v-for="(appointment, index) in appointments" :key="appointment.id">
                      <td>{{ index + 1 }}</td>
                      <td>
                        {{ appointment.name }}
                      </td>
                      <td>
                        {{ appointment.email }}
                      </td>
                      <td>
                        {{ appointment.phone }}
                      </td>
                      <td>
                        <h1>{{ appointment.description }}</h1>
                      </td>
                      <td>
                       {{ appointment.appointment_date }}
                      </td>
                      <td>
                        <span
                          v-if="appointment.status == 0"
                          class="mr-2 rounded bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800 dark:bg-blue-200 dark:text-blue-800"
                          >New</span
                        >

                        <span
                          v-else-if="appointment.status == 1"
                          class="mr-2 rounded bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                          >Pending</span
                        >

                        <span
                          v-else
                          class="mr-2 rounded bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800 dark:bg-green-200 dark:text-green-900"
                          >Done</span
                        >
                      </td>
                      <td>
                        <span @click="createLead(appointment.id)" v-if="appointment.status==1 || appointment.status==2" style="cursor: pointer">
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
                              <circle cx="12" cy="12" r="3" data-v-139ba731=""></circle>
                            </svg>
                        </span>
                      </td>
                      <td>
                          <label v-if="appointment.status != 0" class="switch s-icons s-outline s-outline-success mr-2">
                            <input
                              type="checkbox"
                              :checked="appointment && parseInt(appointment.status) === 2 ? true : false"
                              @change="doneAppointment(appointment.id)"
                            />
                            <span class="slider round"></span>
                          </label>
                        </td>
                      <td>
                        <div class="flex">
                          <span v-if="appointment.status !== 2" @click="getAppointmentData(appointment.id)" style="cursor: pointer">
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
                              class="feather feather-eye"
                              data-v-139ba731=""
                            >
                              <path
                                d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                                data-v-139ba731=""
                              ></path>
                              <circle cx="12" cy="12" r="3" data-v-139ba731=""></circle>
                            </svg>
                          </span>
                
                           <span class="ml-4" @click="deleteAppoinment(appointment.id)" style="cursor: pointer">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="currentColor"
                              class="bi bi-trash text-rose-600"
                              viewBox="0 0 16 16"
                            >
                              <path
                                d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
                              />
                              <path
                                fill-rule="evenodd"
                                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                              />
                            </svg>
                          </span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col col-md-12">
            <div class="lms-pagination">
              <base-pagination v-model="page" :links="pageLinks" @paginate="getAppointments" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, watch, defineAsyncComponent } from 'vue'
import { useStore } from 'vuex'
import { useRoute,useRouter } from 'vue-router'
import { useDebounceFn } from '@vueuse/core'
import Request from '../../apis/Request'
import Notify from '../../helpers/Notify'
import { useEmitter } from '@/composables/useEmitter'

const store = useStore()
const user = computed(() => store.getters.user)
const route = useRoute()
const router = useRouter()
const appointments = ref([])
const isLoading = ref(false)
const page = ref(route.query.page ? route.query.page : 1)
const pageLinks = ref([])
const total_appointments = ref(0)
const appointmentId = ref('')
const counselorId = ref('')
const appointmentDate = ref('')
const appointmentTime = ref('')
const errors = ref({})
const return_app_id = ref('')
const isPending = ref(false)


const getAppointments = async() => {
    isLoading.value = true
    const res = await Request.GET_REQ(`/get-book-appointments-by-counsellor?page=${page.value}`)
    console.log(res)
    if(res.data.result.key==101){
      Notify.error(res.data.result.val)
      isLoading.value = false
    }
    if(res.data.result.key==200){
        appointments.value = res.data.result.val.data
        pageLinks.value = res.data.result.val.links
        total_appointments.value = res.data.result.val.total
        return Promise.resolve(res.data.result.val.data)
        isLoading.value = false
    }
}
const getAppointmentData = async(appointment_id) => {
  isLoading.value = true
  Request.GET_REQ('/get-appointment/' + appointment_id)
    .then((res) => {
      if(res.data.result.key==101){
        Notify.error(res.data.result.val)
        isLoading.value = false
      }
      if(res.data.result.key==200){
        appointmentId.value = res.data.result.val.id
        appointmentTime.value = res.data.result.val.appointment_time
        appointmentDate.value = res.data.result.val.appointment_date
        isLoading.value = false
        $('#my-appointment').modal('show')
      }
    })
    .catch((err) => {
      errors.value = err
    })
}
const upDateAppointment = async() => {
    isPending.value = true
    isLoading.value = true
      let data = {
      appointment_id: appointmentId.value,
      appointment_date: appointmentDate.value,
    }
    Request.POST_REQ(data, '/book-appointment-update-by-counsellor')
      .then((res) => {
        if(res.data.result.key==200){
          console.log(res)
          isLoading.value = false
          return_app_id.value = res.data.result.appointment_id
          Notify.success('Appointment Confirmed Successfully!')
          isPending.value = false
          getAppointments()
          $('#my-appointment').modal('hide')
        }
        if(res.data.result.key==101){
          Notify.error(res.data.result.val)
          isLoading.value = false
          isPending.value = false
        }
        
      })
      .catch((error) => {
        isPending.value = false
        errors.value = error.response.data.errors
        Notify.error(errors.value.appointment_date && error.response.data.errors.appointment_date[0])
        Notify.error(errors.value.appointment_time && error.response.data.errors.appointment_time[0])
      })
  }
  const deleteAppoinment = (id) =>{
    if(confirm('Are you Sure to Cancel This Appointment')){
        isLoading.value = true
        Request.GET_REQ('/cancel-appointment/'+id)
        .then((res) => {
          if(res.data.result.key==200){
            console.log(res)
            Notify.error('Appoinment cancel successfully')
            getAppointments()
          }
          if(res.data.result.key==101){
            Notify.error(res.data.result.val)
            isLoading.value = false
          }
          
        })
        .catch((err) => {
          errors.value = err
        })
    }
    
    }
    const doneAppointment = (id) =>{
      isLoading.value = true
      Request.GET_REQ('/appointment-done-confirmation/'+id)
        .then((res) => {
          if(res.data.result.key==200){
            isLoading.value = false
            return_app_id.value = res.data.result.appointment_id
            Notify.success(res.data.result.val)
            getAppointments()
          }
          if(res.data.result.key==101){
            Notify.error(res.data.result.val)
            isLoading.value = false
          }
          if(res.data.result.key==102){
            Notify.error(res.data.result.val)
            (this).checked = false
            getAppointments()
          }
          
        })
        .catch((err) => {
          errors.value = err
        })
    }
    //craete lead pop up
    const createLead = (id)=>{
      isLoading.value = true
      appointmentId.value = id
      $('#create-lead').modal('show')
      
    }
    const createLeadPost = ()=>{
      isPending.value = true
      isLoading.value = true
        let data = {
        appointment_id: appointmentId.value,
      }
      Request.POST_REQ(data, '/create-new-lead-post')
        .then((res) => {
          if(res.data.result.key==200){
            console.log(res)
            isLoading.value = false
            Notify.success('New Lead Created Successfully!')
            isPending.value = false
            $('#create-lead').modal('hide')
            router.push({ name: 'Leads' })
          }
          if(res.data.result.key==101){
            Notify.error(res.data.result.val)
            isLoading.value = false
            isPending.value = false
          }
          
        })
        .catch((error) => {
          isPending.value = false
          errors.value = error.response.data.errors
          Notify.error(errors.value.appointment_date && error.response.data.errors.appointment_date[0])
          Notify.error(errors.value.appointment_time && error.response.data.errors.appointment_time[0])
        })
    }
await getAppointments()
  
</script>

<style>
body {
  font-family: 'Roboto', sans-serif !important;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.product {
  object-fit: cover;
  width: 20em;
  height: 20em;
  border-radius: 20px;
}

.rightside {
  background-color: #ffffff;
  width: 35rem;

  padding: 1rem 2rem 3rem 3rem;
}

p {
  display: block;
  font-size: 1.1rem;
  font-weight: 400;
  margin: 0.8rem 0;
}

.inputbox {
  color: #030303;
  width: 100%;
  padding: 0.5rem;
  border: none;
  border-bottom: 1.5px solid #ccc;

  border-radius: 0.3rem;
  font-family: 'Roboto', sans-serif;
  color: #615a5a;
  font-size: 1.1rem;
  font-weight: 500;
  outline: none;
}

.expcvv {
  display: flex;
  justify-content: space-between;
  padding-top: 0.6rem;
}

.expcvv_text {
  padding-right: 1rem;
}
.expcvv_text2 {
  padding: 0 1rem;
}

.button {
  background: linear-gradient(135deg, #753370 0%, #298096 100%);
  padding: 15px;
  border: none;
  border-radius: 50px;
  color: white;
  font-weight: 400;
  font-size: 1.2rem;
  margin-top: 10px;
  width: 100%;
  letter-spacing: 0.11rem;
  outline: none;
}

.button:hover {
  transform: scale(1.05) translateY(-3px);
  box-shadow: 3px 3px 6px #38373785;
}
.tr-bg{
  background-color:#1f2d3a !important;
}

.lead-confirmation{
  color: rgb(189, 5, 5) !important;
  margin: 20px;
  padding: 4px;
  text-align: center;
}

@media only screen and (max-width: 1000px) {
  .card {
    flex-direction: column;
    width: auto;
  }

  .leftside {
    width: 100%;
    border-top-right-radius: 0;
    border-bottom-left-radius: 0;
    border-top-right-radius: 0;
    border-radius: 0;
  }

  .rightside {
    width: auto;
    border-bottom-left-radius: 1.5rem;
    padding: 0.5rem 3rem 3rem 2rem;
    border-radius: 0;
  }
  
}
</style>
