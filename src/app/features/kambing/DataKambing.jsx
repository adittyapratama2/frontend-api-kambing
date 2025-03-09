import {
  useDeleteKambingMutation,
  useGetKambingQuery,
} from "../../../state/query/kambing";
import { Link, useNavigate } from "react-router-dom";
import { FaEllipsisV, FaMars, FaSearch, FaVenus } from "react-icons/fa";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import { LuArrowUpDown } from "react-icons/lu";
import { IoFilterSharp } from "react-icons/io5";
import { IoIosMore } from "react-icons/io";
import { useState } from "react";

const DataKambing = () => {
  const { data: kambings, isLoading, error } = useGetKambingQuery();
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState("kambing"); // Default filter
  const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown open state
  const [hapusKambing] = useDeleteKambingMutation();

  const handleDelete = async (id) => {
    if (window.confirm("Apakah yakin mau menghapus data ini?")) {
      try {
        await hapusKambing({ id }).unwrap();
        console.log("Kambing deleted successfully");
      } catch (error) {
        console.log("Failed to delete Kambing Tahun:", error);
      }
    }
  };

  const [openDropdownId, setOpenDropdownId] = useState(null);

  const toggleDropdown = (id) => {
    // If the clicked dropdown is already open, close it; otherwise, open the clicked one
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  // Filter kambings based on the selected type
  const filteredKambings = (kambings.data[filterType] || []).map((kambing) => {
    // Determine gender icon based on the filter type
    let genderIcon;
    let detailKambing;
    if (filterType === "induk_betina") {
      genderIcon = (
        <div className="bg-pink rounded-full flex items-center justify-center w-10 h-10">
          <FaVenus className="text-white w-6 h-6" />
        </div>
      );
      detailKambing = (
        <div className="relative inline-block text-left">
          <button
            onClick={() => toggleDropdown(kambing.id)} // Pass kambing.id to identify which dropdown to toggle
            className="text-xl text-textSecondary cursor-pointer hover:text-teal-300 transition duration-200"
          >
            <FaEllipsisV />
          </button>
          {openDropdownId === kambing.id && ( // Check if the current kambing.id is the open dropdown
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg z-10">
              <Link
                to={`/dashboard/induk-kambing-betina/${kambing.id}`}
                className="block px-4 py-2 text-gray-900 hover:bg-gray-100 transition duration-200"
              >
                Lihat Detail
              </Link>
              <Link
                to={`/dashboard/induk-kambing-betina/edit/${kambing.id}`}
                className="block px-4 py-2 text-gray-900 hover:bg-gray-100 transition duration-200"
              >
                Ubah Data
              </Link>
              <button
                className="block w-full text-left px-4 py-2 text-error hover:bg-gray-100 transition duration-200"
                onClick={() => handleDelete(kambing.id)}
              >
                Hapus
              </button>
            </div>
          )}
        </div>
      );
    } else if (filterType === "induk_pejantan") {
      genderIcon = (
        <div className="bg-secondary rounded-full flex items-center justify-center w-10 h-10">
          <FaMars className="text-primary w-6 h-6" />
        </div>
      );
      detailKambing = (
        <div className="relative inline-block text-left">
          <button
            onClick={() => toggleDropdown(kambing.id)} // Pass kambing.id to identify which dropdown to toggle
            className="text-xl text-textSecondary cursor-pointer hover:text-teal-300 transition duration-200"
          >
            <FaEllipsisV />
          </button>
          {openDropdownId === kambing.id && ( // Check if the current kambing.id is the open dropdown
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg z-10">
              <Link
                to={`/dashboard/kambing-pejantan/${kambing.id}`}
                className="block px-4 py-2 text-gray-900 hover:bg-gray-100 transition duration-200"
              >
                Lihat Detail
              </Link>
              <Link
                to={`/dashboard/kambing-pejantan/edit/${kambing.id}`}
                className="block px-4 py-2 text-gray-900 hover:bg-gray-100 transition duration-200"
              >
                Ubah Data
              </Link>
              <button
                className="block w-full text-left px-4 py-2 text-error hover:bg-gray-100 transition duration-200"
                onClick={() => handleDelete(kambing.id)}
              >
                Hapus
              </button>
            </div>
          )}
        </div>
      );
    } else if (filterType === "kambing") {
      // Assuming first_kambing has its own structure, handle accordingly
      genderIcon = (
        <div className="bg-gray-300 rounded-full flex items-center justify-center w-10 h-10">
          {kambing.jenis_kelamin === "jantan" ? (
            <div className="bg-secondary rounded-full flex items-center justify-center w-10 h-10">
              <FaMars className="text-primary w-6 h-6" />
            </div>
          ) : (
            <div className="bg-pink rounded-full flex items-center justify-center w-10 h-10">
              <FaVenus className="text-white w-6 h-6" />
            </div>
          )}
        </div>
      );
      detailKambing = (
        <div className="relative inline-block text-left">
          <button
            onClick={() => toggleDropdown(kambing.id)} // Pass kambing.id to identify which dropdown to toggle
            className="text-xl text-textSecondary cursor-pointer hover:text-teal-300 transition duration-200"
          >
            <FaEllipsisV />
          </button>
          {openDropdownId === kambing.id && ( // Check if the current kambing.id is the open dropdown
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg z-10">
              <Link
                to={`/dashboard/kambing/${kambing.id}`}
                className="block px-4 py-2 text-gray-900 hover:bg-gray-100 transition duration-200"
              >
                Lihat Detail
              </Link>
              <Link
                to={`/dashboard/kambing/edit/${kambing.id}`}
                className="block px-4 py-2 text-gray-900 hover:bg-gray-100 transition duration-200"
              >
                Ubah Data
              </Link>
              <button
                className="block w-full text-left px-4 py-2 text-error hover:bg-gray-100 transition duration-200"
                onClick={() => handleDelete(kambing.id)}
              >
                Hapus
              </button>
            </div>
          )}
        </div>
      );
    }

    return (
      <div
        key={kambing.id}
        className="flex items-center justify-between bg-white p-8 rounded-lg shadow"
      >
        <div className="flex items-center">
          {/* Gender Icon */}
          <div className="mr-4">{genderIcon}</div>

          {/* Kambing Info */}
          <div>
            <h2 className="text-lg font-semibold text-textPrimary">
              {kambing.noTag}
            </h2>
            <h3 className="text-md font-semibold text-textPrimary">
              {kambing.nama_kambing}
            </h3>
            <p className="text-xs mt-1 p-1 bg-darkGrey rounded-full inline-block">
              {kambing.ras}
            </p>
          </div>
        </div>

        {/* More Options */}
        {detailKambing}
      </div>
    );
  });

  return (
    <div className="min-h-screen p-2 bg-white">
      {/* Header and Create Button */}
      <div className="sticky top-0 bg-white z-10 p-2">
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate("/dashboard")}
            className="rounded-full text-primary hover:bg-white hover:text-black transition"
          >
            <ArrowLeftIcon className="w-6 h-6" />
          </button>
          <h1 className="p-2 font-bold text-textPrimary mx-auto">Kambing</h1>
          <Link to={"/dashboard/kambing/buat-baru"}>
            <button className="inline-flex items-center text-primary">
              Tambah
            </button>
          </Link>
        </div>
      </div>

      {/* Search and Filter Options */}
      <div className="flex items-center mt-5 relative">
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
        <div className="relative">
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="border-none bg-grey rounded-full shadow-sm p-2 text-sm flex items-center"
          >
            <IoFilterSharp className="h-4 w-4 text-gray mr-1" />
            Filter
          </button>
          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 bg-white shadow-lg rounded-lg mt-2 z-20">
              <div
                onClick={() => {
                  setFilterType("induk_betina");
                  setDropdownOpen(false);
                }}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                Induk Betina
              </div>
              <div
                onClick={() => {
                  setFilterType("induk_pejantan");
                  setDropdownOpen(false);
                }}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                Induk Pejantan
              </div>
              <div
                onClick={() => {
                  setFilterType("kambing");
                  setDropdownOpen(false);
                }}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                Kambing
              </div>
            </div>
          )}
        </div>
      </div>

      {/* List of Kambing */}
      <div className="space-y-4 mt-4">
        {filteredKambings.length > 0 ? (
          filteredKambings
        ) : (
          <div className="text-center py-8">
            <h3 className="text-lg font-semibold text-textPrimary">
              {filterType === "induk_betina"
                ? "Belum ada kambing Induk Betina."
                : filterType === "induk_pejantan"
                ? "Belum ada kambing Induk Jantan."
                : "Belum ada kambing."}
            </h3>
            <p className="text-sm">
              Disini anda akan melihat daftar kambing yang anda tambahkan.
            </p>
            <Link to={"/dashboard/kambing/buat-baru"}>
              <button className="mt-4 p-4 bg-primary rounded-full text-white">
                Tambah Sekarang
              </button>
            </Link>
          </div>
        )}
        <>&nbsp;</>
      </div>
    </div>
  );
};

export default DataKambing;
