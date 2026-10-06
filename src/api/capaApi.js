import http from './http'

export const fetchCapaRequests = (params = {}) =>
  http.get('/capa-requests', { params }).then((res) => res.data.data)