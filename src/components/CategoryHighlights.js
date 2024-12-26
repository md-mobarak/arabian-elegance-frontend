import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';

export default function CategoryHighlights() {
  const categoriesRef = useRef(null);

  useEffect(() => {
    const cards = categoriesRef.current.children;
    gsap.from(cards, {
      opacity: 0,
      scale: 0.8,
      stagger: 0.2,
      duration: 1,
      ease: 'power3.out',
    });
    
    Array.from(cards).forEach(card => {
      gsap.to(card, {
        scale: 1.05,
        duration: 0.3,
        paused: true,
        ease: 'power1.inOut',
      }).reversed(true);

      card.addEventListener('mouseenter', () => gsap.to(card, { scale: 1.05 }).play());
      card.addEventListener('mouseleave', () => gsap.to(card, { scale: 1 }).reverse());
    });
  }, []);

  return (
    <section ref={categoriesRef} className="py-16 bg-white">
      <h2 className="text-3xl font-semibold mb-8">Category Highlights</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((item) => (
          <div key={item} className="bg-gray-200 p-8 rounded-md shadow-lg transition-transform duration-200">
            Category {item}
          </div>
        ))}
      </div>
    </section>
  );
}
