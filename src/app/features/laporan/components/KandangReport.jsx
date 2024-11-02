import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import moment from "moment";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetLaporanKandangByIdQuery } from "../../../../state/query/laporan";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const KandangReport = () => {
  const { id } = useParams();
  const [startDate, setStartDate] = useState(
    moment().startOf("month").format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState(
    moment().endOf("month").format("YYYY-MM-DD")
  );

  const navigate = useNavigate();

  const {
    data: kandang,
    isLoading,
    error,
  } = useGetLaporanKandangByIdQuery({ id, startDate, endDate });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  const pakanData = kandang.pakan || [];
  const dates = pakanData.map((entry) => entry.date);
  const jumlahPakanData = pakanData.map((entry) => entry.qtyPakan);

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: "Qty Pakan (kg)",
        data: jumlahPakanData,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allows the chart to adapt to container size
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: window.innerWidth > 768 ? 16 : 12, // Adjust legend font size
          },
          color: "#374151", // Tailwind gray-700
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
        bodyFont: {
          size: window.innerWidth > 768 ? 14 : 10,
        },
        titleFont: {
          size: window.innerWidth > 768 ? 16 : 12,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Tanggal",
          font: {
            size: window.innerWidth > 768 ? 16 : 12,
          },
          color: "#374151", // Tailwind gray-700
        },
        ticks: {
          font: {
            size: window.innerWidth > 768 ? 12 : 8,
          },
          color: "#6B7280", // Tailwind gray-500
          autoSkip: true,
          maxTicksLimit: window.innerWidth > 768 ? 15 : 7,
        },
      },
      y: {
        title: {
          display: true,
          text: "Jumlah Pakan (Kg)",
          font: {
            size: window.innerWidth > 768 ? 16 : 12,
          },
          color: "#374151", // Tailwind gray-700
        },
        ticks: {
          font: {
            size: window.innerWidth > 768 ? 12 : 8,
          },
          color: "#6B7280", // Tailwind gray-500
        },
      },
    },
  };

  return (
    <div className="min-h-screen bg-white p-2">
      {/* Header and Back Button */}
      <div className="sticky top-0 bg-white z-10 p-2">
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate("/dashboard/laporan-kambing")}
            className="rounded-full text-primary hover:bg-white hover:text-black transition"
          >
            <ArrowLeftIcon className="w-6 h-6" />
          </button>
          <h1 className="p-2 font-bold text-textPrimary mx-auto">
            Detail Laporan
          </h1>
        </div>
      </div>

      {/* Goat Pen Information */}
      <div className="w-full md:w-80 h-60 bg-gray-100 rounded-lg shadow-md mt-2">
        <div className="h-3/4 bg-secondary rounded-t-lg flex flex-col items-center justify-center">
          {/* Placeholder for pen image */}
          <span className="text-gray-400 flex justify-center items-center">
            <svg
              className="w-12 h-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 3v18M19 3v18M3 5h18M3 19h18M7 10h10m-10 4h10"
              />
            </svg>
          </span>
          <span className="text-gray-600 text-sm mt-2"></span>
        </div>
        <div className="h-1/4 bg-primary rounded-b-lg p-2 flex flex-col justify-center">
          <span className="text-white font-semibold text-sm">
            Nama Kandang: {kandang.data.nama_kandang}
          </span>
          <span className="text-white text-xs">
            Kapasitas: {kandang.data.kapasitas} kambing
          </span>
          <span className="text-white text-xs">
            Lokasi: {kandang.data.lokasi}
          </span>
        </div>

        {/* Date Pickers */}
        <div className="mt-2 flex items-center space-x-4">
          <div className="flex-1 py-2 px-2">
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

        {/* Growth Chart */}
        <div className="mt-6 p-4 bg-white rounded-lg shadow-md w-full sm:w-11/12 md:w-10/12 lg:w-8/12 xl:w-6/12 mx-auto">
          <h2 className="text-center text-lg md:text-xl font-semibold text-textSecondary mb-4">
            Chart Jumlah Pakan Kandang
          </h2>
          <div className="h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px]">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        <div className="mt-6 p-4 bg-white rounded-lg shadow-md w-full sm:w-11/12 md:w-10/12 lg:w-8/12 xl:w-6/12 mx-auto">
          <h2 className="text-center text-lg md:text-xl font-semibold text-textSecondary mb-4">
            Catatan Pakan Kandang
          </h2>
          <div className="h-64 overflow-y-scroll  p-2 rounded-md">
            {pakanData.length > 0 ? (
              pakanData.map((data, index) => (
                <div
                  key={index}
                  className="mb-4 p-2 border border-gray-200 rounded-md"
                >
                  <p className="font-bold">
                    Tanggal Catat:{" "}
                    <span className="font-normal">{data.date}</span>
                  </p>
                  <p className="font-bold">
                    Qty Pakan:{" "}
                    <span className="font-normal">{data.qtyPakan} Kg</span>
                  </p>
                  <p className="font-bold">
                    Catatan: <span className="font-normal">{data.catatan}</span>
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Belum ada data pakan.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KandangReport;
