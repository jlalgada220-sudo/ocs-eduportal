import { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import NoticeCard from '@/components/cards/NoticeCard';
import { getSchoolData, Notice } from '@/lib/schoolData';
import { Bell, Filter } from 'lucide-react';

const Notices = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    const data = getSchoolData();
    setNotices(data.notices);
  }, []);

  const filteredNotices = filter === 'all' 
    ? notices 
    : notices.filter(n => n.category === filter);

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-accent/20">
            <Bell className="w-8 h-8 text-accent" />
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Notices & Announcements
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Stay updated with the latest news, events, and important announcements from our school.
          </p>
        </div>
      </section>

      {/* Filters & Notices */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <Filter className="w-5 h-5 text-muted-foreground" />
            {['all', 'announcement', 'event', 'academic', 'general'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  filter === cat
                    ? 'bg-secondary text-secondary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          {/* Notices Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotices.length > 0 ? (
              filteredNotices.map((notice) => (
                <NoticeCard key={notice.id} notice={notice} />
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <Bell className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground text-lg">No notices found.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Notices;
