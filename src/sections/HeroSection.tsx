import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Phone, ArrowRight, Star, Clock, Award } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoCardRef = useRef<HTMLDivElement>(null);
  const contentCardRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial load animation timeline
      const loadTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Photo card entrance
      loadTl.fromTo(photoCardRef.current,
        { x: '-60vw', opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9 },
        0
      );

      // Content card entrance
      loadTl.fromTo(contentCardRef.current,
        { x: '60vw', opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9 },
        0.08
      );

      // Headline words stagger
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word');
        loadTl.fromTo(words,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.03, ease: 'power2.out' },
          0.4
        );
      }

      // Underline bar
      loadTl.fromTo(underlineRef.current,
        { scaleX: 0, transformOrigin: 'left' },
        { scaleX: 1, duration: 0.5, ease: 'power2.out' },
        0.8
      );

      // Body text
      loadTl.fromTo(bodyRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        0.7
      );

      // CTA buttons
      loadTl.fromTo(ctaRef.current?.children || [],
        { scale: 0.92, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.6)' },
        0.9
      );

      // Trust microcopy
      loadTl.fromTo(trustRef.current,
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4 },
        1.1
      );

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.set([photoCardRef.current, contentCardRef.current], { opacity: 1, x: 0, scale: 1 });
            gsap.set(headlineRef.current, { opacity: 1, y: 0 });
            gsap.set(bodyRef.current, { opacity: 1, y: 0 });
            gsap.set(ctaRef.current, { opacity: 1, y: 0 });
          }
        }
      });

      // EXIT phase (70% - 100%)
      scrollTl.fromTo(contentCardRef.current,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(photoCardRef.current,
        { x: 0, scale: 1, opacity: 1 },
        { x: '-10vw', scale: 1.04, opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(headlineRef.current,
        { y: 0, opacity: 1 },
        { y: '-10vh', opacity: 0, ease: 'power2.in' },
        0.75
      );

      scrollTl.fromTo(bodyRef.current,
        { y: 0, opacity: 1 },
        { y: '-8vh', opacity: 0, ease: 'power2.in' },
        0.78
      );

      scrollTl.fromTo(ctaRef.current,
        { y: 0, opacity: 1 },
        { y: '-6vh', opacity: 0, ease: 'power2.in' },
        0.8
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const headlineWords = ['Fast,', 'friendly', 'gas', 'repairs—', 'booked', 'in', 'seconds.'];

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-[#F7F8FC] overflow-hidden z-10"
    >
      <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 lg:px-[6vw]">
        <div className="relative w-full max-w-[1400px] h-[80vh] flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-0">
          {/* Photo Card */}
          <div
            ref={photoCardRef}
            className="w-full lg:w-[56vw] h-[40vh] lg:h-[80vh] rounded-[22px] overflow-hidden card-shadow relative lg:absolute lg:left-0 lg:top-0"
          >
            <img
              src="/images/hero-engineer.jpg"
              alt="Professional gas engineer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          {/* Content Card */}
          <div
            ref={contentCardRef}
            className="w-full lg:w-[40vw] h-auto lg:h-[80vh] bg-white rounded-[22px] card-shadow relative lg:absolute lg:right-0 lg:top-0 p-6 sm:p-8 lg:p-[7%] flex flex-col justify-center"
          >
            {/* Label */}
            <div className="flex items-center gap-2 mb-4 lg:mb-6">
              <div className="w-2 h-2 rounded-full bg-[#E8520A] animate-pulse-dot" />
              <span className="text-xs font-semibold tracking-[0.14em] uppercase text-[#E8520A]">
                Licensed & Insured
              </span>
            </div>

            {/* Headline */}
            <h1
              ref={headlineRef}
              className="text-3xl sm:text-4xl lg:text-[clamp(32px,3.5vw,52px)] font-bold leading-[0.95] tracking-[-0.02em] text-[#111827] mb-4 lg:mb-6"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              {headlineWords.map((word, i) => (
                <span key={i} className="word inline-block mr-[0.3em]">
                  {word === 'repairs—' ? (
                    <>
                      <span className="text-[#E8520A]">repairs</span>—
                    </>
                  ) : word}
                </span>
              ))}
              <div
                ref={underlineRef}
                className="hidden lg:block w-[6vw] h-[6px] bg-[#E8520A] rounded-full mt-3"
              />
            </h1>

            {/* Body */}
            <p
              ref={bodyRef}
              className="text-sm sm:text-base text-[#6B7280] leading-relaxed mb-6 lg:mb-8 max-w-[90%]"
            >
              From emergency leaks to boiler checks, our certified engineers keep your home safe and warm. Book online or call—same-day slots available.
            </p>

            {/* CTAs */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 lg:mb-8">
              <Button
                className="bg-[#E8520A] hover:bg-[#d14909] text-white rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25"
              >
                Book a Repair
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                variant="outline"
                className="border-[#D1D5DB] text-[#111827] hover:bg-[#F3F4F6] rounded-xl px-6 py-3 text-sm font-medium transition-all duration-300"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Us
              </Button>
            </div>

            {/* Trust Microcopy */}
            <div ref={trustRef} className="flex items-center gap-4 text-xs text-[#9CA3AF]">
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-[#E8520A] fill-[#E8520A]" />
                <span className="font-medium text-[#111827]">Rated 4.9</span>
              </div>
              <span className="text-[#D1D5DB]">|</span>
              <div className="flex items-center gap-1">
                <Award className="w-3 h-3 text-[#E8520A]" />
                <span>15+ years</span>
              </div>
              <span className="text-[#D1D5DB]">|</span>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#E8520A]" />
                <span>24/7 line</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
