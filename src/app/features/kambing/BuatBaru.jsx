import React, { useState } from "react";
import { useCreateKambingBaruMutation } from "../../../state/query/kambing";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import { useNavigate } from "react-router-dom";
import KambingForm from "./components/Kambing";
import BetinaForm from "./components/Betina";
import PejantanForm from "./components/Pejantan";
import { useCreateIndukBetinaBaruMutation } from "../../../state/query/betina";
import { useCreatePejantanBaruMutation } from "../../../state/query/pejantan";

const BuatKambingBaru = () => {
  const [createKambing] = useCreateKambingBaruMutation();
  const [createBetina] = useCreateIndukBetinaBaruMutation();
  const [createPejantan] = useCreatePejantanBaruMutation();

  const navigate = useNavigate();

  // Form state for new kambing
  const [formData, setFormData] = useState({
    jenis: "",
    kambing: {
      nama_kambing: "",
      ras: "",
      tanggal_lahir: "",
      jenis_kelamin: "",
      id_kambing_betina: "",
      id_kambing_jantan: "",
      id_kandang: "",
      warna_dominan: "",
      status: "",
    },
    betina: {
      nama_kambing: "",
      ras: "",
      warna_dominan: "",
    },
    pejantan: {
      nama_kambing: "",
      ras: "",
      warna_dominan: "",
    },
  });

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // If the 'jenis' field changes, reset the relevant form data
    if (name === "jenis") {
      setFormData({
        ...formData,
        jenis: value,
        kambing: {
          nama_kambing: "",
          ras: "",
          tanggal_lahir: "",
          jenis_kelamin: "",
          id_kambing_betina: "",
          id_kambing_jantan: "",
          id_kandang: "",
          warna_dominan: "",
          status: "",
        },
        betina: {
          nama_kambing: "",
          ras: "",
          warna_dominan: "",
        },
        pejantan: {
          nama_kambing: "",
          ras: "",
          warna_dominan: "",
        },
      });
    } else {
      // Handle inputs based on current jenis
      if (formData.jenis === "kambing") {
        setFormData((prevData) => ({
          ...prevData,
          kambing: {
            ...prevData.kambing,
            [name]: value,
          },
        }));
      } else if (formData.jenis === "betina") {
        setFormData((prevData) => ({
          ...prevData,
          betina: {
            ...prevData.betina,
            [name]: value,
          },
        }));
      } else if (formData.jenis === "pejantan") {
        setFormData((prevData) => ({
          ...prevData,
          pejantan: {
            ...prevData.pejantan,
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
      if (formData.jenis === "kambing") {
        result = await createKambing(formData.kambing).unwrap();
      } else if (formData.jenis === "betina") {
        result = await createBetina(formData.betina).unwrap();
      } else if (formData.jenis === "pejantan") {
        result = await createPejantan(formData.pejantan).unwrap();
      }

      console.log("Form Data Submitted:", result);
      navigate("/dashboard/kambing");
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
            Tambah Kambing
          </h1>
        </div>
      </div>

      {/* Form */}
      <form className="space-y-4 mt-4 p-2" onSubmit={handleSubmit}>
        <div>
          <label className="block text-textPrimary mb-2">Jenis Kambing</label>
          <select
            name="jenis"
            value={formData.jenis}
            onChange={handleInputChange}
            className="w-full border rounded-lg p-3 text-textPrimary"
          >
            <option value="">Pilih Jenis</option>
            <option value="kambing">Kambing</option>
            <option value="betina">Indukan Betina</option>
            <option value="pejantan">Indukan Pejantan</option>
          </select>
        </div>

        {/* Render specific form based on selected jenis */}
        {formData.jenis === "kambing" && (
          <KambingForm
            formData={formData.kambing}
            handleInputChange={handleInputChange}
            jenis={formData.jenis}
          />
        )}

        {formData.jenis === "betina" && (
          <BetinaForm
            formData={formData.betina}
            handleInputChange={handleInputChange}
            jenis={formData.jenis}
          />
        )}

        {formData.jenis === "pejantan" && (
          <PejantanForm
            formData={formData.pejantan}
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

export default BuatKambingBaru;
