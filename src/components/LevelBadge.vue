<script setup>
defineProps({ active: { type: Boolean, default: false } })
</script>

<template>
  <span class="badge" :class="active ? 'on' : 'off'" :aria-label="active ? 'Enabled' : 'Disabled'">
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8" />
      <path
        v-if="active"
        d="M8 12.5l2.7 2.7L16 9.5"
        fill="none"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        v-else
        d="M9 9l6 6M15 9l-6 6"
        fill="none"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
      />
    </svg>
  </span>
</template>

<style scoped>
.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 28px;
  border-radius: 5px;
  color: #fff;
}

.on {
  background: var(--success);
}

.off {
  background: var(--danger);
}
</style>