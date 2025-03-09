import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetIndukBetinaQuery } from "../../../../state/query/betina";
import { useGetPejantanQuery } from "../../../../state/query/pejantan";
import { useGetKandangQuery } from "../../../../state/query/kandang";
import {
  useGetKambingByIdQuery,
  useUpdateKambingMutation,
} from "../../../../state/query/kambing";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const EditKambing = () => {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    nama_kambing: "",
    ras: "",
    tanggal_lahir: "",
    jenis_kelamin: "",
    id_kambing_betina: "",
    id_kambing_jantan: "",
    id_kandang: "",
    warna_dominan: "",
    status: "",
  });

  const navigate = useNavigate();

  // Fetch data
  const { data: betina, isLoading: isLoadingBetina } = useGetIndukBetinaQuery();
  const { data: pejantan, isLoading: isLoadingPejantan } =
    useGetPejantanQuery();
  const { data: kandang, isLoading: isLoadingKandang } = useGetKandangQuery();
  const { data: kambingData, isLoading: isLoadingKambing } =
    useGetKambingByIdQuery({ id });
  const [updateKambing] = useUpdateKambingMutation();

  // Set form data when kambing data is loaded
  useEffect(() => {
    if (kambingData) {
      setFormData({
        ...kambingData.goat,
        id_kambing_betina: kambingData.goat.id_kambing_betina || "",
        id_kambing_jantan: kambingData.goat.id_kambing_jantan || "",
        id_kandang: kambingData.goat.id_kandang || "",
        status: String(kambingData.goat.status) || "",
      });
    }
  }, [kambingData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateKambing({ id, data: formData }).unwrap();
      alert("Update berhasil!");
      navigate("/dashboard/kambing");
      // Tambahkan navigasi atau update UI lainnya
    } catch (error) {
      console.error("Gagal update kambing:", error);
      alert("Update gagal!");
    }
  };

  if (
    isLoadingKambing ||
    isLoadingBetina ||
    isLoadingPejantan ||
    isLoadingKandang
  ) {
    return <div>Loading...</div>;
  }

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
            Edit Kambing
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 mt-4 p-2">
        {/* Input fields sama seperti sebelumnya */}
        <div>
          <label className="block text-textPrimary">Nama Kambing</label>
          <input
            type="text"
            name="nama_kambing"
            value={formData.nama_kambing}
            onChange={handleInputChange}
            className="w-full border rounded-lg p-3 text-textPrimary"
          />
        </div>

        <div>
          <label className="block text-textPrimary">Ras</label>
          <input
            type="text"
            name="ras"
            value={formData.ras}
            onChange={handleInputChange}
            placeholder="Masukkan Ras"
            className="w-full border rounded-lg p-3 text-textPrimary"
          />
        </div>

        <div>
          <label className="block text-textPrimary">Tanggal Lahir</label>
          <input
            type="date"
            name="tanggal_lahir"
            value={formData.tanggal_lahir}
            onChange={handleInputChange}
            className="w-full border rounded-lg p-3 text-textPrimary"
          />
        </div>

        <div>
          <label className="block text-textPrimary">Jenis Kelamin</label>
          <select
            name="jenis_kelamin"
            value={formData.jenis_kelamin}
            onChange={handleInputChange}
            className="w-full border rounded-lg p-3 text-textPrimary"
          >
            <option value="">Pilih Jenis Kelamin</option>
            <option value="jantan">Jantan</option>
            <option value="betina">Betina</option>
          </select>
        </div>

        <div>
          <label className="block text-textPrimary">Induk Betina</label>
          <select
            name="id_kambing_betina"
            value={formData.id_kambing_betina}
            onChange={handleInputChange}
            className="w-full border rounded-lg p-3 text-textPrimary"
          >
            <option value="">Pilih Indukan Betina</option>
            {betina.map((item) => (
              <option key={item.id} value={item.id}>
                {/* Adjust `item.id` and `item.name` based on your data structure */}
                {item.noTag} - {item.nama_kambing}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-textPrimary">Induk Pejantan</label>
          <select
            name="id_kambing_jantan"
            value={formData.id_kambing_jantan}
            onChange={handleInputChange}
            className="w-full border rounded-lg p-3 text-textPrimary"
          >
            <option value="">Pilih Indukan Pejantan</option>
            {pejantan?.map((item) => (
              <option key={item.id} value={item.id}>
                {/* Adjust `item.id` and `item.name` based on your data structure */}
                {item.noTag} - {item.nama_kambing}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-textPrimary">Posisi Kandang</label>
          <select
            name="id_kandang"
            value={formData.id_kandang}
            onChange={handleInputChange}
            className="w-full border rounded-lg p-3 text-textPrimary"
          >
            <option value="">Pilih Posisi Kandang</option>
            {kandang.map((item) => (
              <option key={item.id} value={item.id}>
                {/* Adjust `item.id` and `item.name` based on your data structure */}
                {item.nama_kandang} - {item.lokasi}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-textPrimary">Warna Dominan</label>
          <input
            type="text"
            name="warna_dominan"
            value={formData.warna_dominan}
            onChange={handleInputChange}
            placeholder="Masukkan Warna Dominan"
            className="w-full border rounded-lg p-3 text-textPrimary"
          />
        </div>

        <div>
          <label className="block text-textPrimary">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="w-full border rounded-lg p-3 text-textPrimary"
          >
            <option value="">Pilih Status</option>
            <option value="1">Hidup</option>
            <option value="2">Mati</option>
            <option value="3">Terjual</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full p-2 mb-4 bg-primary rounded-full text-white"
        >
          Update Kambing
        </button>
      </form>
    </div>
  );
};

export default EditKambing;
