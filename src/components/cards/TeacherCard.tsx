import { User, BookOpen, Award, Clock } from 'lucide-react';
import { Teacher } from '@/lib/schoolData';

interface TeacherCardProps {
  teacher: Teacher;
}

const TeacherCard = ({ teacher }: TeacherCardProps) => {
  return (
    <div className="feature-card text-center group">
      {/* Avatar */}
      <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
        {teacher.image ? (
          <img 
            src={teacher.image} 
            alt={teacher.name} 
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <User className="w-12 h-12 text-primary-foreground" />
        )}
      </div>

      {/* Name & Designation */}
      <h3 className="font-heading font-semibold text-lg text-foreground mb-1">
        {teacher.name}
      </h3>
      <p className="text-secondary font-medium text-sm mb-4">
        {teacher.designation}
      </p>

      {/* Details */}
      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <BookOpen className="w-4 h-4 text-accent" />
          <span>{teacher.subject}</span>
        </div>
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <Award className="w-4 h-4 text-accent" />
          <span>{teacher.qualification}</span>
        </div>
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <Clock className="w-4 h-4 text-accent" />
          <span>{teacher.experience}</span>
        </div>
      </div>
    </div>
  );
};

export default TeacherCard;
