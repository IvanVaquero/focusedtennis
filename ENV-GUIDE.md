# Environment Files Guide

## 📋 Overview

This project uses **3 environment files** for different scenarios:

```
.env.development  → npm run dev (local development)
.env.production   → npm run build (production build)
.env.local        → Personal overrides (optional, not in Git)
```

---

## 📁 File Descriptions

### `.env.development` ✅ (Committed to Git)
- **Used for**: Local development (`npm run dev`)
- **API URL**: `http://localhost:8000/php`
- **Purpose**: Default settings for all developers
- **Git**: ✅ Committed (safe to share)

**When it's used**: Every time you run `npm run dev`

### `.env.production` ✅ (Committed to Git)
- **Used for**: Production builds (`npm run build`)
- **API URL**: `https://fctennispro.com/php`
- **Purpose**: Production deployment settings
- **Git**: ✅ Committed (safe to share)

**When it's used**: Every time you run `npm run build`

### `.env.local` ❌ (NOT in Git - Optional)
- **Used for**: Personal overrides (both dev and build)
- **Purpose**: Override any setting locally without affecting Git
- **Git**: ❌ Never committed (personal/sensitive)

**When it's used**: If you need different settings than the defaults

### `.env.example` ✅ (Committed to Git)
- **Used for**: Documentation/template
- **Purpose**: Shows what variables are available
- **Git**: ✅ Committed (template only)

---

## 🔄 How Vite Loads Environment Files

### During Development (`npm run dev`):
```
1. .env.development     ← Loaded first (defaults)
2. .env.local           ← Loaded second (overrides #1)
```

**Priority**: `.env.local` > `.env.development`

### During Build (`npm run build`):
```
1. .env.production      ← Loaded first (defaults)
2. .env.local           ← Loaded second (overrides #1)
```

**Priority**: `.env.local` > `.env.production`

---

## 🎯 Current Configuration

### Development (.env.development):
```env
VITE_API_BASE=http://localhost:8000/php
VITE_ADMIN_TOKEN=9f2a7b4c5d8e10a3b6c9d2e4f7a1b3c59d7e4f2a1c0b8d7e6f5a4c3b2d1e0f9
VITE_WEBSITE_URL=http://localhost:5173
```

### Production (.env.production):
```env
VITE_API_BASE=https://fctennispro.com/php
VITE_ADMIN_TOKEN=9f2a7b4c5d8e10a3b6c9d2e4f7a1b3c59d7e4f2a1c0b8d7e6f5a4c3b2d1e0f9
VITE_WEBSITE_URL=https://fctennispro.com
```

---

## 🧪 Testing Different Environments

### Test Development:
```bash
# Uses .env.development
npm run dev

# Check browser console, should see:
# API Base URL: http://localhost:8000/php/api
```

### Test Production Build:
```bash
# Uses .env.production
npm run build

# Check built files:
grep -r "fctennispro.com" dist/
```

### Test with Local Override:
```bash
# Create .env.local with custom settings
echo "VITE_API_BASE=http://localhost:9000/php" > .env.local

# Now npm run dev will use port 9000 instead of 8000
npm run dev
```

---

## 📊 Visual Summary

```
┌─────────────────────────────────────────────────────┐
│  npm run dev (Development)                          │
├─────────────────────────────────────────────────────┤
│  1. Load: .env.development                          │
│     VITE_API_BASE=http://localhost:8000/php         │
│                                                     │
│  2. Override with: .env.local (if exists)           │
│     VITE_API_BASE=http://localhost:9000/php  ← Wins│
│                                                     │
│  Result: http://localhost:9000/php/api              │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  npm run build (Production)                         │
├─────────────────────────────────────────────────────┤
│  1. Load: .env.production                           │
│     VITE_API_BASE=https://fctennispro.com/php       │
│                                                     │
│  2. Override with: .env.local (if exists)           │
│     (none in this case)                             │
│                                                     │
│  Result: https://fctennispro.com/php/api            │
└─────────────────────────────────────────────────────┘
```

---

## ✅ Git Tracking

| File | Tracked in Git? | Why? |
|------|----------------|------|
| `.env.development` | ✅ Yes | Team defaults for dev |
| `.env.production` | ✅ Yes | Deployment settings |
| `.env.local` | ❌ No | Personal/sensitive |
| `.env.example` | ✅ Yes | Documentation |

---

## 🔐 Security Notes

1. **Admin Token**: Currently the same in both files for simplicity
   - Consider using different tokens for dev/prod in a real app
   
2. **Sensitive Data**: Never put sensitive data in committed files
   - Use `.env.local` for sensitive overrides
   
3. **Production Secrets**: For production, consider:
   - Server-side environment variables
   - Secrets management service
   - Different admin tokens

---

## 🚀 Deployment to Hostinger

When deploying:

```bash
# Build with production settings
npm run build

# The dist/ folder will have:
# - API URL: https://fctennispro.com/php
# - All production settings from .env.production

# Upload dist/ contents to Hostinger
# No additional configuration needed!
```

---

## 🛠️ Common Scenarios

### Scenario 1: Change local PHP port
```bash
# Create/edit .env.local
echo "VITE_API_BASE=http://localhost:9000/php" > .env.local

# Restart dev server
npm run dev
```

### Scenario 2: Test against staging server
```bash
# Create/edit .env.local
echo "VITE_API_BASE=https://staging.fctennispro.com/php" > .env.local

# Run dev server
npm run dev
```

### Scenario 3: Reset to defaults
```bash
# Delete .env.local
rm .env.local

# Restart dev server (uses .env.development)
npm run dev
```

---

## 📝 Quick Reference

```bash
# View current development settings
cat .env.development

# View current production settings
cat .env.production

# Check if you have local overrides
cat .env.local

# See which variables are available
cat .env.example

# Test what URLs will be used
npm run dev    # Check browser console
npm run build  # Check dist/ files
```

---

## 🎯 Summary

- **Development**: Uses `.env.development` (localhost:8000)
- **Production**: Uses `.env.production` (fctennispro.com)
- **Personal**: Create `.env.local` to override anything
- **Git**: Only `.env.local` is ignored, rest are committed

**Everything is set up and ready to go!** 🚀
