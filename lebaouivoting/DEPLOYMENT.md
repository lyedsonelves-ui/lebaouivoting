# Lebanese Discord Elections - Setup Guide

## 🚀 Quick Deployment to Vercel

### Step 1: Prepare Your Project

1. Make sure all files are in the `lebaouivoting` folder
2. Initialize git (if not already):
   ```bash
   cd lebaouivoting
   git init
   git add .
   git commit -m "Initial commit - Lebanese Discord Elections"
   ```

### Step 2: Create Discord Application

1. Visit [Discord Developer Portal](https://discord.com/developers/applications)
2. Click **"New Application"**
3. Name it: `Lebanese Elections` (or your preferred name)
4. Click **Create**

### Step 3: Configure OAuth2

1. In your application, go to **OAuth2** section
2. Copy your **Client ID**
3. Under **Redirects**, add these temporarily:
   - `http://localhost:8000/`
   - We'll add Vercel URL after deployment

### Step 4: Get Your Discord Server ID

1. Open Discord
2. Go to **User Settings** → **Advanced**
3. Enable **Developer Mode**
4. Right-click your server icon → **Copy ID**

### Step 5: Update Configuration

Edit `js/config.js`:

```javascript
discord: {
  clientId: 'PASTE_YOUR_CLIENT_ID_HERE',
  serverId: 'PASTE_YOUR_SERVER_ID_HERE',
  // Rest remains unchanged
}
```

### Step 6: Deploy to Vercel

#### Method 1: Vercel Dashboard (Easiest)

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub (recommended)
3. Click **"Add New..."** → **"Project"**
4. Click **"Import Git Repository"** or upload folder
5. If using Git:
   - Push your code to GitHub first:
     ```bash
     # Create repo on GitHub, then:
     git remote add origin https://github.com/yourusername/lebanese-elections.git
     git branch -M main
     git push -u origin main
     ```
   - Import from GitHub in Vercel
6. Click **Deploy**

#### Method 2: Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login
vercel login

# Deploy (follow prompts)
vercel

# For production
vercel --prod
```

### Step 7: Update Discord Redirect

1. Copy your Vercel deployment URL (e.g., `https://lebanese-elections.vercel.app`)
2. Go back to [Discord Developer Portal](https://discord.com/developers/applications)
3. Select your application
4. Go to **OAuth2** → **Redirects**
5. Add: `https://your-vercel-url.vercel.app/`
6. Click **Save Changes**

### Step 8: Test Everything

1. Visit your deployed site
2. Click **"Login with Discord"**
3. Authorize the application
4. You should be redirected back logged in
5. Try voting
6. Check results page

## 🔧 Customization Guide

### Change Candidate Information

Edit `js/config.js` → `candidates` array:

```javascript
{
  id: 'candidate-id',        // Unique identifier (lowercase, no spaces)
  name: 'Full Name',         // Display name
  slogan: 'Campaign Slogan', // Main slogan
  color: '#FF5733',          // Hex color code
  description: '...',        // Brief description
  vision: [                  // Array of vision points
    'Point 1',
    'Point 2'
  ],
  campaign: 'Campaign message'
}
```

### Customize Colors

Edit `css/styles.css` → `:root` section:

```css
:root {
  --lebanese-red: #E74C3C;      /* Primary red */
  --cedar-green: #2ECC71;        /* Cedar green */
  --bg-primary: #0f0f1e;         /* Dark background */
  --bg-secondary: #1a1a2e;       /* Secondary background */
  --accent-primary: #E74C3C;     /* Accent color */
}
```

### Add Custom Domain (Optional)

1. In Vercel Dashboard, go to your project
2. Click **Settings** → **Domains**
3. Add your custom domain
4. Follow Vercel's DNS configuration instructions
5. Update Discord OAuth redirect to use custom domain

## 📊 Testing with Sample Data

To test with sample votes:

1. Open browser console (F12)
2. Run: `VotingSystem.addSampleVotes()`
3. Refresh the page
4. Check results page

**Remove this function before production!**

## 🔐 Security Recommendations

### For Small Communities (Current Setup)
✅ Good for: 10-100 members
✅ localStorage is acceptable
✅ Trust-based system

### For Larger Communities
Consider adding:
1. **Backend Server**: Node.js + Express
2. **Database**: PostgreSQL or MongoDB
3. **API Endpoints**: Vote validation
4. **WebSocket**: Real-time updates
5. **Rate Limiting**: Prevent abuse

## 📱 Mobile Testing

Test on:
- iPhone Safari
- Chrome Mobile
- Firefox Mobile
- Samsung Internet

Use Chrome DevTools device emulation for quick testing.

## 🐛 Common Issues & Solutions

### Issue: "OAuth Error"
**Solution**: 
- Verify Client ID is correct
- Check redirect URI matches exactly
- Ensure HTTPS in production

### Issue: "Votes not saving"
**Solution**:
- Check localStorage is enabled
- Not in incognito mode
- Clear browser cache

### Issue: "Mobile menu not working"
**Solution**:
- JavaScript enabled
- Clear cache
- Try different browser

### Issue: "Results not updating"
**Solution**:
- Hard refresh (Ctrl+Shift+R)
- Check browser console for errors
- Verify localStorage has data

## 🎨 Design Customization

### Change Logo/Branding

1. Create your favicon
2. Update in HTML files:
```html
<link rel="icon" href="path/to/your/favicon.ico">
```

### Modify Layout

All layouts are in `css/styles.css`. Key sections:
- `.hero` - Landing page hero
- `.candidates-grid` - Candidate cards
- `.voting-grid` - Voting interface
- `.results-grid` - Results display

### Add Images

Create an `images/` folder and add:
```html
<img src="images/candidate-photo.jpg" alt="Candidate Name">
```

Update CSS to display images in candidate cards.

## 📈 Analytics (Optional)

Add Google Analytics or Vercel Analytics:

### Vercel Analytics
1. In Vercel Dashboard → Project → Analytics
2. Enable Analytics
3. It's free!

### Google Analytics
Add to `<head>` of each HTML file:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🔄 Updating Content

### Update Live Site

```bash
# Make changes to files
git add .
git commit -m "Update candidate information"
git push

# Vercel auto-deploys on push
# Or manually: vercel --prod
```

### Rollback if Needed

In Vercel Dashboard:
1. Go to Deployments
2. Find previous version
3. Click **Promote to Production**

## 💾 Backup & Export

### Export Votes
```javascript
// In browser console
VotingSystem.exportData()
```

Downloads JSON file with all voting data.

### Backup Project
```bash
# Create backup
zip -r lebanese-elections-backup.zip lebaouivoting/

# Or use Git
git push origin main
```

## 🎯 Launch Checklist

Before announcing to community:

- [ ] Discord OAuth configured correctly
- [ ] Deployed to Vercel successfully
- [ ] Redirect URI added to Discord
- [ ] Tested login flow
- [ ] Tested voting (create test account)
- [ ] Verified results display correctly
- [ ] Tested on mobile device
- [ ] All candidate info is accurate
- [ ] Removed debug functions
- [ ] Set custom domain (optional)
- [ ] Analytics configured (optional)
- [ ] Backup created
- [ ] Announcement message prepared

## 📞 Support & Help

If you encounter issues:

1. **Check README.md** - Comprehensive guide
2. **Browser Console** - Check for errors (F12)
3. **Vercel Logs** - Check deployment logs
4. **Discord Developer Portal** - Verify OAuth settings
5. **GitHub Issues** - Report bugs

## 🎉 Ready to Launch!

Your Lebanese Discord Election website is ready! Share with your community and let democracy thrive! 🇱🇧

**يد بيد، نحو مستقبل أفضل**
