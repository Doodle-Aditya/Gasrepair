import { useEffect, useRef, useState } from 'react';
import { Star, Clock, Award, Quote } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: Star, value: 4.9, suffix: '/5', label: 'Average customer rating' },
  { icon: Award, value: 15, suffix: '+ yrs', label: 'Serving local homes' },
  { icon: Clock, value: 24, suffix: '/7', label: 'Emergency line open' },
];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [displayValue, setDisplayValue] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: 'top 70%',
      onEnter: () => {
        gsap.to({ val: 0 }, {
          val: value,
          duration: 1.2,
          ease: 'power1.out',
          onUpdate: function() {
            setDisplayValue(Number(this.targets()[0].val.toFixed(1)));
          }
        });
      },
      once: true,
    });

    return () => trigger.kill();
  }, [value]);

  return (
    <span ref={elementRef} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#E8520A]">
      {displayValue}{suffix}
    </span>
  );
}

export function TrustSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Quote animation
      gsap.fromTo(quoteRef.current,
        { x: '-8vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: quoteRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Stats cards animation
      const statCards = statsRef.current?.querySelectorAll('.stat-card');
      if (statCards) {
        gsap.fromTo(statCards,
          { x: '10vw', opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="trust"
      className="w-full bg-[#F7F8FC] py-20 lg:py-[10vh] px-4 sm:px-6 lg:px-[6vw] z-20 relative"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Quote Block */}
          <div ref={quoteRef} className="relative">
            <Quote className="w-12 h-12 text-[#E8520A] opacity-20 mb-4" />
            <blockquote
              className="text-xl sm:text-2xl lg:text-3xl font-medium text-[#111827] leading-[1.3] mb-6"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              "They arrived within the hour, explained everything, and fixed it cleanly—no stress."
            </blockquote>
            <cite className="text-sm text-[#6B7280] not-italic">
              — Priya D., homeowner
            </cite>
          </div>

          {/* Stats Cards */}
          <div ref={statsRef} className="flex flex-col gap-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="stat-card bg-white rounded-[22px] card-shadow p-5 sm:p-6 flex items-center gap-4 sm:gap-6 transition-all duration-300 hover:shadow-lg hover:shadow-black/10 hover:scale-[1.02]"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#FFF4EF] flex items-center justify-center flex-shrink-0">
                  <stat.icon className="w-6 h-6 sm:w-7 sm:h-7 text-[#E8520A]" />
                </div>
                <div>
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                  <p className="text-sm text-[#9CA3AF] mt-1">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
