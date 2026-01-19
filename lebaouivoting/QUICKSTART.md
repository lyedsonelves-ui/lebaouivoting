# ⚡ QUICK START - Deploy in 5 Minutes

## Step 1: Discord Setup (2 minutes)

1. Go to https://discord.com/developers/applications
2. Click "New Application" → Name it → Create
3. Go to **OAuth2** section
4. **COPY your Client ID** (you'll need this!)
5. Under **Redirects**, click "Add Redirect"
6. Add: `http://localhost:8000/` (for testing)

## Step 2: Get Your Server ID (30 seconds)

1. Open Discord
2. Settings → Advanced → Enable "Developer Mode"
3. Right-click your server icon → Copy ID
4. **Save this ID!**

## Step 3: Configure the Website (1 minute)

Open `js/config.js` and update these TWO lines:

```javascript
clientId: 'PASTE_YOUR_CLIENT_ID_HERE',
serverId: 'PASTE_YOUR_SERVER_ID_HERE',
```

That's it for configuration! ✅

## Step 4: Deploy to Vercel (1 minute)

### Option A: Drag & Drop (Easiest!)
1. Go to https://vercel.com
2. Sign up with GitHub
3. Drag the entire `lebaouivoting` folder onto Vercel
4. Click Deploy
5. Done! ✅

### Option B: Command Line
```bash
npm install -g vercel
vercel login
vercel
```

## Step 5: Final Discord Update (30 seconds)

1. Copy your Vercel URL (e.g., `https://your-app.vercel.app`)
2. Back to Discord Developer Portal
3. OAuth2 → Redirects → Add Redirect
4. Paste: `https://your-app.vercel.app/`
5. Save Changes

## 🎉 You're Live!

Visit your site and test:
1. Click "Login with Discord"
2. Authorize the app
3. Vote for a candidate
4. Check the results page

## 🔧 Quick Customization

Want to change candidate info? Edit `js/config.js`:

```javascript
candidates: [
  {
    id: 'horsy',
    name: 'Horsy',
    slogan: 'Your slogan here',
    color: '#E74C3C',  // Change color
    description: 'Your description',
    vision: [
      'Vision point 1',
      'Vision point 2'
    ],
    campaign: 'Campaign message'
  }
]
```

## 🆘 Having Issues?

### "OAuth Error"
- Check Client ID is correct in `config.js`
- Verify redirect URI in Discord matches your Vercel URL exactly

### "Can't Vote"
- Make sure you're logged in
- Check if you already voted (one vote only!)

### "Nothing Loads"
- Check browser console (F12) for errors
- Verify all files uploaded to Vercel

## 📚 Need More Help?

Read the full guides:
- `README.md` - Complete documentation
- `DEPLOYMENT.md` - Detailed deployment guide

## 🎯 Testing Locally First?

```bash
# Serve files locally
python -m http.server 8000
# or
npx serve

# Visit: http://localhost:8000
```

---

**That's it! Your Lebanese Discord Election is now LIVE! 🇱🇧**

Share with your community and let democracy begin! 🗳️

يد بيد، نحو مستقبل أفضل
