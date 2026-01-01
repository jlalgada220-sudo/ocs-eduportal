import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  variant?: 'glass' | 'solid';
}

const FeatureCard = ({ icon: Icon, title, description, variant = 'glass' }: FeatureCardProps) => {
  if (variant === 'glass') {
    return (
      <div className="glass-card p-6 md:p-8 text-center group hover:scale-105 transition-all duration-300 cursor-pointer">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-accent/20 flex items-center justify-center group-hover:bg-accent group-hover:scale-110 transition-all">
          <Icon className="w-8 h-8 text-accent group-hover:text-accent-foreground transition-colors" />
        </div>
        <h3 className="font-heading font-semibold text-lg text-white mb-2">
          {title}
        </h3>
        <p className="text-white/70 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    );
  }

  return (
    <div className="feature-card text-center group">
      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-secondary/10 flex items-center justify-center group-hover:bg-secondary group-hover:scale-110 transition-all">
        <Icon className="w-8 h-8 text-secondary group-hover:text-secondary-foreground transition-colors" />
      </div>
      <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
        {title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
