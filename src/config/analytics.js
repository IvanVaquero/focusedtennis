// Analytics Configuration
// Replace 'GA_MEASUREMENT_ID' with your actual Google Analytics Measurement ID

export const ANALYTICS_CONFIG = {
  // Google Analytics Measurement ID
  // Get this from your Google Analytics account
  MEASUREMENT_ID: 'G-XXXXXXXXXX',
  
  // Enable/disable analytics (useful for development)
  ENABLED: process.env.NODE_ENV === 'production',
  
  // Debug mode (shows analytics events in console)
  DEBUG: process.env.NODE_ENV === 'development',
  
  // Custom dimensions (optional)
  CUSTOM_DIMENSIONS: {
    USER_TYPE: 'user_type',
    LANGUAGE: 'language',
    FORM_STEP: 'form_step'
  }
}

// Instructions for setup:
// 1. Go to https://analytics.google.com/
// 2. Create a new property or use an existing one
// 3. Go to Admin > Data Streams > Web
// 4. Copy your Measurement ID (format: G-XXXXXXXXXX)
// 5. Replace 'GA_MEASUREMENT_ID' in this file and index.html
// 6. Test in Google Analytics Real-time reports
