<script setup>
import AppSidebar from './components/AppSidebar.vue'
</script>

<template>
  <div class="layout">
    <AppSidebar />
    <main class="content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
}

.content {
  flex: 1;
  min-width: 0;
  padding: 24px 28px;
}
</style>