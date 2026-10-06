<script setup>
defineProps({
  title: { type: String, required: true },
  search: { type: String, default: null },
})

const emit = defineEmits(['update:search'])
</script>

<template>
  <header class="page-header">
    <h1>{{ title }}</h1>

    <label v-if="search !== null" class="search">
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
        <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" stroke-width="2" />
        <path d="M16 16l5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      </svg>
      <input
        type="text"
        placeholder="Search..."
        :value="search"
        @input="emit('update:search', $event.target.value)"
      />
    </label>
  </header>
</template>

<style scoped>
.search {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 260px;
  padding: 9px 14px;
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 10px;
  color: var(--text-muted);
}

.search input {
  flex: 1;
  border: 0;
  outline: 0;
  background: transparent;
  color: var(--text);
}
</style>