import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Phone, Mail, MapPin } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function FooterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline animation
      gsap.fromTo(headlineRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Buttons animation
      gsap.fromTo(buttonsRef.current?.children || [],
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: buttonsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Footer animation
      gsap.fromTo(footerRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#0B0D14] py-20 lg:py-[12vh] px-4 sm:px-6 lg:px-[6vw] z-20 relative"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* CTA Content */}
        <div className="text-center mb-16">
          <h2
            ref={headlineRef}
            className="text-3xl sm:text-4xl lg:text-[clamp(36px,4vw,56px)] font-bold leading-[1.05] text-white mb-8 max-w-[900px] mx-auto"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Let's get your gas system{' '}
            <span className="text-[#E8520A]">sorted today.</span>
          </h2>

          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="bg-[#E8520A] hover:bg-[#d14909] text-white rounded-xl px-8 py-4 text-base font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25"
            >
              Book Online
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 rounded-xl px-8 py-4 text-base font-semibold transition-all duration-300"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call 1800 GAS HELP
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div
          ref={footerRef}
          className="border-t border-white/10 pt-8"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <a
              href="#"
              className="text-xl font-bold tracking-tight"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              <span className="text-white">Igni</span>
              <span className="text-[#E8520A]">X</span>
            </a>

            {/* Contact Info */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-sm text-[#9CA3AF]">
              <a href="mailto:hello@ignix.local" className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
                hello@ignix.local
              </a>
              <a href="tel:18004274357" className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
                1800 GAS HELP
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Metro Area
              </span>
            </div>

            {/* Copyright */}
            <p className="text-xs text-[#6B7280]">
              © {new Date().getFullYear()} IgniX Gas Repairs. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
