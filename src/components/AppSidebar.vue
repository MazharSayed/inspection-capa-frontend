<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const section = computed(() => route.meta.section)

const menu = [
  { label: 'Admin Configuration', to: '/admin-configuration', section: 'config', icon: 'M12 8a4 4 0 100 8 4 4 0 000-8zm8.5 4l1.5-1-2-3.5-1.8.5a7 7 0 00-1.5-.9L16 5h-4l-.7 2.1a7 7 0 00-1.5.9L8 7.5 6 11l1.5 1-1.5 1 2 3.5 1.8-.5a7 7 0 001.5.9L12 19h4l.7-2.1a7 7 0 001.5-.9l1.8.5 2-3.5-1.5-1z' },
  { label: 'Inspection Requests', to: null, section: 'requests', icon: 'M6 3h9l4 4v14H6V3zm8 1.5V8h3.5L14 4.5zM9 12h7v1.5H9V12zm0 3h7v1.5H9V15z' },
  { label: 'Defect Logging', to: null, section: 'defects', icon: 'M12 3a9 9 0 100 18 9 9 0 000-18zm-1 5h2v5h-2V8zm0 7h2v2h-2v-2z' },
  { label: 'CAPA Workflow', to: '/capa-requests', section: 'capa', icon: 'M5 4h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5a1 1 0 011-1zm2 4v2h10V8H7zm0 4v2h10v-2H7zm0 4v2h6v-2H7z' },
]
</script>

<template>
  <aside class="sidebar">
    <div class="brand">SOBHA</div>
    <p class="menu-title">MAIN MENU</p>

    <nav class="menu">
      <template v-for="item in menu" :key="item.label">
        <RouterLink
          v-if="item.to"
          :to="item.to"
          class="menu-item"
          :class="{ active: section === item.section }"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path :d="item.icon" fill="currentColor" />
          </svg>
          <span>{{ item.label }}</span>
        </RouterLink>

        <span v-else class="menu-item disabled">
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path :d="item.icon" fill="currentColor" />
          </svg>
          <span>{{ item.label }}</span>
        </span>
      </template>
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 230px;
  flex-shrink: 0;
  background: var(--sidebar-bg);
  color: #d1d5db;
  padding: 24px 14px;
  min-height: 100vh;
}

.brand {
  text-align: center;
  color: var(--accent);
  font-size: 22px;
  letter-spacing: 6px;
  margin-bottom: 32px;
}

.menu-title {
  font-size: 11px;
  letter-spacing: 1px;
  color: #9ca3af;
  margin: 0 8px 12px;
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 8px;
  color: #d1d5db;
  text-decoration: none;
  font-size: 13px;
}

.menu-item:hover:not(.disabled) {
  background: rgba(255, 255, 255, 0.08);
}

.menu-item.active {
  background: var(--accent);
  color: #fff;
}

.menu-item.disabled {
  opacity: 0.55;
  cursor: not-allowed;
}
</style>