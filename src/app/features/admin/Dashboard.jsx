import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  CalendarIcon,
  ChartBarIcon,
  BellIcon,
  CogIcon,
} from "@heroicons/react/24/outline";

const Dashboard = () => {
  const info = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-800">Goat Tracker</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100">
                <BellIcon className="h-6 w-6" />
              </button>
              <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100">
                <CogIcon className="h-6 w-6" />
              </button>
              <div className="flex items-center">
                <img
                  src="/assets/image1.jpeg"
                  alt="Profile"
                  className="h-10 w-10 rounded-full border-2 border-primary"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Welcome Card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-xl shadow-lg">
          <div className="p-6 flex items-center">
            <div className="flex-1">
              <p className="text-white/80 text-lg">Selamat Datang,</p>
              <h2 className="text-3xl font-bold text-white">
                {info.user.name}
              </h2>
              <p className="text-white/90 mt-1">{info.user.role}</p>

              <div className="mt-4 flex space-x-4">
                <div className="bg-white/20 rounded-lg px-4 py-2 text-white backdrop-blur-sm">
                  <p className="text-sm">Total Kambing</p>
                  <p className="text-xl font-bold">42</p>
                </div>
                <div className="bg-white/20 rounded-lg px-4 py-2 text-white backdrop-blur-sm">
                  <p className="text-sm">Produksi Hari Ini</p>
                  <p className="text-xl font-bold">68 L</p>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src="/assets/goat-illustration.png"
                alt="Goat"
                className="h-32 w-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/3 px-4 mb-6">
            <div className="bg-white rounded-xl shadow-sm p-6 h-full">
              <div className="flex items-center">
                <div className="rounded-full bg-green-100 p-3 mr-4">
                  <CalendarIcon className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Kegiatan Hari Ini</p>
                  <p className="text-xl font-bold">5 Kegiatan</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-4 mb-6">
            <div className="bg-white rounded-xl shadow-sm p-6 h-full">
              <div className="flex items-center">
                <div className="rounded-full bg-blue-100 p-3 mr-4">
                  <ChartBarIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Performa Minggu Ini</p>
                  <p className="text-xl font-bold">+12%</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-4 mb-6">
            <div className="bg-white rounded-xl shadow-sm p-6 h-full">
              <div className="flex items-center">
                <div className="rounded-full bg-purple-100 p-3 mr-4">
                  <img
                    src="/assets/milk-icon.png"
                    alt="Milk"
                    className="h-6 w-6"
                  />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Stok Susu</p>
                  <p className="text-xl font-bold">124 Liter</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Manajemen Peternakan
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Menu Items */}
          <Link
            to="/dashboard/kambing"
            className="transform transition hover:scale-105"
          >
            <div className="bg-white rounded-xl shadow-sm p-4 text-center">
              <div className="bg-yellow-50 rounded-full p-4 mx-auto w-16 h-16 flex items-center justify-center mb-3">
                <img
                  src="/assets/kambing.png"
                  alt="Kambing"
                  className="w-10 h-10 object-contain"
                />
              </div>
              <p className="font-medium text-gray-800">Kambing</p>
            </div>
          </Link>

          <Link
            to="/dashboard/produksi-susu-kambing"
            className="transform transition hover:scale-105"
          >
            <div className="bg-white rounded-xl shadow-sm p-4 text-center">
              <div className="bg-blue-50 rounded-full p-4 mx-auto w-16 h-16 flex items-center justify-center mb-3">
                <img
                  src="/assets/susu.png"
                  alt="Susu"
                  className="w-10 h-10 object-contain"
                />
              </div>
              <p className="font-medium text-gray-800">Produksi Susu</p>
            </div>
          </Link>

          <Link
            to="/dashboard/kandang-kambing"
            className="transform transition hover:scale-105"
          >
            <div className="bg-white rounded-xl shadow-sm p-4 text-center">
              <div className="bg-green-50 rounded-full p-4 mx-auto w-16 h-16 flex items-center justify-center mb-3">
                <img
                  src="/assets/kandang.png"
                  alt="Kandang"
                  className="w-10 h-10 object-contain"
                />
              </div>
              <p className="font-medium text-gray-800">Kandang</p>
            </div>
          </Link>

          <Link
            to="/dashboard/perkawinan"
            className="transform transition hover:scale-105"
          >
            <div className="bg-white rounded-xl shadow-sm p-4 text-center">
              <div className="bg-purple-50 rounded-full p-4 mx-auto w-16 h-16 flex items-center justify-center mb-3">
                <img
                  src="/assets/kawin.png"
                  alt="Perkawinan"
                  className="w-10 h-10 object-contain"
                />
              </div>
              <p className="font-medium text-gray-800">Perkawinan</p>
            </div>
          </Link>

          <Link
            to="/dashboard/kegiatan"
            className="transform transition hover:scale-105"
          >
            <div className="bg-white rounded-xl shadow-sm p-4 text-center">
              <div className="bg-red-50 rounded-full p-4 mx-auto w-16 h-16 flex items-center justify-center mb-3">
                <img
                  src="/assets/kegiatan.png"
                  alt="Kegiatan"
                  className="w-10 h-10 object-contain"
                />
              </div>
              <p className="font-medium text-gray-800">Kegiatan</p>
            </div>
          </Link>

          <Link
            to="/dashboard/pakan-kandang"
            className="transform transition hover:scale-105"
          >
            <div className="bg-white rounded-xl shadow-sm p-4 text-center">
              <div className="bg-orange-50 rounded-full p-4 mx-auto w-16 h-16 flex items-center justify-center mb-3">
                <img
                  src="/assets/feed-goat.png"
                  alt="Pakan"
                  className="w-10 h-10 object-contain"
                />
              </div>
              <p className="font-medium text-gray-800">Pakan Kandang</p>
            </div>
          </Link>

          <Link
            to="/dashboard/laporan-kambing"
            className="transform transition hover:scale-105"
          >
            <div className="bg-white rounded-xl shadow-sm p-4 text-center">
              <div className="bg-indigo-50 rounded-full p-4 mx-auto w-16 h-16 flex items-center justify-center mb-3">
                <img
                  src="/assets/laporan.png"
                  alt="Laporan"
                  className="w-10 h-10 object-contain"
                />
              </div>
              <p className="font-medium text-gray-800">Laporan</p>
            </div>
          </Link>

          <Link
            to="/dashboard/kesehatan"
            className="transform transition hover:scale-105"
          >
            <div className="bg-white rounded-xl shadow-sm p-4 text-center">
              <div className="bg-pink-50 rounded-full p-4 mx-auto w-16 h-16 flex items-center justify-center mb-3">
                <img
                  src="/assets/health.png"
                  alt="Kesehatan"
                  className="w-10 h-10 object-contain"
                />
              </div>
              <p className="font-medium text-gray-800">Kesehatan</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Aktivitas Terbaru
        </h2>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="divide-y">
            <div className="py-3 flex items-center">
              <div className="bg-blue-100 rounded-full p-2 mr-4">
                <img src="/assets/susu.png" alt="Susu" className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Pencatatan produksi susu</p>
                <p className="text-sm text-gray-500">15 Liter dari Kandang A</p>
              </div>
              <p className="text-sm text-gray-500">2 jam yang lalu</p>
            </div>
            <div className="py-3 flex items-center">
              <div className="bg-green-100 rounded-full p-2 mr-4">
                <img
                  src="/assets/feed-goat.png"
                  alt="Pakan"
                  className="w-6 h-6"
                />
              </div>
              <div className="flex-1">
                <p className="font-medium">Pemberian pakan</p>
                <p className="text-sm text-gray-500">20 kg untuk Kandang B</p>
              </div>
              <p className="text-sm text-gray-500">4 jam yang lalu</p>
            </div>
            <div className="py-3 flex items-center">
              <div className="bg-purple-100 rounded-full p-2 mr-4">
                <img
                  src="/assets/kawin.png"
                  alt="Perkawinan"
                  className="w-6 h-6"
                />
              </div>
              <div className="flex-1">
                <p className="font-medium">Perkawinan berhasil</p>
                <p className="text-sm text-gray-500">
                  Antara KMB-001 dan KMB-023
                </p>
              </div>
              <p className="text-sm text-gray-500">Kemarin</p>
            </div>
          </div>
          <div className="mt-4 text-center">
            <button className="text-primary font-medium hover:underline">
              Lihat semua aktivitas
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
