import { Calendar, Clock, MapPin } from 'lucide-react';
import { Event, formatDate } from '@/lib/schoolData';

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  return (
    <div className="notice-card group cursor-pointer overflow-hidden">
      {/* Image placeholder */}
      <div className="h-40 bg-gradient-to-br from-secondary/20 to-primary/20 flex items-center justify-center">
        <Calendar className="w-16 h-16 text-secondary/50" />
      </div>
      
      <div className="p-5">
        <h3 className="font-heading font-semibold text-lg text-foreground group-hover:text-secondary transition-colors mb-2">
          {event.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
          {event.description}
        </p>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4 text-accent" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4 text-accent" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4 text-accent" />
            <span>{event.venue}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
