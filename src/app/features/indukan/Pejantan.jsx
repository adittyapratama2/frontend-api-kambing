import React from "react";

import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import { useGetPejantanByIdQuery } from "../../../state/query/pejantan";

const Pejantan = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetPejantanByIdQuery({ id });

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-100 p-4 rounded-lg text-red-700">
          Error: {error.message}
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 bg-white shadow-sm z-10 p-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-primary hover:bg-primary hover:text-white transition-all duration-300"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span>Kembali</span>
          </button>
          <h1 className="text-2xl font-bold text-gray-800">
            Data Pejantan #{data.goat.noTag}
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 mt-6">
        {/* Main Info Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
          <div className="p-6 bg-gradient-to-r from-pink-50 to-purple-50">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {data.goat.nama_kambing}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <InfoItem label="No Tag" value={data.goat.noTag} />
                <InfoItem label="Ras" value={data.goat.ras} />
                <InfoItem
                  label="Warna Dominan"
                  value={`${data.goat.warna_dominan}`}
                />
                {/* <InfoItem
                  label="Status"
                  value={
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium
                      ${
                        data.goat.status === "1"
                          ? "bg-green-100 text-green-700"
                          : data.goat.status === "2"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {data.goat.status === "1"
                        ? "Aktif"
                        : data.goat.status === "2"
                        ? "Tidak Aktif"
                        : "Unknown"}
                    </span>
                  }
                /> */}
              </div>
              <div className="space-y-4">
                {/* <InfoItem
                  label="Kandang"
                  value={data.goat.kandangKambing.nama_kandang}
                /> */}
                <InfoItem
                  label="Total Kelahiran"
                  value={
                    <span className="text-2xl font-bold text-primary">
                      {data.goat.indukPejantan.length || 0}
                    </span>
                  }
                />
                {/* <InfoItem
                  label="Kesehatan"
                  value={
                    <span className="text-green-600 font-medium">Sehat</span>
                  }
                /> */}
              </div>
            </div>
          </div>
        </div>

        {/* Offspring Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Daftar Anak
            </h3>
            {data.goat.indukPejantan && data.goat.indukPejantan.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.goat.indukPejantan.map((anak, index) => (
                  <div
                    key={anak.id}
                    className="p-4 border border-gray-100 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-800">
                          {anak.nama_kambing}
                        </h4>
                        <p className="text-sm text-gray-600">
                          Tag: {anak.noTag}
                        </p>
                        <p className="text-sm text-gray-600">
                          Kelamin:{" "}
                          {anak.jenis_kelamin === "jantan"
                            ? "Jantan"
                            : "Betina"}
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          navigate(`/dashboard/kambing/${anak.id}`)
                        }
                        className="text-primary hover:text-secondary text-sm font-medium"
                      >
                        Lihat Detail →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                Belum memiliki anak
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ label, value }) => (
  <div>
    <div className="text-sm text-gray-600 mb-1">{label}</div>
    <div className="font-medium text-gray-800">{value}</div>
  </div>
);

export default Pejantan;
