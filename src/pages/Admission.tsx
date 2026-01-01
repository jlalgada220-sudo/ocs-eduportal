import Layout from '@/components/layout/Layout';
import { schoolInfo } from '@/lib/schoolData';
import { GraduationCap, FileText, Calendar, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Admission = () => {
  const steps = [
    { step: 1, title: "Get Information", desc: "Visit our school or contact us to learn about our programs and curriculum." },
    { step: 2, title: "Submit Application", desc: "Complete the admission form and submit required documents." },
    { step: 3, title: "Entrance Assessment", desc: "Students undergo a simple age-appropriate assessment." },
    { step: 4, title: "Confirmation", desc: "Upon selection, complete fee payment and enrollment formalities." },
  ];

  const documents = [
    "Birth Certificate (Original & Photocopy)",
    "Aadhaar Card of Child & Parents",
    "Transfer Certificate (if applicable)",
    "Previous Report Card",
    "4 Passport Size Photographs",
    "Address Proof",
    "Medical Fitness Certificate"
  ];

  const classes = [
    { name: "Pre-Nursery", age: "3+ years" },
    { name: "Nursery", age: "3.5+ years" },
    { name: "KG", age: "4+ years" },
    { name: "Class 1", age: "5.5+ years" },
    { name: "Class 2-6", age: "As per age criteria" },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-accent/20">
            <GraduationCap className="w-8 h-8 text-accent" />
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Admissions 2026-27
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-8">
            Join {schoolInfo.name} and give your child the foundation for a bright future.
          </p>
          <div className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-full font-semibold">
            <Calendar className="w-5 h-5" />
            Admissions Now Open
          </div>
        </div>
      </section>

      {/* Admission Process */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider">How to Apply</span>
            <h2 className="section-title mt-2">Admission Process</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((item) => (
              <div key={item.step} className="feature-card text-center relative">
                <div className="w-14 h-14 mx-auto rounded-full bg-secondary text-secondary-foreground font-heading font-bold text-xl flex items-center justify-center mb-4">
                  {item.step}
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
                {item.step < 4 && (
                  <ArrowRight className="hidden lg:block absolute top-1/2 -right-3 w-6 h-6 text-secondary -translate-y-1/2 z-10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Classes & Age Criteria */}
      <section className="py-12 md:py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Classes */}
            <div>
              <h2 className="section-title mb-8">Classes Offered</h2>
              <div className="space-y-4">
                {classes.map((cls, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-card rounded-xl shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                        <GraduationCap className="w-5 h-5 text-secondary" />
                      </div>
                      <span className="font-heading font-semibold text-foreground">{cls.name}</span>
                    </div>
                    <span className="text-muted-foreground text-sm">{cls.age}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Documents */}
            <div>
              <h2 className="section-title mb-8">Required Documents</h2>
              <div className="feature-card">
                <ul className="space-y-3">
                  {documents.map((doc, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Enroll?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
            Visit our school for a campus tour or contact us for more information about admissions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-accent px-8 py-4 rounded-xl font-heading font-semibold text-lg">
              Contact Us
            </Link>
            <a 
              href={`tel:${schoolInfo.contact.phone}`}
              className="px-8 py-4 rounded-xl font-heading font-semibold text-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20 transition-all"
            >
              Call: {schoolInfo.contact.phone}
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Admission;
