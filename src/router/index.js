import { createRouter, createWebHistory } from 'vue-router'
import InspectionConfigView from '../views/InspectionConfigView.vue'
import CapaRequestListView from '../views/CapaRequestListView.vue'
import InspectionRequestDetailView from '../views/InspectionRequestDetailView.vue'
import InspectionRequestListView from '../views/InspectionRequestListView.vue'
import WorkInProgressView from '../views/WorkInProgressView.vue'

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
    {
      path: '/inspection-requests',
      name: 'inspection-requests',
      component: InspectionRequestListView,
      meta: { section: 'requests' },
    },
    {
      path: '/capa-requests/:id',
      name: 'capa-request-detail',
      component: WorkInProgressView,
      meta: { section: 'capa', title: 'CAPA Request Detail' },
    },
  ],
})

export default router