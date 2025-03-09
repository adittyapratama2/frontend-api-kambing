import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetPertumbuhanKambingByIdQuery,
  useUpdatePertumbuhanKambingMutation,
} from "../../../../../state/query/pertumbuhan";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const EditPertumbuhan = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  // Sesuaikan inisialisasi state dengan field yang digunakan di form
  const [formData, setFormData] = useState({
    id_kambing: "",
    tanggal_pencatatan: "",
    berat_badan: "",
    tinggi_badan: "",
    lingkar_dada: "",
    kondisi_fisik: "",
    catatan: "",
  });

  const { data: kambingData, isLoading: isLoadingKambing } =
    useGetPertumbuhanKambingByIdQuery({ id });
  const [updateData] = useUpdatePertumbuhanKambingMutation();

  // Saat data kambing sudah tersedia, set nilai awal formData
  useEffect(() => {
    if (kambingData) {
      setFormData({
        id_kambing: kambingData.id_kambing || "",
        tanggal_pencatatan: kambingData.tanggal_pencatatan || "",
        berat_badan: kambingData.berat_badan || "",
        tinggi_badan: kambingData.tinggi_badan || "",
        lingkar_dada: kambingData.lingkar_dada || "",
        kondisi_fisik: kambingData.kondisi_fisik || "",
        catatan: kambingData.catatan || "",
      });
    }
  }, [kambingData]);

  // Menangani perubahan pada input form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Log payload yang akan dikirim
    const payload = { id, ...formData };
    console.log("Payload yang akan dikirim:", payload);

    try {
      const res = await updateData(payload).unwrap();
      console.log(res);
      console.log("Data berhasil diupdate");
      navigate("/dashboard/kegiatan");
    } catch (error) {
      console.error("Gagal mengupdate data: ", error);
    }
  };
  if (isLoadingKambing) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen p-2 bg-white">
      {/* Header and Create Button */}
      <div className="sticky top-0 bg-white z-10 p-2">
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate("/dashboard/kegiatan")}
            className="rounded-full text-primary hover:bg-white hover:text-black transition"
          >
            <ArrowLeftIcon className="w-6 h-6" />
          </button>
          <h1 className="p-2 font-bold text-textPrimary mx-auto">
            Edit Pertumbuhan
          </h1>
        </div>
      </div>
      <h1>Edit Pertumbuhan</h1>
      <form onSubmit={handleSubmit} className="space-y-4 mt-4 p-2">
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="flex-1">
            <label className="block text-textPrimary">Tanggal Catat</label>
            <input
              type="date"
              name="tanggal_pencatatan"
              value={formData.tanggal_pencatatan}
              onChange={handleInputChange}
              className="w-full border rounded-lg p-3 text-textPrimary"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="flex-1">
            <label className="block text-textPrimary">Berat Badan</label>
            <input
              type="text"
              name="berat_badan"
              value={formData.berat_badan}
              onChange={handleInputChange}
              placeholder="Masukkan berat kambing"
              className="w-full border rounded-lg p-3 text-textPrimary"
              pattern="^\d+(\.\d{1,2})?$"
            />
          </div>

          <div className="flex-1">
            <label className="block text-textPrimary">Tinggi Badan</label>
            <input
              type="text"
              name="tinggi_badan"
              value={formData.tinggi_badan}
              onChange={handleInputChange}
              placeholder="Masukkan tinggi kambing"
              className="w-full border rounded-lg p-3 text-textPrimary"
              pattern="^\d+(\.\d{1,2})?$"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="flex-1">
            <label className="block text-textPrimary">Lingkar Dada</label>
            <input
              type="text"
              name="lingkar_dada"
              value={formData.lingkar_dada}
              onChange={handleInputChange}
              placeholder="Masukan lingkar dada"
              className="w-full border rounded-lg p-3 text-textPrimary"
              pattern="^\d+(\.\d{1,2})?$"
            />
          </div>

          <div className="flex-1">
            <label className="block text-textPrimary">Kondisi Fisik</label>
            <input
              type="text"
              name="kondisi_fisik"
              value={formData.kondisi_fisik}
              onChange={handleInputChange}
              placeholder="Masukan kondisi fisik"
              className="w-full border rounded-lg p-3 text-textPrimary"
            />
          </div>
        </div>

        <div>
          <label className="block text-textPrimary">Catatan</label>
          <textarea
            name="catatan"
            value={formData.catatan}
            onChange={handleInputChange}
            placeholder="Masukan catatan"
            className="w-full border rounded-lg p-3 text-textPrimary"
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-primary text-white rounded-lg"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditPertumbuhan;
