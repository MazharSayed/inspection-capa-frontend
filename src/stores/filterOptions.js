import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchFilterOptions } from '../api/filtersApi'

export const useFilterOptionsStore = defineStore('filterOptions', () => {
  const projects = ref([])
  const divisions = ref([])
  const subDivisions = ref([])
  const activities = ref([])
  const subActivities = ref([])
  const statuses = ref([])
  const loaded = ref(false)

  async function load() {
    if (loaded.value) return

    const data = await fetchFilterOptions()
    projects.value = data.projects
    divisions.value = data.divisions
    subDivisions.value = data.sub_divisions
    activities.value = data.activities
    subActivities.value = data.sub_activities
    statuses.value = data.statuses
    loaded.value = true
  }

  const subDivisionsFor = (divisionId) =>
    divisionId ? subDivisions.value.filter((s) => s.division_id === divisionId) : subDivisions.value

  const activitiesFor = (subDivisionId) =>
    subDivisionId ? activities.value.filter((a) => a.sub_division_id === subDivisionId) : activities.value

  return {
    projects,
    divisions,
    subDivisions,
    activities,
    subActivities,
    statuses,
    loaded,
    load,
    subDivisionsFor,
    activitiesFor,
  }
})