// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import ReactPaginate from 'react-paginate';
// import Select from 'react-select';
// import { FaEye } from 'react-icons/fa'; // Import the eye icon from react-icons
// import Modal from '../Modal';
// // import Modal from './Modal'; // Import your Modal component

// function Users() {
//   const [users, setUsers] = useState([]);
//   const [totalPages, setTotalPages] = useState(0);
//   const [search, setSearch] = useState('');
//   const [roleFilter, setRoleFilter] = useState('');
//   const [page, setPage] = useState(1);
//   const [showModal, setShowModal] = useState(false); // To control modal visibility
//   const [modalContent, setModalContent] = useState(null); // Content of the modal
//   const [selectedUser, setSelectedUser] = useState(null); // The selected user for viewing details

//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/v1/auth?page=${page}&limit=10&search=${search}&role=${roleFilter}`);
//       setUsers(response.data.data);
//       setTotalPages(response.data.pagination.totalPages);
//     } catch (error) {
//       console.error('Error fetching users', error);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, [page, search, roleFilter]);

//   const handleSearchChange = (e) => setSearch(e.target.value);

//   const handleRoleFilterChange = (selectedOption) => setRoleFilter(selectedOption ? selectedOption.value : '');

//   const handlePageChange = (selectedPage) => setPage(selectedPage.selected + 1);

//   const openUserDetailsModal = (user) => {
//     setSelectedUser(user);
//     setModalContent(
//       <div>
//         <h3 className="font-semibold text-xl">User Details</h3>
//         <p><strong>Name:</strong> {user.name}</p>
//         <p><strong>Email:</strong> {user.email}</p>
//         <p><strong>Role:</strong> {user.role}</p>
//         <p><strong>Created At:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
//         {/* Add more fields as needed */}
//         <button 
//           onClick={closeModal} 
//           className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
//         >
//           Close
//         </button>
//       </div>
//     );
//     setShowModal(true);
//   };

//   const openUpdateModal = (user) => {
//     setSelectedUser(user);
//     setModalContent(
//       <div>
//         <h3>Update User Role</h3>
//         <input 
//           type="text" 
//           value={user.name} 
//           readOnly
//           className="mb-2 p-2 border border-gray-300 rounded"
//         />
//         <input 
//           type="text" 
//           value={user.email} 
//           readOnly
//           className="mb-2 p-2 border border-gray-300 rounded"
//         />
//         {/* Update role, add additional fields as needed */}
//         <button onClick={closeModal} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
//           Save Changes
//         </button>
//       </div>
//     );
//     setShowModal(true);
//   };

//   const openDeleteModal = (user) => {
//     setSelectedUser(user);
//     setModalContent(
//       <div>
//         <h3>Are you sure you want to delete this user?</h3>
//         <button 
//           onClick={handleDeleteUser} 
//           className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
//         >
//           Yes, Delete
//         </button>
//         <button 
//           onClick={closeModal} 
//           className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
//         >
//           Cancel
//         </button>
//       </div>
//     );
//     setShowModal(true);
//   };

//   const handleDeleteUser = async () => {
//     try {
//       await axios.delete(`http://localhost:5000/api/v1/auth/${selectedUser._id}`);
//       fetchUsers(); // Refresh the list after deletion
//       closeModal(); // Close the modal
//     } catch (error) {
//       console.error('Error deleting user', error);
//     }
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setModalContent(null);
//   };

//   return (
//     <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
//       <div className="flex space-x-4 mb-6">
//         <input 
//           type="text" 
//           placeholder="Search by name or email" 
//           value={search} 
//           onChange={handleSearchChange}
//           className="p-2 w-64 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <Select
//           options={[
//             { value: '', label: 'All Roles' },
//             { value: 'user', label: 'User' },
//             { value: 'manager', label: 'Manager' },
//             { value: 'admin', label: 'Admin' },
//           ]}
//           onChange={handleRoleFilterChange}
//           placeholder="Filter by role"
//           className="w-64"
//         />
//       </div>

//       <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="py-3 px-6 text-left text-gray-700">Name</th>
//             <th className="py-3 px-6 text-left text-gray-700">Email</th>
//             <th className="py-3 px-6 text-left text-gray-700">Role</th>
//             <th className="py-3 px-6 text-left text-gray-700">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user._id} className="hover:bg-gray-50 transition-colors duration-300">
//               <td className="py-3 px-6 text-gray-800">{user.name}</td>
//               <td className="py-3 px-6 text-gray-800">{user.email}</td>
//               <td className="py-3 px-6 text-gray-800">{user.role}</td>
//               <td className="py-3 px-6 space-x-2">
//                 <button 
//                   onClick={() => openUserDetailsModal(user)} 
//                   className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
//                 >
//                   <FaEye /> View Details
//                 </button>
//                 <button 
//                   onClick={() => openUpdateModal(user)} 
//                   className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
//                 >
//                   Update Role
//                 </button>
//                 <button 
//                   onClick={() => openDeleteModal(user)} 
//                   className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <div className="mt-6 flex justify-center">
//         <ReactPaginate
//           previousLabel={'Previous'}
//           nextLabel={'Next'}
//           breakLabel={'...'}
//           pageCount={totalPages}
//           marginPagesDisplayed={2}
//           pageRangeDisplayed={5}
//           onPageChange={handlePageChange}
//           containerClassName={'flex space-x-4'}
//           pageClassName={'py-2 px-4 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition-colors'}
//           activeClassName={'bg-blue-600'}
//           previousClassName={'py-2 px-4 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition-colors'}
//           nextClassName={'py-2 px-4 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition-colors'}
//         />
//       </div>

//       <Modal showModal={showModal} closeModal={closeModal}>
//         {modalContent}
//       </Modal>
//     </div>
//   );
// }

// export default Users;



// "use client";
// import { useState, useEffect } from "react";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { toast } from "react-hot-toast";
// import { confirmAlert } from "react-confirm-alert";
// import Skeleton from "react-loading-skeleton";
// import { FaEdit, FaTrash, FaLock, FaUnlock } from "react-icons/fa";
// import { RxCross2 } from "react-icons/rx";
// import "react-loading-skeleton/dist/skeleton.css";
// import "react-confirm-alert/src/react-confirm-alert.css";

// const Users = () => {
//   const queryClient = useQueryClient();
//   const [search, setSearch] = useState("");
//   const [roleFilter, setRoleFilter] = useState("");
//   const [page, setPage] = useState(1);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const limit = 10;

//   // Authentication state
//   const [authData, setAuthData] = useState({
//     accessToken: "",
//     userRole: "",
//     userId: ""
//   });

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       setAuthData({
//         accessToken: localStorage.getItem("accessToken") || "",
//         userRole: localStorage.getItem("userRole") || "",
//         userId: localStorage.getItem("userId") || ""
//       });
//     }
//   }, []);

//   // API headers with authentication
//   const getHeaders = () => ({
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${authData.accessToken}`
//   });

//   // Fetch users with filters
//   const { data, isLoading, isError } = useQuery({
//     queryKey: ["users", search, roleFilter, page],
//     queryFn: async () => {
//       const res = await fetch(
//         `http://localhost:5000/api/v1/user?search=${search}&role=${roleFilter}&page=${page}&limit=${limit}`,
//         { headers: getHeaders() }
//       );
//       if (!res.ok) throw new Error("Failed to fetch");
//       return res.json();
//     }
//   });


//   // Delete user mutation
//   const deleteMutation = useMutation({
//     mutationFn: async (id) => {
//       const res = await fetch(`http://localhost:5000/api/v1/user/${id}`, {
//         method: "DELETE",
//         headers: getHeaders()
//       });
//       if (res.status === 401) throw new Error("Unauthorized");
//       return res.json();
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["users"]);
//       toast.success("User deleted successfully");
//     },
//     onError: (error) => {
//       toast.error(error.message === "Unauthorized" ? "Login expired!" : "Delete failed");
//     }
//   });

//   // Update user mutation
//   const updateMutation = useMutation({
//     mutationFn: async ({ id, userData }) => {
//       const res = await fetch(`http://localhost:5000/api/v1/user/${id}`, {
//         method: "PUT",
//         headers: getHeaders(),
//         body: JSON.stringify(userData)
//       });
//       if (res.status === 401) throw new Error("Unauthorized");
//       return res.json();
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["users"]);
//       toast.success("User updated successfully");
//       setIsModalOpen(false);
//     },
//     onError: (error) => {
//       toast.error(error.message === "Unauthorized" ? "Login expired!" : "Update failed");
//     }
//   });

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

//   const handleRoleUpdate = (user) => {
//     confirmAlert({
//       title: "Change Role",
//       message: `Current role: ${user.role}`,
//       buttons: [
//         {
//           label: "Make Admin",
//           onClick: () => updateMutation.mutate({ 
//             id: user._id, 
//             userData: { role: "admin" } 
//           })
//         },
//         {
//           label: "Make Manager",
//           onClick: () => updateMutation.mutate({ 
//             id: user._id, 
//             userData: { role: "manager" } 
//           })
//         },
//         {
//           label: "Make User",
//           onClick: () => updateMutation.mutate({ 
//             id: user._id, 
//             userData: { role: "user" } 
//           })
//         },
//         { label: "Cancel" }
//       ]
//     });
//   };

//   return (
//     <div className="p-8 max-w-7xl mx-auto">
//       {/* Header Section */}
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
//         {authData.userRole === "admin" && (
//           <div className="flex gap-4">
//             <input
//               type="text"
//               placeholder="Search users..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="border p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
//             />
//             <select
//               value={roleFilter}
//               onChange={(e) => setRoleFilter(e.target.value)}
//               className="border p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
//             >
//               <option value="">All Roles</option>
//               <option value="user">User</option>
//               <option value="manager">Manager</option>
//               <option value="admin">Admin</option>
//             </select>
//           </div>
//         )}
//       </div>

//       {/* Users Table */}
//       <div className="bg-white rounded-lg shadow overflow-hidden">
//         {isLoading ? (
//           [...Array(5)].map((_, i) => (
//             <div key={i} className="p-4 border-b">
//               <Skeleton height={30} count={4} />
//             </div>
//           ))
//         ) : isError ? (
//           <div className="p-6 text-red-500">Error loading users</div>
//         ) : (
//           <>
//             <table className="w-full">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">User</th>
//                   <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
//                   <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Role</th>
//                   <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
//                   <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {data?.data?.map((user) => (
//                   <tr key={user._id}>
//                     <td className="px-6 py-4">
//                       <div className="flex items-center">
//                         <img
//                           src={user.avatar}
//                           alt={user.name}
//                           className="w-12 h-12 object-cover rounded-full mr-4"
//                         />
//                         <div>
//                           <p className="font-medium">{user.name}</p>
//                           <p className="text-sm text-gray-500">{user.phone}</p>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">{user.email}</td>
//                     <td className="px-6 py-4">
//                       <span className={`px-2 py-1 rounded-full text-sm ${
//                         user.role === "admin" ? "bg-red-100 text-red-800" :
//                         user.role === "manager" ? "bg-blue-100 text-blue-800" :
//                         "bg-gray-100 text-gray-800"
//                       }`}>
//                         {user.role}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       {user.isVerified ? (
//                         <span className="text-green-600 flex items-center">
//                           <FaUnlock className="mr-2" /> Active
//                         </span>
//                       ) : (
//                         <span className="text-red-600 flex items-center">
//                           <FaLock className="mr-2" /> Inactive
//                         </span>
//                       )}
//                     </td>
//                     <td className="px-6 py-4 space-x-2">
//                       {authData.userRole === "admin" && (
//                         <>
//                           <button
//                             onClick={() => handleRoleUpdate(user)}
//                             className="text-indigo-600 hover:text-indigo-900"
//                             disabled={user._id === authData.userId}
//                           >
//                             <FaEdit className="text-xl"/>
//                           </button>
//                           <button
//                             onClick={() => handleDelete(user._id)}
//                             className="text-red-600 hover:text-red-900"
//                             disabled={user._id === authData.userId}
//                           >
//                             <FaTrash className="text-xl"/>
//                           </button>
//                         </>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             {/* Pagination */}
//             <div className="flex justify-between items-center px-6 py-4 border-t">
//               <span className="text-sm text-gray-700">
//                 Showing {data?.users?.length} of {data?.totalUsers} users
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

//       {/* User Modal (for advanced editing) */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-lg p-6 w-full max-w-md">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-bold">Edit User</h2>
//               <button 
//                 onClick={() => setIsModalOpen(false)}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 <RxCross2 className="text-2xl" />
//               </button>
//             </div>
//             {/* Add detailed user edit form here */}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Users;

// "use client";
// import { useState, useEffect } from "react";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { toast } from "react-hot-toast";
// import { confirmAlert } from "react-confirm-alert";
// import Skeleton from "react-loading-skeleton";
// import { FaEdit, FaTrash, FaLock, FaUnlock } from "react-icons/fa";
// import { RxCross2 } from "react-icons/rx";
// import "react-loading-skeleton/dist/skeleton.css";
// import "react-confirm-alert/src/react-confirm-alert.css";
// import Image from "next/image";

// const Users = () => {
//   const queryClient = useQueryClient();
//   const [search, setSearch] = useState("");
//   const [roleFilter, setRoleFilter] = useState("");
//   const [page, setPage] = useState(1);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const limit = 10;

//   // Authentication state
//   const [authData, setAuthData] = useState({
//     accessToken: "",
//     userRole: "",
//     userId: ""
//   });

//   useEffect(() => {
//     const verifyAuth = () => {
//       const token = localStorage.getItem("accessToken");
//       const role = localStorage.getItem("userRole");
//       const userId = localStorage.getItem("userId");

//       if (!token || !role || !userId) {
//         window.location.href = "/auth/login";
//         return;
//       }

//       setAuthData({ accessToken: token, userRole: role, userId });
//     };
//     verifyAuth();
//   }, []);

//   // API headers
//   const getHeaders = () => ({
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${authData.accessToken}`
//   });

//   // Fetch users with error handling
//   const { data, isLoading, isError, error } = useQuery({
//     queryKey: ["users", search, roleFilter, page],
//     queryFn: async () => {
//       const params = new URLSearchParams({
//         search,
//         role: roleFilter,
//         page: page.toString(),
//         limit: limit.toString()
//       });

//       const res = await fetch(`http://localhost:5000/api/v1/auth?${params}`, {
//         headers: getHeaders(),
//         credentials: 'include'
//       });

//       if (res.status === 401) {
//         localStorage.clear();
//         window.location.href = "/login";
//         throw new Error("Session expired");
//       }

//       if (!res.ok) {
//         const errorData = await res.json();
//         throw new Error(errorData.message || "Failed to fetch users");
//       }

//       return res.json();
//     }
//   });

//   // Update user with enhanced error handling
//   const updateMutation = useMutation({
//     mutationFn: async ({ id, userData }) => {
//       const res = await fetch(`http://localhost:5000/api/v1/auth/${id}`, {
//         method: "PUT",
//         headers: getHeaders(),
//         body: JSON.stringify(userData)
//       });

//       if (res.status === 401) {
//         localStorage.clear();
//         window.location.href = "/login";
//       }

//       if (!res.ok) {
//         const errorData = await res.json();
//         throw new Error(errorData.message || "Role update failed");
//       }

//       return res.json();
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["users"]);
//       toast.success("User role updated successfully");
//     },
//     onError: (error) => {
//       toast.error(error.message.includes("403") 
//         ? "You can't modify your own role" 
//         : error.message);
//     }
//   });

//   // Delete user mutation
//   const deleteMutation = useMutation({
//     mutationFn: async (id) => {
//       const res = await fetch(`http://localhost:5000/api/v1/auth/${id}`, {
//         method: "DELETE",
//         headers: getHeaders()
//       });

//       if (res.status === 401) {
//         localStorage.clear();
//         window.location.href = "/auth/login";
//       }

//       if (!res.ok) {
//         const errorData = await res.json();
//         throw new Error(errorData.message || "Delete failed");
//       }

//       return res.json();
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["users"]);
//       toast.success("User deleted successfully");
//     },
//     onError: (error) => {
//       toast.error(error.message.includes("403") 
//         ? "You can't delete yourself" 
//         : error.message);
//     }
//   });

//   const handleRoleUpdate = (user) => {
//     if (user._id === authData.userId) {
//       toast.error("You can't modify your own role");
//       return;
//     }

//     confirmAlert({
//       title: "Change Role",
//       message: `Current role: ${user.role}`,
//       buttons: [
//         {
//           label: "Make Admin",
//           onClick: () => updateMutation.mutate({ 
//             id: user._id, 
//             userData: { role: "admin" } 
//           })
//         },
//         {
//           label: "Make Manager",
//           onClick: () => updateMutation.mutate({ 
//             id: user._id, 
//             userData: { role: "manager" } 
//           })
//         },
//         {
//           label: "Make User",
//           onClick: () => updateMutation.mutate({ 
//             id: user._id, 
//             userData: { role: "user" } 
//           })
//         },
//         { label: "Cancel" }
//       ]
//     });
//   };

//   const handleDelete = (id) => {
//     if (id === authData.userId) {
//       toast.error("You can't delete yourself");
//       return;
//     }

//     confirmAlert({
//       title: "Confirm Delete",
//       message: "Are you sure you want to delete this user?",
//       buttons: [
//         { label: "Yes", onClick: () => deleteMutation.mutate(id) },
//         { label: "No" }
//       ]
//     });
//   };

//   return (
//     <div className="p-8 max-w-7xl mx-auto">
//       {/* Header Section */}
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
//         {authData.userRole === "admin" && (
//           <div className="flex gap-4">
//             <input
//               type="text"
//               placeholder="Search users..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="border p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none w-64"
//             />
//             <select
//               value={roleFilter}
//               onChange={(e) => setRoleFilter(e.target.value)}
//               className="border p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
//             >
//               <option value="">All Roles</option>
//               <option value="user">User</option>
//               <option value="manager">Manager</option>
//               <option value="admin">Admin</option>
//             </select>
//           </div>
//         )}
//       </div>

//       {/* Users Table */}
//       <div className="bg-white rounded-lg shadow overflow-hidden">
//         {isLoading ? (
//           [...Array(5)].map((_, i) => (
//             <div key={i} className="p-4 border-b">
//               <Skeleton height={30} count={4} />
//             </div>
//           ))
//         ) : isError ? (
//           <div className="p-6 text-red-500">{error.message}</div>
//         ) : (
//           <>
//             <table className="w-full">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">User</th>
//                   <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
//                   <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Role</th>
//                   <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
//                   <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {data?.data?.map((user) => (
//                   <tr key={user._id}>
//                     <td className="px-6 py-4">
//                       <div className="flex items-center">
//                         {/* <img
//                           src={user.avatar}
//                           alt={user.name}
//                           className="w-12 h-12 object-cover rounded-full mr-4"
//                         /> */}
//                         <Image
//                         src={user.avatar}
//                         alt={user.name}
//                         className="w-12 h-12 object-cover rounded-full mr-4"
//                         width={0}
//                         height={0}
//                         layout="responsive"
//                         />
//                         <div>
//                           <p className="font-medium">{user.name}</p>
//                           <p className="text-sm text-gray-500">{user.phone}</p>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">{user.email}</td>
//                     <td className="px-6 py-4">
//                       <span className={`px-2 py-1 rounded-full text-sm ${
//                         user.role === "admin" ? "bg-red-100 text-red-800" :
//                         user.role === "manager" ? "bg-blue-100 text-blue-800" :
//                         "bg-gray-100 text-gray-800"
//                       }`}>
//                         {user.role}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       {user.isVerified ? (
//                         <span className="text-green-600 flex items-center">
//                           <FaUnlock className="mr-2" /> Active
//                         </span>
//                       ) : (
//                         <span className="text-red-600 flex items-center">
//                           <FaLock className="mr-2" /> Inactive
//                         </span>
//                       )}
//                     </td>
//                     <td className="px-6 py-4 space-x-2">
//                       {authData.userRole === "admin" && user._id !== authData.userId && (
//                         <>
//                           <button
//                             onClick={() => handleRoleUpdate(user)}
//                             className="text-indigo-600 hover:text-indigo-900"
//                           >
//                             <FaEdit className="text-xl"/>
//                           </button>
//                           <button
//                             onClick={() => handleDelete(user._id)}
//                             className="text-red-600 hover:text-red-900"
//                           >
//                             <FaTrash className="text-xl"/>
//                           </button>
//                         </>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             {/* Pagination */}
//             <div className="flex justify-between items-center px-6 py-4 border-t">
//               <span className="text-sm text-gray-700">
//                 Showing {data?.data?.length} of {data?.pagination?.totalUsers} users
//               </span>
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => setPage(p => Math.max(p - 1, 1))}
//                   disabled={page === 1}
//                   className="px-4 py-2 border rounded-md disabled:opacity-50 hover:bg-gray-50"
//                 >
//                   Previous
//                 </button>
//                 <span className="px-4 py-2">Page {page}</span>
//                 <button
//                   onClick={() => setPage(p => p + 1)}
//                   disabled={page >= data?.pagination?.totalPages}
//                   className="px-4 py-2 border rounded-md disabled:opacity-50 hover:bg-gray-50"
//                 >
//                   Next
//                 </button>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Users;

"use client";
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { confirmAlert } from "react-confirm-alert";
import Skeleton from "react-loading-skeleton";
import { FaEdit, FaTrash, FaLock, FaUnlock } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import "react-loading-skeleton/dist/skeleton.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import Image from "next/image";
import { baseUrl } from "@/utils/api";

const Users = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const limit = 10;

  // Authentication state
  const [authData, setAuthData] = useState({
    accessToken: "",
    userRole: "",
    userId: ""
  });

  useEffect(() => {
    const verifyAuth = () => {
      const token = localStorage.getItem("accessToken");
      const role = localStorage.getItem("userRole");
      const userId = localStorage.getItem("userId");

      if (!token || !role || !userId) {
        window.location.href = "/auth/login";
        return;
      }

      setAuthData({ accessToken: token, userRole: role, userId });
    };
    verifyAuth();
  }, []);

  // API headers
  const getHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${authData.accessToken}`
  });

  // Fetch users with error handling
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users", search, roleFilter, page],
    queryFn: async () => {
      const params = new URLSearchParams({
        search,
        role: roleFilter,
        page: page.toString(),
        limit: limit.toString()
      });

      const res = await fetch(`${baseUrl}/auth?${params}`, {
        headers: getHeaders(),
        credentials: 'include'
      });

      if (res.status === 401) {
        localStorage.clear();
        window.location.href = "/login";
        throw new Error("Session expired");
      }

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to fetch users");
      }

      return res.json();
    }
  });

  // Update user with enhanced error handling
  const updateMutation = useMutation({
    mutationFn: async ({ id, userData }) => {
      const res = await fetch(`${baseUrl}/auth/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(userData)
      });

      if (res.status === 401) {
        localStorage.clear();
        window.location.href = "/login";
      }

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Role update failed");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      toast.success("User role updated successfully");
    },
    onError: (error) => {
      toast.error(error.message.includes("403") 
        ? "You can't modify your own role" 
        : error.message);
    }
  });

  // Delete user mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`${baseUrl}/auth/${id}`, {
        method: "DELETE",
        headers: getHeaders()
      });

      if (res.status === 401) {
        localStorage.clear();
        window.location.href = "/auth/login";
      }

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Delete failed");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      toast.success("User deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message.includes("403") 
        ? "You can't delete yourself" 
        : error.message);
    }
  });

  const handleRoleUpdate = (user) => {
    if (user._id === authData.userId) {
      toast.error("You can't modify your own role");
      return;
    }

    confirmAlert({
      title: "Change Role",
      message: `Current role: ${user.role}`,
      buttons: [
        {
          label: "Make Admin",
          onClick: () => updateMutation.mutate({ 
            id: user._id, 
            userData: { role: "admin" } 
          })
        },
        {
          label: "Make Manager",
          onClick: () => updateMutation.mutate({ 
            id: user._id, 
            userData: { role: "manager" } 
          })
        },
        {
          label: "Make User",
          onClick: () => updateMutation.mutate({ 
            id: user._id, 
            userData: { role: "user" } 
          })
        },
        { label: "Cancel" }
      ]
    });
  };

  const handleDelete = (id) => {
    if (id === authData.userId) {
      toast.error("You can't delete yourself");
      return;
    }

    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this user?",
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
        <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
        {authData.userRole === "admin" && (
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none w-64"
            />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="border p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="">All Roles</option>
              <option value="user">User</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        )}
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {isLoading ? (
          [...Array(5)].map((_, i) => (
            <div key={i} className="p-4 border-b">
              <Skeleton height={30} count={4} />
            </div>
          ))
        ) : isError ? (
          <div className="p-6 text-red-500">{error.message}</div>
        ) : (
          <>
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">User</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Role</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data?.data?.map((user) => (
                  <tr key={user._id}>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 relative rounded-full overflow-hidden mr-4">
                          <Image
                            src={user.avatar}
                            alt={user.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 48px)"
                            unoptimized
                          />
                        </div>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.phone}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        user.role === "admin" ? "bg-red-100 text-red-800" :
                        user.role === "manager" ? "bg-blue-100 text-blue-800" :
                        "bg-gray-100 text-gray-800"
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {user.isVerified ? (
                        <span className="text-green-600 flex items-center">
                          <FaUnlock className="mr-2" /> Active
                        </span>
                      ) : (
                        <span className="text-red-600 flex items-center">
                          <FaLock className="mr-2" /> Inactive
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 space-x-2">
                      {authData.userRole === "admin" && user._id !== authData.userId && (
                        <>
                          {
                            user._id === authData.userId ?<button 
                           disabled
                            onClick={() => handleRoleUpdate(user)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <FaEdit className="text-xl"/>
                          </button>:<button 
                          
                          onClick={() => handleRoleUpdate(user)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <FaEdit className="text-xl"/>
                        </button>
                          }
                          <button
                            onClick={() => handleDelete(user._id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <FaTrash className="text-xl"/>
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-between items-center px-6 py-4 border-t">
              <span className="text-sm text-gray-700">
                Showing {data?.data?.length} of {data?.pagination?.totalUsers} users
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage(p => Math.max(p - 1, 1))}
                  disabled={page === 1}
                  className="px-4 py-2 border rounded-md disabled:opacity-50 hover:bg-gray-50"
                >
                  Previous
                </button>
                <span className="px-4 py-2">Page {page}</span>
                <button
                  onClick={() => setPage(p => p + 1)}
                  disabled={page >= data?.pagination?.totalPages}
                  className="px-4 py-2 border rounded-md disabled:opacity-50 hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Users;