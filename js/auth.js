/**
 * Discord OAuth2 Authentication Module
 * 
 * Handles Discord login/logout and user session management
 * 
 * SETUP REQUIRED:
 * 1. Create a Discord Application at https://discord.com/developers/applications
 * 2. Add your Client ID to js/config.js
 * 3. Add redirect URI in Discord Developer Portal (your-domain.vercel.app/auth/callback)
 * 4. Ensure user is a member of your Discord server
 */

const Auth = {
  /**
   * Initialize authentication system
   */
  init() {
    this.checkAuth();
    this.updateAuthUI();
    this.handleCallback();
  },

  /**
   * Initiate Discord OAuth2 login flow
   */
  login() {
    const params = new URLSearchParams({
      client_id: CONFIG.discord.clientId,
      redirect_uri: CONFIG.discord.redirectUri,
      response_type: CONFIG.discord.responseType,
      scope: CONFIG.discord.scope
    });

    // Redirect to Discord authorization
    window.location.href = `${CONFIG.discord.authEndpoint}?${params}`;
  },

  /**
   * Logout and clear session
   */
  logout() {
    // Clear all authentication data
    localStorage.removeItem('discord_token');
    localStorage.removeItem('discord_user');
    localStorage.removeItem('discord_guilds');
    
    // Update UI
    this.updateAuthUI();
    
    // Redirect to home page
    window.location.href = 'index.html';
  },

  /**
   * Handle OAuth callback and extract access token
   */
  handleCallback() {
    // Check if we're on the callback or if there's a hash fragment
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get('access_token');

    if (accessToken) {
      // Store the access token
      localStorage.setItem('discord_token', accessToken);

      // Fetch user information
      this.fetchUserData(accessToken);

      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  },

  /**
   * Fetch user data from Discord API
   */
  async fetchUserData(token) {
    try {
      // Fetch user information
      const userResponse = await fetch(`${CONFIG.discord.apiEndpoint}/users/@me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!userResponse.ok) {
        throw new Error('Failed to fetch user data');
      }

      const userData = await userResponse.json();
      
      // Store user data
      localStorage.setItem('discord_user', JSON.stringify(userData));

      // Fetch user's guilds (servers)
      const guildsResponse = await fetch(`${CONFIG.discord.apiEndpoint}/users/@me/guilds`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (guildsResponse.ok) {
        const guildsData = await guildsResponse.json();
        localStorage.setItem('discord_guilds', JSON.stringify(guildsData));
      }

      // Update UI
      this.updateAuthUI();

      // Show success message
      console.log('Successfully authenticated:', userData.username);
    } catch (error) {
      console.error('Authentication error:', error);
      this.logout();
    }
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated() {
    const token = localStorage.getItem('discord_token');
    const user = localStorage.getItem('discord_user');
    return !!(token && user);
  },

  /**
   * Get current user data
   */
  getUser() {
    const userData = localStorage.getItem('discord_user');
    return userData ? JSON.parse(userData) : null;
  },

  /**
   * Check if user is a member of the required server
   */
  isServerMember() {
    // If no server ID is configured, allow all authenticated users
    if (!CONFIG.discord.serverId || CONFIG.discord.serverId === 'YOUR_DISCORD_SERVER_ID') {
      return true;
    }

    const guilds = localStorage.getItem('discord_guilds');
    if (!guilds) return false;

    const guildsData = JSON.parse(guilds);
    return guildsData.some(guild => guild.id === CONFIG.discord.serverId);
  },

  /**
   * Update authentication UI elements
   */
  updateAuthUI() {
    const authButton = document.getElementById('authButton');
    const authButtonText = document.getElementById('authButtonText');

    if (!authButton) return;

    if (this.isAuthenticated()) {
      const user = this.getUser();
      authButtonText.textContent = user.username;
      authButton.onclick = () => this.logout();
      authButton.classList.add('logged-in');
    } else {
      authButtonText.textContent = 'Login with Discord';
      authButton.onclick = () => this.login();
      authButton.classList.remove('logged-in');
    }
  },

  /**
   * Check authentication status
   */
  checkAuth() {
    const token = localStorage.getItem('discord_token');
    
    if (token) {
      // Token exists, validate it
      this.validateToken(token);
    }
  },

  /**
   * Validate access token
   */
  async validateToken(token) {
    try {
      const response = await fetch(`${CONFIG.discord.apiEndpoint}/users/@me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        // Token is invalid, logout
        this.logout();
      }
    } catch (error) {
      console.error('Token validation error:', error);
      // On error, keep the token but log the error
    }
  },

  /**
   * Get user's Discord avatar URL
   */
  getAvatarUrl(size = 128) {
    const user = this.getUser();
    if (!user) return null;

    if (user.avatar) {
      return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=${size}`;
    } else {
      // Default avatar
      const defaultAvatarNumber = parseInt(user.discriminator) % 5;
      return `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`;
    }
  },

  /**
   * Get full user tag (username#discriminator)
   */
  getUserTag() {
    const user = this.getUser();
    if (!user) return null;
    
    // Discord is transitioning away from discriminators
    if (user.discriminator === '0') {
      return user.username;
    }
    return `${user.username}#${user.discriminator}`;
  }
};

// Initialize authentication when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => Auth.init());
} else {
  Auth.init();
}
