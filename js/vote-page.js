/**
 * Vote Page JavaScript
 * 
 * Handles voting interface, authentication checks, and vote submission
 */

let selectedCandidate = null;

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initVotingPage();

  // Listen for vote updates
  window.addEventListener('votecast', handleVoteCast);
});

/**
 * Initialize mobile navigation
 */
function initMobileNav() {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
      }
    });
  }
}

/**
 * Initialize voting page
 */
function initVotingPage() {
  const authRequiredMessage = document.getElementById('authRequiredMessage');
  const alreadyVotedMessage = document.getElementById('alreadyVotedMessage');
  const votingInterface = document.getElementById('votingInterface');

  // Check authentication
  if (!Auth.isAuthenticated()) {
    authRequiredMessage.style.display = 'block';
    alreadyVotedMessage.style.display = 'none';
    votingInterface.style.display = 'none';
    return;
  }

  // Check if user already voted
  if (VotingSystem.hasUserVoted()) {
    const voteRecord = VotingSystem.getUserVote();
    showAlreadyVoted(voteRecord);
    authRequiredMessage.style.display = 'none';
    alreadyVotedMessage.style.display = 'block';
    votingInterface.style.display = 'none';
    return;
  }

  // Show voting interface
  authRequiredMessage.style.display = 'none';
  alreadyVotedMessage.style.display = 'none';
  votingInterface.style.display = 'block';

  renderVotingCards();
  initVotingModals();
}

/**
 * Show already voted message
 */
function showAlreadyVoted(voteRecord) {
  const candidate = CONFIG.candidates.find(c => c.id === voteRecord.candidateId);
  
  document.getElementById('votedCandidateName').textContent = voteRecord.candidateName;
  document.getElementById('votedCandidateName').style.color = candidate?.color || 'var(--accent-primary)';
  document.getElementById('voterUsername').textContent = voteRecord.username;
  document.getElementById('voteId').textContent = voteRecord.voteId;
  document.getElementById('voteTimestamp').textContent = formatTimestamp(voteRecord.timestamp);
}

/**
 * Render voting cards
 */
function renderVotingCards() {
  const grid = document.getElementById('votingGrid');
  if (!grid) return;

  grid.innerHTML = '';

  CONFIG.candidates.forEach(candidate => {
    const card = createVotingCard(candidate);
    grid.appendChild(card);
  });
}

/**
 * Create a voting card
 */
function createVotingCard(candidate) {
  const card = document.createElement('div');
  card.className = 'voting-card';
  card.style.setProperty('--candidate-color', candidate.color);

  const rgb = hexToRgb(candidate.color);
  card.style.setProperty('--candidate-rgb', `${rgb.r}, ${rgb.g}, ${rgb.b}`);

  const initials = candidate.name.substring(0, 2).toUpperCase();

  card.innerHTML = `
    <div class="candidate-avatar" style="background: ${candidate.color};">${initials}</div>
    <h3 style="margin: 1rem 0 0.5rem;">${candidate.name}</h3>
    <p style="font-size: 0.9rem; color: var(--text-muted); font-style: italic; margin-bottom: 1rem;">
      ${candidate.slogan}
    </p>
    <button class="btn btn-primary" style="width: 100%; background: ${candidate.color}; border-color: ${candidate.color};">
      Select
    </button>
  `;

  // Add click handler
  card.addEventListener('click', () => selectCandidate(candidate, card));

  return card;
}

/**
 * Select a candidate
 */
function selectCandidate(candidate, cardElement) {
  selectedCandidate = candidate;

  // Remove selection from all cards
  document.querySelectorAll('.voting-card').forEach(card => {
    card.classList.remove('selected');
  });

  // Add selection to clicked card
  cardElement.classList.add('selected');

  // Show confirmation modal
  showConfirmationModal(candidate);
}

/**
 * Initialize voting modals
 */
function initVotingModals() {
  const confirmationModal = document.getElementById('confirmationModal');
  const successModal = document.getElementById('successModal');
  const cancelVoteBtn = document.getElementById('cancelVoteBtn');
  const confirmVoteBtn = document.getElementById('confirmVoteBtn');

  // Cancel vote
  if (cancelVoteBtn) {
    cancelVoteBtn.addEventListener('click', () => {
      confirmationModal.classList.remove('active');
      selectedCandidate = null;
      
      // Remove selection
      document.querySelectorAll('.voting-card').forEach(card => {
        card.classList.remove('selected');
      });
    });
  }

  // Confirm vote
  if (confirmVoteBtn) {
    confirmVoteBtn.addEventListener('click', () => {
      submitVote();
    });
  }

  // Close modal on background click
  [confirmationModal, successModal].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('active');
        }
      });
    }
  });
}

/**
 * Show confirmation modal
 */
function showConfirmationModal(candidate) {
  const modal = document.getElementById('confirmationModal');
  const confirmCandidate = document.getElementById('confirmCandidate');

  const initials = candidate.name.substring(0, 2).toUpperCase();

  confirmCandidate.innerHTML = `
    <div class="candidate-avatar" style="background: ${candidate.color}; margin: 0 auto 1rem;">
      ${initials}
    </div>
    <h3 style="color: ${candidate.color};">${candidate.name}</h3>
    <p style="font-style: italic; color: var(--text-muted);">${candidate.slogan}</p>
  `;

  modal.classList.add('active');
}

/**
 * Submit vote
 */
function submitVote() {
  if (!selectedCandidate) return;

  const confirmVoteBtn = document.getElementById('confirmVoteBtn');
  confirmVoteBtn.disabled = true;
  confirmVoteBtn.textContent = 'Submitting...';

  // Simulate network delay
  setTimeout(() => {
    const result = VotingSystem.castVote(selectedCandidate.id);

    if (result.success) {
      // Close confirmation modal
      document.getElementById('confirmationModal').classList.remove('active');

      // Show success modal
      document.getElementById('successModal').classList.add('active');

      // Update page after short delay
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      alert('Error: ' + result.message);
      confirmVoteBtn.disabled = false;
      confirmVoteBtn.textContent = 'Confirm Vote';
    }
  }, 500);
}

/**
 * Handle vote cast event
 */
function handleVoteCast(event) {
  // Refresh page to show "already voted" message
  setTimeout(() => {
    window.location.reload();
  }, 2000);
}

/**
 * Format timestamp
 */
function formatTimestamp(isoString) {
  const date = new Date(isoString);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}

/**
 * Convert hex to RGB
 */
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 231, g: 76, b: 60 };
}
