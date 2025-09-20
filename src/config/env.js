// Environment Configuration for FocusedTennis
// This file centralizes all environment variable access

export const config = {
  // API Configuration
  API_BASE: import.meta.env.VITE_API_BASE || 'http://localhost:8000',
  ADMIN_TOKEN: import.meta.env.VITE_ADMIN_TOKEN || '9f2a7b4c5d8e10a3b6c9d2e4f7a1b3c59d7e4f2a1c0b8d7e6f5a4c3b2d1e0f9',

  // Brand Configuration
  BRAND_NAME: import.meta.env.VITE_BRAND_NAME || 'FocusedTennis',
  WEBSITE_URL: import.meta.env.VITE_WEBSITE_URL || 'https://focusedtennis.com',
  INSTAGRAM_URL: import.meta.env.VITE_INSTAGRAM_URL || 'https://instagram.com/focusedtennis',

  // Colors
  PRIMARY_COLOR: import.meta.env.VITE_PRIMARY_COLOR || '#3b82f6',
  SECONDARY_COLOR: import.meta.env.VITE_SECONDARY_COLOR || '#1f2937'
}

// Validation function to check if required environment variables are set
export const validateConfig = () => {
  const required = ['ADMIN_TOKEN']
  const missing = required.filter(key => !config[key])
  
  if (missing.length > 0) {
    console.warn('Missing required environment variables:', missing)
    console.warn('Please check your .env file and ensure all VITE_ prefixed variables are set')
  }
  
  return missing.length === 0
}

// Development helper to log current config (without sensitive data)
export const logConfig = () => {
  if (import.meta.env.DEV) {
    console.log('FocusedTennis Configuration:', {
      API_BASE: config.API_BASE,
      ADMIN_TOKEN: config.ADMIN_TOKEN ? '***SET***' : 'NOT SET',
      BRAND_NAME: config.BRAND_NAME,
      WEBSITE_URL: config.WEBSITE_URL,
      INSTAGRAM_URL: config.INSTAGRAM_URL
    })
  }
}
