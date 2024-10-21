import React from "react";

const Kesehatan = ({ formData, handleInputChange, jenis }) => {
  return (
    <>
      {jenis === "kesehatan" && (
        <div className="space-y-4 md:space-y-6">
          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="flex-1">
              <label className="block text-textPrimary">Tanggal Periksa</label>
              <input
                type="date"
                name="tanggal_periksa"
                value={formData.tanggal_periksa}
                onChange={handleInputChange}
                className="w-full border rounded-lg p-3 text-textPrimary"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="flex-1">
              <label className="block text-textPrimary">Diagnosa</label>
              <textarea
                name="diagnosa"
                value={formData.diagnosa}
                onChange={handleInputChange}
                placeholder="Masukan diagnosa"
                className="w-full border rounded-lg p-3 text-textPrimary"
              />
            </div>

            <div className="flex-1">
              <label className="block text-textPrimary">Pengobatan</label>
              <textarea
                name="pengobatan"
                value={formData.pengobatan}
                onChange={handleInputChange}
                placeholder="Masukan pengobatan"
                className="w-full border rounded-lg p-3 text-textPrimary"
              />
            </div>
          </div>

          <div>
            <label className="block text-textPrimary">Vaksinasi</label>
            <input
              type="text"
              name="vaksinasi"
              value={formData.vaksinasi}
              onChange={handleInputChange}
              placeholder="Masukan vaksinasi"
              className="w-full border rounded-lg p-3 text-textPrimary"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Kesehatan;
