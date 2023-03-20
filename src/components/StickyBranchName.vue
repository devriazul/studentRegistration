<template>
  <div v-if="user && user.user_type === 'superAdmin'" class="sticky-branch-name">
    <h3>Super Admin Panel</h3>
  </div>
  <div v-if="branch && branch.branch_name" class="sticky-branch-name">
    <h3>{{ branch && branch.branch_name }}</h3>
  </div>
</template>
<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const user = computed(() => store.getters.user)
const branch = computed(() => store.getters.branch)

onMounted(async () => {
  await store.dispatch('branch')
})
</script>

<style lang="scss">
.sticky-branch-name {
  position: fixed;
  z-index: 50;
  left: 0;
  transform: rotate(270deg);
  background: #0095cc;
  transform-origin: 0 0;
  bottom: 15%;
  padding: 0px 10px;
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
  transition: 0.4s all;

  h3 {
    font-size: 20px;
    letter-spacing: 1px;
    color: #fff;
  }
}
</style>
