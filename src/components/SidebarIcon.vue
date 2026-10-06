<script setup>
defineProps({ name: { type: String, required: true } })
</script>

<template>
  <svg
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill="none"
    stroke="currentColor"
    stroke-width="1.7"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <template v-if="name === 'config'">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z" />
    </template>

    <template v-else-if="name === 'requests'">
      <path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8l-5-5z" />
      <path d="M14 3v5h5" />
      <path d="M9 14.5l2 2 4-4" />
    </template>

    <template v-else-if="name === 'defects'">
      <circle cx="12" cy="12" r="9" fill="currentColor" stroke="none" />
      <path d="M12 7.5v5.5" stroke-width="2" style="stroke: var(--icon-cut)" />
      <circle cx="12" cy="16.4" r="1.1" stroke="none" style="fill: var(--icon-cut)" />
    </template>

    <template v-else-if="name === 'capa'">
      <rect x="3.5" y="3.5" width="17" height="17" rx="3.5" fill="currentColor" stroke="none" />
      <path d="M8 9h8M8 12h8M8 15h5" style="stroke: var(--icon-cut)" />
    </template>
  </svg>
</template>