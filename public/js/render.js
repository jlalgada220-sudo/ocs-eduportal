/* ===== RENDER FUNCTIONS FOR PAGES ===== */

// Render notices on homepage and notices page
function renderNotices(containerId, limit = null) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  const data = getData();
  let notices = data.notices || [];
  
  // Sort by date (newest first)
  notices.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  // Limit if specified
  if (limit) {
    notices = notices.slice(0, limit);
  }
  
  if (notices.length === 0) {
    container.innerHTML = createEmptyState('No notices available');
    return;
  }
  
  container.innerHTML = notices.map(notice => createNoticeCard(notice)).join('');
}

// Render teachers
function renderTeachers(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  const data = getData();
  const teachers = data.teachers || [];
  
  if (teachers.length === 0) {
    container.innerHTML = createEmptyState('No teachers found');
    return;
  }
  
  container.innerHTML = teachers.map(teacher => createTeacherCard(teacher)).join('');
}

// Render events
function renderEvents(containerId, limit = null) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  const data = getData();
  let events = data.events || [];
  
  // Sort by date (upcoming first)
  events.sort((a, b) => new Date(a.date) - new Date(b.date));
  
  // Filter to only show upcoming events
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  events = events.filter(e => new Date(e.date) >= today);
  
  // Limit if specified
  if (limit) {
    events = events.slice(0, limit);
  }
  
  if (events.length === 0) {
    container.innerHTML = createEmptyState('No upcoming events');
    return;
  }
  
  container.innerHTML = events.map(event => createEventCard(event)).join('');
}

// Render classes
function renderClasses(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  const classes = [
    {
      name: "Kindergarten (KG)",
      ageGroup: "3-4 years",
      description: "Foundation program focusing on play-based learning, basic motor skills, and social development.",
      subjects: ["Rhymes & Stories", "Art & Craft", "Basic Numbers", "Play Activities", "Language Development"]
    },
    {
      name: "Nursery",
      ageGroup: "4-5 years",
      description: "Preparatory program building on KG foundation with more structured learning activities.",
      subjects: ["English", "Hindi", "Mathematics", "Environmental Studies", "Art & Craft"]
    },
    {
      name: "Class 1",
      ageGroup: "5-6 years",
      description: "First formal year of primary education with focus on reading, writing, and basic math.",
      subjects: ["English", "Hindi", "Mathematics", "EVS", "Art & Craft", "Physical Education"]
    },
    {
      name: "Class 2",
      ageGroup: "6-7 years",
      description: "Building upon Class 1 foundations with more complex concepts and skill development.",
      subjects: ["English", "Hindi", "Mathematics", "EVS", "Art & Craft", "Physical Education"]
    },
    {
      name: "Class 3",
      ageGroup: "7-8 years",
      description: "Intermediate primary level with introduction to more subjects and deeper learning.",
      subjects: ["English", "Hindi", "Mathematics", "Science", "Social Studies", "Computer Basics"]
    },
    {
      name: "Class 4",
      ageGroup: "8-9 years",
      description: "Advanced primary level preparing students for upper primary education.",
      subjects: ["English", "Hindi", "Mathematics", "Science", "Social Studies", "Computer Science"]
    },
    {
      name: "Class 5",
      ageGroup: "9-10 years",
      description: "Comprehensive curriculum covering all major subjects with project-based learning.",
      subjects: ["English", "Hindi", "Mathematics", "Science", "Social Studies", "Computer Science", "Moral Science"]
    },
    {
      name: "Class 6",
      ageGroup: "10-11 years",
      description: "Final year of primary section with thorough preparation for secondary education.",
      subjects: ["English", "Hindi", "Mathematics", "Science", "Social Studies", "Computer Science", "Sanskrit/Bengali"]
    }
  ];
  
  container.innerHTML = classes.map(c => createClassCard(c)).join('');
}

// Render facilities
function renderFacilities(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  const facilities = [
    {
      icon: "📚",
      title: "Modern Library",
      description: "Well-stocked library with thousands of books, magazines, and digital resources for all age groups."
    },
    {
      icon: "💻",
      title: "Computer Lab",
      description: "State-of-the-art computer lab with latest systems and internet connectivity for practical learning."
    },
    {
      icon: "🔬",
      title: "Science Lab",
      description: "Fully equipped science laboratory for hands-on experiments and practical demonstrations."
    },
    {
      icon: "🏃",
      title: "Sports Ground",
      description: "Spacious playground with facilities for cricket, football, basketball, and athletics."
    },
    {
      icon: "🎨",
      title: "Art & Music Room",
      description: "Dedicated space for art, craft, and music activities to nurture creativity."
    },
    {
      icon: "🍽️",
      title: "Cafeteria",
      description: "Hygienic cafeteria serving nutritious meals and snacks for students."
    },
    {
      icon: "🚌",
      title: "Transport",
      description: "Safe and reliable school bus service covering major routes in the area."
    },
    {
      icon: "🏥",
      title: "Medical Room",
      description: "On-campus medical facility with trained staff for first aid and health emergencies."
    }
  ];
  
  container.innerHTML = facilities.map(f => createFacilityCard(f)).join('');
}

// Render gallery
function renderGallery(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  const galleryItems = [
    { image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400", title: "School Building" },
    { image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400", title: "Classroom" },
    { image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=400", title: "Library" },
    { image: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=400", title: "Science Lab" },
    { image: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=400", title: "Computer Lab" },
    { image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400", title: "Sports Ground" },
    { image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400", title: "Annual Day" },
    { image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400", title: "Student Activities" },
    { image: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=400", title: "Art Exhibition" }
  ];
  
  container.innerHTML = galleryItems.map(item => createGalleryItem(item)).join('');
}

// Render admission process
function renderAdmissionProcess(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  const steps = [
    {
      title: "Enquiry",
      description: "Visit our school or contact us to get information about admission process and available classes."
    },
    {
      title: "Application",
      description: "Fill out the admission form and submit it along with required documents."
    },
    {
      title: "Assessment",
      description: "Students appear for an informal interaction/assessment appropriate to their age level."
    },
    {
      title: "Admission",
      description: "Upon selection, complete the fee payment and admission formalities."
    }
  ];
  
  container.innerHTML = steps.map((step, index) => createProcessStep(step, index + 1)).join('');
}

// Render homepage features
function renderFeatures(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  const features = [
    {
      icon: "🎓",
      title: "Quality Education",
      description: "Comprehensive curriculum following CBSE guidelines with focus on holistic development.",
      color: "blue"
    },
    {
      icon: "🏫",
      title: "Modern Facilities",
      description: "Well-equipped classrooms, labs, library, and sports facilities for all-round growth.",
      color: "green"
    },
    {
      icon: "👨‍🏫",
      title: "Expert Teachers",
      description: "Dedicated and experienced faculty committed to nurturing young minds.",
      color: "amber"
    }
  ];
  
  container.innerHTML = features.map(f => createFeatureCard(f, 'solid')).join('');
}
