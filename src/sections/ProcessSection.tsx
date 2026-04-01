import { useEffect, useRef } from 'react';
import { Calendar, Search, Shield } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    icon: Calendar,
    title: 'Book online or call',
    description: 'Pick a slot and tell us what\'s wrong. We\'ll confirm within minutes.',
  },
  {
    number: '02',
    icon: Search,
    title: 'We diagnose & quote',
    description: 'Clear pricing before any work begins. No hidden fees, ever.',
  },
  {
    number: '03',
    icon: Shield,
    title: 'Repair & guarantee',
    description: 'Fixed right with a 12-month guarantee on all parts and labor.',
  },
];

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(headerRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Step cards animation
      const stepCards = stepsRef.current?.querySelectorAll('.step-card');
      if (stepCards) {
        gsap.fromTo(stepCards,
          { y: 60, scale: 0.96, opacity: 0 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: stepsRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            }
          }
        );

        // Step numbers animation
        const stepNumbers = stepsRef.current?.querySelectorAll('.step-number');
        if (stepNumbers) {
          gsap.fromTo(stepNumbers,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 0.08,
              duration: 0.6,
              stagger: 0.12,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: stepsRef.current,
                start: 'top 70%',
                toggleActions: 'play none none reverse',
              }
            }
          );
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#F7F8FC] py-20 lg:py-[10vh] px-4 sm:px-6 lg:px-[6vw] z-20 relative"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 lg:mb-16 max-w-[680px] mx-auto">
          <span className="text-xs font-semibold tracking-[0.14em] uppercase text-[#E8520A] mb-3 block">
            How It Works
          </span>
          <h2
            className="text-2xl sm:text-3xl lg:text-[clamp(28px,3.2vw,44px)] font-bold leading-[1.05] text-[#111827] mb-4"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Book in three simple steps
          </h2>
          <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed">
            Choose a time that works for you—we'll handle the rest.
          </p>
        </div>

        {/* Step Cards */}
        <div
          ref={stepsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {steps.map((step, index) => (
            <div
              key={index}
              className="step-card relative bg-white rounded-[22px] card-shadow p-6 sm:p-8 transition-all duration-500 hover:shadow-xl hover:shadow-black/10 hover:-translate-y-2 group"
            >
              {/* Large step number background */}
              <span
                className="step-number absolute top-4 right-4 text-7xl sm:text-8xl font-bold text-[#111827] opacity-[0.08] leading-none select-none"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                {step.number}
              </span>

              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-[#FFF4EF] flex items-center justify-center mb-5 transition-all duration-300 group-hover:bg-[#E8520A] group-hover:scale-110 relative z-10">
                <step.icon className="w-6 h-6 text-[#E8520A] transition-colors duration-300 group-hover:text-white" />
              </div>

              {/* Content */}
              <h3
                className="text-lg font-semibold text-[#111827] mb-2 relative z-10"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                {step.title}
              </h3>
              <p className="text-sm text-[#9CA3AF] leading-relaxed relative z-10">
                {step.description}
              </p>

              {/* Step indicator line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-[2px] bg-[#E5E7EB]">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#E8520A]" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
