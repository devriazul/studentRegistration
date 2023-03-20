<script setup lang="ts">
import { ref, computed, defineAsyncComponent } from 'vue'
import { useStore } from 'vuex'
import { useMouseInElement } from '@vueuse/core'

const StickyBranchName = defineAsyncComponent(() => import('@/components/StickyBranchName.vue'))

const emit = defineEmits(['toggleSticky'])

const store = useStore()
const user = computed(() => store.getters.user)
const side = ref(null)
const { isOutside } = useMouseInElement(side)

function activeDrawer() {
  emit('toggleSticky')
}
</script>

<template>
  <Teleport to="body">
    <div class="fixed top-0 bottom-0 left-0 z-50 h-screen w-16" ref="side">
      <aside class="absolute h-full w-full" v-if="!isOutside">
        <div
          v-if="
            (user && user.user_type === 'superAdmin') ||
            (user && user.user_type === 'branchManager') ||
            (user && user.user_type === 'counselor')
          "
          class="sticky-meeting-followup"
        >
          <span @click="activeDrawer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-list"
            >
              <line x1="8" y1="6" x2="21" y2="6"></line>
              <line x1="8" y1="12" x2="21" y2="12"></line>
              <line x1="8" y1="18" x2="21" y2="18"></line>
              <line x1="3" y1="6" x2="3.01" y2="6"></line>
              <line x1="3" y1="12" x2="3.01" y2="12"></line>
              <line x1="3" y1="18" x2="3.01" y2="18"></line>
            </svg>
          </span>
        </div>
        <StickyBranchName />
      </aside>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
.sticky-meeting-followup {
  position: fixed;
  z-index: 51;
  left: 0;
  transform: rotate(270deg);
  background: #00d68d;
  transform-origin: 0 0;
  top: 30%;
  padding: 0px 10px;
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
  transition: 0.4s all;
  color: #fff;
  span {
    cursor: pointer;
    padding: 3px;
    display: inline-block;
  }
}
</style>
