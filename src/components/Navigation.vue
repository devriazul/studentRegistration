<template>
  <div v-if="user" class="header-container">
    <header class="header navbar navbar-expand-sm flex items-center justify-between">
      <a href="javascript:void(0);" class="sidebarCollapse" data-placement="bottom"
        ><FeatherMenuSvg
      /></a>

      <div class="nav-logo align-self-center">
        <router-link to="/dashboard">
          <img v-if="!themeModeStatus" src="@/assets/img/logo-light.webp" height="60" />
          <img v-else src="@/assets/img/logo.webp" height="60" />
        </router-link>
      </div>

      <ul class="navbar-item topbar-navigation">
        <!--  BEGIN TOPBAR  -->
        <div class="topbar-nav header navbar" role="banner">
          <nav id="topbar">
            <ul class="navbar-nav theme-brand flex-row text-center">
              <li class="nav-item theme-logo">
                <router-link to="/dashboard">
                  <img src="@/assets/img/90x90.jpg" class="navbar-logo" alt="logo" />
                </router-link>
              </li>
              <li class="nav-item theme-text">
                <router-link to="/dashboard" class="nav-link"> LMS </router-link>
              </li>
            </ul>

            <ul
              id="topAccordion"
              class="list-unstyled menu-categories flex items-center justify-center space-x-2"
            >
              <li class="menu single-menu">
                <router-link to="/dashboard">
                  <div class="flex">
                    <DashboardSvg />
                    <span>Dashboard</span>
                  </div>
                </router-link>
              </li>
              <li
                v-if="
                  (user && user.user_type === 'superAdmin') ||
                  (user && user.user_type === 'branchManager') ||
                  (user && user.user_type == 'counselor') ||
                  (user && user.user_type == 'frontOfficer')
                "
                class="menu single-menu"
              >
                <a
                  href="#countries"
                  data-toggle="collapse"
                  aria-expanded="false"
                  class="dropdown-toggle autodroprown"
                  :class="
                    routePath == 'Add_Country' || routePath == 'Countries'
                      ? 'router-link-active router-link-exact-active'
                      : ''
                  "
                >
                  <div class="flex">
                    <CountrySvg />
                    <span>Countries</span>
                  </div>
                </a>
                <ul
                  id="countries"
                  class="collapse submenu list-unstyled animated fadeInUp"
                  data-parent="#topAccordion"
                >
                  <li
                    v-if="
                      (user && user.user_type == 'superAdmin') ||
                      (user && user.user_type == 'branchManager')
                    "
                  >
                    <router-link :to="{ name: 'Add_Country' }">Add Country</router-link>
                  </li>
                  <li>
                    <router-link :to="{ name: 'Countries' }"> View Country </router-link>
                  </li>
                </ul>
              </li>
              <li
                v-if="
                  (user && user.user_type === 'superAdmin') ||
                  (user && user.user_type === 'branchManager') ||
                  (user && user.user_type == 'counselor') ||
                  (user && user.user_type == 'frontOfficer')
                "
                class="menu single-menu"
              >
                <a
                  href="#institute"
                  data-toggle="collapse"
                  aria-expanded="false"
                  class="dropdown-toggle autodroprown"
                  :class="
                    routePath == 'Add_Institute' || routePath == 'Institutes'
                      ? 'router-link-active router-link-exact-active'
                      : ''
                  "
                >
                  <div class="flex">
                    <InstituteSvg />
                    <span>Institution</span>
                  </div>
                </a>
                <ul
                  id="institute"
                  class="collapse submenu list-unstyled animated fadeInUp"
                  data-parent="#topAccordion"
                >
                  <li
                    v-if="
                      (user && user.user_type == 'superAdmin') ||
                      (user && user.user_type == 'branchManager')
                    "
                  >
                    <router-link :to="{ name: 'Add_Institute' }">Add Institue</router-link>
                  </li>
                  <li>
                    <router-link :to="{ name: 'Institutes' }"> View Institute </router-link>
                  </li>
                </ul>
              </li>

              <li
                v-if="
                  (user && user.user_type === 'superAdmin') ||
                  (user && user.user_type === 'branchManager') ||
                  (user && user.user_type == 'counselor') ||
                  (user && user.user_type == 'frontOfficer')
                "
                class="menu single-menu"
              >
                <a
                  href="#courses"
                  data-toggle="collapse"
                  aria-expanded="false"
                  class="dropdown-toggle autodroprown"
                  :class="
                    routePath == 'Add_Course' ||
                    routePath == 'Courses' ||
                    routePath == 'Categories' ||
                    routePath == 'CourseLevel'
                      ? 'router-link-active router-link-exact-active'
                      : ''
                  "
                >
                  <div class="flex">
                    <CourseSvg />
                    <span>Courses</span>
                  </div>
                </a>
                <ul
                  id="courses"
                  class="collapse submenu list-unstyled animated fadeInUp"
                  data-parent="#topAccordion"
                >
                  <li class="sub-sub-submenu-list">
                    <a
                      href="#courses-sub"
                      data-toggle="collapse"
                      aria-expanded="true"
                      class="dropdown-toggle"
                      :class="
                        routePath == 'Add_Course' || routePath == 'Courses'
                          ? 'router-link-active router-link-exact-active'
                          : ''
                      "
                    >
                      Courses
                      <ChevronRightSvg />
                    </a>
                    <ul
                      id="courses-sub"
                      class="collapse list-unstyled sub-submenu animated fadeInUp"
                      data-parent="#courses"
                    >
                      <li
                        v-if="
                          (user && user.user_type == 'superAdmin') ||
                          (user && user.user_type == 'branchManager')
                        "
                      >
                        <router-link to="/add-course">Add New Course</router-link>
                      </li>
                      <li>
                        <router-link to="/courses">View Courses</router-link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <router-link :to="{ name: 'Categories' }">Course Category</router-link>
                  </li>

                  <li>
                    <router-link :to="{ name: 'CourseLevel' }">Course Level</router-link>
                  </li>
                </ul>
              </li>

              <li
                v-if="
                  (user && user.user_type === 'superAdmin') ||
                  (user && user.user_type === 'branchManager') ||
                  (user && user.user_type == 'counselor')
                "
                class="menu single-menu"
              >
                <a
                  href="#offices"
                  data-toggle="collapse"
                  aria-expanded="false"
                  class="dropdown-toggle"
                  :class="
                    routePath == 'AddBranch' ||
                    routePath == 'Branches' ||
                    routePath == 'Add_Front_Office' ||
                    routePath == 'Front_Offices' ||
                    routePath == 'Add_Agent' ||
                    routePath == 'Agents'
                      ? 'router-link-active router-link-exact-active'
                      : ''
                  "
                >
                  <div class="flex">
                    <HomeSvg />
                    <span>Offices</span>
                  </div>
                </a>
                <ul
                  id="offices"
                  class="collapse submenu list-unstyled animated fadeInUp"
                  data-parent="#topAccordion"
                >
                  <li class="sub-sub-submenu-list">
                    <a
                      href="#branches"
                      data-toggle="collapse"
                      aria-expanded="true"
                      class="dropdown-toggle"
                      :class="
                        routePath == 'AddBranch' || routePath == 'Branches'
                          ? 'router-link-active router-link-exact-active'
                          : ''
                      "
                    >
                      Branch Offices
                      <ChevronRightSvg />
                    </a>
                    <ul
                      id="branches"
                      class="collapse list-unstyled sub-submenu animated fadeInUp"
                      data-parent="#offices"
                    >
                      <li v-if="user && user.user_type == 'superAdmin'">
                        <router-link to="/add-branch">Add New Branch</router-link>
                      </li>
                      <li>
                        <router-link to="/branches">View Branches</router-link>
                      </li>
                    </ul>
                  </li>

                  <li class="sub-sub-submenu-list">
                    <a
                      href="#branches"
                      data-toggle="collapse"
                      aria-expanded="true"
                      class="dropdown-toggle"
                      :class="
                        routePath == 'Add_Front_Office' || routePath == 'Front_Offices'
                          ? 'router-link-active router-link-exact-active'
                          : ''
                      "
                    >
                      Front Offices
                      <ChevronRightSvg />
                    </a>
                    <ul
                      id="branches"
                      class="collapse list-unstyled sub-submenu animated fadeInUp"
                      data-parent="#offices"
                    >
                      <li
                        v-if="
                          (user && user.user_type == 'superAdmin') ||
                          (user && user.user_type == 'branchManager')
                        "
                      >
                        <router-link to="/add-front-office"> Add New Front Office </router-link>
                      </li>
                      <li>
                        <router-link to="/front-offices"> View Front Offices </router-link>
                      </li>
                    </ul>
                  </li>

                  <li class="sub-sub-submenu-list">
                    <a
                      href="#branches"
                      data-toggle="collapse"
                      aria-expanded="true"
                      class="dropdown-toggle"
                      :class="
                        routePath == 'Add_Agent' || routePath == 'Agents'
                          ? 'router-link-active router-link-exact-active'
                          : ''
                      "
                    >
                      Sub Agent
                      <ChevronRightSvg />
                    </a>
                    <ul
                      id="branches"
                      class="collapse list-unstyled sub-submenu animated fadeInUp"
                      data-parent="#offices"
                    >
                      <li
                        v-if="
                          (user && user.user_type == 'superAdmin') ||
                          (user && user.user_type == 'branchManager')
                        "
                      >
                        <router-link to="/add-agent">Add New Sub Agent</router-link>
                      </li>
                      <li>
                        <router-link to="/agents"> View Sub Agent</router-link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li
                v-if="
                  (user && user.user_type === 'superAdmin') ||
                  (user && user.user_type === 'branchManager') ||
                  (user && user.user_type == 'counselor')
                "
                class="menu single-menu"
              >
                <a
                  href="#counselors"
                  data-toggle="collapse"
                  aria-expanded="false"
                  class="dropdown-toggle"
                  :class="
                    routePath == 'Add_Counselor' || routePath == 'Counselors'
                      ? 'router-link-active router-link-exact-active'
                      : ''
                  "
                >
                  <div class="flex">
                    <CounselorsSvg />
                    <span>Counselors</span>
                  </div>
                </a>
                <ul
                  id="counselors"
                  class="collapse submenu list-unstyled animated fadeInUp"
                  data-parent="#topAccordion"
                >
                  <li
                    v-if="
                      (user && user.user_type == 'superAdmin') ||
                      (user && user.user_type == 'branchManager')
                    "
                  >
                    <router-link :to="{ name: 'Add_Counselor' }">Add Courselor</router-link>
                  </li>
                  <li>
                    <router-link :to="{ name: 'Counselors' }"> View Couselor </router-link>
                  </li>
                  <li class="sub-sub-submenu-list">
                    <router-link
                      to="/find-course"
                      data-toggle="collapse"
                      aria-expanded="true"
                      class="dropdown-toggle"
                    >
                      Counselors Tools
                    </router-link>
                  </li>
                </ul>
              </li>

              <li class="menu single-menu">
                <a
                  href="#leads"
                  data-toggle="collapse"
                  aria-expanded="false"
                  class="dropdown-toggle autodroprown"
                  :class="
                    routePath == 'Add_Lead' ||
                    routePath == 'Leads' ||
                    routePath == 'Application_Leads' ||
                    routePath == 'Lead_Source' ||
                    routePath == 'Lead_Status'
                      ? 'router-link-active router-link-exact-active'
                      : ''
                  "
                >
                  <div class="flex">
                    <LeadsSvg />
                    <span
                      v-if="
                        (user && user.user_type == 'superAdmin') ||
                        (user && user.user_type == 'branchManager') ||
                        (user && user.user_type == 'counselor') ||
                        (user && user.user_type == 'frontOfficer')
                      "
                    >
                      Leads</span
                    >

                    <span v-if="user.user_type == 'agent'"> Application Leads</span>
                  </div>
                </a>
                <ul
                  id="leads"
                  class="collapse submenu list-unstyled animated fadeInUp"
                  data-parent="#topAccordion"
                >
                  <li
                    v-if="
                      (user && user.user_type == 'superAdmin') ||
                      (user && user.user_type == 'branchManager') ||
                      (user && user.user_type == 'counselor') ||
                      (user && user.user_type == 'frontOfficer')
                    "
                  >
                    <router-link :to="{ name: 'Add_Lead' }">Add New Lead</router-link>
                  </li>

                  <li v-if="user.user_type == 'agent'">
                    <router-link :to="{ name: 'Add_Lead' }">Add New Application</router-link>
                  </li>

                  <li
                    v-if="
                      (user && user.user_type == 'superAdmin') ||
                      (user && user.user_type == 'branchManager') ||
                      (user && user.user_type == 'counselor') ||
                      (user && user.user_type == 'frontOfficer')
                    "
                  >
                    <router-link :to="{ name: 'Leads' }">All Leads</router-link>
                  </li>

                  <li v-if="user.user_type == 'agent'">
                    <router-link :to="{ name: 'AgentLeads' }">All Application</router-link>
                  </li>

                  <li
                    v-if="
                      (user && user.user_type == 'superAdmin') ||
                      (user && user.user_type == 'branchManager') ||
                      (user && user.user_type == 'counselor') ||
                      (user && user.user_type == 'frontOfficer')
                    "
                  >
                    <router-link :to="{ name: 'Application_Leads' }">Application Leads</router-link>
                  </li>

                  <li
                    v-if="
                      (user && user.user_type == 'superAdmin') ||
                      (user && user.user_type == 'branchManager')
                    "
                  >
                    <router-link :to="{ name: 'Lead_Source' }">Lead Source</router-link>
                  </li>
                  <li
                    v-if="
                      (user && user.user_type == 'superAdmin') ||
                      (user && user.user_type == 'branchManager')
                    "
                  >
                    <router-link :to="{ name: 'Lead_Status' }">Lead Status</router-link>
                  </li>
                </ul>
              </li>
              <li v-if="user && user.user_type === 'superAdmin'" class="menu single-menu">
                <a
                  href="#tasks"
                  data-toggle="collapse"
                  aria-expanded="false"
                  class="dropdown-toggle autodroprown"
                >
                  <div class="flex">
                    <TasksSvg />
                    <span>Tasks</span>
                  </div>
                </a>
                <ul
                  id="tasks"
                  class="collapse submenu list-unstyled animated fadeInUp"
                  data-parent="#topAccordion"
                >
                  <li>
                    <a href="#"> Add Task </a>
                  </li>
                  <li>
                    <a href="#"> Task Assigned to me </a>
                  </li>

                  <li>
                    <a href="#"> Task Assigned by me </a>
                  </li>
                </ul>
              </li>

              <li class="menu single-menu menu-extras">
                <a
                  href="#more"
                  data-toggle="collapse"
                  aria-expanded="false"
                  class="dropdown-toggle"
                >
                  <div class="flex">
                    <span>
                      <MoreSvg />
                      <span class="d-xl-none">More</span></span
                    >
                  </div>
                </a>
                <ul
                  id="more"
                  class="submenu list-unstyled animated fadeInUp collapse"
                  data-parent="#topAccordion"
                  style=""
                >
                  <!-- <li>
                    <router-link :to="{ name: 'Chat' }">
                      Chat
                    </router-link>
                  </li> -->
                </ul>
              </li>
            </ul>
          </nav>
        </div>
        <!--  END TOPBAR  -->
      </ul>

      <ul class="navbar-item nav-dropdowns flex-row">
        <li class="nav-item dropdown language-dropdown more-dropdown">
          <div class="dropdown custom-dropdown-icon">
            <a
              id="customDropdown"
              class="dropdown-toggle btn"
              href="#"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              @click="user && user.user_type === 'branchManager' ? flagUpload() : ''"
            >
              <img
                v-if="
                  user &&
                  user.user_type === 'branchManager' &&
                  branchInfo.flag !== null &&
                  branchFlag
                "
                :src="baseURL + branchInfo.flag"
                class="flag-width"
                alt="flag"
              />
              <img
                v-if="user && user.user_type === 'branchManager' && !branchFlag"
                :src="flag"
                class="flag-width"
                alt="flag"
              />
              <img
                v-if="user.user_type === 'superAdmin' || branchInfo.flag === null"
                src="@/assets/img/uk.png"
                class="flag-width rounded-full"
                alt="flag"
              />
            </a>
            <input id="flagRef" type="file" hidden @change="onChangeFlag" />
          </div>
        </li>

        <li class="nav-item dropdown notification-dropdown" style="position: relative">
          <router-link
            id="notificationDropdown"
            :to="{ name: 'Chat' }"
            href="javascript:void(0);"
            class="nav-link dropdown-toggle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <FeatherMessageCircle />
            <span class="badge badge-success"></span>
            <small v-if="routePath !== 'Chat'" class="msg-counter">{{ unreadMsg }}</small>
          </router-link>
        </li>

        <li class="nav-item dropdown notification-dropdown">
          <a
            id="notificationDropdown"
            href="javascript:void(0);"
            class="nav-link dropdown-toggle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            @click="unreadNotifyFn"
          >
            <FeatherBellSvg />
            <small class="msg-counter unread_notify">{{ unreadNotify }}</small>
            <span class="badge badge-success"></span>
          </a>
          <div
            class="dropdown-menu notification-dropdown position-absolute animated fadeInUp"
            aria-labelledby="notificationDropdown"
          >
            <div class="notification-scroll">
              <div v-for="(notify, index) in notifications" :key="index" class="dropdown-item">
                <div class="media server-log">
                  <div class="media-body">
                    <div class="data-info">
                      <!-- eslint-disable vue/no-v-html -->
                      <h6 class="" v-html="notify && notify.info_text"></h6>
                      <p class="" style="font-size: 12px">
                        {{ dateTime(notify && notify.created_at) }}
                      </p>
                    </div>
                    <div class="icon-status" @click="deleteNofification(notify.id)">
                      <FeatherXSvg />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>

        <li class="nav-item dropdown user-profile-dropdown order-lg-0 order-1">
          <a
            id="user-profile-dropdown"
            href="javascript:void(0);"
            class="nav-link dropdown-toggle user"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <div class="media">
              <img
                v-if="
                  user &&
                  user.user_type === 'superAdmin' &&
                  (photo === null || user.photo === null) &&
                  isPhoto
                "
                src="@/assets/img/90x90.jpg"
                class="img-fluid rounded-full"
                :alt="user.name"
              />
              <img
                v-if="user && user.user_type === 'superAdmin' && user.photo !== null && !isUpload"
                :src="user && baseURL + '/' + user.photo"
                class="img-fluid"
                :alt="user.name"
              />
              <img
                v-if="user && user.user_type === 'superAdmin' && photo !== null && !isPhoto"
                :src="baseURL + '/' + photo"
                class="img-fluid"
                :alt="user.name"
              />

              <img
                v-if="user && user.user_type === 'branchManager' && user.photo !== null"
                :src="user && baseURL + '/' + user.photo"
                class="img-fluid"
                :alt="user.name"
              />

              <img
                v-if="user && user.user_type === 'counselor' && user.photo !== null"
                :src="user && baseURL + '/' + user.photo"
                class="img-fluid"
                :alt="user.name"
              />
              <img
                v-if="user && user.user_type === 'frontOfficer' && user.photo !== null"
                :src="user && baseURL + '/' + user.photo"
                class="img-fluid"
                :alt="user.name"
              />
              <img
                v-if="user && user.user_type === 'agent' && user.photo !== null"
                :src="user && baseURL + '/' + user.photo"
                class="img-fluid"
                :alt="user.name"
              />
              <img
                v-if="user && !user.user_type === 'superAdmin' && user.photo === null"
                src="@/assets/img/90x90.jpg"
                class="img-fluid"
                :alt="user.name"
              />
              <img
                v-if="user && user.photo === null && user.user_type !== 'superAdmin'"
                src="@/assets/img/90x90.jpg"
                class="img-fluid"
                :alt="user.name"
              />
            </div>
          </a>
          <div
            class="dropdown-menu position-absolute animated fadeInUp"
            aria-labelledby="userProfileDropdown"
          >
            <div class="user-profile-section">
              <div class="media mx-auto">
                <img
                  v-if="
                    user &&
                    user.user_type === 'superAdmin' &&
                    (photo === null || user.photo === null) &&
                    isPhoto
                  "
                  src="@/assets/img/90x90.jpg"
                  class="img-fluid"
                  :alt="user.name"
                />
                <img
                  v-if="user && user.user_type === 'superAdmin' && user.photo !== null && !isUpload"
                  :src="user && baseURL + '/' + user.photo"
                  class="img-fluid"
                  :alt="user.name"
                />
                <img
                  v-if="user && user.user_type === 'superAdmin' && photo !== null && !isPhoto"
                  :src="baseURL + '/' + photo"
                  class="img-fluid"
                  :alt="user.name"
                />

                <img
                  v-if="user && user.user_type === 'branchManager' && user.photo !== null"
                  :src="user && baseURL + '/' + user.photo"
                  class="img-fluid"
                  :alt="user.name"
                />

                <img
                  v-if="user && user.user_type === 'counselor' && user.photo !== null"
                  :src="user && baseURL + '/' + user.photo"
                  class="img-fluid"
                  :alt="user.name"
                />
                <img
                  v-if="user && user.user_type === 'frontOfficer' && user.photo !== null"
                  :src="user && baseURL + '/' + user.photo"
                  class="img-fluid"
                  :alt="user.name"
                />
                <img
                  v-if="user && user.user_type === 'agent' && user.photo !== null"
                  :src="user && baseURL + '/' + user.photo"
                  class="img-fluid"
                  :alt="user.name"
                />
                <img
                  v-if="user && user.photo === null && user.user_type !== 'superAdmin'"
                  src="@/assets/img/90x90.jpg"
                  class="img-fluid"
                  :alt="user.name"
                />

                <div class="media-body">
                  <h5 v-if="user" class="pl-1">{{ user.name }}</h5>
                  <p v-if="user && user.user_type === 'superAdmin'" class="pl-1">Super Admin</p>
                  <p v-if="user && user.user_type === 'branchManager'" class="pl-1">
                    Branch Manager
                  </p>
                  <p v-if="user && user.user_type === 'counselor'" class="pl-1">Counselor</p>
                  <p v-if="user && user.user_type === 'frontOfficer'" class="pl-1">Front Officer</p>
                  <p v-if="user && user.user_type === 'agent'" class="pl-1">Agent</p>
                </div>
              </div>
            </div>
            <div
              v-if="user && user.user_type === 'superAdmin'"
              class="dropdown-item flex space-x-1"
            >
              <a class="!inline-flex space-x-1" href="#" @click="onPickFile">
                <FeatherCameraSvg />
                <span>Change Photo</span>
              </a>
              <input
                ref="fileInput"
                type="file"
                accept="image/*"
                style="display: none"
                @change="onFilePicked"
              />
            </div>
            <div class="dropdown-item flex space-x-1">
              <a class="!inline-flex space-x-1" href="#">
                <FeatherUserSvg />
                <span>My Profile</span>
              </a>
            </div>
            <div class="dropdown-item flex space-x-1">
              <a class="!inline-flex space-x-1" href="#" @click="EditProfile">
                <FeatherInboxSvg />
                <span>Edit Profile</span>
              </a>
            </div>
            <div class="dropdown-item flex space-x-1">
              <router-link
                :to="{
                  name: 'Change_Password',
                  params: { id: user.id },
                }"
                class="!inline-flex space-x-1"
              >
                <FeatherLockSvg />
                <span>Change Password</span>
              </router-link>
            </div>

            <div v-if="user && user.user_type === 'superAdmin'" class="dropdown-item">
              <router-link
                :to="{
                  name: 'Hubspot_API',
                }"
                class="!inline-flex space-x-1"
              >
                <FeatherLockSvg />
                <span>Hubspot API</span>
              </router-link>
            </div>

            <div class="dropdown-item">
              <a class="!inline-flex space-x-1" v-if="user" href="#" @click.prevent="logout">
                <FeatherLogOutSvg />
                <span>Log Out</span>
              </a>
            </div>
          </div>
        </li>
      </ul>
    </header>
    <NotificationBar
      :notification="notification"
      :new-lead="newLeadNotify"
      @clearNotify="clearNotify"
    />
    <MeetingNotification
      :meeting-reminder="meetingReminder"
      @clearMeetingNotify="clearMeetingNotify"
    />

    <FollowUpNotification
      :follow-up-reminder="followUpReminder"
      @clearFollowUpNotify="clearFollowUpNotify"
    />
  </div>
</template>
<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Request from '@/apis/Request'
// import baseURL from "@/apis/baseURL";
import { useStore } from 'vuex'
import HomeSvg from '@/svg/HomeSvg.vue'
import CountrySvg from '@/svg/CountrySvg.vue'
import InstituteSvg from '@/svg/InstituteSvg.vue'
import CourseSvg from '@/svg/CourseSvg.vue'
import DashboardSvg from '@/svg/DashboardSvg.vue'
import CounselorsSvg from '@/svg/CounselorsSvg.vue'
import LeadsSvg from '@/svg/LeadsSvg.vue'
import TasksSvg from '@/svg/TasksSvg.vue'
import ChevronRightSvg from '@/svg/ChevronRightSvg.vue'
import FeatherMenuSvg from '@/svg/ChevronRightSvg.vue'
import MoreSvg from '@/svg/MoreSvg.vue'
import FeatherBellSvg from '@/svg/FeatherBellSvg.vue'
import FeatherXSvg from '@/svg/FeatherXSvg.vue'
import FeatherUserSvg from '@/svg/FeatherUserSvg.vue'
import FeatherCameraSvg from '@/svg/FeatherCameraSvg.vue'
import FeatherInboxSvg from '@/svg/FeatherInboxSvg.vue'
import FeatherLockSvg from '@/svg/FeatherLockSvg.vue'
import FeatherLogOutSvg from '@/svg/FeatherLogOutSvg.vue'
import FeatherMessageCircle from '@/svg/FeatherMessageCircle.vue'
import Notify from '../helpers/Notify'
import NotificationBar from '@/components/NotificationBar.vue'
import moment from 'moment'
import MeetingNotification from '@/components/MeetingNotification.vue'
import FollowUpNotification from '@/components/FollowUpNotification.vue'

const store = useStore()
const route = useRoute()
const router = useRouter()

const photo = ref('')
const isPhoto = ref(true)
const branchFlag = ref(true)
const isUpload = ref(false)
const fileInput = ref(null)
const flag = ref('')
const branchInfo = ref({})
const notifications = ref([])
const notification = ref({})
const meetingReminder = ref({})
const followUpReminder = ref({})
const newLeadNotify = ref('')

const user = computed(() => store.getters.user)
const unreadMsg = computed(() => store.getters.unreadMsg)
const unreadNotify = computed(() => store.getters.unreadNotify)
const themeModeStatus = computed(() => store.getters.themeModeStatus)
const baseURL = computed(() => store.state.baseURL)
const routePath = computed(() => route.name)

//onMounted
onMounted(async () => {
  if (user.value && user.value.branch_id) {
    try {
      const res = await Request.GET_REQ(`/branch-info/${user.value.branch_id}`)
      branchInfo.value = res.data
    } catch (error) {
      Notify(error.res.data)
    }
  }
  // if (user.value && user.value.counselor_id) {
  //   window.Echo.channel(`Assign.Lead.Counselor.${user.value && user.value.counselor_id}`).listen(
  //     'AssignLeadCounselorEvent',
  //     (e) => {
  //       notification.value = e
  //       nextTick(() => {
  //         $('.toast-custom-notification').toast('show')
  //       })
  //       store.dispatch('unreadNotify')
  //       store.dispatch('leadAssignTrigger', notification)
  //     }
  //   )
  // }

  // window.Echo.channel(`chat-with.${user.value && user.value.id}`).listen('MessageSendEvent', () => {
  //   store.dispatch('unreadMsg')
  // })

  // window.Echo.channel(`new-lead`).listen('NewLeadEvent', () => {
  //   newLeadNotify.value = 'New Leads Added! Check in Lead Lists'
  //   nextTick(() => {
  //     $('.toast-custom-notification').toast('show')
  //   })
  // })

  // Meeting Notify
  // window.Echo.channel(`Meeting.Notify.${user.value && user.value.counselor_id}`).listen(
  //   'MeetingNotify',
  //   (res) => {
  //     meetingReminder.value = res
  //     nextTick(() => {
  //       $('.meeting-notification').toast('show')
  //     })
  //   }
  // )

  // Follow up Notify
  // window.Echo.channel(`Followup.Notify.${user.value && user.value.id}`).listen(
  //   'FollowupNotify',
  //   (res) => {
  //     followUpReminder.value = res
  //     nextTick(() => {
  //       $('.followup-notification').toast('show')
  //     })
  //   }
  // )
  //Branch Manager notification
  if (user.value && user.value.user_type == 'branchManager') {
    branchNotifications()
  }

  //Counselor notification
  if (user.value && user.value.user_type == 'counselor') {
    counselorNotifications()
  }
})

//methods
function dateTime(value) {
  // return moment(value).format("MMMM Do YYYY, h:mm:ss a");
  return moment(value).calendar()
}
async function logout() {
  try {
    await store.dispatch('userLogout')
    await router.push({ name: 'Login' })
    if (user.value) {
      window.Echo.leaveChannel(`Assign.Lead.Counselor.${user.value && user.value.counselor_id}`)
    }
  } catch (error) {
    Notify.error(error.message)
  }
}
function flagUpload() {
  document.getElementById('flagRef').click()
  // $refs.flagRef.click();
}
function onChangeFlag(event) {
  let file = event.target.files[0]
  let reader = new FileReader()
  reader.onload = (event) => {
    branchFlag.value = false
    flag.value = event.target.result
    const data = {
      flag: event.target.result,
    }

    if (user.value.user_type === 'branchManager') {
      Request.POST_REQ(data, `/upload-flag/${user.value.branch_id}`)
        .then(() => {
          Notify.success('Flag Updated')
        })
        .catch((err) => {
          Notify(err.res.data)
        })
    }
  }
  reader.readAsDataURL(file)
}
function onPickFile() {
  fileInput.value.click()
}
function onFilePicked(event) {
  isPhoto.value = false
  let file = event.target.files[0]
  if (file.size > 1048770) {
    Notify.warning('File is not bigger than 2 MB')
  } else {
    isUpload.value = true
    let reader = new FileReader()
    reader.onload = (event) => {
      photo.value = event.target.result
      const data = {
        photo: event.target.result,
      }

      Request.POST_REQ(data, `/update-admin-photo/${user.value.id}`)
        .then(() => {
          Notify.success('Photo Updated')
        })
        .catch((err) => {
          Notify(err.res.data)
        })
    }
    reader.readAsDataURL(file)
  }
}
function EditProfile() {
  const branchId = user.value && user.value.branch_id
  const counselorId = user.value && user.value.counselor_id
  const frontOfficeId = user.value && user.value.front_office_id
  const agentId = user.value && user.value.agent_id

  if (user.value.user_type === 'branchManager') {
    Request.GET_REQ(`/branch-info/${branchId}`)
      .then((res) => {
        router.push({
          name: 'EditBranch',
          params: { slug: res.data.slug },
        })
      })
      .catch((err) => {
        Notify(err.res.data)
      })
  }

  if (user.value.user_type === 'counselor') {
    Request.GET_REQ(`/counselor-info/${counselorId}`)
      .then((res) => {
        router.push({
          name: 'EditCounselor',
          params: { slug: res.data.slug },
        })
      })
      .catch((err) => {
        Notify(err.res.data)
      })
  }

  if (user.value.user_type === 'frontOfficer') {
    Request.GET_REQ(`/front-officer-info/${frontOfficeId}`)
      .then((res) => {
        router.push({
          name: 'Edit_Front_Offices',
          params: { slug: res.data.slug },
        })
      })
      .catch((err) => {
        Notify(err.res.data)
      })
  }

  if (user.value.user_type === 'agent') {
    Request.GET_REQ(`/agent-info/${agentId}`)
      .then((res) => {
        router.push({
          name: 'Edit_Agent',
          params: { slug: res.data.slug },
        })
      })
      .catch((err) => {
        Notify(err.res.data)
      })
  }
}
function branchNotifications() {
  Request.GET_REQ(`/branch-notification/${user.value.branch_id}`)
    .then((res) => {
      notifications.value = res.data
    })
    .catch((err) => {
      Notify(err.res.data)
    })
}
function counselorNotifications() {
  Request.GET_REQ(`/counselor-notification/${user.value.counselor_id}`)
    .then((res) => {
      notifications.value = res.data.data
    })
    .catch((err) => {
      Notify(err.res.data)
    })
}
function deleteNofification(notifyId) {
  Request.GET_REQ(`/delete-notification/${notifyId}`)
    .then((res) => {
      if (res.status === 200) {
        notifications.value = notifications.value.filter((item) => item.id !== notifyId)
      }
    })
    .catch((err) => {
      Notify(err.res.data)
    })
}
function unreadNotifyFn() {
  if (user.value && user.value.user_type == 'counselor') {
    Request.GET_REQ(`/udpate-unread-counselor-notification/${user.value.counselor_id}`)
      .then((res) => {
        if (res.status === 200) {
          store.dispatch('unreadNotify')
        }
      })
      .catch((err) => {
        Notify(err.res.data)
      })
  }
  if (user.value && user.value.user_type == 'frontOffice') {
    Request.GET_REQ(`/update_unread_front_office_notifications/${user.value.front_office_id}`)
      .then(() => {})
      .catch((err) => {
        Notify(err.res.data)
      })
  }
}
function clearNotify() {
  newLeadNotify.value = ''
  notification.value = {}
}
function clearMeetingNotify() {
  meetingReminder.value = {}
}
function clearFollowUpNotify() {
  followUpReminder.value = {}
}
</script>
<style lang="scss">
.header-container .navbar .navbar-item .nav-item.dropdown .dropdown-menu {
  width: 11rem;
}
body.dark .topbar-nav.header nav#topbar ul.menu-categories li.menu > a {
  padding: 0 7px 0 7px;
}
.topbar-nav.header nav#topbar ul.menu-categories li.menu > a {
  padding: 0 7px 0 7px !important;
}
#customDropdown img {
  border-radius: 50% !important;
}
small.msg-counter {
  background: #2196f3;
  border-radius: 20px calc(40px / 2) 20px 0;
  color: #fff;
  font-weight: bold;
  position: absolute;
  bottom: 5px;
  text-align: center;
  line-height: 1;
  padding: 1px 3px;
  left: 15px;
}
small.msg-counter.unread_notify {
  background: #ffa500;
  left: 20px;
}
</style>
<!-- <style scoped>
.img-fluid {
  @apply w-2 h-2 rounded-full;
}
</style> -->