/**
 * Results Page JavaScript
 * 
 * Handles live results display, charts, and real-time updates
 */

let updateInterval;

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initResultsPage();
  startLiveUpdates();

  // Listen for vote updates
  window.addEventListener('votesupdate', updateResults);
  window.addEventListener('votecast', updateResults);
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
 * Initialize results page
 */
function initResultsPage() {
  updateResults();
}

/**
 * Update all results displays
 */
function updateResults() {
  updateMetaInfo();
  updateLeaderCard();
  updateResultsGrid();
  updateResultsTable();
  updateTurnout();
  updateBarChart();
  updateLastUpdateTime();
}

/**
 * Update meta information
 */
function updateMetaInfo() {
  const totalVotesElement = document.getElementById('totalVotesCount');
  if (totalVotesElement) {
    totalVotesElement.textContent = VotingSystem.getTotalVotes();
  }
}

/**
 * Update leader card
 */
function updateLeaderCard() {
  const leader = VotingSystem.getLeader();
  
  if (!leader) {
    return;
  }

  const leaderCard = document.getElementById('leaderCard');
  if (leaderCard) {
    leaderCard.style.borderColor = leader.color;
  }

  const leaderName = document.getElementById('leaderName');
  const leaderSlogan = document.getElementById('leaderSlogan');
  const leaderVotes = document.getElementById('leaderVotes');
  const leaderPercentage = document.getElementById('leaderPercentage');

  if (leaderName) {
    leaderName.textContent = leader.name;
    leaderName.style.color = leader.color;
  }

  if (leaderSlogan) {
    leaderSlogan.textContent = leader.slogan;
  }

  if (leaderVotes) {
    animateNumber(leaderVotes, leader.votes);
  }

  if (leaderPercentage) {
    leaderPercentage.textContent = leader.percentage + '%';
    leaderPercentage.style.color = leader.color;
  }
}

/**
 * Update results grid
 */
function updateResultsGrid() {
  const grid = document.getElementById('resultsGrid');
  if (!grid) return;

  const results = VotingSystem.getResults();
  grid.innerHTML = '';

  results.forEach(result => {
    const card = createResultCard(result);
    grid.appendChild(card);
  });
}

/**
 * Create a result card
 */
function createResultCard(result) {
  const card = document.createElement('div');
  card.className = 'result-card';
  card.style.setProperty('--candidate-color', result.color);

  card.innerHTML = `
    <div class="result-header">
      <div class="result-rank" style="background: ${result.color};">#${result.rank}</div>
      <h3 class="result-name">${result.name}</h3>
    </div>
    <div class="result-percentage" style="color: ${result.color};">
      ${result.percentage}%
    </div>
    <div class="result-votes">
      ${result.votes} ${result.votes === 1 ? 'vote' : 'votes'}
    </div>
    <div class="progress-bar">
      <div class="progress-fill" style="width: ${result.percentage}%; background: ${result.color};"></div>
    </div>
    <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 1rem; font-style: italic;">
      ${result.slogan}
    </p>
  `;

  return card;
}

/**
 * Update results table
 */
function updateResultsTable() {
  const tbody = document.getElementById('resultsTableBody');
  if (!tbody) return;

  const results = VotingSystem.getResults();
  tbody.innerHTML = '';

  results.forEach(result => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <strong style="color: ${result.color};">#${result.rank}</strong>
      </td>
      <td>
        <strong style="color: ${result.color};">${result.name}</strong>
        <br>
        <small style="color: var(--text-muted); font-style: italic;">${result.slogan}</small>
      </td>
      <td>
        <strong>${result.votes}</strong>
      </td>
      <td>
        <strong style="color: ${result.color};">${result.percentage}%</strong>
      </td>
      <td>
        <div style="width: 100px; height: 10px; background: rgba(255,255,255,0.1); border-radius: 10px; overflow: hidden;">
          <div style="width: ${result.percentage}%; height: 100%; background: ${result.color};"></div>
        </div>
      </td>
    `;
    tbody.appendChild(row);
  });
}

/**
 * Update turnout
 */
function updateTurnout() {
  const participationCount = document.getElementById('participationCount');
  const turnoutFill = document.getElementById('turnoutFill');

  const totalVotes = VotingSystem.getTotalVotes();

  if (participationCount) {
    participationCount.textContent = totalVotes;
  }

  if (turnoutFill) {
    // Calculate turnout percentage (assuming max 1000 potential voters)
    const maxVoters = 1000;
    const turnoutPercentage = Math.min((totalVotes / maxVoters) * 100, 100);
    turnoutFill.style.width = turnoutPercentage + '%';
  }
}

/**
 * Update bar chart
 */
function updateBarChart() {
  const chartContainer = document.getElementById('barChart');
  if (!chartContainer) return;

  const results = VotingSystem.getResults();
  chartContainer.innerHTML = '';

  results.forEach(result => {
    const bar = createChartBar(result);
    chartContainer.appendChild(bar);
  });
}

/**
 * Create a chart bar
 */
function createChartBar(result) {
  const bar = document.createElement('div');
  bar.className = 'chart-bar';

  bar.innerHTML = `
    <div class="chart-label">${result.name}</div>
    <div class="chart-track">
      <div class="chart-fill" style="width: ${result.percentage}%; background: ${result.color};">
        ${result.percentage}%
      </div>
    </div>
    <div class="chart-value" style="color: ${result.color};">
      ${result.votes}
    </div>
  `;

  return bar;
}

/**
 * Update last update time
 */
function updateLastUpdateTime() {
  const lastUpdateElement = document.getElementById('lastUpdate');
  if (lastUpdateElement) {
    const now = new Date();
    lastUpdateElement.textContent = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }
}

/**
 * Start live updates
 */
function startLiveUpdates() {
  // Update every 5 seconds
  updateInterval = setInterval(() => {
    updateResults();
  }, 5000);
}

/**
 * Animate number change
 */
function animateNumber(element, targetNumber) {
  const currentNumber = parseInt(element.textContent) || 0;
  
  if (currentNumber === targetNumber) return;

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
 * Stop live updates (cleanup)
 */
window.addEventListener('beforeunload', () => {
  if (updateInterval) {
    clearInterval(updateInterval);
  }
});
