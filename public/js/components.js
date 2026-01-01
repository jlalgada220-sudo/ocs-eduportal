/* ===== REUSABLE CARD COMPONENTS ===== */

// Notice Card Component
function createNoticeCard(notice) {
  const badgeClass = {
    important: 'badge-important',
    general: 'badge-general',
    academic: 'badge-academic',
    event: 'badge-event'
  }[notice.category] || 'badge-general';

  return `
    <div class="notice-card">
      <div class="card-header">
        <div>
          <h3>${escapeHtml(notice.title)}</h3>
          <span class="date">${formatDate(notice.date)}</span>
        </div>
        <span class="badge ${badgeClass}">${notice.category}</span>
      </div>
      <div class="card-body">
        <p>${escapeHtml(notice.content)}</p>
      </div>
    </div>
  `;
}

// Teacher Card Component
function createTeacherCard(teacher) {
  const avatar = teacher.image 
    ? `<img src="${teacher.image}" alt="${escapeHtml(teacher.name)}">`
    : `<span>👤</span>`;

  return `
    <div class="teacher-card">
      <div class="teacher-avatar">
        ${avatar}
      </div>
      <h3>${escapeHtml(teacher.name)}</h3>
      <p class="designation">${escapeHtml(teacher.designation)}</p>
      <div class="info">
        <div class="info-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
          <span>${escapeHtml(teacher.subject)}</span>
        </div>
        <div class="info-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
          <span>${escapeHtml(teacher.qualification)}</span>
        </div>
        <div class="info-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          <span>${escapeHtml(teacher.experience)}</span>
        </div>
      </div>
    </div>
  `;
}

// Event Card Component
function createEventCard(event) {
  return `
    <div class="event-card">
      <div class="event-image">📅</div>
      <div class="card-body">
        <h3>${escapeHtml(event.title)}</h3>
        <p class="description">${escapeHtml(event.description)}</p>
        <div class="event-info">
          <div class="info-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            <span>${formatDate(event.date)}</span>
          </div>
          <div class="info-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            <span>${escapeHtml(event.time)}</span>
          </div>
          <div class="info-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            <span>${escapeHtml(event.venue)}</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Feature Card Component
function createFeatureCard(feature, variant = 'solid') {
  const iconColors = {
    blue: 'blue',
    green: 'green',
    amber: 'amber'
  };
  
  const colorClass = iconColors[feature.color] || 'blue';

  if (variant === 'glass') {
    return `
      <div class="glass-card feature-card-glass">
        <div class="feature-icon ${colorClass}">
          ${feature.icon}
        </div>
        <h3>${escapeHtml(feature.title)}</h3>
        <p>${escapeHtml(feature.description)}</p>
      </div>
    `;
  }

  return `
    <div class="feature-card">
      <div class="feature-icon ${colorClass}">
        ${feature.icon}
      </div>
      <h3>${escapeHtml(feature.title)}</h3>
      <p>${escapeHtml(feature.description)}</p>
    </div>
  `;
}

// Class Card Component
function createClassCard(classItem) {
  const subjects = classItem.subjects.map(s => `<li>${escapeHtml(s)}</li>`).join('');
  
  return `
    <div class="class-card">
      <div class="class-header">
        <h3>${escapeHtml(classItem.name)}</h3>
        <span>Age: ${escapeHtml(classItem.ageGroup)}</span>
      </div>
      <div class="class-body">
        <p>${escapeHtml(classItem.description)}</p>
        <ul>${subjects}</ul>
      </div>
    </div>
  `;
}

// Facility Card Component
function createFacilityCard(facility) {
  return `
    <div class="facility-card">
      <div class="facility-icon">${facility.icon}</div>
      <div class="facility-content">
        <h3>${escapeHtml(facility.title)}</h3>
        <p>${escapeHtml(facility.description)}</p>
      </div>
    </div>
  `;
}

// Gallery Item Component
function createGalleryItem(item) {
  return `
    <div class="gallery-item" onclick="openLightbox('${item.image}', '${escapeHtml(item.title)}')">
      <img src="${item.image}" alt="${escapeHtml(item.title)}" loading="lazy">
      <div class="overlay">
        <span>${escapeHtml(item.title)}</span>
      </div>
    </div>
  `;
}

// Process Step Component
function createProcessStep(step, number) {
  return `
    <div class="process-step">
      <div class="step-number">${number}</div>
      <h3>${escapeHtml(step.title)}</h3>
      <p>${escapeHtml(step.description)}</p>
    </div>
  `;
}

// Empty State Component
function createEmptyState(message = 'No items found') {
  return `
    <div class="empty-state">
      <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
      <h3>${message}</h3>
      <p>Check back later for updates.</p>
    </div>
  `;
}

/* ===== UTILITY FUNCTIONS ===== */

// Escape HTML to prevent XSS
function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Format date
function formatDate(dateString) {
  if (!dateString) return '';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-IN', options);
}

// Lightbox functionality
let lightboxOpen = false;

function openLightbox(imageSrc, title) {
  if (lightboxOpen) return;
  
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `
    <div class="lightbox-overlay" onclick="closeLightbox()"></div>
    <div class="lightbox-content">
      <button class="lightbox-close" onclick="closeLightbox()">&times;</button>
      <img src="${imageSrc}" alt="${escapeHtml(title)}">
      <p>${escapeHtml(title)}</p>
    </div>
  `;
  
  document.body.appendChild(lightbox);
  document.body.style.overflow = 'hidden';
  lightboxOpen = true;
  
  setTimeout(() => lightbox.classList.add('active'), 10);
}

function closeLightbox() {
  const lightbox = document.querySelector('.lightbox');
  if (lightbox) {
    lightbox.classList.remove('active');
    setTimeout(() => {
      lightbox.remove();
      document.body.style.overflow = '';
      lightboxOpen = false;
    }, 300);
  }
}

// Add lightbox styles dynamically
const lightboxStyles = document.createElement('style');
lightboxStyles.textContent = `
  .lightbox {
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  .lightbox.active {
    opacity: 1;
  }
  .lightbox-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.9);
    cursor: pointer;
  }
  .lightbox-content {
    position: relative;
    max-width: 90%;
    max-height: 90%;
    text-align: center;
  }
  .lightbox-content img {
    max-width: 100%;
    max-height: 80vh;
    border-radius: 8px;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  }
  .lightbox-content p {
    color: white;
    margin-top: 16px;
    font-size: 16px;
  }
  .lightbox-close {
    position: absolute;
    top: -40px;
    right: 0;
    background: none;
    border: none;
    color: white;
    font-size: 36px;
    cursor: pointer;
    opacity: 0.8;
    transition: opacity 0.3s;
  }
  .lightbox-close:hover {
    opacity: 1;
  }
`;
document.head.appendChild(lightboxStyles);
