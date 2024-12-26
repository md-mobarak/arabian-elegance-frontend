import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';

export default function CustomerReviews() {
  const reviewsRef = useRef(null);

  useEffect(() => {
    gsap.from(reviewsRef.current.children, {
      rotateY: 90,
      opacity: 0,
      duration: 1,
      stagger: 0.3,
      ease: 'back.out(1.7)'
    });
  }, []);

  return (
    <section ref={reviewsRef} className="py-16 bg-gray-100">
      <h2 className="text-3xl font-semibold mb-8">Customer Reviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((item) => (
          <div key={item} className="bg-white p-8 rounded-md shadow-lg">
            Customer Review {item}
          </div>
        ))}
      </div>
    </section>
  );
}
