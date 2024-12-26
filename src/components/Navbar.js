import React, { useEffect, useState } from 'react'
import { FaUser } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
function Navbar() {

    const [isFixed, setIsFixed] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Scroll event to detect when to fix the navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  return (

<nav
className={`
    
`}    
    >

<div className="container p-3 my-3 mx-auto flex justify-between items-center">
      {/* Logo and Product Category */}
      <div className="flex items-center space-x-6">
        <div className="text-3xl font-bold text-gray-800">
          <span className="text-orange-500">Arabian</span>Elegance
        </div>

      </div>

      {/* Search Bar */}
      <div className="flex-grow mx-6">
        <div className="relative">
          <select className="absolute left-0 top-0 h-full border font-semibold border-gray-300 bg-white rounded-l-md px-2">
            <option>All Categories</option>
          </select>
          <input
            type="text"
            placeholder=" Enter Search Products"
            className="w-full pl-32 text-xl  pr-4 py-2 border text-center font-semibold border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>
      </div>

      {/* Support Info */}
      <div className="flex items-center space-x-2">
        <div className="text-sm text-gray-500">Support 24/7</div>
        <div className="text-lg font-bold text-gray-800">894 4567 123 94+</div>
        <div>
          <span className="text-gray-600">
           
             <FaUser className="text-orange-500 text-2xl" ></FaUser>
          </span>
        </div>
      </div>
    </div>


      <div       
      className={`${
        isFixed ? "fixed top-0 left-0 w-full  shadow-lg" : "relative"
      } py-4 px-4 z-50  mx-auto flex justify-between items-center bg-[#f1d255]`}
      
      >
        {/* Left Section - Logo and Products */}
        <div className="flex items-center space-x-6">
          <div className="text-3xl font-bold text-gray-800">
            {/* <span className="text-orange-500">pes</span>co */}
          </div>

          <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-100 font-semibold">
            <span className="mr-2">&#9776;</span> Products Category
          </button>
        </div>

        {/* Center Section - Links */}
        <div className="hidden md:flex space-x-6">
          <a href="#" className=" font-semibold hover:text-orange-500">
            Home &#9662;
          </a>
          <a href="#" className=" font-semibold hover:text-orange-500">
            Shop &#9662;
          </a>
          <a href="#" className=" font-semibold hover:text-orange-500">
            Blog &#9662;
          </a>
          <a href="#" className=" font-semibold hover:text-orange-500">
            Pages &#9662;
          </a>
          <a href="#" className=" font-semibold hover:text-orange-500">
            Contact
          </a>
        </div>

        {/* Right Section - Icons */}
        <div className="flex items-center space-x-4">
          <div className="text-red-600 font-semibold">🔥 Deal</div>
          <div className="relative">
            {/* <span className="text-xl">&#9733;</span> */}
          </div>
          <div className="relative">
            {/* <span className="text-xl">&#9829;</span> */}
            <FaHeart className="text-3xl"></FaHeart>

            <span className="absolute top-0 right-0 bg-yellow-500 text-xs px-1 rounded-full">
              12
            </span>
          </div>
          <div className="relative">
            {/* <span className="text-xl">&#9734;</span> */}
            <FaShoppingCart className="text-3xl"></FaShoppingCart>
            <span className="absolute top-0 right-0 bg-yellow-500 text-xs px-1 rounded-full">
              01
            </span>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar


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
