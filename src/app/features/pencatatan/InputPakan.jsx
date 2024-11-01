import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetKandangByIdQuery } from "../../../state/query/kandang";
import { useCreatePakanKandangBaruMutation } from "../../../state/query/pakan";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";

const CatatPakan = () => {
  const { id } = useParams(); // Get the id from the URL parameters

  const { data, error, isLoading } = useGetKandangByIdQuery({ id });

  const [createPakan] = useCreatePakanKandangBaruMutation();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id_kandang: id,
    tgl_transaksi: "",
    qty_pakan: "",
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
    const result = await createPakan(formData).unwrap();
    console.log("Form Data Submitted:", result);
    navigate("/dashboard/kandang-kambing");
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

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
            Tambah Pakan
          </h1>
        </div>
        <form className="space-y-4 mt-4 p-2" onSubmit={handleSubmit}>
          <h1 className="text-lg font-bold mb-4">
            Pencataan Pakan: {data.kandang.nama_kandang}
          </h1>
          <div>
            <label className="block text-textPrimary mb-2">Tgl Catat: </label>
            <input
              type="date"
              name="tgl_transaksi"
              value={formData.tgl_transaksi}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 text-textPrimary"
            />
          </div>
          <div>
            <label className="block text-textPrimary">Jumlah Pakan: </label>
            <input
              type="number"
              name="qty_pakan"
              value={formData.qty_pakan}
              onChange={handleChange}
              placeholder="Masukan jumlah pakan"
              className="w-full border rounded-lg p-3 text-textPrimary"
            />
          </div>
          <div>
            <label className="block text-textPrimary">Catatan: </label>
            <textarea
              name="catatan"
              value={formData.catatan}
              onChange={handleChange}
              placeholder="Masukan catatan"
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
    </div>
  );
};

export default CatatPakan;
