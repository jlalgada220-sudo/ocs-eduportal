import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, GraduationCap } from 'lucide-react';
import { schoolInfo } from '@/lib/schoolData';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Classes', path: '/classes' },
  { name: 'Teachers', path: '/teachers' },
  { name: 'Admission', path: '/admission' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Notices', path: '/notices' },
  { name: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <a href={`tel:${schoolInfo.contact.phone}`} className="flex items-center gap-2 hover:text-accent transition-colors">
              <Phone className="w-4 h-4" />
              {schoolInfo.contact.phone}
            </a>
            <a href={`mailto:${schoolInfo.contact.email}`} className="flex items-center gap-2 hover:text-accent transition-colors">
              <Mail className="w-4 h-4" />
              {schoolInfo.contact.email}
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-primary-foreground/80">KG to Class 6</span>
            <Link to="/admin" className="text-accent hover:text-accent/80 transition-colors font-medium">
              Admin Login
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-primary shadow-lg" 
          : "bg-primary/95 backdrop-blur-sm"
      )}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-accent flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <GraduationCap className="w-6 h-6 md:w-7 md:h-7 text-accent-foreground" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-primary-foreground font-heading font-bold text-lg md:text-xl leading-tight">
                  O.C.S Group
                </h1>
                <p className="text-primary-foreground/70 text-xs">of Institute</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "nav-link px-4 py-2 rounded-lg font-medium text-sm transition-all",
                    isActive(link.path) 
                      ? "bg-secondary text-secondary-foreground" 
                      : "text-primary-foreground/90 hover:bg-primary-foreground/10"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={cn(
          "lg:hidden overflow-hidden transition-all duration-300",
          isOpen ? "max-h-screen" : "max-h-0"
        )}>
          <div className="container mx-auto px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block px-4 py-3 rounded-lg font-medium transition-all",
                  isActive(link.path)
                    ? "bg-secondary text-secondary-foreground"
                    : "text-primary-foreground/90 hover:bg-primary-foreground/10"
                )}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-primary-foreground/20">
              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 rounded-lg font-medium text-accent hover:bg-accent/10 transition-all"
              >
                Admin Login
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
