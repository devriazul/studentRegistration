<template>
  <!-- Modal -->
  <div
    id="confirmationModal"
    class="modal confirmation-custom fade"
    tabindex="-1"
    role="dialog"
    aria-labelledby="confirmationModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 id="confirmationModalLabel" class="modal-title">Confirmation</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <strong class="modal-text">
            {{ title }}
          </strong>
        </div>
        <div class="modal-footer d-flex justify-content-center">
          <button class="btn btn-sm" data-dismiss="modal" @click="meetingDone(0)">
            <i class="flaticon-cancel-12"></i> No
          </button>
          <button type="button" class="btn btn-warning btn-sm" @click="meetingDone(1)">Yes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  emits: ['meetingComplete'],
  methods: {
    meetingDone(status) {
      this.$emit('meetingComplete', status)
    },
  },
}
</script>

<style lang="scss" scoped>
.modal.confirmation-custom {
  position: fixed;
  top: 20%;
  @media (min-width: 576px) {
    .modal-dialog {
      max-width: 320px;
    }
  }
  .modal-content {
    background: #1b55e2;
  }
  button {
    padding: 5px 25px !important;
    font-size: 15px;
  }
  strong.modal-text {
    color: #fff;
    font-size: 15px;
  }
}
</style>
