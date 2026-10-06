<script setup>
import { onMounted } from 'vue'
import { useFilterOptionsStore } from '../stores/filterOptions'
import { fetchInspectionConfigs } from '../api/inspectionConfigApi'

const filters = useFilterOptionsStore()

onMounted(async () => {
  await filters.load()
  const rows = await fetchInspectionConfigs()
  console.log('projects', filters.projects.length, 'configs', rows.length)
})
</script>

<template>
  <h1>Inspection Configuration</h1>
</template>