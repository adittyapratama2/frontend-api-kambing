import { Bars3Icon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import SidebarMobile from "../../components/SidebarMobile";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const info = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-white">
      {/* Welcome Card */}
      <div className="p-4 mt-4 bg-secondary sticky top-0 z-50 shadow-lg py-4 rounded-b-3xl">
        <div className="flex items-center">
          {/* Menu Hamburger
          <button className="text-textPrimary p-2 mr-4" onClick={toggleSidebar}>
            <Bars3Icon className="h-7 w-7" />
          </button> */}
          <h1 className="text-2xl font-bold">Halaman Utama</h1>
        </div>
        <div className="bg-primary text-white rounded-lg p-4 mt-4 flex items-center">
          <div>
            <p>Selamat Datang,</p>
            <h2 className="text-2xl font-bold">{info.user.name}</h2>
            <p>{info.user.role}</p>
          </div>
          <img
            src="/assets/image1.jpeg"
            alt="Joana Doe"
            className="w-20 h-20 rounded-full ml-auto"
          />
        </div>
      </div>

      {/* Grid Menu */}
      <div className="grid grid-cols-2 gap-4 p-4">
        {/* Kambing */}
        <div className="flex flex-col items-center">
          <Link to="/dashboard/kambing">
            <div className="bg-secondary rounded-lg shadow-md">
              <img
                src="/assets/kambing.png"
                alt="Kambing"
                className="w-[150px] h-[150px] object-cover"
              />
            </div>
          </Link>
          <p className="mt-2">Kambing</p>
        </div>
        {/* Produksi Susu */}
        <div className="flex flex-col items-center">
          <Link to="/dashboard/kambing">
            <div className="bg-secondary rounded-lg shadow-md">
              <img
                src="/assets/susu.png"
                alt="Susu"
                className="w-[150px] h-[150px] object-cover"
              />
            </div>
          </Link>
          <p className="mt-2">Produksi Susu</p>
        </div>
        {/* Kandang */}
        <div className="flex flex-col items-center">
          <Link to="/dashboard/kandang-kambing">
            <div className="bg-secondary rounded-lg shadow-md">
              <img
                src="/assets/kandang.png"
                alt="Kandang"
                className="w-[150px] h-[150px] object-cover"
              />
            </div>
          </Link>
          <p className="mt-2">Kandang</p>
        </div>
        {/* Transaksi */}
        <div className="flex flex-col items-center">
          <Link to="/dashboard/perkawinan">
            <div className="bg-secondary rounded-lg shadow-md">
              <img
                src="/assets/kawin.png"
                alt="Perkawinan"
                className="w-[150px] h-[150px] object-cover"
              />
            </div>
          </Link>
          <p className="mt-2">Perkawinan</p>
        </div>

        {/* Transaksi */}
        <div className="flex flex-col items-center">
          <Link to="/dashboard/kegiatan">
            <div className="bg-secondary rounded-lg shadow-md">
              <img
                src="/assets/kegiatan.png"
                alt="Kegiatan"
                className="w-[150px] h-[150px] object-cover"
              />
            </div>
          </Link>
          <p className="mt-2">Kegiatan</p>
        </div>

        <div className="flex flex-col items-center mt-4">&nbsp;</div>
        <div className="flex flex-col items-center mt-4">&nbsp;</div>
        {/* More items can be added below */}
      </div>
    </div>
  );
};

export default Dashboard;
