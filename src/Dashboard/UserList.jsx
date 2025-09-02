import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { debounce } from "lodash"; 
import {
  SearchIcon
} from "lucide-react";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5; // Number of users to display per page

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setLoading(false);
      });
  }, []);

  // Debounce search input
  const debouncedSearch = debounce((value) => {
    setSearch(value);
    setCurrentPage(1); 
  }, 300);

  const handleSearchChange = (e) => {
    debouncedSearch(e.target.value);
  };

  // Filter users by name or email
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  // Calculate pagination details
  const totalUsers = filteredUsers.length;
  const totalPages = Math.ceil(totalUsers / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Generate page numbers for pagination
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h3 className="text-5xl font-extrabold bg-gradient-to-r from-white via-purple-400 to-cyan-500 text-transparent bg-clip-text mb-4">
          User List
        </h3>
      </div>
      {/* 🔍 Search Bar */}
          <div className="flex mb-4 gap-2">
              
              <input
                  
          type="text"
          placeholder="Search by name or email..."
          onChange={handleSearchChange}
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Search users by name or email"
        />
        
        <button
          onClick={() => {
            setSearch("");
            setCurrentPage(1);
          }}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-150"
        >
          Clear
        </button>
      </div>

      {/* 📋 User Table */}
      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse shadow-lg">
              <thead>
                <tr className="bg-gray-200 text-blue-900 text-base font-semibold">
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Company</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.length > 0 ? (
                  currentUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b hover:bg-green-800 hover:text-blue-200 transition duration-200"
                    >
                      <td className="p-3">
                        <Link
                          to={`/users/${user.id}`}
                          className="text-gray-300 font-medium hover:text-blue-600 hover:underline transition duration-150"
                        >
                          {user.name}
                        </Link>
                        <p className="text-sm text-gray-200">
                          @{user.username}
                        </p>
                      </td>
                      <td className="p-3 text-gray-300 text-center">
                        {user.email}
                      </td>
                      <td className="p-3 text-gray-300 text-center">
                        {user.phone}
                      </td>
                      <td className="p-3 text-gray-300 text-center">
                        {user.company.name}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center p-4 text-gray-500">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6 gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-150 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              {pageNumbers.map((number) => (
                <button
                  key={number}
                  onClick={() => handlePageChange(number)}
                  className={`px-4 py-2 rounded-lg transition duration-150 ${
                    currentPage === number
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-blue-900 hover:bg-blue-100"
                  }`}
                >
                  {number}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-150 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
