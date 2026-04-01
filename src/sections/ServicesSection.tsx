import { useEffect, useRef } from 'react';
import { ArrowRight, Wrench, Flame, ClipboardCheck } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Wrench,
    title: 'Emergency Repairs',
    description: 'Fast response for leaks, smells, and loss of pressure.',
    link: 'Get help',
    image: '/images/service-emergency.jpg',
  },
  {
    icon: Flame,
    title: 'Installs & Upgrades',
    description: 'Safe fitting for hobs, ovens, boilers, and heaters.',
    link: 'Request a quote',
    image: '/images/service-install.jpg',
  },
  {
    icon: ClipboardCheck,
    title: 'Safety Checks',
    description: 'Landlord certificates and annual servicing made simple.',
    link: 'Book a check',
    image: '/images/service-safety.jpg',
  },
];

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(headerRef.current,
        { y: 40, opacity: 0 },
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

      // Cards animation with stagger
      const cards = cardsRef.current?.querySelectorAll('.service-card');
      if (cards) {
        gsap.fromTo(cards,
          { y: 80, rotate: -1.5, opacity: 0 },
          {
            y: 0,
            rotate: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            }
          }
        );

        // Image parallax inside cards
        cards.forEach((card) => {
          const img = card.querySelector('img');
          if (img) {
            gsap.fromTo(img,
              { scale: 1.08 },
              {
                scale: 1,
                ease: 'none',
                scrollTrigger: {
                  trigger: card,
                  start: 'top 80%',
                  end: 'bottom 20%',
                  scrub: 0.5,
                }
              }
            );
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="w-full bg-[#F7F8FC] py-20 lg:py-[10vh] px-4 sm:px-6 lg:px-[6vw] z-20 relative"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div ref={headerRef} className="mb-12 lg:mb-16 max-w-[720px]">
          <span className="text-xs font-semibold tracking-[0.14em] uppercase text-[#E8520A] mb-3 block">
            What We Do
          </span>
          <h2
            className="text-2xl sm:text-3xl lg:text-[clamp(28px,3.2vw,44px)] font-bold leading-[1.05] text-[#111827] mb-4"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Services that keep you safe
          </h2>
          <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed">
            We handle emergencies, installs, and annual checks—so you don't have to worry.
          </p>
        </div>

        {/* Service Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-[2.2vw]"
        >
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card group bg-white rounded-[22px] card-shadow overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-black/10 hover:-translate-y-2 cursor-pointer animate-float"
              style={{ animationDelay: `${index * 0.5}s`, animationDuration: '4s' }}
            >
              {/* Image */}
              <div className="relative h-[180px] sm:h-[200px] overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6">
                {/* Icon */}
                <div className="w-10 h-10 rounded-lg bg-[#FFF4EF] flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-[#E8520A] group-hover:scale-110">
                  <service.icon className="w-5 h-5 text-[#E8520A] transition-colors duration-300 group-hover:text-white" />
                </div>

                {/* Title */}
                <h3
                  className="text-lg font-semibold text-[#111827] mb-2"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[#9CA3AF] leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Link */}
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#E8520A] transition-all duration-300 group-hover:gap-3"
                >
                  {service.link}
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
