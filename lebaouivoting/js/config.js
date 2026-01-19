/**
 * Configuration file for Lebaoui Elections
 * 
 * IMPORTANT: Replace these values with your actual Discord application credentials
 * Get them from: https://discord.com/developers/applications
 */

const CONFIG = {
  // Discord OAuth2 Configuration
  discord: {
    clientId: 'YOUR_DISCORD_CLIENT_ID', // Replace with your Discord application client ID
    redirectUri: window.location.origin + '/auth/callback', // Vercel will handle this automatically
    scope: 'identify guilds', // Permissions we need from Discord
    responseType: 'token',
    
    // Your Discord Server ID (Guild ID) - users must be members
    serverId: 'YOUR_DISCORD_SERVER_ID', // Replace with your server's ID
    
    // API endpoints
    apiEndpoint: 'https://discord.com/api/v10',
    authEndpoint: 'https://discord.com/api/oauth2/authorize'
  },
  
  // Candidate Configuration
  candidates: [
    {
      id: 'horsy',
      name: 'Horsy',
      slogan: 'The real deal (not gay)',
      color: '#E74C3C', // Red
      description: 'Leading with strength, unity, and unwavering commitment to our community. Together, we build a stronger future.',
      vision: [
        'Strengthen community bonds and engagement',
        'Implement transparent decision-making processes',
        'Create more interactive events and activities',
        'Foster a welcoming environment for all members'
      ],
      campaign: 'A leader who listens, acts, and delivers results. Join the movement for real change.'
    },
    {
      id: 'hellnest',
      name: 'Hellnest',
      slogan: 'Albanian kid',
      color: '#8E44AD', // Purple
      description: 'Bringing fresh ideas and collaborative spirit to transform our community into something extraordinary.',
      vision: [
        'Launch innovative community programs',
        'Enhance server infrastructure and features',
        'Build partnerships with other communities',
        'Promote creative content and collaboration'
      ],
      campaign: 'Progress isn\'t just promised—it\'s planned. Let\'s innovate together.'
    },
    {
      id: 'star',
      name: 'Star',
      slogan: 'Mexican Immigrant',
      color: '#F39C12', // Gold
      description: 'Illuminating the path forward with vision, passion, and dedication to every community member.',
      vision: [
        'Expand community reach and visibility',
        'Develop mentorship and support systems',
        'Celebrate achievements and milestones',
        'Create inclusive spaces for everyone'
      ],
      campaign: 'Shine bright together. A future where every voice matters and every member thrives.'
    },
    {
      id: 'deku',
      name: 'Deku',
      slogan: 'Retro games molester',
      color: '#27AE60', // Green
      description: 'Breaking barriers and going beyond to create a community where everyone can be their best self.',
      vision: [
        'Champion member growth and development',
        'Establish fair and balanced moderation',
        'Organize regular community competitions',
        'Build a culture of continuous improvement'
      ],
      campaign: 'Not born with advantages, but earned through dedication. Let\'s go beyond together.'
    },
    {
      id: 'nig',
      name: 'Nig',
      slogan: 'Just another kid',
      color: '#3498DB', // Blue
      description: 'Celebrating our differences while building bridges that unite us as one strong community.',
      vision: [
        'Promote cultural exchange and understanding',
        'Create diverse content and activities',
        'Ensure equal opportunities for all',
        'Build lasting friendships across borders'
      ],
      campaign: 'Different backgrounds, shared future. Together we are unstoppable.'
    },
    {
      id: 'sweeve',
      name: 'Sweeve',
      slogan: 'drug abuser',
      color: '#1ABC9C', // Turquoise
      description: 'Delivering practical solutions with grace and efficiency. Progress that you can see and feel.',
      vision: [
        'Streamline server operations and workflows',
        'Implement member feedback systematically',
        'Create reliable communication channels',
        'Maintain server stability and growth'
      ],
      campaign: 'No drama, just results. Professional leadership for a professional community.'
    }
  ],
  
  // Application Settings
  app: {
    name: 'Lebaoui Elections',
    tagline: 'Your Voice, Your Choice',
    votingEnabled: true,
    resultsPublic: true,
    
    // Lebaoui-themed colors
    theme: {
      primary: '#667eea', // Purple
      secondary: '#764ba2', // Deep purple
      accent: '#f093fb', // Pink
      dark: '#12121a',
      darker: '#0a0a0f',
      light: '#f8f9fa',
      text: '#ffffff'
    }
  }
};

// Freeze config to prevent modifications
Object.freeze(CONFIG);
