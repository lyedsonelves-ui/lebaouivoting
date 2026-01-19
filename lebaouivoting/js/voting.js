/**
 * Voting System Module
 * 
 * Handles vote casting, storage, and retrieval
 * 
 * IMPORTANT: This is a client-side implementation for demonstration.
 * For production, implement a proper backend with database to:
 * - Prevent vote manipulation
 * - Ensure vote integrity
 * - Scale across multiple clients
 * - Implement real-time updates via WebSocket
 */

const VotingSystem = {
  // Storage keys
  VOTES_KEY: 'election_votes',
  USER_VOTE_KEY: 'user_vote',

  /**
   * Initialize voting system
   */
  init() {
    this.ensureVotesExist();
    this.startLiveUpdates();
  },

  /**
   * Ensure votes storage exists
   */
  ensureVotesExist() {
    if (!localStorage.getItem(this.VOTES_KEY)) {
      const initialVotes = {};
      CONFIG.candidates.forEach(candidate => {
        initialVotes[candidate.id] = 0;
      });
      localStorage.setItem(this.VOTES_KEY, JSON.stringify(initialVotes));
    }
  },

  /**
   * Cast a vote for a candidate
   * @param {string} candidateId - The ID of the candidate
   * @returns {Object} Result object with success status and message
   */
  castVote(candidateId) {
    // Check authentication
    if (!Auth.isAuthenticated()) {
      return {
        success: false,
        message: 'You must be logged in to vote'
      };
    }

    // Check if user already voted
    if (this.hasUserVoted()) {
      return {
        success: false,
        message: 'You have already voted'
      };
    }

    // Validate candidate
    const candidate = CONFIG.candidates.find(c => c.id === candidateId);
    if (!candidate) {
      return {
        success: false,
        message: 'Invalid candidate'
      };
    }

    // Get current votes
    const votes = this.getAllVotes();

    // Increment vote count
    votes[candidateId]++;

    // Save votes
    localStorage.setItem(this.VOTES_KEY, JSON.stringify(votes));

    // Record user's vote
    const user = Auth.getUser();
    const voteRecord = {
      candidateId: candidateId,
      candidateName: candidate.name,
      userId: user.id,
      username: Auth.getUserTag(),
      timestamp: new Date().toISOString(),
      voteId: this.generateVoteId()
    };

    localStorage.setItem(this.USER_VOTE_KEY, JSON.stringify(voteRecord));

    // Dispatch vote event for real-time updates
    window.dispatchEvent(new CustomEvent('votecast', { 
      detail: { candidateId, votes } 
    }));

    return {
      success: true,
      message: 'Vote recorded successfully',
      voteRecord: voteRecord
    };
  },

  /**
   * Check if current user has voted
   * @returns {boolean}
   */
  hasUserVoted() {
    if (!Auth.isAuthenticated()) {
      return false;
    }

    const voteRecord = localStorage.getItem(this.USER_VOTE_KEY);
    if (!voteRecord) {
      return false;
    }

    // Verify the vote belongs to current user
    const record = JSON.parse(voteRecord);
    const currentUser = Auth.getUser();
    
    return record.userId === currentUser.id;
  },

  /**
   * Get current user's vote record
   * @returns {Object|null}
   */
  getUserVote() {
    const voteRecord = localStorage.getItem(this.USER_VOTE_KEY);
    return voteRecord ? JSON.parse(voteRecord) : null;
  },

  /**
   * Get all votes
   * @returns {Object} Vote counts for each candidate
   */
  getAllVotes() {
    const votesData = localStorage.getItem(this.VOTES_KEY);
    return votesData ? JSON.parse(votesData) : {};
  },

  /**
   * Get total number of votes cast
   * @returns {number}
   */
  getTotalVotes() {
    const votes = this.getAllVotes();
    return Object.values(votes).reduce((sum, count) => sum + count, 0);
  },

  /**
   * Get vote count for a specific candidate
   * @param {string} candidateId
   * @returns {number}
   */
  getCandidateVotes(candidateId) {
    const votes = this.getAllVotes();
    return votes[candidateId] || 0;
  },

  /**
   * Get vote percentage for a candidate
   * @param {string} candidateId
   * @returns {number} Percentage (0-100)
   */
  getCandidatePercentage(candidateId) {
    const total = this.getTotalVotes();
    if (total === 0) return 0;

    const candidateVotes = this.getCandidateVotes(candidateId);
    return ((candidateVotes / total) * 100).toFixed(1);
  },

  /**
   * Get results sorted by vote count
   * @returns {Array} Array of candidate results
   */
  getResults() {
    const votes = this.getAllVotes();
    const total = this.getTotalVotes();

    const results = CONFIG.candidates.map(candidate => {
      const voteCount = votes[candidate.id] || 0;
      const percentage = total > 0 ? ((voteCount / total) * 100).toFixed(1) : 0;

      return {
        ...candidate,
        votes: voteCount,
        percentage: parseFloat(percentage)
      };
    });

    // Sort by votes (descending)
    results.sort((a, b) => b.votes - a.votes);

    // Add rank
    results.forEach((result, index) => {
      result.rank = index + 1;
    });

    return results;
  },

  /**
   * Get the leading candidate
   * @returns {Object|null}
   */
  getLeader() {
    const results = this.getResults();
    return results.length > 0 ? results[0] : null;
  },

  /**
   * Generate a unique vote ID
   * @returns {string}
   */
  generateVoteId() {
    return 'VOTE-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  },

  /**
   * Start live updates (simulated real-time)
   */
  startLiveUpdates() {
    // Listen for storage changes (for multi-tab sync)
    window.addEventListener('storage', (e) => {
      if (e.key === this.VOTES_KEY) {
        window.dispatchEvent(new CustomEvent('votesupdate'));
      }
    });

    // Simulate live updates every 30 seconds (can be replaced with WebSocket)
    setInterval(() => {
      window.dispatchEvent(new CustomEvent('votesupdate'));
    }, 30000);
  },

  /**
   * Reset all votes (admin function - for testing only)
   * WARNING: Remove this in production
   */
  resetVotes() {
    if (confirm('Are you sure you want to reset all votes? This cannot be undone.')) {
      localStorage.removeItem(this.VOTES_KEY);
      localStorage.removeItem(this.USER_VOTE_KEY);
      this.ensureVotesExist();
      window.dispatchEvent(new CustomEvent('votesupdate'));
      alert('All votes have been reset');
      window.location.reload();
    }
  },

  /**
   * Add sample votes for testing (remove in production)
   */
  addSampleVotes() {
    const votes = this.getAllVotes();
    
    // Add random votes to each candidate
    CONFIG.candidates.forEach(candidate => {
      votes[candidate.id] += Math.floor(Math.random() * 50) + 10;
    });

    localStorage.setItem(this.VOTES_KEY, JSON.stringify(votes));
    window.dispatchEvent(new CustomEvent('votesupdate'));
    alert('Sample votes added');
    window.location.reload();
  },

  /**
   * Export voting data (for backup/analysis)
   */
  exportData() {
    const data = {
      votes: this.getAllVotes(),
      totalVotes: this.getTotalVotes(),
      results: this.getResults(),
      exportDate: new Date().toISOString()
    };

    const dataStr = JSON.stringify(data, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    const exportFileDefaultName = `election-results-${Date.now()}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }
};

// Initialize voting system
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => VotingSystem.init());
} else {
  VotingSystem.init();
}

// Expose to window for debugging (remove in production)
window.VotingSystem = VotingSystem;
