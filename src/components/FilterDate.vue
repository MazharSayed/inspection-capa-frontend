<script setup>
defineProps({
  modelValue: { type: String, default: '' },
  label: { type: String, required: true },
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <label class="filter-date">
    <span>{{ label }}</span>
    <input type="date" :value="modelValue" @input="emit('update:modelValue', $event.target.value)" />
  </label>
</template>

<style scoped>
.filter-date {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0 12px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--card-bg);
  color: var(--text-muted);
}

.filter-date input {
  border: 0;
  outline: 0;
  padding: 7px 0;
  background: transparent;
  color: var(--text-muted);
}

.filter-date:focus-within {
  outline: 2px solid var(--accent);
  outline-offset: 1px;
}
</style>