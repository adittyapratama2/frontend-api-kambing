import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import moment from "moment";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import {
  useGetLaporanAllQuery,
  useGetLaporanBySearchKambingQuery,
} from "../../../state/query/laporan";

const LaporanKambing = () => {
  const [keyword, setKeyword] = useState("");

  const { data: laporan, isLoading, error } = useGetLaporanAllQuery();

  const {
    data: searchResult,
    isLoading: searchLoad,
    error: errorSearch,
  } = useGetLaporanBySearchKambingQuery(
    { keyword },
    { skip: !keyword /* <- Here is the solution  */ }
  );

  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  return (
    <div className="min-h-screen bg-white p-2">
      {/* Header and Back Button */}
      <div className="sticky top-0 bg-white z-10 p-2">
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate("/dashboard")}
            className="rounded-full text-primary hover:bg-white hover:text-black transition"
          >
            <ArrowLeftIcon className="w-6 h-6" />
          </button>
          <h1 className="p-2 font-bold text-textPrimary mx-auto">Laporan</h1>
        </div>
      </div>

      {/* Search and Filter Options */}
      <div className="flex items-center mt-2 relative">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Cari berdasarkan nama"
          className="flex-1 px-4 py-4 pl-10 border-none bg-grey rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray" />
      </div>

      {/* Conditional Dropdown Result List */}
      {keyword && (
        <div className="mt-4">
          {searchLoad ? (
            <div>Loading search results...</div>
          ) : errorSearch ? (
            <div>Error fetching search results</div>
          ) : searchResult ? (
            <div>
              {/* Render Kandang Results */}
              {searchResult.kandang.length > 0 && (
                <div>
                  <h3 className="font-bold">Kandang</h3>
                  <ul className="p-2">
                    {searchResult.kandang.map((item) => (
                      <li
                        key={item.id}
                        className="flex justify-between items-center p-2 bg-white rounded-md shadow-md mb-2"
                      >
                        <span>
                          {item.nama_kandang} - {item.lokasi}
                        </span>
                        <Link
                          to={`/laporan/kandang/${item.id}`}
                          className="text-blue-500 hover:text-blue-700 text-sm underline"
                        >
                          Report
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Render Goats Results */}
              {searchResult.goats.length > 0 && (
                <div>
                  <h3 className="font-bold">Goats</h3>
                  <ul className="p-2">
                    {searchResult.goats.map((item) => (
                      <li
                        key={item.id}
                        className="flex justify-between items-center p-2 bg-white rounded-md shadow-md mb-2"
                      >
                        <span>
                          {item.noTag} - {item.nama_kambing}
                        </span>
                        <Link
                          to={`/dashboard/laporan-kambing/detail/${item.id}`}
                          className="text-blue-500 hover:text-blue-700 text-sm underline"
                        >
                          Report
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Render Induk Betina Results */}
              {searchResult.induk_betina.length > 0 && (
                <div>
                  <h3 className="font-bold">Induk Betina</h3>
                  <ul className="p-2">
                    {searchResult.induk_betina.map((item) => (
                      <li
                        key={item.id}
                        className="flex justify-between items-center p-2 bg-white rounded-md shadow-md mb-2"
                      >
                        <span>
                          {item.noTag} - {item.nama_kambing} ({item.ras})
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Render Induk Pejantan Results */}
              {searchResult.induk_pejantan.length > 0 && (
                <div>
                  <h3 className="font-bold">Induk Pejantan</h3>
                  <ul className="p-2">
                    {searchResult.induk_pejantan.map((item) => (
                      <li
                        key={item.id}
                        className="flex justify-between items-center p-2 bg-white rounded-md shadow-md mb-2"
                      >
                        <span>
                          {item.noTag} - {item.nama_kambing} ({item.ras})
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* If no results found in any category */}
              {searchResult.kandang.length === 0 &&
                searchResult.goats.length === 0 &&
                searchResult.induk_betina.length === 0 &&
                searchResult.induk_pejantan.length === 0 && (
                  <div className="text-gray-500 mt-2">No results found</div>
                )}
            </div>
          ) : (
            <div className="text-gray-500 mt-2">No results found</div>
          )}
        </div>
      )}

      {/* Report Data */}
      <div className="space-y-4 mt-4">
        {/* Counts Summary */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4 p-2">
          {/* Total Kambing */}
          <div className="bg-primary p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl text-white">
            <h3 className="font-bold text-lg">Total Kambing</h3>
            <p className="text-3xl font-semibold">{laporan.counts.goats}</p>
            <p className="text-sm opacity-80">Jumlah total seluruh kambing</p>
          </div>

          {/* Total Induk Kambing */}
          <div className="bg-lightGreen p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl text-white">
            <h3 className="font-bold text-lg">Total Induk Kambing</h3>
            <p className="text-3xl font-semibold">
              {laporan.counts.indukKambing}
            </p>
            <p className="text-sm opacity-80">
              Kambing betina yang dapat beranak
            </p>
          </div>

          {/* Total Pejantan Kambing */}
          <div className="bg-warning p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl text-white">
            <h3 className="font-bold text-lg">Total Pejantan Kambing</h3>
            <p className="text-3xl font-semibold">
              {laporan.counts.pejantanKambing}
            </p>
            <p className="text-sm opacity-80">Kambing jantan yang siap kawin</p>
          </div>

          {/* Total Kandang */}
          <div className="bg-error p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl text-white">
            <h3 className="font-bold text-lg">Total Kandang</h3>
            <p className="text-3xl font-semibold">{laporan.counts.kandang}</p>
            <p className="text-sm opacity-80">Jumlah kandang yang tersedia</p>
          </div>
        </div>

        {/* Details Section */}
        <div className="mt-6 p-2 bg-gray-50 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Details</h3>

          {/* Goats */}
          {laporan.details.goats && (
            <div className="mb-6">
              <h4 className="font-bold text-gray-600 mb-2">Kambing</h4>
              <ul className="space-y-2">
                {laporan.details.goats.map((goat) => (
                  <li
                    key={goat.id}
                    className="flex justify-between items-center p-2 bg-white rounded-md shadow-md"
                  >
                    <span>
                      {goat.noTag} - {goat.nama_kambing}{" "}
                    </span>
                    <p>
                      {" "}
                      {goat.jenis_kelamin === "jantan" ? "Jantan" : "Betina"}
                    </p>
                    <Link
                      to={`/dashboard/laporan-kambing/detail/${goat.id}`}
                      className="text-blue-500 hover:text-blue-700 text-sm underline"
                    >
                      Report
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Induk Kambing */}
          {laporan.details.indukKambing && (
            <div className="mb-6">
              <h4 className="font-bold text-gray-600 mb-2">Induk Kambing</h4>
              <ul className="space-y-2">
                {laporan.details.indukKambing.map((induk) => (
                  <li
                    key={induk.id}
                    className="flex justify-between items-center p-2 bg-white rounded-md shadow-md"
                  >
                    <span>
                      {induk.noTag} - {induk.nama_kambing}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Pejantan Kambing */}
          {laporan.details.pejantanKambing && (
            <div className="mb-6">
              <h4 className="font-bold text-gray-600 mb-2">Pejantan Kambing</h4>
              <ul className="space-y-2">
                {laporan.details.pejantanKambing.map((pejantan) => (
                  <li
                    key={pejantan.id}
                    className="flex justify-between items-center p-2 bg-white rounded-md shadow-md"
                  >
                    <span>
                      {pejantan.noTag} - {pejantan.nama_kambing}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Kandang */}
          {laporan.details.kandang && (
            <div className="mb-6">
              <h4 className="font-bold text-gray-600 mb-2">Kandang</h4>
              <ul className="space-y-2">
                {laporan.details.kandang.map((kandang) => (
                  <li
                    key={kandang.id}
                    className="flex justify-between items-center p-2 bg-white rounded-md shadow-md"
                  >
                    <span>
                      {kandang.nama_kandang} - {kandang.lokasi}
                    </span>
                    <Link
                      to={`/dashboard/laporan/kandang/${kandang.id}`}
                      className="text-blue-500 hover:text-blue-700 text-sm underline"
                    >
                      Report
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div>&nbsp;</div>
        </div>
      </div>
    </div>
  );
};

export default LaporanKambing;
