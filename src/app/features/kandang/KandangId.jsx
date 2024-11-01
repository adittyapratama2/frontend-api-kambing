import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import { useGetKandangByIdQuery } from "../../../state/query/kandang";

const KandangId = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetKandangByIdQuery({ id });

  const navigate = useNavigate();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

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
      link.download = `kandang-${data.kandang.nama_kandang}-qr.png`;
      link.click();
    };

    // Set QR code sebagai sumber gambar
    img.src = data.qrCode;
  };

  return (
    <div className="min-h-screen p-2 bg-white">
      <div className="sticky top-0 bg-white z-10 p-2">
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate("/dashboard/kandang-kambing")}
            className="rounded-full text-primary hover:bg-white hover:text-black transition"
          >
            <ArrowLeftIcon className="w-6 h-6" />
          </button>
          <h1 className="p-2 font-bold text-textPrimary mx-auto">
            Detail Kandang
          </h1>
        </div>

        <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg">
          <table className="min-w-full table-auto border-collapse mb-6">
            <tbody>
              <tr className="border-b">
                <td className="py-2 px-4 font-semibold">ID</td>
                <td className="py-2 px-4">{data.kandang.id}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4 font-semibold">Nama Kandang</td>
                <td className="py-2 px-4">{data.kandang.nama_kandang}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4 font-semibold">Lokasi</td>
                <td className="py-2 px-4">{data.kandang.lokasi}</td>
              </tr>

              <tr className="border-b">
                <td className="py-2 px-4 font-semibold">Kapasitas</td>
                <td className="py-2 px-4">{data.kandang.kapasitas}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4 font-semibold">Jenis Kandang</td>
                <td className="py-2 px-4">
                  {data.kandang.jenis_kandang === "hidup" ? "Hidup" : "Bagus"}
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-semibold">QR Code</td>
                <td className="py-2 px-4">
                  <img
                    src={data.qrCode}
                    alt="Kandang QR Code"
                    className="w-32 h-32 object-contain"
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <button
            onClick={downloadQRCode}
            className="bg-primary text-white font-bold py-2 px-4 rounded hover:bg-secondary transition duration-300"
          >
            Download QR Code
          </button>
        </div>
      </div>
    </div>
  );
};

export default KandangId;
