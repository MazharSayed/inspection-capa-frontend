<script setup>
import { onMounted, reactive, ref } from 'vue'
import { fetchInspectionConfigs } from '../api/inspectionConfigApi'
import { useFilterOptionsStore } from '../stores/filterOptions'
import { useCascadingFilters } from '../composables/useCascadingFilters'
import { useFilteredList } from '../composables/useFilteredList'
import ConfigModal from '../components/ConfigModal.vue'
import FilterSelect from '../components/FilterSelect.vue'
import LevelBadge from '../components/LevelBadge.vue'
import PageHeader from '../components/PageHeader.vue'

const filters = useFilterOptionsStore()

const selected = reactive({
  project_id: null,
  division_id: null,
  sub_division_id: null,
  activity_id: null,
})
const search = ref('')
const modal = ref(null)

const { divisionOptions, subDivisionOptions, activityOptions, enabled } = useCascadingFilters(selected)
const { rows, loading, error, load } = useFilteredList(fetchInspectionConfigs, selected, search)

function onSaved(updated) {
  rows.value = rows.value.map((row) => (row.id === updated.id ? updated : row))
  modal.value = null
}

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
  <PageHeader title="Inspection Configuration" v-model:search="search" />

  <section class="card">
    <div class="filter-row">
      <span class="filter-label">Filter By</span>
      <FilterSelect v-model="selected.project_id" :options="filters.projects" placeholder="Project" />
      <FilterSelect v-model="selected.division_id" :options="divisionOptions" placeholder="Division" :disabled="!enabled.division" />
      <FilterSelect v-model="selected.sub_division_id" :options="subDivisionOptions" placeholder="Sub-Division" :disabled="!enabled.subDivision" />
      <FilterSelect v-model="selected.activity_id" :options="activityOptions" placeholder="Activity" :disabled="!enabled.activity" />
    </div>

    <p v-if="error" class="state error">{{ error }}</p>

    <table v-else class="data-table">
      <thead>
        <tr>
          <th>Sub Activity Name</th>
          <th class="center">Level - Engineer</th>
          <th class="center">Level - QCS</th>
          <th class="center">Level - QAQC</th>
          <th class="center">Random Inspection Count</th>
          <th class="center">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.id">
          <td>{{ row.name }}</td>
          <td class="center"><LevelBadge :active="row.level_engineer" /></td>
          <td class="center"><LevelBadge :active="row.level_qcs" /></td>
          <td class="center"><LevelBadge :active="row.level_qaqc" /></td>
          <td class="center">{{ row.random_inspection_count ?? '-' }}</td>
          <td class="center">
            <div class="actions">
              <button class="icon-btn" title="Edit" @click="modal = { config: row, mode: 'edit' }">
                <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                  <path d="M4 20h4L19 9l-4-4L4 16v4z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" />
                  <path d="M13.5 6.5l4 4" fill="none" stroke="currentColor" stroke-width="1.8" />
                </svg>
              </button>
              <span class="divider"></span>
              <button class="icon-btn" title="View" @click="modal = { config: row, mode: 'view' }">
                <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                  <path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" />
                  <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="1.8" />
                </svg>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-if="loading" class="state">Loading...</p>
    <p v-else-if="!error && !rows.length" class="state">No configurations found.</p>
  </section>

  <ConfigModal
    v-if="modal"
    :key="modal.config.id + modal.mode"
    :config="modal.config"
    :mode="modal.mode"
    @close="modal = null"
    @saved="onSaved"
  />
</template>