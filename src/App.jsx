import React, { useCallback, useEffect, useState } from "react";
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

// Batas layar tempat sidebar berubah jadi drawer (tablet & HP).
const MOBILE_QUERY = "(max-width: 1024px)";

function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (e) => setMatches(e.matches);
    setMatches(mql.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);

  return matches;
}

function Shell() {
  const { currentUser, can } = useApp();
  const [activeTab, setActiveTab] = useState(null);
  const isMobile = useMediaQuery(MOBILE_QUERY);
  // drawerOpen dipakai di tablet/HP, collapsed dipakai di desktop (rail ikon).
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (currentUser && !activeTab) {
      const first = ALL_NAV_ITEMS.find((item) => can(item.module, "lihat"));
      setActiveTab(first ? first.key : "dashboard");
    }
    if (!currentUser) setActiveTab(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  // Drawer selalu tertutup saat kembali ke ukuran desktop.
  useEffect(() => {
    if (!isMobile) setDrawerOpen(false);
  }, [isMobile]);

  // Kunci scroll body + tutup dengan tombol Esc selagi drawer terbuka.
  useEffect(() => {
    if (!drawerOpen) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [drawerOpen]);

  const toggleSidebar = useCallback(() => {
    if (isMobile) setDrawerOpen((v) => !v);
    else setCollapsed((v) => !v);
  }, [isMobile]);

  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const handleNavigate = useCallback((key) => {
    setActiveTab(key);
    setDrawerOpen(false);
  }, []);

  if (!currentUser) return <Login />;
  if (!activeTab) return null;

  const currentModule = ALL_NAV_ITEMS.find((item) => item.key === activeTab)?.module || "dashboard";
  const sidebarVisible = isMobile ? drawerOpen : !collapsed;

  return (
    <div className={`app${collapsed ? " app--collapsed" : ""}${drawerOpen ? " app--drawer-open" : ""}`}>
      <Sidebar active={activeTab} onNavigate={handleNavigate} onClose={closeDrawer} hidden={isMobile && !drawerOpen} />
      <div className="sidebar-backdrop" onClick={closeDrawer} aria-hidden="true" />
      <div className="main">
        <Topbar tabKey={activeTab} onToggleSidebar={toggleSidebar} sidebarVisible={sidebarVisible} />
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
