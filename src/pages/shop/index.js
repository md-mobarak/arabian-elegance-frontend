

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import Card from "@/components/Card";

// Fetch products from the API
const fetchProducts = async ({ search, category, minPrice, maxPrice, page, limit }) => {
  const url = new URL("http://localhost:5000/api/v1/product");
  if (search) url.searchParams.append("search", search);
  if (category) url.searchParams.append("category", category);
  if (minPrice) url.searchParams.append("minPrice", minPrice);
  if (maxPrice) url.searchParams.append("maxPrice", maxPrice);
  url.searchParams.append("page", page);
  url.searchParams.append("limit", limit);

  const response = await fetch(url.toString());
  if (!response.ok) throw new Error("Failed to fetch products");
  return response.json();
};

export default function Shop() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  // React Query to fetch products
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", { search, category, minPrice, maxPrice, page, limit }],
    queryFn: () => fetchProducts({ search, category, minPrice, maxPrice, page, limit }),
    keepPreviousData: true, // Keep previous data while fetching new data
  });

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError) return <p className="text-center mt-10 text-red-500">Something went wrong!</p>;

  const products = [
    {
      id: 1,
      name: 'Classic Shirt',
      price: '$29.99',
      oldPrice: '$39.99',
      discount: '25% OFF',
      rating: 4.3,
      img: 'https://html.pixelfit.agency/pesco/assets/images/products/feature-product-1.png',
    },
    {
      id: 1,
      name: 'Classic Shirt',
      price: '$29.99',
      oldPrice: '$39.99',
      discount: '25% OFF',
      rating: 4.3,
      img: 'https://html.pixelfit.agency/pesco/assets/images/products/feature-product-2.png',
    },
    {
      id: 2,
      name: 'Stylish Jacket',
      price: '$49.99',
      oldPrice: '$69.99',
      discount: '30% OFF',
      rating: 4.7,
      img: 'https://html.pixelfit.agency/pesco/assets/images/products/feature-product-3.png',
    },
    {
      id: 2,
      name: 'Stylish Jacket',
      price: '$49.99',
      oldPrice: '$69.99',
      discount: '30% OFF',
      rating: 4.7,
      img: 'https://html.pixelfit.agency/pesco/assets/images/products/feature-product-4.png',
    },
    {
      id: 2,
      name: 'Stylish Jacket',
      price: '$49.99',
      oldPrice: '$69.99',
      discount: '30% OFF',
      rating: 4.7,
      img: 'https://html.pixelfit.agency/pesco/assets/images/products/feature-product-5.png',
    },
    {
      id: 2,
      name: 'Stylish Jacket',
      price: '$49.99',
      oldPrice: '$69.99',
      discount: '30% OFF',
      rating: 4.7,
      img: 'https://html.pixelfit.agency/pesco/assets/images/products/feature-product-6.png',
    },
    {
      id: 2,
      name: 'Stylish Jacket',
      price: '$49.99',
      oldPrice: '$69.99',
      discount: '30% OFF',
      rating: 4.7,
      img: 'https://html.pixelfit.agency/pesco/assets/images/products/feature-product-6.png',
    },
    {
      id: 2,
      name: 'Stylish Jacket',
      price: '$49.99',
      oldPrice: '$69.99',
      discount: '30% OFF',
      rating: 4.7,
      img: 'https://html.pixelfit.agency/pesco/assets/images/products/feature-product-7.png',
    },
    {
      id: 2,
      name: 'Stylish Jacket',
      price: '$49.99',
      oldPrice: '$69.99',
      discount: '30% OFF',
      rating: 4.7,
      img: 'https://html.pixelfit.agency/pesco/assets/images/products/feature-product-8.png',
    },
    {
      id: 2,
      name: 'Stylish Jacket',
      price: '$49.99',
      oldPrice: '$69.99',
      discount: '30% OFF',
      rating: 4.7,
      img: 'https://html.pixelfit.agency/pesco/assets/images/products/feature-product-9.png',
    },
    {
      id: 2,
      name: 'Stylish Jacket',
      price: '$49.99',
      oldPrice: '$69.99',
      discount: '30% OFF',
      rating: 4.7,
      img: 'https://html.pixelfit.agency/pesco/assets/images/products/feature-product-10.png',
    },
    {
      id: 2,
      name: 'Stylish Jacket',
      price: '$49.99',
      oldPrice: '$69.99',
      discount: '30% OFF',
      rating: 4.7,
      img: 'https://html.pixelfit.agency/pesco/assets/images/products/feature-product-11.png',
    },
    {
      id: 2,
      name: 'Stylish Jacket',
      price: '$49.99',
      oldPrice: '$69.99',
      discount: '30% OFF',
      rating: 4.7,
      img: 'https://html.pixelfit.agency/pesco/assets/images/products/feature-product-12.png',
    },
    {
      id: 2,
      name: 'Stylish Jacket',
      price: '$49.99',
      oldPrice: '$69.99',
      discount: '30% OFF',
      rating: 4.7,
      img: 'https://html.pixelfit.agency/pesco/assets/images/products/feature-product-13.png',
    },
    {
      id: 2,
      name: 'Stylish Jacket',
      price: '$49.99',
      oldPrice: '$69.99',
      discount: '30% OFF',
      rating: 4.7,
      img: 'https://html.pixelfit.agency/pesco/assets/images/products/feature-product-14.png',
    },
  
  ];



  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Home/<span className="text-green-500">Shop</span></h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Filters */}
        <div className="w-full lg:w-1/4 bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-xl font-bold mb-4">Product Categories</h2>
          <ul className="space-y-2">
            {["Streams Gaming", "Store Gaming", "Store View", "Content", "Accessories", "Security View", "Voting Gaming", "Services", "Admissions"].map((cat, index) => (
              <li key={index} className="flex items-center">
                <input type="checkbox" id={`cat-${index}`} className="mr-2" />
                <label htmlFor={`cat-${index}`} className="text-gray-700">{cat}</label>
              </li>
            ))}
          </ul>

          <h2 className="text-xl font-bold mt-6 mb-4">Price Filter</h2>
          <div className="space-y-2">
            <input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <h2 className="text-xl font-bold mt-6 mb-4">Color</h2>
          <div className="flex flex-wrap gap-2">
            {["Red", "Blue", "Green", "Yellow", "Black", "White"].map((color, index) => (
              <div key={index} className="w-6 h-6 rounded-full" style={{ backgroundColor: color.toLowerCase() }}></div>
            ))}
          </div>

          <h2 className="text-xl font-bold mt-6 mb-4">Size</h2>
          <div className="flex flex-wrap gap-2">
            {["S", "M", "L", "XL", "XXL"].map((size, index) => (
              <button key={index} className="px-3 py-1 border rounded-md">{size}</button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="w-full lg:w-3/4">
          <div className="flex flex-wrap gap-4 justify-center mb-6">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border p-2 rounded-md"
            />
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="border p-2 rounded-md">
              <option value="">All Categories</option>
              <option value="burqa">Burqa</option>
              <option value="tshirt">T-Shirt</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card key={product._id} product={product} />
            ))}
          </div>

          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={data.totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={(e) => setPage(e.selected + 1)}
            containerClassName={"flex justify-center mt-6 gap-2"}
            pageClassName={"px-3 py-1 border rounded-md cursor-pointer"}
            activeClassName={"bg-blue-500 text-white"}
            previousClassName={"px-3 py-1 border rounded-md cursor-pointer"}
            nextClassName={"px-3 py-1 border rounded-md cursor-pointer"}
            disabledClassName={"text-gray-400 cursor-not-allowed"}
          />
        </div>
      </div>
    </div>
  );
}