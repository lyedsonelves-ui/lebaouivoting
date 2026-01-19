/**
 * Main JavaScript for index.html (Landing Page)
 * 
 * Handles:
 * - Mobile navigation
 * - Candidate preview rendering
 * - Live stats display
 * - Scroll animations
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  renderCandidatesPreview();
  updateLiveStats();
  initScrollEffects();

  // Update stats when votes change
  window.addEventListener('votesupdate', updateLiveStats);
  window.addEventListener('votecast', updateLiveStats);
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
      navToggle.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
      }
    });

    // Close menu when clicking a link
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
      });
    });
  }
}

/**
 * Render candidates preview on home page
 */
function renderCandidatesPreview() {
  const container = document.getElementById('candidatesPreview');
  if (!container) return;

  CONFIG.candidates.forEach(candidate => {
    const card = createCandidatePreviewCard(candidate);
    container.appendChild(card);
  });
}

/**
 * Create a candidate preview card
 */
function createCandidatePreviewCard(candidate) {
  const card = document.createElement('div');
  card.className = 'candidate-card';
  card.style.setProperty('--candidate-color', candidate.color);

  const initials = candidate.name.substring(0, 2).toUpperCase();

  card.innerHTML = `
    <div class="candidate-header">
      <div class="candidate-avatar">${initials}</div>
      <h3 class="candidate-name">${candidate.name}</h3>
      <p class="candidate-slogan">${candidate.slogan}</p>
    </div>
    <div class="candidate-body">
      <p class="candidate-description">${candidate.description}</p>
      <a href="candidates.html" class="btn btn-outline" style="width: 100%; border-color: ${candidate.color}; color: ${candidate.color};">
        Learn More
      </a>
    </div>
  `;

  // Add hover effect
  card.addEventListener('mouseenter', () => {
    card.style.borderColor = candidate.color;
  });

  card.addEventListener('mouseleave', () => {
    card.style.borderColor = 'transparent';
  });

  return card;
}

/**
 * Update live statistics
 */
function updateLiveStats() {
  const totalVotesElement = document.getElementById('totalVotes');
  
  if (totalVotesElement) {
    const totalVotes = VotingSystem.getTotalVotes();
    animateNumber(totalVotesElement, totalVotes);
  }
}

/**
 * Animate number change
 */
function animateNumber(element, targetNumber) {
  const currentNumber = parseInt(element.textContent) || 0;
  const duration = 1000;
  const steps = 30;
  const increment = (targetNumber - currentNumber) / steps;
  let current = currentNumber;
  let step = 0;

  const timer = setInterval(() => {
    step++;
    current += increment;
    element.textContent = Math.round(current);

    if (step >= steps) {
      element.textContent = targetNumber;
      clearInterval(timer);
    }
  }, duration / steps);
}

/**
 * Initialize scroll effects
 */
function initScrollEffects() {
  const navbar = document.getElementById('navbar');
  
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe elements with fade-in class
  document.querySelectorAll('.about-card, .candidate-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

/**
 * Format timestamp to readable format
 */
function formatTimestamp(isoString) {
  const date = new Date(isoString);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * Show notification
 */
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? '#2ECC71' : type === 'error' ? '#E74C3C' : '#3498DB'};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    z-index: 10000;
    animation: slideIn 0.3s ease;
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Add CSS for notifications
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
