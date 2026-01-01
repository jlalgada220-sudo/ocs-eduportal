import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Image, X } from 'lucide-react';

// Placeholder images - in real project these would be actual school photos
const galleryItems = [
  { id: 1, category: "campus", title: "School Building" },
  { id: 2, category: "events", title: "Annual Day Celebration" },
  { id: 3, category: "classroom", title: "Smart Classroom" },
  { id: 4, category: "sports", title: "Sports Day" },
  { id: 5, category: "events", title: "Science Exhibition" },
  { id: 6, category: "campus", title: "Library" },
  { id: 7, category: "classroom", title: "Computer Lab" },
  { id: 8, category: "sports", title: "Playground Activities" },
  { id: 9, category: "events", title: "Independence Day" },
];

const categories = ['all', 'campus', 'classroom', 'events', 'sports'];

const Gallery = () => {
  const [filter, setFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const filteredItems = filter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === filter);

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-accent/20">
            <Image className="w-8 h-8 text-accent" />
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Photo Gallery
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Explore moments from our campus life, events, and activities.
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          {/* Filters */}
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full font-medium text-sm transition-all ${
                  filter === cat
                    ? 'bg-secondary text-secondary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group relative aspect-[4/3] bg-muted rounded-2xl overflow-hidden cursor-pointer"
                onClick={() => setSelectedImage(item.id)}
              >
                {/* Placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-primary/20 flex items-center justify-center">
                  <Image className="w-16 h-16 text-muted-foreground/30" />
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <div>
                    <span className="text-white/70 text-sm capitalize">{item.category}</span>
                    <h3 className="text-white font-heading font-semibold">{item.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-16">
              <Image className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">No images found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 text-white hover:text-accent transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <div className="max-w-4xl w-full aspect-video bg-muted rounded-lg flex items-center justify-center">
            <Image className="w-24 h-24 text-muted-foreground/30" />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Gallery;
