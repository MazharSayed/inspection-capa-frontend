<script setup>
import { computed } from 'vue'

const props = defineProps({
  status: { type: String, required: true },
  dots: { type: Array, default: null },
})

const presets = {
  open: { label: 'Open', dots: ['success', 'warning'] },
  rejected: { label: 'Rejected', dots: ['success', 'danger'] },
  closed: { label: 'Closed', dots: ['success'] },
  approved: { label: 'Approved', dots: ['success'] },
  pending: { label: 'Pending', dots: ['warning'] },
}

const preset = computed(() => presets[props.status] ?? { label: props.status, dots: [] })
const dotColors = computed(() => props.dots ?? preset.value.dots)
</script>

<template>
  <span class="status">
    <span class="dots">
      <i v-for="(color, index) in dotColors" :key="index" :class="color"></i>
    </span>
    {{ preset.label }}
  </span>
</template>

<style scoped>
.status {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--text);
}

.dots {
  display: inline-flex;
  gap: 3px;
}

i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.success {
  background: var(--success);
}

.warning {
  background: var(--warning);
}

.danger {
  background: var(--danger);
}
</style>