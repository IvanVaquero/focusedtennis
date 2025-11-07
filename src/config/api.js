// API Configuration for FocusedTennis
import { config } from './env.js'

export const API_CONFIG = {
  // Base URL for PHP API - automatically uses correct URL based on environment
  // Development: http://localhost:8000/php (from .env.local)
  // Production: https://fctennispro.com/php (default)
  BASE_URL: config.API_BASE + '/api',
  
  // Admin token for API authentication
  ADMIN_TOKEN: config.ADMIN_TOKEN,
  
  // API endpoints
  ENDPOINTS: {
    CHECK_EMAIL: '/check-email.php',
    JOIN_WAITLIST: '/waitlist-join.php',
    LIST_WAITLIST: '/waitlist-list.php',
    ANALYTICS: '/waitlist-analytics.php'
  }
}

// Log configuration in development mode
if (import.meta.env.DEV) {
  console.log('🔧 API Configuration:')
  console.log('   Environment:', import.meta.env.MODE)
  console.log('   API Base URL:', API_CONFIG.BASE_URL)
  console.log('   🔵 DEV MODE: Connecting to LOCAL PHP server')
  console.log('   📁 Data saves to: LOCAL storage file')
  console.log('   ⚠️  This is CORRECT for development!')
} else {
  console.log('🚀 API Configuration:')
  console.log('   Environment:', 'production')
  console.log('   API Base URL:', API_CONFIG.BASE_URL)
  console.log('   🟢 PRODUCTION: Connecting to Hostinger server')
  console.log('   📁 Data saves to: HOSTINGER storage file')
}

// API helper functions
export const apiRequest = async (endpoint, data = null, method = 'POST') => {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`
  
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'X-Admin-Token': API_CONFIG.ADMIN_TOKEN
    }
  }
  
  if (data && method !== 'GET') {
    options.body = JSON.stringify(data)
  }
  
  const response = await fetch(url, options)
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.error || `HTTP ${response.status}`)
  }
  
  return await response.json()
}

// Specific API functions
export const checkEmail = async (email) => {
  return await apiRequest(API_CONFIG.ENDPOINTS.CHECK_EMAIL, { email })
}

export const joinWaitlist = async (formData) => {
  return await apiRequest(API_CONFIG.ENDPOINTS.JOIN_WAITLIST, formData)
}

export const getWaitlistEntries = async () => {
  return await apiRequest(API_CONFIG.ENDPOINTS.LIST_WAITLIST, null, 'GET')
}

export const getWaitlistAnalytics = async () => {
  return await apiRequest(API_CONFIG.ENDPOINTS.ANALYTICS, null, 'GET')
}
