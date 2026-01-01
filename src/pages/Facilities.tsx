import Layout from '@/components/layout/Layout';
import { Building2, BookOpen, Monitor, Dumbbell, Music, FlaskConical, Utensils, Bus } from 'lucide-react';

const Facilities = () => {
  const facilities = [
    {
      icon: BookOpen,
      title: "Well-Stocked Library",
      description: "A comprehensive library with thousands of books, magazines, and educational resources to foster reading habits and research skills."
    },
    {
      icon: Monitor,
      title: "Computer Lab",
      description: "Modern computer lab with latest equipment to provide students with essential digital literacy skills from an early age."
    },
    {
      icon: FlaskConical,
      title: "Science Lab",
      description: "Equipped science laboratory where students can conduct experiments and develop practical understanding of scientific concepts."
    },
    {
      icon: Dumbbell,
      title: "Sports Ground",
      description: "Spacious playground with facilities for various sports including cricket, football, and athletics."
    },
    {
      icon: Music,
      title: "Music & Art Room",
      description: "Dedicated spaces for music, dance, and art education to nurture creative talents and artistic expression."
    },
    {
      icon: Building2,
      title: "Smart Classrooms",
      description: "Air-conditioned classrooms equipped with interactive boards and modern teaching aids for enhanced learning."
    },
    {
      icon: Utensils,
      title: "Cafeteria",
      description: "Clean and hygienic cafeteria serving nutritious meals and snacks for students."
    },
    {
      icon: Bus,
      title: "Transport Facility",
      description: "Safe and reliable bus service covering major areas of Duttapukur and surrounding localities."
    }
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-accent/20">
            <Building2 className="w-8 h-8 text-accent" />
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Our Facilities
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            State-of-the-art infrastructure designed to provide the best learning environment for our students.
          </p>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {facilities.map((facility, index) => (
              <div key={index} className="feature-card text-center group">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-secondary/10 flex items-center justify-center mb-4 group-hover:bg-secondary group-hover:scale-110 transition-all">
                  <facility.icon className="w-8 h-8 text-secondary group-hover:text-secondary-foreground transition-colors" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{facility.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{facility.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Campus Highlights */}
      <section className="py-12 md:py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Campus Life</span>
            <h2 className="section-title mt-2">A Nurturing Environment</h2>
            <p className="section-subtitle mt-4">
              Our campus is designed to be a safe, comfortable, and stimulating space where children can learn, play, and grow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card rounded-2xl p-6 shadow-md">
              <h3 className="font-heading font-semibold text-lg text-foreground mb-3">Safety First</h3>
              <p className="text-muted-foreground text-sm">
                CCTV surveillance, trained security personnel, and strict visitor management ensure a secure environment.
              </p>
            </div>
            <div className="bg-card rounded-2xl p-6 shadow-md">
              <h3 className="font-heading font-semibold text-lg text-foreground mb-3">Green Campus</h3>
              <p className="text-muted-foreground text-sm">
                Beautiful landscaping with trees and gardens creates a pleasant and eco-friendly atmosphere.
              </p>
            </div>
            <div className="bg-card rounded-2xl p-6 shadow-md">
              <h3 className="font-heading font-semibold text-lg text-foreground mb-3">Medical Support</h3>
              <p className="text-muted-foreground text-sm">
                First-aid facility and regular health check-ups ensure students' well-being at all times.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Facilities;
