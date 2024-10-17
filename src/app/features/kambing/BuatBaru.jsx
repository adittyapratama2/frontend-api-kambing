import React, { useState } from "react";
import { useCreateKambingBaruMutation } from "../../../state/query/kambing";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import { Link, useNavigate } from "react-router-dom";

const BuatKambingBaru = () => {
  const [createKambing] = useCreateKambingBaruMutation();

  const navigate = useNavigate();

  // Form state for new kambing
  const [formData, setFormData] = useState({
    tanggalLahir: "",
    nama: "",
    bobot: "",
    kelamin: "", // default value for kelamin
    jenis: "",
    induk: "",
    pejantan: "",
    posisiKandang: "",
    asal: "",
    harga: "",
    status: "",
  });

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Reset the form to its initial state
  const resetForm = () => {
    setFormData({
      tanggalLahir: "",
      nama: "",
      bobot: "",
      kelamin: "",
      jenis: "",
      induk: "",
      pejantan: "",
      posisiKandang: "",
      asal: "",
      harga: "",
      status: "",
    });
  };

  // Handle form submission inside the modal
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Submit the form data using the mutation
      const result = await createKambing(formData).unwrap();
      console.log("Form Data Submitted:", result);
    } catch (error) {
      console.error("Error submitting form:", error);
      // You can handle error messages here if needed
    }
  };
  return (
    <div className="min-h-screen p-2 bg-white">
      {/* Header and Create Button */}
      <div className="sticky top-0 bg-white z-10 p-2">
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate("/dashboard/kambing")}
            className="rounded-full text-primary hover:bg-white hover:text-black transition"
          >
            <ArrowLeftIcon className="w-6 h-6" />
          </button>
          <h1 className="p-2 font-bold text-textPrimary mx-auto">
            Tambah Kambing
          </h1>
          {/* Added mx-auto */}
        </div>
      </div>

      {/* Form */}
      <form className="space-y-4 mt-4 p-2">
        <div>
          <label className="block text-textPrimary">Perkawinan</label>
          <select className="w-full border rounded-lg p-3 text-textPrimary">
            <option>Pilih Perkawinan</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700">Nama Kambing</label>
          <input
            type="text"
            placeholder="Masukan nama kambing"
            className="w-full border rounded-lg p-3 text-gray-700"
          />
        </div>

        <div>
          <label className="block text-gray-700">Jenis Kelamin</label>
          <select className="w-full border rounded-lg p-3 text-gray-700">
            <option>Pilih Jenis Kelamin</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700">Tanggal Lahir</label>
          <input
            type="date"
            className="w-full border rounded-lg p-3 text-gray-700"
          />
        </div>

        <div>
          <label className="block text-gray-700">Tanggal Masuk Kandang</label>
          <input
            type="date"
            className="w-full border rounded-lg p-3 text-gray-700"
          />
        </div>

        <div>
          <label className="block text-gray-700">Bobot</label>
          <input
            type="number"
            placeholder="Masukan bobot"
            className="w-full border rounded-lg p-3 text-gray-700"
          />
          <small className="text-gray-500">
            Masukan angka dalam satuan kilogram
          </small>
        </div>

        <div>
          <label className="block text-gray-700">Group Kambing</label>
          <select className="w-full border rounded-lg p-3 text-textPrimary">
            <option>Pilih Group Kambing</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700">Asal Kambing</label>
          <select className="w-full border rounded-lg p-3 text-textPrimary">
            <option>Pilih Asal Kambing</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700">Induk Jantan</label>
          <select className="w-full border rounded-lg p-3 text-textPrimary">
            <option>Pilih Induk Jantan</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700">Induk Betina</label>
          <select className="w-full border rounded-lg p-3 text-textPrimary">
            <option>Pilih Induk Betina</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700">Catatan</label>
          <textarea
            className="w-full border rounded-lg p-3 text-textPrimary"
            placeholder="Masukan Catatan"
          />
        </div>

        <button
          type="submit"
          className="w-full p-2 mb-4 bg-primary rounded-full text-white"
        >
          Simpan
        </button>
        <div>&nbsp;</div>
      </form>
    </div>
  );
};

export default BuatKambingBaru;
