import axios from 'axios'
import SERVICE_URL from '@/config/url'

export const http = axios.create({
  baseURL: `${SERVICE_URL}`,
  headers: { 'Content-Type': 'application/json' }
})