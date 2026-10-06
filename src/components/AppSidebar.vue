<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import SidebarIcon from './SidebarIcon.vue'

const route = useRoute()
const section = computed(() => route.meta.section)

const menu = [
  { label: 'Admin Configuration', to: '/admin-configuration', section: 'config', icon: 'config' },
  { label: 'Inspection Requests', to: '/inspection-requests', section: 'requests', icon: 'requests' },
  { label: 'Defect Logging', to: null, section: 'defects', icon: 'defects' },
  { label: 'CAPA Workflow', to: '/capa-requests', section: 'capa', icon: 'capa' },
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
          <SidebarIcon :name="item.icon" />
          <span>{{ item.label }}</span>
        </RouterLink>

        <span v-else class="menu-item disabled">
          <SidebarIcon :name="item.icon" />
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
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 22px;
  letter-spacing: 6px;
  margin-bottom: 32px;
}

.menu-title {
  font-size: 12px;
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
  --icon-cut: var(--sidebar-bg);
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 8px;
  color: #d1d5db;
  text-decoration: none;
  font-size: 14px;
}

.menu-item:hover:not(.disabled) {
  background: rgba(255, 255, 255, 0.08);
}

.menu-item.active {
  --icon-cut: var(--accent);
  background: var(--accent);
  color: #fff;
}

.menu-item.disabled {
  opacity: 0.55;
  cursor: not-allowed;
}
</style>