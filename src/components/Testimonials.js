/* eslint-disable @next/next/no-img-element */
// /* eslint-disable @next/next/no-img-element */
// import React from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import { FaQuoteRight } from 'react-icons/fa';
// import { AiFillStar } from 'react-icons/ai';
// import { gsap } from 'gsap';

// const testimonials = [
//   {
//     id: 1,
//     image: 'https://via.placeholder.com/100', // Replace with actual image URL
//     name: 'Rhodes Jhon',
//     rating: 5,
//     text: 'This inflatable dragon costume seemed perfect for Halloween! But upon inflating, it became clear the wings were uneven, causing me to spin uncontrollably like a rogue pool float.',
//   },
//   {
//     id: 2,
//     image: 'https://via.placeholder.com/100', // Replace with actual image URL
//     name: 'Jane Doe',
//     rating: 5,
//     text: 'The costume was amazing and super fun to wear. It made my Halloween unforgettable, despite a few minor issues!',
//   },
//   {
//     id: 2,
//     image: 'https://via.placeholder.com/100', // Replace with actual image URL
//     name: 'Jane Doe',
//     rating: 5,
//     text: 'The costume was amazing and super fun to wear. It made my Halloween unforgettable, despite a few minor issues!',
//   },
//   {
//     id: 2,
//     image: 'https://via.placeholder.com/100', // Replace with actual image URL
//     name: 'Jane Doe',
//     rating: 5,
//     text: 'The costume was amazing and super fun to wear. It made my Halloween unforgettable, despite a few minor issues!',
//   },
//   {
//     id: 2,
//     image: 'https://via.placeholder.com/100', // Replace with actual image URL
//     name: 'Jane Doe',
//     rating: 5,
//     text: 'The costume was amazing and super fun to wear. It made my Halloween unforgettable, despite a few minor issues!',
//   },
//   {
//     id: 2,
//     image: 'https://via.placeholder.com/100', // Replace with actual image URL
//     name: 'Jane Doe',
//     rating: 5,
//     text: 'The costume was amazing and super fun to wear. It made my Halloween unforgettable, despite a few minor issues!',
//   },
// ];

// function Testimonials() {
//   React.useEffect(() => {
//     gsap.fromTo(
//       '.swiper-slide',
//       { opacity: 0, y: 50 },
//       { opacity: 1, y: 0, duration: 1, stagger: 0.2 }
//     );
//   }, []);

//   return (
//     <div className="my-16 px-6">
//       {/* Heading */}
//       <div className="text-center mb-8">
//         <h2 className="text-2xl font-bold text-gray-700">What Our Clients Say About Us</h2>
//       </div>

//       {/* Swiper Carousel */}
//       <Swiper
//         spaceBetween={20}
//         slidesPerView={1}
//         breakpoints={{
//           640: { slidesPerView: 1 },
//           768: { slidesPerView: 2 },
//         }}
//         loop
//         autoplay={{ delay: 5000 }}
//         navigation
//         className="swiper-container"
//       >
//         {testimonials.map((testimonial) => (
//           <SwiperSlide key={testimonial.id}>
//             <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-lg flex flex-col items-start">
//               {/* Testimonial Text */}
//               <p className="text-gray-500 text-sm mb-4">{testimonial.text}</p>

//               {/* Quote Icon */}
//               <FaQuoteRight className="text-orange-400 text-2xl mb-4" />

//               {/* Client Info */}
//               <div className="flex items-center">
//                 <img
//                   src={testimonial.image}
//                   alt={testimonial.name}
//                   className="w-12 h-12 rounded-full mr-4"
//                 />
//                 <div>
//                   <h3 className="font-bold text-gray-700">{testimonial.name}</h3>
//                   <div className="flex items-center">
//                     {[...Array(testimonial.rating)].map((_, index) => (
//                       <AiFillStar key={index} className="text-red-500 text-lg" />
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// }

// export default Testimonials;


// import React from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation } from 'swiper';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import { FaQuoteRight } from 'react-icons/fa';
// import { AiFillStar } from 'react-icons/ai';
// import { gsap } from 'gsap';

// const testimonials = [
//   {
//     id: 1,
//     image: 'https://via.placeholder.com/80', // Replace with actual image URL
//     name: 'Rhodes Jhon',
//     rating: 5,
//     text: 'This inflatable dragon costume seemed perfect for Halloween! But upon inflating, it became clear the wings were uneven, causing me to spin uncontrollably like a rogue pool float.',
//   },
//   {
//     id: 2,
//     image: 'https://via.placeholder.com/80', // Replace with actual image URL
//     name: 'Jane Doe',
//     rating: 5,
//     text: 'The costume was amazing and super fun to wear. It made my Halloween unforgettable, despite a few minor issues!',
//   },
//   {
//     id: 2,
//     image: 'https://via.placeholder.com/80', // Replace with actual image URL
//     name: 'Jane Doe',
//     rating: 5,
//     text: 'The costume was amazing and super fun to wear. It made my Halloween unforgettable, despite a few minor issues!',
//   },
//   {
//     id: 2,
//     image: 'https://via.placeholder.com/80', // Replace with actual image URL
//     name: 'Jane Doe',
//     rating: 5,
//     text: 'The costume was amazing and super fun to wear. It made my Halloween unforgettable, despite a few minor issues!',
//   },
// ];

// function Testimonials() {
//   React.useEffect(() => {
//     gsap.fromTo(
//       '.swiper-slide',
//       { opacity: 0, y: 30 },
//       { opacity: 1, y: 0, duration: 1, stagger: 0.2 }
//     );
//   }, []);

//   return (
//     <div className="my-16 px-6 max-w-6xl mx-auto">
//       {/* Heading */}
//       <div className="text-center mb-10">
//         <h3 className="text-xl font-serif font-semibold text-gray-600">What Our Clients Say About Us</h3>
//       </div>

//       {/* Swiper Carousel */}
//       <Swiper
//         spaceBetween={40}
//         slidesPerView={1}
//         navigation
//         loop
//         breakpoints={{
//           768: { slidesPerView: 2 },
//         }}
//         modules={[Navigation]}
//         className="swiper-container"
//       >
//         {testimonials.map((testimonial) => (
//           <SwiperSlide key={testimonial.id}>
//             <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6 flex flex-col justify-between">
//               {/* Quote */}
//               <div className="flex items-center mb-4">
//                 <FaQuoteRight className="text-orange-400 text-2xl mr-2" />
//                 <p className="text-gray-600 text-sm">{testimonial.text}</p>
//               </div>

//               {/* Client Info */}
//               <div className="flex items-center mt-4">
//                 <img
//                   src={testimonial.image}
//                   alt={testimonial.name}
//                   className="w-12 h-12 rounded-full mr-4"
//                 />
//                 <div>
//                   <h3 className="text-gray-800 font-medium">{testimonial.name}</h3>
//                   <div className="flex items-center">
//                     {[...Array(testimonial.rating)].map((_, index) => (
//                       <AiFillStar key={index} className="text-yellow-500 text-lg" />
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       {/* Navigation Buttons */}
//       <div className="flex justify-center items-center mt-8">
//         <button
//           className="swiper-button-prev w-10 h-10 rounded-full border border-gray-400 flex justify-center items-center text-gray-600 hover:bg-gray-100"
//         >
//           &lt;
//         </button>
//         <button
//           className="swiper-button-next w-10 h-10 rounded-full border border-gray-400 flex justify-center items-center text-gray-600 hover:bg-gray-100 ml-4"
//         >
//           &gt;
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Testimonials;
