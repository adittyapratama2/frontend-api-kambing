import React from "react";

const BetinaForm = ({ formData, handleInputChange, jenis }) => {
  return (
    <>
      {jenis === "betina" && (
        <div className="space-y-4">
          <div>
            <label className="block text-textPrimary">Nama Betina</label>
            <input
              type="text"
              name="nama_kambing"
              value={formData.nama_kambing}
              onChange={handleInputChange}
              placeholder="Masukkan nama kambing"
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
              placeholder="Ras"
              className="w-full border rounded-lg p-3 text-textPrimary"
            />
          </div>

          <div>
            <label className="block text-textPrimary">Warna Dominan</label>
            <input
              type="text"
              name="warna_dominan"
              value={formData.warna_dominan}
              onChange={handleInputChange}
              placeholder="Warna Dominan"
              className="w-full border rounded-lg p-3 text-textPrimary"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default BetinaForm;
