/* ===== MAIN JAVASCRIPT FILE ===== */

document.addEventListener('DOMContentLoaded', function() {
  initNavbar();
  initScrollToTop();
  initScrollAnimations();
  initFormValidation();
});

/* ===== NAVBAR FUNCTIONALITY ===== */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  // Scroll behavior
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // Mobile toggle
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      mobileToggle.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        navLinks.classList.remove('active');
        mobileToggle.classList.remove('active');
      });
    });
  }
  
  // Set active link based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ===== SCROLL TO TOP ===== */
function initScrollToTop() {
  const scrollTopBtn = document.querySelector('.scroll-top');
  
  if (scrollTopBtn) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    });
    
    scrollTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

/* ===== SCROLL ANIMATIONS ===== */
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Add animation classes
  document.querySelectorAll('.feature-card, .notice-card, .teacher-card, .event-card, .class-card, .facility-card, .process-step, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// Add animation styles
const animationStyles = document.createElement('style');
animationStyles.textContent = `
  .animate-in {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
document.head.appendChild(animationStyles);

/* ===== FORM VALIDATION ===== */
function initFormValidation() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const message = document.getElementById('message').value.trim();
      
      // Simple validation
      if (!name || !email || !message) {
        showToast('Please fill in all required fields', 'error');
        return;
      }
      
      if (!isValidEmail(email)) {
        showToast('Please enter a valid email address', 'error');
        return;
      }
      
      if (phone && !isValidPhone(phone)) {
        showToast('Please enter a valid phone number', 'error');
        return;
      }
      
      // Simulate form submission
      showToast('Thank you! Your message has been sent.', 'success');
      contactForm.reset();
    });
  }
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
  return /^[\d\s\-+()]{10,}$/.test(phone);
}

/* ===== TOAST NOTIFICATIONS ===== */
function showToast(message, type = 'info') {
  // Remove existing toasts
  document.querySelectorAll('.toast').forEach(t => t.remove());
  
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  
  document.body.appendChild(toast);
  
  // Trigger animation
  setTimeout(() => toast.classList.add('show'), 10);
  
  // Auto remove
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Add toast styles
const toastStyles = document.createElement('style');
toastStyles.textContent = `
  .toast {
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%) translateY(100px);
    padding: 16px 32px;
    border-radius: 10px;
    color: white;
    font-weight: 500;
    z-index: 9999;
    opacity: 0;
    transition: all 0.3s ease;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }
  .toast.show {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
  .toast-success {
    background: linear-gradient(135deg, #10b981, #059669);
  }
  .toast-error {
    background: linear-gradient(135deg, #ef4444, #dc2626);
  }
  .toast-info {
    background: linear-gradient(135deg, #3b82f6, #2563eb);
  }
`;
document.head.appendChild(toastStyles);

/* ===== DATA MANAGEMENT ===== */
const DATA_KEY = 'schoolData';

// Get all data from localStorage
function getData() {
  const data = localStorage.getItem(DATA_KEY);
  if (data) {
    return JSON.parse(data);
  }
  return getDefaultData();
}

// Save data to localStorage
function saveData(data) {
  localStorage.setItem(DATA_KEY, JSON.stringify(data));
}

// Get default data
function getDefaultData() {
  return {
    notices: [
      {
        id: 1,
        title: "Annual Day Celebration 2025",
        content: "We are excited to announce our Annual Day celebration scheduled for next month. All parents are cordially invited to join us for this grand event.",
        date: "2025-01-15",
        category: "event"
      },
      {
        id: 2,
        title: "Winter Vacation Notice",
        content: "School will remain closed from December 25th to January 1st for winter vacation. Classes will resume on January 2nd.",
        date: "2025-01-10",
        category: "important"
      },
      {
        id: 3,
        title: "Parent-Teacher Meeting",
        content: "A parent-teacher meeting is scheduled for all classes. Please check with your class teacher for the specific time slot.",
        date: "2025-01-08",
        category: "academic"
      }
    ],
    teachers: [
      {
        id: 1,
        name: "Mrs. Sunita Sharma",
        designation: "Principal",
        subject: "Administration",
        qualification: "M.Ed, Ph.D",
        experience: "25+ Years",
        image: ""
      },
      {
        id: 2,
        name: "Mr. Rajesh Kumar",
        designation: "Senior Teacher",
        subject: "Mathematics",
        qualification: "M.Sc, B.Ed",
        experience: "15 Years",
        image: ""
      },
      {
        id: 3,
        name: "Mrs. Priya Das",
        designation: "Teacher",
        subject: "English",
        qualification: "M.A, B.Ed",
        experience: "10 Years",
        image: ""
      },
      {
        id: 4,
        name: "Mr. Amit Roy",
        designation: "Teacher",
        subject: "Science",
        qualification: "M.Sc, B.Ed",
        experience: "8 Years",
        image: ""
      }
    ],
    events: [
      {
        id: 1,
        title: "Science Exhibition",
        description: "Annual science exhibition showcasing student projects and innovations from all classes.",
        date: "2025-02-15",
        time: "10:00 AM - 4:00 PM",
        venue: "School Auditorium"
      },
      {
        id: 2,
        title: "Sports Day",
        description: "Annual sports day with various athletic events and competitions for all age groups.",
        date: "2025-02-20",
        time: "8:00 AM - 2:00 PM",
        venue: "School Ground"
      },
      {
        id: 3,
        title: "Cultural Program",
        description: "Students will perform various cultural activities including dance, drama, and music.",
        date: "2025-03-01",
        time: "3:00 PM - 6:00 PM",
        venue: "School Auditorium"
      }
    ]
  };
}

// Initialize data if not exists
if (!localStorage.getItem(DATA_KEY)) {
  saveData(getDefaultData());
}
