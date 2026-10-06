import { computed, watch } from 'vue'
import { useFilterOptionsStore } from '../stores/filterOptions'

// Project -> Division -> Sub-Division -> Activity -> Sub-Activity.
// Each level is enabled only after its parent is chosen and lists only related options.
export function useCascadingFilters(selected) {
  const filters = useFilterOptionsStore()

  const projectSubActivities = computed(() =>
    selected.project_id
      ? filters.subActivities.filter((s) => s.project_id === selected.project_id)
      : [],
  )

  const projectActivities = computed(() => {
    const ids = new Set(projectSubActivities.value.map((s) => s.activity_id))
    return filters.activities.filter((a) => ids.has(a.id))
  })

  const projectSubDivisions = computed(() => {
    const ids = new Set(projectActivities.value.map((a) => a.sub_division_id))
    return filters.subDivisions.filter((s) => ids.has(s.id))
  })

  const divisionOptions = computed(() => {
    const ids = new Set(projectSubDivisions.value.map((s) => s.division_id))
    return filters.divisions.filter((d) => ids.has(d.id))
  })

  const subDivisionOptions = computed(() =>
    selected.division_id
      ? projectSubDivisions.value.filter((s) => s.division_id === selected.division_id)
      : [],
  )

  const activityOptions = computed(() =>
    selected.sub_division_id
      ? projectActivities.value.filter((a) => a.sub_division_id === selected.sub_division_id)
      : [],
  )

  const subActivityOptions = computed(() =>
    selected.activity_id
      ? projectSubActivities.value.filter((s) => s.activity_id === selected.activity_id)
      : [],
  )

  const enabled = computed(() => ({
    division: !!selected.project_id,
    subDivision: !!selected.division_id,
    activity: !!selected.sub_division_id,
    subActivity: !!selected.activity_id,
  }))

  watch(
    () => selected.project_id,
    () => {
      selected.division_id = null
    },
  )

  watch(
    () => selected.division_id,
    () => {
      selected.sub_division_id = null
    },
  )

  watch(
    () => selected.sub_division_id,
    () => {
      selected.activity_id = null
    },
  )

  watch(
    () => selected.activity_id,
    () => {
      if ('sub_activity_id' in selected) selected.sub_activity_id = null
    },
  )

  return { divisionOptions, subDivisionOptions, activityOptions, subActivityOptions, enabled }
}