# � Lebaoui Elections

A professional, responsive election campaign website for Discord server leadership elections. Built with vanilla HTML, CSS, and JavaScript.

![Lebaoui Elections](https://img.shields.io/badge/Status-Live-success)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## 🌟 Features

### Core Functionality
- **Discord OAuth2 Authentication** - Secure login via Discord
- **One Vote Per User** - Each Discord account can vote only once
- **Immutable Votes** - Votes cannot be changed after submission
- **Live Results** - Real-time voting results visible to everyone
- **Responsive Design** - Mobile-first, works on all devices
- **Lebaoui Theme** - Modern design with vibrant gradient aesthetics

### Pages
1. **Landing Page** (`index.html`) - Campaign overview and statistics
2. **Candidates** (`candidates.html`) - Detailed candidate profiles
3. **Vote** (`vote.html`) - Secure voting interface
4. **Results** (`results.html`) - Live election results and analytics

### Candidates
- **Horsy** - The real deal (not gay)
- **Hellnest** - Albanian kid
- **Star** - Mexican Immigrant
- **Deku** - Retro games molester
- **Nig** - Just another kid
- **Sweeve** - drug abuser

## 📋 Prerequisites

- A Discord account
- A Discord server (guild)
- Discord Application with OAuth2 configured
- Vercel account (for free hosting)

## 🚀 Quick Start

### 1. Clone/Download the Project

```bash
git clone <your-repo-url>
cd lebaouivoting
```

### 2. Configure Discord OAuth2

#### Create Discord Application
1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application"
3. Give it a name (e.g., "Lebaoui Elections")
4. Navigate to **OAuth2** section

#### Get Credentials
1. Copy your **Client ID**
2. Add redirect URI: `https://your-domain.vercel.app/` (you'll update this after deploying)

#### Update Configuration
Open `js/config.js` and update:

```javascript
discord: {
  clientId: 'YOUR_DISCORD_CLIENT_ID', // Replace with your actual Client ID
  serverId: 'YOUR_DISCORD_SERVER_ID', // Replace with your server's ID (optional)
  // ... rest stays the same
}
```

**Getting Your Server ID:**
1. Enable Developer Mode in Discord (User Settings > Advanced > Developer Mode)
2. Right-click your server icon
3. Click "Copy ID"

### 3. Deploy to Vercel (FREE)

#### Option A: Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

#### Option B: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "Add New Project"
4. Import your Git repository
5. Click "Deploy"

**Your site will be live at:** `https://your-project.vercel.app`

### 4. Update Discord Redirect URI

After deployment:
1. Copy your Vercel URL (e.g., `https://lebanese-elections.vercel.app`)
2. Go back to [Discord Developer Portal](https://discord.com/developers/applications)
3. Navigate to OAuth2 > Redirects
4. Add: `https://your-vercel-url.vercel.app/`
5. Save Changes

### 5. Test Your Application

1. Visit your deployed site
2. Click "Login with Discord"
3. Authorize the application
4. You should be redirected back and logged in
5. Cast a vote!

## 📁 Project Structure

```
lebaouivoting/
├── index.html              # Landing page
├── candidates.html         # Candidates showcase
├── vote.html              # Voting interface
├── results.html           # Live results
├── css/
│   └── styles.css         # Main stylesheet
├── js/
│   ├── config.js          # Configuration
│   ├── auth.js            # Discord OAuth
│   ├── voting.js          # Voting system
│   ├── main.js            # Landing page logic
│   ├── candidates.js      # Candidates page logic
│   ├── vote-page.js       # Voting page logic
│   └── results.js         # Results page logic
├── vercel.json            # Vercel configuration
├── .gitignore             # Git ignore file
└── README.md              # This file
```

## 🎨 Customization

### Modify Candidates

Edit `js/config.js`:

```javascript
candidates: [
  {
    id: 'unique-id',
    name: 'Candidate Name',
    slogan: 'Your Slogan',
    color: '#HEX_COLOR',
    description: 'Brief description',
    vision: [
      'Vision point 1',
      'Vision point 2',
      // ...
    ],
    campaign: 'Campaign message'
  }
]
```

### Change Colors

Edit CSS variables in `css/styles.css`:

```css
:root {
  --lebanese-red: #E74C3C;
  --cedar-green: #2ECC71;
  --bg-primary: #0f0f1e;
  /* ... */
}
```

### Update Branding

- Change favicon in each HTML file (`<link rel="icon" ...>`)
- Update meta tags for SEO
- Modify footer content

## 🔒 Security Notes

### Current Implementation (Client-Side)

⚠️ **IMPORTANT**: The current implementation uses `localStorage` for vote storage. This is suitable for:
- Demonstrations
- Small, trusted communities
- Testing purposes

### For Production Use

For a real election with high stakes, implement:

1. **Backend Server** (Node.js/Python/PHP)
   - Database (PostgreSQL/MySQL/MongoDB)
   - Server-side vote validation
   - API endpoints for vote submission

2. **WebSocket** for real-time updates
   - Socket.io or similar
   - Live result broadcasting

3. **Vote Encryption**
   - Hash user IDs
   - Encrypt vote data
   - Implement vote verification

4. **Rate Limiting**
   - Prevent spam
   - DDoS protection

5. **Audit Trail**
   - Log all voting actions
   - Timestamp verification
   - Immutable vote records

### Recommended Backend Stack

```
Frontend (Current) → API Gateway → Backend Server → Database
                                      ↓
                                  WebSocket Server → Live Updates
```

## 🛠️ Development

### Local Development

Simply open `index.html` in your browser. For better development experience:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve

# Using PHP
php -S localhost:8000
```

Visit `http://localhost:8000`

### Testing Discord OAuth Locally

For local testing, add `http://localhost:8000/` to Discord OAuth2 redirects.

**Note:** Discord OAuth requires HTTPS in production.

## 📊 Vote Management

### Admin Functions (Development Only)

Open browser console and run:

```javascript
// View all votes
VotingSystem.getAllVotes()

// Get results
VotingSystem.getResults()

// Export data
VotingSystem.exportData()

// ⚠️ DANGER: Reset all votes
VotingSystem.resetVotes()

// Add sample votes for testing
VotingSystem.addSampleVotes()
```

**Remove these functions in production!**

## 🌐 Browser Support

- ✅ Chrome/Edge (90+)
- ✅ Firefox (88+)
- ✅ Safari (14+)
- ✅ Mobile browsers

## 📱 Mobile Responsiveness

Fully responsive design tested on:
- iPhone (SE, 12, 13, 14)
- Android devices
- iPad/Tablets
- Desktop (1080p, 1440p, 4K)

## ♿ Accessibility

- Semantic HTML5
- ARIA labels
- Keyboard navigation
- Screen reader compatible
- High contrast mode support
- Reduced motion support

## 🐛 Troubleshooting

### OAuth Not Working

1. **Check Client ID**: Ensure it's correct in `config.js`
2. **Verify Redirect URI**: Must exactly match Discord settings
3. **HTTPS Required**: Vercel provides HTTPS automatically
4. **Clear Cache**: Try incognito/private browsing
5. **Check Console**: Look for error messages

### Votes Not Saving

1. **localStorage Available**: Check browser settings
2. **Incognito Mode**: localStorage might be disabled
3. **Storage Quota**: Clear old data

### Page Not Loading

1. **Check Vercel Status**: Visit Vercel dashboard
2. **Check Console Errors**: F12 → Console tab
3. **Verify File Paths**: Ensure all files uploaded correctly

### Mobile Menu Not Working

1. **JavaScript Enabled**: Ensure JS is not blocked
2. **Clear Cache**: Force refresh (Ctrl+Shift+R)
3. **Test Different Browser**: Try Chrome mobile

## 📈 Future Enhancements

- [ ] Backend API integration
- [ ] Real-time WebSocket updates
- [ ] Vote analytics dashboard
- [ ] Email notifications
- [ ] Multi-language support (English/Arabic)
- [ ] Dark/Light mode toggle
- [ ] Candidate video/image uploads
- [ ] Social media sharing
- [ ] Export results as PDF
- [ ] Admin dashboard

## 🤝 Contributing

This is a community project. To contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - Feel free to use for your community!

## 💬 Support

For issues, questions, or suggestions:
- Open a GitHub issue
- Contact via Discord server
- Email: [your-email]

## 🙏 Credits

**Designed & Developed for the Lebanese Discord Community**

- Design: Modern Lebanese aesthetic
- Icons: Unicode emoji
- Fonts: System fonts
- Hosting: Vercel (free tier)

---

## 🎯 Final Checklist

Before going live:

- [ ] Update `config.js` with Discord credentials
- [ ] Update `config.js` with server ID
- [ ] Deploy to Vercel
- [ ] Add Vercel URL to Discord OAuth
- [ ] Test login flow
- [ ] Test voting process
- [ ] Test on mobile devices
- [ ] Review candidate information
- [ ] Check all links work
- [ ] Test results page
- [ ] Remove debug functions
- [ ] Update README with your info
- [ ] Set custom domain (optional)

---

**Made with ❤️ for the Lebanese Discord community**

**يد بيد، نحو مستقبل أفضل**

🌲 Cedar Strong, Community Stronger 🌲
