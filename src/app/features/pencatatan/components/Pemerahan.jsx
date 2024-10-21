import React from "react";

const Pemerahan = ({ formData, handleInputChange, jenis }) => {
  return (
    <>
      {jenis === "pemerahan" && (
        <div className="space-y-4 md:space-y-6">
          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="flex-1">
              <label className="block text-textPrimary">
                Tanggal Pemerahan
              </label>
              <input
                type="date"
                name="tanggal_perah"
                value={formData.tanggal_perah}
                onChange={handleInputChange}
                className="w-full border rounded-lg p-3 text-textPrimary"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="flex-1">
              <label className="block text-textPrimary">Volume Susu</label>
              <input
                type="text" // Change type to text
                name="volume_susu"
                value={formData.volume_susu}
                onChange={handleInputChange}
                placeholder="Masukkan volume susu kambing"
                className="w-full border rounded-lg p-3 text-textPrimary"
                pattern="^\d+(\.\d{1,2})?$" // Optional: Regex pattern to allow only valid decimal numbers
              />
            </div>

            <div className="flex-1">
              <label className="block text-textPrimary">Kualitas Susu</label>
              <input
                type="text"
                name="kualitas_susu"
                value={formData.kualitas_susu}
                onChange={handleInputChange}
                placeholder="Masukkan kualitas susu kambing"
                className="w-full border rounded-lg p-3 text-textPrimary"
              />
            </div>
          </div>

          <div>
            <label className="block text-textPrimary">Catatan Pemerahan</label>
            <textarea
              name="catatan_perah"
              value={formData.catatan_perah}
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

export default Pemerahan;
