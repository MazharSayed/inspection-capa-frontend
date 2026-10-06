<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

defineProps({
  title: { type: String, default: 'Document' },
  url: { type: String, required: true },
})

const emit = defineEmits(['close'])

const loading = ref(true)
const failed = ref(false)

function onKey(event) {
  if (event.key === 'Escape') emit('close')
}

onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <Teleport to="body">
    <div class="overlay" @click.self="emit('close')">
      <div class="modal" role="dialog" aria-modal="true" :aria-label="title">
        <header class="modal-head">
          <h2>{{ title }}</h2>
          <button class="close" type="button" aria-label="Close" @click="emit('close')">
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            </svg>
          </button>
        </header>

        <div class="modal-body">
          <p v-if="loading && !failed" class="note">Loading...</p>
          <p v-if="failed" class="note error">Could not load this document.</p>

          <img
            v-show="!loading && !failed"
            :src="url"
            :alt="title"
            @load="loading = false"
            @error="failed = true"
          />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(0, 0, 0, 0.55);
}

.modal {
  display: flex;
  flex-direction: column;
  width: min(960px, 100%);
  max-height: 100%;
  background: var(--card-bg);
  border-radius: 14px;
  overflow: hidden;
}

.modal-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  border-bottom: 1px solid var(--border);
}

.modal-head h2 {
  font-size: 17px;
}

.close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: var(--text);
}

.close:hover {
  background: var(--page-bg);
}

.modal-body {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  padding: 16px;
  overflow: auto;
}

.modal-body img {
  max-width: 100%;
  max-height: 75vh;
  object-fit: contain;
}

.note {
  color: var(--text-muted);
}

.note.error {
  color: var(--danger);
}
</style>