<template>
  <Navigation />
  <SideBar @toggle-sticky="toggleSticky" />
  <div id="container" class="main-container">
    <div id="content" class="main-content">
      <bread-crumb @thememode="thememode" />
      <router-view v-slot="{ Component, route }">
        <template v-if="Component">
          <Suspense timeout="0">
            <template #default>
              <Component :is="Component" :key="route.path" :theme-mode-data="themeModeData" />
            </template>
            <template #fallback> <loader-component /> </template>
          </Suspense>
        </template>
      </router-view>
    </div>
  </div>
  <StickyMeetingFollowup v-model="stickyIsActive" />
</template>
<script setup>
import { ref, onMounted, nextTick, onErrorCaptured, defineAsyncComponent } from 'vue'
import Notify from './helpers/Notify'
import { useStore } from 'vuex'
import { useDark } from '@vueuse/core'

//lazy loading components
const SideBar = defineAsyncComponent(() => import('@/components/TheSideBar.vue'))
const StickyMeetingFollowup = defineAsyncComponent(() =>
  import('@/components/StickyMeetingFollowup.vue')
)
const LoaderComponent = defineAsyncComponent(() => import('@/components/Loader.vue'))
const Navigation = defineAsyncComponent(() => import('@/components/Navigation.vue'))
const BreadCrumb = defineAsyncComponent(() => import('@/components/BreadCrumb.vue'))

//data
const store = useStore()
const isDark = useDark({
  selector: 'body',
  attribute: 'class',
  valueDark: 'dark',
  valueLight: 'light',
})
const themeModeData = ref(isDark.value)
const stickyIsActive = ref(false)

function toggleSticky() {
  stickyIsActive.value = !stickyIsActive.value
}

onMounted(async () => {
  const $ = window.$
  await store.dispatch('user')
  nextTick(() => {
    $(document).click(function () {
      $('.topbar-nav .collapse').collapse('hide')
    })
    $(
      '.navbar .dropdown.notification-dropdown > .dropdown-menu, .navbar .dropdown.message-dropdown > .dropdown-menu '
    ).click(function (e) {
      e.stopPropagation()
    })
  })

  await store.dispatch('unreadMsg')
  await store.dispatch('unreadNotify')
  await store.dispatch('followUpLists')
  await store.dispatch('meetingLists')
})

//methods
function thememode(getMode) {
  themeModeData.value = getMode
}

//onErrorCaptured
onErrorCaptured((error) => {
  Notify.error(error.message)
})
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

body::-webkit-scrollbar {
  width: 0.5em;
}

body::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

body::-webkit-scrollbar-thumb {
  background-color: #292929;
  outline: 1px solid #292929;
}
body.dark
  .topbar-nav.header
  nav#topbar
  ul.menu-categories
  li.menu
  > a.router-link-active.router-link-exact-active
  > div
  svg,
body.dark
  .topbar-nav.header
  nav#topbar
  ul.menu-categories
  li.menu
  > a.router-link-active.router-link-exact-active
  > div
  span,
body.dark .topbar-nav.header nav#topbar ul.menu-categories li > a.router-link-exact-active {
  color: #25d5e4 !important;
}

.topbar-nav.header
  nav#topbar
  ul.menu-categories
  li.menu
  > a.router-link-active.router-link-exact-active
  > div
  svg,
.topbar-nav.header
  nav#topbar
  ul.menu-categories
  li.menu
  > a.router-link-active.router-link-exact-active
  > div
  span,
.topbar-nav.header nav#topbar ul.menu-categories li > a.router-link-exact-active {
  color: #474fb1 !important;
}

body.dark .page-link {
  background-color: #0e1726 !important;
  border: 1px solid #1b2e4b;
  color: #5cb7ff;
}
body.dark .page-item.disabled .page-link {
  border: 1px solid #1b2e4b;
}
.lms-pagination {
  text-align: right;
}
.pagination {
  justify-content: flex-end;
}

li.breadcrumb-item.active > a {
  color: #474fb1 !important;
}
li.page-item.active .page-link {
  background-color: #0095cc !important;
  border-color: #0095cc !important;
}
body.dark li.breadcrumb-item.active > a {
  color: #25d5e4 !important;
}
.vue-select {
  border: 1px solid #bfc9d4 !important;
  width: 100% !important;
  background: transparent;
}
body.dark .vue-select {
  border: 0 !important;
  background: #1b2e4b;
}
body.dark .vue-input input {
  height: calc(1.4em + 1.4rem + 2px);
  padding: 0.75rem 1.25rem;
  background: transparent;
  font-size: 15px;
  color: #009688 !important;
}
.vue-input input {
  height: calc(1.4em + 1.4rem + 2px);
  padding: 0.75rem 1.25rem !important;
  background: transparent;
  font-size: 15px !important;
  color: #3b3f5c !important;
}
.vue-input {
  padding: 0 !important;
}
body.dark .vue-dropdown {
  background-color: #1b2e4b;
}
body.dark .vue-dropdown-item.highlighted {
  background-color: #23cada;
  color: #000;
}
.vue-dropdown-item.highlighted {
  background-color: #23cada;
  color: #000;
}
span.assign-lead-number {
  background: #1aa1d9;
  border-radius: 50%;
  width: 23px;
  height: 20px;
  display: inline-block;
  text-align: center;
  line-height: 1.5;
}
.dropdown-menu.notification-dropdown {
  max-height: 550px;
  overflow-y: auto;
}

.dropdown-menu.notification-dropdown::-webkit-scrollbar {
  width: 0.5em;
}
*::-webkit-scrollbar {
  width: 0.5em;
}

*::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
.dropdown-menu.notification-dropdown::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

*::-webkit-scrollbar-thumb {
  background-color: #292929;
  outline: 1px solid #292929;
}
.dropdown-menu.notification-dropdown::-webkit-scrollbar-thumb {
  background-color: #292929;
  outline: 1px solid #292929;
}
</style>