// API Configuration for FocusedTennis
export const API_CONFIG = {
  // Base URL for PHP API (adjust for your server setup)
  BASE_URL: 'http://localhost:8000/php/api', // Change this to your PHP server URL
  
  // Admin token for API authentication
  ADMIN_TOKEN: '9f2a7b4c5d8e10a3b6c9d2e4f7a1b3c59d7e4f2a1c0b8d7e6f5a4c3b2d1e0f9',
  
  // API endpoints
  ENDPOINTS: {
    CHECK_EMAIL: '/check-email.php',
    JOIN_WAITLIST: '/waitlist-join.php',
    LIST_WAITLIST: '/waitlist-list.php',
    ANALYTICS: '/waitlist-analytics.php'
  }
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
