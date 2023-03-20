import { createStore } from "vuex";
import User from "../apis/User";
import router from "../router";
import baseURL from "../apis/baseURL"
import Request from "@/apis/Request"
import _ from "lodash";
import Notify from "@/helpers/Notify"
export default createStore({
  state: {
    user: null,
    pendingStatus: false,
    baseURL: baseURL.baseURL,
    branch: null,
    unreadMsg: null,
    unreadNotify: null,
    followUpLists: null,
    meetingLists: null,
    leadAssignTrigger: null,
    themeModeStatus: JSON.parse(localStorage.getItem("darker"))
  },
  getters: {
    user: state => {
      return state.user;
    },
    pendingStatus: state => {
      return state.pendingStatus;
    },
    baseURL: state => {
      return state.baseURL;
    },
    branch: state => {
      return state.branch
    },
    unreadMsg: state => {
      return state.unreadMsg
    },
    unreadNotify: state => {
      return state.unreadNotify
    },
    themeModeStatus: state => {
      return state.themeModeStatus
    },
    followUpLists: state => {
      return state.followUpLists
    },
    meetingLists: state => {
      return state.meetingLists
    },
    leadAssignTrigger: state => {
      return state.leadAssignTrigger
    },

  },
  mutations: {
    // user(state, user) {
    //   state.user = user;
    // },
    // userLogout(state, userLogout) {
    //   state.user = userLogout;
    // },
    // pendingStatus(state, newPendingStatus) {
    //   state.pendingStatus = newPendingStatus;
    // },
    baseurl(state, newUrl){
      state.baseURL = newUrl
    },
    // branch(state, branch) {
    //   state.branch = branch
    // },
    // unreadMsg(state, unreadMsg) {
    //   state.unreadMsg = unreadMsg
    // },
    unreadNotify(state, unreadNotify) {
      state.unreadNotify = unreadNotify
    },
    // themeModeStatus(state, themeModeStatus) {
    //   state.themeModeStatus = themeModeStatus
    // },
    // followUpLists(state, followUpLists) {
    //   state.followUpLists = followUpLists
    // },
    // meetingLists(state, meetingLists) {
    //   state.meetingLists = meetingLists
    // },
    // leadAssignTrigger(state, leadAssignTrigger) {
    //   state.leadAssignTrigger = leadAssignTrigger
    // }

  },
  actions: {
    // async user({ commit }) {
    //   commit("pendingStatus", true);
    //   try {
    //     const res = await User.auth()
    //     commit("user", res.data);
          
    //     commit("pendingStatus", false);
    //   } catch (error) {
    //     if (error.response.status === 401) {
    //       localStorage.removeItem("user")
    //       localStorage.setItem("user", JSON.stringify({}));
    //       await router.push({ name: "Login" });
    //     }
    //   }
    // },
    async userLogout({ commit }) {
      commit("pendingStatus", true);
      try {
        const res = await User.logout()
        localStorage.removeItem("auth");
        localStorage.removeItem("user");
        localStorage.removeItem("branch");
        localStorage.setItem("user", JSON.stringify({}));
        commit("userLogout", null);
        commit("branch", null);
        Notify.success(res.data.message)
      } catch (error) {
        Notify.error(error.message)
      } finally {
        commit("pendingStatus", false);
      }
    },
    isLoggedin(ctx) {
      return !!ctx.getters.user
    },
    baseurl({ commit }, newUrl) {
      commit("baseurl", newUrl)
    },
    async branch({ commit, state }) {
      commit("pendingStatus", true);
      if (state.user) {
        setTimeout(() => {
            Request.GET_REQ(`/branch-info/${state.user && state.user.branch_id}`)
              .then(res => {
                localStorage.setItem("branch", JSON.stringify(res.data));
                commit("branch", res.data);
            })
            .catch(err => {
              Notify(err.res.data);
            });
          }, 2000)
      }
      commit("pendingStatus", false);
    },
    async unreadMsg({ commit, state }) {
      commit("pendingStatus", true);
      if (state.user) {
        setTimeout(() => {
            Request.GET_REQ(`/contact-list/${state.user && state.user.id} `)
        .then(res => {
          // commit('unreadMsg', res.data)
          if (res.status === 200) {
            let contacts = res.data;
            let totalUnread =  _.sumBy(contacts, function (contact) {
              return contact.unread;
            });
            commit('unreadMsg', totalUnread)
          }
          
        })
        .catch(err => {
          this.errors = err.res.data.errors;
        });
          }, 2000)
      }
      commit("pendingStatus", false);
    },
    async unreadNotify({ commit, state }) {
      commit("pendingStatus", true);
      if (state.user) {
        setTimeout(() => {
            Request.GET_REQ(`/counselor-notification-unread/${state.user && state.user.counselor_id} `)
        .then(res => {
          // commit('unreadMsg', res.data)
          if (res.status === 200) {
            commit('unreadNotify', res.data)
            
          }
          
        })
        .catch(err => {
          this.errors = err.res.data.errors;
        });
          }, 2000)
      }
      commit("pendingStatus", false);
    },
    themeModeStatus({commit}){
      commit('themeModeStatus', JSON.parse(localStorage.getItem("darker")))
    },
    async followUpLists({commit, state}){
      commit("pendingStatus", true);
      if (state.user) {
        try {
          const res = await Request.GET_REQ(`/follow-up-lists/${state.user && state.user.id} `)
          if (res.status === 200) {
            commit('followUpLists', res.data)
            
          }
        } catch (error) {
          this.errors = error.res.data.errors;
        }
        finally {
          commit("pendingStatus", false);
        }
      }
    },
    
    meetingLists({commit, state}){
      commit("pendingStatus", true);
      if (state.user) {
        setTimeout(() => {
            Request.GET_REQ(`/today-meeting-lists/${state.user && state.user.counselor_id} `)
        .then(res => {
          // commit('unreadMsg', res.data)
          if (res.status === 200) {
            commit('meetingLists', res.data)
            
          }
          
        })
        .catch(err => {
          this.errors = err.res.data.errors;
        });
          }, 2000)
      }
      commit("pendingStatus", false);
    },

    leadAssignTrigger({commit}, payload){
      let counselorId = payload && payload.notification.to_counselor_id
      let nowTime = Date.now();
      let data = {
        counselorId,
        nowTime
      }
      commit('leadAssignTrigger', data)
    }



  },
  modules: {}
});
