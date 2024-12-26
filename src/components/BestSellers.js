import { Swiper, SwiperSlide } from 'swiper/react';
import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';

export default function BestSellers() {
  const bestSellersRef = useRef(null);

  useEffect(() => {
    gsap.from(bestSellersRef.current.children, {
      x: -100,
      opacity: 0,
      duration: 1,
      stagger: 0.3,
      ease: 'power2.out'
    });
  }, []);

  return (
    <section ref={bestSellersRef} className="py-16 bg-white">
      <h2 className="text-3xl font-semibold mb-8">Best Sellers</h2>
      <Swiper slidesPerView={1} loop spaceBetween={16}>
        {[1, 2, 3].map((item) => (
          <SwiperSlide key={item} className="bg-gray-200 p-8 rounded-md shadow-lg">
            Best Seller {item}
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
