<template>
    <div class="container my-2 mx-auto">
  <div class="card p-4">
    <img class="mb-5 rounded" src="https://7897478.fs1.hubspotusercontent-na1.net/hubfs/7897478/WhatsApp%20Image%202023-03-11%20at%2012.04.41%20PM.jpeg" alt="">
    <form>
      <div class="row">
        <div class="col-md-6">
          <div class="mb-3">
            <label for="first_name" class="form-label">First Name</label>
            <input type="text" class="form-control" id="first_name" required>
          </div>
        </div>
        <div class="col-md-6">
          <div class="mb-3">
            <label for="last_name" class="form-label">Last Name</label>
            <input type="text" class="form-control" id="last_name" required>
          </div>
        </div>
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email Address</label>
        <input type="email" class="form-control" id="email" required>
      </div>
      <div class="mb-3">
        <label for="whatsapp_number" class="form-label">Phone/ Whatsapp Number</label>
        <input type="text" class="form-control" id="whatsapp_number" required>
      </div>
      <div class="mb-3">
        <label for="discipline" class="form-label">Discipline / Department</label>
        <input type="text" class="form-control" id="discipline" required>
      </div>
      <div class="mb-3">
        <label for="institution" class="form-label">Last Educational Institution</label>
        <input type="text" class="form-control" id="institution" required>
      </div>
      <div class="mb-3">
        <label for="research_topic" class="form-label">Previous Research Topic</label>
        <textarea class="form-control" id="research_topic" rows="2"></textarea>
      </div>
      <div class="mb-4">
        <label for="engagement" class="form-label">Present Engagement in Research (if any)</label>
        <textarea class="form-control" id="engagement" rows="2"></textarea>
        </div>
        <div class="form-check">
          <input type="checkbox" class="form-check-input " id="privacyPolicy" name="privacyPolicy" required>
          <label class="form-check-label" for="privacyPolicy">I accept the privacy policy.</label>
        </div>
        <div class="mb-2 text-center">
            <button type="submit" class="btn btn-primary">Submit</button>
        </div>
    </form>
     </div>
     </div>


</template>
<script setup>
    import { ref,reactive, computed, watch, defineAsyncComponent } from 'vue'
    import { useStore } from 'vuex'
    import { useRoute } from 'vue-router'
    import { useRouter } from 'vue-router';
    import { useDebounceFn } from '@vueuse/core'
    import Request from '../../apis/Request'
    import Notify from '../../helpers/Notify'
    import { useEmitter } from '@/composables/useEmitter'
    import axios from "axios"
    import useVuelidate from '@vuelidate/core';
    import { required, alpha, email, maxLength, minLength, helpers, sameAs, numeric  } from '@vuelidate/validators';

    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const isLoading = ref(false)
    const isPending = ref(false)
    const get_countries_for_branch = ref([])
    const get_branches = ref([])
    const errors = ref({})
    const secret_code = ref('')
    const $externalResults = ref({})
    
    const stateset = reactive({
        branch_id: '',
        counselor_name: '',
        counselor_phone: '',
        counselor_email: '',
        country: '',
        city: '',
        state: '',
        address: '',
        alternative_contact: '',
        nid_or_passport: '',
        nationality: '',
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        photo: '',
    })
    const rules = computed(() => {
    return {
        name: {
            required: helpers.withMessage('Name field is required!', required),
            maxLength: helpers.withMessage(
                'Name field contain not more than 20 charecters!',
                maxLength(20)
        ),
        },
        email: {
            required: helpers.withMessage('Email field is required!', required),
            sameAs: helpers.withMessage(
                'User email must be matched with counselor email',
                sameAs(stateset.counselor_email)
            ),
            email: helpers.withMessage('Email field must be valid email address!', email),
        },
        password: {
            required: helpers.withMessage('Password field is required!', required),
            minLength: helpers.withMessage('Password field must be contain 6 charecters!', minLength(6)),
            maxLength: helpers.withMessage('Password field contain 64 charecters!', maxLength(64)),
        },
        password_confirmation: {
            required: helpers.withMessage('Confirmation Password field is required!', required),
            minLength: helpers.withMessage(
                'Confirmation Password field must be contain 6 charecters!',
                minLength(6)
            ),
            sameAsPassword: helpers.withMessage(
            'Password and Confirmation Password must be Same',
            sameAs(stateset.password)
            ),
        },
        branch_id: {
            required: helpers.withMessage('Please Select a Branch!', required),
        },
        counselor_name: {
            required: helpers.withMessage('Counselor Name is Required!', required),
            maxLength: helpers.withMessage(
                'Name field contain not more than 20 charecters!',
                maxLength(20)
        ),
        },
        counselor_phone: {
            required: helpers.withMessage('Counselor Phone is Required!', required),
            minLength: helpers.withMessage(
                'Counselor Phone field must be contain 6 charecters!',
                minLength(6)
        ),
        numeric,
            maxLength: helpers.withMessage(
                'Counselor Phone field contain not more than 20 charecters!',
                maxLength(20)
        ),
        },
        counselor_email: {
            required: helpers.withMessage('Counselor Email is Required!', required),
            email: helpers.withMessage('Email field must be valid email address!', email),
            maxLength: helpers.withMessage(
                'Email field contain not more than 64 charecters!',
                maxLength(64)
        ),
        },
        country: {
            required: helpers.withMessage('Please Select Country!', required),
        },
        city: {
            required: helpers.withMessage('City field is required!', required),
            maxLength: helpers.withMessage(
                'City field contain not more than 20 charecters!',
                maxLength(30)
        ),
        },
        state: {
            required: helpers.withMessage('State field is required!', required),
        },
        address: {
            required: helpers.withMessage('Address field is required!', required),
        },
        alternative_contact: {
            required: helpers.withMessage('Alternative Contact field is required!', required),
        },
        nid_or_passport: {
            required: helpers.withMessage('Nid Or Passport field is required!', required),
        },
        nationality: {
            required: helpers.withMessage('Nationality field is required!', required),
        },
    }
    })
    const v$ = useVuelidate(rules, stateset, { $externalResults, $autoDirty: true, $lazy: false })

    const submitForm = async()=>{
        v$.value.$validate()
        if(!v$.value.$error){
            isPending.value = true
            const data = new FormData()
            data.append('secret_code', secret_code.value)
            data.append('branch_id',stateset.branch_id)
            data.append('counselor_name',stateset.counselor_name)
            data.append('counselor_phone',stateset.counselor_phone)
            data.append('counselor_email',stateset.counselor_email)
            data.append('country',stateset.country)
            data.append('city',stateset.city)
            data.append('state',stateset.state)
            data.append('address',stateset.address)
            data.append('alternative_contact',stateset.alternative_contact)
            data.append('nid_or_passport',stateset.nid_or_passport)
            data.append('nationality',stateset.nationality)
            data.append('name',stateset.name)
            data.append('email',stateset.email)
            data.append('password',stateset.password)
            data.append('password_confirmation',stateset.password_confirmation)
            data.append('photo',stateset.photo)
            
            Request.POST_REQ(data, '/invite-counsellor')
            .then(res=> {
                if(res.data.result.key==101){
                    Notify.error(res.data.result.val)
                    isLoading.value = false
                    isPending.value = false
                }
                if(res.data.result.key==200){
                    isLoading.value = false
                    Notify.success('Counselor Request Sent Successfully!')
                    router.push({ name: 'AgentSuccess' })
                    isPending.value = false
                }
            
            })
            .catch(err=> {
                console.log(err)
                isPending.value = false
                errors.value = err.response.data.errors
                $externalResults.value = err.response.data.errors
                isLoading.value = false
                window.scrollTo(0, 0)
                if (errors.value) {
                Notify.error(errors.value.counselor_email && errors.value.counselor_email[0])
                Notify.error(errors.value.email && errors.value.email[0])
                Notify.error(errors.value.password && errors.value.password[0])
                }
                
            })
        }else{
            window.scrollTo(0,0)
        }
     }
    

    const getCountriesForBranch = async() =>{
            isLoading.value = true
            Request.GET_REQ('/get-all-countries-for-invite')
                .then((res) => {
                console.log(res)
                if(res.data.result.key==101){
                    Notify.error(res.data.result.val)
                    isLoading.value = false
                }
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
        const getBranches = async()=>{
            isLoading.value = true
            Request.GET_REQ('/get-branches-for-web')
                .then((res) => {
                    get_branches.value = res.data
                    isLoading.value = false
                })
                .catch((err) => {
                errors.value = err
                })
        }
        function onChangePhoto(event){
            stateset.photo = event.target.files[0]
        }
        const getToken = async()=>{
            secret_code.value = route.params.id
        }
        await getCountriesForBranch()
        await getBranches()
        await getToken()
</script>


<style>
.counselor-invite{
    margin: 30px;
}
    
.invite-form{
    color: #bd2121;
}
.submit-button {
    font-size: 1rem;
    color: white;
}
.form-group label{
        font-size: 17px !important;
        letter-spacing: 1px
    }

.text-danger{
    font-size: 15px !important;
}
</style>