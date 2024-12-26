import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';

export default function NewArrivals() {
  const arrivalsRef = useRef(null);

  useEffect(() => {
    gsap.from(arrivalsRef.current.children, {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out'
    });
  }, []);

  return (
    <section ref={arrivalsRef} className="py-16 bg-white">
      <h2 className="text-3xl font-semibold mb-8">New Arrivals</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((item) => (
          <div key={item} className="bg-gray-200 p-8 rounded-md shadow-lg">
            New Arrival {item}
          </div>
        ))}
      </div>
    </section>
  );
}
