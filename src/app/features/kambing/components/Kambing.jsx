import React from "react";
import { useGetIndukBetinaQuery } from "../../../../state/query/betina";
import { useGetPejantanQuery } from "../../../../state/query/pejantan";
import { useGetKandangQuery } from "../../../../state/query/kandang";

const KambingForm = ({ formData, handleInputChange, jenis }) => {
  const { data: betina, isLoading, error } = useGetIndukBetinaQuery();
  const { data: pejantan, isLoading: loadJantan } = useGetPejantanQuery();
  const { data: kandang, isLoading: loadKandang } = useGetKandangQuery();

  if (isLoading || loadJantan || loadKandang) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  return (
    <>
      {jenis === "kambing" && (
        <div className="space-y-4">
          <div>
            <label className="block text-textPrimary">Nama Kambing</label>
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
            </select>
          </div>
        </div>
      )}
    </>
  );
};

export default KambingForm;
