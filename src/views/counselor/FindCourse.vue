<template>
  <div class="layout-px-spacing">
    <div class="layout-top-spacing text-right">
      <div id="card_1" class="col-lg-12 layout-spacing layout-top-spacing">
        <div class="statbox widget box box-shadow">
          <div class="widget-content widget-content-area">
            <div class="row">
              <div class="col-3">
                <select v-model="course_category_id" class="form-control">
                  <option disabled value="">Select a Category</option>
                  <option v-for="category in categories" :key="category.id" :value="category.id">
                    {{ category.category_name }}
                  </option>
                </select>
                <small
                  v-if="errors?.course_category_id"
                  id="sh-text1"
                  class="form-text text-danger text-left"
                  >{{ errors.course_category_id[0] }}</small
                >
              </div>

              <div class="col-3">
                <select v-model="course_level_id" class="form-control">
                  <option disabled value="">Select a Course Level</option>
                  <option
                    v-for="courselevel in courselevels"
                    :key="courselevel.id"
                    :value="courselevel.id"
                  >
                    {{ courselevel.course_level_name }}
                  </option>
                </select>
                <small
                  v-if="errors?.course_level_id"
                  id="sh-text1"
                  class="form-text text-danger text-left"
                  >{{ errors.course_level_id[0] }}</small
                >
              </div>
              <div class="col-6">
                <input
                  id="serchterm"
                  v-model="query"
                  class="form-control rounded-md border-gray-300 focus:ring-blue-500"
                  type="search"
                  name="serchterm"
                  placeholder="Course Name..."
                />
              </div>
              <div class="col-6 mt-3 mb-4 text-left">
                <button type="button" class="btn btn-primary mr-2 inline-flex" @click="search">
                  <FeatherSearchSvg /> Search
                </button>
                <button class="btn btn-info mr-2 inline-flex" @click="compareShortlist">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="white"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-star filled-start"
                    >
                      <polygon
                        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                      ></polygon>
                    </svg>
                  </span>
                  Shortlist ({{ shortLists?.length }})
                </button>
                <button class="btn btn-warning inline-flex" @click="resetAllShortlist">
                  Reset
                </button>
              </div>
            </div>
            <div v-if="search_courses === 0" class="row">
              <div class="col-12">
                <h5 class="text-center">
                  <code> Before new search your can reset all </code>
                </h5>
              </div>
            </div>
            <div class="row">
              <div class="col-10">
                <div v-if="search_courses > 0" class="col-12 m-0 p-0 text-left">
                  <span class="badge badge-primary mb-2"
                    >Total Search Records: {{ search_courses }}</span
                  >
                </div>

                <div
                  v-for="course in searchCourses"
                  :key="course.id"
                  class="card component-card_4"
                  style="width: 100%"
                >
                  <div class="card-body">
                    <div class="user-profile">
                      <img
                        v-if="course.institute_limit && course.institute_limit.institute_logo"
                        :src="baseURL + '/' + course.institute_limit.institute_logo"
                        class=""
                        :alt="course.course_name"
                        width="100"
                      />
                      <img v-else src="@/assets/img/no-image.png" class="" alt="..." width="100" />
                    </div>
                    <div class="user-info text-left">
                      <h5 class="card-user_name">{{ course.course_name }}</h5>
                      <p class="card-user_occupation">
                        {{ course.institute_limit && course.institute_limit.institute_name }}
                      </p>
                      <div class="card-star_rating">
                        <span class="badge badge-primary mr-2" style="font-size: 12px">{{
                          course.category && course.category.category_name
                        }}</span>
                        <span class="badge badge-primary" style="font-size: 12px">{{
                          course.course_level && course.course_level.course_level_name
                        }}</span>
                      </div>
                      <p class="card-text">
                        <span class="badge badge-secondary mr-2" style="font-size: 11px"
                          >Course Duration:
                          {{ course.course_duration && course.course_duration }}</span
                        >
                        <span class="badge badge-info mr-2" style="font-size: 11px"
                          >Campus:
                          {{ course.institute_limit && course.institute_limit.campus_name }}</span
                        >
                        <span class="badge badge-success mr-2" style="font-size: 11px"
                          >Country:
                          {{
                            course.institute_limit?.represent_country?.country &&
                            course.institute_limit?.represent_country?.country.name
                          }}</span
                        >
                      </p>
                    </div>
                    <div v-if="checkExists(course)" class="add-to-shortlist">
                      <span
                        class="badge badge-secondary inline-flex space-x-2"
                        style="cursor: pointer"
                        @click="removeToShortList(course)"
                      >
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="white"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="feather feather-star filled-start"
                          >
                            <polygon
                              points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                            ></polygon>
                          </svg>
                        </span>
                        <i> Remove to Shortlist</i>
                      </span>
                    </div>

                    <div v-else class="add-to-shortlist">
                      <span
                        class="badge badge-secondary inline-flex space-x-2"
                        style="cursor: pointer"
                        @click="addToShortList(course)"
                      >
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="feather feather-star"
                          >
                            <polygon
                              points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                            ></polygon>
                          </svg>
                        </span>
                        <i> Add to Shortlist</i>
                      </span>
                    </div>
                  </div>
                </div>
                <div class="col col-md-12">
                  <div class="lms-pagination mt-3">
                    <base-pagination v-model="page" :links="pageLinks" @paginate="search" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <CourseCompareModal :courses="shortLists" @removeCourse="removeToCourseCompare" />
  </div>
</template>
<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useDebounceFn, useLocalStorage } from '@vueuse/core'
import Request from '@/apis/Request'
import { useStore } from 'vuex'
import FeatherSearchSvg from '@/svg/FeatherSearchSvg.vue'
import CourseCompareModal from '@/components/course/CourseCompareModal.vue'
import Notify from '../../helpers/Notify'

const store = useStore()
const route = useRoute()
const baseURL = computed(() => store.state.baseURL)

const errors = ref({})
const course_category_id = ref('')
const course_level_id = ref('')
const categories = ref([])
const courselevels = ref([])
const query = ref('')
const searchCourses = ref([])
const page = ref(route.query.page ? route.query.page : 1)
const pageLinks = ref([])
const search_courses = ref(0)
const shortLists = useLocalStorage('shortLists', [])
const comapreCourses = ref([])

//methods
async function fetchPrimary() {
  try {
    const res = await Request.GET_REQ('/active-categories')
    categories.value = res.data
  } catch (error) {
    Notify.error(error.message)
  }

  try {
    const res = await Request.GET_REQ('/active-course-levels')
    courselevels.value = res.data
  } catch (error) {
    Notify.error(error.message)
  }
}
// search
async function search() {
  let searchQuery = 'q=' + query.value
  if (course_category_id.value) {
    searchQuery += '&course_category_id=' + course_category_id.value
  }
  if (course_level_id.value) {
    searchQuery += '&course_level_id=' + course_level_id.value
  }
  if (page.value > 1) {
    searchQuery += '&page=' + page.value
  }

  try {
    const res = await Request.GET_REQ('/counselor-tools/search?' + searchQuery)
    searchCourses.value = res.data.data
    pageLinks.value = res.data.links
    search_courses.value = res.data.total
  } catch (err) {
    errors.value = err.response.data.errors
  }
}

function addToShortList(course) {
  shortLists.value?.push(course)
}
function checkExists(course) {
  if (searchCourses.value.length > 0) {
    return shortLists.value?.find((item) => item.id === course.id)
  }
  return false
}
function removeToShortList(course) {
  let indexItem = shortLists.value.find((item) => item.id === course.id)
  const index = shortLists.value.indexOf(indexItem)
  if (index > -1) {
    shortLists.value.splice(index, 1)
  }
  localStorage.setItem('storeShortLists', JSON.stringify(shortLists.value))
}
function removeToCourseCompare(courseId) {
  removeToShortList({ id: courseId })
}
function compareShortlist() {
  const data = {
    shorlists: shortLists.value,
  }
  Request.POST_REQ(data, '/compare-course')
    .then((res) => {
      comapreCourses.value = res.data
      $('#course-compare-modal').modal('show')
    })
    .catch((err) => {
      Notify(err.res.data)
    })
}
function resetAllShortlist() {
  searchCourses.value = []
  shortLists.value = []
  query.value = ''
  course_category_id.value = ''
  course_level_id.value = ''
  shortLists.value = []
}

watch([query, course_category_id, course_level_id], useDebounceFn(search, 500))

await fetchPrimary()
</script>

<style scoped>
.component-card_4 .card-body {
  align-items: baseline;
  justify-content: space-evenly;
}
.user-profile,
.add-to-shortlist {
  width: 17%;
}
.user-info {
  width: 64%;
}
</style>
