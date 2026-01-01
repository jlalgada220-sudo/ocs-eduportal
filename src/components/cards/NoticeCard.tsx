import { Calendar, Bell } from 'lucide-react';
import { Notice, formatDate, getCategoryColor } from '@/lib/schoolData';
import { cn } from '@/lib/utils';

interface NoticeCardProps {
  notice: Notice;
  variant?: 'default' | 'compact';
}

const NoticeCard = ({ notice, variant = 'default' }: NoticeCardProps) => {
  if (variant === 'compact') {
    return (
      <div className="notice-card p-4 flex items-start gap-4 group cursor-pointer">
        <div className={cn(
          "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
          getCategoryColor(notice.category),
          notice.category === 'announcement' ? 'text-secondary-foreground' : 'text-primary-foreground'
        )}>
          <Bell className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-heading font-semibold text-foreground group-hover:text-secondary transition-colors truncate">
            {notice.title}
          </h4>
          <p className="text-muted-foreground text-sm mt-1 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {formatDate(notice.date)}
          </p>
        </div>
        {notice.isImportant && (
          <span className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full font-medium flex-shrink-0">
            Important
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="notice-card group cursor-pointer">
      <div className={cn(
        "px-4 py-2 flex items-center justify-between",
        getCategoryColor(notice.category),
        notice.category === 'announcement' ? 'text-secondary-foreground' : 'text-primary-foreground'
      )}>
        <span className="text-sm font-medium capitalize">{notice.category}</span>
        {notice.isImportant && (
          <span className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full font-medium">
            Important
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-heading font-semibold text-lg text-foreground group-hover:text-secondary transition-colors mb-2">
          {notice.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
          {notice.content}
        </p>
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground text-sm flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {formatDate(notice.date)}
          </p>
          <span className="text-secondary text-sm font-medium group-hover:underline">
            Read more →
          </span>
        </div>
      </div>
    </div>
  );
};

export default NoticeCard;
