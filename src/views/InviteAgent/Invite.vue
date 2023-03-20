<template>
    <div class="max-width">
        <div class="custom-body row">
            <div class="card-body">
                <h2 class="custom-title">Agent Invitation Form</h2><br>
    
                <form enctype="multipart/form-data" @submit.prevent="createNewAgent">
                    
                    <div class="row col-md-12">
                        <h4 class="custom-title-info">Basic Information</h4>
                    </div>
                    <div class="row col-md-12">
                        <div class="col-md-6">
                            <input type="hidden" v-model="secret_code" />
                            <div class="form-group">
                                <label for="pwd">Agent Name</label>
                                <input v-model="stateset.agent_name" id="agent_name"  name="agent_name" type="text" class="form-control">
                                <span class="form-text text-danger" v-if="v$.agent_name.$error">
                                    {{ v$.agent_name.$errors[0].$message }}
                                </span>
                              </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="pwd">Agent Email</label>
                                <input v-model="stateset.agent_email" id="agent_email"  name="agent_email" type="email" class="form-control">
                                <span class="form-text text-danger" v-if="v$.agent_email.$error">
                                    {{ v$.agent_email.$errors[0].$message }}
                                </span>
                                
                              </div>
                        </div>
                    </div>
                    <div class="row col-md-12">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="pwd">Agent Phone</label>
                                <input v-model="stateset.agent_phone" type="text" class="form-control" >
                                <span class="form-text text-danger" v-if="v$.agent_phone.$error">
                                    {{ v$.agent_phone.$errors[0].$message }}
                                </span>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="pwd">Alternative Agent Contact</label>
                                <input v-model="stateset.alternative_contact" id="alternative_contact" name="alternative_contact" type="text" class="form-control" >
                                <span class="form-text text-danger" v-if="v$.alternative_contact.$error">
                                    {{ v$.alternative_contact.$errors[0].$message }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="row col-md-12">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="pwd">Agent Country</label>
                                <select id="country" v-model="stateset.country" class="form-control" >
                                    <option value="">--Select One--</option>
                                    <option :value="countryRow.id" v-for="(countryRow) in get_countries_for_branch" :key="countryRow.id">
                                        {{ countryRow.name }}
                                    </option>
                                </select>
                                <span class="form-text text-danger" v-if="v$.country.$error">
                                    {{ v$.country.$errors[0].$message }}
                                </span>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="pwd">Select Branch</label>
                                <select v-model="stateset.branch_id" class="form-control" >
                                    <option value="">--Select One--</option>
                                    <option v-for="(branch) in get_branches" :key="branch.id" :value="branch.id">
                                        {{ branch.branch_name }}
                                    </option>
                                </select>
                                <span class="form-text text-danger" v-if="v$.branch_id.$error">
                                    {{ v$.branch_id.$errors[0].$message }}
                                </span>
                              </div>
                        </div>
                    </div>
                    <div class="row col-md-12">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="pwd">Alt Contact Person Name</label>
                                <input v-model="person_name" type="text" class="form-control" >
                              </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="pwd">Alt Contact Person Email</label>
                                <input v-model="person_email" type="text" class="form-control" >
                              </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="pwd">Alt Contact Person Phone</label>
                                <input v-model="person_phone" type="text" class="form-control" >
                              </div>
                        </div>
                    </div>
                    <div class="row col-md-12">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="pwd">State</label>
                                <input v-model="stateset.state" id="state" name="state" type="text" class="form-control" >
                                <span class="form-text text-danger" v-if="v$.state.$error">
                                    {{ v$.state.$errors[0].$message }}
                                </span>
                              </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="pwd">City</label>
                                <input v-model="stateset.city" id="city" name="city" type="text" class="form-control" >
                                <span class="form-text text-danger" v-if="v$.city.$error">
                                    {{ v$.city.$errors[0].$message }}
                                </span>
                              </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card">
                                <div class="card-body">
                                  <p style="color: rgb(136, 21, 21)" class="card-text">If you don,t find any branch in your country. Just select the Country UK and main branch of this country.</p>
                                </div>
                              </div>
                        </div>
                    </div>
                    <div class="row col-md-12">
                        <div class="col-md-8">
                            <div class="form-group">
                                <label for="pwd">Address</label>
                                <textarea v-model="stateset.address" id="address" class="form-control" name="address" rows="3" ></textarea>
                                <span class="form-text text-danger" v-if="v$.address.$error">
                                    {{ v$.address.$errors[0].$message }}
                                </span>
                              </div>
                        </div>
                    </div>
                    <div class="row col-md-12">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="pwd">Logo</label>
                                <input @change="onChangeLogo" type="file" class="form-control">
                              </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="pwd">Agent Background Color</label>
                                <input v-model="stateset.agent_bg_color" id="color" class="" type="color" >
                                <span class="form-text text-danger" v-if="v$.agent_bg_color.$error">
                                    {{ v$.agent_bg_color.$errors[0].$message }}
                                </span>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="pwd">Nationality</label>
                                <input v-model="stateset.nationality" id="nationality" class="form-control" type="text" name="nationality" >
                                <span class="form-text text-danger" v-if="v$.nationality.$error">
                                    {{ v$.nationality.$errors[0].$message }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="row col-md-12">
                        <div class="col-md-8">
                            <div class="form-group">
                                <label for="pwd">Nid or Passport</label>
                                <input v-model="stateset.nid_or_passport" id="nid_or_passport" class="form-control" type="text" name="nid_or_passport" >
                                <span class="form-text text-danger" v-if="v$.nid_or_passport.$error">
                                    {{ v$.nid_or_passport.$errors[0].$message }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="row col-md-12">
                        <h4 class="custom-title-info">Company Information</h4><br>
                    </div>
                    <div class="row col-md-12">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="pwd">Company Name</label>
                                <input v-model="stateset.company_name" id="company_name" class="form-control" type="text" name="company_name" >
                                <span class="form-text text-danger" v-if="v$.company_name.$error">
                                    {{ v$.company_name.$errors[0].$message }}
                                </span>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="pwd">Company Registration Number</label>
                                <input v-model="stateset.company_registration_number" id="company_registration_number" class="form-control" type="text" name="company_registration_number" >
                                <span class="form-text text-danger" v-if="v$.company_registration_number.$error">
                                    {{ v$.company_registration_number.$errors[0].$message }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="row col-md-12">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="pwd">Company Trade License</label>
                                <input @change="onChangeCompanyTradeLicense" id="company_trade_license" class="form-control" type="file" name="company_trade_license">
                                <span class="form-text text-danger" v-if="v$.company_trade_license.$error">
                                    {{ v$.company_trade_license.$errors[0].$message }}
                                </span>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="pwd">Company Trade License Number</label>
                                <input v-model="stateset.company_trade_license_number" id="company_trade_license_number" class="form-control" type="text" name="company_trade_license_number" >
                                <span class="form-text text-danger" v-if="v$.company_trade_license_number.$error">
                                    {{ v$.company_trade_license_number.$errors[0].$message }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="row col-md-12">
                        <div class="col-md-5">
                            <div class="form-group">
                                <label for="pwd">Company Establish Date</label>
                                <input v-model="stateset.company_establish_date" id="company_establish_date" class="form-control" type="date" name="company_establish_date" >
                                <span class="form-text text-danger" v-if="v$.company_establish_date.$error">
                                    {{ v$.company_establish_date.$errors[0].$message }}
                                </span>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="pwd">Company Number Of Employee</label>
                                <input v-model="stateset.company_number_of_employee" id="company_number_of_employee" class="form-control" type="text" name="company_number_of_employee" >
                                <span class="form-text text-danger" v-if="v$.company_number_of_employee.$error">
                                    {{ v$.company_number_of_employee.$errors[0].$message }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="row col-md-12">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="pwd">Company Email</label>
                                <input v-model="stateset.company_email" id="company_email" class="form-control" type="text" name="company_email" >
                                <span class="form-text text-danger" v-if="v$.company_email.$error">
                                    {{ v$.company_email.$errors[0].$message }}
                                </span>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="pwd">Company Phone</label>
                                <input v-model="stateset.company_phone" id="company_phone" class="form-control" type="text" name="company_phone" >
                                <span class="form-text text-danger" v-if="v$.company_phone.$error">
                                    {{ v$.company_phone.$errors[0].$message }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="row col-md-12">
                        <div class="col-md-7">
                            <div class="form-group">
                            <label for="pwd">Company Country</label>
                            <select v-model="stateset.company_country" name="company_country" class="form-control" id="company_country" >
                                <option value="">--Select One--</option>
                                <option v-for="(getcountry) in get_countries" :key="getcountry" :value="getcountry.id">
                                    {{ getcountry.name }}
                                </option>
                            </select>
                            <span class="form-text text-danger" v-if="v$.company_country.$error">
                                {{ v$.company_country.$errors[0].$message }}
                            </span>
                            </div>
                        </div>
                    </div>
                    <div class="row col-md-12">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="pwd">Company State</label>
                                <input v-model="stateset.company_state" id="company_state" class="form-control" type="text" name="company_state" >
                                <span class="form-text text-danger" v-if="v$.company_state.$error">
                                    {{ v$.company_state.$errors[0].$message }}
                                </span>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="pwd">Company City</label>
                                <input v-model="stateset.company_city" id="company_city" class="form-control" type="text" name="company_city" >
                                <span class="form-text text-danger" v-if="v$.company_city.$error">
                                    {{ v$.company_city.$errors[0].$message }}
                                </span>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="pwd">Company Zipcode</label>
                                <input v-model="stateset.company_zip_code" id="company_zip_code" class="form-control" type="text" name="company_zip_code" >
                                <span class="form-text text-danger" v-if="v$.company_zip_code.$error">
                                    {{ v$.company_zip_code.$errors[0].$message }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="row col-md-12">
                        <div class="col-md-8">
                            <div class="form-group">
                                <label for="pwd">Company Address</label>
                                <textarea v-model="stateset.company_address" id="company_address" class="form-control" name="company_address" rows="3" ></textarea>
                                <span class="form-text text-danger" v-if="v$.company_address.$error">
                                    {{ v$.company_address.$errors[0].$message }}
                                </span>
                            </div>
                        </div>
                    </div>
                <div class="row col-md-12">
                  <div class="col">
                    <div
                      v-for="(input, index) in additionals"
                      :key="index"
                      class=""
                    >
                      <div class="col col-md-8 pl-0">
                        <label for="exampleFormControlTextarea1">Additional Information</label>
                        <textarea
                          id="exampleFormControlTextarea1"
                          v-model="input.additional"
                          class="form-control"
                          rows="3"
                          :key="index"
                          spellcheck="false"
                        ></textarea>
                      </div>
                      <div class="row ml-4 mt-2">
                        <div v-show="index == additionals.length - 1">
                          <button
                            class="btn btn-warning btn-rounded mb-2 mr-2 mt-2 inline-flex"
                            @click.prevent="add"
                          >
                            Add More
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
                        </div>
                        <div v-show="index || (!index && additionals.length > 1)">
                          <button class="btn btn-danger btn-rounded mb-2 mr-2 mt-2" @click.prevent="remove">
                            Remove
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
                              class="feather feather-x-circle"
                            >
                              <circle cx="12" cy="12" r="10"></circle>
                              <line x1="15" y1="9" x2="9" y2="15"></line>
                              <line x1="9" y1="9" x2="15" y2="15"></line>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row col-md-12 p-t-15 ml-2">
                    <button :disabled="isPending" id="submit" class="btn btn--radius-2 btn--blue">
                        <span v-if="!isPending">Submit</span>
                        <span v-else>wait..</span>
                    </button>
                </div>
                </form>
            </div>
        </div>
    </div>
    
    </template>
    
    <script setup>
        import { ref,reactive, computed, watch, defineAsyncComponent } from 'vue'
        import { useStore } from 'vuex'
        import { useRoute } from 'vue-router'
        import { useRouter } from 'vue-router';
        import { useDebounceFn } from '@vueuse/core'
        import Notify from '../../helpers/Notify'
        import { useEmitter } from '@/composables/useEmitter'
        import axios from "axios"
        import Request from '../../apis/Request'
        import useVuelidate from '@vuelidate/core';
        import { required, alpha, email, maxLength, minLength, helpers, sameAs, numeric  } from '@vuelidate/validators';
    
        const store = useStore()
        const router = useRouter()
        const route = useRoute()
        const isLoading = ref(false)
        const isPending = ref(false)
        const get_countries_for_branch = ref([])
        const get_branches = ref([])
        const get_countries = ref([])
        const secret_code = ref('')
        const person_name = ref('')
        const person_email = ref('')
        const person_phone = ref('')
        const logo = ref('')
        const $externalResults = ref({})
        
        const additionals = ref([
        {
            additional: '',
        },
        ])
        const errors = ref({})
        const getToken = async()=>{
            secret_code.value = route.params.id
        }
        const stateset = reactive({
            branch_id: '',
            agent_name: '',
            agent_email: '',
            agent_phone: '',
            country: '',
            city: '',
            state: '',
            address: '',
            agent_bg_color: '',
            alternative_contact: '',
            nid_or_passport: '',
            nationality: '',
            company_name: '',
            company_registration_number: '',
            company_trade_license: '',
            company_trade_license_number: '',
            company_establish_date: '',
            company_number_of_employee: '',
            company_phone: '',
            company_email: '',
            company_address: '',
            company_zip_code: '',
            company_city: '',
            company_state: '',
            company_country: '',
        })
        const rules = computed(() =>{
        return {
            branch_id: {
                required: helpers.withMessage("Please Select a Branch!", required),
            },
            agent_name: {
                required: helpers.withMessage("Agent Name field is required!", required),
                maxLength:helpers.withMessage("Agent Name field contain not more than 20 charecters!", maxLength(30))
            },
            agent_email: {
                required: helpers.withMessage("Agent Email field is required!", required),
                email: helpers.withMessage("Agent Email field must be valid email address!", email) ,
            },
            agent_phone: {
                required: helpers.withMessage("Agent Phone is Required!", required),
                numeric: helpers.withMessage("Agent Phone Must be Number!", numeric),
                minLength:helpers.withMessage("Agent Phone field must be contain 6 charecters!", minLength(6)),
                maxLength:helpers.withMessage("Agent Phone field contain not more than 20 charecters!", maxLength(20))
            },
            country: {
                required: helpers.withMessage("Please Select Country!", required),
            },
            city: {
                required: helpers.withMessage("City field is required!", required),
                maxLength:helpers.withMessage("City field contain not more than 20 charecters!", maxLength(30))
            },
            state: {
                required: helpers.withMessage("State field is required!", required),
            },
            address: {
                required: helpers.withMessage("Address field is required!", required),
            },
            agent_bg_color: {
                required: helpers.withMessage("Agent Bg Color is required!", required),
            },
            alternative_contact: {
                required: helpers.withMessage("Alternative Contact is required!", required),
            },
            nid_or_passport: {
                required: helpers.withMessage("Nid or Passport is required!", required),
            },
            nationality: {
                required: helpers.withMessage("Nationality is required!", required),
            },
            company_name: {
                required: helpers.withMessage("Company Name is Required!", required),
                maxLength:helpers.withMessage("Company Name field contain not more than 20 charecters!", maxLength(20))
            },
            company_registration_number: {
                required: helpers.withMessage("Company Registration Field is Required!", required),
            },
            company_trade_license: {
                required: helpers.withMessage("Company Trade License File is Required!", required),
            },
            company_trade_license_number: {
                required: helpers.withMessage("Company Trade License Number is Required!", required),
            },
            company_establish_date: {
                required: helpers.withMessage("Company Establish Date is Required!", required),
            },
            company_number_of_employee: {
                required: helpers.withMessage("Company Number of Employee is Required!", required),
            },
            company_phone: {
                required: helpers.withMessage("Company Phone is Required!", required),
            },
            company_email: {
                required: helpers.withMessage("Company Email is Required!", required),
                email: helpers.withMessage("Company Email field must be valid email address!", email) ,
                maxLength:helpers.withMessage("Company Email field contain not more than 64 charecters!", maxLength(64))
            },
            company_address: {
                required: helpers.withMessage("Company Address field is required!", required),
            },
            company_country: {
                required: helpers.withMessage("Please Select Country!", required),
            },
            company_city: {
                required: helpers.withMessage("Company City field is required!", required),
                maxLength:helpers.withMessage("Company City field contain not more than 20 charecters!", maxLength(30))
            },
            company_state: {
                required: helpers.withMessage("Company State field is required!", required),
            },
            company_zip_code: {
                required: helpers.withMessage("Company Zip Code field is required!", required),
            },
          }
        })
        const v$ = useVuelidate(rules, stateset, { $externalResults, $autoDirty: true, $lazy: false })

        const createNewAgent = async()=>{
            v$.value.$validate()
            if(!v$.value.$error){
                isLoading.value = true
                isPending.value = true
                const data = new FormData()
                data.append('secret_code',secret_code.value)
                data.append('branch_id',stateset.branch_id)
                data.append('agent_phone',stateset.agent_phone)
                data.append('agent_name',stateset.agent_name)
                data.append('agent_email',stateset.agent_email)
                data.append('agent_bg_color',stateset.agent_bg_color)
                data.append('city',stateset.city)
                data.append('state',stateset.state)
                data.append('country',stateset.country)
                data.append('address',stateset.address)
                data.append('person_name',person_name.value)
                data.append('person_phone',person_phone.value)
                data.append('person_email',person_email.value)
                data.append('alternative_contact',stateset.alternative_contact)
                data.append('nid_or_passport', stateset.nid_or_passport)
                data.append('nationality',stateset.nationality)
                data.append('logo',logo.value)
                data.append('company_name',stateset.company_name)
                data.append('company_registration_number',stateset.company_registration_number)
                data.append('company_trade_license',stateset.company_trade_license)
                data.append('company_trade_license_number',stateset.company_trade_license_number)
                data.append('company_establish_date',stateset.company_establish_date)
                data.append('company_number_of_employee',stateset.company_number_of_employee)
                data.append('company_email',stateset.company_email)
                data.append('company_phone',stateset.company_phone)
                data.append('company_country',stateset.company_country)
                data.append('company_state',stateset.company_state)
                data.append('company_city',stateset.company_city)
                data.append('company_zip_code',stateset.company_zip_code)
                data.append('company_address',stateset.company_address)
                data.append('addtional_info', JSON.stringify(additionals.value))
                
                Request.POST_REQ(data,'/became-an-agent')
                .then(res=> {
                console.log(res)
                if(res.data.result.key==101){
                    Notify.error(res.data.result.val)
                    isLoading.value = false
                    isPending.value = false
                }
                if(res.data.result.key==200){
                    isLoading.value = false
                    Notify.success('Agent Request Sent Successfully!')
                    router.push({ name: 'AgentSuccess' })
                    isPending.value = false
                }
                })
                .catch(error=> {
                    console.log(error)
                    $externalResults.value = error.response.data.errors
                    window.scrollTo(0, 0)
                    isPending.value = false
                    // errors.value = error.response.data.errors
                    // Notify.error(errors.value.agent_name && error.response.data.errors.agent_name[0])
                    // Notify.error(errors.value.agent_email && error.response.data.errors.agent_email[0])
                    // Notify.error(errors.value.agent_bg_color && error.response.data.errors.agent_bg_color[0])
                })
            }else{
                window.scrollTo(0,0)
            }
            
        }
        const getCountriesForBranch = async() =>{
            isLoading.value = true
            Request.GET_REQ('/get-all-countries-for-invite')
                .then((res) => {
                if(res.data.result.key==200){
                    console.log(res.data.result.val)
                    get_countries_for_branch.value = res.data.result.val
                    isLoading.value = false
                }
                })
                .catch((error) => {
                    errors.value = error
                })
        }
        //get branches by country 
        const getBranchesByCountry = async()=>{
            Request.GET_REQ('/get-branches-for-web')
                .then((res) => {
                    get_branches.value = res.data
                    isLoading.value = false
                })
                .catch((err) => {
                errors.value = err
                })
        }
        //get all countries
        const getAllCountries = async()=>{
            isLoading.value = true
            Request.GET_REQ('/get-all-countries-for-invite')
            .then((res) => {
            if(res.data.result.key==200){
                console.log(res.data.result.val)
                get_countries.value = res.data.result.val
                isLoading.value = false
            }
            })
            .catch((error) => {
                isPending.value = false
                errors.value = error.response.data.errors
            //console.log(error.response.data.errors.email[0])
            
            })
        }
        function onChangeLogo(event){
            logo.value = event.target.files[0]
        }
        
        function onChangeCompanyTradeLicense(event){
            stateset.company_trade_license = event.target.files[0]
        }
        const add = async()=> {
            additionals.value.push({ additional:'' })
        }
        const remove = async(index)=> {
        additionals.value.splice(index, 1)
        }
    
        await getCountriesForBranch()
        await getAllCountries()
        await getToken()
        await getBranchesByCountry()
    
    </script>
    
    <style scoped lang="scss">
        
        .custom-body{
            margin: 30px;
        }
        .form-group label, label{
            font-size: 17px !important;
            letter-spacing: 1px
        }
        .custom-title{
            font-size: 25px !important;
        }
        .custom-title-info{
            font-size: 20px;
            margin: 10px;
            color:#bd2121;
        }
        .text-danger{
            font-size: 15px !important;
        }
    </style>