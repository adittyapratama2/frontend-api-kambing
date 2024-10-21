import React, { useState } from "react";
import { useCreatePerkawinanBaruMutation } from "../../../state/query/perkawinan";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import { useGetIndukBetinaQuery } from "../../../state/query/betina";
import { useGetPejantanQuery } from "../../../state/query/pejantan";
import { useGetKambingQuery } from "../../../state/query/kambing";

const TambahKawin = () => {
  const [createKandang] = useCreatePerkawinanBaruMutation();
  const { data: kambing, isLoading, error } = useGetKambingQuery();
  const navigate = useNavigate();

  console.log(kambing);

  const [formData, setFormData] = useState({
    id_kambing: "",
    tanggal_perkawinan: "",
    id_kambing_jantan: "",
    id_kambing_betina: "",
    status_perkawinan: "",
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

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
    navigate("/dashboard/perkawinan");
  };

  return (
    <div className="min-h-screen p-2 bg-white">
      {/* Header and Create Button */}
      <div className="sticky top-0 bg-white z-10 p-2">
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate("/dashboard/perkawinan")}
            className="rounded-full text-primary hover:bg-white hover:text-black transition"
          >
            <ArrowLeftIcon className="w-6 h-6" />
          </button>
          <h1 className="p-2 font-bold text-textPrimary mx-auto">
            Tambah Perkawinan
          </h1>
        </div>

        <form className="space-y-4 mt-4 p-2" onSubmit={handleSubmit}>
          <div>
            <label className="block text-textPrimary">Tanggal Perkawinan</label>
            <input
              type="date"
              name="tanggal_perkawinan"
              value={formData.tanggal_perkawinan}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 text-textPrimary"
            />
          </div>
          <div>
            <label className="block text-textPrimary">Kambing</label>
            <select
              name="id_kambing"
              value={formData.id_kambing}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 text-textPrimary"
            >
              <option value="">Pilih Kambing</option>
              {kambing.data.kambing.map((item) => (
                <option key={item.id} value={item.id}>
                  {/* Adjust `item.id` and `item.name` based on your data structure */}
                  {item.noTag} - {item.nama_kambing}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-textPrimary">Induk Betina</label>
            <select
              name="id_kambing_betina"
              value={formData.id_kambing_betina}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 text-textPrimary"
            >
              <option value="">Pilih Induk Betina</option>
              {kambing.data.induk_betina.map((item) => (
                <option key={item.id} value={item.id}>
                  {/* Adjust `item.id` and `item.name` based on your data structure */}
                  {item.noTag} - {item.nama_kambing}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-textPrimary">Induk Jantan</label>
            <select
              name="id_kambing_jantan"
              value={formData.id_kambing_jantan}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 text-textPrimary"
            >
              <option value="">Pilih Induk Betina</option>
              {kambing.data.induk_pejantan.map((item) => (
                <option key={item.id} value={item.id}>
                  {/* Adjust `item.id` and `item.name` based on your data structure */}
                  {item.noTag} - {item.nama_kambing}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-textPrimary">Status</label>
            <select
              name="status_perkawinan"
              value={formData.status_perkawinan}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 text-textPrimary"
            >
              <option value="">Pilih Status</option>
              <option value="1">Jantan</option>
              <option value="2">Betina</option>
            </select>
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

export default TambahKawin;
