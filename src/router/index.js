import { createRouter, createWebHistory } from 'vue-router'
import InspectionConfigView from '../views/InspectionConfigView.vue'
import CapaRequestListView from '../views/CapaRequestListView.vue'
import InspectionRequestDetailView from '../views/InspectionRequestDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/admin-configuration' },
    {
      path: '/admin-configuration',
      name: 'inspection-config',
      component: InspectionConfigView,
      meta: { section: 'config' },
    },
    {
      path: '/capa-requests',
      name: 'capa-requests',
      component: CapaRequestListView,
      meta: { section: 'capa' },
    },
    {
      path: '/inspection-requests/:id',
      name: 'inspection-request-detail',
      component: InspectionRequestDetailView,
      meta: { section: 'capa' },
    },
  ],
})

export default router