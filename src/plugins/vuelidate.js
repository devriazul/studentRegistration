import FieldError from "@/components/validation/FieldError.vue"
export default {
  install: (app) => {
    // Plugin code goes here
    app.component("VError", FieldError)
  }
}