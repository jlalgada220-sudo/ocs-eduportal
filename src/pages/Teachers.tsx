import { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import TeacherCard from '@/components/cards/TeacherCard';
import { getSchoolData, Teacher } from '@/lib/schoolData';
import { Users } from 'lucide-react';

const Teachers = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  useEffect(() => {
    const data = getSchoolData();
    setTeachers(data.teachers);
  }, []);

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-accent/20">
            <Users className="w-8 h-8 text-accent" />
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Our Faculty
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Meet our dedicated team of experienced educators committed to nurturing young minds.
          </p>
        </div>
      </section>

      {/* Teachers Grid */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teachers.length > 0 ? (
              teachers.map((teacher) => (
                <TeacherCard key={teacher.id} teacher={teacher} />
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <Users className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground text-lg">Teacher information coming soon.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Teachers;
