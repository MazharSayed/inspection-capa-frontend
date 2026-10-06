import { ref, watch } from 'vue'

export function useFilteredList(fetcher, selected, search) {
  const rows = ref([])
  const loading = ref(false)
  const error = ref('')

  let latestRequest = 0
  let searchTimer

  async function load() {
    const requestId = ++latestRequest
    loading.value = true
    error.value = ''

    const params = Object.fromEntries(
      Object.entries({ ...selected, q: search.value.trim() }).filter(([, value]) => value),
    )

    try {
      const data = await fetcher(params)
      if (requestId === latestRequest) rows.value = data
    } catch {
      if (requestId === latestRequest) error.value = 'Could not load the data.'
    } finally {
      if (requestId === latestRequest) loading.value = false
    }
  }

  watch(selected, load)

  watch(search, () => {
    clearTimeout(searchTimer)
    searchTimer = setTimeout(load, 300)
  })

  return { rows, loading, error, load }
}