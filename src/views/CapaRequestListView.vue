<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { fetchCapaRequests } from '../api/capaApi'
import { useFilterOptionsStore } from '../stores/filterOptions'
import { useCascadingFilters } from '../composables/useCascadingFilters'
import { useFilteredList } from '../composables/useFilteredList'
import { formatDate, formatTime } from '../utils/date'
import FilterDate from '../components/FilterDate.vue'
import FilterSelect from '../components/FilterSelect.vue'
import PageHeader from '../components/PageHeader.vue'
import StatusBadge from '../components/StatusBadge.vue'

const filters = useFilterOptionsStore()

const selected = reactive({
  project_id: null,
  division_id: null,
  sub_division_id: null,
  activity_id: null,
  sub_activity: null,
  created_at: '',
  status: null,
})
const search = ref('')

const { subDivisionOptions, activityOptions } = useCascadingFilters(selected)
const { rows, loading, error, load } = useFilteredList(fetchCapaRequests, selected, search)

const subActivityOptions = computed(() =>
  filters.subActivities.map((s) => ({ id: s.name, name: s.name })),
)

const statusOptions = computed(() =>
  filters.statuses.map((status) => ({
    id: status,
    name: status.charAt(0).toUpperCase() + status.slice(1),
  })),
)

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
  <PageHeader title="CAPA Requests List" v-model:search="search" />

  <section class="card">
    <div class="filter-row">
      <span class="filter-label">Filter By</span>
      <FilterSelect v-model="selected.project_id" :options="filters.projects" placeholder="Project" />
      <FilterSelect v-model="selected.division_id" :options="filters.divisions" placeholder="Division" />
      <FilterSelect v-model="selected.sub_division_id" :options="subDivisionOptions" placeholder="Sub-Division" />
      <FilterSelect v-model="selected.activity_id" :options="activityOptions" placeholder="Activity" />
      <FilterSelect v-model="selected.sub_activity" :options="subActivityOptions" placeholder="Sub-Activity" />
      <FilterDate v-model="selected.created_at" label="CAPA Created At" />
      <FilterSelect v-model="selected.status" :options="statusOptions" placeholder="Status" />
    </div>

    <p v-if="error" class="state error">{{ error }}</p>

    <div v-else class="table-wrap">
      <table class="data-table">
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Tower</th>
            <th>Division</th>
            <th>Activity</th>
            <th>Sub-Activity</th>
            <th>Defect Type</th>
            <th>Defect Count</th>
            <th>CAPA Created At</th>
            <th>Approver</th>
            <th>Status</th>
            <th class="center">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in rows" :key="row.id">
            <td>{{ row.project }}</td>
            <td>{{ row.tower }}</td>
            <td>{{ row.division }}</td>
            <td>{{ row.activity }}</td>
            <td>{{ row.sub_activity }}</td>
            <td>{{ row.defect_type }}</td>
            <td class="center">{{ row.defect_count }}</td>
            <td class="nowrap">{{ formatDate(row.capa_created_at) }} | {{ formatTime(row.capa_created_at) }}</td>
            <td>{{ row.approver }}</td>
            <td class="nowrap"><StatusBadge :status="row.status" /></td>
            <td class="center">
              <RouterLink
                v-if="row.inspection_request_id"
                class="icon-btn"
                title="View"
                :to="{ name: 'inspection-request-detail', params: { id: row.inspection_request_id } }"
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
    <p v-else-if="!error && !rows.length" class="state">No CAPA requests found.</p>
  </section>
</template>