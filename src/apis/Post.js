import Api from "./Api";
import Csrf from "./Csrf";

export default {
  async postReq(form, url, config={}) {
    await Csrf.getCookie();
    return Api.post(url, form, config);
  },
}