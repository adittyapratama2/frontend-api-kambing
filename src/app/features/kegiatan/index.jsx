import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import React, { useEffect, useState } from "react";
import { FaRegClipboard, FaSearch } from "react-icons/fa";
import { IoFilterSharp } from "react-icons/io5";
import { LuArrowUpDown } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { HiDotsHorizontal } from "react-icons/hi";
import { useGetKegiatanQuery } from "../../../state/query/care";
import { useDeletePertumbuhanKambingMutation } from "../../../state/query/pertumbuhan";
import { useDeleteKesehatanKambingMutation } from "../../../state/query/kesehatan";
import { useDeletePemerahanKambingMutation } from "../../../state/query/pemerahan";
import { useDeleteProduksiSusuMutation } from "../../../state/query/produksiSusu";
import { useDeletePakanKandangMutation } from "../../../state/query/pakan";

const Kegiatan = () => {
  const [limit, setLimit] = useState(10);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const offset = 0; // Fixed limit of 10

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [deletePertumbuhan] = useDeletePertumbuhanKambingMutation();
  const [deleteKesehatan] = useDeleteKesehatanKambingMutation();
  const [deletePemerahan] = useDeletePemerahanKambingMutation();
  const [deleteProduksiSusu] = useDeleteProduksiSusuMutation();
  const [deletePakanKandang] = useDeletePakanKandangMutation();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const {
    data: kegiatan,
    isLoading,
    error,
  } = useGetKegiatanQuery({ limit, offset });

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setLimit((prevLimit) => prevLimit + 10); // Increment limit by 10
  };
  const [filterType, setFilterType] = useState("pertumbuhan");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    // Tampilkan dialog konfirmasi sebelum menghapus
    const confirmed = window.confirm(
      "Apakah Anda yakin ingin menghapus item ini?"
    );
    if (!confirmed) return;

    // Mapping filterType ke fungsi delete yang sesuai
    const deleteFunctions = {
      pakan_kandang: deletePakanKandang,
      pertumbuhan: deletePertumbuhan,
      kesehatan: deleteKesehatan,
      pemerahan: deletePemerahan,
      produksi_susu: deleteProduksiSusu,
    };

    const deleteFunction = deleteFunctions[filterType];

    if (!deleteFunction) {
      console.error("Unknown filter type");
      return;
    }

    try {
      await deleteFunction({ id });
      console.log(`${filterType} deleted successfully`);
      // Optional: Update state atau redirect setelah penghapusan
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  useEffect(() => {
    if (!isLoading && isLoadingMore) {
      setIsLoadingMore(false); // Reset loading state when not loading
    }
  }, [isLoading, isLoadingMore]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  const filteredKegiatan = (kegiatan[filterType]?.data || []).map((item) => {
    return (
      <div
        key={item.id}
        className="block rounded-lg bg-lightGreen shadow-secondary-1 text-surface"
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 bg-teal-600 rounded-lg shadow-md">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-semibold text-white">
              <FaRegClipboard />
            </span>
            <span className="text-md font-semibold text-white">
              {filterType === "pertumbuhan"
                ? "Pertumbuhan"
                : filterType === "kesehatan"
                ? "Kesehatan"
                : filterType === "pemerahan"
                ? "Pemerahan"
                : filterType === "produksi_susu"
                ? "Produksi Susu"
                : filterType === "pakan_kandang"
                ? "Pakan Kandang"
                : "Catatan"}
            </span>
          </div>
          <div className="relative inline-block text-left">
            <button
              onClick={toggleDropdown}
              className="text-2xl text-white cursor-pointer hover:text-teal-300 transition duration-200"
            >
              <HiDotsHorizontal />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg z-10">
                {/* <Link
                  to={`/dashboard/${
                    filterType === "pakan_kandang"
                      ? "pakan-kandang"
                      : filterType === "pertumbuhan"
                      ? "pertumbuhan-kambing"
                      : filterType === "kesehatan"
                      ? "kesehatan-kambing"
                      : filterType === "pemerahan"
                      ? "pemerahan-kambing"
                      : filterType === "produksi_susu"
                      ? "produksi-susu-kambing"
                      : ""
                  }/${item.id}`}
                  className="block px-4 py-2 text-gray-900 hover:bg-gray-100 transition duration-200"
                >
                  Lihat Detail
                </Link>
                <Link
                  to={`/dashboard/kegiatan/${
                    filterType === "pakan_kandang"
                      ? "pakan-kandang"
                      : filterType === "pertumbuhan"
                      ? "pertumbuhan-kambing"
                      : filterType === "kesehatan"
                      ? "kesehatan-kambing"
                      : filterType === "pemerahan"
                      ? "pemerahan-kambing"
                      : filterType === "produksi_susu"
                      ? "produksi-susu-kambing"
                      : ""
                  }/edit/${item.id}`}
                  className="block px-4 py-2 text-gray-900 hover:bg-gray-100 transition duration-200"
                >
                  Edit
                </Link> */}
                <button
                  className="block w-full text-left px-4 py-2 text-error hover:bg-gray-100 transition duration-200"
                  onClick={() => handleDelete(item.id)} // Perbaiki dengan arrow function
                >
                  Hapus
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-2 shadow-lg rounded-b-lg">
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

          {filterType === "pakan_kandang" && (
            <>
              <p className="text-sm text-gray-600">
                <strong>Tanggal Pencatatan:</strong>{" "}
                {item.tgl_transaksi || "N/A"}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Qty Pakan:</strong> {item.qty_pakan.toLocaleString()} kg
              </p>
              <p className="text-sm text-gray-600">
                <strong>Catatan:</strong> {item.catatan || "N/A"}
              </p>
            </>
          )}

          {filterType === "produksi_susu" && (
            <>
              <p className="text-sm text-gray-600">
                <strong>Tanggal Produksi:</strong>{" "}
                {item.tanggal_produksi || "N/A"}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Volume Susu:</strong> {item.volume_susu || "N/A"} liter
              </p>
              <p className="text-sm text-gray-600">
                <strong>Kualitas Susu:</strong> {item.kualitas_susu || "N/A"}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Periode Laktasi:</strong>{" "}
                {item.periode_laktasi || "N/A"}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Catatan Perah:</strong> {item.catatan || "N/A"}
              </p>
            </>
          )}

          {filterType === "kesehatan" && (
            <>
              <p className="text-sm text-gray-600">
                <strong>Tanggal Periksa:</strong>{" "}
                {item.tanggal_periksa || "N/A"}
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
      </div>
    );
  });

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 md:p-8 lg:p-10 max-w-4xl mx-auto">
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
                  setFilterType("produksi_susu");
                  setDropdownOpen(false);
                }}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                Produksi Susu
              </div>
              <div
                onClick={() => {
                  setFilterType("pakan_kandang");
                  setDropdownOpen(false);
                }}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                Pakan Kandang
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
                  pertumbuhan: "Belum ada kegiatan pertumbuhan.",
                  pemerahan: "Belum ada kegiatan pemerahan.",
                  produksi_susu: "Belum ada kegiatan produksi susu.",
                  pakan_kandang: "Belum ada kegiatan pakan kandang.",
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
        <div className="flex justify-center">
          <button
            className="p-2 mb-4 bg-primary rounded-full text-white"
            onClick={handleLoadMore}
            disabled={isLoadingMore}
          >
            {isLoadingMore ? "Loading..." : "Load More"}
          </button>
        </div>
        <div>&nbsp;</div>
      </div>
    </div>
  );
};

export default Kegiatan;
