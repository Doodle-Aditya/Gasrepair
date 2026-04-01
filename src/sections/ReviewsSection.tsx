import { useEffect, useRef } from 'react';
import { Star, Quote } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reviews = [
  {
    text: "Fixed our boiler the same evening. Polite, tidy, and explained the issue clearly. Would definitely use again!",
    name: "Amina R.",
    rating: 5,
  },
  {
    text: "Best gas service we've used. Booking was easy and the engineer was on time. Very professional team.",
    name: "Jonas T.",
    rating: 5,
  },
  {
    text: "Fair price, fast work, and a proper guarantee. Highly recommend to anyone needing gas repairs.",
    name: "Elena S.",
    rating: 5,
  },
];

const avatars = [
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Amina&backgroundColor=fff4ef',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Jonas&backgroundColor=fff4ef',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena&backgroundColor=fff4ef',
];

export function ReviewsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

      // Review cards animation
      const reviewCards = cardsRef.current?.querySelectorAll('.review-card');
      if (reviewCards) {
        gsap.fromTo(reviewCards,
          { y: 70, rotate: 1, opacity: 0 },
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

        // Stars animation
        reviewCards.forEach((card) => {
          const stars = card.querySelectorAll('.star-icon');
          gsap.fromTo(stars,
            { scale: 0.8, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.3,
              stagger: 0.05,
              ease: 'back.out(1.5)',
              scrollTrigger: {
                trigger: card,
                start: 'top 70%',
                toggleActions: 'play none none reverse',
              }
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="reviews"
      className="w-full bg-[#F7F8FC] py-20 lg:py-[10vh] px-4 sm:px-6 lg:px-[6vw] z-20 relative"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div ref={headerRef} className="mb-12 lg:mb-16">
          <div className="flex items-center gap-2 mb-3">
            <div className="px-3 py-1 bg-[#FFF4EF] rounded-full">
              <span className="text-xs font-semibold text-[#E8520A]">Reviews</span>
            </div>
          </div>
          <h2
            className="text-2xl sm:text-3xl lg:text-[clamp(28px,3.2vw,44px)] font-bold leading-[1.05] text-[#111827]"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            People love how we show up
          </h2>
        </div>

        {/* Review Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {reviews.map((review, index) => (
            <div
              key={index}
              className="review-card bg-white rounded-[22px] card-shadow p-6 sm:p-8 transition-all duration-500 hover:shadow-xl hover:shadow-black/10 hover:-translate-y-2 group"
            >
              {/* Quote icon */}
              <Quote className="w-8 h-8 text-[#E8520A] opacity-20 mb-4" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="star-icon w-5 h-5 text-[#E8520A] fill-[#E8520A]"
                  />
                ))}
              </div>

              {/* Review text */}
              <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed mb-6">
                "{review.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <img
                  src={avatars[index]}
                  alt={review.name}
                  className="w-10 h-10 rounded-full bg-[#FFF4EF]"
                />
                <span className="text-sm font-semibold text-[#111827]">
                  {review.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
