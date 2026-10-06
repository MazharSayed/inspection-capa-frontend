import http from './http'

export const fetchFilterOptions = () => http.get('/filters').then((res) => res.data)