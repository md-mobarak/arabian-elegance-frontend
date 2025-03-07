// import Link from "next/link";
// import React, { useEffect, useState } from "react";
// import { FaUser } from "react-icons/fa";
// import { FaHeart } from "react-icons/fa";
// import { FaShoppingCart } from "react-icons/fa";

// function Navbar() {
//   const [isFixed, setIsFixed] = useState(false);

//   // Scroll event to detect when to fix the navbar
//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 50) {
//         setIsFixed(true);
//       } else {
//         setIsFixed(false);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <nav>
//       {/* Top Navbar */}
//       <div className="container lg:p-3 my-3 mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
//         {/* Logo */}
//         <div className="flex items-center space-x-6">
//           <div className="text-3xl font-bold text-gray-800">
//           <Link href="/" > <span className="text-orange-500">Arabian</span>Elegance </Link> 
//           </div>
//         </div>

//         {/* Search Bar */}
//         <div className="flex-grow mx-6">
//           <div className="relative">
//             <select className="absolute left-0 top-0 h-full border font-semibold border-gray-300 bg-white rounded-l-md px-2">
//               <option>All Categories</option>
//             </select>
//             <input
//               type="text"
//               placeholder="Enter Search Products"
//               className="w-full pl-32 text-xl pr-4 py-2 border text-center font-semibold border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
//             />
//           </div>
//         </div>

//         {/* Support Info */}
//         <div className="flex flex-col items-center md:flex-row space-y-2 md:space-y-0 md:space-x-4">
//           <div className="text-sm text-gray-500">Support 24/7</div>
//           <div className="text-lg font-bold text-gray-800">894 4567 123 94+</div>
//           <div>
//             <FaUser className="text-orange-500 text-2xl" />
//           </div>
//         </div>
//       </div>

//       {/* Main Navbar */}
//       <div
//         className={`${
//           isFixed ? "fixed top-0 left-0 w-full shadow-lg" : "relative"
//         } py-4 px-4 z-50 mx-auto flex flex-col md:flex-row justify-between items-center bg-[#f1d255]`}
//       >
//         {/* Left Section - Logo and Products */}
//         <div className="flex items-center space-x-6">
//           <div className="text-3xl font-bold text-gray-800"></div>
//           <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-100 font-semibold">
//             <span className="mr-2">&#9776;</span> Products Category
//           </button>
//         </div>

//         {/* Center Section - Links */}
//         <div className="hidden md:flex space-x-6">
//           <Link href="/" className="font-semibold hover:text-orange-500">
//             Home &#9662;
//           </Link>
//           <Link href="/shop" className="font-semibold hover:text-orange-500">
//             Shop &#9662;
//           </Link>
//           <Link href="/blog" className="font-semibold hover:text-orange-500">
//             Blogs &#9662;
//           </Link>
//           <Link href="#" className="font-semibold hover:text-orange-500">
//             About us &#9662;
//           </Link>
//           <Link href="#" className="font-semibold hover:text-orange-500">
//             Contact
//           </Link>
//         </div>

//         {/* Right Section - Icons */}
//         <div className="flex items-center space-x-4 mt-4 md:mt-0">
//           <div className="text-red-600 font-semibold">🔥 Deal</div>
//           <div className="relative">
//             <FaHeart className="text-3xl" />
//             <span className="absolute top-0 right-0 bg-yellow-500 text-xs px-1 rounded-full">
//               12
//             </span>
//           </div>
//           <div className="relative">
//             <FaShoppingCart className="text-3xl" />
//             <span className="absolute top-0 right-0 bg-yellow-500 text-xs px-1 rounded-full">
//               01
//             </span>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;


   
// 2nd 


// import React, { useEffect, useState } from "react";
// import { FaBars, FaUser, FaHeart, FaShoppingCart } from "react-icons/fa";
// import { gsap } from "gsap";

// function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isFixed, setIsFixed] = useState(false);

//   // Scroll event to detect when to fix the navbar
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsFixed(window.scrollY > 50);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // GSAP animation for menu
//   useEffect(() => {
//     if (isMenuOpen) {
//       gsap.to(".menu", { x: 0, duration: 0.5, ease: "power3.out" });
//     } else {
//       gsap.to(".menu", { x: "-100%", duration: 0.5, ease: "power3.in" });
//     }
//   }, [isMenuOpen]);

//   return (
//     <nav
//       className={`${
//         isFixed ? "fixed top-0 left-0 w-full shadow-lg z-50" : "relative"
//       } bg-[#f1d255]`}
//     >
//       {/* Top Section */}
//       <div className="bg-gray-100">
//         <div className="container mx-auto flex items-center justify-between px-6 py-2">
//           {/* Support Info */}
//           <div className="flex items-center space-x-2">
//             <div className="text-sm text-gray-500">Support 24/7</div>
//             <div className="text-lg font-bold text-gray-800">
//               894 4567 123 94+
//             </div>
//           </div>

//           {/* Right Section - Icons */}
//           <div className="flex items-center space-x-4">
//             <FaUser className="text-2xl text-orange-500" />
//             <div className="relative">
//               <FaHeart className="text-2xl text-gray-700" />
//               <span className="absolute top-0 right-0 bg-yellow-500 text-xs px-1 rounded-full">
//                 12
//               </span>
//             </div>
//             <div className="relative">
//               <FaShoppingCart className="text-2xl text-gray-700" />
//               <span className="absolute top-0 right-0 bg-yellow-500 text-xs px-1 rounded-full">
//                 01
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Navbar */}
//       <div className="container mx-auto flex items-center justify-between px-6 py-3">
//         {/* Project Name */}
//         <div className="text-2xl font-bold text-gray-800">
//           <span className="text-orange-500">Arabian</span>Elegance
//         </div>

//         {/* Search Bar */}
//         <div className="hidden md:flex flex-grow mx-6">
//           <div className="relative w-full">
//             <select className="absolute left-0 top-0 h-full border font-semibold border-gray-300 bg-white rounded-l-md px-2">
//               <option>All Categories</option>
//             </select>
//             <input
//               type="text"
//               placeholder="Enter Search Products"
//               className="w-full pl-32 pr-4 py-2 border font-semibold border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
//             />
//           </div>
//         </div>

//         {/* Hamburger Menu */}
//         <button
//           className="text-3xl text-gray-800 md:hidden"
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//         >
//           <FaBars />
//         </button>

//         {/* Full Menu for Desktop */}
//         <div className="hidden md:flex space-x-6">
//           <a href="#" className="font-semibold hover:text-orange-500">
//             Home
//           </a>
//           <a href="#" className="font-semibold hover:text-orange-500">
//             Shop
//           </a>
//           <a href="#" className="font-semibold hover:text-orange-500">
//             Blog
//           </a>
//           <a href="#" className="font-semibold hover:text-orange-500">
//             Pages
//           </a>
//           <a href="#" className="font-semibold hover:text-orange-500">
//             Contact
//           </a>
//         </div>
//       </div>

//       {/* Slide-in Menu for Mobile */}
//       <div
//         className="menu fixed top-0 left-0 w-3/4 h-full bg-white shadow-lg md:hidden transform -translate-x-full"
//       >
//         <ul className="flex flex-col items-start p-6 space-y-4">
//           <li>
//             <a href="#" className="font-semibold hover:text-orange-500">
//               Home
//             </a>
//           </li>
//           <li>
//             <a href="#" className="font-semibold hover:text-orange-500">
//               Shop
//             </a>
//           </li>
//           <li>
//             <a href="#" className="font-semibold hover:text-orange-500">
//               Blog
//             </a>
//           </li>
//           <li>
//             <a href="#" className="font-semibold hover:text-orange-500">
//               Pages
//             </a>
//           </li>
//           <li>
//             <a href="#" className="font-semibold hover:text-orange-500">
//               Contact
//             </a>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;


// "use client";
// import { useState, useEffect } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { FaBars, FaTimes, FaUser, FaShoppingCart } from "react-icons/fa";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [lastScrollY, setLastScrollY] = useState(0);
//   const [visible, setVisible] = useState(true);

//   // Scroll Hide & Show Logic
//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > lastScrollY) {
//         setVisible(false); // Scroll Down → Hide Navbar
//       } else {
//         setVisible(true); // Scroll Up → Show Navbar
//       }
//       setLastScrollY(window.scrollY);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [lastScrollY]);

//   return (
//     <div className="">
//       <nav
//         className={`backdrop-blur-md p-4 bg-base-100 z-50 fixed w-full shadow-md transition-transform duration-300 ${
//           visible ? "translate-y-0" : "-translate-y-full"
//         }`}
//       >
//         {/* Large Screen Navbar */}
//         <div className="container mx-auto px-4 py-3 flex items-center justify-between">
//           <Link href="/" className="text-2xl font-bold">
//             <Image
//               src="/logo.jpg" // Change this to your actual logo path
//               alt="Logo"
//               width={50} // Adjust width as needed
//               height={40} // Adjust height as needed
//               priority
//               className="rounded-lg"
//             />
//           </Link>

//           {/* Desktop Menu */}
//           <ul className="hidden md:flex space-x-6 font-medium">
//             {["Home", "Winter Collections", "T-Shirts", "Caps", "Panjabi", "Pants", "Sunnah Essential", "Scarf", "Accessories"].map((item) => (
//               <li key={item}>
//                 <Link href={`/${item.toLowerCase().replace(/ /g, "-")}`} className="hover:text-gray-600 transition">
//                   {item}
//                 </Link>
//               </li>
//             ))}
//           </ul>

//           {/* Icons */}
//           <div className="hidden md:flex items-center space-x-4">
//             <Link href="/login" className="text-gray-700">
//               <FaUser size={20} />
//             </Link>
//             <Link href="/cart" className="text-gray-700">
//               <FaShoppingCart size={20} />
//             </Link>
//           </div>

//           {/* Mobile Hamburger Menu */}
//           <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-700">
//             {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
//           </button>
//         </div>

//         {/* Mobile Menu Drawer */}
//         <div className={`fixed z-50 top-0 left-0 h-full w-64 shadow-lg transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform md:hidden`}>
//           <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-gray-700">
//             <FaTimes size={24} />
//           </button>
//           <ul className="mt-16 z-50 bg-white space-y-4 px-6 font-medium">
//             {["Home", "Winter Collections", "T-Shirts", "Caps", "Panjabi", "Pants", "Sunnah Essential", "Scarf", "Accessories"].map((item) => (
//               <li key={item}>
//                 <Link href={`/${item.toLowerCase().replace(/ /g, "-")}`} className="block py-2 text-gray-700 hover:bg-gray-100 rounded" onClick={() => setIsOpen(false)}>
//                   {item}
//                 </Link>
//               </li>
//             ))}
//             <hr />
//             <li>
//               <Link href="/login" className="block py-2 text-gray-700 hover:bg-gray-100 rounded">
//                 Login / Register
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default Navbar;


"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaBars, FaTimes, FaUser, FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [visible, setVisible] = useState(true);

  // Scroll Hide & Show Logic
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setVisible(false); // Scroll Down → Hide Navbar
      } else {
        setVisible(true); // Scroll Up → Show Navbar
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div className="">
      <nav
        className={`backdrop-blur-md lg:p-4 p-2 bg-base-100 z-50 fixed w-full shadow-md transition-transform duration-300 ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* Large Screen Navbar */}
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            <Image
              src="/logo.jpg" // Change this to your actual logo path
              alt="Logo"
              width={50} // Adjust width as needed
              height={40} // Adjust height as needed
              priority
              className="rounded-lg"
            />
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6 font-medium">
            {["Home", "Winter Collections", "T-Shirts", "Caps", "Panjabi", "Pants", "Sunnah Essential", "Scarf", "Accessories"].map((item) => (
              <li key={item}>
                <Link href={`/${item.toLowerCase().replace(/ /g, "-")}`} className="hover:text-gray-600 transition">
                  {item}
                </Link>
              </li>
            ))}
          </ul>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login" className="text-gray-700">
              <FaUser size={20} />
            </Link>
            <Link href="/cart" className="text-gray-700">
              <FaShoppingCart size={20} />
            </Link>
          </div>

          {/* Mobile Hamburger Menu */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-700">
            {/* {isOpen ? <FaTimes size={24} /> : */}
             <FaBars size={24} />
             {/* } */}
          </button>
        </div>

        {/* Mobile Menu Drawer */}
        <div className={`fixed z-50 top-0 left-0 h-full w-64 shadow-lg transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform md:hidden`}>
          <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-gray-700">
            <FaTimes size={24} />
          </button>
          <ul className="mt-16 z-50 bg-white space-y-4 px-6 font-medium">
            {["Home", "Winter Collections", "T-Shirts", "Caps", "Panjabi", "Pants", "Sunnah Essential", "Scarf", "Accessories"].map((item) => (
              <li key={item}>
                <Link href={`/${item.toLowerCase().replace(/ /g, "-")}`} className="block py-2 text-gray-700 hover:bg-gray-100 rounded" onClick={() => setIsOpen(false)}>
                  {item}
                </Link>
              </li>
            ))}
            <hr />
            <li>
              <Link href="/login" className="block py-2 text-gray-700 hover:bg-gray-100 rounded">
                Login / Register
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      {/* Add padding-top to the hero section or the next component */}
      <div className="lg:pt-24 pt-20"> {/* Adjust the padding-top value according to your navbar height */}
        {/* Your Hero Section or other components go here */}
      </div>
    </div>
  );
};

export default Navbar;