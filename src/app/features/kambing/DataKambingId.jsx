import React from "react";
import { useGetKambingByIdQuery } from "../../../state/query/kambing";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";

const DataKambingId = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetKambingByIdQuery({ id });
  const navigate = useNavigate();

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

  // Fungsi untuk mengunduh QR code
  const downloadQRCode = () => {
    const canvas = document.createElement("canvas");
    const img = new Image();

    img.onload = () => {
      canvas.width = 500; // Ukuran lebih besar untuk QR code
      canvas.height = 500;
      const ctx = canvas.getContext("2d");

      // Gambar QR code ke canvas
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Mengunduh QR code yang diperbesar
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `goat-${data.goat.noTag}-qr.png`;
      link.click();
    };

    // Set QR code sebagai sumber gambar
    img.src = data.qrCode;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 bg-white shadow-sm z-10 p-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <button
            onClick={() => navigate("/dashboard/kambing")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-primary hover:bg-primary hover:text-white transition-all duration-300"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span>Kembali</span>
          </button>
          <h1 className="text-2xl font-bold text-gray-800">
            Detail Kambing #{data.goat.noTag}
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 mt-6">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* QR Code Section */}
          <div className="p-6 bg-gradient-to-r from-primary/10 to-secondary/10 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                {data.goat.nama_kambing}
              </h2>
              <p className="text-gray-600">No. Tag: {data.goat.noTag}</p>
            </div>
            <div className="text-center">
              <img
                src={data.qrCode}
                alt="Goat QR Code"
                className="w-32 h-32 object-contain bg-white p-2 rounded-lg shadow-md mb-2"
              />
              <button
                onClick={downloadQRCode}
                className="bg-primary text-white text-sm font-semibold py-2 px-4 rounded-lg hover:bg-secondary transition duration-300 w-full"
              >
                Download QR
              </button>
            </div>
          </div>

          {/* Details Section */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoItem label="ID" value={data.goat.id} />
              <InfoItem label="Ras" value={data.goat.ras} />
              <InfoItem
                label="Kelamin"
                value={
                  data.goat.jenis_kelamin === "jantan" ? "Jantan" : "Betina"
                }
              />
              <InfoItem
                label="Status"
                value={
                  data.goat.status === "1" ? (
                    <span className="text-green-600 font-medium">Hidup</span>
                  ) : data.goat.status === "2" ? (
                    <span className="text-red-600 font-medium">Mati</span>
                  ) : data.goat.status === "3" ? (
                    <span className="text-blue-600 font-medium">Terjual</span>
                  ) : (
                    "Unknown"
                  )
                }
              />
              <InfoItem
                label="Induk"
                value={
                  <button
                    onClick={() =>
                      navigate(
                        `/dashboard/indukan-kambing/${data.goat.indukBetina.id}`
                      )
                    }
                    className="text-primary hover:text-secondary hover:underline transition-colors"
                  >
                    {data.goat.indukBetina.nama_kambing}
                  </button>
                }
              />
              <InfoItem
                label="Pejantan"
                value={
                  <button
                    onClick={() =>
                      navigate(
                        `/dashboard/pejantan-kambing/${data.goat.indukPejantan.id}`
                      )
                    }
                    className="text-primary hover:text-secondary hover:underline transition-colors"
                  >
                    {data.goat.indukPejantan.nama_kambing}
                  </button>
                }
              />
              <InfoItem
                label="Posisi Kandang"
                value={
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">
                    {data.goat.kandangKambing.nama_kandang}
                  </span>
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ label, value }) => (
  <div className="border-b border-gray-100 py-3">
    <div className="text-sm text-gray-600 mb-1">{label}</div>
    <div className="font-medium text-gray-800">{value}</div>
  </div>
);

export default DataKambingId;
