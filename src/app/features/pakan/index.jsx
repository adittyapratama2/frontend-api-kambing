import moment from "moment";
import React, { useState } from "react";
import { useGetPakanKandangQuery } from "../../../state/query/pakan";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import { FaRegClipboard, FaSearch } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";
import { LuClover } from "react-icons/lu";
import { HiDotsHorizontal } from "react-icons/hi";

const PakanKandang = () => {
  // Set default values to the current month
  const [startDate, setStartDate] = useState(
    moment().startOf("month").format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState(
    moment().endOf("month").format("YYYY-MM-DD")
  );

  const {
    data: pakan,
    isLoading,
    error,
  } = useGetPakanKandangQuery({ startDate, endDate });
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
            Pakan Kandang
          </h1>
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

      <div className="mt-2 flex items-center space-x-4">
        <div className="flex-1  py-2 px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Tgl Mulai:
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="block w-full p-3 text-xs text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="flex-1 py-2 px-2">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Tgl Akhir:
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="block w-full p-3 text-xs text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm"
          />
        </div>
      </div>

      <div className="space-y-4 mt-4">
        {pakan.length > 0 ? (
          pakan.map((item, index) => (
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
                    Pakan {item.pakanKandang.nama_kandang}
                  </span>
                </div>
                <div className="text-2xl text-white cursor-pointer hover:text-teal-300 transition duration-200">
                  <HiDotsHorizontal />
                </div>
              </div>
              <div className="bg-white p-2 shadow-lg rounded-b-lg">
                <p className="text-sm text-gray-600">
                  <strong>Tanggal Pencatatan:</strong>{" "}
                  {item.tgl_transaksi || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Qty Pakan:</strong> {item.qty_pakan.toLocaleString()}{" "}
                  kg
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Catatan:</strong> {item.catatan || "N/A"}
                </p>
                <div>&nbsp;</div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <h3 className="text-lg font-semibold text-textPrimary">
              Belum ada catatan pakan.
            </h3>
            <p className="text-sm">
              Disini anda akan melihat daftar catatan pakan kandang yang anda
              tercatat.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PakanKandang;
