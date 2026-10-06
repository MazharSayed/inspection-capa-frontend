import http from './http'

export const fetchInspectionRequest = (id) =>
  http.get(`/inspection-requests/${id}`).then((res) => res.data.data)