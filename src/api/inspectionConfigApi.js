import http from './http'

export const fetchInspectionConfigs = (params = {}) =>
  http.get('/inspection-configs', { params }).then((res) => res.data.data)

export const updateInspectionConfig = (id, payload) =>
  http.put(`/inspection-configs/${id}`, payload).then((res) => res.data.data)