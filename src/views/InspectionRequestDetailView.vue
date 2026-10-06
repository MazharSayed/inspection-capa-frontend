<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { fetchInspectionRequest } from '../api/inspectionRequestApi'
import { formatDate, formatTime } from '../utils/date'
import ApprovalTimeline from '../components/ApprovalTimeline.vue'
import DocumentPreviewModal from '../components/DocumentPreviewModal.vue'
import PageHeader from '../components/PageHeader.vue'
import StatusBadge from '../components/StatusBadge.vue'

const route = useRoute()

const request = ref(null)
const loading = ref(false)
const error = ref('')
const preview = ref(null)

const dotColors = { approved: 'success', rejected: 'danger', pending: 'warning' }

const headerDots = computed(() =>
  (request.value?.approvals ?? []).map((approval) => dotColors[approval.status]),
)

const detailFields = computed(() => {
  const d = request.value?.details
  if (!d) return []

  const c = request.value.capa

  return [
    { label: 'Floor', value: d.floor },
    { label: 'Unit', value: d.unit },
    { label: 'Division', value: d.division },
    { label: 'Sub Division', value: d.sub_division },
    { label: 'Activity', value: d.activity },
    { label: 'Sub Activity', value: d.sub_activity },
    ...(c
      ? [
          { label: 'Defect Type', value: c.defect_type },
          { label: 'Defect Count', value: c.defect_count },
          { label: 'Approver', value: c.approver },
        ]
      : []),
    { label: 'Technician', value: d.technician, wide: true },
  ]
})

async function load(id) {
  loading.value = true
  error.value = ''
  request.value = null

  try {
    request.value = await fetchInspectionRequest(id)
  } catch (e) {
    error.value =
      e.response?.status === 404
        ? 'This inspection request was not found.'
        : 'Could not load the inspection request.'
  } finally {
    loading.value = false
  }
}

watch(() => route.params.id, load, { immediate: true })
</script>

<template>
  <PageHeader title="Inspection Request Detail" />

  <p v-if="loading" class="state">Loading...</p>
  <p v-else-if="error" class="state error">{{ error }}</p>

  <section v-else-if="request" class="card">
    <header class="summary">
      <h2>{{ request.project }}</h2>

      <span class="meta">
        <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
          <rect x="4" y="5" width="16" height="15" rx="2" fill="none" stroke="currentColor" stroke-width="1.8" />
          <path d="M4 10h16M9 3v4M15 3v4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
        </svg>
        {{ formatDate(request.requested_at) }}
      </span>

      <span class="meta">
        <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
          <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8" />
          <path d="M12 7v5l3 2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
        </svg>
        {{ formatTime(request.requested_at) }}
      </span>

      <StatusBadge :status="request.status" :dots="headerDots" />
    </header>

    <div class="body">
      <div class="left">
        <h3>Request Details</h3>

        <dl class="fields">
          <div v-for="field in detailFields" :key="field.label" :class="{ wide: field.wide }">
            <dt>{{ field.label }}</dt>
            <dd>{{ field.value }}</dd>
          </div>
        </dl>

        <ul v-if="request.documents.length" class="documents">
          <li v-for="doc in request.documents" :key="doc.id">
            <span>{{ doc.name }}</span>
            <button class="view" type="button" @click="preview = doc">
              View
              <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
                <path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" />
                <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="1.8" />
              </svg>
            </button>
          </li>
        </ul>
      </div>

      <div class="right">
        <h3>Approval Status</h3>
        <ApprovalTimeline :approvals="request.approvals" />
      </div>
    </div>
  </section>

  <DocumentPreviewModal
    v-if="preview"
    :key="preview.id"
    :title="preview.name"
    :url="preview.url"
    @close="preview = null"
  />
</template>

<style scoped>
.summary {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 18px;
  margin-bottom: 24px;
}

.summary h2 {
  font-size: 18px;
  font-weight: 600;
  margin-right: 8px;
}

.meta {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13.5px;
  color: var(--text-muted);
}

.body {
  display: grid;
  grid-template-columns: 360px 1fr;
  gap: 36px;
}

h3 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 18px;
}

.fields {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px 16px;
}

.fields .wide {
  grid-column: 1 / -1;
}

dt {
  font-size: 12.5px;
  color: var(--text-muted);
}

dd {
  margin-top: 3px;
  font-size: 15px;
  font-weight: 600;
}

.documents {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 28px;
}

.documents li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  line-height: 20px;
  color: var(--text-muted);
}

.view {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0;
  border: 0;
  background: transparent;
  font-size: inherit;
  line-height: 18px;
  font-weight: 600;
  color: var(--text);
}

.view svg {
  display: block;
  flex-shrink: 0;
}

.view:hover {
  color: var(--accent);
}

@media (max-width: 900px) {
  .body {
    grid-template-columns: 1fr;
  }
}
</style>