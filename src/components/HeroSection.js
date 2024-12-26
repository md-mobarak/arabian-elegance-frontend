/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
// /* eslint-disable @next/next/no-img-element */

import React, { useEffect, useState } from "react";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";

import { gsap } from "gsap";

function HeroSection() {
  const images = [
    "https://html.pixelfit.agency/pesco/assets/images/hero/hero-one_img1.jpg",
    "https://html.pixelfit.agency/pesco/assets/images/hero/hero-two_img1.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const slides = document.querySelectorAll(".carousel-slide");

    // Initialize slide positions
    slides.forEach((slide, index) => {
      gsap.set(slide, { x: index === currentIndex ? 0 : "100%" });
    });

    // Slide transition function
    function slideTo(nextIndex) {
      if (isAnimating || !slides.length) return;
      setIsAnimating(true);

      const currentSlide = slides[currentIndex];
      const nextSlide = slides[nextIndex];

      // Animation timeline for smooth transitions
      gsap.timeline({
        onComplete: () => setIsAnimating(false),
      })
        .to(currentSlide, { x: "-100%", duration: 1, ease: "power3.out" })
        .fromTo(nextSlide, { x: "100%" }, { x: 0, duration: 1, ease: "power3.out" });

      setCurrentIndex(nextIndex);
    }

    const prevButton = document.querySelector(".prev-button");
    const nextButton = document.querySelector(".next-button");

    function handlePrevClick() {
      const prevIndex = (currentIndex - 1 + images.length) % images.length;
      slideTo(prevIndex);
    }

    function handleNextClick() {
      const nextIndex = (currentIndex + 1) % images.length;
      slideTo(nextIndex);
    }

    // Attach event listeners
    prevButton?.addEventListener("click", handlePrevClick);
    nextButton?.addEventListener("click", handleNextClick);

    // Auto loop function
    const intervalId = setInterval(() => {
      const nextIndex = (currentIndex + 1) % images.length;
      slideTo(nextIndex);
    }, 3000); // Auto loop every 3 seconds

    // Cleanup event listeners and interval on unmount
    return () => {
      clearInterval(intervalId);
      prevButton?.removeEventListener("click", handlePrevClick);
      nextButton?.removeEventListener("click", handleNextClick);
    };
  }, [currentIndex, images.length, isAnimating]);

  return (
    <section className="bg-gray-100 h-screen flex flex-col-reverse lg:flex-row items-center justify-between px-6 lg:px-10">
      {/* Left Section: Text */}
      <div className="hero-text max-w-lg space-y-6 text-center lg:text-left">
        <h1 className="text-4xl lg:text-6xl font-bold text-gray-800">
          Discover Your <span className="text-orange-500">Elegance</span>
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          Explore the finest collection of Arabian Burqas, Hijabs, T-shirts, and
          more with amazing deals. Shop now to redefine your style!
        </p>
        <div className="cta-buttons flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
          <button className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600">
            Shop Now
          </button>
          <button className="bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-900">
            Explore More
          </button>
        </div>
      </div>

      {/* Right Section: Image Carousel */}
      <div className="hero-carousel w-full lg:w-1/2 h-full mt-10 lg:mt-0 relative overflow-hidden">
        {/* Navigation Buttons */}
        <button className="prev-button absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-full z-10">
        <FaArrowAltCircleLeft />
        </button>
        <button className="next-button absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-full z-10">
        <FaArrowAltCircleRight />
        </button>

        {/* Carousel Images */}
        <div className="carousel-images relative w-full h-full">
          {images.map((image, index) => (
            <div
              key={index}
              className={`carousel-slide absolute top-0 left-0 w-full h-full flex justify-center items-center`}
            >
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="object-cover rounded-lg max-h-full max-w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HeroSection;

