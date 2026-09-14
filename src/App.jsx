import React, { useEffect, useState } from "react";
import { AppProvider, useApp } from "./context/AppContext";
import Sidebar, { NAV_GROUPS } from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Kasir from "./pages/Kasir";
import Stok from "./pages/Stok";
import Movement from "./pages/Movement";
import Supplier from "./pages/Supplier";
import Pelanggan from "./pages/Pelanggan";
import Kas from "./pages/Kas";
import Laporan from "./pages/Laporan";
import Pengguna from "./pages/Pengguna";
import HakAkses from "./pages/HakAkses";
import Pengaturan from "./pages/Pengaturan";
import LogAktivitas from "./pages/LogAktivitas";
import { PermissionGate } from "./components/Common";
import { CSS } from "./styles";

const ALL_NAV_ITEMS = NAV_GROUPS.flatMap((g) => g.items);

function Shell() {
  const { currentUser, can } = useApp();
  const [activeTab, setActiveTab] = useState(null);

  useEffect(() => {
    if (currentUser && !activeTab) {
      const first = ALL_NAV_ITEMS.find((item) => can(item.module, "lihat"));
      setActiveTab(first ? first.key : "dashboard");
    }
    if (!currentUser) setActiveTab(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  if (!currentUser) return <Login />;
  if (!activeTab) return null;

  const currentModule = ALL_NAV_ITEMS.find((item) => item.key === activeTab)?.module || "dashboard";

  return (
    <div className="app">
      <Sidebar active={activeTab} onNavigate={setActiveTab} />
      <div className="main">
        <Topbar tabKey={activeTab} />
        <div className="main__content">
          <PermissionGate moduleKey={currentModule}>
            {activeTab === "dashboard" && <Dashboard />}
            {activeTab === "kasir" && <Kasir />}
            {activeTab === "stok" && <Stok />}
            {activeTab === "masuk" && <Movement type="masuk" />}
            {activeTab === "keluar" && <Movement type="keluar" />}
            {activeTab === "supplier" && <Supplier />}
            {activeTab === "pelanggan" && <Pelanggan />}
            {activeTab === "kas" && <Kas />}
            {activeTab === "laporan" && <Laporan />}
            {activeTab === "pengguna" && <Pengguna />}
            {activeTab === "hak_akses" && <HakAkses />}
            {activeTab === "pengaturan" && <Pengaturan />}
            {activeTab === "log" && <LogAktivitas />}
          </PermissionGate>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <style>{CSS}</style>
      <Shell />
    </AppProvider>
  );
}
