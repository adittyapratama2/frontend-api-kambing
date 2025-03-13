import React, { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import AppLayout from "./app/layouts/AppLayout";
import Dashboard from "./app/features/admin/Dashboard";
import QRScanner from "./app/components/QrScanner";
import DataKambing from "./app/features/kambing/DataKambing";
import BuatKambingBaru from "./app/features/kambing/BuatBaru";
import LaporanKambing from "./app/features/laporan";
import LoginForm from "./app/features/auth/LoginForm";
import RegisterForm from "./app/features/auth/RegisterForm";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store";
import PrivateRoute from "./app/components/PrivateRoute";
import NotFoundPage from "./app/components/Notfound";
import DataKambingId from "./app/features/kambing/DataKambingId";
import DataIndukan from "./app/features/indukan";
import BuatIndukan from "./app/features/indukan/BuatIndukan";
import EditIndukan from "./app/features/indukan/EditIndukan";
import SplashScreen from "./app/components/SplashScreen";
import DataKandang from "./app/features/kandang";
import BuatKandang from "./app/features/kandang/BuatKandang";
import DataPerkawinan from "./app/features/perkawinan";
import TambahKawin from "./app/features/perkawinan/TambahKawin";
import Kegiatan from "./app/features/kegiatan";
import InputDataKambing from "./app/features/pencatatan/InputData";
import KandangId from "./app/features/kandang/KandangId";
import CatatPakan from "./app/features/pencatatan/InputPakan";
import ProduksiSusu from "./app/features/produksi-susu";
import PakanKandang from "./app/features/pakan";
import ListProduksiSusu from "./app/features/produksi-susu";
import UserIndex from "./app/features/user";
import NewUser from "./app/features/user/newUser";
import KambingReport from "./app/features/laporan/components/KambingReport";
import KandangReport from "./app/features/laporan/components/KandangReport";
import EditKambing from "./app/features/kambing/components/EditKambing";
import EditPertumbuhan from "./app/features/pencatatan/components/pertumbuhan/EditPertumbuhan";
import Pejantan from "./app/features/indukan/Pejantan";

// MainApp functional component to manage splash screen and routing
const MainApp = () => {
  const [loading, setLoading] = useState(true); // State to control splash screen

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Hide splash screen after 3 seconds
    }, 3000);

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []);

  if (loading) {
    return <SplashScreen />; // Render splash screen while loading
  }

  return (
    <StrictMode>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LoginForm />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <AppLayout />
                  </PrivateRoute>
                }
              >
                <Route index element={<Dashboard />} />

                <Route path="kambing">
                  <Route index element={<DataKambing />} />
                  <Route path="buat-baru" element={<BuatKambingBaru />} />
                  <Route path=":id" element={<DataKambingId />} />
                  <Route path="edit/:id" element={<EditKambing />} />
                  <Route path="input-data/:id" element={<InputDataKambing />} />
                </Route>

                <Route path="indukan-kambing">
                  <Route index element={<DataIndukan />} />
                  <Route path="buat-baru" element={<BuatIndukan />} />
                  <Route path=":id" element={<DataIndukan />} />
                  <Route path="update/:id" element={<EditIndukan />} />
                </Route>

                <Route path="pejantan-kambing">
                  <Route index element={<DataIndukan />} />
                  <Route path="buat-baru" element={<BuatIndukan />} />
                  <Route path=":id" element={<Pejantan />} />
                  <Route path="update/:id" element={<EditIndukan />} />
                </Route>

                <Route path="kandang-kambing">
                  <Route index element={<DataKandang />} />
                  <Route path="buat-baru" element={<BuatKandang />} />
                  <Route path=":id" element={<KandangId />} />
                  <Route path="update/:id" element={<EditIndukan />} />
                  <Route path="input-pakan/:id" element={<CatatPakan />} />
                </Route>

                <Route path="pakan-kandang">
                  <Route index element={<PakanKandang />} />
                </Route>

                <Route path="laporan-kambing">
                  <Route index element={<LaporanKambing />} />
                  <Route path="detail/:id" element={<KambingReport />} />
                </Route>

                <Route path="laporan">
                  <Route path="kandang/:id" element={<KandangReport />} />
                </Route>

                <Route path="produksi-susu-kambing">
                  <Route index element={<ListProduksiSusu />} />
                </Route>

                <Route path="perkawinan">
                  <Route index element={<DataPerkawinan />} />
                  <Route path="baru" element={<TambahKawin />} />
                </Route>

                <Route path="user-management">
                  <Route index element={<UserIndex />} />
                  <Route path="baru" element={<NewUser />} />
                </Route>

                <Route path="kegiatan">
                  <Route index element={<Kegiatan />} />
                  <Route
                    path="pertumbuhan-kambing/edit/:id"
                    element={<EditPertumbuhan />}
                  />
                </Route>
              </Route>
              <Route
                path="/scan-qr"
                element={
                  <PrivateRoute>
                    <QRScanner />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </StrictMode>
  );
};

createRoot(document.getElementById("root")).render(<MainApp />);
