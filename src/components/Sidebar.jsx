import React from "react";
import {
  LayoutDashboard, ShoppingCart, Boxes, ArrowDownToLine, ArrowUpFromLine, Truck,
  Users, BarChart3, BedDouble, Wallet, UserCog, ShieldCheck, Settings, History, LogOut,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { initials } from "../utils/helpers";
import { ROLE_LABELS } from "../utils/permissions";

export const NAV_GROUPS = [
  {
    label: "Utama",
    items: [
      { key: "dashboard", label: "Dashboard", icon: LayoutDashboard, module: "dashboard" },
      { key: "kasir", label: "Kasir", icon: ShoppingCart, module: "kasir" },
      { key: "kas", label: "Kas & Shift", icon: Wallet, module: "kas" },
    ],
  },
  {
    label: "Inventori",
    items: [
      { key: "stok", label: "Produk & Stok", icon: Boxes, module: "produk" },
      { key: "masuk", label: "Barang masuk", icon: ArrowDownToLine, module: "pembelian" },
      { key: "keluar", label: "Barang keluar", icon: ArrowUpFromLine, module: "barang_keluar" },
      { key: "supplier", label: "Supplier", icon: Truck, module: "supplier" },
    ],
  },
  {
    label: "Relasi",
    items: [
      { key: "pelanggan", label: "Pelanggan", icon: Users, module: "pelanggan" },
      { key: "laporan", label: "Laporan", icon: BarChart3, module: "laporan" },
    ],
  },
  {
    label: "Administrasi",
    items: [
      { key: "pengguna", label: "Kelola pengguna", icon: UserCog, module: "pengguna" },
      { key: "hak_akses", label: "Hak akses", icon: ShieldCheck, module: "hak_akses" },
      { key: "pengaturan", label: "Pengaturan", icon: Settings, module: "pengaturan" },
      { key: "log", label: "Log aktivitas", icon: History, module: "log_aktivitas" },
    ],
  },
];

export default function Sidebar({ active, onNavigate }) {
  const { currentUser, can, logout } = useApp();

  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="brand__mark"><BedDouble size={18} strokeWidth={2} /></span>
        <div>
          <div className="brand__name">Tidura</div>
          <div className="brand__tag">ERP &amp; Kasir springbed</div>
        </div>
      </div>
      <nav className="nav">
        {NAV_GROUPS.map((group) => {
          const visible = group.items.filter((item) => can(item.module, "lihat"));
          if (visible.length === 0) return null;
          return (
            <div className="nav__group" key={group.label}>
              <div className="nav__group-label">{group.label}</div>
              {visible.map((item) => {
                const Icon = item.icon;
                const isActive = active === item.key;
                return (
                  <button
                    key={item.key}
                    className={`nav__item ${isActive ? "nav__item--active" : ""}`}
                    onClick={() => onNavigate(item.key)}
                  >
                    <Icon size={17} strokeWidth={2} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          );
        })}
      </nav>
      <div className="sidebar__footer">
        <div className="sidebar__avatar">{initials(currentUser?.name)}</div>
        <div className="sidebar__who">
          <div className="sidebar__user">{currentUser?.name}</div>
          <div className="sidebar__role">{ROLE_LABELS[currentUser?.role] || currentUser?.role}</div>
        </div>
        <button className="btn-icon btn-icon--ghost" title="Keluar" onClick={logout}>
          <LogOut size={16} />
        </button>
      </div>
    </aside>
  );
}
