# Quick Guide: Development vs Production

## ⚠️ IMPORTANT: This is CORRECT Behavior!

### 🔵 **Development (What You're Running Now)**

When you run `npm run dev`:
- ✅ **SHOULD** connect to `http://localhost:8000/php`
- ✅ **SHOULD** save to your LOCAL file: `php/storage/waitlist-verified.jsonl`
- ✅ This is **CORRECT** and **EXPECTED**!

**Why?** You're testing locally, so it uses your local PHP server and local storage.

---

### 🟢 **Production (After You Deploy to Hostinger)**

When you run `npm run build` and upload to Hostinger:
- ✅ **WILL** connect to `https://fctennispro.com/php`
- ✅ **WILL** save to HOSTINGER file: `/public_html/php/storage/waitlist-verified.jsonl`
- ✅ Completely separate from your local data

---

## 🧪 **How to Test**

### Right Now (Development):

1. **Restart your dev server**:
   ```bash
   npm run dev
   ```

2. **Open browser console** (F12)

3. **Look for this message**:
   ```
   🔧 API Configuration:
      Environment: development
      API Base URL: http://localhost:8000/php/api
      🔵 DEV MODE: Connecting to LOCAL PHP server
      📁 Data saves to: LOCAL storage file
      ⚠️  This is CORRECT for development!
   ```

4. **Fill out the form** - Data saves to your local file ✅

---

### Production Build (Test):

1. **Build for production**:
   ```bash
   npm run build
   ```

2. **Check the built files**:
   - The built JavaScript will have: `https://fctennispro.com/php/api`
   - NOT `localhost:8000`

3. **Preview (optional)**:
   ```bash
   npm run preview
   ```
   - This will show production behavior
   - API calls will try to reach `fctennispro.com` (will fail locally - that's expected!)

---

## 📊 **Visual Summary**

### Right Now (npm run dev):
```
Your Browser (localhost:5173)
    ↓ API calls to
localhost:8000/php/api
    ↓ Saves to
~/focusedtennis/php/storage/waitlist-verified.jsonl
```
**✅ This is CORRECT for development!**

### After Deploy (on Hostinger):
```
User's Browser (fctennispro.com)
    ↓ API calls to
fctennispro.com/php/api
    ↓ Saves to
/public_html/php/storage/waitlist-verified.jsonl
```
**✅ This will be CORRECT for production!**

---

## 🎯 **Key Point**

**You WANT different behavior in development vs production:**

| Aspect | Development | Production |
|--------|-------------|------------|
| **When** | `npm run dev` | `npm run build` + deploy |
| **API URL** | localhost:8000 | fctennispro.com |
| **Storage** | Your Mac | Hostinger server |
| **Is this correct?** | ✅ YES | ✅ YES |

**They are SUPPOSED to be different!**

---

## ✅ **Checklist**

To verify everything is set up correctly:

- [ ] Open browser console
- [ ] See the "🔧 API Configuration" message
- [ ] Confirms "DEV MODE: Connecting to LOCAL PHP server"
- [ ] Form submissions save to local file
- [ ] **This is exactly what should happen!** ✅

---

## 🚀 **When You Deploy to Hostinger**

1. Run `npm run build`
2. Upload `dist/` contents to `public_html/`
3. Upload `php/` folder to `public_html/php/`
4. The built app will automatically use `fctennispro.com` URLs
5. Data will save to Hostinger's storage
6. **No configuration changes needed!**

---

## 🤔 **Still Confused?**

**Question**: "Why is it connecting to my local file?"
**Answer**: Because you're in development mode - that's exactly what it should do!

**Question**: "When will it connect to Hostinger?"
**Answer**: After you build (`npm run build`) and deploy to Hostinger!

**Question**: "Is this wrong?"
**Answer**: No! This is perfect! Local development = local storage. Production = Hostinger storage.

---

## 📞 **Quick Test Commands**

```bash
# Check your .env.local (should have localhost:8000)
cat .env.local

# Restart dev server
npm run dev

# Build for production (will use fctennispro.com)
npm run build
```

---

**Bottom line**: If it's connecting to your local file during `npm run dev`, that's **perfect**! That's exactly what should happen! 🎉

