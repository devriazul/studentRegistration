<template>
  <div class="loader-wrapper">
    <div class="loader dual-loader mx-auto"></div>
  </div>
</template>
<script>
export default {
  name: 'Loader',
}
</script>
<style scoped>
.loader-wrapper {
  background: #fdfdfd;
  width: 100%;
  height: 100vh;
  position: fixed;
  z-index: 999;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
}

body.dark .loader-wrapper {
  background: #060818;
}
</style>
