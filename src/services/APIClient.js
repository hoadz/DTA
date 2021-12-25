import axios from 'axios'

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_BACKEND_API,
  timeout: process.env.VUE_APP_TIME_OUT,
  withCredentials: false,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.response.use(function(response) {
  const data = response.data
  if (data.status && data.status !== 200) {
    const error = new Error(data.message || data.data)
    error.status = data.status
    error.data = data.data
    throw error
  }
  return data
}, function(error) {
  return Promise.reject(error)
})

export default apiClient
