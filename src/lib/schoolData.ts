// School information and data management

export const schoolInfo = {
  name: "O.C.S Group of Institute",
  tagline: "Nurturing Young Minds, Building Tomorrow's Leaders",
  address: {
    line1: "Purbaichapur, P.O - Kadambagchi",
    line2: "P.S - Duttapukur",
    district: "North 24 Parganas",
    pinCode: "700125",
    state: "West Bengal, India"
  },
  contact: {
    phone: "+91 93300 00000",
    email: "info@ocsgroup.edu.in"
  },
  established: 2005,
  classes: "KG to Class 6"
};

export interface Notice {
  id: string;
  title: string;
  content: string;
  date: string;
  category: 'announcement' | 'event' | 'academic' | 'general';
  isImportant: boolean;
}

export interface Teacher {
  id: string;
  name: string;
  designation: string;
  qualification: string;
  subject: string;
  experience: string;
  image?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  image?: string;
}

export interface SchoolData {
  notices: Notice[];
  teachers: Teacher[];
  events: Event[];
}

const defaultData: SchoolData = {
  notices: [
    {
      id: "1",
      title: "Annual Sports Day 2026",
      content: "We are excited to announce our Annual Sports Day scheduled for January 15th, 2026. All students are encouraged to participate.",
      date: "2026-01-15",
      category: "event",
      isImportant: true
    },
    {
      id: "2",
      title: "Parent-Teacher Meeting",
      content: "PTM for Classes 1-6 will be held on January 20th, 2026. Parents are requested to attend.",
      date: "2026-01-20",
      category: "announcement",
      isImportant: true
    },
    {
      id: "3",
      title: "Admission Open 2026-27",
      content: "Admissions are now open for the academic year 2026-27 for KG to Class 6. Contact office for details.",
      date: "2026-01-01",
      category: "academic",
      isImportant: true
    }
  ],
  teachers: [
    {
      id: "1",
      name: "Mrs. Anita Sharma",
      designation: "Principal",
      qualification: "M.Ed, B.Ed",
      subject: "Administration",
      experience: "20+ years"
    },
    {
      id: "2",
      name: "Mr. Rajesh Kumar",
      designation: "Senior Teacher",
      qualification: "M.A., B.Ed",
      subject: "Mathematics",
      experience: "15 years"
    },
    {
      id: "3",
      name: "Ms. Priya Das",
      designation: "Teacher",
      qualification: "B.Sc., B.Ed",
      subject: "Science",
      experience: "8 years"
    },
    {
      id: "4",
      name: "Mr. Sunil Roy",
      designation: "Teacher",
      qualification: "M.A., B.Ed",
      subject: "English",
      experience: "10 years"
    }
  ],
  events: [
    {
      id: "1",
      title: "Republic Day Celebration",
      description: "Join us for the Republic Day celebration with cultural programs and flag hoisting ceremony.",
      date: "2026-01-26",
      time: "8:00 AM",
      venue: "School Ground"
    },
    {
      id: "2",
      title: "Science Exhibition",
      description: "Students will showcase their innovative science projects. Parents are welcome to attend.",
      date: "2026-02-10",
      time: "10:00 AM",
      venue: "School Auditorium"
    }
  ]
};

// Storage key
const STORAGE_KEY = 'ocs_school_data';

// Get data from localStorage or return defaults
export const getSchoolData = (): SchoolData => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error reading school data:', error);
  }
  return defaultData;
};

// Save data to localStorage
export const saveSchoolData = (data: SchoolData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving school data:', error);
  }
};

// Generate unique ID
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Format date for display
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

// Get category color
export const getCategoryColor = (category: Notice['category']): string => {
  switch (category) {
    case 'announcement': return 'bg-secondary';
    case 'event': return 'bg-accent';
    case 'academic': return 'bg-primary';
    default: return 'bg-muted';
  }
};
