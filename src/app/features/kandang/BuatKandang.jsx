import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateKandangBaruMutation } from "../../../state/query/kandang";

const BuatKandang = () => {
  const [createKandang] = useCreateKandangBaruMutation();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nama_kandang: "",
    lokasi: "",
    kapasitas: "",
    jenis_kandang: "",
    catatan: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const result = await createKandang(formData).unwrap();
    console.log("Form Data Submitted:", result);
    navigate("/dashboard/kandang-kambing");
  };

  return (
    <div className="min-h-screen p-2 bg-white">
      {/* Header and Create Button */}
      <div className="sticky top-0 bg-white z-10 p-2">
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate("/dashboard/kandang-kambing")}
            className="rounded-full text-primary hover:bg-white hover:text-black transition"
          >
            <ArrowLeftIcon className="w-6 h-6" />
          </button>
          <h1 className="p-2 font-bold text-textPrimary mx-auto">
            Tambah Kandang
          </h1>
        </div>
      </div>

      <form className="space-y-4 mt-4 p-2" onSubmit={handleSubmit}>
        <div>
          <label className="block text-textPrimary mb-2">Nama Kandang</label>
          <input
            type="text"
            name="nama_kandang"
            value={formData.nama_kandang}
            onChange={handleChange}
            placeholder="Masukan Nama Kandang"
            className="w-full border rounded-lg p-3 text-textPrimary"
          />
        </div>
        <div>
          <label className="block text-textPrimary mb-2">Lokasi</label>
          <input
            type="text"
            name="lokasi"
            value={formData.lokasi}
            onChange={handleChange}
            placeholder="Masukan Lokasi"
            className="w-full border rounded-lg p-3 text-textPrimary"
          />
        </div>
        <div>
          <label className="block text-textPrimary mb-2">Kapasitas</label>
          <input
            type="number"
            name="kapasitas"
            value={formData.kapasitas}
            onChange={handleChange}
            placeholder="Masukan Kapasitas"
            className="w-full border rounded-lg p-3 text-textPrimary"
          />
        </div>
        <div>
          <label className="block text-textPrimary mb-2">Jenis Kandang</label>
          <select
            name="jenis_kandang"
            value={formData.jenis_kandang}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 text-textPrimary"
          >
            <option value="">Pilih Jenis Kandang</option>
            <option value="1">Indukan</option>
            <option value="2">Bayi</option>
          </select>
        </div>
        <div>
          <label className="block text-textPrimary mb-2">Catatan</label>
          <textarea
            name="catatan"
            value={formData.catatan}
            onChange={handleChange}
            placeholder="Masukan Catatan"
            className="w-full border rounded-lg p-3 text-textPrimary"
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 mb-4 bg-primary rounded-full text-white"
        >
          Simpan
        </button>
      </form>
    </div>
  );
};

export default BuatKandang;
