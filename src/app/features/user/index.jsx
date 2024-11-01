import React, { useState } from "react";
import { useGetUserQuery } from "../../../state/query/user";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import { FaEllipsisV, FaSearch, FaUser } from "react-icons/fa";
import { LuArrowUpDown } from "react-icons/lu";
import { IoFilterSharp } from "react-icons/io5";
import { IoIosMore } from "react-icons/io";

const UserIndex = () => {
  const { data: users, isLoading, error } = useGetUserQuery();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const navigate = useNavigate();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  return (
    <div className="min-h-screen bg-white p-2">
      {/* Header and Create Button */}
      <div className="sticky top-0 bg-white z-10 p-2">
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate("/dashboard")}
            className="rounded-full text-primary hover:bg-white hover:text-black transition"
          >
            <ArrowLeftIcon className="w-6 h-6" />
          </button>
          <h1 className="p-2 font-bold text-textPrimary mx-auto">
            User Management
          </h1>
          {/* Added mx-auto */}
          <Link to={"/dashboard/user-management/baru"}>
            <button className="inline-flex items-center text-primary">
              Tambah
            </button>
          </Link>
        </div>
      </div>

      {/* Search and Filter Options */}
      <div className="flex items-center mt-2 relative">
        <input
          type="text"
          placeholder=" Cari"
          className="flex-1 px-4 py-4 pl-10 border-none bg-grey rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray" />
      </div>
      <div className="flex items-center mt-4 justify-between relative w-full">
        <span className="border-none bg-grey rounded-full shadow-sm p-2 text-sm flex items-center">
          <LuArrowUpDown className="h-4 w-4 text-gray mr-1" />
          Urutkan
        </span>
        <span className="border-none bg-grey rounded-full shadow-sm p-2 text-sm flex items-center">
          <IoFilterSharp className="h-4 w-4 text-gray mr-1" />
          Filter
        </span>
      </div>

      <div className="space-y-4 mt-4">
        {users.length > 0 ? (
          users.map((user, index) => (
            <div
              key={user.id}
              className="flex items-center justify-between bg-white p-8 rounded-lg shadow"
            >
              <div className="flex items-center">
                <div className="mr-4">
                  <div className="bg-secondary rounded-full flex items-center justify-center w-10 h-10">
                    <FaUser className="text-primary w-6 h-6" />
                  </div>
                </div>

                {/* Kambing Info */}
                <div>
                  <h2 className="text-lg font-semibold text-textPrimary">
                    {user.name}
                  </h2>
                  <h3 className="text-md font-semibold text-textPrimary">
                    {user.username}
                  </h3>
                  <p className="text-xs mt-1 p-1 bg-darkGrey rounded-full inline-block">
                    {user.role}
                  </p>
                </div>
              </div>

              {/* More Options */}
              <div className="relative inline-block text-left">
                <button
                  onClick={toggleDropdown}
                  className="text-xl text-textSecondary cursor-pointer hover:text-teal-300 transition duration-200"
                >
                  <FaEllipsisV />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg z-10">
                    <Link
                      to={`/dashboard/user-management/${user.id}`}
                      className="block px-4 py-2 text-gray-900 hover:bg-textSecondary transition duration-200"
                    >
                      Lihat Detail
                    </Link>
                    <Link
                      to={`/dashboard/user-management/edit/${user.id}`}
                      className="block px-4 py-2 text-gray-900 hover:bg-textSecondary transition duration-200"
                    >
                      Ubah Data
                    </Link>
                    <button
                      className="block w-full text-left px-4 py-2 text-error hover:bg-textSecondary transition duration-200"
                      onClick={() => {
                        // Handle delete action here
                        console.log("Hapus clicked");
                      }}
                    >
                      Hapus
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <h3 className="text-lg font-semibold text-textPrimary">
              Belum ada user.
            </h3>
            <p className="text-sm">
              Disini anda akan melihat daftar user yang anda tambahkan.
            </p>
            <Link to={"/dashboard/user-management/baru"}>
              <button className="mt-4 p-4 bg-primary rounded-full text-white">
                Tambah Sekarang
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserIndex;
