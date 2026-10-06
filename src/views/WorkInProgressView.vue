<script setup>
import { useRoute } from 'vue-router'
import PageHeader from '../components/PageHeader.vue'

const route = useRoute()
</script>

<template>
  <PageHeader :title="route.meta.title ?? 'Work In Progress'" />

  <section class="card wip">
    <svg viewBox="0 0 24 24" width="48" height="48" aria-hidden="true">
      <path
        d="M14.7 6.3a4 4 0 00-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 005.4-5.4l-2.6 2.6-2.4-.6-.6-2.4 2.6-2.6z"
        fill="none"
        stroke="currentColor"
        stroke-width="1.6"
        stroke-linejoin="round"
      />
    </svg>

    <h2>Work in progress</h2>
    <p>This page is under development and will be available soon.</p>

    <RouterLink class="back" :to="{ name: 'capa-requests' }">Back to CAPA Requests</RouterLink>
  </section>
</template>

<style scoped>
.wip {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 360px;
  text-align: center;
  color: var(--text-muted);
}

.wip svg {
  color: var(--accent);
}

h2 {
  font-size: 20px;
  color: var(--text);
}

.back {
  margin-top: 14px;
  padding: 9px 18px;
  border-radius: 8px;
  background: var(--accent);
  color: #fff;
  text-decoration: none;
}
</style>