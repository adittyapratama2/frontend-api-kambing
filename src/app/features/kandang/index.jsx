import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGetKandangQuery } from "../../../state/query/kandang";
import { FaSearch } from "react-icons/fa";
import { LuArrowUpDown } from "react-icons/lu";
import { IoFilterSharp } from "react-icons/io5";
import { IoIosMore } from "react-icons/io";
import { PiBarnLight } from "react-icons/pi";

const DataKandang = () => {
  const { data: kandang, isLoading, error } = useGetKandangQuery();
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
          <h1 className="p-2 font-bold text-textPrimary mx-auto">Kandang</h1>
          {/* Added mx-auto */}
          <Link to={"/dashboard/kandang-kambing/buat-baru"}>
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

      {/* List of Kandang */}
      <div className="space-y-4 mt-4">
        {kandang.length > 0 ? (
          kandang.map((kandang, index) => (
            <div
              key={kandang.id}
              className="flex items-center justify-between bg-white p-8 rounded-lg shadow"
            >
              <div className="flex items-center">
                <div className="mr-4">
                  <div className="bg-secondary rounded-full flex items-center justify-center w-10 h-10">
                    <PiBarnLight className="text-primary w-6 h-6" />
                  </div>
                </div>

                {/* Kambing Info */}
                <div>
                  <h2 className="text-lg font-semibold text-textPrimary">
                    {kandang.nama_kandang}
                  </h2>
                  <h3 className="text-md font-semibold text-textPrimary">
                    {kandang.lokasi}
                  </h3>
                </div>
              </div>

              {/* More Options */}
              <Link to={`/dashboard/kandang-kambing/${kandang.id}`}>
                <button className="text-gray-400 hover:text-gray-600">
                  <IoIosMore />
                </button>
              </Link>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <h3 className="text-lg font-semibold text-textPrimary">
              Belum ada kandang.
            </h3>
            <p className="text-sm">
              Disini anda akan melihat daftar kandang yang anda tambahkan.
            </p>
            <Link to={"/dashboard/kandang-kambing/buat-baru"}>
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

export default DataKandang;
