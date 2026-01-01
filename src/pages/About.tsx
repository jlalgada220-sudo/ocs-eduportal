import Layout from '@/components/layout/Layout';
import { schoolInfo } from '@/lib/schoolData';
import { Target, Eye, Heart, Award, BookOpen, Users, Building2, Shield } from 'lucide-react';
import aboutImage from '@/assets/about-school.jpg';

const About = () => {
  const values = [
    { icon: BookOpen, title: "Academic Excellence", desc: "Commitment to highest standards of learning and education." },
    { icon: Heart, title: "Character Building", desc: "Instilling values of integrity, respect, and responsibility." },
    { icon: Users, title: "Inclusive Community", desc: "Welcoming diverse backgrounds and celebrating differences." },
    { icon: Shield, title: "Safe Environment", desc: "Providing a secure and nurturing space for all students." },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            About Our School
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Discover the story, values, and vision that drive {schoolInfo.name}.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Our Story</span>
              <h2 className="section-title mt-2">Welcome to {schoolInfo.name}</h2>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Established in {schoolInfo.established}, {schoolInfo.name} has been a cornerstone of quality 
                education in the Duttapukur region. What started as a small institution with a handful of 
                students has grown into a respected educational establishment serving hundreds of families.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Our school provides education from Kindergarten to Class 6, focusing on building strong 
                academic foundations while nurturing the overall development of each child. We believe 
                that every child has unique potential waiting to be discovered and nurtured.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Located in the peaceful surroundings of Purbaichapur, our campus offers a conducive 
                environment for learning, complete with modern facilities and dedicated faculty members 
                who are passionate about education.
              </p>
            </div>
            <div className="relative">
              <img 
                src={aboutImage} 
                alt="Students in classroom" 
                className="rounded-2xl shadow-lg w-full h-80 md:h-96 object-cover"
              />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-secondary/20 rounded-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 md:py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="feature-card">
              <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                <Target className="w-7 h-7 text-secondary" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-foreground mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To provide a nurturing and stimulating educational environment that empowers students 
                to achieve their full potential academically, socially, and emotionally. We strive to 
                develop responsible citizens who are equipped with critical thinking skills and a 
                lifelong love for learning.
              </p>
            </div>

            {/* Vision */}
            <div className="feature-card">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                <Eye className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-foreground mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To be recognized as a leading educational institution that shapes young minds into 
                confident, compassionate, and capable individuals. We envision our students as 
                future leaders who contribute positively to society and embrace the challenges 
                of a rapidly changing world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider">What We Stand For</span>
            <h2 className="section-title mt-2">Our Core Values</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="feature-card text-center">
                <div className="w-14 h-14 mx-auto rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                  <value.icon className="w-7 h-7 text-secondary" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 md:py-16 bg-primary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "20+", label: "Years of Excellence" },
              { number: "500+", label: "Happy Students" },
              { number: "30+", label: "Expert Teachers" },
              { number: "95%", label: "Pass Rate" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-heading text-4xl md:text-5xl font-bold text-accent">{stat.number}</div>
                <div className="text-primary-foreground/80 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
