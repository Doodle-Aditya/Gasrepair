import { useEffect, useRef, useState } from 'react';
import { MapPin, Phone, Clock, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function BookingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const mapCardRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<HTMLDivElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Map card animation
      gsap.fromTo(mapCardRef.current,
        { x: '-12vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Form card animation
      gsap.fromTo(formCardRef.current,
        { x: '12vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Map markers pop animation
      const markers = markersRef.current?.querySelectorAll('.map-marker');
      if (markers) {
        gsap.fromTo(markers,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            stagger: 0.08,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: mapCardRef.current,
              start: 'top 60%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const coverageAreas = [
    { name: 'Downtown', top: '30%', left: '45%' },
    { name: 'Northside', top: '20%', left: '55%' },
    { name: 'West End', top: '45%', left: '25%' },
    { name: 'Eastside', top: '50%', left: '70%' },
    { name: 'South Bay', top: '70%', left: '50%' },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="w-full bg-[#F7F8FC] py-20 lg:py-[10vh] px-4 sm:px-6 lg:px-[6vw] z-20 relative"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16 max-w-[680px] mx-auto">
          <span className="text-xs font-semibold tracking-[0.14em] uppercase text-[#E8520A] mb-3 block">
            Coverage
          </span>
          <h2
            className="text-2xl sm:text-3xl lg:text-[clamp(28px,3.2vw,44px)] font-bold leading-[1.05] text-[#111827] mb-4"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            We're local—and ready to travel
          </h2>
          <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed">
            Based in the city with same-day coverage across the metro area.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Map Card */}
          <div
            ref={mapCardRef}
            className="relative bg-white rounded-[22px] card-shadow overflow-hidden min-h-[400px] lg:min-h-[500px]"
          >
            {/* Stylized Map Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#F7F8FC] to-[#E5E7EB]">
              {/* Grid lines */}
              <div className="absolute inset-0 opacity-30">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={`h-${i}`}
                    className="absolute w-full h-[1px] bg-[#9CA3AF]"
                    style={{ top: `${(i + 1) * 12}%` }}
                  />
                ))}
                {[...Array(8)].map((_, i) => (
                  <div
                    key={`v-${i}`}
                    className="absolute h-full w-[1px] bg-[#9CA3AF]"
                    style={{ left: `${(i + 1) * 12}%` }}
                  />
                ))}
              </div>

              {/* Roads */}
              <svg className="absolute inset-0 w-full h-full opacity-40">
                <path
                  d="M0,40% Q30%,35% 50%,50% T100%,45%"
                  fill="none"
                  stroke="#9CA3AF"
                  strokeWidth="3"
                />
                <path
                  d="M20%,0 Q25%,30% 45%,50% T30%,100%"
                  fill="none"
                  stroke="#9CA3AF"
                  strokeWidth="2"
                />
                <path
                  d="M70%,0 Q65%,40% 75%,60% T60%,100%"
                  fill="none"
                  stroke="#9CA3AF"
                  strokeWidth="2"
                />
                <path
                  d="M0,70% Q40%,65% 60%,75% T100%,70%"
                  fill="none"
                  stroke="#9CA3AF"
                  strokeWidth="2"
                />
              </svg>
            </div>

            {/* Map Markers */}
            <div ref={markersRef} className="absolute inset-0">
              {coverageAreas.map((area, index) => (
                <div
                  key={index}
                  className="map-marker absolute group cursor-pointer"
                  style={{ top: area.top, left: area.left }}
                >
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-[#E8520A] flex items-center justify-center shadow-lg shadow-orange-500/30 transition-transform duration-300 group-hover:scale-125">
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#E8520A] rotate-45" />
                    {/* Tooltip */}
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#111827] text-white text-xs font-medium px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                      {area.name}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Overlay Info */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 card-shadow">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#FFF4EF] flex items-center justify-center">
                  <Clock className="w-5 h-5 text-[#E8520A]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#111827]">Same-day service</p>
                  <p className="text-xs text-[#9CA3AF]">Typical response: 10–20 mins</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div
            ref={formCardRef}
            className="bg-white rounded-[22px] card-shadow p-6 sm:p-8"
          >
            <h3
              className="text-xl font-semibold text-[#111827] mb-6"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Request a callback
            </h3>

            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-lg font-semibold text-[#111827] mb-2">Request sent!</h4>
                <p className="text-sm text-[#6B7280]">We'll call you within 20 minutes.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium text-[#111827]">
                      Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      className="rounded-xl border-[#E5E7EB] focus:border-[#E8520A] focus:ring-[#E8520A]/20"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium text-[#111827]">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Your phone"
                      className="rounded-xl border-[#E5E7EB] focus:border-[#E8520A] focus:ring-[#E8520A]/20"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="postcode" className="text-sm font-medium text-[#111827]">
                    Postcode
                  </Label>
                  <Input
                    id="postcode"
                    placeholder="Your postcode"
                    className="rounded-xl border-[#E5E7EB] focus:border-[#E8520A] focus:ring-[#E8520A]/20"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="issue" className="text-sm font-medium text-[#111827]">
                    Issue Type
                  </Label>
                  <Select required>
                    <SelectTrigger className="rounded-xl border-[#E5E7EB] focus:border-[#E8520A] focus:ring-[#E8520A]/20">
                      <SelectValue placeholder="Select issue type" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="leak">Gas Leak</SelectItem>
                      <SelectItem value="boiler">Boiler Issue</SelectItem>
                      <SelectItem value="hob">Hob/Oven Problem</SelectItem>
                      <SelectItem value="install">New Installation</SelectItem>
                      <SelectItem value="check">Safety Check</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date" className="text-sm font-medium text-[#111827]">
                    Preferred Date
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    className="rounded-xl border-[#E5E7EB] focus:border-[#E8520A] focus:ring-[#E8520A]/20"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#E8520A] hover:bg-[#d14909] text-white rounded-xl py-3 text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/25"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Request a callback
                </Button>

                <p className="text-xs text-[#9CA3AF] text-center flex items-center justify-center gap-1">
                  <Phone className="w-3 h-3" />
                  Or call us directly at <a href="tel:18004274357" className="text-[#E8520A] font-medium hover:underline">1800 GAS HELP</a>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
