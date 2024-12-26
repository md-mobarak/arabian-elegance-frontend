import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';

export default function TrendingProducts() {
  const trendingRef = useRef(null);

  useEffect(() => {
    gsap.from(trendingRef.current.children, {
      scale: 0.8,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'elastic.out(1, 0.5)'
    });
  }, []);

  return (
    <section ref={trendingRef} className="py-16 bg-white">
      <h2 className="text-3xl font-semibold mb-8">Trending Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((item) => (
          <div key={item} className="bg-gray-200 p-8 rounded-md shadow-lg">
            Trending Product {item}
          </div>
        ))}
      </div>
    </section>
  );
}
