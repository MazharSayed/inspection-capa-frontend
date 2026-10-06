import { computed, watch } from 'vue'
import { useFilterOptionsStore } from '../stores/filterOptions'

export function useCascadingFilters(selected) {
  const filters = useFilterOptionsStore()

  const subDivisionOptions = computed(() => filters.subDivisionsFor(selected.division_id))

  const activityOptions = computed(() => {
    if (selected.sub_division_id) return filters.activitiesFor(selected.sub_division_id)

    if (selected.division_id) {
      const ids = subDivisionOptions.value.map((s) => s.id)
      return filters.activities.filter((a) => ids.includes(a.sub_division_id))
    }

    return filters.activities
  })

  watch(
    () => selected.division_id,
    () => {
      selected.sub_division_id = null
      selected.activity_id = null
    },
  )

  watch(
    () => selected.sub_division_id,
    () => {
      selected.activity_id = null
    },
  )

  return { subDivisionOptions, activityOptions }
}