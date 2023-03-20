<script setup>
defineProps({
  errors: {
    type: Array,
    required: true,
  },
})
</script>
<template>
  <ul>
    <li v-for="error in errors" :key="error.$uid" class="error">{{ error.$message }}</li>
  </ul>
</template>
<style scoped>
.error {
  color: red;
}
</style>
