/* eslint-disable */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuelidatePlugin from "./plugins/vuelidate";
import paginationPlugin from "./plugins/pagination";
import { LightEditorPlugin } from '@hannanmiah/light-editor'
import jQuery from "jquery";
import moment from 'moment';
import Notify from "./helpers/Notify";


window.jQuery = jQuery;
window.$ = jQuery;
import "popper.js";
import "bootstrap";
import VueSelect from 'vue-next-select'
import 'vue-next-select/dist/index.min.css'
import "@hannanmiah/light-editor/dist/style.css"
import VueApexCharts from "vue3-apexcharts";
import ApexCharts from 'apexcharts';
import Toastify from 'toastify-js'
window.Toastify = Toastify
import "toastify-js/src/toastify.css"
import VCalendar from 'v-calendar';
import 'v-calendar/dist/style.css';
import { SetupCalendar, Calendar, DatePicker } from 'v-calendar';

import Request from "./apis/Request"
import Echo from 'laravel-echo';
import Pusher from 'pusher-js'

import "@/assets/main.scss";
import "@/app.css"
window.Pusher = Pusher

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: import.meta.env.VITE_APP_PUSHER_KEY || 'secret',
//     wsHost: import.meta.env.VITE_APP_WEBSOCKETS_SERVER || '127.0.0.1',
//     forceTLS: import.meta.env.VITE_APP_PUSHER_SCHEME == 'https'? true : false,
//     encrypted: import.meta.env.VITE_APP_PUSHER_SCHEME == 'https'? true : false,
//     wsPort: import.meta.env.VITE_APP_PUSHER_PORT || 6001,
//     wssPort: import.meta.env.VITE_APP_PUSHER_PORT || 6001,
//     disableStats: import.meta.env.VITE_APP_PUSHER_SCHEME == 'https'? true : false,
//     enabledTransports: ['ws', 'wss'],
//     authorizer: (channel) => {
//         return {
//             authorize: (socketId, callback) => {
                
//                 Request.POST_REQ('/api/broadcasting/auth', {
//                     socket_id: socketId,
//                     channel_name: channel.name
//                 })
//                 .then(response => {
//                     callback(false, response.data);
//                 })
//                 .catch(error => {
//                     callback(true, error);
//                 });
//             }
//         };
//     },
// })

let app = createApp(App);
app.config.performance = true;
app.use(router);
app.use(store);
app.use(moment);
app.use(vuelidatePlugin);
app.use(paginationPlugin)
app.use(LightEditorPlugin)
app.component('vue-select', VueSelect)
app.use(VueApexCharts);
app.config.globalProperties.$apexcharts = ApexCharts;
app.use(VCalendar);
app.use(SetupCalendar, {})
app.config.globalProperties.site_url = 'http://127.0.0.1:8000/'
app.config.globalProperties.site_url1 = 'http://127.0.0.1:8000'
app.component('Calendar', Calendar)
app.component('DatePicker', DatePicker)
router.isReady().then(() => {
    app.mount("#app");
}).catch(err => {
    Notify.error(err);
})
