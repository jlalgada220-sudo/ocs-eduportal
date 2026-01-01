import Layout from '@/components/layout/Layout';
import { BookOpen, Users, Clock, Star } from 'lucide-react';

const Classes = () => {
  const classData = [
    {
      name: "Pre-Nursery",
      age: "3+ years",
      description: "Introduction to school environment through play-based learning, developing social skills and basic motor coordination.",
      subjects: ["Play-based Learning", "Rhymes & Stories", "Art & Craft", "Motor Skills"],
      color: "bg-pink-500"
    },
    {
      name: "Nursery",
      age: "3.5+ years",
      description: "Building foundation through structured play, introduction to alphabets, numbers, and basic concepts.",
      subjects: ["Phonics", "Numbers", "Environmental Awareness", "Creative Activities"],
      color: "bg-purple-500"
    },
    {
      name: "Kindergarten (KG)",
      age: "4+ years",
      description: "Preparation for primary education with focus on reading readiness, numerical concepts, and social development.",
      subjects: ["Reading Readiness", "Math Concepts", "Science Exploration", "Art & Music"],
      color: "bg-blue-500"
    },
    {
      name: "Class 1",
      age: "5.5+ years",
      description: "Formal education begins with structured curriculum covering core subjects and extracurricular activities.",
      subjects: ["English", "Hindi", "Mathematics", "EVS", "Art"],
      color: "bg-green-500"
    },
    {
      name: "Class 2",
      age: "6+ years",
      description: "Continuation of foundational learning with increased focus on reading, writing, and mathematical skills.",
      subjects: ["English", "Hindi", "Mathematics", "EVS", "Computer Basics"],
      color: "bg-yellow-500"
    },
    {
      name: "Class 3",
      age: "7+ years",
      description: "Development of independent learning skills with expanded curriculum and project-based activities.",
      subjects: ["English", "Hindi", "Mathematics", "Science", "Social Studies", "Computer"],
      color: "bg-orange-500"
    },
    {
      name: "Class 4",
      age: "8+ years",
      description: "Building critical thinking and analytical skills through comprehensive subject coverage.",
      subjects: ["English", "Hindi", "Mathematics", "Science", "Social Studies", "Computer"],
      color: "bg-red-500"
    },
    {
      name: "Class 5",
      age: "9+ years",
      description: "Preparation for middle school with advanced concepts and increased academic rigor.",
      subjects: ["English", "Hindi", "Mathematics", "Science", "Social Studies", "Computer"],
      color: "bg-indigo-500"
    },
    {
      name: "Class 6",
      age: "10+ years",
      description: "Transition to middle school curriculum with specialized subjects and enhanced learning methodologies.",
      subjects: ["English", "Hindi", "Mathematics", "Science", "History", "Geography", "Computer"],
      color: "bg-teal-500"
    }
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-accent/20">
            <BookOpen className="w-8 h-8 text-accent" />
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Our Classes
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            From Pre-Nursery to Class 6, we provide age-appropriate education designed for holistic development.
          </p>
        </div>
      </section>

      {/* Classes Grid */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classData.map((cls, index) => (
              <div key={index} className="feature-card group overflow-hidden">
                {/* Header */}
                <div className={`${cls.color} p-4 -mx-6 -mt-6 mb-4`}>
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading font-bold text-xl text-white">{cls.name}</h3>
                    <span className="bg-white/20 text-white text-sm px-3 py-1 rounded-full">
                      {cls.age}
                    </span>
                  </div>
                </div>
                
                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {cls.description}
                </p>
                
                {/* Subjects */}
                <div>
                  <h4 className="font-heading font-semibold text-foreground text-sm mb-2 flex items-center gap-2">
                    <Star className="w-4 h-4 text-accent" />
                    Key Subjects
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {cls.subjects.map((subject, idx) => (
                      <span 
                        key={idx} 
                        className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded-md"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 md:py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="feature-card text-center">
              <div className="w-14 h-14 mx-auto rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                <Users className="w-7 h-7 text-secondary" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-foreground mb-2">Small Class Size</h3>
              <p className="text-muted-foreground text-sm">
                Maximum 30 students per class ensuring individual attention.
              </p>
            </div>
            <div className="feature-card text-center">
              <div className="w-14 h-14 mx-auto rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                <Clock className="w-7 h-7 text-secondary" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-foreground mb-2">School Timing</h3>
              <p className="text-muted-foreground text-sm">
                Monday to Saturday: 8:30 AM - 2:30 PM
              </p>
            </div>
            <div className="feature-card text-center">
              <div className="w-14 h-14 mx-auto rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                <BookOpen className="w-7 h-7 text-secondary" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-foreground mb-2">Curriculum</h3>
              <p className="text-muted-foreground text-sm">
                CBSE aligned curriculum with focus on holistic development.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Classes;
