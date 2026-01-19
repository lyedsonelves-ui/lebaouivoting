/**
 * Candidates Page JavaScript
 * 
 * Handles rendering of detailed candidate profiles
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  renderCandidates();
  renderComparisonTable();
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
 * Render all candidates
 */
function renderCandidates() {
  const container = document.getElementById('candidatesContainer');
  if (!container) return;

  CONFIG.candidates.forEach(candidate => {
    const candidateSection = createCandidateSection(candidate);
    container.appendChild(candidateSection);
  });
}

/**
 * Create detailed candidate section
 */
function createCandidateSection(candidate) {
  const section = document.createElement('div');
  section.className = 'candidate-card';
  section.id = `candidate-${candidate.id}`;
  section.style.setProperty('--candidate-color', candidate.color);

  const initials = candidate.name.substring(0, 2).toUpperCase();

  // Convert RGB from hex color
  const rgb = hexToRgb(candidate.color);
  section.style.setProperty('--candidate-rgb', `${rgb.r}, ${rgb.g}, ${rgb.b}`);

  const visionList = candidate.vision.map(item => `
    <li>${item}</li>
  `).join('');

  section.innerHTML = `
    <div class="candidate-header">
      <div class="candidate-avatar">${initials}</div>
      <h3 class="candidate-name">${candidate.name}</h3>
      <p class="candidate-slogan">${candidate.slogan}</p>
    </div>
    <div class="candidate-body">
      <p class="candidate-description">${candidate.description}</p>
      
      <div class="candidate-vision">
        <h4>Vision & Platform</h4>
        <ul class="vision-list">
          ${visionList}
        </ul>
      </div>
    </div>
    <div class="candidate-footer">
      <p class="candidate-campaign">"${candidate.campaign}"</p>
      <button class="vote-for-btn" onclick="window.location.href='vote.html'" style="background: ${candidate.color};">
        Vote for ${candidate.name}
      </button>
    </div>
  `;

  return section;
}

/**
 * Render comparison table
 */
function renderComparisonTable() {
  const tbody = document.querySelector('#comparisonTable tbody');
  if (!tbody) return;

  const comparisons = [
    { candidate: 'Horsy', focus: 'Community Strength', strength: 'Leadership', motto: 'قوة و عزيمة' },
    { candidate: 'Hellnest', focus: 'Innovation', strength: 'Collaboration', motto: 'Innovation through Collaboration' },
    { candidate: 'Star', focus: 'Vision', strength: 'Inclusivity', motto: 'ضوء المستقبل' },
    { candidate: 'Deku', focus: 'Growth', strength: 'Determination', motto: 'Plus Ultra' },
    { candidate: 'Nig', focus: 'Unity', strength: 'Diversity', motto: 'Unity in Diversity' },
    { candidate: 'Sweeve', focus: 'Efficiency', strength: 'Professionalism', motto: 'Smooth Progress' }
  ];

  comparisons.forEach(comp => {
    const row = document.createElement('tr');
    const candidate = CONFIG.candidates.find(c => c.name === comp.candidate);
    
    row.innerHTML = `
      <td>
        <strong style="color: ${candidate?.color || 'inherit'}">${comp.candidate}</strong>
      </td>
      <td>${comp.focus}</td>
      <td>${comp.strength}</td>
      <td><em>${comp.motto}</em></td>
    `;
    
    tbody.appendChild(row);
  });
}

/**
 * Convert hex color to RGB
 */
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 231, g: 76, b: 60 };
}
