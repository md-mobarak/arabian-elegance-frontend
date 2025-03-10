
"use client";
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { confirmAlert } from "react-confirm-alert";
import Skeleton from "react-loading-skeleton";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
// import ProductModal from "./ProductModal";
import { RxCross2 } from "react-icons/rx";
import "react-loading-skeleton/dist/skeleton.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import ProductModal from "../ProductModal";

const ProductManagement = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [page, setPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const limit = 10;

  // Authentication state
  const [authData, setAuthData] = useState({
    accessToken: "",
    userRole: ""
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setAuthData({
        accessToken: localStorage.getItem("accessToken") || "",
        userRole: localStorage.getItem("userRole") || ""
      });
    }
  }, []);

  // API headers with authentication
  const getHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${authData.accessToken}`
  });

  // Fetch products with filters
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", search, category, minPrice, maxPrice, page],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/api/v1/product?search=${search}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}&page=${page}&limit=${limit}`
      );
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    }
  });
// console.log(data)
  // Delete product mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`http://localhost:5000/api/v1/product/${id}`, {
        method: "DELETE",
        headers: getHeaders()
      });
      if (res.status === 401) throw new Error("Unauthorized");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      toast.success("Product deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message === "Unauthorized" ? "Login expired!" : "Delete failed");
    }
  });

  // Create/Update product mutation
  
  const productMutation = useMutation({
    mutationFn: async ({ formData, id }) => {
      const url = id ? `http://localhost:5000/api/v1/product/${id}` : "http://localhost:5000/api/v1/product";
      const method = id ? "PUT" : "POST";

// Handle image uploads with ImageBB
const images = formData.getAll("images");
let imageUrls = [];

if (images.length > 0) {
  const uploadPromises = Array.from(images).map(async (image) => {
    const data = new FormData();
    data.append("image", image);
    
    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=85550ec4bf046ba661f38ebd86e505ac`,
      { method: "POST", body: data }
    );
    const json = await res.json();
    return json.data.url; // ImageBB থেকে URL নেওয়া
  });
  // console.log(uploadPromises)
  imageUrls = await Promise.all(uploadPromises);
}

      const productData = {
        title: formData.get("title"),
        description: formData.get("description"),
        price: formData.get("price"),
        // category: formData.get("price"),
        stock: formData.get("stock"),
        images: imageUrls,
        ...(id && { images: [...selectedProduct.images, ...imageUrls] })
      };
      console.log(productData)

      const res = await fetch(url, {
        method,
        headers: getHeaders(),
        body: JSON.stringify(productData)
      });
      // console.log(res);
      if (res.status === 401) throw new Error("Unauthorized");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      toast.success("Operation successful");
      setIsModalOpen(false);
    },
    onError: (error) => {
      toast.error(error.message === "Unauthorized" ? "Login expired!" : "Operation failed");
    }
  });

  const handleSubmit = (e, id) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    productMutation.mutate({ formData, id });
  };

  const handleDelete = (id) => {
    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure?",
      buttons: [
        { label: "Yes", onClick: () => deleteMutation.mutate(id) },
        { label: "No" }
      ]
    });
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Product Dashboard</h1>
        {["admin", "manager"].includes(authData.userRole) && (
          <button
            onClick={() => {
              setSelectedProduct(null);
              setIsModalOpen(true);
            }}
            className="bg-green-500 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-all"
          >
            + New Product
          </button>
        )}
      </div>

      {/* Filters Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
        />
        <input
          type="number"
          placeholder="Min price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="border p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
        />
        <input
          type="number"
          placeholder="Max price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
        >
          <option value="">All Categories</option>
          {/* Add your categories here */}
        </select>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {isLoading ? (
          [...Array(5)].map((_, i) => (
            <div key={i} className="p-4 border-b">
              <Skeleton height={30} count={4} />
            </div>
          ))
        ) : isError ? (
          <div className="p-6 text-red-500">Error loading products</div>
        ) : (
          <>
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Product</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Price</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Category</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Stock</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data?.products?.map((product) => (
                  <tr key={product._id}>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {product.images?.[0] && (
                          <img
                            src={product.images[0]}
                            alt={product.title}
                            className="w-12 h-12 object-cover rounded mr-4"
                          />
                        )}
                        <span className="font-medium">{product.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">${product.price}</td>
                    <td className="px-6 py-4">{product?.category?.name?.length ===0 ? "nai keco":product?.category?.name}</td>
                    <td className="px-6 py-4">{product.stock}</td>
                    <td className="px-6 py-4 space-x-2">
                      <button
                        onClick={() => {
                          setSelectedProduct(product);
                          setIsModalOpen(true);
                        }}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                     
                        <FaEdit className="text-xl"/>
                      
                 
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                      < FaTrash className="text-xl"/>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-between items-center px-6 py-4 border-t">
              <span className="text-sm text-gray-700">
                Showing {data?.products?.length} of {data?.total} items
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage(p => Math.max(p - 1, 1))}
                  disabled={page === 1}
                  className="px-4 py-2 border rounded-md disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="px-4 py-2">Page {page}</span>
                <button
                  onClick={() => setPage(p => p + 1)}
                  disabled={page >= data?.totalPages}
                  className="px-4 py-2 border rounded-md disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Product Modal */}
      <ProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <form onSubmit={(e) => handleSubmit(e, selectedProduct?._id)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Product Name</label>
            <input
              name="title"
              defaultValue={selectedProduct?.title}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          {/* ক্যাটেগরি সিলেক্টর যোগ করুন */}
<div>
  <label className="block text-sm font-medium mb-1">Category</label>
  <select
    name="category"
    defaultValue={selectedProduct?.category}
    className="w-full p-2 border rounded"
    required
  >
    <option value="">Select Category</option>
    {/* ডাইনামিক অপশন যোগ করুন */}
    <option value="ক্যাটেগরি_আইডি_১">Category 1</option>
    <option value="ক্যাটেগরি_আইডি_২">Category 2</option>
  </select>
</div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              defaultValue={selectedProduct?.description}
              className="w-full p-2 border rounded"
              rows="3"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Price</label>
              <input
                name="price"
                type="number"
                defaultValue={selectedProduct?.price}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Stock</label>
              <input
                name="stock"
                type="number"
                defaultValue={selectedProduct?.stock}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Product Images</label>
            <input
              name="images"
              type="file"
              multiple
              className="w-full p-2 border rounded"
              accept="image/*"
            />
            <div className="mt-2 flex gap-2 flex-wrap">
              {selectedProduct?.images?.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Product ${i}`}
                  className="w-16 h-16 object-cover rounded"
                />
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 border rounded hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              {selectedProduct ? "Update Product" : "Create Product"}
            </button>
          </div>
        </form>
      </ProductModal>
    </div>
  );
};

export default ProductManagement;


// "use client";
// import { useState, useEffect } from "react";
// import Image from "next/image";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { toast } from "react-hot-toast";
// import { confirmAlert } from "react-confirm-alert";
// import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
// import Skeleton from "react-loading-skeleton";
// import ProductModal from "../ProductModal";
// // import ViewImagesModal from "../ViewImagesModal";
// import "react-loading-skeleton/dist/skeleton.css";
// import "react-confirm-alert/src/react-confirm-alert.css";
// import ViewImagesModal from "../ViewImagesModal";

// const ProductManagement = () => {
//   const queryClient = useQueryClient();
//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("");
//   const [minPrice, setMinPrice] = useState("");
//   const [maxPrice, setMaxPrice] = useState("");
//   const [page, setPage] = useState(1);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isViewModalOpen, setIsViewModalOpen] = useState(false);
//   const [viewedProduct, setViewedProduct] = useState(null);
//   const limit = 10;

//   // Authentication state
//   const [authData, setAuthData] = useState({
//     accessToken: "",
//     userRole: ""
//   });

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       setAuthData({
//         accessToken: localStorage.getItem("accessToken") || "",
//         userRole: localStorage.getItem("userRole") || ""
//       });
//     }
//   }, []);

//   // API headers
//   const getHeaders = () => ({
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${authData.accessToken}`
//   });

//   // Fetch products
//   const { data, isLoading, isError } = useQuery({
//     queryKey: ["products", search, category, minPrice, maxPrice, page],
//     queryFn: async () => {
//       const res = await fetch(
//         `http://localhost:5000/api/v1/product?search=${search}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}&page=${page}&limit=${limit}`
//       );
//       if (!res.ok) throw new Error("Failed to fetch");
//       return res.json();
//     }
//   });

//   // Delete mutation
//   const deleteMutation = useMutation({
//     mutationFn: async (id) => {
//       const res = await fetch(`http://localhost:5000/api/v1/product/${id}`, {
//         method: "DELETE",
//         headers: getHeaders()
//       });
//       if (res.status === 401) throw new Error("Unauthorized");
//       return res.json();
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["products"]);
//       toast.success("Product deleted successfully");
//     },
//     onError: (error) => {
//       toast.error(error.message === "Unauthorized" ? "Login expired!" : "Delete failed");
//     }
//   });

//   // Product mutation
//   const productMutation = useMutation({
//     mutationFn: async ({ formData, id }) => {
//       const url = id 
//         ? `http://localhost:5000/api/v1/product/${id}` 
//         : "http://localhost:5000/api/v1/product";

//       // Handle image uploads
//       const images = formData.getAll("images");
//       let imageUrls = [];

//       if (images.length > 0) {
//         const uploadPromises = Array.from(images).map(async (image) => {
//           const data = new FormData();
//           data.append("file", image);
//           data.append("upload_preset", "arabianElegance");
//           const res = await fetch(
//             `https://api.cloudinary.com/v1_1/ArabianEleganceBD/upload`,
//             { method: "POST", body: data }
//           );
//           return res.json();
//         });
//         imageUrls = (await Promise.all(uploadPromises))
//           .filter(img => img?.secure_url)
//           .map(img => img.secure_url);
//       }

//       const productData = {
//         title: formData.get("title"),
//         description: formData.get("description"),
//         category: formData.get("category"),
//         price: formData.get("price"),
//         stock: formData.get("stock"),
//         images: id 
//           ? [...selectedProduct.images, ...imageUrls]
//           : imageUrls
//       };

//       const res = await fetch(url, {
//         method: id ? "PUT" : "POST",
//         headers: getHeaders(),
//         body: JSON.stringify(productData)
//       });

//       if (!res.ok) {
//         const errorData = await res.json();
//         throw new Error(errorData.message || "Operation failed");
//       }
//       return res.json();
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["products"]);
//       toast.success("Operation successful");
//       setIsModalOpen(false);
//     },
//     onError: (error) => {
//       toast.error(error.message.includes("401") ? "Login expired!" : error.message);
//     }
//   });

//   const handleSubmit = (e, id) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     productMutation.mutate({ formData, id });
//   };

//   const handleDelete = (id) => {
//     confirmAlert({
//       title: "Confirm Delete",
//       message: "Are you sure?",
//       buttons: [
//         { label: "Yes", onClick: () => deleteMutation.mutate(id) },
//         { label: "No" }
//       ]
//     });
//   };

//   const handleViewImages = (product) => {
//     setViewedProduct(product);
//     setIsViewModalOpen(true);
//   };

//   return (
//     <div className="p-8 max-w-7xl mx-auto">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold text-gray-800">Product Dashboard</h1>
//         {["admin", "manager"].includes(authData.userRole) && (
//           <button
//             onClick={() => {
//               setSelectedProduct(null);
//               setIsModalOpen(true);
//             }}
//             className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors"
//           >
//             + New Product
//           </button>
//         )}
//       </div>

//       {/* Filters */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//         <input
//           type="text"
//           placeholder="Search products..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="border p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
//         />
//         <input
//           type="number"
//           placeholder="Min price"
//           value={minPrice}
//           onChange={(e) => setMinPrice(e.target.value)}
//           className="border p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
//         />
//         <input
//           type="number"
//           placeholder="Max price"
//           value={maxPrice}
//           onChange={(e) => setMaxPrice(e.target.value)}
//           className="border p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
//         />
//         <select
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           className="border p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
//         >
//           <option value="">All Categories</option>
//           <option value="">Categories1</option>
//           <option value="">Categories</option>
//           {/* Dynamic categories should be populated here */}
//         </select>
//       </div>

//       {/* Products Table */}
//       <div className="bg-white rounded-lg shadow overflow-hidden">
//         {isLoading ? (
//           [...Array(5)].map((_, i) => (
//             <div key={i} className="p-4 border-b">
//               <Skeleton height={30} count={4} />
//             </div>
//           ))
//         ) : isError ? (
//           <div className="p-6 text-red-500">Error loading products</div>
//         ) : (
//           <>
//             <table className="w-full">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Product</th>
//                   <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Price</th>
//                   <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Stock</th>
//                   <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {data?.products?.map((product) => (
//                   <tr key={product._id}>
//                     <td className="px-6 py-4">
//                       <div className="flex items-center">
//                         {product.images?.[0] && (
//                           <Image
//                             src={product.images[0]}
//                             alt={product.title}
//                             width={48}
//                             height={48}
//                             className="w-12 h-12 object-cover rounded mr-4"
//                             priority
//                           />
//                         )}
//                         <span className="font-medium">{product.title}</span>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">${product.price}</td>
//                     <td className="px-6 py-4">{product.stock}</td>
//                     <td className="px-6 py-4 space-x-3">
//                       <button
//                         onClick={() => handleViewImages(product)}
//                         className="text-blue-600 hover:text-blue-800"
//                         title="View Images"
//                       >
//                         <FaEye size={20} />
//                       </button>
//                       <button
//                         onClick={() => {
//                           setSelectedProduct(product);
//                           setIsModalOpen(true);
//                         }}
//                         className="text-indigo-600 hover:text-indigo-800"
//                         title="Edit"
//                       >
//                         <FaEdit size={20} />
//                       </button>
//                       <button
//                         onClick={() => handleDelete(product._id)}
//                         className="text-red-600 hover:text-red-800"
//                         title="Delete"
//                       >
//                         <FaTrash size={20} />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             {/* Pagination */}
//             <div className="flex justify-between items-center px-6 py-4 border-t">
//               <span className="text-sm text-gray-700">
//                 Showing {data?.products?.length} of {data?.total} items
//               </span>
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => setPage(p => Math.max(p - 1, 1))}
//                   disabled={page === 1}
//                   className="px-4 py-2 border rounded-md disabled:opacity-50"
//                 >
//                   Previous
//                 </button>
//                 <span className="px-4 py-2">Page {page}</span>
//                 <button
//                   onClick={() => setPage(p => p + 1)}
//                   disabled={page >= data?.totalPages}
//                   className="px-4 py-2 border rounded-md disabled:opacity-50"
//                 >
//                   Next
//                 </button>
//               </div>
//             </div>
//           </>
//         )}
//       </div>

//       {/* View Images Modal */}
//       <ViewImagesModal
//         isOpen={isViewModalOpen}
//         onClose={() => setIsViewModalOpen(false)}
//         images={viewedProduct?.images || []}
//         title={viewedProduct?.title}
//       />

//       {/* Product Form Modal */}
//       <ProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
//         <form onSubmit={(e) => handleSubmit(e, selectedProduct?._id)} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">Product Name</label>
//             <input
//               name="title"
//               defaultValue={selectedProduct?.title}
//               className="w-full p-2 border rounded"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Category</label>
//             <select
//               name="category"
//               defaultValue={selectedProduct?.category}
//               className="w-full p-2 border rounded"
//               required
//             >
//               <option value="">Select Category</option>
//               <option value="">Select Category</option>
//               <option value="">Select Category</option>
//               <option value="">Select Category</option>
//               {/* Dynamic categories should be populated here */}
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Description</label>
//             <textarea
//               name="description"
//               defaultValue={selectedProduct?.description}
//               className="w-full p-2 border rounded"
//               rows="3"
//               required
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium mb-1">Price</label>
//               <input
//                 name="price"
//                 type="number"
//                 defaultValue={selectedProduct?.price}
//                 className="w-full p-2 border rounded"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">Stock</label>
//               <input
//                 name="stock"
//                 type="number"
//                 defaultValue={selectedProduct?.stock}
//                 className="w-full p-2 border rounded"
//                 required
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Product Images</label>
//             <input
//               name="images"
//               type="file"
//               multiple
//               className="w-full p-2 border rounded"
//               accept="image/*"
//             />
//             <div className="mt-2 flex gap-2 flex-wrap">
//               {selectedProduct?.images?.map((img, i) => (
//                 <Image
//                   key={i}
//                   src={img}
//                   alt={`Product Preview ${i}`}
//                   width={64}
//                   height={64}
//                   className="w-16 h-16 object-cover rounded"
//                 />
//               ))}
//             </div>
//           </div>

//           <div className="flex justify-end gap-2 mt-6">
//             <button
//               type="button"
//               onClick={() => setIsModalOpen(false)}
//               className="px-4 py-2 border rounded hover:bg-gray-50"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
//             >
//               {selectedProduct ? "Update Product" : "Create Product"}
//             </button>
//           </div>
//         </form>
//       </ProductModal>
//     </div>
//   );
// };

// export default ProductManagement;