<template>
<div class="max-width">
    <div class="custom-body row">
        <div class="card-body">
            <h2 class="custom-title">Agent Invitation Form</h2><br>
            <form enctype="multipart/form-data" @submit.prevent="submit">
                <div class="row col-md-12">
                    <h4 class="custom-title-info">Basic Information</h4>
                </div>
                <div class="row col-md-12">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="pwd">Name</label>
                            <input v-model="state.name" id="name"  name="name" type="text" class="form-control">
                            <span class="error-msg" v-if="v$.name.$error">
                                {{ v$.name.$errors[0].$message }}
                            </span>
                            </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="pwd">Email</label>
                            <input v-model="state.email" id="email"  name="email" type="text" class="form-control">
                            <span class="error-msg" v-if="v$.email.$error">
                                {{ v$.email.$errors[0].$message }}
                            </span>
                            </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="pwd">Phone</label>
                            <input v-model="state.phone" id="phone"  name="phone" type="text" class="form-control">
                            <span class="error-msg" v-if="v$.phone.$error">
                                {{ v$.phone.$errors[0].$message }}
                            </span>
                            </div>
                    </div>
                </div>
                <div class="row col-md-12 p-t-15 ml-2">
                    <button id="submit" class="btn btn--radius-2 btn--blue">Submit
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
</template>
<script setup>
import { ref, reactive, computed, watch, defineAsyncComponent } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router';
import { useDebounceFn } from '@vueuse/core'
import Request from '../../apis/Request'
import Notify from '../../helpers/Notify'
import { useEmitter } from '@/composables/useEmitter'
import axios from "axios"
import useVuelidate from '@vuelidate/core';
import { required, email, minLength, helpers } from '@vuelidate/validators';

const state = reactive({
    name:'',
    email:'',
    phone:'',
})

const rules = computed(() =>{
    return {
        name: {
            required: helpers.withMessage("Name field is required!", required),
            },
        email: {
            required: helpers.withMessage("Email field is required!", required),
            email: helpers.withMessage("Email field must be valid email address!", email) ,
            },
        phone:{
            required:helpers.withMessage("Phone field is required!", required),
            minLength:helpers.withMessage("Phone field must be contain 6 charecters!", minLength(6))
        },
    }
})
const v$ = useVuelidate(rules,state)
const submit = (e)=>{
    v$.value.$validate()
    if(!v$.value.$error){
        console.log('it worked')
    }
}

</script>

       