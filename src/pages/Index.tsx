import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, BookOpen, Users, Building2, Award, ArrowRight, ChevronRight } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import FeatureCard from '@/components/cards/FeatureCard';
import NoticeCard from '@/components/cards/NoticeCard';
import { schoolInfo, getSchoolData, Notice } from '@/lib/schoolData';
import heroImage from '@/assets/hero-school.jpg';
import aboutImage from '@/assets/about-school.jpg';

const Index = () => {
  const [notices, setNotices] = useState<Notice[]>([]);

  useEffect(() => {
    const data = getSchoolData();
    setNotices(data.notices.slice(0, 3));
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 hero-overlay" />
        
        {/* Decorative Element */}
        <div className="absolute right-0 top-0 w-32 h-full bg-secondary hidden lg:block" />
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            {/* Logo */}
            <div className="inline-flex items-center justify-center w-24 h-24 mb-8 rounded-full bg-accent/20 backdrop-blur-sm border-2 border-accent/30 animate-fade-up">
              <GraduationCap className="w-12 h-12 text-accent" />
            </div>
            
            {/* School Name */}
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 animate-fade-up delay-100">
              {schoolInfo.name}
            </h1>
            
            {/* Tagline */}
            <p className="text-xl md:text-2xl text-white/80 mb-8 animate-fade-up delay-200">
              {schoolInfo.tagline}
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up delay-300">
              <Link
                to="/admission"
                className="btn-accent px-8 py-4 rounded-xl font-heading font-semibold text-lg inline-flex items-center justify-center gap-2 group"
              >
                Apply for Admission
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/about"
                className="px-8 py-4 rounded-xl font-heading font-semibold text-lg inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all"
              >
                Learn More
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
          
          {/* Feature Cards */}
          <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto animate-fade-up delay-400">
            <FeatureCard
              icon={BookOpen}
              title="Academics"
              description="Quality education from KG to Class 6 with experienced faculty and modern curriculum."
              variant="glass"
            />
            <FeatureCard
              icon={Building2}
              title="Our Campus"
              description="State-of-the-art facilities including smart classrooms, library, and playground."
              variant="glass"
            />
            <FeatureCard
              icon={Award}
              title="Programs"
              description="Holistic development through sports, arts, music, and extracurricular activities."
              variant="glass"
            />
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-white/50 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src={aboutImage} 
                  alt="Students learning" 
                  className="w-full h-80 md:h-96 object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary/20 rounded-2xl -z-10" />
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-accent/20 rounded-2xl -z-10" />
            </div>
            
            {/* Content */}
            <div>
              <span className="text-secondary font-semibold text-sm uppercase tracking-wider">About Us</span>
              <h2 className="section-title mt-2">
                Welcome to {schoolInfo.name}
              </h2>
              <p className="text-muted-foreground leading-relaxed mt-4 mb-6">
                Established in {schoolInfo.established}, {schoolInfo.name} has been at the forefront of providing 
                quality education to young minds. We believe in nurturing each child's potential through a 
                balanced curriculum that emphasizes both academic excellence and character development.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Our dedicated team of educators creates a safe, supportive, and stimulating environment 
                where children can explore, learn, and grow. From Kindergarten to Class 6, we prepare 
                students for the challenges of tomorrow.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                {[
                  { number: "500+", label: "Students" },
                  { number: "30+", label: "Teachers" },
                  { number: "20+", label: "Years" },
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="font-heading text-3xl md:text-4xl font-bold text-secondary">
                      {stat.number}
                    </div>
                    <div className="text-muted-foreground text-sm mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
              
              <Link
                to="/about"
                className="inline-flex items-center gap-2 mt-8 text-secondary font-semibold hover:gap-3 transition-all"
              >
                Read More About Us
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Why Choose Us</span>
            <h2 className="section-title mt-2">
              Excellence in Education
            </h2>
            <p className="section-subtitle mt-4">
              We provide a nurturing environment where every child can thrive and reach their full potential.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: GraduationCap, title: "Expert Faculty", desc: "Qualified and experienced teachers dedicated to student success." },
              { icon: BookOpen, title: "Modern Curriculum", desc: "Up-to-date syllabus aligned with CBSE standards." },
              { icon: Users, title: "Small Class Size", desc: "Individual attention with optimal student-teacher ratio." },
              { icon: Building2, title: "Safe Environment", desc: "Secure campus with modern facilities and amenities." },
            ].map((item, index) => (
              <FeatureCard
                key={index}
                icon={item.icon}
                title={item.title}
                description={item.desc}
                variant="solid"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Notices Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Latest Updates</span>
              <h2 className="section-title mt-2">Notices & Announcements</h2>
            </div>
            <Link
              to="/notices"
              className="inline-flex items-center gap-2 text-secondary font-semibold hover:gap-3 transition-all"
            >
              View All Notices
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notices.length > 0 ? (
              notices.map((notice) => (
                <NoticeCard key={notice.id} notice={notice} />
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                No notices available at the moment.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-school-dark opacity-90" />
        <div className="absolute right-0 top-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute left-0 bottom-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
              Begin Your Child's Journey With Us
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8">
              Admissions are now open for the academic year 2026-27. Give your child the foundation for a bright future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/admission"
                className="btn-accent px-8 py-4 rounded-xl font-heading font-semibold text-lg inline-flex items-center justify-center gap-2"
              >
                Apply Now
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/contact"
                className="px-8 py-4 rounded-xl font-heading font-semibold text-lg inline-flex items-center justify-center gap-2 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20 transition-all"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
