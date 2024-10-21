import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Pertumbuhan from "./components/Pertumbuhan";
import Pemerahan from "./components/Pemerahan";
import Kesehatan from "./components/Kesehatan";
import { useGetKambingByIdQuery } from "../../../state/query/kambing";
import { useCreatePertumbuhanKambingBaruMutation } from "../../../state/query/pertumbuhan";
import { useCreatePemerahanKambingBaruMutation } from "../../../state/query/pemerahan";
import { useCreateKesehatanKambingBaruMutation } from "../../../state/query/kesehatan";

const InputDataKambing = () => {
  const { id } = useParams(); // Get the id from the URL parameters

  const { data, error, isLoading } = useGetKambingByIdQuery({ id });
  const [createTumbuh] = useCreatePertumbuhanKambingBaruMutation();
  const [createPemerahan] = useCreatePemerahanKambingBaruMutation();
  const [createKesehatan] = useCreateKesehatanKambingBaruMutation();

  const navigate = useNavigate();

  // Form state for new kambing
  const [formData, setFormData] = useState({
    jenis: "",
    pertumbuhan: {
      id_kambing: id,
      berat_badan: "",
      tinggi_badan: "",
      lingkar_dada: "",
      kondisi_fisik: "",
      tanggal_pencatatan: "",
      catatan: "",
    },
    pemerahan: {
      id_kambing: id,
      tanggal_perah: "",
      volume_susu: "",
      kualitas_susus: "",
      catatan_perah: "",
    },
    kesehatan: {
      id_kambing: id,
      tanggal_periksa: "",
      diagnosa: "",
      pengobatan: "",
      vaksinasi: "",
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // If the 'jenis' field changes, reset the relevant form data
    if (name === "jenis") {
      setFormData({
        ...formData,
        jenis: value,
        pertumbuhan: {
          id_kambing: id,
          berat_badan: "",
          tinggi_badan: "",
          lingkar_dada: "",
          kondisi_fisik: "",
          tanggal_pencatatan: "",
          catatan: "",
        },
        pemerahan: {
          id_kambing: id,
          tanggal_perah: "",
          volume_susu: "",
          kualitas_susu: "",
          catatan_perah: "",
        },
        kesehatan: {
          id_kambing: id,
          tanggal_periksa: "",
          diagnosa: "",
          pengobatan: "",
          vaksinasi: "",
        },
      });
    } else {
      // Handle inputs based on current jenis
      if (formData.jenis === "pertumbuhan") {
        setFormData((prevData) => ({
          ...prevData,
          pertumbuhan: {
            ...prevData.pertumbuhan,
            [name]: value,
          },
        }));
      } else if (formData.jenis === "pemerahan") {
        setFormData((prevData) => ({
          ...prevData,
          pemerahan: {
            ...prevData.pemerahan,
            [name]: value,
          },
        }));
      } else if (formData.jenis === "kesehatan") {
        setFormData((prevData) => ({
          ...prevData,
          kesehatan: {
            ...prevData.kesehatan,
            [name]: value,
          },
        }));
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let result;

      // Submit based on jenis
      if (formData.jenis === "pertumbuhan") {
        result = await createTumbuh(formData.pertumbuhan).unwrap();
      } else if (formData.jenis === "pemerahan") {
        result = await createPemerahan(formData.pemerahan).unwrap();
      } else if (formData.jenis === "kesehatan") {
        result = await createKesehatan(formData.kesehatan).unwrap();
      }

      console.log("Form Data Submitted:", result);
      navigate("/dashboard/kegiatan");
    } catch (error) {
      console.error("Error submitting form:", error);
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
            Buat Catatan
          </h1>
        </div>
      </div>

      {/* Form */}
      <form className="space-y-4 mt-4 p-2" onSubmit={handleSubmit}>
        <h1 className="text-lg font-bold mb-4">
          Pencataan Kambing: {data.goat.noTag} - {data.goat.nama_kambing}
        </h1>
        <div>
          <label className="block text-textPrimary mb-2">
            Jenis Pencatanan
          </label>
          <select
            name="jenis"
            value={formData.jenis}
            onChange={handleInputChange}
            className="w-full border rounded-lg p-3 text-textPrimary"
          >
            <option value="">Pilih Jenis</option>
            <option value="pertumbuhan">Pertumbuhan</option>
            <option value="pemerahan">Pemerahan</option>
            <option value="kesehatan">Kesehatan</option>
          </select>
        </div>
        {/* Render specific form based on selected jenis */}
        {formData.jenis === "pertumbuhan" && (
          <Pertumbuhan
            formData={formData.pertumbuhan}
            handleInputChange={handleInputChange}
            jenis={formData.jenis}
          />
        )}

        {formData.jenis === "pemerahan" && (
          <Pemerahan
            formData={formData.pemerahan}
            handleInputChange={handleInputChange}
            jenis={formData.jenis}
          />
        )}

        {formData.jenis === "kesehatan" && (
          <Kesehatan
            formData={formData.kesehatan}
            handleInputChange={handleInputChange}
            jenis={formData.jenis}
          />
        )}

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

export default InputDataKambing;
