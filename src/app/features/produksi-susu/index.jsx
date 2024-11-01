import React, { useState } from "react";
import { useGetProduksiSusuQuery } from "../../../state/query/produksiSusu";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import moment from "moment/moment";
import { FaSearch } from "react-icons/fa";
import { LuArrowUpDown, LuClover } from "react-icons/lu";
import { IoFilterSharp } from "react-icons/io5";
import { IoIosMore } from "react-icons/io";

const ListProduksiSusu = () => {
  // Set default values to the current month
  const [startDate, setStartDate] = useState(
    moment().startOf("month").format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState(
    moment().endOf("month").format("YYYY-MM-DD")
  );

  const {
    data: susu,
    isLoading,
    error,
  } = useGetProduksiSusuQuery({ startDate, endDate });
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
            Produksi Susu
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
        {susu.length > 0 ? (
          susu.map((susu, index) => (
            <div
              key={susu.id}
              className="flex items-center justify-between bg-white p-8 rounded-lg shadow"
            >
              <div className="flex items-center">
                <div className="mr-4">
                  <div className="bg-secondary rounded-full flex items-center justify-center w-10 h-10">
                    <LuClover className="text-primary w-6 h-6" />
                  </div>
                </div>

                {/* Kambing Info */}
                <div>
                  <h2 className="text-lg font-semibold text-textPrimary">
                    {susu.kawinBetina.nama_kambing} &{" "}
                    {susu.kawinJantan.nama_kambing}
                  </h2>
                  <h3 className="text-md font-semibold text-textPrimary">
                    {susu.kawinKambing.nama_kambing}
                  </h3>
                  <p className="text-xs mt-1 p-1 bg-darkGrey rounded-full inline-block">
                    {susu.status_perkawinan == 1
                      ? "Berhasil"
                      : "Status Tidak Dikenal"}
                  </p>
                </div>
              </div>

              {/* More Options */}
              <button className="text-gray-400 hover:text-gray-600">
                <IoIosMore />
              </button>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <h3 className="text-lg font-semibold text-textPrimary">
              Belum ada produksi susu.
            </h3>
            <p className="text-sm">
              Disini anda akan melihat daftar produksi susu yang anda tercatat.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListProduksiSusu;
