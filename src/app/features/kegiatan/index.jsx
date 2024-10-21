import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoFilterSharp } from "react-icons/io5";
import { LuArrowUpDown } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useGetKegiatanQuery } from "../../../state/query/care";

const Kegiatan = () => {
  const { data: kegiatan, isLoading, error } = useGetKegiatanQuery();
  const [filterType, setFilterType] = useState("all");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  const filteredKegiatan = (kegiatan[filterType]?.data || []).map((item) => {
    return (
      <div
        key={item.id}
        className="p-4 mb-4 rounded-lg shadow-lg bg-white border border-gray-200"
      >
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-500">
              ID Kambing: {item.id_kambing || "N/A"}
            </p>
          </div>
          <div className="flex items-center">
            <span className="px-2 py-1 text-xs font-semibold text-white bg-teal-500 rounded-lg">
              Vaksin
            </span>
            <div className="ml-2 text-gray-400 cursor-pointer">...</div>
          </div>
        </div>

        {filterType === "pertumbuhan" && (
          <>
            <p className="text-sm text-gray-600">
              <strong>Tanggal Pencatatan:</strong>{" "}
              {item.tanggal_pencatatan || "N/A"}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Berat Badan:</strong> {item.berat_badan} kg
            </p>
            <p className="text-sm text-gray-600">
              <strong>Tinggi Badan:</strong> {item.tinggi_badan || "N/A"} cm
            </p>
            <p className="text-sm text-gray-600">
              <strong>Lingkar Dada:</strong> {item.lingkar_dada || "N/A"} cm
            </p>
            <p className="text-sm text-gray-600">
              <strong>Kondisi Fisik:</strong> {item.kondisi_fisik || "N/A"}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Catatan:</strong> {item.catatan || "N/A"}
            </p>
          </>
        )}

        {filterType === "pemerahan" && (
          <>
            <p className="text-sm text-gray-600">
              <strong>Tanggal Perah:</strong> {item.tanggal_perah || "N/A"}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Volume Susu:</strong> {item.volume_susu || "N/A"} liter
            </p>
            <p className="text-sm text-gray-600">
              <strong>Kualitas Susu:</strong> {item.kualitas_susu || "N/A"}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Catatan Perah:</strong> {item.catatan_perah || "N/A"}
            </p>
          </>
        )}

        {filterType === "kesehatan" && (
          <>
            <p className="text-sm text-gray-600">
              <strong>Tanggal Periksa:</strong> {item.tanggal_periksa || "N/A"}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Diagnosa:</strong> {item.diagnosa || "N/A"}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Pengobatan:</strong> {item.pengobatan || "N/A"}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Vaksinasi:</strong> {item.vaksinasi || "N/A"}
            </p>
          </>
        )}
      </div>
    );
  });

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
          <h1 className="p-2 font-bold text-textPrimary mx-auto">Kegiatan</h1>
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
                  setFilterType("all");
                  setDropdownOpen(false);
                }}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                Semua
              </div>
              <div
                onClick={() => {
                  setFilterType("pertumbuhan");
                  setDropdownOpen(false);
                }}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                Pertumbuhan
              </div>
              <div
                onClick={() => {
                  setFilterType("pemerahan");
                  setDropdownOpen(false);
                }}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                Pemerahan
              </div>
              <div
                onClick={() => {
                  setFilterType("kesehatan");
                  setDropdownOpen(false);
                }}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                Kesehatan
              </div>
            </div>
          )}
        </div>
      </div>

      {/* List of Kambing */}
      <div className="space-y-4 mt-4">
        {filteredKegiatan.length > 0 ? (
          filteredKegiatan
        ) : (
          <div className="text-center py-8">
            <h3 className="text-lg font-semibold text-textPrimary">
              {(() => {
                const messages = {
                  all: "Belum ada kegiatan.",
                  pertumbuhan: "Belum ada kegiatan pertumbuhan.",
                  pemerahan: "Belum ada kegiatan pemerahan.",
                  kesehatan: "Belum ada kegiatan kesehatan.",
                };

                return messages[filterType] || "Belum ada kegiatan."; // Default message if filterType is not recognized
              })()}
            </h3>
            <p className="text-sm">
              Disini anda akan melihat daftar kambing yang anda tambahkan.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Kegiatan;
