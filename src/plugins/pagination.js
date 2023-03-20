import BasePagination from "@/components/BasePagination.vue"
export default {
  install: (app) => {
    // Plugin code goes here
    app.component("BasePagination", BasePagination)
  }
}