const COOKIE_CONSENT_KEY = 'cookie-consent'
const COOKIE_SETTINGS_KEY = 'cookie-settings'

export class CookieManager {
  constructor() {
    this.settings = this.loadSettings()
  }

  static getInstance() {
    if (!CookieManager.instance) {
      CookieManager.instance = new CookieManager()
    }
    return CookieManager.instance
  }

  loadSettings() {
    try {
      const consent = localStorage.getItem(COOKIE_CONSENT_KEY)
      const settings = localStorage.getItem(COOKIE_SETTINGS_KEY)
      
      return {
        showBanner: !consent,
        consent: consent ? JSON.parse(consent) : null
      }
    } catch (error) {
      console.error('Error loading cookie settings:', error)
      return {
        showBanner: true,
        consent: null
      }
    }
  }

  saveSettings() {
    try {
      if (this.settings.consent) {
        localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(this.settings.consent))
      }
      localStorage.setItem(COOKIE_SETTINGS_KEY, JSON.stringify(this.settings))
    } catch (error) {
      console.error('Error saving cookie settings:', error)
    }
  }

  getSettings() {
    return { ...this.settings }
  }

  hasConsent() {
    return this.settings.consent !== null
  }

  shouldShowBanner() {
    return this.settings.showBanner
  }

  acceptAll() {
    this.settings.consent = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
      timestamp: Date.now()
    }
    this.settings.showBanner = false
    this.saveSettings()
    this.initializeCookies()
  }

  rejectAll() {
    this.settings.consent = {
      necessary: true, // Always true as required
      analytics: false,
      marketing: false,
      preferences: false,
      timestamp: Date.now()
    }
    this.settings.showBanner = false
    this.saveSettings()
    this.initializeCookies()
  }

  updateConsent(consent) {
    if (!this.settings.consent) {
      this.settings.consent = {
        necessary: true,
        analytics: false,
        marketing: false,
        preferences: false,
        timestamp: Date.now()
      }
    }

    this.settings.consent = {
      ...this.settings.consent,
      ...consent,
      necessary: true, // Always true
      timestamp: Date.now()
    }
    this.settings.showBanner = false
    this.saveSettings()
    this.initializeCookies()
  }

  resetConsent() {
    this.settings.showBanner = true
    this.settings.consent = null
    localStorage.removeItem(COOKIE_CONSENT_KEY)
    this.saveSettings()
  }

  initializeCookies() {
    if (!this.settings.consent) return

    // Initialize analytics cookies if consented
    if (this.settings.consent.analytics) {
      this.initializeAnalytics()
    }

    // Initialize marketing cookies if consented
    if (this.settings.consent.marketing) {
      this.initializeMarketing()
    }

    // Initialize preference cookies if consented
    if (this.settings.consent.preferences) {
      this.initializePreferences()
    }
  }

  initializeAnalytics() {
    // Google Analytics or other analytics tools would be initialized here
    
    // Example: Initialize Google Analytics
    // gtag('consent', 'update', {
    //   'analytics_storage': 'granted'
    // })
  }

  initializeMarketing() {
    // Marketing cookies initialization
    
    // Example: Initialize Facebook Pixel, Google Ads, etc.
  }

  initializePreferences() {
    // Preference cookies initialization
    
    // Example: Initialize user preference tracking
  }

  // Cookie utility methods
  setCookie(name, value, days = 365) {
    if (!this.hasConsent()) return

    const expires = new Date()
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000))
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`
  }

  getCookie(name) {
    const nameEQ = name + "="
    const ca = document.cookie.split(';')
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) === ' ') c = c.substring(1, c.length)
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
    }
    return null
  }

  deleteCookie(name) {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`
  }

  // Check if specific cookie type is allowed
  canUseAnalytics() {
    return this.settings.consent?.analytics || false
  }

  canUseMarketing() {
    return this.settings.consent?.marketing || false
  }

  canUsePreferences() {
    return this.settings.consent?.preferences || false
  }
}

// Export singleton instance
export const cookieManager = CookieManager.getInstance()
