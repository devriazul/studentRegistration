import Notify from "@/helpers/Notify";
import { createRouter, createWebHistory } from "vue-router";



const routes = [
  
  {
    path: "/agent/invite/:id?",
    name: "AgentInvite",
    component: () => import("@/views/InviteAgent/Invite.vue"),
    //meta: { guestOnly: true }
  },
  {
    path: "/counselor/invite/:id?",
    name: "CounselorInvite",
    component: () => import("@/views/InviteAgent/CounselorInvite.vue"),
    //meta: { guestOnly: true }
  },
  {
    path: "/apply",
    name: "ApplyPhd",
    component: () => import("@/views/Student/Apply.vue"),
    //meta: { guestOnly: true }
  },
  {
    path: "/dynamic/filed",
    name: "DynamicFiled",
    component: () => import("@/views/InviteAgent/FildeAdd.vue"),
    //meta: { guestOnly: true }
  },
  {
    path: "/invite/success",
    name: "AgentSuccess",
    component: () => import("@/views/InviteAgent/AgentSuccess.vue"),
    //meta: { guestOnly: true }
  },
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Dashboard.vue"),
    redirect: "/dashboard",
  },
  {
    path: "/user/reset-password/token/:id",
    name: "ConfirmForgotpassword",
    component: () => import("@/views/auth/ConfirmForgotPassword.vue"),
    //meta: { guestOnly: true },
  },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: () => import("@/views/NotFound.vue"), },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// function isLoggedIn() {
//   let user = localStorage.getItem("user");
//   if (user && typeof user == "string") {
//     try {
//       user = JSON.parse(user);
//     } catch (err) {
//       Notify.error("Invalid user data");
//       localStorage.removeItem("user");
//       localStorage.setItem("user",JSON.stringify({}))
//       return false;
//     }
//   } else {
//     localStorage.removeItem("user");
//     localStorage.setItem("user", JSON.stringify({}));
//     return false;
//   }
  

//   return !!user?.auth;
// }

// router.beforeEach((to, from, next) => {
  
//   if (to.matched.some(record => record.meta.authOnly)) {
//     // this route requires auth, check if logged in
//     // if not, redirect to login page.
//     if (!isLoggedIn()) {
//       next({
//         path: "/login",
//         query: { redirect: to.fullPath }
//       });
//     } else {
//       next();
//     }
//   } else if (to.matched.some(record => record.meta.guestOnly)) {
//     // this route requires auth, check if logged in
//     // if not, redirect to login page.
//     if (isLoggedIn()) {
//       next({
//         path: "/dashboard",
//         query: { redirect: to.fullPath }
//       });
//     } else {
//       next();
//     }
//   } else {
//     next(); // make sure to always call next()!
//   }
// });


// superAdmin_branchManger();

export default router;