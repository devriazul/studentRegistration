<template>
  <div
    id="become-agent"
    class="modal fade bd-example-modal-xl"
    tabindex="-1"
    role="dialog"
    aria-labelledby="myExtraLargeModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <div>
           <h1 class=" text-3xl mt-4 mb-3 ml-3">Company Information</h1>
          
            <div class="grid grid-cols-3 gap-x-3 ml-10">
                      
             <div>
                <label>Company Name</label><br>
                <input v-model="company.company_name" class="input-filed" disabled type="text"/><br>
             </div>
            
            <div>
              <label>Company Stablish</label><br>
              <input v-model="company.company_establish_date" class="input-filed" disabled type="text"/><br>
            </div>
            <div>
              <label>No of Empolyee</label><br>
              <input v-model="company.company_number_of_employee" class="input-filed" disabled type="text"/><br>
            </div>
             
            <div>
              <label>Registraion Number</label><br>
              <input v-model="company.company_registration_number" class="input-filed" disabled type="text"/><br>
            </div>
           <div>
              <label>Company Phone</label><br>
              <input v-model="company.company_phone" class="input-filed" disabled type="text"/><br>
           </div>
            <div>
              <label>Company Email</label><br>
              <input v-model="company.company_email" class="input-filed" disabled type="text"/>
            </div>
            <div>
              <label>Country</label><br>
              <input v-model="company.company_country" class="input-filed" disabled type="text"/>
            </div>
            <div>
              <label>Company State</label><br>
              <input v-model="company.company_state" class="input-filed" disabled type="text"/><br>
           </div> 
            <div>
              <label>City</label><br>
              <input v-model="company.company_city" class="input-filed" disabled type="text"/><br>
            </div>
            <div>
              <label>Company Address</label><br>
              <input v-model="company.company_address" class="input-filed" disabled type="text"/><br>
            </div>
            <div>
              <label>Zip Code</label><br>
              <input v-model="company.company_zip_code" class="input-filed" disabled type="text"/><br>
            </div>
          </div><br>
           <h1 class=" mb-3 mt-3 text-3xl ml-3">Agent Information</h1>
      <div class="grid grid-cols-3 gap-x-20 ml-10">
            
           <div>
              <label>Agent name</label><br>
              <input v-model="get_agent.agent_name" class="input-filed" disabled type="text"/><br>
           </div>
          
           <div>
              <label>Phone Number</label><br>
              <input v-model="get_agent.agent_phone" class="input-filed" disabled type="text"/><br>
           </div>
            
              <div>
           <label>Email</label><br>
            <input v-model="get_agent.agent_email" class="input-filed" disabled type="text"/><br>
           </div>
           <div>
              <label>Country</label><br>
              <input v-model="get_agent.country" class="input-filed" disabled type="text"/><br>
           </div>
           <div>
              <label>State</label><br>
              <input v-model="get_agent.state" class="input-filed" disabled type="text"/><br>
           </div>
           <div>
              <label>City</label><br>
              <input v-model="get_agent.city" class="input-filed" disabled type="text"/><br>
           </div>
           <div>
              <label>Alternative Contact</label><br>
              <input v-model="get_agent.alternative_contact" class="input-filed" disabled type="text"/><br>
           </div>
           <div>
              <label>Nid Or Passport</label><br>
              <input v-model="get_agent.nid_or_passport" class="input-filed" disabled type="text"/><br>
           </div>
           <div>
              <label>Nationality</label><br>
              <input v-model="get_agent.nationality" class="input-filed" disabled type="text"/><br>
           </div>
           <div>
              <label>Agent Bg Color</label><br>
              <input v-model="get_agent.agent_bg_color" class="input-filed" disabled type="text"/><br>
           </div>
        </div><br>
        <h1 class=" mb-3 mt-3 text-3xl ml-3">Agent Additionals Information</h1>
        <div>
          <div v-for="(additionalrow) in addtional_infos" :key="additionalrow.id" class="grid grid-cols-1 gap-x-6 ml-10 mb-10">
            <textarea v-model="additionalrow.additional" disabled rows="3"></textarea>
          </div>
        </div>
        
        <h1 class=" mb-3 mt-3 text-3xl ml-3">Agent Login Information</h1>
        <div class="grid grid-cols-4 gap-x-6 ml-10 mb-16">
          <input type="hidden" v-model="agentId">
          <div>
              <label>Agent name</label><br>
              <input v-model="name" class="login-filed " type="text"/>
              <small v-if="errors.agent_name" id="sh-text1" class="form-text text-danger">{{
                errors.agent_name[0]
              }}</small>
              <br>

          </div>
          
          <div>
            <label>Email</label><br>
            <input v-model="email" class="login-filed" type="email"/>
            <small v-if="errors.email" id="sh-text1" class="form-text text-danger">{{
                errors.email[0]
              }}</small>
              <br>
          </div>
            
          <div>
            <label>Password</label><br>
            <input v-model="password" class="login-filed" type="password"/>
            <small v-if="errors.password" id="sh-text1" class="form-text text-danger">{{
                errors.password[0]
              }}</small>
          </div>
          <div>
            <label>Confimr Password</label><br>
            <input v-model="confirm_password" class="login-filed" type="password"/>
            <small v-if="errors.password_confirmation" id="sh-text1" class="form-text text-danger">{{
                errors.password_confirmation[0]
              }}</small>
          </div>
        </div>
        <div>
          <button :disabled="isPending" @click="agentAuthCreate()" class="btn submit-button bg-pink-600" >
            <span v-if="!isPending">Create</span>
            <span v-else>wait..</span>
          </button>
        </div>
        <div>
            <button @click="updateBecomeAgent()" class="btn text-cyan-600 agent-button" data-dismiss="modal">Close</button>
        </div>
               
            </div>
          </div>
        </div>
      </div>
      </div>
             
      <div class="layout-px-spacing layout-top-spacing">
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
                              <th>Agents Name</th>
                              <th>NID / Passport Number</th>
                              <th>Email</th>
                              <th>Phone </th>
                              <th>Branch Name</th>
                              <th>Country</th>
                              <th>State</th>
                              <th>City</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(agent, index) in agents" :key="agent.id">
                              <td>{{ index + 1 }}</td>
                              <td>{{ agent.agent_name }}</td>
                              <td>{{ agent.nid_or_passport }}</td>
                              <td>{{ agent.agent_email }}</td>
                              <td>{{ agent.agent_phone }}</td>
                              <td>{{ agent.branch.branch_name }}</td>
                              <td>{{ agent.country }}</td>
                              <td>{{ agent.state }}</td>
                              <td>{{ agent.city }}</td>
                              <td>
                                <span
                                  v-if="agent.status == 0"
                                  class="mr-2 rounded bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800 dark:bg-blue-200 dark:text-blue-800"
                                  >Pending</span
                                >
                                <span
                                  v-else
                                  class="mr-2 rounded bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800 dark:bg-green-200 dark:text-green-900"
                                  >Active</span
                                >
                              </td>
                              <td>
                                <span @click="becomeAgent(agent.id)" style="cursor: pointer">
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
        <div class="row">
          <div class="col col-md-12">
            <div class="lms-pagination">
              <base-pagination v-model="page" :links="pageLinks" @paginate="getAgents" />
            </div>
          </div>
        </div>
      </div>
</template>
<script setup>
import { ref, computed, watch, defineAsyncComponent } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { useDebounceFn } from '@vueuse/core'
import Request from '../../apis/Request'
import Notify from '../../helpers/Notify'
import { useEmitter } from '@/composables/useEmitter'

const store = useStore()
const user = computed(() => store.getters.user)
const route = useRoute()
const get_agent = ref({})
const company = ref({})
const agents = ref([])
const isLoading = ref(false)
const page = ref(route.query.page ? route.query.page : 1)
const pageLinks = ref([])
const total_agents = ref(0)
const errors = ref({})
//get agent data 
const logo = ref('')
const agent_bg_color = ref('')
const addtional_infos = ref([])
const email = ref('')
const name = ref('')
const password = ref('')
const confirm_password = ref('')
const agentId = ref('')
const isPending = ref(false)


const becomeAgent = async(agent_id) =>{
  isLoading.value = true
  Request.GET_REQ('/get-request-agent-info/'+agent_id)
    .then((res) => {
      if(res.data.result.key==101){
        Notify.error(res.data.result.val)
        isLoading.value = false
      }
      if(res.data.result.key==200){
        console.log(res.data.result)
        agentId.value = res.data.result.val.id
        email.value = res.data.result.val.agent_email
        name.value = res.data.result.val.agent_name
        get_agent.value = res.data.result.val
        company.value = res.data.result.company
        addtional_infos.value = res.data.result.additionals
        isLoading.value = false
        $('#become-agent').modal('show')
      }
    })
    .catch((err) => {
      errors.value = err
    })
    
}
const agentAuthCreate = async()=>{
  isPending.value = true
  let data = {
    agent_name: name.value,
    email: email.value,
    password: password.value,
    password_confirmation: confirm_password.value,
    agent_id: agentId.value
  }
  Request.POST_REQ(data, '/agent-login-creditional-create')
      .then((res) => {
        if(res.data.result.key==200){
          isPending.value = false
          $('#become-agent').modal('hide')
          Notify.success(res.data.result.val)
          getAgents()
        }
        if(res.data.result.key==101){
          Notify.error(res.data.result.val)
          isLoading.value = false
          isPending.value = false
        }
        
      })
      .catch(error => {
        isPending.value = false
        errors.value = error.response.data.errors
        //console.log(error.response.data.errors.email[0])
        Notify.error(errors.value.agent_id && error.response.data.errors.agent_id[0])
        Notify.error(errors.value.agent_name && error.response.data.errors.agent_name[0])
        Notify.error(errors.value.email && error.response.data.errors.email[0])
        Notify.error(errors.value.password && error.response.data.errors.password[0])
        Notify.error(errors.value.password_confirmation && error.response.data.errors.password_confirmation[0])
      })
}

const updateBecomeAgent = async =>{
   $('#become-agent').modal('hide')
}
const getAgents = async() => {
    isLoading.value = true
    const res = await Request.GET_REQ(`/get-all-requested-agents?page=${page.value}`)
    console.log(res)
    if(res.data.result.key==101){
      Notify.error(res.data.result.val)
      isLoading.value = false
    }
    if(res.data.result.key==200){
      agents.value = res.data.result.val.data
      pageLinks.value = res.data.result.val.links
      total_agents.value = res.data.result.val.total
      isLoading.value = false
      return Promise.resolve(res.data.result.val.data)
    }
}
await getAgents()


</script>
<style>

.input-filed{
   width:100%;
  border-radius:3px;
   
}
.close-button{
  position:absolute;
  right: 150px;
  bottom:10px;
  font-size:1rem;

}
.agent-button{
  position:absolute;
  right: 150px;
  bottom:10px;
  font-size:1rem;
}
.submit-button{
  position:absolute;
  right: 50px;
  bottom:10px;
  font-size:1rem;
  color:white;

}
.login-filed{
  width:108%;
  border-radius:3px;
}

</style>