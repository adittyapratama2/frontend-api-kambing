import React from "react";
import { useGetKambingByIdQuery } from "../../../state/query/kambing";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";

const DataKambingId = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetKambingByIdQuery({ id });

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
      link.download = `goat-${data.goat.noTag}-qr.png`;
      link.click();
    };

    // Set QR code sebagai sumber gambar
    img.src = data.qrCode;
  };

  return (
    <div className="min-h-screen p-2 bg-white">
      <div className="sticky top-0 bg-white z-10 p-2">
        <div className="flex justify-between items-center ">
          <button
            onClick={() => navigate("/dashboard/kambing")}
            className="p-2 rounded-full text-textPrimary hover:bg-white hover:text-black transition"
          >
            <ArrowLeftIcon className="w-6 h-6" />
          </button>
          <h1 className="p-2 font-bold text-textPrimary mx-auto">
            Detail Kambing
          </h1>
          {/* Added mx-auto */}
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg">
        <table className="min-w-full table-auto border-collapse mb-6">
          <tbody>
            <tr className="border-b">
              <td className="py-2 px-4 font-semibold">ID</td>
              <td className="py-2 px-4">{data.goat.id}</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 px-4 font-semibold">No Tag</td>
              <td className="py-2 px-4">{data.goat.noTag}</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 px-4 font-semibold">Nama</td>
              <td className="py-2 px-4">{data.goat.nama}</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 px-4 font-semibold">Jenis</td>
              <td className="py-2 px-4">{data.goat.jenis}</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 px-4 font-semibold">Kelamin</td>
              <td className="py-2 px-4">{data.goat.kelamin}</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 px-4 font-semibold">Induk</td>
              <td className="py-2 px-4">{data.goat.induk}</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 px-4 font-semibold">Pejantan</td>
              <td className="py-2 px-4">{data.goat.pejantan}</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 px-4 font-semibold">Asal</td>
              <td className="py-2 px-4">{data.goat.asal}</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 px-4 font-semibold">Posisi Kandang</td>
              <td className="py-2 px-4">{data.goat.posisiKandang}</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 px-4 font-semibold">Harga</td>
              <td className="py-2 px-4">
                Rp {data.goat.harga.toLocaleString()}
              </td>
            </tr>
            <tr className="border-b">
              <td className="py-2 px-4 font-semibold">Status</td>
              <td className="py-2 px-4">{data.goat.status}</td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-semibold">QR Code</td>
              <td className="py-2 px-4">
                <img
                  src={data.qrCode}
                  alt="Goat QR Code"
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
      <br />
      <br />
    </div>
  );
};

export default DataKambingId;
