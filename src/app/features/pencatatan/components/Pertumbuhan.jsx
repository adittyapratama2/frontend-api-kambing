import React from "react";

const Pertumbuhan = ({ formData, handleInputChange, jenis }) => {
  return (
    <>
      {jenis === "pertumbuhan" && (
        <div className="space-y-4 md:space-y-6">
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
                type="text" // Change type to text
                name="berat_badan"
                value={formData.berat_badan}
                onChange={handleInputChange}
                placeholder="Masukkan berat kambing"
                className="w-full border rounded-lg p-3 text-textPrimary"
                pattern="^\d+(\.\d{1,2})?$" // Optional: Regex pattern to allow only valid decimal numbers
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
                pattern="^\d+(\.\d{1,2})?$" // Optional: Regex pattern to allow only valid decimal numbers
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
                pattern="^\d+(\.\d{1,2})?$" // Optional: Regex pattern to allow only valid decimal numbers
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
        </div>
      )}
    </>
  );
};

export default Pertumbuhan;
