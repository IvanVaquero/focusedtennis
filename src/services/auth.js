// Authentication Service for Admin Access

// Production credentials - CHANGE THESE IN PRODUCTION!
const ADMIN_CREDENTIALS = {
  username: 'adminFor_tennis_20202',
  password: 's9sddg@#^&Ys2~'
};

// Session storage key
const AUTH_SESSION_KEY = 'admin_for_tennis_session';

// Session timeout (24 hours)
const SESSION_TIMEOUT = 24 * 60 * 60 * 1000;

// Generate a secure session token
const generateSessionToken = () => {
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substring(2);
  return btoa(`${timestamp}_${random}_${ADMIN_CREDENTIALS.username}`).replace(/[^a-zA-Z0-9]/g, '');
};

// Hash password for comparison (simple hash for demo - use proper hashing in production)
const hashPassword = (password) => {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return hash.toString();
};

// Store session in localStorage
const storeSession = (token) => {
  const session = {
    token,
    username: ADMIN_CREDENTIALS.username,
    loginTime: Date.now(),
    isAuthenticated: true
  };
  localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
};

// Get session from localStorage
const getSession = () => {
  try {
    const sessionData = localStorage.getItem(AUTH_SESSION_KEY);
    if (!sessionData) return null;

    const session = JSON.parse(sessionData);
    
    // Check if session is expired
    if (Date.now() - session.loginTime > SESSION_TIMEOUT) {
      localStorage.removeItem(AUTH_SESSION_KEY);
      return null;
    }

    return session;
  } catch (error) {
    console.error('Error reading session:', error);
    localStorage.removeItem(AUTH_SESSION_KEY);
    return null;
  }
};

// Clear session
const clearSession = () => {
  localStorage.removeItem(AUTH_SESSION_KEY);
};

// Authentication functions
export const login = async (username, password) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Validate credentials
  if (username !== ADMIN_CREDENTIALS.username) {
    return {
      success: false,
      message: 'Invalid username or password'
    };
  }

  if (password !== ADMIN_CREDENTIALS.password) {
    return {
      success: false,
      message: 'Invalid username or password'
    };
  }

  // Create session
  const token = generateSessionToken();
  storeSession(token);

  return {
    success: true,
    message: 'Login successful'
  };
};

export const logout = () => {
  clearSession();
};

export const isAuthenticated = () => {
  const session = getSession();
  return session?.isAuthenticated || false;
};

export const getCurrentUser = () => {
  return getSession();
};

export const checkSession = () => {
  const session = getSession();
  if (!session) {
    clearSession();
    return false;
  }
  return true;
};

// Auto-check session on app load
export const initializeAuth = () => {
  checkSession();
};

// Export credentials for reference (remove in production)
export const getAdminCredentials = () => {
  return { ...ADMIN_CREDENTIALS };
};
