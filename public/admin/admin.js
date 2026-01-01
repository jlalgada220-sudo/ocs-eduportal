/* ===== ADMIN PANEL JAVASCRIPT ===== */

// Check authentication
if (sessionStorage.getItem('adminLoggedIn') !== 'true') {
  window.location.href = 'admin-login.html';
}

// DOM Elements
const sections = document.querySelectorAll('.admin-section');
const navLinks = document.querySelectorAll('.admin-nav a[data-section]');
const pageTitle = document.getElementById('pageTitle');
const currentDate = document.getElementById('currentDate');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  // Set current date
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  currentDate.textContent = new Date().toLocaleDateString('en-IN', options);
  
  // Initialize dashboard
  updateDashboard();
  
  // Setup navigation
  setupNavigation();
  
  // Setup forms
  setupForms();
  
  // Setup logout
  document.getElementById('logoutBtn').addEventListener('click', function(e) {
    e.preventDefault();
    sessionStorage.removeItem('adminLoggedIn');
    window.location.href = 'admin-login.html';
  });
  
  // Load initial data
  loadNoticesTable();
  loadTeachersTable();
  loadEventsTable();
  
  // Setup live previews
  setupPreviews();
});

// Navigation
function setupNavigation() {
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      if (this.dataset.section) {
        e.preventDefault();
        showSection(this.dataset.section);
      }
    });
  });
}

function showSection(sectionName) {
  // Hide all sections
  sections.forEach(s => s.style.display = 'none');
  
  // Show selected section
  const section = document.getElementById(`${sectionName}-section`);
  if (section) {
    section.style.display = 'block';
  }
  
  // Update nav active state
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.dataset.section === sectionName) {
      link.classList.add('active');
    }
  });
  
  // Update page title
  const titles = {
    dashboard: 'Dashboard',
    notices: 'Manage Notices',
    teachers: 'Manage Teachers',
    events: 'Manage Events'
  };
  pageTitle.textContent = titles[sectionName] || 'Dashboard';
}

// Dashboard
function updateDashboard() {
  const data = getData();
  
  document.getElementById('noticeCount').textContent = data.notices.length;
  document.getElementById('teacherCount').textContent = data.teachers.length;
  document.getElementById('eventCount').textContent = data.events.length;
  
  // Recent notices
  const recentNotices = document.getElementById('recentNotices');
  const notices = data.notices.slice(0, 3);
  
  if (notices.length === 0) {
    recentNotices.innerHTML = '<p style="color: var(--text-muted);">No notices yet.</p>';
  } else {
    recentNotices.innerHTML = notices.map(n => `
      <div style="padding: 12px 0; border-bottom: 1px solid var(--border);">
        <strong>${escapeHtml(n.title)}</strong>
        <span class="badge badge-${n.category}" style="margin-left: 8px;">${n.category}</span>
        <p style="color: var(--text-muted); font-size: 13px; margin-top: 4px;">${formatDate(n.date)}</p>
      </div>
    `).join('');
  }
}

// Form Setup
function setupForms() {
  // Notice Form
  document.getElementById('noticeForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const notice = {
      id: Date.now(),
      title: document.getElementById('noticeTitle').value,
      content: document.getElementById('noticeContent').value,
      date: document.getElementById('noticeDate').value,
      category: document.getElementById('noticeCategory').value
    };
    
    const data = getData();
    data.notices.unshift(notice);
    saveData(data);
    
    this.reset();
    loadNoticesTable();
    updateDashboard();
    updatePreview('notice');
    showToast('Notice added successfully!', 'success');
  });
  
  // Teacher Form
  document.getElementById('teacherForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const teacher = {
      id: Date.now(),
      name: document.getElementById('teacherName').value,
      designation: document.getElementById('teacherDesignation').value,
      subject: document.getElementById('teacherSubject').value,
      qualification: document.getElementById('teacherQualification').value,
      experience: document.getElementById('teacherExperience').value,
      image: ''
    };
    
    const data = getData();
    data.teachers.push(teacher);
    saveData(data);
    
    this.reset();
    loadTeachersTable();
    updateDashboard();
    updatePreview('teacher');
    showToast('Teacher added successfully!', 'success');
  });
  
  // Event Form
  document.getElementById('eventForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const event = {
      id: Date.now(),
      title: document.getElementById('eventTitle').value,
      description: document.getElementById('eventDescription').value,
      date: document.getElementById('eventDate').value,
      time: document.getElementById('eventTime').value,
      venue: document.getElementById('eventVenue').value
    };
    
    const data = getData();
    data.events.push(event);
    saveData(data);
    
    this.reset();
    loadEventsTable();
    updateDashboard();
    updatePreview('event');
    showToast('Event added successfully!', 'success');
  });
}

// Live Preview Setup
function setupPreviews() {
  // Notice preview
  ['noticeTitle', 'noticeContent', 'noticeDate', 'noticeCategory'].forEach(id => {
    document.getElementById(id).addEventListener('input', () => updatePreview('notice'));
  });
  
  // Teacher preview
  ['teacherName', 'teacherDesignation', 'teacherSubject', 'teacherQualification', 'teacherExperience'].forEach(id => {
    document.getElementById(id).addEventListener('input', () => updatePreview('teacher'));
  });
  
  // Event preview
  ['eventTitle', 'eventDescription', 'eventDate', 'eventTime', 'eventVenue'].forEach(id => {
    document.getElementById(id).addEventListener('input', () => updatePreview('event'));
  });
  
  // Initial previews
  updatePreview('notice');
  updatePreview('teacher');
  updatePreview('event');
}

function updatePreview(type) {
  if (type === 'notice') {
    const notice = {
      title: document.getElementById('noticeTitle').value || 'Notice Title',
      content: document.getElementById('noticeContent').value || 'Notice content will appear here...',
      date: document.getElementById('noticeDate').value || new Date().toISOString().split('T')[0],
      category: document.getElementById('noticeCategory').value || 'general'
    };
    document.getElementById('noticePreview').innerHTML = createNoticeCard(notice);
  }
  
  if (type === 'teacher') {
    const teacher = {
      name: document.getElementById('teacherName').value || 'Teacher Name',
      designation: document.getElementById('teacherDesignation').value || 'Designation',
      subject: document.getElementById('teacherSubject').value || 'Subject',
      qualification: document.getElementById('teacherQualification').value || 'Qualification',
      experience: document.getElementById('teacherExperience').value || 'Experience',
      image: ''
    };
    document.getElementById('teacherPreview').innerHTML = createTeacherCard(teacher);
  }
  
  if (type === 'event') {
    const event = {
      title: document.getElementById('eventTitle').value || 'Event Title',
      description: document.getElementById('eventDescription').value || 'Event description will appear here...',
      date: document.getElementById('eventDate').value || new Date().toISOString().split('T')[0],
      time: document.getElementById('eventTime').value || '10:00 AM',
      venue: document.getElementById('eventVenue').value || 'School Auditorium'
    };
    document.getElementById('eventPreview').innerHTML = createEventCard(event);
  }
}

// Table Loaders
function loadNoticesTable() {
  const data = getData();
  const tbody = document.getElementById('noticesTable');
  
  if (data.notices.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" style="text-align: center; color: var(--text-muted);">No notices found</td></tr>';
    return;
  }
  
  tbody.innerHTML = data.notices.map(notice => `
    <tr>
      <td>${escapeHtml(notice.title)}</td>
      <td><span class="badge badge-${notice.category}">${notice.category}</span></td>
      <td>${formatDate(notice.date)}</td>
      <td class="actions">
        <button class="btn-delete" onclick="deleteNotice(${notice.id})">Delete</button>
      </td>
    </tr>
  `).join('');
}

function loadTeachersTable() {
  const data = getData();
  const tbody = document.getElementById('teachersTable');
  
  if (data.teachers.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" style="text-align: center; color: var(--text-muted);">No teachers found</td></tr>';
    return;
  }
  
  tbody.innerHTML = data.teachers.map(teacher => `
    <tr>
      <td>${escapeHtml(teacher.name)}</td>
      <td>${escapeHtml(teacher.designation)}</td>
      <td>${escapeHtml(teacher.subject)}</td>
      <td class="actions">
        <button class="btn-delete" onclick="deleteTeacher(${teacher.id})">Delete</button>
      </td>
    </tr>
  `).join('');
}

function loadEventsTable() {
  const data = getData();
  const tbody = document.getElementById('eventsTable');
  
  if (data.events.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" style="text-align: center; color: var(--text-muted);">No events found</td></tr>';
    return;
  }
  
  tbody.innerHTML = data.events.map(event => `
    <tr>
      <td>${escapeHtml(event.title)}</td>
      <td>${formatDate(event.date)}</td>
      <td>${escapeHtml(event.venue)}</td>
      <td class="actions">
        <button class="btn-delete" onclick="deleteEvent(${event.id})">Delete</button>
      </td>
    </tr>
  `).join('');
}

// Delete Functions
function deleteNotice(id) {
  if (!confirm('Are you sure you want to delete this notice?')) return;
  
  const data = getData();
  data.notices = data.notices.filter(n => n.id !== id);
  saveData(data);
  
  loadNoticesTable();
  updateDashboard();
  showToast('Notice deleted successfully!', 'success');
}

function deleteTeacher(id) {
  if (!confirm('Are you sure you want to delete this teacher?')) return;
  
  const data = getData();
  data.teachers = data.teachers.filter(t => t.id !== id);
  saveData(data);
  
  loadTeachersTable();
  updateDashboard();
  showToast('Teacher deleted successfully!', 'success');
}

function deleteEvent(id) {
  if (!confirm('Are you sure you want to delete this event?')) return;
  
  const data = getData();
  data.events = data.events.filter(e => e.id !== id);
  saveData(data);
  
  loadEventsTable();
  updateDashboard();
  showToast('Event deleted successfully!', 'success');
}

// Make showSection globally available
window.showSection = showSection;
