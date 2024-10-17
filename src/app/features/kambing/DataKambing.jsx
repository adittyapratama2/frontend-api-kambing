import { useGetKambingQuery } from "../../../state/query/kambing";
import { Link, useNavigate } from "react-router-dom";
import { FaMars, FaSearch, FaVenus } from "react-icons/fa";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import { LuArrowUpDown } from "react-icons/lu";
import { IoFilterSharp } from "react-icons/io5";
import { IoIosMore } from "react-icons/io";

const DataKambing = () => {
  const { data: kambings, isLoading, error } = useGetKambingQuery();
  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  return (
    <div className="min-h-screen p-2 bg-white">
      {/* Header and Create Button */}
      <div className="sticky top-0 bg-white z-10 p-2">
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate("/dashboard")}
            className="rounded-full text-primary hover:bg-white hover:text-black transition"
          >
            <ArrowLeftIcon className="w-6 h-6" />
          </button>
          <h1 className="p-2 font-bold text-textPrimary mx-auto">Kambing</h1>
          {/* Added mx-auto */}
          <Link to={"/dashboard/kambing/buat-baru"}>
            <button className="inline-flex items-center text-primary">
              Tambah
            </button>
          </Link>
        </div>
      </div>

      {/* Search and Filter Options */}
      <div className="flex items-center mt-5 relative">
        <input
          type="text"
          placeholder=" Cari"
          className="flex-1 px-4 py-4 pl-10 border-none bg-grey rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray" />
      </div>
      <div className="flex items-center mt-4 justify-between relative w-full">
        <span className="border-none bg-grey rounded-full shadow-sm p-2 text-sm flex items-center">
          <LuArrowUpDown className="h-4 w-4 text-gray mr-1" />
          Urutkan
        </span>
        <span className="border-none bg-grey rounded-full shadow-sm p-2 text-sm flex items-center">
          <IoFilterSharp className="h-4 w-4 text-gray mr-1" />
          Filter
        </span>
      </div>
      {/* List of Kambing */}
      <div className="space-y-4 mt-4">
        {kambings.length > 0 ? (
          kambings.map((kambing, index) => (
            <div
              key={kambing.id}
              className="flex items-center justify-between bg-white p-8 rounded-lg shadow"
            >
              <div className="flex items-center">
                {/* Gender Icon */}
                <div className="mr-4">
                  {kambing.kelamin === "jantan" ? (
                    <div className="bg-secondary rounded-full flex items-center justify-center w-10 h-10">
                      <FaMars className="text-primary w-6 h-6" />
                    </div>
                  ) : (
                    <div className="bg-pink rounded-full flex items-center justify-center w-10 h-10">
                      <FaVenus className="text-pink w-6 h-6" />
                    </div>
                  )}
                </div>

                {/* Kambing Info */}
                <div>
                  <h2 className="text-lg font-semibold text-textPrimary">
                    {kambing.noTag}
                  </h2>
                  <h3 className="text-md font-semibold text-textPrimary">
                    {kambing.nama_kambing}
                  </h3>
                  <p className="text-xs mt-1 p-1 bg-darkGrey rounded-full">
                    Group Kambing
                  </p>
                </div>
              </div>

              {/* More Options */}
              <Link to={`/dashboard/kambing/${kambing.id}`}>
                <button className="text-gray-400 hover:text-gray-600">
                  <IoIosMore />
                </button>
              </Link>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <h3 className="text-lg font-semibold text-textPrimary">
              Belum ada kambing.
            </h3>
            <p className="text-sm">
              Disini anda akan melihat daftar kambing yang anda tambahkan.
            </p>
            <Link to={"/dashboard/kambing/buat-baru"}>
              <button className="mt-4 p-4 bg-primary rounded-full text-white">
                Tambah Sekarang
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataKambing;
