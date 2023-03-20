import Api from "./Api";
import Csrf from "./Csrf";

export default {
  async getReq(url,config={}) {
    await Csrf.getCookie();
    return Api.get(url,config);
  },
}