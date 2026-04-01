import { useEffect, useState, useRef } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.3 }
      );
    }
  }, []);

  useEffect(() => {
    if (mobileMenuRef.current) {
      if (isMobileMenuOpen) {
        gsap.fromTo(mobileMenuRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
        );
      }
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#trust' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full px-6 lg:px-[6vw]">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo */}
            <a
              href="#"
              className="text-xl font-bold tracking-tight"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              <span className="text-[#111827]">Igni</span>
              <span className="text-[#E8520A]">X</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className="text-sm text-[#6B7280] hover:text-[#111827] transition-colors duration-300 font-medium"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-4">
              <Button
                onClick={() => scrollToSection('#contact')}
                className="bg-[#E8520A] hover:bg-[#d14909] text-white rounded-lg px-5 py-2 text-sm font-semibold transition-all duration-300 hover:scale-105"
              >
                <Phone className="w-4 h-4 mr-2" />
                Book Now
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-[#111827]"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-0 z-40 bg-white md:hidden pt-[72px]"
        >
          <div className="flex flex-col items-center justify-center h-full gap-8 pb-20">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.href)}
                className="text-2xl font-semibold text-[#111827] hover:text-[#E8520A] transition-colors"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                {link.label}
              </button>
            ))}
            <Button
              onClick={() => scrollToSection('#contact')}
              className="bg-[#E8520A] hover:bg-[#d14909] text-white rounded-lg px-8 py-3 text-lg font-semibold mt-4"
            >
              <Phone className="w-5 h-5 mr-2" />
              Book a Repair
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
