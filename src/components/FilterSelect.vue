<script setup>
const props = defineProps({
  modelValue: { type: [Number, String], default: null },
  options: { type: Array, default: () => [] },
  placeholder: { type: String, required: true },
  disabled: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue'])

function onChange(event) {
  const picked = props.options.find((option) => String(option.id) === event.target.value)
  emit('update:modelValue', picked ? picked.id : null)
}
</script>

<template>
  <select class="filter-select" :value="modelValue ?? ''" :disabled="disabled" @change="onChange">
    <option value="">{{ placeholder }}</option>
    <option v-for="option in options" :key="option.id" :value="option.id">
      {{ option.name }}
    </option>
  </select>
</template>

<style scoped>
.filter-select {
  min-width: 130px;
  padding: 8px 12px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--card-bg);
  color: var(--text-muted);
}

.filter-select:focus {
  outline: 2px solid var(--accent);
  outline-offset: 1px;
}

.filter-select:disabled {
  opacity: 0.55;
  cursor: not-allowed;
  background: #f3f4f6;
}
</style>