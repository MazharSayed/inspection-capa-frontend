import http from './http'

export const fetchInspectionRequests = (params = {}) =>
  http.get('/inspection-requests', { params }).then((res) => res.data.data)

export const fetchInspectionRequest = (id) =>
  http.get(`/inspection-requests/${id}`).then((res) => res.data.data)