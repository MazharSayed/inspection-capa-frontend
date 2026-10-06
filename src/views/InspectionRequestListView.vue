<script setup>
import { onMounted, reactive, ref } from 'vue'
import { fetchInspectionRequests } from '../api/inspectionRequestApi'
import { useFilterOptionsStore } from '../stores/filterOptions'
import { useCascadingFilters } from '../composables/useCascadingFilters'
import { useFilteredList } from '../composables/useFilteredList'
import { formatDate, formatTime } from '../utils/date'
import FilterSelect from '../components/FilterSelect.vue'
import PageHeader from '../components/PageHeader.vue'
import StatusBadge from '../components/StatusBadge.vue'

const filters = useFilterOptionsStore()

const selected = reactive({
  project_id: null,
  division_id: null,
  sub_division_id: null,
  activity_id: null,
  status: null,
})
const search = ref('')

const statusOptions = [
  { id: 'pending', name: 'Pending' },
  { id: 'approved', name: 'Approved' },
  { id: 'rejected', name: 'Rejected' },
]

const dotColors = { approved: 'success', rejected: 'danger', pending: 'warning' }
const dotsFor = (row) => row.approval_statuses.map((status) => dotColors[status])

const { divisionOptions, subDivisionOptions, activityOptions, enabled } = useCascadingFilters(selected)
const { rows, loading, error, load } = useFilteredList(fetchInspectionRequests, selected, search)

onMounted(async () => {
  try {
    await filters.load()
  } catch {
    error.value = 'Could not load the filter options.'
  }
  load()
})
</script>

<template>
  <PageHeader title="Inspection Requests" v-model:search="search" />

  <section class="card">
    <div class="filter-row">
      <span class="filter-label">Filter By</span>
      <FilterSelect v-model="selected.project_id" :options="filters.projects" placeholder="Project" />
      <FilterSelect v-model="selected.division_id" :options="divisionOptions" placeholder="Division" :disabled="!enabled.division" />
      <FilterSelect v-model="selected.sub_division_id" :options="subDivisionOptions" placeholder="Sub-Division" :disabled="!enabled.subDivision" />
      <FilterSelect v-model="selected.activity_id" :options="activityOptions" placeholder="Activity" :disabled="!enabled.activity" />
    </div>

    <p v-if="error" class="state error">{{ error }}</p>

    <div v-else class="table-wrap">
      <table class="data-table">
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Tower</th>
            <th>Floor</th>
            <th>Unit</th>
            <th>Activity</th>
            <th>Sub-Activity</th>
            <th>Technician</th>
            <th>Requested At</th>
            <th>Status</th>
            <th class="center">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in rows" :key="row.id">
            <td>{{ row.project }}</td>
            <td>{{ row.tower }}</td>
            <td>{{ row.floor }}</td>
            <td>{{ row.unit }}</td>
            <td>{{ row.activity }}</td>
            <td>{{ row.sub_activity }}</td>
            <td>{{ row.technician }}</td>
            <td class="nowrap">{{ formatDate(row.requested_at) }} | {{ formatTime(row.requested_at) }}</td>
            <td class="nowrap"><StatusBadge :status="row.status" :dots="dotsFor(row)" /></td>
            <td class="center">
              <RouterLink
                class="icon-btn"
                title="View"
                :to="{ name: 'inspection-request-detail', params: { id: row.id } }"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                  <path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" />
                  <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="1.8" />
                </svg>
              </RouterLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <p v-if="loading" class="state">Loading...</p>
    <p v-else-if="!error && !rows.length" class="state">No inspection requests found.</p>
  </section>
</template>