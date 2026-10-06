<script setup>
import { reactive, ref } from 'vue'
import { updateInspectionConfig } from '../api/inspectionConfigApi'
import LevelBadge from './LevelBadge.vue'

const props = defineProps({
  config: { type: Object, required: true },
  mode: { type: String, default: 'view' },
})

const emit = defineEmits(['close', 'saved'])

const form = reactive({
  level_engineer: props.config.level_engineer,
  level_qcs: props.config.level_qcs,
  level_qaqc: props.config.level_qaqc,
  random_inspection_count: props.config.random_inspection_count ?? '',
})

const saving = ref(false)
const errors = ref({})

async function save() {
  saving.value = true
  errors.value = {}

  try {
    const count = form.random_inspection_count
    const updated = await updateInspectionConfig(props.config.id, {
      level_engineer: form.level_engineer,
      level_qcs: form.level_qcs,
      level_qaqc: form.level_qaqc,
      random_inspection_count: count === '' || count === null ? null : Number(count),
    })
    emit('saved', updated)
  } catch (error) {
    errors.value =
      error.response?.status === 422
        ? error.response.data.errors
        : { general: ['Could not save the changes. Please try again.'] }
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="overlay" @click.self="emit('close')">
    <div class="modal" role="dialog" aria-modal="true">
      <h2>{{ mode === 'edit' ? 'Edit configuration' : 'Configuration details' }}</h2>
      <p class="name">{{ config.name }}</p>

      <dl class="details">
        <dt>Project</dt>
        <dd>{{ config.project }}</dd>
        <dt>Division</dt>
        <dd>{{ config.division }}</dd>
        <dt>Sub-Division</dt>
        <dd>{{ config.sub_division }}</dd>
        <dt>Activity</dt>
        <dd>{{ config.activity }}</dd>
      </dl>

      <template v-if="mode === 'edit'">
        <div class="fields">
          <label><input v-model="form.level_engineer" type="checkbox" /> Level - Engineer</label>
          <label><input v-model="form.level_qcs" type="checkbox" /> Level - QCS</label>
          <label><input v-model="form.level_qaqc" type="checkbox" /> Level - QAQC</label>

          <label class="count">
            Random inspection count
            <input v-model="form.random_inspection_count" type="number" min="0" />
          </label>
        </div>

        <p v-for="(messages, field) in errors" :key="field" class="error">{{ messages[0] }}</p>

        <div class="buttons">
          <button type="button" class="secondary" @click="emit('close')">Cancel</button>
          <button type="button" class="primary" :disabled="saving" @click="save">
            {{ saving ? 'Saving...' : 'Save' }}
          </button>
        </div>
      </template>

      <template v-else>
        <div class="levels">
          <span>Engineer <LevelBadge :active="config.level_engineer" /></span>
          <span>QCS <LevelBadge :active="config.level_qcs" /></span>
          <span>QAQC <LevelBadge :active="config.level_qaqc" /></span>
        </div>
        <p class="count-view">Random inspection count: {{ config.random_inspection_count ?? '-' }}</p>

        <div class="buttons">
          <button type="button" class="secondary" @click="emit('close')">Close</button>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.45);
  z-index: 10;
}

.modal {
  width: 440px;
  max-width: calc(100vw - 32px);
  padding: 24px;
  background: var(--card-bg);
  border-radius: 14px;
}

h2 {
  font-size: 18px;
}

.name {
  margin: 4px 0 16px;
  color: var(--text-muted);
}

.details {
  display: grid;
  grid-template-columns: 110px 1fr;
  gap: 6px 12px;
  margin-bottom: 16px;
}

dt {
  color: var(--text-muted);
}

.fields {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.fields label {
  display: flex;
  align-items: center;
  gap: 8px;
}

.count {
  flex-direction: column;
  align-items: flex-start !important;
}

.count input {
  width: 100%;
  padding: 8px 10px;
  border: 1px solid var(--border);
  border-radius: 8px;
}

.levels {
  display: flex;
  gap: 18px;
  margin-bottom: 12px;
}

.levels span {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.error {
  margin-top: 10px;
  color: var(--danger);
}

.buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.primary,
.secondary {
  padding: 9px 18px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--card-bg);
}

.primary {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
}

.primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>