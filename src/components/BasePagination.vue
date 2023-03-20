<script setup lang="ts">
import { watch, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import type { Link } from '@/types/LInk'

const route = useRoute()
const props = defineProps<{
  links: Link[]
  modelValue: number
  simple?: boolean
}>()

const emit = defineEmits(['paginate', 'update:modelValue'])
const { modelValue: page, simple } = toRefs(props)
function resolvePage(url: string): number {
  if (!url.match(/page=\d+/)) {
    return 1
  }
  const page = url.replace(/^.*?page=(\d+).*$/, '$1')
  return Number(page)
}

function replaceText(text: string): string {
  return text.replace(/(previous|next)/gi, '')
}

function paginate(page: number | string) {
  emit('update:modelValue', page)
  emit('paginate')
}

watch(
  () => (simple?.value ? page.value : route.query.page),
  (newPage) => {
    if (newPage && !simple?.value) {
      paginate(newPage)
    }
  }
)
</script>

<template>
  <div class="flex justify-center">
    <ul class="link-list-simple" v-if="simple">
      <li
        v-for="link in links"
        :key="link.label"
        class="flex border-r border-gray-200 last:border-r-0 dark:border-slate-500"
      >
        <button
          v-if="link.url"
          class="link-simple hover:bg-gray-200 dark:hover:bg-blue-500 dark:hover:text-white"
          :class="{ 'link-active': link.active }"
          v-html="replaceText(link.label)"
          @click="paginate(resolvePage(link.url))"
        ></button>
        <button
          v-else
          class="link-simple"
          :class="{ 'link-active': link.active, 'link-disabled': !link.url }"
          v-html="replaceText(link.label)"
        ></button>
      </li>
    </ul>
    <ul class="link-list" v-else>
      <li
        v-for="link in links"
        :key="link.label"
        class="flex border-r border-gray-200 last:border-r-0 dark:border-slate-500"
      >
        <router-link
          v-if="link.url"
          :to="{ query: { page: resolvePage(link.url) } }"
          class="link hover:bg-gray-200 dark:hover:bg-blue-500 dark:hover:text-white"
          :class="{ 'link-active': link.active }"
          v-html="link.label"
        >
        </router-link>
        <router-link
          to="#"
          v-else
          class="link"
          :class="{ 'link-active': link.active, 'link-disabled': !link.url }"
          v-html="link.label"
        ></router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.link-list {
  @apply flex flex-wrap items-center justify-center border dark:border-slate-500;
}
.link-list-simple {
  @apply flex flex-wrap items-center justify-center border dark:border-slate-500;
}
.link {
  @apply p-2 text-blue-500 md:p-3;
}
.link-simple {
  @apply text-blue-500 md:p-1;
}
.link-active {
  @apply pointer-events-none cursor-default bg-blue-500 text-white;
}
.link-disabled {
  @apply pointer-events-none cursor-default text-gray-500;
}
</style>
