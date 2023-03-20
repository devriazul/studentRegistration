import Api from "./Api";
import Csrf from "./Csrf";

export default {
    async GET_REQ(url,config={}) {
        await Csrf.getCookie();
        return Api.get(url,config);
    },
    async POST_REQ(form, url, config={}) {
        await Csrf.getCookie();
        return Api.post(url, form, config);
    },
}