import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import Select from 'react-select';
import { FaEye } from 'react-icons/fa'; // Import the eye icon from react-icons
import Modal from '../Modal';
// import Modal from './Modal'; // Import your Modal component

function Users() {
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false); // To control modal visibility
  const [modalContent, setModalContent] = useState(null); // Content of the modal
  const [selectedUser, setSelectedUser] = useState(null); // The selected user for viewing details

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/auth?page=${page}&limit=10&search=${search}&role=${roleFilter}`);
      setUsers(response.data.data);
      setTotalPages(response.data.pagination.totalPages);
    } catch (error) {
      console.error('Error fetching users', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, search, roleFilter]);

  const handleSearchChange = (e) => setSearch(e.target.value);

  const handleRoleFilterChange = (selectedOption) => setRoleFilter(selectedOption ? selectedOption.value : '');

  const handlePageChange = (selectedPage) => setPage(selectedPage.selected + 1);

  const openUserDetailsModal = (user) => {
    setSelectedUser(user);
    setModalContent(
      <div>
        <h3 className="font-semibold text-xl">User Details</h3>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p><strong>Created At:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
        {/* Add more fields as needed */}
        <button 
          onClick={closeModal} 
          className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
        >
          Close
        </button>
      </div>
    );
    setShowModal(true);
  };

  const openUpdateModal = (user) => {
    setSelectedUser(user);
    setModalContent(
      <div>
        <h3>Update User Role</h3>
        <input 
          type="text" 
          value={user.name} 
          readOnly
          className="mb-2 p-2 border border-gray-300 rounded"
        />
        <input 
          type="text" 
          value={user.email} 
          readOnly
          className="mb-2 p-2 border border-gray-300 rounded"
        />
        {/* Update role, add additional fields as needed */}
        <button onClick={closeModal} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
          Save Changes
        </button>
      </div>
    );
    setShowModal(true);
  };

  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setModalContent(
      <div>
        <h3>Are you sure you want to delete this user?</h3>
        <button 
          onClick={handleDeleteUser} 
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Yes, Delete
        </button>
        <button 
          onClick={closeModal} 
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    );
    setShowModal(true);
  };

  const handleDeleteUser = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/auth/${selectedUser._id}`);
      fetchUsers(); // Refresh the list after deletion
      closeModal(); // Close the modal
    } catch (error) {
      console.error('Error deleting user', error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setModalContent(null);
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex space-x-4 mb-6">
        <input 
          type="text" 
          placeholder="Search by name or email" 
          value={search} 
          onChange={handleSearchChange}
          className="p-2 w-64 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Select
          options={[
            { value: '', label: 'All Roles' },
            { value: 'user', label: 'User' },
            { value: 'manager', label: 'Manager' },
            { value: 'admin', label: 'Admin' },
          ]}
          onChange={handleRoleFilterChange}
          placeholder="Filter by role"
          className="w-64"
        />
      </div>

      <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-3 px-6 text-left text-gray-700">Name</th>
            <th className="py-3 px-6 text-left text-gray-700">Email</th>
            <th className="py-3 px-6 text-left text-gray-700">Role</th>
            <th className="py-3 px-6 text-left text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="hover:bg-gray-50 transition-colors duration-300">
              <td className="py-3 px-6 text-gray-800">{user.name}</td>
              <td className="py-3 px-6 text-gray-800">{user.email}</td>
              <td className="py-3 px-6 text-gray-800">{user.role}</td>
              <td className="py-3 px-6 space-x-2">
                <button 
                  onClick={() => openUserDetailsModal(user)} 
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <FaEye /> View Details
                </button>
                <button 
                  onClick={() => openUpdateModal(user)} 
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                >
                  Update Role
                </button>
                <button 
                  onClick={() => openDeleteModal(user)} 
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6 flex justify-center">
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={'...'}
          pageCount={totalPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={'flex space-x-4'}
          pageClassName={'py-2 px-4 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition-colors'}
          activeClassName={'bg-blue-600'}
          previousClassName={'py-2 px-4 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition-colors'}
          nextClassName={'py-2 px-4 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition-colors'}
        />
      </div>

      <Modal showModal={showModal} closeModal={closeModal}>
        {modalContent}
      </Modal>
    </div>
  );
}

export default Users;
